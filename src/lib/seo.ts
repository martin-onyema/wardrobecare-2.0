/**
 * SEO Manager — core helpers.
 *
 * Shared by the admin /admin/seo pages, the public generateMetadata hooks,
 * and the sitemap. Keeps the editorial-check rules in one place so the
 * admin UI, the public pages and the sitemap all agree on what "good
 * SEO" means.
 */

import { db } from '@/lib/db'
import { SERVICES } from '@/lib/services-data'

// ============================================================
// CONTENT TYPES
// ============================================================

export type SeoContentType = 'category' | 'product' | 'service' | 'page'

export type SeoPageRecord = {
  /** Stable id — for DB-backed records this is the row id; for static ones, the route. */
  id: string
  type: SeoContentType
  /** Display name shown in the admin list. */
  name: string
  /** Public URL path (e.g. "/product/abc", "/services/wardrobe-consultation", "/about"). */
  url: string
  /** Parent name (for subcategories) — display only. */
  parent?: string
  /** True if this is a "Coming Soon" service or an unpublished product — shown as a flag. */
  hidden?: boolean

  // SEO fields — all of them, normalised across content types
  seoTitle: string
  seoDescription: string
  h1: string
  introText: string
  ogImage: string
  /** Main image alt text — only meaningful for products. */
  imageAlt: string
  noindex: boolean
  inSitemap: boolean
  /** True if the underlying record is published/active. False means do not index. */
  published: boolean
}

// ============================================================
// STATIC PAGE REGISTRY
// ============================================================

// Pages that don't have a dedicated DB model. Routes that exist as .tsx
// files in src/app but aren't in services-data.ts or the catalogue.
// SEO metadata for these lives in the SeoOverride table.
export const STATIC_PAGES: { route: string; name: string }[] = [
  { route: '/', name: 'Home' },
  { route: '/shop', name: 'Shop (all products)' },
  { route: '/services', name: 'Services hub' },
  { route: '/about', name: 'About' },
  { route: '/faq', name: 'FAQ' },
  { route: '/shipping', name: 'Shipping & Delivery' },
  { route: '/returns', name: 'Returns & Exchanges' },
  { route: '/privacy', name: 'Privacy Policy' },
  { route: '/terms', name: 'Terms & Conditions' },
  { route: '/measurement-guide', name: 'Measurement Guide' },
  { route: '/track-order', name: 'Track Order' },
  { route: '/delivery-charges', name: 'Delivery Charges' },
  { route: '/gift-card', name: 'Gift Cards' },
  { route: '/digital-closet', name: 'Digital Closet' },
  { route: '/clothing', name: 'Clothing hub' },
  { route: '/footwear', name: 'Footwear hub' },
  { route: '/accessories', name: 'Accessories hub' },
  { route: '/fragrance-grooming', name: 'Fragrance & Grooming hub' },
  { route: '/bottoms', name: 'Bottoms hub' },
]

// ============================================================
// EDITORIAL CHECK RULES
// ============================================================

export type SeoCheck = {
  /** Short key — used by the overview issues list. */
  key:
    | 'title'
    | 'titleLen'
    | 'titleDup'
    | 'desc'
    | 'descLen'
    | 'descDup'
    | 'slug'
    | 'h1'
    | 'intro'
    | 'alt'
    | 'og'
    | 'idxMap'
  /** True if the check passes. */
  ok: boolean
  /** Human-readable label, suitable for the editor checklist. */
  message: string
}

export const ISSUE_LABELS: { key: SeoCheck['key']; label: string }[] = [
  { key: 'title', label: 'Pages with no SEO title' },
  { key: 'titleLen', label: 'Titles too short or too long (20–62 chars)' },
  { key: 'titleDup', label: 'Duplicate SEO titles' },
  { key: 'desc', label: 'Pages with no meta description' },
  { key: 'descLen', label: 'Descriptions too short or too long (70–160 chars)' },
  { key: 'intro', label: 'Categories / services with thin intro text (under 40 words)' },
  { key: 'alt', label: 'Products with no main image alt text' },
  { key: 'og', label: 'Pages with no social sharing image' },
  { key: 'h1', label: 'Pages with no H1 heading' },
]

const TITLE_MIN = 20
const TITLE_MAX = 62
const DESC_MIN = 70
const DESC_MAX = 160
const INTRO_MIN_WORDS = 40

function wordCount(s: string): number {
  const t = s.trim()
  return t ? t.split(/\s+/).length : 0
}

