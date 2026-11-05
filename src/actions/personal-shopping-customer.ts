/**
 * Personal Shopping — customer-facing server actions.
 *
 * Customer flow:
 *   1. Wizard computes a brief → `checkBriefGuard` (sync, client-callable)
 *      flags brand / exact-item / link mentions so the UI can show the
 *      PS-vs-Premium-Sourcing interstitial (Mockup 50).
 *   2. Customer picks a tier (DELIVERED or IN_PERSON_FITTING). For
 *      IN_PERSON_FITTING the wizard calls `getPSAvailableSlots` and the
 *      customer picks a date + time.
 *   3. `createPersonalShoppingRequest` creates the request row
 *      (status=NEW), the PSBrief row, an optional PSBriefFlag (if the
 *      brief triggered a brand/exact/link alert and the customer
 *      acknowledged), an optional PSSlot (held for 10 min, only for
 *      IN_PERSON_FITTING) and validates the promo code if supplied.
 *   4. `initializePSPayment` creates a Paystack tx for the sourcing fee
 *      (the deposit that books the service).
 *   5. `confirmPSPayment` verifies the Paystack tx and stamps `paidAt`.
 *      Status stays NEW — staff still need to accept the request.
 *
 * After staff have sourced a shortlist and the customer receives the
 * review link:
 *   6. `getShortlistByToken` loads the shortlist + items + request info.
 *   7. `submitItemDecision` records KEEP / SKIP / WANTS_DIFFERENT on
 *      each PSShortlistItem, with decidedBy=CUSTOMER.
 *   8. `requestMoreItems` lets the customer push back ("none of these
 *      suit me"). Writes a PSEvent so the stylist knows to re-source.
 *   9. `payForItems` (online review flow) sums the KEEP items + delivery
 *      fee and creates a Paystack link for the balance.
 *
 * NOTE on 'use server':
 * The directive is applied per-function (not at the file level) so the
 * synchronous `checkBriefGuard` helper can also live in this file and
 * be imported by the booking wizard client-side without forcing it
 * through the server-action boundary. A file-level 'use server' would
 * require every export to be an async function.
 */

import { db } from '@/lib/db'
import { getSession } from '@/lib/session'
import {
  initializePaystackTransaction,
  verifyPaystackTransaction,
} from '@/lib/paystack/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// ============================================================
// Constants
// ============================================================

/** Slot times offered for in-person fittings (Mon–Sat). */
const PS_SLOT_TIMES = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] as const

const PS_SERVICE_NAME = 'Personal Shopping'
const PS_HOLD_SECONDS = 10 * 60 // 10-minute slot hold

// ============================================================
// Helpers
// ============================================================

/**
 * Write a PSEvent row. Best-effort — failures are swallowed so the
 * customer flow never aborts just because the audit trail couldn't be
 * written (mirrors `writePSEvent` in personal-shopping-workflow.ts).
 */
async function writePSEvent(
  requestId: string,
  opts: { actorType?: string; note?: string | null; actorId?: string | null } = {},
) {
  try {
    await db.pSEvent.create({
      data: {
        requestId,
        actorId: opts.actorId ?? null,
        actorType: opts.actorType ?? 'CUSTOMER',
        note: opts.note ?? null,
      },
    })
  } catch (e) {
    console.warn(
      '[personal-shopping-customer] writePSEvent failed:',
      (e as Error).message,
    )
  }
}

/**
 * Compute the next PS ref off the *highest* existing suffix. Same
 * approach as `nextBookingNumber` in consultations.ts — using
 * count()+1 would collide after rows are deleted (count goes down,
 * next number clashes with an existing one). Walking the max suffix
 * keeps the sequence monotonic.
 *
 * Falls back to 1 if no WC-PS-* requests exist yet.
 */
async function nextPSRef(): Promise<string> {
  const last = await db.personalShoppingRequest.findFirst({
    where: { ref: { startsWith: 'WC-PS-' } },
    orderBy: { ref: 'desc' },
    select: { ref: true },
  })
  let next = 1
  if (last) {
    const m = last.ref.match(/^WC-PS-(\d+)$/)
    if (m) next = parseInt(m[1], 10) + 1
  }
  return `WC-PS-${String(next).padStart(4, '0')}`
}

/** Normalise a date string `YYYY-MM-DD` into a UTC midnight DateTime. */
function dateOnly(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
}

/** Format a Date back into a `YYYY-MM-DD` string (UTC, no time shift). */
function ymd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** Escape a string so it can be safely embedded in a RegExp. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** De-duplicate an array while preserving order. */
function dedupe<T>(xs: T[]): T[] {
  return Array.from(new Set(xs))
}

/**
 * Resolve the sourcing fee for a given tier from the PSServiceSetting
 * singleton. Falls back to the schema defaults (45,000 / 50,000) when
 * the row doesn't exist yet (mirrors computeFittingTotal in the
 * admin workflow).
 */
