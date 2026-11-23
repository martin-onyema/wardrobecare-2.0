/**
 * Global Pricing Engine — the single source of truth for product prices.
 *
 * Determines the correct selling price for a product at the current moment,
 * accounting for active sales/campaigns, manually-set sale prices, and normal prices.
 *
 * Priority:
 *   1. Active campaign price (if product is in a live campaign)
 *   2. Manually-set product.salePrice (if set and lower than price)
 *   3. Product's normal price
 *
 * Campaign prices are NEVER permanently written to the product.
 * When a campaign ends, the original price automatically becomes effective.
 */

import { db } from '@/lib/db'

// ─── Types ──────────────────────────────────────────────────────────────────

export type PriceResult = {
  /** The price the customer pays. */
  price: number
  /** The original/normal price (for showing strikethrough). */
  originalPrice: number | null
  /** True if this price comes from an active campaign. */
  isCampaignPrice: boolean
  /** True if this price comes from a manually-set salePrice. */
  isManualSale: boolean
  /** Discount percentage (0 if no discount). */
  discountPct: number
  /** Campaign ID if the price comes from a campaign. */
  saleId?: string
  /** Sale item ID if the price comes from a campaign. */
  saleItemId?: string
  /** Deal reason label if assigned. */
  dealReason?: string
  /** Deal reason type. */
  dealReasonType?: 'INFO' | 'MINOR_FLAW' | 'FINAL_CLEARANCE'
  /** Flaw note (for MINOR_FLAW). */
  flawNote?: string
  /** Flaw photo URL (for MINOR_FLAW). */
  flawPhotoUrl?: string
  /** Return rule. */
  returnRule?: 'STANDARD' | 'FLAW_DISCLOSED' | 'FINAL_SALE'
}

// ─── In-memory cache (60s TTL) ──────────────────────────────────────────────

type CachedSale = {
  saleId: string
  saleName: string
  endsAt: Date | null
  headline: string | null
  subheadline: string | null
  home: boolean
  countdown: boolean
  defaultPct: number
  items: Map<string, {
    saleItemId: string
    pct: number
    reasonId: string | null
    reasonLabel: string | null
    reasonType: string | null
    note: string | null
    flawPhotoUrl: string | null
    returnRule: string | null
  }>
}

let saleCache: { sales: CachedSale[]; at: number } | null = null
const CACHE_TTL_MS = 60 * 1000

async function getActiveSales(): Promise<CachedSale[]> {
  if (saleCache && Date.now() - saleCache.at < CACHE_TTL_MS) {
    return saleCache.sales
  }

  const now = new Date()
  try {
    const sales = await db.sale.findMany({
      where: {
        status: { in: ['SCHEDULED', 'LIVE'] },
        startsAt: { lte: now },
        OR: [
          { endsAt: null }, // clearance — no end
          { endsAt: { gte: now } },
        ],
      },
      include: {
        items: {
          include: {
            product: { select: { price: true, salePrice: true } },
          },
        },
      },
    })

    const cached: CachedSale[] = sales.map((sale) => ({
      saleId: sale.id,
      saleName: sale.name,
      endsAt: sale.endsAt,
      headline: sale.headline,
      subheadline: sale.subheadline,
      home: sale.home,
      countdown: sale.countdown,
      defaultPct: sale.defaultPct,
      items: new Map(
        sale.items.map((item) => [
          item.productId,
          {
            saleItemId: item.id,
            pct: item.pct ?? sale.defaultPct,
            reasonId: item.reasonId,
            reasonLabel: item.reason,
            reasonType: null, // resolved from DealReason if needed
            note: item.note,
            flawPhotoUrl: item.flawPhotoUrl,
            returnRule: null,
          },
        ]),
      ),
    }))

    saleCache = { sales: cached, at: Date.now() }
    return cached
  } catch (e: any) {
    // If DB unavailable, return empty — prices fall back to normal
    console.warn('[pricing] could not load active sales:', e?.message?.slice(0, 100))
    return []
  }
}

/** Invalidate the cache after campaign changes. */
export function invalidateSaleCache() {
  saleCache = null
}

// ─── Price rounding ──────────────────────────────────────────────────────────

function roundToNearest(value: number, roundTo: number): number {
  if (roundTo <= 0) return Math.round(value)
  return Math.round(value / roundTo) * roundTo
}

// ─── Core pricing function ──────────────────────────────────────────────────

/**
 * Determine the current selling price for a product.
 *
 * @param productId - The product ID
 * @param normalPrice - The product's base price
 * @param manualSalePrice - The product's manually-set salePrice (may be null)
 * @param sizePrice - Optional variant price override (if a specific size is selected)
 * @returns PriceResult with the effective price and discount metadata
 */