function normalize(s: string): string {
  return (s || '').trim().toLowerCase()
}

/**
 * Build the duplicate-title and duplicate-description maps across all
 * known SEO records (categories, products, services, static pages).
 * Used by the editor live checklist and the overview issues list.
 */
export async function buildDuplicateMaps(): Promise<{ titles: Record<string, number>; descs: Record<string, number> }> {
  const titles: Record<string, number> = {}
  const descs: Record<string, number> = {}

  const bump = (m: Record<string, number>, v: string) => {
    const n = normalize(v)
    if (n) m[n] = (m[n] || 0) + 1
  }

  // Categories
  const cats = await db.category.findMany({ select: { seoTitle: true, seoDescription: true, name: true } })
  for (const c of cats) {
    bump(titles, c.seoTitle || c.name)
    bump(descs, c.seoDescription || '')
  }

  // Products
  const products = await db.product.findMany({ select: { seoTitle: true, seoDescription: true, name: true } })
  for (const p of products) {
    bump(titles, p.seoTitle || p.name)
    bump(descs, p.seoDescription || '')
  }

  // Services (static) — derive default title/desc from name+tagline so duplicates can be detected too
  for (const s of SERVICES) {
    bump(titles, `${s.name} — Wardrobecare Services`)
    bump(descs, s.tagline)
  }

  // Static page overrides
  const overrides = await db.seoOverride.findMany({ select: { seoTitle: true, seoDescription: true, name: true } })
  for (const o of overrides) {
    bump(titles, o.seoTitle || o.name)
    bump(descs, o.seoDescription || '')
  }

  return { titles, descs }
}

/**
 * Compute the editorial checks for a single record.
 *
 * @param r the SEO record (already normalised — see toSeoPageRecord helpers)
 * @param dups pre-built duplicate maps (call buildDuplicateMaps() once per request)
 */
export function checksFor(r: SeoPageRecord, dups: { titles: Record<string, number>; descs: Record<string, number> }): SeoCheck[] {
  const out: SeoCheck[] = []
  const tN = normalize(r.seoTitle)
  const dN = normalize(r.seoDescription)

  out.push({ key: 'title', ok: !!r.seoTitle.trim(), message: 'Page title is set' })
  out.push({ key: 'titleLen', ok: r.seoTitle.length >= TITLE_MIN && r.seoTitle.length <= TITLE_MAX, message: `Title is ${TITLE_MIN}–${TITLE_MAX} characters (${r.seoTitle.length})` })
  out.push({ key: 'titleDup', ok: !r.seoTitle.trim() || (dups.titles[tN] ?? 0) <= 1, message: 'Title is unique across the site' })

  out.push({ key: 'desc', ok: !!r.seoDescription.trim(), message: 'Meta description is set' })
  out.push({ key: 'descLen', ok: r.seoDescription.length >= DESC_MIN && r.seoDescription.length <= DESC_MAX, message: `Description is ${DESC_MIN}–${DESC_MAX} characters (${r.seoDescription.length})` })
  out.push({ key: 'descDup', ok: !r.seoDescription.trim() || (dups.descs[dN] ?? 0) <= 1, message: 'Description is unique across the site' })

  out.push({ key: 'slug', ok: /^\/[a-z0-9\-/]*$/.test(r.url), message: 'URL is lowercase with hyphens' })
  out.push({ key: 'h1', ok: !!r.h1.trim(), message: 'Page heading (H1) is set' })

  if (r.type === 'category' || r.type === 'service') {
    out.push({ key: 'intro', ok: wordCount(r.introText) >= INTRO_MIN_WORDS, message: `Intro text is at least ${INTRO_MIN_WORDS} words (${wordCount(r.introText)})` })
  }
  if (r.type === 'product') {
    out.push({ key: 'alt', ok: !!r.imageAlt.trim(), message: 'Main image has alt text' })
  }
  out.push({ key: 'og', ok: !!r.ogImage.trim(), message: 'Social share image is set' })
  out.push({ key: 'idxMap', ok: r.noindex ? !r.inSitemap : true, message: r.noindex ? 'noindex page is excluded from sitemap' : 'Index and sitemap settings agree' })

  return out
}

/**
 * Compute the SEO score for a record. Score = checks passed ÷ checks that apply.
 * Coming-soon services / unpublished products only run slug + idxMap checks
 * (they shouldn't be indexed anyway).
 */