async function resolveSourcingFee(
  tier: 'DELIVERED' | 'IN_PERSON_FITTING',
): Promise<number> {
  const settings = await db.pSServiceSetting.findUnique({ where: { id: 'singleton' } })
  if (!settings) {
    return tier === 'IN_PERSON_FITTING' ? 50000 : 45000
  }
  return tier === 'IN_PERSON_FITTING'
    ? settings.inPersonFittingFee
    : settings.deliveredFee
}

/**
 * Validate a promo code and return the discount + final fee.
 * Returns null when the code is invalid (inactive, expired, or unknown).
 */
async function validatePSPromoCode(
  code: string,
): Promise<{ code: string; type: string; value: number; label: string } | null> {
  const upper = code.trim().toUpperCase()
  if (!upper) return null
  const row = await db.pSPromoCode.findUnique({ where: { code: upper } })
  if (!row) return null
  if (!row.active) return null
  if (row.expiresAt && row.expiresAt.getTime() < Date.now()) return null
  // No explicit maxUses column on the schema — the admin disables codes
  // once they've been used enough, so timesUsed alone isn't a hard limit.
  return { code: row.code, type: row.type, value: row.value, label: row.code }
}

/**
 * Compute the discount amount and the final fee given a promo code row
 * and the list fee. Mirrors the semantics used in
 * personal-shopping-workflow.ts:
 *   - PERCENT: discount = listFee * value / 100  (value 1–100)
 *   - FIXED:   discount = value                  (naira amount off)
 *   - FREE:    discount = listFee                (full sourcing fee waived)
 *
 * The discount is clamped so the final fee never goes below zero.
 */
function applyPromoDiscount(
  listFee: number,
  promo: { type: string; value: number; label: string },
): { discountAmount: number; finalFee: number; discountLabel: string } {
  let discountAmount = 0
  if (promo.type === 'PERCENT') {
    const pct = Math.min(100, Math.max(0, promo.value))
    discountAmount = Math.round((listFee * pct) / 100)
  } else if (promo.type === 'FIXED') {
    discountAmount = Math.min(listFee, Math.max(0, promo.value))
  } else if (promo.type === 'FREE') {
    discountAmount = listFee
  }
  discountAmount = Math.min(discountAmount, listFee)
  const finalFee = listFee - discountAmount
  const discountLabel = promo.type === 'FREE'
    ? `Promo ${promo.label}: free sourcing`
    : promo.type === 'PERCENT'
      ? `Promo ${promo.label}: ${promo.value}% off sourcing fee`
      : `Promo ${promo.label}: ₦${promo.value.toLocaleString()} off sourcing fee`
  return { discountAmount, finalFee, discountLabel }
}

// ============================================================
// 1. Brief guard — SYNC (not a server action)
// ============================================================

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

export type BriefGuardResult = {
  flagged: boolean
  terms: string[]
  type: 'BRAND' | 'EXACT' | 'LINK' | 'INSPIRATION' | null
}

/**
 * Detect brand names, exact-item cues, links and "inspiration" cues in
 * a customer's free-text brief.
 *
 * Hard alerts (flagged=true):
 *   - LINK:  http(s)/www URL in the brief — most specific
 *   - EXACT: "exact same", "this exact", "the one in", "link to", "url"
 *   - BRAND: any of the known brand names appears
 *
 * Soft note (flagged=false, type=INSPIRATION):
 *   - "inspired by", "like the", "similar to", "vibe of"
 *
 * When multiple categories match, the most specific (LINK > EXACT >
 * BRAND > INSPIRATION) is returned as `type`. `terms` carries every
 * matched term so the UI can show the customer exactly what was
 * flagged.
 *
 * This function is sync and exported WITHOUT a `'use server'`
 * directive so the booking wizard can import and call it directly
 * from a Client Component without an extra round-trip. All other
 * exports in this file use the function-level `'use server'`
 * directive and become Server Actions.
 */
