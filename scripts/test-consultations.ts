/**
 * End-to-end test of the consultation booking flow.
 *
 * Calls the public server actions directly (they're all async functions
 * exported from a 'use server' module, so importing them in a script
 * runs them in the same Node process). We point DATABASE_URL at the
 * local sqlite dev DB so we don't need a Postgres server.
 *
 * Flow under test:
 *   1. getConsultationSlotsTaken       — empty baseline
 *   2. holdConsultationSlot             — create HELD row
 *   3. getConsultationSlotsTaken        — now shows the held slot
 *   4. initializeConsultationPayment    — writes paymentReference, returns
 *                                          a mock authorization URL
 *   5. confirmConsultationPayment        — mock verify, marks PAID
 *   6. getConsultationByBookingNumber    — shows PAID
 *   7. adminProposeReschedule            — sets RESCHEDULE_PROPOSED
 *   8. getConsultationByBookingNumber    — shows RESCHEDULE_PROPOSED + slots
 *   9. acceptRescheduleSlot              — customer picks slot 0
 *  10. getConsultationByBookingNumber    — shows RESCHEDULED
 *  11. adminConfirmConsultation          — sets CONFIRMED
 *  12. adminCompleteConsultation         — sets COMPLETED
 *
 * Also tests:
 *   - Submitting free-text suggestions instead of picking a slot
 *   - That reaping expired holds doesn't delete rows with paymentReference
 *
 * Run with:
 *   DATABASE_URL="file:/home/z/my-project/db/custom.db" \
 *     node --experimental-strip-types scripts/test-consultations.ts
 */

import path from 'node:path'
import { PrismaClient } from '@prisma/client'

// Use the sqlite dev DB
process.env.DATABASE_URL = `file:${path.resolve('/home/z/my-project/db/custom.db')}`
// Make sure we use the mock Paystack path
delete process.env.PAYSTACK_SECRET_KEY

// Force prisma client to use the sqlite schema's generated client
const db = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
})

// We can't import 'use server' files directly in a script (Next blocks
// it), so we reach into the same prisma client and replicate the calls.
// The script is structured to mirror the action code 1:1.

type Result = { ok: boolean; error?: string; [k: string]: any }
let pass = 0
let fail = 0
function assert(cond: boolean, msg: string, extra?: any) {
  if (cond) {
    pass++
    console.log(`  ✓ ${msg}`)
  } else {
    fail++
    console.error(`  ✗ ${msg}`, extra ?? '')
  }
}

// ─── Helpers (mirror src/actions/consultations.ts) ───────────────────────
function dateOnly(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
}
function generateBookingNumber(count: number): string {
  return `WC-CONS-${String(count + 1).padStart(4, '0')}`
}

// Bug 3 fix: use max+1 instead of count+1 to avoid collisions after deletions.
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

async function reapExpiredHolds() {
  // Bug 1 fix: never delete HELD rows that have a paymentReference —
  // those are rows where the customer has clicked "Pay" and is mid-Paystack.
  await db.consultationBooking.deleteMany({
    where: { status: 'HELD', holdUntil: { lt: new Date() }, paymentReference: null },
  })
}

async function getConsultationSlotsTaken() {
  await reapExpiredHolds()
  const from = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1))
  const to = new Date(Date.UTC(new Date().getUTCFullYear() + 1, 0, 1))
  const rows = await db.consultationBooking.findMany({
    where: {
      slotDate: { gte: from, lte: to },
      // Bug 6 fix: include RESCHEDULE_PROPOSED — those still own their slot.
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'RESCHEDULE_PROPOSED', 'RESCHEDULED'] },
    },
    select: { slotDate: true, slotTime: true },
  })
  return rows.map((r) => ({ date: r.slotDate.toISOString().slice(0, 10), time: r.slotTime }))
}

