'use server'

/**
 * Consultation booking server actions.
 *
 * These cover the "paid-at-booking" consultation flow (Wardrobe & Style
 * Consultation, etc.) which is distinct from the free `submitServiceEnquiry`
 * path used by personal-shopping / outfit-gifting.
 *
 * Lifecycle:
 *   1. Customer picks a date+time slot in the wizard.
 *   2. `holdConsultationSlot` creates a `HELD` row with `holdUntil = now + 10m`.
 *   3. The client opens the Paystack inline popup using the public key.
 *      On success Paystack redirects to /services/wardrobe-consultation/confirmed
 *      with the transaction reference.
 *   4. `confirmConsultationPayment` verifies the reference with Paystack and
 *      marks the booking `PAID`. The webhook is the canonical truth — the
 *      client verify is the secondary path.
 *   5. If we cannot keep the booked slot, admin uses `adminProposeReschedule`
 *      to offer 3 new slots. The customer gets an email + sees a banner on
 *      their booking page and can either `acceptRescheduleSlot` or
 *      `submitRescheduleSuggestion`.
 */

import { db } from '@/lib/db'
import { getSession } from '@/lib/session'
import { requireStaffWithPermission } from '@/lib/permissions'
import { initializePaystackTransaction, verifyPaystackTransaction } from '@/lib/paystack/server'
import { auditLog } from '@/lib/audit'
import {
  CONSULTATION_PRICE,
  CONSULTATION_HOLD_SECONDS,
  CONSULTATION_SERVICE_NAME,
  CONSULTATION_SERVICE_SLUG,
  type TakenSlot,
} from '@/lib/consultations-constants'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { rateLimit, clientIpFromHeaders } from '@/lib/rate-limit'
import { headers } from 'next/headers'

// Re-export the slot-time constants used by the admin propose-reschedule UI.
// We can't `export const` here (a 'use server' file only allows async function
// exports), but the underlying values live in consultations-constants.ts.
// Anything that needs CONSULTATION_HOURLY_AFTER or CONSULTATION_SLOT_TIMES
// should import them directly from '@/lib/consultations-constants'.

// ============================================================
// Helpers
// ============================================================

/**
 * Append a BookingEvent row for a status transition. Safe to call from
 * anywhere — failures are swallowed (logged) so a transient DB error
 * never breaks the booking flow itself.
 */
async function writeBookingEvent(
  bookingId: string,
  fromStatus: string | null,
  toStatus: string,
  opts?: { actorId?: string; actorType?: string; note?: string; channel?: string },
) {
  try {
    await db.bookingEvent.create({
      data: {
        bookingId,
        actorId: opts?.actorId ?? null,
        actorType: opts?.actorType ?? 'SYSTEM',
        fromStatus,
        toStatus,
        note: opts?.note ?? null,
        channel: opts?.channel ?? null,
      },
    })
  } catch (e) {
    console.warn('[consultations] writeBookingEvent failed:', (e as Error).message)
  }
}

/**
 * Compute the next booking number off the *highest* existing suffix.
 * Using `count() + 1` would collide after rows are deleted (count goes
 * down, next number clashes with an existing one). Walking the max
 * suffix keeps the sequence monotonic.
 *
 * Falls back to 1 if no WC-CONS-* bookings exist yet.
 */
async function nextBookingNumber(): Promise<string> {
  const last = await db.consultationBooking.findFirst({
    where: { bookingNumber: { startsWith: 'WC-CONS-' } },
    orderBy: { bookingNumber: 'desc' },
    select: { bookingNumber: true },
  })
  let next = 1
  if (last) {
    const m = last.bookingNumber.match(/^WC-CONS-(\d+)$/)
    if (m) next = parseInt(m[1], 10) + 1
  }
  return `WC-CONS-${String(next).padStart(4, '0')}`
}

/** Normalise a date string `YYYY-MM-DD` into a UTC midnight DateTime. */
function dateOnly(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
}

/**
 * Strip HELD rows whose hold expired and were never paid.
 *
 * IMPORTANT: never delete HELD rows that already have a `paymentReference`
 * set — those are rows where the customer has clicked "Pay" and is
 * currently mid-Paystack-payment. Even if their 10-minute hold has
 * technically expired, the money might still land via the webhook. If
 * we delete the row, the customer pays but the booking vanishes.
 *
 * Such rows are still considered "taken" by getConsultationSlotsTaken
 * and holdConsultationSlot's clash check, so another customer can't
 * grab the slot while the first customer finishes paying. If the
 * Paystack payment never materialises (customer closed the popup), an
 * admin can clean up manually via /admin/services/consultations?status=HELD.
 */