export function scoreFor(r: SeoPageRecord, dups: { titles: Record<string, number>; descs: Record<string, number> }): number {
  let cs = checksFor(r, dups)
  if (r.hidden && r.noindex) {
    cs = cs.filter((c) => c.key === 'slug' || c.key === 'idxMap')
  }
  if (cs.length === 0) return 100
  const passed = cs.filter((c) => c.ok).length
  return Math.round((passed / cs.length) * 100)
}

export function bandFor(score: number): { cls: 'good' | 'warn' | 'bad'; label: 'Good' | 'Needs work' | 'Poor' } {
  if (score >= 85) return { cls: 'good', label: 'Good' }
  if (score >= 60) return { cls: 'warn', label: 'Needs work' }
  return { cls: 'bad', label: 'Poor' }
}

// ============================================================
// STATIC PAGE & SERVICE REGISTRY — pulls from services-data.ts + static list
// ============================================================

/** All service routes — derived from SERVICES. */
export function serviceRoutes(): { route: string; name: string }[] {
  return SERVICES.map((s) => ({ route: `/services/${s.slug}`, name: s.name }))
}

// ============================================================
// CONVERSION HELPERS — DB rows → SeoPageRecord
// ============================================================

export function categoryToRecord(c: {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  parent?: { name: string } | null
  seoTitle: string | null
  seoDescription: string | null
  seoH1: string | null
  seoIntroText: string | null
  seoOgImage: string | null
  noindex: boolean
  inSitemap: boolean
  active: boolean
}): SeoPageRecord {
  return {
    id: c.id,
    type: 'category',
    name: c.name,
    url: `/shop?category=${c.slug}`,
    parent: c.parent?.name ?? undefined,
    seoTitle: c.seoTitle ?? '',
    seoDescription: c.seoDescription ?? c.description ?? '',
    h1: c.seoH1 ?? c.name,
    introText: c.seoIntroText ?? '',
    ogImage: c.seoOgImage ?? '',
    imageAlt: '',
    noindex: c.noindex,
    inSitemap: c.inSitemap,
    published: c.active,
  }
}

export function productToRecord(p: {
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
  images?: { altText: string | null; url: string; position: number }[]
}): SeoPageRecord {
  // Pick the first image's alt text as the "main image alt"
  const mainImage = p.images && p.images.length > 0 ? [...p.images].sort((a, b) => a.position - b.position)[0] : null
  return {
    id: p.id,
    type: 'product',
    name: p.name,
    url: `/product/${p.slug}`,
    seoTitle: p.seoTitle ?? '',
    seoDescription: p.seoDescription ?? p.description.slice(0, 160),
    h1: p.seoH1 ?? p.name,
    introText: '',
    ogImage: p.ogImage ?? '',
    imageAlt: mainImage?.altText ?? '',
    noindex: p.noindex,
    inSitemap: p.inSitemap,
    published: p.published && p.status !== 'ARCHIVED' && p.status !== 'DISCONTINUED',
  }
}

export function serviceToRecord(s: { slug: string; name: string; tagline: string; comingSoon?: boolean }, ov?: {
  seoTitle: string | null
  seoDescription: string | null
  h1: string | null
  introText: string | null
  ogImage: string | null
  noindex: boolean
  inSitemap: boolean
} | null): SeoPageRecord {
  const route = `/services/${s.slug}`
  return {
    id: route,
    type: 'service',
    name: s.name,
    url: route,
    hidden: !!s.comingSoon,
    seoTitle: ov?.seoTitle ?? `${s.name} — Wardrobecare Services`,
    seoDescription: ov?.seoDescription ?? s.tagline,
    h1: ov?.h1 ?? s.name,
    introText: ov?.introText ?? '',
    ogImage: ov?.ogImage ?? '',
    imageAlt: '',
    noindex: ov?.noindex ?? !!s.comingSoon,
    inSitemap: ov?.inSitemap ?? !s.comingSoon,
    published: !s.comingSoon,
  }
}

export function pageOverrideToRecord(route: string, name: string, ov: {
  seoTitle: string | null
  seoDescription: string | null
  h1: string | null
  introText: string | null
  ogImage: string | null
  noindex: boolean
  inSitemap: boolean
} | null): SeoPageRecord {
  return {
    id: route,
    type: 'page',
    name,
    url: route,
    seoTitle: ov?.seoTitle ?? '',
    seoDescription: ov?.seoDescription ?? '',
    h1: ov?.h1 ?? name,
    introText: ov?.introText ?? '',
    ogImage: ov?.ogImage ?? '',
    imageAlt: '',
    noindex: ov?.noindex ?? false,
    inSitemap: ov?.inSitemap ?? true,
    published: true,
  }
}

