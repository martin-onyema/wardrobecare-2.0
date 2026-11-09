/**
 * SEO Manager — server-side data fetching helpers.
 *
 * All the queries that build the "page list" the admin sees, with
 * pagination at the DB level. Reused by /admin/seo (overview) and
 * /admin/seo/pages (full list).
 */

import { db } from '@/lib/db'
import { SERVICES } from '@/lib/services-data'
import {
  categoryToRecord,
  productToRecord,
  serviceToRecord,
  pageOverrideToRecord,
  type SeoPageRecord,
} from '@/lib/seo'

export type SeoPageRow = SeoPageRecord & { score: number }

/**
 * Build the full list of SEO page records (categories + products +
 * services + static pages). Each is annotated with its computed score.
 *
 * @param opts Filter by content type, status band, and free-text query.
 *   `limit` and `offset` apply pagination. `issue` filters to records
 *   failing a specific check (used by the overview "Fix these first" links).
 */
export async function listSeoPages(opts: {
  type?: string
  band?: 'good' | 'warn' | 'bad'
  query?: string
  issue?: string
  limit?: number
  offset?: number
}): Promise<{ rows: SeoPageRow[]; total: number }> {
  const limit = opts.limit ?? 50
  const offset = opts.offset ?? 0

  // Build all records in memory — fine for the typical catalogue size
  // (the project has hundreds of products, not millions). We use
  // db.findMany with select to keep payload size down.
  const [categories, products, overrides, dups] = await Promise.all([
    db.category.findMany({
      select: {
        id: true, name: true, slug: true, description: true, parentId: true,
        parent: { select: { name: true } },
        seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true,
        seoOgImage: true, noindex: true, inSitemap: true, active: true,
      },
    }),
    db.product.findMany({
      select: {
        id: true, name: true, slug: true, description: true,
        seoTitle: true, seoDescription: true, seoH1: true, ogImage: true,
        noindex: true, inSitemap: true, published: true, status: true,
        images: { select: { altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
      },
    }),
    db.seoOverride.findMany(),
    import('@/lib/seo').then((m) => m.buildDuplicateMaps()),
  ])

  const rows: SeoPageRecord[] = []

  for (const c of categories) rows.push(categoryToRecord(c))
  for (const p of products) rows.push(productToRecord(p))
  for (const s of SERVICES) {
    const route = `/services/${s.slug}`
    const ov = overrides.find((o) => o.route === route)
    rows.push(serviceToRecord(s, ov ?? null))
  }
  const { STATIC_PAGES } = await import('@/lib/seo')
  for (const p of STATIC_PAGES) {
    const ov = overrides.find((o) => o.route === p.route)
    rows.push(pageOverrideToRecord(p.route, p.name, ov ?? null))
  }

  // Score each
  const { scoreFor, checksFor, bandFor } = await import('@/lib/seo')
  let scored = rows.map((r) => {
    const score = scoreFor(r, dups)
    return { ...r, score }
  })

  // Filter by content type
  if (opts.type && opts.type !== 'all') {
    scored = scored.filter((r) => r.type === opts.type)
  }

  // Filter by issue
  if (opts.issue) {
    scored = scored.filter((r) => {
      // Skip hidden coming-soon records unless they're the issue we're after
      if (r.hidden && r.noindex) return opts.issue === 'idxMap'
      const cs = checksFor(r, dups)
      return cs.some((c) => c.key === opts.issue && !c.ok)
    })
  }

  // Filter by band
  if (opts.band) {
    scored = scored.filter((r) => bandFor(r.score).cls === opts.band)
  }

  // Filter by query (name + url)
  if (opts.query) {
    const q = opts.query.toLowerCase()
    scored = scored.filter((r) => (r.name + r.url).toLowerCase().includes(q))
  }

  // Sort: by score ascending (worst first) — that's the most actionable view
  scored.sort((a, b) => a.score - b.score)

  const total = scored.length
  const page = scored.slice(offset, offset + limit)
  return { rows: page, total }
}

/**
 * Build just the overview statistics — counts for the KPI cards
 * and the per-content-type progress bars.
 */
export async function getSeoOverviewStats() {
  const { buildDuplicateMaps, checksFor, scoreFor, bandFor } = await import('@/lib/seo')
  const [categories, products, overrides, dups] = await Promise.all([
    db.category.findMany({
      select: {
        id: true, name: true, slug: true, description: true, parentId: true,
        parent: { select: { name: true } },
        seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true,
        seoOgImage: true, noindex: true, inSitemap: true, active: true,
      },
    }),
    db.product.findMany({
      select: {
        id: true, name: true, slug: true, description: true,
        seoTitle: true, seoDescription: true, seoH1: true, ogImage: true,
        noindex: true, inSitemap: true, published: true, status: true,
        images: { select: { altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
      },
    }),
    db.seoOverride.findMany(),
    buildDuplicateMaps(),
  ])

  const all: SeoPageRecord[] = []
  for (const c of categories) all.push(categoryToRecord(c))
  for (const p of products) all.push(productToRecord(p))
  for (const s of SERVICES) {
    const route = `/services/${s.slug}`
    const ov = overrides.find((o) => o.route === route)
    all.push(serviceToRecord(s, ov ?? null))
  }
  const { STATIC_PAGES } = await import('@/lib/seo')
  for (const p of STATIC_PAGES) {
    const ov = overrides.find((o) => o.route === p.route)
    all.push(pageOverrideToRecord(p.route, p.name, ov ?? null))
  }

  const scored = all.map((r) => ({ r, score: scoreFor(r, dups) }))
  const scores = scored.map((s) => s.score)
  const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const good = scores.filter((s) => s >= 85).length
  const needsWork = scores.filter((s) => s >= 60 && s < 85).length
  const poor = scores.filter((s) => s < 60).length
  const total = all.length
  const noindex = all.filter((r) => r.noindex).length

  // Issue counts — the "Fix these first" cards
  const issueKeys = ['title', 'titleLen', 'titleDup', 'desc', 'descLen', 'intro', 'alt', 'og', 'h1'] as const
  const issues = issueKeys.map((k) => {
    const count = all.filter((r) => {
      if (r.hidden && r.noindex) return false
      const cs = checksFor(r, dups)
      return cs.some((c) => c.key === k && !c.ok)
    }).length
    return { key: k, count }
  }).filter((i) => i.count > 0)

  // Per-type progress
  const byType: { type: string; label: string; count: number; avg: number }[] = []
  for (const [type, label] of [
    ['category', 'Categories & subcategories'],
    ['product', 'Products'],
    ['service', 'Services'],
    ['page', 'Pages & guides'],
  ] as const) {
    const subset = scored.filter((s) => s.r.type === type)
    if (subset.length === 0) {
      byType.push({ type, label, count: 0, avg: 0 })
    } else {
      const a = Math.round(subset.reduce((x, s) => x + s.score, 0) / subset.length)
      byType.push({ type, label, count: subset.length, avg: a })
    }
  }

  return {
    avg,
    good,
    needsWork,
    poor,
    total,
    noindex,
    issues,
    byType,
  }
}

/**
 * Fetch a single record for the editor.
 */
export async function getSeoRecordForEdit(type: string, id: string): Promise<SeoPageRecord | null> {
  if (type === 'category') {
    const c = await db.category.findUnique({
      where: { id },
      select: {
        id: true, name: true, slug: true, description: true, parentId: true,
        parent: { select: { name: true } },
        seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true,
        seoOgImage: true, noindex: true, inSitemap: true, active: true,
      },
    })
    return c ? categoryToRecord(c) : null
  }
  if (type === 'product') {
    const p = await db.product.findUnique({
      where: { id },
      select: {
        id: true, name: true, slug: true, description: true,
        seoTitle: true, seoDescription: true, seoH1: true, ogImage: true,
        noindex: true, inSitemap: true, published: true, status: true,
        images: { select: { id: true, altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
      },
    })
    return p ? productToRecord(p) : null
  }
  if (type === 'service' || type === 'page') {
    // For service/page, "id" passed in is the route
    const ov = await db.seoOverride.findUnique({ where: { route: id } })
    if (type === 'service') {
      const s = SERVICES.find((x) => `/services/${x.slug}` === id)
      if (!s) return null
      return serviceToRecord(s, ov)
    } else {
      const { STATIC_PAGES } = await import('@/lib/seo')
      const p = STATIC_PAGES.find((x) => x.route === id)
      if (!p) return null
      return pageOverrideToRecord(p.route, p.name, ov)
    }
  }
  return null
}

/**
 * Find the next page needing work (score < 85), starting after the given id.
 * Used by the editor's "Next page needing work" button.
 */
export async function findNextPageNeedingWork(currentType: string, currentId: string): Promise<{ type: string; id: string } | null> {
  const { rows } = await listSeoPages({ limit: 10000 })
  const idx = rows.findIndex((r) => r.type === currentType && r.id === currentId)
  if (idx < 0) {
    // Not in list — return first <85
    const next = rows.find((r) => r.score < 85 && !(r.hidden && r.noindex))
    return next ? { type: next.type, id: next.id } : null
  }
  // Search forward from idx+1, wrapping around
  for (let i = 1; i <= rows.length; i++) {
    const candidate = rows[(idx + i) % rows.length]
    if (candidate.score < 85 && !(candidate.hidden && candidate.noindex)) {
      return { type: candidate.type, id: candidate.id }
    }
  }
  return null
}
