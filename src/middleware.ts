/**
 * Wardrobecare middleware — wraps the existing stealth admin proxy and
 * adds URL-redirect handling.
 *
 * Order:
 *   1. Look up the request path in the Redirect table (cached for 60s).
 *      If a redirect exists, return it with the configured statusCode.
 *   2. Otherwise delegate to the existing stealth admin proxy.
 *      (Secret admin path rewrite + /admin stealth gate.)
 *
 * The redirect lookup is cached per-instance using a module-level cache
 * with a 60-second TTL. This avoids hitting the DB on every request while
 * keeping redirect changes propagating within a minute.
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleProxy } from '@/lib/proxy-handler'

// ── Redirect cache ─────────────────────────────────────────────────────────
//
// We can't use the Prisma client directly in middleware in all runtimes
// (Prisma in edge runtime is limited). Instead we hit the DB via a
// module-level fetch to an internal API route — but that's a chicken-and-
// egg problem for middleware. So we use a lightweight direct DB read via
// the Prisma client lazily imported — Prisma 6 supports Node.js runtime
// middleware via `export const runtime = 'nodejs'`.

export const runtime = 'nodejs'

// In-memory cache — survives across requests within the same warm instance.
let redirectCache: { rows: { fromPath: string; toPath: string; statusCode: number }[]; at: number } | null = null
const CACHE_TTL_MS = 60 * 1000

async function getRedirects() {
  if (redirectCache && Date.now() - redirectCache.at < CACHE_TTL_MS) {
    return redirectCache.rows
  }
  try {
    // Lazy import so the module loads even if the DB is unavailable
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    const rows = await prisma.redirect.findMany({
      select: { fromPath: true, toPath: true, statusCode: true },
    })
    await prisma.$disconnect()
    redirectCache = { rows, at: Date.now() }
    return rows
  } catch (e: any) {
    // If the DB is unavailable, fall back to an empty list — middleware
    // still works, just no redirects are applied this cycle.
    console.error('[middleware] could not load redirects:', e?.message)
    return []
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // 1. Redirect lookup
  const redirects = await getRedirects()
  const match = redirects.find((r) => r.fromPath === pathname)
  if (match) {
    const url = req.nextUrl.clone()
    url.pathname = match.toPath
    url.search = search // preserve query string
    return NextResponse.redirect(url, match.statusCode)
  }

  // 2. Delegate to the existing stealth admin proxy
  return handleProxy(req)
}

export const config = {
  matcher: [
    // Skip static assets and the public API surface — the proxy's matcher
    '/((?!api|_next/static|_next/image|images|uploads|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
