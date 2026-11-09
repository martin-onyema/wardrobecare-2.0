/**
 * Wardrobecare middleware — wraps the existing stealth admin proxy and
 * adds URL-redirect handling.
 *
 * Order:
 *   1. Look up the request path in the Redirect table (via an internal
 *      API route — see below) cached for 60s. If a redirect exists,
 *      return it with the configured statusCode.
 *   2. Otherwise delegate to the existing stealth admin proxy
 *      (Secret admin path rewrite + /admin stealth gate.)
 *
 * Why the API-route indirection for redirect lookups?
 *   Importing Prisma directly in middleware is fragile on Vercel —
 *   the Prisma query engine binary may not bundle correctly into the
 *   middleware runtime, even with `runtime = 'nodejs'`. Fetching an
 *   internal API route (which runs in normal Node.js runtime and can
 *   use Prisma normally) is the universally-safe pattern. The internal
 *   API route is excluded from the middleware matcher, so the fetch
 *   doesn't recurse.
 *
 * The redirect lookup is cached per-instance with a 60-second TTL.
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleProxy } from '@/lib/proxy-handler'

// In-memory cache — survives across requests within the same warm instance.
// Keyed by path; value is either { toPath, statusCode } or null (no redirect).
type RedirectEntry = { toPath: string; statusCode: number } | null
let redirectCache: { map: Map<string, RedirectEntry>; at: number } = { map: new Map(), at: 0 }
const CACHE_TTL_MS = 60 * 1000

async function getRedirectForPath(req: NextRequest, path: string): Promise<RedirectEntry> {
  // Return cached value if available and fresh
  if (Date.now() - redirectCache.at < CACHE_TTL_MS) {
    const cached = redirectCache.map.get(path)
    if (cached !== undefined) return cached
  } else {
    // Cache expired — reset
    redirectCache = { map: new Map(), at: Date.now() }
  }

  // Fetch from the internal API route — runs in normal Node runtime, can use Prisma.
  // Use the request's own origin so this works on local dev, Vercel preview URLs,
  // and production.
  try {
    const lookupUrl = new URL('/api/seo/redirect-lookup', req.nextUrl.origin).toString()
    const res = await fetch(`${lookupUrl}?path=${encodeURIComponent(path)}`, {
      // Internal request — no cookies needed, fast timeout
      headers: { 'x-internal': '1' },
      // Avoid caching at the fetch layer — we have our own cache
      cache: 'no-store',
      // Short timeout — if the API route is slow, fall through to no redirect
      signal: AbortSignal.timeout(2000),
    }).catch(() => null)

    if (res && res.ok) {
      const data: any = await res.json().catch(() => ({ redirect: null }))
      if (data.redirect) {
        const entry = { toPath: data.redirect.toPath, statusCode: data.redirect.statusCode }
        redirectCache.map.set(path, entry)
        return entry
      }
    }
  } catch (e: any) {
    // Network / timeout / parse error — fall through to no redirect
    console.warn('[middleware] redirect lookup failed:', e?.message?.slice(0, 100))
  }

  redirectCache.map.set(path, null)
  return null
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // 1. Redirect lookup
  const redirect = await getRedirectForPath(req, pathname)
  if (redirect) {
    const url = req.nextUrl.clone()
    url.pathname = redirect.toPath
    url.search = search // preserve query string
    return NextResponse.redirect(url, redirect.statusCode)
  }

  // 2. Delegate to the existing stealth admin proxy
  return handleProxy(req)
}

export const config = {
  matcher: [
    // Skip static assets, the public API surface, and the redirect-lookup
    // API route itself (otherwise the middleware would recurse when calling
    // itself to look up redirects).
    '/((?!api|_next/static|_next/image|images|uploads|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