export function checkBriefGuard(briefText: string): BriefGuardResult {
  const text = (briefText ?? '').toLowerCase()
  if (!text.trim()) {
    return { flagged: false, terms: [], type: null }
  }
  const original = briefText ?? ''

  // ── Brand mentions ──────────────────────────────────────────────
  const matchedBrands: string[] = []
  for (const b of BRAND_NAMES) {
    // Multi-word / punctuation-containing brands ("Louis Vuitton",
    // "H&M", "Off-White", "D&G", "A-Cold-Wall", "Comme des Garcons"):
    // the spaces / punctuation already provide a natural boundary so a
    // plain substring match is precise enough.
    if (/[ .&\-]/.test(b)) {
      if (text.includes(b.toLowerCase())) matchedBrands.push(b)
      continue
    }
    // Single-word brands — use a boundary regex so "LV" doesn't match
    // inside "loved" and "Armani" doesn't match inside "Harmanique".
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
  // Pull out the actual URLs so the UI can show them verbatim.
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

// ============================================================
// 2. getPSAvailableSlots — In-Person fitting slots
// ============================================================

/**
 * Return the available In-Person fitting slots for the next N days
 * starting at `from` (YYYY-MM-DD). Sundays are skipped (sessions run
 * Monday to Saturday). The four daily slot times are 9:00 AM,
 * 11:30 AM, 2:00 PM and 4:30 PM — same grid as Wardrobe Consultations.
 *
 * A slot is excluded if either:
 *   - a `PSSlot` row exists for that date+start with an active hold
 *     (heldUntil IS NULL means booked; heldUntil > now means held
 *     during checkout; heldUntil < now means the hold expired and the
 *     slot is free again), OR
 *   - a `PersonalShoppingRequest` exists with tier=IN_PERSON_FITTING,
 *     status not CANCELLED/DONE, fittingDate matching the day and
 *     fittingTime matching the slot.
 *
 * `mode` is the tier the customer has picked. When the customer is on
 * the DELIVERED tier there are no fitting slots — return [] so the
 * wizard can skip the slot picker.
 */
export async function getPSAvailableSlots(input: {
  from: string
  days: number
  mode: string
}) {
  'use server'
  if (!input?.from || !/^\d{4}-\d{2}-\d{2}$/.test(input.from)) {
    return []
  }
  if (input.mode !== 'IN_PERSON_FITTING') return []

  const days = Math.max(1, Math.min(60, Number(input.days) || 14))
  const start = dateOnly(input.from)
  // Build the day list — inclusive of `from`, exclusive of `from + days`.
  const dayList: Date[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000)
    if (d.getUTCDay() === 0) continue // skip Sundays
    dayList.push(d)
  }
  if (!dayList.length) return []

  const rangeStart = dayList[0]
  const rangeEnd = new Date(
    dayList[dayList.length - 1].getTime() + 24 * 60 * 60 * 1000,
  )

  // Active PSSlots — held or already booked.
  const heldSlots = await db.pSSlot.findMany({
    where: {
      date: { gte: rangeStart, lt: rangeEnd },
      OR: [{ heldUntil: null }, { heldUntil: { gt: new Date() } }],
    },
    select: { date: true, start: true },
  })

  // Active PS requests (tier=IN_PERSON_FITTING, not CANCELLED/DONE).
  const booked = await db.personalShoppingRequest.findMany({
    where: {
      tier: 'IN_PERSON_FITTING',
      status: { notIn: ['CANCELLED', 'DONE'] },
      fittingDate: { gte: rangeStart, lt: rangeEnd },
    },
    select: { fittingDate: true, fittingTime: true },
  })

  const taken = new Set<string>()
  for (const s of heldSlots) {
    taken.add(`${ymd(s.date)}|${s.start}`)
  }
  for (const b of booked) {
    if (b.fittingDate && b.fittingTime) {
      taken.add(`${ymd(b.fittingDate)}|${b.fittingTime}`)
    }
  }

  const out: { date: string; time: string; fullLabel: string }[] = []
  for (const d of dayList) {
    const ds = ymd(d)
    for (const time of PS_SLOT_TIMES) {
      if (taken.has(`${ds}|${time}`)) continue
      out.push({
        date: ds,
        time,
        fullLabel: `${ds} · ${time}`,
      })
    }
  }
  return out
}

// ============================================================
// 3. createPersonalShoppingRequest
// ============================================================

const createSchema = z.object({
  customerName: z.string().min(2, 'Please enter your full name.'),
  customerPhone: z.string().min(7, 'Please enter a valid phone number.'),
  contactVia: z.enum(['Call', 'WhatsApp', 'Email']),
  shoppingFor: z.string().min(1, 'Please tell us who this is for.'),
  tier: z.enum(['DELIVERED', 'IN_PERSON_FITTING']),
  reviewMethod: z.enum(['ONLINE', 'WHATSAPP', 'ONSITE']).default('ONLINE'),
  area: z.string().optional(),
  isLagos: z.boolean().default(true),
  brief: z.string().min(5, 'Tell us a bit more about what you need.'),
  categories: z.string().min(1, 'Pick at least one category.'),
  colours: z.string().min(1, 'Pick at least one colour.'),
  budget: z.string().min(1, 'Pick a budget band.'),
  neededBy: z.string().optional(),
  brandTerms: z.array(z.string()).optional(),
  brandChoice: z.enum(['CONTINUED_ACK', 'WAITLIST']).optional(),
  fitDate: z.string().optional(), // YYYY-MM-DD
  fitTime: z.string().optional(), // "9:00 AM"
  promoCode: z.string().optional(),
  // Optional structured brief fields (forward-compat with a richer
  // wizard). Stored on PSBrief; defaults to null when not provided.
  fit: z.string().optional(),
  style: z.string().optional(),
  occasion: z.string().optional(),
  budgetBand: z.string().optional(),
  sizes: z.string().optional(),
})

export async function createPersonalShoppingRequest(
  input: z.infer<typeof createSchema>,
) {
  'use server'
  const parsed = createSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.',
    } as const
  }
  const d = parsed.data

  // For the in-person fitting tier the customer must pick a slot.
  if (d.tier === 'IN_PERSON_FITTING') {
    if (!d.fitDate || !/^\d{4}-\d{2}-\d{2}$/.test(d.fitDate)) {
      return { ok: false, error: 'Please pick a fitting date.' } as const
    }
    if (!d.fitTime || !d.fitTime.trim()) {
      return { ok: false, error: 'Please pick a fitting time.' } as const
    }
    const slotDateObj = dateOnly(d.fitDate)
    if (slotDateObj.getUTCDay() === 0) {
      return {
        ok: false,
        error: 'Fittings run Monday to Saturday. Please pick another date.',
      } as const
    }
    if (!PS_SLOT_TIMES.includes(d.fitTime as (typeof PS_SLOT_TIMES)[number])) {
      return { ok: false, error: 'Please pick one of the listed times.' } as const
    }
  }

  // Validate the promo code (if supplied) before we touch the DB. We
  // re-resolve the discount AFTER we know the list fee.
  let promo: { code: string; type: string; value: number; label: string } | null = null
  if (d.promoCode && d.promoCode.trim()) {
    promo = await validatePSPromoCode(d.promoCode)
    if (!promo) {
      return { ok: false, error: 'That promo code is invalid or has expired.' } as const
    }
  }

  // Optional: link to authenticated user (so the request shows up on
  // the customer's account page if they're signed in).
  const session = await getSession()
  const userId = session?.user?.id || null

  // Determine the list fee from PSServiceSetting (or schema default).
  const listFee = await resolveSourcingFee(d.tier)
  let sourcingFeePaid = listFee
  let discountAmount = 0
  let discountLabel: string | null = null
  if (promo) {
    const applied = applyPromoDiscount(listFee, promo)
    sourcingFeePaid = applied.finalFee
    discountAmount = applied.discountAmount
    discountLabel = applied.discountLabel
  }

  // ── Slot clash check (IN_PERSON_FITTING only) ───────────────────
  // Re-check the slot is still free right before creating the request.
  // The customer may have lingered on the wizard between fetching the
  // available slots and submitting.
  let slotDateObj: Date | null = null
  if (d.tier === 'IN_PERSON_FITTING' && d.fitDate && d.fitTime) {
    slotDateObj = dateOnly(d.fitDate)
    const dayStart = slotDateObj
    const dayEnd = new Date(slotDateObj.getTime() + 24 * 60 * 60 * 1000)

    // Active PSSlot at this exact date+start.
    const heldClash = await db.pSSlot.findFirst({
      where: {
        date: { gte: dayStart, lt: dayEnd },
        start: d.fitTime,
        OR: [{ heldUntil: null }, { heldUntil: { gt: new Date() } }],
      },
      select: { id: true },
    })
    if (heldClash) {
      return {
        ok: false,
        error: `That slot was just taken. Please pick another time on ${d.fitDate}.`,
      } as const
    }

    // Existing paid/active PS request at this exact date+time.
    const reqClash = await db.personalShoppingRequest.findFirst({
      where: {
        tier: 'IN_PERSON_FITTING',
        status: { notIn: ['CANCELLED', 'DONE'] },
        fittingDate: { gte: dayStart, lt: dayEnd },
        fittingTime: d.fitTime,
      },
      select: { id: true },
    })
    if (reqClash) {
      return {
        ok: false,
        error: `That slot was just taken. Please pick another time on ${d.fitDate}.`,
      } as const
    }
  }

  // ── Create the request ──────────────────────────────────────────
  // Retry loop: if two customers submit at the same time, both could
  // compute the same WC-PS-#### off the current max suffix and one
  // would fail on the unique constraint. We retry up to 3 times with a
  // fresh number each time (mirrors consultations.ts).
  let attempts = 0
  let created: { id: string; ref: string } | null = null
  while (attempts < 3) {
    attempts++
    const ref = await nextPSRef()
    try {
      created = await db.personalShoppingRequest.create({
        data: {
          ref,
          userId,
          customerName: d.customerName.trim(),
          customerPhone: d.customerPhone.trim(),
          contactVia: d.contactVia,
          shoppingFor: d.shoppingFor.trim(),
          tier: d.tier,
          reviewMethod: d.reviewMethod,
          area: d.area?.trim() || null,
          isLagos: d.isLagos,
          brief: d.brief.trim(),
          categories: d.categories.trim(),
          colours: d.colours.trim(),
          budget: d.budget.trim(),
          neededBy: d.neededBy?.trim() || null,
          brandMentioned:
            d.brandTerms && d.brandTerms.length
              ? d.brandTerms.join(', ')
              : null,
          brandAcknowledged: d.brandChoice ?? null,
          sourcingFeePaid,
          discountAmount,
          discountLabel,
          status: 'NEW',
          // Persist the picked fitting slot on the request so
          // getPSAvailableSlots sees it even before the PSSlot row is
          // created (and after the 10-minute hold expires).
          fittingDate: slotDateObj,
          fittingTime: d.fitTime?.trim() || null,
        },
        select: { id: true, ref: true },
      })
      break
    } catch (e: any) {
      const msg = (e?.message ?? '') as string
      if (
        msg.includes('unique') ||
        msg.includes('Unique') ||
        msg.includes('UNIQUE') ||
        msg.includes('P2002')
      ) {
        await new Promise((r) => setTimeout(r, 50 * attempts))
        continue
      }
      return {
        ok: false,
        error: msg || 'Could not create your request. Please try again.',
      } as const
    }
  }
  if (!created) {
    return {
      ok: false,
      error: 'We could not reserve your request just now. Please try again in a moment.',
    } as const
  }

  const requestId = created.id
  const ref = created.ref

  // ── PSBrief ────────────────────────────────────────────────────
  // Always create a PSBrief row — the free-text brief lives on the
  // request (column `brief`) and on PSBrief (column `notes`) so the
  // shortlist builder can read the structured form separately from the
  // flat request row.
  try {
    await db.pSBrief.create({
      data: {
        requestId,
        fit: d.fit?.trim() || null,
        style: d.style?.trim() || null,
        occasion: d.occasion?.trim() || null,
        budgetBand: d.budgetBand?.trim() || null,
        sizes: d.sizes?.trim() || null,
        notes: d.brief.trim(),
      },
    })
  } catch (e) {
    console.warn(
      '[personal-shopping-customer] PSBrief create failed:',
      (e as Error).message,
    )
    // Non-fatal — the request row is the source of truth.
  }

  // ── PSBriefFlag (if brand/exact/link was detected & customer ack'd) ──
  if (d.brandTerms && d.brandTerms.length && d.brandChoice) {
    try {
      await db.pSBriefFlag.create({
        data: {
          requestId,
          terms: d.brandTerms.join(', '),
          customerChoice: d.brandChoice,
        },
      })
    } catch (e) {
      console.warn(
        '[personal-shopping-customer] PSBriefFlag create failed:',
        (e as Error).message,
      )
    }
  }

  // ── PSSlot (IN_PERSON_FITTING only) ─────────────────────────────
  if (d.tier === 'IN_PERSON_FITTING' && slotDateObj && d.fitTime) {
    const holdUntil = new Date(Date.now() + PS_HOLD_SECONDS * 1000)
    try {
      await db.pSSlot.create({
        data: {
          requestId,
          date: slotDateObj,
          start: d.fitTime.trim(),
          area: d.area?.trim() || null,
          heldUntil: holdUntil,
        },
      })
    } catch (e) {
      console.warn(
        '[personal-shopping-customer] PSSlot create failed:',
        (e as Error).message,
      )
      // Non-fatal — the request's fittingDate/fittingTime still gate the
      // slot from being booked by another customer.
    }
  }

  // ── Promo code usage bump ───────────────────────────────────────
  if (promo) {
    try {
      await db.pSPromoCode.update({
        where: { code: promo.code },
        data: { timesUsed: { increment: 1 } },
      })
    } catch (e) {
      console.warn(
        '[personal-shopping-customer] promo timesUsed increment failed:',
        (e as Error).message,
      )
    }
  }

  await writePSEvent(requestId, {
    actorType: userId ? 'CUSTOMER' : 'SYSTEM',
    actorId: userId,
    note: `Created ${ref} (${d.tier}${promo ? `, ${discountLabel}` : ''})`,
  })

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, ref, requestId } as const
}

