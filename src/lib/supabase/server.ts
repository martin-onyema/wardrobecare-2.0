import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'

// Defer the env-var check until the client is actually constructed —
// building the project without Supabase configured should not throw at
// import time. supabaseServer() and supabaseServerAnon() throw on call
// if the env vars are missing, which is the right behaviour.

/**
 * Server-side Supabase client using the **service role** key.
 * Bypasses RLS — only use in trusted server contexts (server actions, route
 * handlers, server components). Never expose this client to the browser.
 *
 * Throws if NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.
 */
export function supabaseServer(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.')
  }
  return createServerClient(url, key, {
    cookies: {
      async getAll() {
        return (await cookies()).getAll()
      },
      async setAll(cookiesToSet) {
        try {
          const jar = await cookies()
          cookiesToSet.forEach(({ name, value, options }) =>
            jar.set(name, value, options),
          )
        } catch {
          // Called from a Server Component — cookies can't be set. Safe to ignore.
        }
      },
    },
  })
}

/**
 * Server-side Supabase client using the **anon** key + RLS. Use this when you
 * want database row-level security to apply (e.g. user-scoped reads).
 */
export function supabaseServerAnon(): SupabaseClient {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll()
        },
        async setAll(cookiesToSet) {
          try {
            const jar = await cookies()
            cookiesToSet.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            )
          } catch {
            // ignore
          }
        },
      },
    },
  )
}

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

/** Storage bucket name for product images. Must exist in your Supabase project. */
export const PRODUCT_IMAGES_BUCKET = 'product-images'