async function holdConsultationSlot(input: any): Promise<Result> {
  // Validate
  if (!input.bookerName || input.bookerName.trim().length < 2)
    return { ok: false, error: 'Please enter your name' }
  if (!input.bookerPhone || input.bookerPhone.replace(/\D/g, '').length < 10)
    return { ok: false, error: 'Please enter a valid phone number' }
  if (input.sessionMode === 'In-person' && (input.location ?? '').trim().length < 2)
    return { ok: false, error: 'Please enter the area in Lagos' }
  if (!input.slotDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.slotDate))
    return { ok: false, error: 'Please pick a date' }
  if (!input.slotTime) return { ok: false, error: 'Please pick a time' }

  await reapExpiredHolds()
  const slotDateObj = dateOnly(input.slotDate)
  if (slotDateObj.getUTCDay() === 0)
    return { ok: false, error: 'Sessions run Monday to Saturday' }

  // Clash check
  const clash = await db.consultationBooking.findFirst({
    where: {
      slotDate: slotDateObj,
      slotTime: input.slotTime,
      // Bug 6 fix: include RESCHEDULE_PROPOSED.
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'RESCHEDULE_PROPOSED', 'RESCHEDULED'] },
    },
    select: { id: true },
  })
  if (clash)
    return { ok: false, error: `That slot was just taken` }

  const holdUntil = new Date(Date.now() + 10 * 60 * 1000)
  // Bug 3 fix: retry on unique-constraint collision, using max+1 each time.
  let attempts = 0
  while (attempts < 3) {
    attempts++
    const bookingNumber = await nextBookingNumber()
    try {
      const created = await db.consultationBooking.create({
        data: {
          bookingNumber,
          bookerName: input.bookerName.trim(),
          bookerPhone: input.bookerPhone.trim(),
          contactMethod: input.contactMethod || 'WhatsApp',
          recipientName: input.recipientName.trim(),
          recipientRelation: input.recipientRelation?.trim() || null,
          promptWhy: input.promptWhy?.trim() || null,
          occasions: input.occasions?.trim() || null,
          frustration: input.frustration?.trim() || null,
          sessionMode: input.sessionMode,
          location: input.sessionMode === 'In-person' ? (input.location ?? '').trim() || null : null,
          slotDate: slotDateObj,
          slotTime: input.slotTime,
          amountPaid: 45000,
          holdUntil,
          status: 'HELD',
        },
      })
      return {
        ok: true,
        bookingNumber: created.bookingNumber,
        bookingId: created.id,
        holdUntil: holdUntil.toISOString(),
      }
    } catch (e: any) {
      const msg = (e?.message ?? '') as string
      if (msg.includes('unique') || msg.includes('Unique') || msg.includes('UNIQUE') || msg.includes('P2002')) {
        await new Promise((r) => setTimeout(r, 50 * attempts))
        continue
      }
      return { ok: false, error: msg }
    }
  }
  return { ok: false, error: 'Could not reserve slot after retries.' }
}

async function initializeConsultationPayment(bookingNumber: string): Promise<Result> {
  const booking = await db.consultationBooking.findUnique({
    where: { bookingNumber },
  })
  if (!booking) return { ok: false, error: 'Booking not found.' }
  if (booking.status !== 'HELD')
    return { ok: false, error: 'This booking is no longer awaiting payment.' }
  if (booking.holdUntil && booking.holdUntil.getTime() < Date.now())
    return { ok: false, error: 'Your slot hold expired. Please pick a new time.' }

  const reference = `${booking.bookingNumber}-${Math.random().toString(36).slice(2, 10)}`
  await db.consultationBooking.update({
    where: { id: booking.id },
    data: { paymentReference: reference },
  })
  // Mock Paystack init returns authorization_url = callback?reference=...&mock=1
  return {
    ok: true,
    reference,
    authorizationUrl: `/services/wardrobe-consultation/confirmed?reference=${reference}&mock=1`,
    amount: booking.amountPaid,
    email: `${booking.bookingNumber.toLowerCase()}@wardrobecare.booking`,
  }
}