// ============================================================
// 4. initializePSPayment
// ============================================================

/**
 * Initialize a Paystack transaction for the sourcing fee. Mirrors
 * `initializeConsultationPayment` in consultations.ts:
 *   - look up the request by id
 *   - only allow payment while the request is still NEW (not yet
 *     accepted by staff)
 *   - synthesize a placeholder Paystack email (the customer's real
 *     contact channel is the phone)
 *   - return the authorization_url the wizard redirects to
 *
 * The Paystack reference is `<ref>-<random>` — the webhook matches the
 * `WC-PS-` prefix to route charge.success back to the PS handler.
 */
export async function initializePSPayment(requestId: string) {
  'use server'
  if (!requestId) return { ok: false, error: 'Missing request id.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: {
      id: true,
      ref: true,
      customerName: true,
      customerPhone: true,
      sourcingFeePaid: true,
      status: true,
    },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'NEW') {
    return {
      ok: false,
      error: 'This request is no longer awaiting payment.',
    } as const
  }
  if (req.sourcingFeePaid <= 0) {
    // Promo code brought the sourcing fee to zero — nothing to charge.
    // Stamp paidAt so the staff see the request as ready to accept.
    try {
      await db.personalShoppingRequest.update({
        where: { id: req.id },
        data: { paidAt: new Date() },
      })
    } catch {}
    await writePSEvent(req.id, {
      actorType: 'SYSTEM',
      note: `Sourcing fee waived — marked paid automatically for ${req.ref}`,
    })
    return {
      ok: true,
      reference: null,
      authorizationUrl: null,
      amount: 0,
      feeWaived: true,
    } as const
  }

  // Paystack reference: WC-PS-####-<random> — unique, and our webhook
  // can match the prefix `WC-PS-` to route to the PS handler.
  const reference = `${req.ref}-${Math.random().toString(36).slice(2, 10)}`

  // Persist the reference so the webhook + verify can find the row.
  try {
    await db.personalShoppingRequest.update({
      where: { id: req.id },
      data: { paymentReference: reference },
    })
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Could not initialise payment. Please try again.',
    } as const
  }

  const siteUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const callbackUrl = `${siteUrl}/services/personal-shopping/confirmed`
  const init = await initializePaystackTransaction({
    email: `${req.ref.toLowerCase()}@wardrobecare.booking`,
    amount: req.sourcingFeePaid,
    reference,
    callback_url: callbackUrl,
    metadata: {
      request_ref: req.ref,
      service: PS_SERVICE_NAME,
      customer_name: req.customerName,
      customer_phone: req.customerPhone,
      custom_fields: [
        {
          display_name: 'Request',
          variable_name: 'request_ref',
          value: req.ref,
        },
        {
          display_name: 'Service',
          variable_name: 'service',
          value: PS_SERVICE_NAME,
        },
        {
          display_name: 'Sourcing fee',
          variable_name: 'sourcing_fee',
          value: `₦${req.sourcingFeePaid.toLocaleString()}`,
        },
      ],
    },
  })

  if (!init.status) {
    return {
      ok: false,
      error: init.message || 'Could not initialise payment.',
    } as const
  }

  return {
    ok: true,
    reference,
    authorizationUrl: init.data.authorization_url,
    amount: req.sourcingFeePaid,
    feeWaived: false,
  } as const
}

