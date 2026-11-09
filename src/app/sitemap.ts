import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { SERVICES } from '@/lib/services-data'
import { STATIC_PAGES } from '@/lib/seo'

export const dynamic = 'force-dynamic'

/**
 * Build the sitemap.
 *
 * Inclusion rules (admin SEO Manager controls these per-record):
 *   - Product: published=true, status=ACTIVE, inSitemap=true, noindex=false
 *   - Category: active=true, inSitemap=true, noindex=false (all categories — top-level + sub)
 *   - Service: not comingSoon, inSitemap=true, noindex=false (unless overridden in SeoOverride)
 *   - Static page: inSitemap=true, noindex=false (unless overridden in SeoOverride)
 *
 * Excluded by default (never in the sitemap):
 *   - /account paths (login, register, profile, orders, etc.)
 *   - /cart, /checkout, /checkout/verify
 *   - /track-order, /gift-card/checkout
 *   - /admin paths (stealth admin)
 *   - booking flows (e.g. /services/wardrobe-consultation/book)
 *
 * RESILIENCE: every DB query is wrapped in a try/catch. If the new SEO
 * columns or tables don't exist yet (the migration hasn't been applied
 * to this database), the sitemap falls back to the pre-SEO-Manager
 * behaviour — include all published products and active top-level
 * categories. This means the sitemap builds successfully both before
 * and after the migration is applied.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wardrobecare.com.ng'

  // ── SeoOverride table — may not exist if migration hasn't been applied ──
  let overrideMap = new Map<string, { noindex: boolean; inSitemap: boolean; contentType: string }>()
  try {
    const overrides = await db.seoOverride.findMany({
      select: { route: true, noindex: true, inSitemap: true, contentType: true },
    })
    overrideMap = new Map(overrides.map((o) => [o.route, o]))
  } catch (e: any) {
    // SeoOverride table doesn't exist yet — treat as empty
    console.warn('[sitemap] SeoOverride table not available, using defaults:', e?.message?.slice(0, 100))
  }

  // ── Products ──
  let productPages: MetadataRoute.Sitemap = []
  try {
    // Try with the new SEO columns
    const products = await db.product.findMany({
      where: {
        published: true,
        status: 'ACTIVE',
        inSitemap: true,
        noindex: false,
      },
      select: { slug: true, updatedAt: true },
    })
    productPages = products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (e: any) {
    // Migration not applied yet — fall back to the pre-SEO-Manager query
    console.warn('[sitemap] falling back to pre-SEO-Manager product query:', e?.message?.slice(0, 100))
    const products = await db.product.findMany({
      where: { published: true, status: 'ACTIVE' },
      select: { slug: true, updatedAt: true },
    })
    productPages = products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  }

  // ── Categories ──
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await db.category.findMany({
      where: {
        active: true,
        inSitemap: true,
        noindex: false,
      },
      select: { slug: true, updatedAt: true, parentId: true },
    })
    categoryPages = categories.map((c) => ({
      url: `${baseUrl}/shop?category=${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly',
      priority: c.parentId ? 0.5 : 0.6,
    }))
  } catch (e: any) {
    console.warn('[sitemap] falling back to pre-SEO-Manager category query:', e?.message?.slice(0, 100))
    const categories = await db.category.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true, parentId: true },
    })
    categoryPages = categories.map((c) => ({
      url: `${baseUrl}/shop?category=${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: c.parentId ? 0.5 : 0.6,
    }))
  }

  // ── Services hub + individual services ──
  const serviceHubOverride = overrideMap.get('/services')
  const serviceHubIncluded = !serviceHubOverride || (!serviceHubOverride.noindex && serviceHubOverride.inSitemap)
  const serviceHubPages: MetadataRoute.Sitemap = serviceHubIncluded
    ? [{ url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 }]
    : []

  const servicePages: MetadataRoute.Sitemap = SERVICES.flatMap((s) => {
    // Coming-soon services are never in the sitemap
    if (s.comingSoon) return []
    const route = `/services/${s.slug}`
    const ov = overrideMap.get(route)
    // Default: in sitemap. Override can opt out.
    const included = !ov || (!ov.noindex && ov.inSitemap)
    if (!included) return []
    return [{
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }]
  })

  // ── Static pages — pulled from the registry in src/lib/seo.ts ──
  const staticPageEntries: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((p) => {
    if (p.route === '/') {
      return [{
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      }]
    }
    if (p.route === '/shop') {
      return [{
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }]
    }
    if (p.route === '/services') return [] // already covered above
    const ov = overrideMap.get(p.route)
    const included = !ov || (!ov.noindex && ov.inSitemap)
    if (!included) return []
    return [{
      url: `${baseUrl}${p.route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }]
  })

  return [
    ...staticPageEntries,
    ...serviceHubPages,
    ...servicePages,
    ...productPages,
    ...categoryPages,
  ]
}