// ============================================================
// TEMPLATE FILLING
// ============================================================

export const DEFAULT_TEMPLATES: Record<SeoContentType, {
  titleTemplate: string
  descriptionTemplate: string
  introTemplate: string
  altTemplate: string
}> = {
  category: {
    titleTemplate: "Men's {name} in Lagos | Wardrobecare",
    descriptionTemplate:
      "Shop men's {name_lc} in Lagos. Delivery within Lagos in 1–24 hours; exchange within 48 hours. Wardrobecare, since 2003.",
    introTemplate:
      "Shop men's {name_lc} in Lagos, chosen by a stylist and sized for Nigerian men. Delivery within Lagos takes 1–24 hours, and exchanges are accepted within 48 hours if the size or item is wrong. Not sure what suits you? Book a Wardrobe & Style Consultation and we will help you decide.",
    altTemplate: '',
  },
  product: {
    titleTemplate: '{name} | Wardrobecare',
    descriptionTemplate:
      '{name} — shop online at Wardrobecare, Lagos. Delivery within Lagos in 1–24 hours; exchange within 48 hours if the size or item is wrong.',
    introTemplate: '',
    altTemplate: '{name} — front view',
  },
  service: {
    titleTemplate: '{name} in Lagos | Wardrobecare',
    descriptionTemplate:
      '{name} in Lagos — book online with Wardrobecare. Menswear styling and shopping services since 2003.',
    introTemplate: '',
    altTemplate: '',
  },
  page: {
    titleTemplate: '{name} | Wardrobecare',
    descriptionTemplate:
      '{name} — Wardrobecare, menswear styling, shopping and services in Lagos, Nigeria.',
    introTemplate: '',
    altTemplate: '',
  },
}

/**
 * Replace {name} and {name_lc} tokens in a template string.
 */
export function fillTemplate(template: string, name: string): string {
  if (!template) return ''
  return template.replace(/\{name_lc\}/g, name.toLowerCase()).replace(/\{name\}/g, name)
}

/**
 * Get the current template for a content type, falling back to defaults
 * if none is stored in the DB.
 */
export async function getTemplate(contentType: SeoContentType) {
  const stored = await db.seoTemplate.findUnique({ where: { contentType } })
  const def = DEFAULT_TEMPLATES[contentType]
  return {
    contentType,
    titleTemplate: stored?.titleTemplate ?? def.titleTemplate,
    descriptionTemplate: stored?.descriptionTemplate ?? def.descriptionTemplate,
    introTemplate: stored?.introTemplate ?? def.introTemplate,
    altTemplate: stored?.altTemplate ?? def.altTemplate,
  }
}

/**
 * Get all four templates, with defaults applied.
 */
export async function getAllTemplates() {
  const types: SeoContentType[] = ['category', 'product', 'service', 'page']
  const stored = await db.seoTemplate.findMany()
  const byType = new Map(stored.map((t) => [t.contentType, t]))
  return types.map((type) => {
    const s = byType.get(type)
    const def = DEFAULT_TEMPLATES[type]
    return {
      contentType: type,
      titleTemplate: s?.titleTemplate ?? def.titleTemplate,
      descriptionTemplate: s?.descriptionTemplate ?? def.descriptionTemplate,
      introTemplate: s?.introTemplate ?? def.introTemplate,
      altTemplate: s?.altTemplate ?? def.altTemplate,
    }
  })
}

// ============================================================
// SEO OVERRIDE LOOKUP — for static pages & services
// ============================================================

/**
 * Get the SEO override for a route, if any. Returns null if no override exists.
 * Used by the public generateMetadata hooks for static pages and services.
 */
export async function getSeoOverride(route: string) {
  return db.seoOverride.findUnique({ where: { route } })
}

/**
 * Get or create the SEO override for a route. Used by the admin editor
 * when the user opens a static page or service for the first time —
 * we create an empty row they can fill in.
 */
export async function getOrCreateSeoOverride(route: string, contentType: 'page' | 'service', name: string) {
  const existing = await db.seoOverride.findUnique({ where: { route } })
  if (existing) return existing
  return db.seoOverride.create({
    data: { route, contentType, name },
  })
}