// ============================================================
// 5. confirmPSPayment
// ============================================================

/**
 * Verify a Paystack transaction for a PS sourcing-fee payment and mark
 * the request paid. Mirrors `confirmConsultationPayment`:
 *   - look up the request by paymentReference
 *   - idempotent — if the request is already paid (paidAt set), return ok
 *   - verify with Paystack
 *   - stamp paidAt
 *   - status STAYS NEW (staff still need to accept the request —
 *     `adminAcceptPSRequest` in personal-shopping-workflow.ts gates on
 *     status==='NEW')
 *   - write a PSEvent so the audit trail shows the payment
 *
 * Both the client verify (this function) and the webhook are
 * idempotent — whichever lands first wins, the second is a no-op.
 */
export async function confirmPSPayment(reference: string) {
  'use server'
  if (!reference) return { ok: false, error: 'Missing payment reference.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { paymentReference: reference },
    select: {
      id: true,
      ref: true,
      status: true,
      paidAt: true,
      sourcingFeePaid: true,
      userId: true,
    },
  })
  if (!req) {
    return { ok: false, error: 'Request not found for that reference.' } as const
  }

  // Idempotent — already paid. (We keep status as NEW, so a re-verify
  // after the webhook has landed is a no-op rather than an error.)
  if (req.paidAt) {
    return { ok: true, ref: req.ref, alreadyPaid: true } as const
  }

  // Verify with Paystack
  const verify = await verifyPaystackTransaction(reference)
  if (!verify || !verify.status || verify.data.status !== 'success') {
    return {
      ok: false,
      error: 'Payment could not be verified. If you were charged, please contact us.',
    } as const
  }

  let didUpdate = false
  try {
    await db.$transaction(async (tx) => {
      const fresh = await tx.personalShoppingRequest.findUnique({
        where: { id: req.id },
        select: { paidAt: true },
      })
      if (!fresh) return
      if (fresh.paidAt) return // raced with the webhook
      await tx.personalShoppingRequest.update({
        where: { id: req.id },
        data: { paidAt: new Date() },
      })
      didUpdate = true
    })
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Could not mark request as paid.',
    } as const
  }

  if (didUpdate) {
    await writePSEvent(req.id, {
      actorType: 'SYSTEM',
      actorId: req.userId,
      note: `Sourcing fee paid for ${req.ref} (₦${req.sourcingFeePaid.toLocaleString()}) — awaiting staff acceptance`,
    })
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, ref: req.ref } as const
}

