/**
 * Redirect lookup API — used by the middleware to find DB-configured
 * redirects without importing Prisma in the middleware runtime.
 *
 * The middleware calls this endpoint on every request (cached for 60s)
 * with the request path. The endpoint queries the Redirect table via
 * the Prisma client (running normally in Node.js runtime) and returns
 * either a 200 with the redirect target + status code, or a 404 if no
 * redirect exists for the path.
 *
 * Why this indirection? Importing Prisma directly in middleware is
 * fragile on Vercel — the Prisma query engine binary may not bundle
 * correctly into the middleware runtime, even with `runtime = 'nodejs'`.
 * Fetching an internal API route is the universally-safe pattern.
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path') ?? ''

  // Basic validation — must be a path starting with /
  if (!path || !path.startsWith('/')) {
    return NextResponse.json({ redirect: null }, { status: 200 })
  }

  try {
    const redirect = await db.redirect.findUnique({
      where: { fromPath: path },
      select: { toPath: true, statusCode: true },
    })
    if (redirect) {
      return NextResponse.json({ redirect }, { status: 200 })
    }
    return NextResponse.json({ redirect: null }, { status: 200 })
  } catch (e: any) {
    // Redirect table may not exist yet (migration not applied) — return no redirect
    console.warn('[redirect-lookup] could not query Redirect table:', e?.message?.slice(0, 100))
    return NextResponse.json({ redirect: null }, { status: 200 })
  }
}