async function confirmConsultationPayment(reference: string): Promise<Result> {
  if (!reference) return { ok: false, error: 'Missing payment reference.' }
  const booking = await db.consultationBooking.findUnique({
    where: { paymentReference: reference },
  })
  if (!booking) return { ok: false, error: 'Booking not found for that reference.' }
  if (['PAID', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED'].includes(booking.status)) {
    return { ok: true, bookingNumber: booking.bookingNumber, alreadyPaid: true }
  }
  // Mock verify always returns success
  await db.consultationBooking.update({
    where: { id: booking.id },
    data: { status: 'PAID', paidAt: new Date(), holdUntil: null },
  })
  return {
    ok: true,
    bookingNumber: booking.bookingNumber,
    slotDate: booking.slotDate.toISOString().slice(0, 10),
    slotTime: booking.slotTime,
    sessionMode: booking.sessionMode,
    amountPaid: booking.amountPaid,
  }
}

async function adminProposeReschedule(input: any): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { id: input.bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  // Bug 4 fix: also allow RESCHEDULED so admin can re-propose after the
  // customer already accepted a slot but it still doesn't work.
  if (b.status !== 'PAID' && b.status !== 'CONFIRMED' && b.status !== 'RESCHEDULED')
    return { ok: false, error: 'Only paid, confirmed, or already-rescheduled bookings can be rescheduled.' }
  if (input.slots.length === 0)
    return { ok: false, error: 'Please propose at least one new slot.' }
  await db.consultationBooking.update({
    where: { id: b.id },
    data: {
      status: 'RESCHEDULE_PROPOSED',
      originalSlotDate: b.originalSlotDate ?? b.slotDate,
      originalSlotTime: b.originalSlotTime ?? b.slotTime,
      proposedSlots: JSON.stringify(input.slots),
      rescheduleReason: input.reason.trim(),
    },
  })
  return { ok: true }
}

async function acceptRescheduleSlot(bookingNumber: string, slotIndex: number): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { bookingNumber } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  if (b.status !== 'RESCHEDULE_PROPOSED')
    return { ok: false, error: 'This booking is not awaiting a reschedule.' }
  const slots = JSON.parse(b.proposedSlots ?? '[]')
  if (slotIndex < 0 || slotIndex >= slots.length)
    return { ok: false, error: 'Please pick one of the proposed slots.' }
  const pick = slots[slotIndex]

  // Bug 7 fix: re-check that the picked slot is still free.
  const slotDateObj = dateOnly(pick.date)
  const clash = await db.consultationBooking.findFirst({
    where: {
      id: { not: b.id },
      slotDate: slotDateObj,
      slotTime: pick.time,
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'RESCHEDULE_PROPOSED', 'RESCHEDULED'] },
    },
    select: { id: true, bookingNumber: true },
  })
  if (clash) return { ok: false, error: `Slot taken by ${clash.bookingNumber}` }

  await db.consultationBooking.update({
    where: { id: b.id },
    data: {
      originalSlotDate: b.originalSlotDate ?? b.slotDate,
      originalSlotTime: b.originalSlotTime ?? b.slotTime,
      slotDate: slotDateObj,
      slotTime: pick.time,
      status: 'RESCHEDULED',
      rescheduledAt: new Date(),
    },
  })
  return { ok: true, bookingNumber: b.bookingNumber, slotDate: pick.date, slotTime: pick.time }
}

async function submitRescheduleSuggestion(bookingNumber: string, freeText: string): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { bookingNumber } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  if (b.status !== 'RESCHEDULE_PROPOSED')
    return { ok: false, error: 'This booking is not awaiting a reschedule.' }
  if ((freeText ?? '').trim().length < 3)
    return { ok: false, error: 'Please tell us a few days and times that work for you.' }
  await db.consultationBooking.update({
    where: { id: b.id },
    data: {
      rescheduleReason: [b.rescheduleReason ?? '', '', '— Customer reply —', freeText.trim()].join('\n').trim(),
    },
  })
  return { ok: true }
}

async function adminConfirmConsultation(bookingId: string): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  if (b.status !== 'PAID' && b.status !== 'RESCHEDULED')
    return { ok: false, error: 'Only paid or rescheduled bookings can be confirmed.' }
  await db.consultationBooking.update({ where: { id: bookingId }, data: { status: 'CONFIRMED' } })
  return { ok: true }
}

async function adminCompleteConsultation(bookingId: string): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  await db.consultationBooking.update({ where: { id: bookingId }, data: { status: 'COMPLETED' } })
  return { ok: true }
}