// ============================================================
// 6. getShortlistByToken
// ============================================================

/**
 * Public lookup used by the online shortlist review page
 * (/services/personal-shopping/shortlist/[token]). Returns:
 *   - the shortlist (id, sentAt, channel, holdUntil)
 *   - the items (one row per PSShortlistItem)
 *   - request info (customerName, brief, budget, ref, tier)
 *
 * Returns null if:
 *   - the token doesn't match a shortlist, OR
 *   - the shortlist has not been sent yet (sentAt is null) — the page
 *     shouldn't be reachable before the stylist sends the link.
 */
export async function getShortlistByToken(token: string) {
  'use server'
  if (!token || !token.trim()) return null

  const shortlist = await db.pSShortlist.findUnique({
    where: { token: token.trim() },
    select: {
      id: true,
      requestId: true,
      token: true,
      sentAt: true,
      channel: true,
      holdUntil: true,
      createdAt: true,
    },
  })
  if (!shortlist) return null
  if (!shortlist.sentAt) return null // not yet sent to the customer

  const [items, request] = await Promise.all([
    db.pSShortlistItem.findMany({
      where: { shortlistId: shortlist.id },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        category: true,
        size: true,
        price: true,
        source: true,
        stylistNote: true,
        decision: true,
        altNote: true,
        decidedBy: true,
        decidedAt: true,
        createdAt: true,
      },
    }),
    db.personalShoppingRequest.findUnique({
      where: { id: shortlist.requestId },
      select: {
        ref: true,
        customerName: true,
        brief: true,
        budget: true,
        tier: true,
        reviewMethod: true,
        area: true,
        isLagos: true,
        status: true,
      },
    }),
  ])
  if (!request) return null

  return {
    shortlist: {
      id: shortlist.id,
      token: shortlist.token,
      channel: shortlist.channel,
      sentAt: shortlist.sentAt.toISOString(),
      holdUntil: shortlist.holdUntil ? shortlist.holdUntil.toISOString() : null,
    },
    request: {
      ref: request.ref,
      customerName: request.customerName,
      brief: request.brief,
      budget: request.budget,
      tier: request.tier,
      reviewMethod: request.reviewMethod,
      area: request.area,
      isLagos: request.isLagos,
      status: request.status,
    },
    items: items.map((i) => ({
      ...i,
      decidedAt: i.decidedAt ? i.decidedAt.toISOString() : null,
      createdAt: i.createdAt.toISOString(),
    })),
  }
}