async function reapExpiredHolds() {
  try {
    await db.consultationBooking.deleteMany({
      where: {
        status: 'HELD',
        holdUntil: { lt: new Date() },
        paymentReference: null,
      },
    })
  } catch (e) {
    // Non-fatal — keep going.
    console.warn('[consultations] reapExpiredHolds failed:', (e as Error).message)
  }
}

// ============================================================
// 1. Slot availability — called from the wizard on every step 4 render
// ============================================================

export async function getConsultationSlotsTaken(opts?: { from?: string; to?: string }) {
  await reapExpiredHolds()
  const from = opts?.from ? dateOnly(opts.from) : new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1))
  const to = opts?.to
    ? dateOnly(opts.to)
    : new Date(Date.UTC(new Date().getUTCFullYear() + 1, 0, 1))

  const rows = await db.consultationBooking.findMany({
    where: {
      slotDate: { gte: from, lte: to },
      // NEEDS_NEW_DATE bookings still own their slot while the
      // customer is picking a new time — the original slot is reserved
      // (the customer could still keep it if they push back).
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'NEEDS_NEW_DATE', 'IN_SESSION'] },
    },
    select: { slotDate: true, slotTime: true },
  })

  // Normalise to YYYY-MM-DD so the client can compare against chip keys.
  return rows.map((r) => ({
    date: r.slotDate.toISOString().slice(0, 10),
    time: r.slotTime,
  })) as TakenSlot[]
}

// ============================================================
// 2. Hold a slot — called when the customer hits "Continue" on step 4
// ============================================================

const holdSchema = z.object({
  bookerName: z.string().min(2, 'Please enter your name'),
  bookerPhone: z.string().min(7, 'Please enter a valid phone number'),
  contactMethod: z.enum(['Call', 'WhatsApp', 'Email']).default('WhatsApp'),
  recipientName: z.string().min(1, 'Please tell us who this session is for'),
  recipientRelation: z.string().optional(),
  promptWhy: z.string().optional(),
  occasions: z.string().optional(),
  frustration: z.string().optional(),
  sessionMode: z.enum(['In-person', 'Video call']),
  location: z.string().optional(),
  slotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please pick a date'),
  slotTime: z.string().min(1, 'Please pick a time'),
})