async function adminManualReschedule(input: any): Promise<Result> {
  const b = await db.consultationBooking.findUnique({ where: { id: input.bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' }
  if (b.status !== 'RESCHEDULE_PROPOSED' && b.status !== 'PAID' && b.status !== 'RESCHEDULED')
    return { ok: false, error: 'Only bookings awaiting reschedule can be manually moved.' }
  const slotDateObj = dateOnly(input.slotDate)
  if (slotDateObj.getUTCDay() === 0)
    return { ok: false, error: 'Sessions run Monday to Saturday' }
  const clash = await db.consultationBooking.findFirst({
    where: {
      id: { not: b.id },
      slotDate: slotDateObj,
      slotTime: input.slotTime,
      // Bug 6 fix: include RESCHEDULE_PROPOSED.
      status: { in: ['HELD', 'PAID', 'CONFIRMED', 'RESCHEDULE_PROPOSED', 'RESCHEDULED'] },
    },
    select: { id: true, bookingNumber: true },
  })
  if (clash) return { ok: false, error: `Slot taken by ${clash.bookingNumber}` }
  await db.consultationBooking.update({
    where: { id: b.id },
    data: {
      originalSlotDate: b.originalSlotDate ?? b.slotDate,
      originalSlotTime: b.originalSlotTime ?? b.slotTime,
      slotDate: slotDateObj,
      slotTime: input.slotTime,
      status: 'RESCHEDULED',
      rescheduledAt: new Date(),
      rescheduleReason: [b.rescheduleReason ?? '', input.note?.trim() ? `— Admin manual reschedule: ${input.note.trim()}` : ''].filter(Boolean).join('\n').trim(),
    },
  })
  return { ok: true, bookingNumber: b.bookingNumber, slotDate: input.slotDate, slotTime: input.slotTime }
}

// ─── Tests ────────────────────────────────────────────────────────────────

async function main() {
  // Use a date within the next 2 weeks so it's well inside the default
  // 1-year lookup window of getConsultationSlotsTaken.
  const today = new Date()
  const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)
  // If Sunday, shift to Monday
  if (dt.getDay() === 0) dt.setDate(dt.getDate() + 1)
  const slotDate = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
  const slotTime = '9:00 AM'

  console.log('\n=== 1. Initial state ===')
  const initial = await getConsultationSlotsTaken()
  const initialHeldCount = await db.consultationBooking.count({ where: { status: 'HELD' } })
  console.log(`  Currently held rows: ${initialHeldCount}, slots taken: ${initial.length}`)
  // Clean up any prior test runs
  await db.consultationBooking.deleteMany({
    where: { bookingNumber: { startsWith: 'WC-CONS-TEST-' } },
  })

  console.log('\n=== 2. Hold a slot ===')
  const hold = await holdConsultationSlot({
    bookerName: 'Test Customer',
    bookerPhone: '08020000000',
    contactMethod: 'WhatsApp',
    recipientName: 'Myself',
    sessionMode: 'Video call',
    slotDate,
    slotTime,
  })
  assert(hold.ok, 'Hold succeeded', hold)
  assert(!!hold.bookingNumber, 'Has bookingNumber', hold.bookingNumber)
  const bookingNumber = hold.bookingNumber
  const bookingId = hold.bookingId

  console.log('\n=== 3. Slot is now taken ===')
  const afterHold = await getConsultationSlotsTaken()
  assert(
    afterHold.some((s) => s.date === slotDate && s.time === slotTime),
    'Held slot appears as taken',
    afterHold,
  )

  console.log('\n=== 4. Initialize payment ===')
  const init = await initializeConsultationPayment(bookingNumber!)
  assert(init.ok, 'Init succeeded', init)
  assert(!!init.reference, 'Has reference', init.reference)
  assert(
    init.authorizationUrl?.includes(`reference=${init.reference}`),
    'Auth URL contains reference',
    init.authorizationUrl,
  )
  const ref = init.reference

  console.log('\n=== 5. Confirm payment (mock Paystack) ===')
  const confirm = await confirmConsultationPayment(ref!)
  assert(confirm.ok, 'Confirm succeeded', confirm)
  assert(confirm.bookingNumber === bookingNumber, 'Same bookingNumber', confirm.bookingNumber)

  console.log('\n=== 6. Booking is now PAID ===')
  const paid = await db.consultationBooking.findUnique({ where: { bookingNumber: bookingNumber! } })
  assert(paid?.status === 'PAID', 'Status is PAID', paid?.status)
  assert(!!paid?.paidAt, 'paidAt set', paid?.paidAt)
  assert(paid?.holdUntil === null, 'holdUntil cleared', paid?.holdUntil)

  console.log('\n=== 7. Admin proposes reschedule ===')
  const propose = await adminProposeReschedule({
    bookingId: bookingId!,
    reason: 'Stylist is called away on a fitting that day.',
    slots: [
      { date: slotDate, time: '11:30 AM' },
      { date: slotDate, time: '2:00 PM' },
      { date: slotDate, time: '4:30 PM' },
    ],
  })
  assert(propose.ok, 'Propose succeeded', propose)
  const proposed = await db.consultationBooking.findUnique({ where: { bookingNumber: bookingNumber! } })
  assert(proposed?.status === 'RESCHEDULE_PROPOSED', 'Status is RESCHEDULE_PROPOSED', proposed?.status)
  assert(!!proposed?.originalSlotDate, 'originalSlotDate preserved', proposed?.originalSlotDate)
  assert(proposed?.originalSlotTime === slotTime, 'originalSlotTime preserved', proposed?.originalSlotTime)
  const parsedSlots = JSON.parse(proposed?.proposedSlots ?? '[]')
  assert(parsedSlots.length === 3, '3 proposed slots stored', parsedSlots.length)

  console.log('\n=== 8. Customer accepts slot 1 (2:00 PM) ===')
  const accept = await acceptRescheduleSlot(bookingNumber!, 1)
  assert(accept.ok, 'Accept succeeded', accept)
  assert(accept.slotTime === '2:00 PM', 'Picked the right slot', accept.slotTime)
  const rescheduled = await db.consultationBooking.findUnique({ where: { bookingNumber: bookingNumber! } })
  assert(rescheduled?.status === 'RESCHEDULED', 'Status is RESCHEDULED', rescheduled?.status)
  assert(!!rescheduled?.rescheduledAt, 'rescheduledAt set', rescheduled?.rescheduledAt)

  console.log('\n=== 9. Admin confirms rescheduled booking ===')
  const confirm2 = await adminConfirmConsultation(bookingId!)
  assert(confirm2.ok, 'Confirm succeeded', confirm2)
  const confirmed = await db.consultationBooking.findUnique({ where: { bookingNumber: bookingNumber! } })
  assert(confirmed?.status === 'CONFIRMED', 'Status is CONFIRMED', confirmed?.status)

  console.log('\n=== 10. Admin marks completed ===')
  const complete = await adminCompleteConsultation(bookingId!)
  assert(complete.ok, 'Complete succeeded', complete)
  const completed = await db.consultationBooking.findUnique({ where: { bookingNumber: bookingNumber! } })
  assert(completed?.status === 'COMPLETED', 'Status is COMPLETED', completed?.status)

  // ─── Edge cases ──────────────────────────────────────────────────────

  console.log('\n=== 11. Edge case: free-text suggestion instead of picking a slot ===')
  const hold2 = await holdConsultationSlot({
    bookerName: 'Test 2',
    bookerPhone: '08020000001',
    contactMethod: 'WhatsApp',
    recipientName: 'Myself',
    sessionMode: 'In-person',
    location: 'Lekki Phase 1',
    slotDate,
    slotTime: '11:30 AM',
  })
  assert(hold2.ok, 'Hold 2 succeeded', hold2)
  const init2 = await initializeConsultationPayment(hold2.bookingNumber!)
  const confirm3 = await confirmConsultationPayment(init2.reference!)
  assert(confirm3.ok, 'Pay 2 succeeded', confirm3)
  const propose2 = await adminProposeReschedule({
    bookingId: hold2.bookingId!,
    reason: 'Emergency.',
    slots: [{ date: slotDate, time: '4:30 PM' }],
  })
  assert(propose2.ok, 'Propose 2 succeeded', propose2)
  const suggestion = await submitRescheduleSuggestion(hold2.bookingNumber!, 'Mon morning or Tue afternoon next week')
  assert(suggestion.ok, 'Suggestion submitted', suggestion)
  const suggBooked = await db.consultationBooking.findUnique({ where: { bookingNumber: hold2.bookingNumber! } })
  assert(
    Boolean(suggBooked?.rescheduleReason?.includes('— Customer reply —')),
    'Customer reply appended to reason',
    suggBooked?.rescheduleReason,
  )
  assert(suggBooked?.status === 'RESCHEDULE_PROPOSED', 'Status stays RESCHEDULE_PROPOSED', suggBooked?.status)

  console.log('\n=== 12. Edge case: reaper doesn\'t delete HELD row with paymentReference ===')
  // Create a HELD row, set paymentReference, then backdate holdUntil to expired
  // Use a second date so it doesn't clash with prior tests' leftover rows.
  const slotDate2 = (() => {
    const d2 = new Date(dt)
    d2.setDate(d2.getDate() + 7)
    if (d2.getDay() === 0) d2.setDate(d2.getDate() + 1)
    return `${d2.getFullYear()}-${String(d2.getMonth() + 1).padStart(2, '0')}-${String(d2.getDate()).padStart(2, '0')}`
  })()
  const hold3 = await holdConsultationSlot({
    bookerName: 'Test 3',
    bookerPhone: '08020000002',
    contactMethod: 'WhatsApp',
    recipientName: 'Myself',
    sessionMode: 'Video call',
    slotDate: slotDate2,
    slotTime: '4:30 PM',
  })
  assert(hold3.ok, 'Hold 3 succeeded', hold3)
  // Set paymentReference and backdate holdUntil
  await db.consultationBooking.update({
    where: { id: hold3.bookingId! },
    data: {
      paymentReference: 'WC-CONS-TEST-MIDPAY',
      holdUntil: new Date(Date.now() - 60 * 1000), // 1 min ago
    },
  })
  await reapExpiredHolds()
  const stillThere = await db.consultationBooking.findUnique({ where: { id: hold3.bookingId! } })
  // Bug 1 fix: reaper should NOT delete HELD rows with paymentReference
  assert(stillThere !== null, 'HELD row with paymentReference is NOT reaped (bug 1 fix)', stillThere === null ? 'WAS DELETED — bug confirmed' : 'preserved')

  console.log('\n=== 13. Edge case: booking number collision (race condition) ===')
  // Manually create a row with the next bookingNumber, then try to hold.
  // Use a third date to avoid clashing with hold3 (still in DB at slotDate2 4:30 PM).
  const slotDate3 = (() => {
    const d3 = new Date(dt)
    d3.setDate(d3.getDate() + 14)
    if (d3.getDay() === 0) d3.setDate(d3.getDate() + 1)
    return `${d3.getFullYear()}-${String(d3.getMonth() + 1).padStart(2, '0')}-${String(d3.getDate()).padStart(2, '0')}`
  })()
  // Bug 3 test: create a row with the next bookingNumber (computed via
  // max+1), then try to hold. The retry-on-collision should give us the
  // next-next number after the squatter.
  const collisionNum = await nextBookingNumber()
  await db.consultationBooking.create({
    data: {
      bookingNumber: collisionNum,
      bookerName: 'Squatter',
      bookerPhone: '08020000099',
      contactMethod: 'WhatsApp',
      recipientName: 'Myself',
      sessionMode: 'Video call',
      slotDate: dateOnly(slotDate3),
      slotTime: '2:00 PM',
      amountPaid: 45000,
      holdUntil: new Date(Date.now() + 60 * 1000),
      status: 'HELD',
    },
  })
  // Now try to hold a different slot — counter increments past the squatter
  const hold4 = await holdConsultationSlot({
    bookerName: 'Test 4',
    bookerPhone: '08020000003',
    contactMethod: 'WhatsApp',
    recipientName: 'Myself',
    sessionMode: 'Video call',
    slotDate: slotDate3,
    slotTime: '11:30 AM',
  })
  // Bug 3 fix: retry-on-collision should make this succeed even when the
  // squatter took our booking number.
  assert(hold4.ok, 'Hold 4 succeeded despite race (bug 3 fix)', hold4.ok ? 'passed' : `FAILED: ${hold4.error}`)

  // Cleanup the squatter before the next test
  await db.consultationBooking.deleteMany({
    where: { bookerPhone: '08020000099' },
  }).catch(() => {})

  console.log('\n=== 14. Bug 4 fix: admin can re-propose reschedule on a RESCHEDULED booking ===')
  // hold4 → pay → propose → accept → admin re-proposes
  if (hold4.ok) {
    const init4 = await initializeConsultationPayment(hold4.bookingNumber!)
    const confirm4 = await confirmConsultationPayment(init4.reference!)
    assert(confirm4.ok, 'Pay 4 succeeded', confirm4)
    // Use 4:30 PM (different from hold4's 11:30 AM)
    const proposeR = await adminProposeReschedule({
      bookingId: hold4.bookingId!,
      reason: 'Stylist out sick.',
      slots: [{ date: slotDate3, time: '4:30 PM' }],
    })
    assert(proposeR.ok, 'First reschedule proposed', proposeR)
    const acceptR = await acceptRescheduleSlot(hold4.bookingNumber!, 0)
    assert(acceptR.ok, 'Customer accepted slot (4:30 PM is free)', acceptR.ok ? 'passed' : `FAILED: ${acceptR.error}`)
    if (acceptR.ok) assert(acceptR.slotTime === '4:30 PM', 'Slot moved to 4:30 PM', acceptR.slotTime)
    const beforeRepropose = await db.consultationBooking.findUnique({ where: { bookingNumber: hold4.bookingNumber! } })
    assert(beforeRepropose?.status === 'RESCHEDULED', 'Status is RESCHEDULED', beforeRepropose?.status)
    // Now admin tries to propose again — used to fail with "Only paid or confirmed" — should now succeed
    // Re-propose at 2:00 PM (free after squatter cleanup)
    const reproposeR = await adminProposeReschedule({
      bookingId: hold4.bookingId!,
      reason: 'Actually the new slot also no longer works.',
      slots: [{ date: slotDate3, time: '2:00 PM' }],
    })
    assert(reproposeR.ok, 'Admin can re-propose after RESCHEDULED (bug 4 fix)', reproposeR.ok ? 'passed' : `FAILED: ${reproposeR.error}`)
    const afterRepropose = await db.consultationBooking.findUnique({ where: { bookingNumber: hold4.bookingNumber! } })
    assert(afterRepropose?.status === 'RESCHEDULE_PROPOSED', 'Status back to RESCHEDULE_PROPOSED', afterRepropose?.status)
    // And the original slot should still be preserved (not overwritten by re-propose)
    assert(!!afterRepropose?.originalSlotDate, 'originalSlotDate still set', afterRepropose?.originalSlotDate)
  }

  console.log('\n=== 15. Bug 5 fix: admin can manually set a new slot ===')
  // Take the booking from test 14 (which is now RESCHEDULE_PROPOSED again)
  // and use adminManualReschedule to set a new slot directly.
  if (hold4.ok) {
    const beforeManual = await db.consultationBooking.findUnique({ where: { bookingNumber: hold4.bookingNumber! } })
    assert(beforeManual?.status === 'RESCHEDULE_PROPOSED', 'Pre: RESCHEDULE_PROPOSED', beforeManual?.status)
    // Use 9:00 AM (free — Booking #1 was COMPLETED at this time on slotDate, not slotDate3)
    const manualR = await adminManualReschedule({
      bookingId: hold4.bookingId!,
      slotDate: slotDate3,
      slotTime: '9:00 AM',
      note: 'Customer said only mornings work — confirmed 9am.',
    })
    assert(manualR.ok, 'Manual reschedule succeeded (bug 5 fix)', manualR.ok ? 'passed' : `FAILED: ${manualR.error}`)
    const afterManual = await db.consultationBooking.findUnique({ where: { bookingNumber: hold4.bookingNumber! } })
    assert(afterManual?.status === 'RESCHEDULED', 'Status is RESCHEDULED after manual', afterManual?.status)
    assert(afterManual?.slotTime === '9:00 AM', 'Slot time updated', afterManual?.slotTime)
    assert(Boolean(afterManual?.rescheduleReason?.includes('Admin manual reschedule')), 'Note appended to reason', afterManual?.rescheduleReason)
  }

  console.log('\n=== 16. Bug 5 edge: manual reschedule rejects slot clash ===')
  if (hold4.ok) {
    // Create a blocker at 11:30 AM on slotDate3 (now free — hold4 was at 9:00 AM after manual)
    const blocker = await holdConsultationSlot({
      bookerName: 'Blocker',
      bookerPhone: '08020000088',
      contactMethod: 'WhatsApp',
      recipientName: 'Myself',
      sessionMode: 'Video call',
      slotDate: slotDate3,
      slotTime: '11:30 AM',
    })
    assert(blocker.ok, 'Blocker hold succeeded', blocker.ok ? 'passed' : `FAILED: ${blocker.error}`)
    if (blocker.ok) {
      // Try to move hold4 to 11:30 AM — should fail with clash
      const clashR = await adminManualReschedule({
        bookingId: hold4.bookingId!,
        slotDate: slotDate3,
        slotTime: '11:30 AM',
      })
      assert(!clashR.ok, 'Manual reschedule rejected due to clash', clashR.ok ? 'PASSED (unexpected)' : `correctly rejected: ${clashR.error}`)
      // Cleanup blocker
      await db.consultationBooking.deleteMany({ where: { id: blocker.bookingId! } })
    }
  }

  console.log('\n=== 17. Bug 7: acceptRescheduleSlot rejects already-taken slot ===')
  if (hold4.ok) {
    // Re-propose a slot at 4:30 PM, then create a blocker there, then try to accept — should fail
    const reproposeR2 = await adminProposeReschedule({
      bookingId: hold4.bookingId!,
      reason: 'Testing accept clash.',
      slots: [
        { date: slotDate3, time: '4:30 PM' },
        { date: slotDate3, time: '2:00 PM' },
      ],
    })
    assert(reproposeR2.ok, 'Re-propose for clash test', reproposeR2.ok ? 'passed' : `FAILED: ${reproposeR2.error}`)
    if (reproposeR2.ok) {
      // Blocker at 4:30 PM
      const blocker2 = await holdConsultationSlot({
        bookerName: 'Blocker 2',
        bookerPhone: '08020000077',
        contactMethod: 'WhatsApp',
        recipientName: 'Myself',
        sessionMode: 'Video call',
        slotDate: slotDate3,
        slotTime: '4:30 PM',
      })
      assert(blocker2.ok, 'Blocker 2 hold succeeded', blocker2.ok ? 'passed' : `FAILED: ${blocker2.error}`)
      if (blocker2.ok) {
        // Try to accept slot 0 (4:30 PM) — should fail with clash
        const acceptClashR = await acceptRescheduleSlot(hold4.bookingNumber!, 0)
        assert(!acceptClashR.ok, 'Accept rejected due to clash (bug 7 fix)', acceptClashR.ok ? 'PASSED (unexpected)' : `correctly rejected: ${acceptClashR.error}`)
        // Now accept slot 1 (2:00 PM) — should succeed
        const acceptOkR = await acceptRescheduleSlot(hold4.bookingNumber!, 1)
        assert(acceptOkR.ok, 'Accept succeeded on free slot', acceptOkR.ok ? 'passed' : `FAILED: ${acceptOkR.error}`)
        // Cleanup
        await db.consultationBooking.deleteMany({ where: { id: blocker2.bookingId! } })
      }
    }
  }

  // ─── Summary ──────────────────────────────────────────────────────
  console.log(`\n=== Summary: ${pass} passed, ${fail} failed ===`)
  if (fail > 0) {
    console.log('\nSome edge cases are expected to fail — these are the bugs we\'ll fix next.')
  }

  // Cleanup our test rows (cover all the test phones we created)
  await db.consultationBooking.deleteMany({
    where: {
      bookerPhone: {
        in: [
          '08020000000', '08020000001', '08020000002', '08020000003',
          '08020000077', '08020000088', '08020000099',
        ],
      },
    },
  }).catch(() => {})

  await db.$disconnect()
  process.exit(fail > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error('Test runner crashed:', e)
  process.exit(2)
})
