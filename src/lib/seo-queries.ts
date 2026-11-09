/**
 * SEO Manager — server-side data fetching helpers.
 *
 * All the queries that build the "page list" the admin sees, with
 * pagination at the DB level. Reused by /admin/seo (overview) and
 * /admin/seo/pages (full list).
 *
 * RESILIENCE: every query that touches the new SEO columns or tables
 * is wrapped in a try/catch. If the production migration hasn't been
 * applied yet, the queries fall back to using only the pre-existing
 * columns (noindex defaults to false, inSitemap defaults to true,
 * seoH1/seoIntroText/seoOgImage default to null). This means the SEO
 * Manager UI loads successfully both before and after the migration
 * is applied — the new fields just appear empty until the migration
 * lands.
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

// ============================================================
// RESILIENT QUERIES — fall back if migration hasn't been applied
// ============================================================

type CategoryRow = {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  parent: { name: string } | null
  seoTitle: string | null
  seoDescription: string | null
  seoH1: string | null
  seoIntroText: string | null
  seoOgImage: string | null
  noindex: boolean
  inSitemap: boolean
  active: boolean
}

type ProductRow = {
  id: string
  name: string
  slug: string
  description: string
  seoTitle: string | null
  seoDescription: string | null
  seoH1: string | null
  ogImage: string | null
  noindex: boolean
  inSitemap: boolean
  published: boolean
  status: string
  images: { altText: string | null; url: string; position: number }[]
}

type OverrideRow = {
  route: string
  contentType: string
  name: string
  seoTitle: string | null
  seoDescription: string | null
  h1: string | null
  introText: string | null
  ogImage: string | null
  noindex: boolean
  inSitemap: boolean
}[]

async function fetchCategories(): Promise<CategoryRow[]> {
  try {
    // Try with the new SEO columns
    return await db.category.findMany({
      select: {
        id: true, name: true, slug: true, description: true, parentId: true,
        parent: { select: { name: true } },
        seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true,
        seoOgImage: true, noindex: true, inSitemap: true, active: true,
      },
    }) as CategoryRow[]
  } catch (e: any) {
    // Migration not applied — fall back to pre-existing columns
    console.warn('[seo-queries] new Category columns missing, using fallback:', e?.message?.slice(0, 100))
    const rows = await db.category.findMany({
      select: {
        id: true, name: true, slug: true, description: true, parentId: true,
        parent: { select: { name: true } },
        seoTitle: true, seoDescription: true, active: true,
      },
    }) as any[]
    // Apply defaults for the new columns
    return rows.map((r) => ({
      ...r,
      seoH1: null,
      seoIntroText: null,
      seoOgImage: null,
      noindex: false,
      inSitemap: true,
    })) as CategoryRow[]
  }
}

async function fetchProducts(): Promise<ProductRow[]> {
  try {
    return await db.product.findMany({
      select: {
        id: true, name: true, slug: true, description: true,
        seoTitle: true, seoDescription: true, seoH1: true, ogImage: true,
        noindex: true, inSitemap: true, published: true, status: true,
        images: { select: { altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
      },
    }) as ProductRow[]
  } catch (e: any) {
    console.warn('[seo-queries] new Product columns missing, using fallback:', e?.message?.slice(0, 100))
    const rows = await db.product.findMany({
      select: {
        id: true, name: true, slug: true, description: true,
        seoTitle: true, seoDescription: true, ogImage: true,
        published: true, status: true,
        images: { select: { altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
      },
    }) as any[]
    return rows.map((r) => ({
      ...r,
      seoH1: null,
      noindex: false,
      inSitemap: true,
    })) as ProductRow[]
  }
}

async function fetchOverrides(): Promise<OverrideRow> {
  try {
    return await db.seoOverride.findMany() as OverrideRow
  } catch (e: any) {
    console.warn('[seo-queries] SeoOverride table missing, using empty list:', e?.message?.slice(0, 100))
    return []
  }
}

// ============================================================
// LIST — for the All Pages tab
// ============================================================

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

  const [categories, products, overrides, dups] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
    fetchOverrides(),
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

// ============================================================
// OVERVIEW STATS — for the dashboard cards
// ============================================================

/**
 * Build just the overview statistics — counts for the KPI cards
 * and the per-content-type progress bars.
 */
export async function getSeoOverviewStats() {
  const { buildDuplicateMaps, checksFor, scoreFor, bandFor } = await import('@/lib/seo')
  const [categories, products, overrides, dups] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
    fetchOverrides(),
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

// ============================================================
// SINGLE RECORD — for the editor
// ============================================================

/**
 * Fetch a single record for the editor.
 */
export async function getSeoRecordForEdit(type: string, id: string): Promise<SeoPageRecord | null> {
  if (type === 'category') {
    let c: CategoryRow | null = null
    try {
      c = await db.category.findUnique({
        where: { id },
        select: {
          id: true, name: true, slug: true, description: true, parentId: true,
          parent: { select: { name: true } },
          seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true,
          seoOgImage: true, noindex: true, inSitemap: true, active: true,
        },
      }) as CategoryRow | null
    } catch (e: any) {
      console.warn('[seo-queries] falling back to legacy category fetch:', e?.message?.slice(0, 100))
      const r = await db.category.findUnique({
        where: { id },
        select: {
          id: true, name: true, slug: true, description: true, parentId: true,
          parent: { select: { name: true } },
          seoTitle: true, seoDescription: true, active: true,
        },
      }) as any
      c = r ? { ...r, seoH1: null, seoIntroText: null, seoOgImage: null, noindex: false, inSitemap: true } : null
    }
    return c ? categoryToRecord(c) : null
  }
  if (type === 'product') {
    let p: ProductRow | null = null
    try {
      p = await db.product.findUnique({
        where: { id },
        select: {
          id: true, name: true, slug: true, description: true,
          seoTitle: true, seoDescription: true, seoH1: true, ogImage: true,
          noindex: true, inSitemap: true, published: true, status: true,
          images: { select: { id: true, altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
        },
      }) as ProductRow | null
    } catch (e: any) {
      console.warn('[seo-queries] falling back to legacy product fetch:', e?.message?.slice(0, 100))
      const r = await db.product.findUnique({
        where: { id },
        select: {
          id: true, name: true, slug: true, description: true,
          seoTitle: true, seoDescription: true, ogImage: true,
          published: true, status: true,
          images: { select: { id: true, altText: true, url: true, position: true }, orderBy: { position: 'asc' } },
        },
      }) as any
      p = r ? { ...r, seoH1: null, noindex: false, inSitemap: true } : null
    }
    return p ? productToRecord(p) : null
  }
  if (type === 'service' || type === 'page') {
    let ov: OverrideRow[number] | null = null
    try {
      ov = await db.seoOverride.findUnique({ where: { route: id } }) as OverrideRow[number] | null
    } catch (e: any) {
      console.warn('[seo-queries] SeoOverride table missing, treating as no override:', e?.message?.slice(0, 100))
      ov = null
    }
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
    const next = rows.find((r) => r.score < 85 && !(r.hidden && r.noindex))
    return next ? { type: next.type, id: next.id } : null
  }
  for (let i = 1; i <= rows.length; i++) {
    const candidate = rows[(idx + i) % rows.length]
    if (candidate.score < 85 && !(candidate.hidden && candidate.noindex)) {
      return { type: candidate.type, id: candidate.id }
    }
  }
  return null
}