export async function holdConsultationSlot(input: z.infer<typeof holdSchema>) {
  const parsed = holdSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.',
    } as const
  }
  const d = parsed.data

  // Rate limit: 6 holds per IP per 10 minutes (matches the mockup's UX)
  const h = await headers()
  const ip = clientIpFromHeaders(h)
  const rl = rateLimit(`consultation-hold:${ip}`, { limit: 6, windowMs: 10 * 60 * 1000 })
  if (!rl.ok) {
    return { ok: false, error: 'Too many attempts. Please wait a moment and try again.' } as const
  }

  // Validate in-person requires location
  if (d.sessionMode === 'In-person' && (d.location ?? '').trim().length < 2) {
    return { ok: false, error: 'Please tell us the area in Lagos for an in-person session.' } as const
  }

  // Reap expired holds so the slot we want might become free
  await reapExpiredHolds()

  // Reject Sundays (mockup rule — sessions run Mon–Sat)
  const slotDateObj = dateOnly(d.slotDate)
  if (slotDateObj.getUTCDay() === 0) {
    return { ok: false, error: 'Sessions run Monday to Saturday. Please pick another date.' } as const
  }

  // Reject already-taken/active-hold on this exact slot
  const clash = await db.consultationBooking.findFirst({
    where: {
      slotDate: slotDateObj,
      slotTime: d.slotTime,
      // NEEDS_NEW_DATE bookings still own their original slot until
      // the customer accepts a new one — keep them in the clash set.
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'NEEDS_NEW_DATE', 'IN_SESSION'] },
    },
    select: { id: true },
  })
  if (clash) {
    return {
      ok: false,
      error: `That slot was just taken. Please pick another time on ${d.slotDate}.`,
    } as const
  }

  // Optional: link to authenticated user
  const session = await getSession()
  const userId = session?.user?.id || null

  const holdUntil = new Date(Date.now() + CONSULTATION_HOLD_SECONDS * 1000)

  // Retry loop: if two customers hit `holdConsultationSlot` simultaneously,
  // both could compute the same `bookingNumber` off the current max
  // suffix and one would fail on the unique constraint. We retry up to 3
  // times with a fresh number each time.
  let attempts = 0
  while (attempts < 3) {
    attempts++
    const bookingNumber = await nextBookingNumber()
    try {
      const created = await db.consultationBooking.create({
        data: {
          bookingNumber,
          userId,
          bookerName: d.bookerName.trim(),
          bookerPhone: d.bookerPhone.trim(),
          contactMethod: d.contactMethod,
          recipientName: d.recipientName.trim(),
          recipientRelation: d.recipientRelation?.trim() || null,
          promptWhy: d.promptWhy?.trim() || null,
          occasions: d.occasions?.trim() || null,
          frustration: d.frustration?.trim() || null,
          sessionMode: d.sessionMode,
          location: d.sessionMode === 'In-person' ? (d.location ?? '').trim() || null : null,
          slotDate: slotDateObj,
          slotTime: d.slotTime,
          amountPaid: CONSULTATION_PRICE,
          holdUntil,
          status: 'HELD',
        },
      })

      // Audit trail — booking created with status HELD.
      await writeBookingEvent(created.id, null, 'HELD', {
        actorId: userId ?? undefined,
        actorType: userId ? 'CUSTOMER' : 'SYSTEM',
        channel: 'WEB',
      })

      return {
        ok: true,
        bookingNumber: created.bookingNumber,
        bookingId: created.id,
        holdUntil: holdUntil.toISOString(),
        holdSeconds: CONSULTATION_HOLD_SECONDS,
      } as const
    } catch (e: any) {
      // Unique constraint violation → retry with the next counter.
      // Prisma codes: P2002 (unique constraint). We also accept the
      // raw SQLite/sqlite-extended error message as a fallback.
      const msg = (e?.message ?? '') as string
      if (msg.includes('unique') || msg.includes('Unique') || msg.includes('UNIQUE') || msg.includes('P2002')) {
        // wait briefly and retry
        await new Promise((r) => setTimeout(r, 50 * attempts))
        continue
      }
      return { ok: false, error: msg || 'Could not hold the slot. Please try again.' } as const
    }
  }
  return {
    ok: false,
    error: 'We could not reserve that slot just now. Please try again in a moment.',
  } as const
}

// ============================================================
// 3. Initialize Paystack payment
//
//    The wizard calls this right before opening the Paystack inline
//    popup. We use the held booking's bookingNumber as the Paystack
//    reference prefix so the webhook can route charge.success back to
//    the right row.
// ============================================================

