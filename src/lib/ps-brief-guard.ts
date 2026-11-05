/**
 * Brief guard — detects brand names, exact-item cues, links, and
 * inspiration phrases in a customer's free-text brief.
 *
 * This is a SYNC utility (not a server action) so the booking wizard
 * can import and call it directly from a Client Component without
 * an extra round-trip.
 */

export type BriefGuardResult = {
  flagged: boolean
  terms: string[]
  type: 'BRAND' | 'EXACT' | 'LINK' | 'INSPIRATION' | null
}

const BRAND_NAMES = [
  'Gucci', 'Nike', 'Prada', 'Louis Vuitton', 'LV', 'Zara', 'H&M', 'Adidas',
  'Puma', 'Balenciaga', 'Versace', 'Dolce & Gabbana', 'D&G', 'Tom Ford',
  'Ralph Lauren', 'Lacoste', 'Hugo Boss', 'Boss', 'Armani', 'Burberry',
  'Givenchy', 'Valentino', 'Off-White', 'Stone Island', 'Moncler',
  'Canada Goose', 'Fendi', 'Celine', 'Chanel', 'Dior', 'Saint Laurent',
  'YSL', 'Bottega Veneta', 'Kenzo', 'Comme des Garcons', 'CDG', 'Supreme',
  'Stüssy', 'Carhartt', 'A-Cold-Wall', 'Rhude', 'Amiri', 'Heron Preston',
  'Kith',
] as const

const EXACT_CUES = [
  'exact same', 'this exact', 'exactly this', 'the one in', 'link to',
  'url',
] as const

const LINK_CUES = ['http://', 'https://', 'www.'] as const

const INSPIRATION_CUES = [
  'inspired by', 'like the', 'similar to', 'vibe of',
] as const

/** Escape a string so it can be safely embedded in a RegExp. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** De-duplicate an array while preserving order. */
function dedupe<T>(xs: T[]): T[] {
  return Array.from(new Set(xs))
}

export function checkBriefGuard(briefText: string): BriefGuardResult {
  const text = (briefText ?? '').toLowerCase()
  if (!text.trim()) {
    return { flagged: false, terms: [], type: null }
  }
  const original = briefText ?? ''

  // ── Brand mentions ──────────────────────────────────────────────
  const matchedBrands: string[] = []
  for (const b of BRAND_NAMES) {
    if (/[ .&\-]/.test(b)) {
      if (text.includes(b.toLowerCase())) matchedBrands.push(b)
      continue
    }
    const re = new RegExp(
      `(?:^|[^a-z0-9])${escapeRegex(b.toLowerCase())}(?:[^a-z0-9]|$)`,
      'i',
    )
    if (re.test(text)) matchedBrands.push(b)
  }

  // ── Links ────────────────────────────────────────────────────────
  const matchedLinks: string[] = []
  for (const cue of LINK_CUES) {
    if (text.includes(cue)) matchedLinks.push(cue)
  }
  const urls = original.match(/https?:\/\/\S+/gi) || []
  for (const u of urls) matchedLinks.push(u)

  // ── Exact-item cues ──────────────────────────────────────────────
  const matchedExact: string[] = []
  for (const cue of EXACT_CUES) {
    if (text.includes(cue)) matchedExact.push(cue)
  }

  // ── Inspiration cues (soft notes) ────────────────────────────────
  const matchedInspiration: string[] = []
  for (const cue of INSPIRATION_CUES) {
    if (text.includes(cue)) matchedInspiration.push(cue)
  }

  // Priority: LINK > EXACT > BRAND > INSPIRATION.
  if (matchedLinks.length) {
    return { flagged: true, terms: dedupe(matchedLinks), type: 'LINK' }
  }
  if (matchedExact.length) {
    return { flagged: true, terms: dedupe(matchedExact), type: 'EXACT' }
  }
  if (matchedBrands.length) {
    return { flagged: true, terms: dedupe(matchedBrands), type: 'BRAND' }
  }
  if (matchedInspiration.length) {
    return { flagged: false, terms: dedupe(matchedInspiration), type: 'INSPIRATION' }
  }
  return { flagged: false, terms: [], type: null }
}