export async function currentPrice(
  productId: string,
  normalPrice: number,
  manualSalePrice?: number | null,
  sizePrice?: number | null,
): Promise<PriceResult> {
  const basePrice = sizePrice ?? manualSalePrice ?? normalPrice
  const referencePrice = sizePrice ?? normalPrice // for calculating discount %

  // 1. Check active campaigns
  const sales = await getActiveSales()
  for (const sale of sales) {
    const item = sale.items.get(productId)
    if (item) {
      const pct = item.pct
      const salePrice = roundToNearest(referencePrice * (1 - pct / 100), 50)
      return {
        price: salePrice,
        originalPrice: referencePrice < normalPrice ? null : normalPrice,
        isCampaignPrice: true,
        isManualSale: false,
        discountPct: pct,
        saleId: sale.saleId,
        saleItemId: item.saleItemId,
        dealReason: item.reasonLabel ?? undefined,
        dealReasonType: item.reasonType as any,
        flawNote: item.note ?? undefined,
        flawPhotoUrl: item.flawPhotoUrl ?? undefined,
        returnRule: item.returnRule as any,
      }
    }
  }

  // 2. Check manual salePrice
  if (manualSalePrice && manualSalePrice > 0 && manualSalePrice < normalPrice) {
    const pct = Math.round((1 - manualSalePrice / normalPrice) * 100)
    return {
      price: manualSalePrice,
      originalPrice: normalPrice,
      isCampaignPrice: false,
      isManualSale: true,
      discountPct: pct,
    }
  }

  // 3. Normal price
  return {
    price: basePrice,
    originalPrice: null,
    isCampaignPrice: false,
    isManualSale: false,
    discountPct: 0,
  }
}

/**
 * Batch pricing — calculate prices for multiple products at once.
 * More efficient than calling currentPrice() in a loop because it
 * loads the active sales only once.
 */
export async function batchCurrentPrices(
  products: Array<{ id: string; price: number; salePrice?: number | null }>,
): Promise<Map<string, PriceResult>> {
  const sales = await getActiveSales()
  const results = new Map<string, PriceResult>()

  for (const p of products) {
    let found = false
    for (const sale of sales) {
      const item = sale.items.get(p.id)
      if (item) {
        const pct = item.pct
        const salePrice = roundToNearest(p.price * (1 - pct / 100), 50)
        results.set(p.id, {
          price: salePrice,
          originalPrice: p.price,
          isCampaignPrice: true,
          isManualSale: false,
          discountPct: pct,
          saleId: sale.saleId,
          saleItemId: item.saleItemId,
          dealReason: item.reasonLabel ?? undefined,
        })
        found = true
        break
      }
    }

    if (!found) {
      if (p.salePrice && p.salePrice > 0 && p.salePrice < p.price) {
        const pct = Math.round((1 - p.salePrice / p.price) * 100)
        results.set(p.id, {
          price: p.salePrice,
          originalPrice: p.price,
          isCampaignPrice: false,
          isManualSale: true,
          discountPct: pct,
        })
      } else {
        results.set(p.id, {
          price: p.price,
          originalPrice: null,
          isCampaignPrice: false,
          isManualSale: false,
          discountPct: 0,
        })
      }
    }
  }

  return results
}

// ─── Effective status ────────────────────────────────────────────────────────

/**
 * Determine the effective status of a sale based on the current time.
 * A SCHEDULED sale becomes LIVE when its start time arrives.
 * A LIVE sale becomes ENDED when its end time passes.
 */
export function effectiveStatus(
  sale: { status: string; startsAt: Date; endsAt: Date | null; endedAt: Date | null },
  now: Date = new Date(),
): string {
  if (sale.status === 'ENDED' || sale.endedAt) return 'ENDED'
  if (sale.status === 'DRAFT' || sale.status === 'PENDING') return sale.status

  const hasStarted = sale.startsAt <= now
  const hasEnded = sale.endsAt ? sale.endsAt <= now : false

  if (hasEnded) return 'ENDED'
  if (hasStarted && !hasEnded) return 'LIVE'
  if (!hasStarted) return 'SCHEDULED'
  return sale.status
}

/**
 * Get the homepage campaign — the one ending soonest that is currently live
 * and has `home: true` with enough eligible products.
 */
export async function getHomepageSale(): Promise<CachedSale | null> {
  const sales = await getActiveSales()
  const liveSales = sales.filter((s) => {
    const now = new Date()
    return s.home
  })
  if (liveSales.length === 0) return null

  // Sort by endsAt ascending (soonest ending first)
  // Clearance (no endAt) goes last
  liveSales.sort((a, b) => {
    if (!a.endsAt) return 1
    if (!b.endsAt) return -1
    return a.endsAt.getTime() - b.endsAt.getTime()
  })

  return liveSales[0] ?? null
}

/**
 * Check if a product is in any active or scheduled campaign (for conflict detection).
 */
export async function isProductInActiveOrScheduledSale(productId: string, excludeSaleId?: string): Promise<boolean> {
  const sales = await getActiveSales()
  for (const sale of sales) {
    if (excludeSaleId && sale.saleId === excludeSaleId) continue
    if (sale.items.has(productId)) return true
  }

  // Also check scheduled (not yet live) sales
  try {
    const scheduled = await db.sale.findMany({
      where: {
        status: 'SCHEDULED',
        startsAt: { gt: new Date() },
      },
      select: { id: true },
    })
    if (scheduled.length === 0) return false
    const saleIds = scheduled.map((s) => s.id)
    const count = await db.saleItem.count({
      where: { productId, saleId: { in: saleIds, not: excludeSaleId } },
    })
    return count > 0
  } catch {
    return false
  }
}