// ============================================================
// 7. submitItemDecision
// ============================================================

const decisionValues = ['KEEP', 'SKIP', 'WANTS_DIFFERENT'] as const

/**
 * Record the customer's decision on a single shortlist item. Called
 * from the online review page when the customer taps Keep / Skip /
 * "Want something different" on each row.
 *
 * The customer may flip a decision back and forth freely while the
 * shortlist is still open. `decidedBy=CUSTOMER` is stamped so the
 * stylist can distinguish customer-set decisions from staff overrides
 * (the admin workflow records STAFF via `adminRecordItemDecision`).
 *
 * For `WANTS_DIFFERENT` the customer can add a free-text `altNote`
 * saying what they want instead (the field is cleared if the customer
 * later flips to KEEP/SKIP — same behaviour as the admin side).
 */
export async function submitItemDecision(
  token: string,
  itemId: string,
  decision: string,
  altNote?: string,
) {
  'use server'
  if (!token || !token.trim()) {
    return { ok: false, error: 'Missing shortlist token.' } as const
  }
  if (!itemId) return { ok: false, error: 'Missing item id.' } as const
  if (!decisionValues.includes(decision as (typeof decisionValues)[number])) {
    return { ok: false, error: 'Invalid decision.' } as const
  }
  const decisionValue = decision as (typeof decisionValues)[number]

  const shortlist = await db.pSShortlist.findUnique({
    where: { token: token.trim() },
    select: { id: true, requestId: true, sentAt: true },
  })
  if (!shortlist || !shortlist.sentAt) {
    return { ok: false, error: 'Shortlist not found.' } as const
  }

  const item = await db.pSShortlistItem.findUnique({
    where: { id: itemId },
    select: { id: true, shortlistId: true, name: true, decision: true },
  })
  if (!item || item.shortlistId !== shortlist.id) {
    return { ok: false, error: 'Item not found in this shortlist.' } as const
  }

  try {
    await db.pSShortlistItem.update({
      where: { id: itemId },
      data: {
        decision: decisionValue,
        altNote:
          decisionValue === 'WANTS_DIFFERENT'
            ? (altNote?.trim() || null)
            : null,
        decidedBy: 'CUSTOMER',
        decidedAt: new Date(),
      },
    })
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Could not record your decision.',
    } as const
  }

  const note =
    `Customer decision on "${item.name}": ${decisionValue}` +
    (decisionValue === 'WANTS_DIFFERENT' && altNote?.trim()
      ? ` — wants: ${altNote.trim()}`
      : '')
  await writePSEvent(shortlist.requestId, { actorType: 'CUSTOMER', note })

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, decision: decisionValue } as const
}

// ============================================================
// 8. requestMoreItems
// ============================================================

/**
 * Customer says "none of these suit me" / "I want something different".
 * Writes a PSEvent on the underlying request so the stylist is
 * notified to re-source. The shortlist stays open — the customer can
 * still tap KEEP/SKIP on the existing items after this is submitted.
 */