export async function initializeConsultationPayment(bookingNumber: string) {
  const booking = await db.consultationBooking.findUnique({
    where: { bookingNumber },
    select: {
      id: true,
      bookingNumber: true,
      bookerName: true,
      bookerPhone: true,
      amountPaid: true,
      status: true,
      holdUntil: true,
      slotDate: true,
      slotTime: true,
    },
  })
  if (!booking) return { ok: false, error: 'Booking not found.' } as const
  if (booking.status !== 'HELD') {
    return { ok: false, error: 'This booking is no longer awaiting payment.' } as const
  }
  if (booking.holdUntil && booking.holdUntil.getTime() < Date.now()) {
    return { ok: false, error: 'Your slot hold expired. Please pick a new time.' } as const
  }

  // Paystack reference: WC-CONS-0914-<random> — unique, and our webhook can
  // match the prefix `WC-CONS-` to route to the consultation handler.
  const reference = `${booking.bookingNumber}-${Math.random().toString(36).slice(2, 10)}`

  // Persist the reference so the webhook + verify can find the row.
  // (paymentReference is unique — but a single booking may re-init if the
  // customer closed the popup; we just overwrite the latest reference.)
  await db.consultationBooking.update({
    where: { id: booking.id },
    data: { paymentReference: reference },
  })

  // Initialize the Paystack transaction — Paystack returns an authorization
  // URL we redirect the customer to. After they pay (or close the popup),
  // they land on our /services/wardrobe-consultation/confirmed callback
  // with the reference in the URL.
  const siteUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const callbackUrl = `${siteUrl}/services/wardrobe-consultation/confirmed`
  const init = await initializePaystackTransaction({
    email: `${booking.bookingNumber.toLowerCase()}@wardrobecare.booking`,
    amount: booking.amountPaid,
    reference,
    callback_url: callbackUrl,
    metadata: {
      booking_number: booking.bookingNumber,
      service: CONSULTATION_SERVICE_NAME,
      booker_name: booking.bookerName,
      booker_phone: booking.bookerPhone,
      slot_date: booking.slotDate.toISOString().slice(0, 10),
      slot_time: booking.slotTime,
      custom_fields: [
        { display_name: 'Booking', variable_name: 'booking_number', value: booking.bookingNumber },
        { display_name: 'Service', variable_name: 'service', value: CONSULTATION_SERVICE_NAME },
        { display_name: 'Slot', variable_name: 'slot', value: `${booking.slotDate.toISOString().slice(0, 10)} · ${booking.slotTime}` },
      ],
    },
  })

  if (!init.status) {
    return { ok: false, error: init.message || 'Could not initialise payment.' } as const
  }

  return {
    ok: true,
    reference,
    amount: booking.amountPaid,
    authorizationUrl: init.data.authorization_url,
    // Paystack requires an email — we don't collect one in step 2 of the
    // mockup, so synthesise a deterministic placeholder. The bookerPhone
    // is the real contact channel.
    email: `${booking.bookingNumber.toLowerCase()}@wardrobecare.booking`,
    bookerName: booking.bookerName,
    bookerPhone: booking.bookerPhone,
  } as const
}

// ============================================================
// 4. Confirm consultation payment
//
//    Called from the /services/wardrobe-consultation/confirmed page
//    (the Paystack callback_url). Also called from the webhook on
//    charge.success. Both paths are idempotent.
// ============================================================