export async function requestMoreItems(token: string, note: string) {
  'use server'
  if (!token || !token.trim()) {
    return { ok: false, error: 'Missing shortlist token.' } as const
  }
  if (!note || note.trim().length < 3) {
    return {
      ok: false,
      error: 'Please tell us a bit more about what you want instead.',
    } as const
  }

  const shortlist = await db.pSShortlist.findUnique({
    where: { token: token.trim() },
    select: { id: true, requestId: true, sentAt: true },
  })
  if (!shortlist || !shortlist.sentAt) {
    return { ok: false, error: 'Shortlist not found.' } as const
  }

  await writePSEvent(shortlist.requestId, {
    actorType: 'CUSTOMER',
    note: `Customer requested more items: ${note.trim().slice(0, 500)}`,
  })

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

// ============================================================
// 9. payForItems
// ============================================================

/**
 * For the online review flow: the customer has finished marking
 * items KEEP / SKIP / WANTS_DIFFERENT, and now wants to pay for the
 * items they're keeping. This:
 *   - sums the prices of every PSShortlistItem with decision=KEEP
 *     on the request's shortlist
 *   - adds the delivery fee (deliveryFeeQuoted, set by staff, falling
 *     back to deliveryFeeZone)
 *   - initialises a Paystack transaction for the total
 *   - sets request.paymentMethod = "link"
 *   - writes a PSEvent
 *
 * Returns the authorization_url the customer is redirected to. The
 * actual "mark paid" happens via the Paystack webhook (or a separate
 * confirm step) — this action just kicks off the payment.
 *
 * If the customer has kept zero items, we refuse to charge — there's
 * nothing to pay for.
 */
export async function payForItems(requestId: string) {
  'use server'
  if (!requestId) return { ok: false, error: 'Missing request id.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: {
      id: true,
      ref: true,
      customerName: true,
      customerPhone: true,
      status: true,
      deliveryFeeQuoted: true,
      deliveryFeeZone: true,
    },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status === 'CANCELLED' || req.status === 'DONE') {
    return {
      ok: false,
      error: 'This request is no longer accepting payment.',
    } as const
  }

  const shortlist = await db.pSShortlist.findUnique({
    where: { requestId },
    select: { id: true, sentAt: true },
  })
  if (!shortlist || !shortlist.sentAt) {
    return {
      ok: false,
      error: 'No shortlist has been sent for this request yet.',
    } as const
  }

  const keptItems = await db.pSShortlistItem.findMany({
    where: { shortlistId: shortlist.id, decision: 'KEEP' },
    select: { id: true, name: true, price: true },
  })
  if (!keptItems.length) {
    return {
      ok: false,
      error: 'Pick at least one item to keep before paying.',
    } as const
  }

  const itemsSubtotal = keptItems.reduce((s, i) => s + i.price, 0)
  const deliveryFee = req.deliveryFeeQuoted ?? req.deliveryFeeZone ?? 0
  const total = itemsSubtotal + deliveryFee
  if (total <= 0) {
    return { ok: false, error: 'Nothing to charge.' } as const
  }

  // Distinct prefix so the webhook can route charge.success to the
  // items-payment handler (separate from the sourcing-fee payment).
  const reference = `${req.ref}-ITEMS-${Math.random().toString(36).slice(2, 10)}`

  const siteUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const callbackUrl = `${siteUrl}/services/personal-shopping/confirmed`
  const init = await initializePaystackTransaction({
    email: `${req.ref.toLowerCase()}@wardrobecare.booking`,
    amount: total,
    reference,
    callback_url: callbackUrl,
    metadata: {
      request_ref: req.ref,
      service: PS_SERVICE_NAME,
      payment_kind: 'ITEMS',
      items_subtotal: itemsSubtotal,
      delivery_fee: deliveryFee,
      custom_fields: [
        {
          display_name: 'Request',
          variable_name: 'request_ref',
          value: req.ref,
        },
        {
          display_name: 'Service',
          variable_name: 'service',
          value: PS_SERVICE_NAME,
        },
        {
          display_name: 'Items',
          variable_name: 'items_total',
          value: `₦${itemsSubtotal.toLocaleString()}`,
        },
        {
          display_name: 'Delivery',
          variable_name: 'delivery_fee',
          value: `₦${deliveryFee.toLocaleString()}`,
        },
        {
          display_name: 'Total',
          variable_name: 'total',
          value: `₦${total.toLocaleString()}`,
        },
      ],
    },
  })
  if (!init.status) {
    return {
      ok: false,
      error: init.message || 'Could not initialise payment.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: req.id },
      data: { paymentMethod: 'link' },
    })
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Could not start payment. Please try again.',
    } as const
  }

  const itemNames = keptItems.map((i) => i.name).join(', ')
  await writePSEvent(req.id, {
    actorType: 'CUSTOMER',
    note: `Customer initiated items payment for ${req.ref}: ${keptItems.length} item(s) [${itemNames.slice(0, 200)}] · items ₦${itemsSubtotal.toLocaleString()} + delivery ₦${deliveryFee.toLocaleString()} = ₦${total.toLocaleString()}`,
  })

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, authorizationUrl: init.data.authorization_url, reference, total } as const
}