export async function confirmConsultationPayment(reference: string) {
  if (!reference) return { ok: false, error: 'Missing payment reference.' } as const

  const booking = await db.consultationBooking.findUnique({
    where: { paymentReference: reference },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
  if (!booking) return { ok: false, error: 'Booking not found for that reference.' } as const

  // Idempotency: already paid (any post-HELD, pre-CANCELLED state).
  // RESCHEDULED was removed from the enum in the schema migration —
  // a rescheduled booking now sits back at PAID, awaiting re-confirm.
  if (
    booking.status === 'PAID' ||
    booking.status === 'NEEDS_NEW_DATE' ||
    booking.status === 'CONFIRMED' ||
    booking.status === 'IN_SESSION' ||
    booking.status === 'COMPLETED' ||
    booking.status === 'SUMMARY_SENT' ||
    booking.status === 'NO_SHOW'
  ) {
    return { ok: true, bookingNumber: booking.bookingNumber, alreadyPaid: true } as const
  }

  // Verify with Paystack
  const verify = await verifyPaystackTransaction(reference)
  if (!verify || !verify.status || verify.data.status !== 'success') {
    return { ok: false, error: 'Payment could not be verified. If you were charged, please contact us.' } as const
  }

  // Mark PAID in a transaction so we don't race with the webhook
  let didUpdate = false
  try {
    await db.$transaction(async (tx) => {
      const fresh = await tx.consultationBooking.findUnique({ where: { id: booking.id } })
      if (!fresh) return
      if (
        fresh.status === 'PAID' ||
        fresh.status === 'NEEDS_NEW_DATE' ||
        fresh.status === 'CONFIRMED' ||
        fresh.status === 'IN_SESSION' ||
        fresh.status === 'COMPLETED' ||
        fresh.status === 'SUMMARY_SENT' ||
        fresh.status === 'NO_SHOW'
      ) return
      await tx.consultationBooking.update({
        where: { id: booking.id },
        data: {
          status: 'PAID',
          paidAt: new Date(),
          holdUntil: null, // hold is satisfied
        },
      })
      didUpdate = true
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not mark booking as paid.' } as const
  }

  if (didUpdate) {
    await writeBookingEvent(booking.id, booking.status, 'PAID', {
      actorType: 'SYSTEM',
      channel: 'PAYSTACK',
    })
  }

  // Notify staff (safe — never throws)
  await createStaffNotificationSafe({
    type: 'NEW_ORDER',
    title: `New paid consultation ${booking.bookingNumber}`,
    body: `${booking.bookerName} paid ₦${booking.amountPaid.toLocaleString()} for ${booking.slotDate.toISOString().slice(0, 10)} at ${booking.slotTime}.`,
    link: `/admin/services/consultations/${booking.id}`,
  })

  revalidatePath('/admin/services/consultations')

  return {
    ok: true,
    bookingNumber: booking.bookingNumber,
    slotDate: booking.slotDate.toISOString().slice(0, 10),
    slotTime: booking.slotTime,
    sessionMode: booking.sessionMode,
    amountPaid: booking.amountPaid,
  } as const
}

// ============================================================
// 5. Customer-facing lookup
// ============================================================

export async function getConsultationByBookingNumber(bookingNumber: string) {
  const b = await db.consultationBooking.findUnique({
    where: { bookingNumber },
    select: {
      id: true,
      bookingNumber: true,
      bookerName: true,
      bookerPhone: true,
      contactMethod: true,
      recipientName: true,
      recipientRelation: true,
      promptWhy: true,
      occasions: true,
      frustration: true,
      sessionMode: true,
      location: true,
      slotDate: true,
      slotTime: true,
      amountPaid: true,
      status: true,
      paidAt: true,
      holdUntil: true,
      rescheduleReason: true,
      rescheduledAt: true,
      originalSlotDate: true,
      originalSlotTime: true,
      createdAt: true,
    },
  })
  if (!b) return null

  // Audit-trail events + reschedule offers live in their own tables now
  // (the old `proposedSlots` JSON column was removed). Fan out both
  // queries in parallel.
  const [events, rescheduleOffers] = await Promise.all([
    db.bookingEvent.findMany({
      where: { bookingId: b.id },
      orderBy: { createdAt: 'desc' },
    }),
    db.rescheduleOffer.findMany({
      where: { bookingId: b.id },
      orderBy: { offeredAt: 'asc' },
    }),
  ])

  return {
    ...b,
    slotDate: b.slotDate.toISOString().slice(0, 10),
    originalSlotDate: b.originalSlotDate ? b.originalSlotDate.toISOString().slice(0, 10) : null,
    holdUntil: b.holdUntil ? b.holdUntil.toISOString() : null,
    paidAt: b.paidAt ? b.paidAt.toISOString() : null,
    rescheduledAt: b.rescheduledAt ? b.rescheduledAt.toISOString() : null,
    createdAt: b.createdAt.toISOString(),
    events: events.map((e) => ({ ...e, createdAt: e.createdAt.toISOString() })),
    rescheduleOffers: rescheduleOffers.map((o) => ({
      ...o,
      slotDate: o.slotDate.toISOString().slice(0, 10),
      offeredAt: o.offeredAt.toISOString(),
      chosenAt: o.chosenAt ? o.chosenAt.toISOString() : null,
      expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    })),
  }
}

/**
 * Load the reschedule offers for a booking.
 *
 * Replaces the old `proposedSlots` JSON column. The offers now live in
 * the `RescheduleOffer` table (one row per offered slot) and are
 * returned ordered by `offeredAt` so the index the customer picks in
 * `acceptRescheduleSlot` matches the order the admin proposed.
 */
async function parseProposedSlots(bookingId: string): Promise<Array<{ date: string; time: string }>> {
  const offers = await db.rescheduleOffer.findMany({
    where: { bookingId },
    orderBy: { offeredAt: 'asc' },
    select: { slotDate: true, slotTime: true },
  })
  return offers.map((o) => ({
    date: o.slotDate.toISOString().slice(0, 10),
    time: o.slotTime,
  }))
}

// ============================================================
// 6. Customer accepts one of the proposed reschedule slots
// ============================================================

export async function acceptRescheduleSlot(bookingNumber: string, slotIndex: number) {
  const b = await db.consultationBooking.findUnique({ where: { bookingNumber } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'NEEDS_NEW_DATE') {
    return { ok: false, error: 'This booking is not awaiting a reschedule.' } as const
  }

  // Load the admin's offered slots from the RescheduleOffer table.
  // Ordered by offeredAt so `slotIndex` matches the order the customer
  // saw in the picker.
  const offers = await db.rescheduleOffer.findMany({
    where: { bookingId: b.id },
    orderBy: { offeredAt: 'asc' },
  })
  if (slotIndex < 0 || slotIndex >= offers.length) {
    return { ok: false, error: 'Please pick one of the proposed slots.' } as const
  }
  const pick = offers[slotIndex]
  const pickDate = pick.slotDate.toISOString().slice(0, 10)
  const pickTime = pick.slotTime

  // Re-check that the picked slot is still free. Between the admin
  // proposing and the customer accepting, another customer could have
  // booked the same slot directly. The current booking's own row
  // doesn't count (it's about to be moved).
  const slotDateObj = dateOnly(pickDate)
  const clash = await db.consultationBooking.findFirst({
    where: {
      id: { not: b.id },
      slotDate: slotDateObj,
      slotTime: pickTime,
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'NEEDS_NEW_DATE', 'IN_SESSION'] },
    },
    select: { id: true, bookingNumber: true },
  })
  if (clash) {
    return {
      ok: false,
      error: `Sorry, ${pickDate} at ${pickTime} was just booked by someone else (booking ${clash.bookingNumber}). Please pick another slot or message us.`,
    } as const
  }

  try {
    await db.consultationBooking.update({
      where: { id: b.id },
      data: {
        originalSlotDate: b.originalSlotDate ?? b.slotDate,
        originalSlotTime: b.originalSlotTime ?? b.slotTime,
        slotDate: slotDateObj,
        slotTime: pickTime,
        status: 'PAID',
        rescheduledAt: new Date(),
      },
    })
    // Stamp the chosen offer. Clear any previously-chosen offers on the
    // same booking first (there should only ever be one chosen).
    await db.rescheduleOffer.updateMany({
      where: { bookingId: b.id, chosenAt: { not: null } },
      data: { chosenAt: null },
    })
    await db.rescheduleOffer.update({
      where: { id: pick.id },
      data: { chosenAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not update booking.' } as const
  }

  await writeBookingEvent(b.id, 'NEEDS_NEW_DATE', 'NEEDS_NEW_DATE', {
    actorId: b.userId ?? undefined,
    actorType: 'CUSTOMER',
    channel: 'WEB',
  })

  await createStaffNotificationSafe({
    type: 'SYSTEM',
    title: `Reschedule accepted on ${b.bookingNumber}`,
    body: `Customer picked ${pickDate} at ${pickTime}. Payment stays valid.`,
    link: `/admin/services/consultations/${b.id}`,
  })

  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true, bookingNumber: b.bookingNumber, slotDate: pickDate, slotTime: pickTime } as const
}

// ============================================================
// 7. Customer submits their own suggested dates (none of the proposed fit)
// ============================================================

export async function submitRescheduleSuggestion(bookingNumber: string, freeText: string) {
  const b = await db.consultationBooking.findUnique({ where: { bookingNumber } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'NEEDS_NEW_DATE') {
    return { ok: false, error: 'This booking is not awaiting a reschedule.' } as const
  }
  if ((freeText ?? '').trim().length < 3) {
    return { ok: false, error: 'Please tell us a few days and times that work for you.' } as const
  }

  // Store the customer's free-text suggestion in rescheduleReason — staff will
  // reply via WhatsApp to confirm a new date. Status stays NEEDS_NEW_DATE
  // so the booking detail page keeps showing the "we have your suggestions"
  // banner until staff confirm manually.
  try {
    await db.consultationBooking.update({
      where: { id: b.id },
      data: {
        // Append to rescheduleReason so staff see both the original reason
        // AND the customer's reply in one place.
        rescheduleReason: [
          b.rescheduleReason ?? '',
          '',
          '— Customer reply —',
          freeText.trim(),
        ].join('\n').trim(),
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not save your suggestions.' } as const
  }

  await createStaffNotificationSafe({
    type: 'SYSTEM',
    title: `Customer suggested dates for ${b.bookingNumber}`,
    body: freeText.trim().slice(0, 240),
    link: `/admin/services/consultations/${b.id}`,
  })

  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true } as const
}

// ============================================================
// 8. Admin: propose reschedule (3 new slots)
// ============================================================

const proposeSchema = z.object({
  bookingId: z.string().min(1),
  reason: z.string().min(3, 'Please tell the customer why we cannot keep the date.'),
  slots: z
    .array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        time: z.string().min(1),
      }),
    )
    .min(1, 'Please propose at least one new slot.')
    .max(5, 'At most 5 proposed slots.'),
})

export async function adminProposeReschedule(input: z.infer<typeof proposeSchema>) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const parsed = proposeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input.' } as const
  }
  const d = parsed.data

  const b = await db.consultationBooking.findUnique({ where: { id: d.bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  // Allow reschedule proposal from PAID or CONFIRMED (a rescheduled
  // booking sits back at PAID after acceptRescheduleSlot, so PAID
  // covers the re-propose case). The last case lets the admin re-propose
  // if the customer has already accepted one slot but we still can't
  // keep that one either. The first reschedule preserves the *very*
  // original slot in originalSlotDate/originalSlotTime; subsequent ones
  // don't overwrite it, so the customer always sees the trail back to
  // their first booking.
  if (b.status !== 'PAID' && b.status !== 'CONFIRMED') {
    return { ok: false, error: 'Only paid or confirmed bookings can be rescheduled.' } as const
  }

  try {
    await db.consultationBooking.update({
      where: { id: b.id },
      data: {
        status: 'NEEDS_NEW_DATE',
        originalSlotDate: b.originalSlotDate ?? b.slotDate,
        originalSlotTime: b.originalSlotTime ?? b.slotTime,
        rescheduleReason: d.reason.trim(),
      },
    })

    // Replace existing offers (if any) so a re-propose clears the old
    // set before writing the new one — the customer only sees the
    // latest slots. Each offer is its own row in the RescheduleOffer
    // table now (the old `proposedSlots` JSON column was removed).
    await db.rescheduleOffer.deleteMany({ where: { bookingId: b.id } })
    await db.rescheduleOffer.createMany({
      data: d.slots.map((s) => ({
        bookingId: b.id,
        slotDate: dateOnly(s.date),
        slotTime: s.time,
        offeredBy: admin.id,
      })),
    })

    await writeBookingEvent(b.id, b.status, 'NEEDS_NEW_DATE', {
      actorId: admin.id,
      actorType: 'STAFF',
      note: d.reason.trim().slice(0, 200),
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not save proposed slots.' } as const
  }

  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.propose_reschedule',
      entityType: 'ConsultationBooking',
      entityId: b.id,
      description: `Proposed ${d.slots.length} new slots for ${b.bookingNumber}`,
    })
  } catch {}

  await createStaffNotificationSafe({
    type: 'SYSTEM',
    title: `Reschedule proposed for ${b.bookingNumber}`,
    body: `Customer has been notified. Reason: ${d.reason.trim().slice(0, 140)}`,
    link: `/admin/services/consultations/${b.id}`,
  })

  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true } as const
}

// ============================================================
// 8b. Admin: manually set a new slot (e.g. after the customer
//     submitted free-text suggestions, the admin confirms a date
//     by phone/WhatsApp and just records it here).
// ============================================================

const manualRescheduleSchema = z.object({
  bookingId: z.string().min(1),
  slotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please pick a valid date'),
  slotTime: z.string().min(1, 'Please pick a valid time'),
  note: z.string().optional(),
})

export async function adminManualReschedule(input: z.infer<typeof manualRescheduleSchema>) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const parsed = manualRescheduleSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input.' } as const
  }
  const d = parsed.data

  const b = await db.consultationBooking.findUnique({ where: { id: d.bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  // Only bookings currently in a reschedule flow can be manually
  // moved. NEEDS_NEW_DATE (admin proposed, customer hasn't accepted)
  // or PAID (covers both freshly-paid and already-rescheduled). If
  // you want to move a CONFIRMED booking, first use
  // adminProposeReschedule (the customer-facing path).
  if (b.status !== 'NEEDS_NEW_DATE' && b.status !== 'PAID') {
    return {
      ok: false,
      error: 'Only bookings awaiting reschedule can be manually moved.',
    } as const
  }

  // Reject Sundays (same rule as holdConsultationSlot)
  const slotDateObj = dateOnly(d.slotDate)
  if (slotDateObj.getUTCDay() === 0) {
    return { ok: false, error: 'Sessions run Monday to Saturday. Please pick another date.' } as const
  }

  // Reject if the target slot is already taken by another PAID/CONFIRMED/HELD booking.
  // (The current booking's own row doesn't count.)
  const clash = await db.consultationBooking.findFirst({
    where: {
      id: { not: b.id },
      slotDate: slotDateObj,
      slotTime: d.slotTime,
      // NEEDS_NEW_DATE bookings also block the slot.
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'NEEDS_NEW_DATE', 'IN_SESSION'] },
    },
    select: { id: true, bookingNumber: true },
  })
  if (clash) {
    return {
      ok: false,
      error: `That slot is already taken by booking ${clash.bookingNumber}.`,
    } as const
  }

  try {
    await db.consultationBooking.update({
      where: { id: b.id },
      data: {
        originalSlotDate: b.originalSlotDate ?? b.slotDate,
        originalSlotTime: b.originalSlotTime ?? b.slotTime,
        slotDate: slotDateObj,
        slotTime: d.slotTime,
        // Status becomes PAID so the customer sees the new date and the
        // booking is ready for admin confirmation. (RESCHEDULED was
        // removed from the enum — BookingEvent.toStatus below still
        // records 'RESCHEDULED' as the logical transition label.)
        status: 'PAID',
        rescheduledAt: new Date(),
        // Append the admin's note to rescheduleReason so it appears in the
        // audit trail alongside any customer reply.
        rescheduleReason: [
          b.rescheduleReason ?? '',
          d.note?.trim() ? `— Admin manual reschedule: ${d.note.trim()}` : '',
        ]
          .filter(Boolean)
          .join('\n')
          .trim(),
      },
    })

    await writeBookingEvent(b.id, b.status, b.status, {
      actorId: admin.id,
      actorType: 'STAFF',
      note: d.note?.trim() || undefined,
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not update booking.' } as const
  }

  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.manual_reschedule',
      entityType: 'ConsultationBooking',
      entityId: b.id,
      description: `Manually moved ${b.bookingNumber} to ${d.slotDate} ${d.slotTime}`,
    })
  } catch {}

  await createStaffNotificationSafe({
    type: 'SYSTEM',
    title: `Manual reschedule on ${b.bookingNumber}`,
    body: `Moved to ${d.slotDate} at ${d.slotTime} by ${admin.email}.`,
    link: `/admin/services/consultations/${b.id}`,
  })

  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true, bookingNumber: b.bookingNumber, slotDate: d.slotDate, slotTime: d.slotTime } as const
}

// ============================================================
// 9. Admin: mark booking as CONFIRMED (stylist assigned)
// ============================================================

export async function adminConfirmConsultation(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'PAID') {
    return { ok: false, error: 'Only paid bookings can be confirmed.' } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    })
    await writeBookingEvent(bookingId, b.status, 'CONFIRMED', {
      actorId: admin.id,
      actorType: 'STAFF',
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not confirm booking.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.confirm',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Confirmed ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true } as const
}

// ============================================================
// 10. Admin: mark booking as COMPLETED (session finished).
//     The old COMPLETED status was removed — once the session
//     ends the booking moves to COMPLETED, and the summary-publish
//     flow (consultations-workflow.ts) advances it to SUMMARY_SENT.
// ============================================================

export async function adminCompleteConsultation(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'COMPLETED' },
    })
    await writeBookingEvent(bookingId, b.status, 'COMPLETED', {
      actorId: admin.id,
      actorType: 'STAFF',
      note: 'Session finished',
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not update booking.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.complete',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Completed ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  revalidatePath(`/account/bookings/${b.bookingNumber}`)
  return { ok: true } as const
}

// ============================================================
// Internal: safe staff notification (mirror of webhook pattern)
// ============================================================

async function createStaffNotificationSafe(input: {
  type: any
  title: string
  body?: string
  link?: string
}) {
  try {
    const staff = await db.user.findMany({
      where: { role: { not: 'CUSTOMER' }, active: true },
      select: { id: true },
    })
    if (!staff.length) return
    await db.notification.createMany({
      data: staff.map((s) => ({
        recipientId: s.id,
        type: input.type,
        title: input.title,
        body: input.body,
        link: input.link,
      })),
    })
  } catch (e) {
    console.error('[consultations] createStaffNotificationSafe failed:', e)
  }
}
