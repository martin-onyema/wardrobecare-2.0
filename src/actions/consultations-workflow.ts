'use server'

/**
 * Consultation workflow server actions — admin side.
 *
 * Covers:
 *   - Stylist assignment
 *   - Session workspace: start, add-time, add audit/photo/gap, finish
 *   - After-session: send summary, schedule reminders, return visit, PS brief
 *   - Calendar: block/unblock slots, availability rules
 *   - Fees & discounts: save fees, promo codes, automatic offers
 *   - Apply discount to a booking (with refund/credit accounting)
 *
 * Session workspace actions are append-only on JSON fields (auditItems,
 * outfitPhotos, gapItems) — we read-modify-write the whole array. This
 * is fine for single-stylist sessions; if two staff edit the same
 * booking simultaneously the last write wins, but that's a rare case
 * for in-person sessions.
 */

import { db } from '@/lib/db'
import { requireStaffWithPermission } from '@/lib/permissions'
import { auditLog } from '@/lib/audit'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import {
  CONSULTATION_PRICE,
  CONSULTATION_HOURLY_AFTER,
  CONSULTATION_SLOT_TIMES,
} from '@/lib/consultations-constants'

// ============================================================
// Helpers — JSON parsing that works for both sqlite (String) and
// postgres (Json) columns. Mirrors parseProposedSlots in consultations.ts.
// ============================================================

function parseJsonArray(raw: string | unknown[] | null | undefined): any[] {
  if (!raw) return []
  let arr: unknown
  if (typeof raw === 'string') {
    try {
      arr = JSON.parse(raw)
    } catch {
      return []
    }
  } else {
    arr = raw
  }
  return Array.isArray(arr) ? arr : []
}

function jsonify(value: any): string {
  // sqlite stores JSON columns as String — we always JSON.stringify on
  // write so reads can be parsed back. Postgres Json? accepts either.
  return JSON.stringify(value)
}

// ============================================================
// 1. Stylist assignment
// ============================================================

export async function adminAssignStylist(bookingId: string, stylistId: string | null) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!bookingId) return { ok: false, error: 'Booking ID required.' } as const

  // Validate stylist — must be a non-customer user
  let stylist: { id: string; name: string | null; email: string } | null = null
  if (stylistId) {
    stylist = await db.user.findUnique({
      where: { id: stylistId },
      select: { id: true, name: true, email: true, role: true },
    })
    if (!stylist) return { ok: false, error: 'Stylist not found.' } as const
    // Accept any non-customer role as a stylist. CUSTOMER_SUPPORT, SALES, MANAGER, ADMIN
    // can all be assigned. CUSTOMER cannot.
    if ((stylist as any).role === 'CUSTOMER') {
      return { ok: false, error: 'Only staff can be assigned as stylists.' } as const
    }
  }

  const booking = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!booking) return { ok: false, error: 'Booking not found.' } as const

  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { assignedStylistId: stylistId },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not assign stylist.' } as const
  }

  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.assign_stylist',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Assigned ${stylist?.email ?? 'no one'} to ${booking.bookingNumber}`,
    })
  } catch {}

  revalidatePath('/admin/services/consultations')
  return {
    ok: true,
    stylistName: stylist?.name || stylist?.email || null,
  } as const
}

// ============================================================
// 2. Confirm a paid booking (the admin hits "Confirm booking" once
//    a stylist is assigned)
// ============================================================

export async function adminConfirmPaidBooking(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, bookingNumber: true, status: true, assignedStylistId: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'PAID' && b.status !== 'RESCHEDULED') {
    return { ok: false, error: 'Only paid or rescheduled bookings can be confirmed.' } as const
  }
  if (!b.assignedStylistId) {
    return { ok: false, error: 'Assign a stylist first.' } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
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
  return { ok: true } as const
}

// ============================================================
// 3. Session workspace
// ============================================================

export async function adminStartSession(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, bookingNumber: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'CONFIRMED' && b.status !== 'RESCHEDULED' && b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Only confirmed bookings can start a session.' } as const
  }
  if (b.status === 'IN_SESSION') return { ok: true, alreadyStarted: true } as const
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'IN_SESSION', sessionStartedAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not start session.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.session_start',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Started session for ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

export async function adminAddSessionTime(bookingId: string, minutes: number) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 600) {
    return { ok: false, error: 'Minutes must be between 1 and 600.' } as const
  }
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, bookingNumber: true, status: true, elapsedMinutes: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Session must be running to add time.' } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { elapsedMinutes: { increment: Math.round(minutes) } },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not add time.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Audit items ────────────────────────────────────────────────

const auditItemSchema = z.object({
  item: z.string().min(1, 'Item name is required'),
  category: z.string().min(1),
  action: z.enum(['Keep', 'Alter', 'Retire']),
  note: z.string().optional(),
})

export async function adminAddAuditItem(bookingId: string, input: z.infer<typeof auditItemSchema>) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const parsed = auditItemSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid audit item.' } as const
  }
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, bookingNumber: true, status: true, auditItems: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Audit items can only be added while the session is running.' } as const
  }
  const items = parseJsonArray(b.auditItems)
  items.push({
    i: parsed.data.item.trim(),
    cat: parsed.data.category,
    a: parsed.data.action,
    n: parsed.data.note?.trim() ?? '',
  })
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { auditItems: jsonify(items) },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not add audit item.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true, count: items.length } as const
}

export async function adminRemoveAuditItem(bookingId: string, index: number) {
  await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, auditItems: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Can only edit audit while the session is running.' } as const
  }
  const items = parseJsonArray(b.auditItems)
  if (index < 0 || index >= items.length) {
    return { ok: false, error: 'Invalid item index.' } as const
  }
  items.splice(index, 1)
  await db.consultationBooking.update({
    where: { id: bookingId },
    data: { auditItems: jsonify(items) },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Outfit photos ─────────────────────────────────────────────

const outfitSchema = z.object({
  occasion: z.string().min(1, 'Occasion is required'),
  photoUrl: z.string().optional(), // optional for now — uploads wired later
})

export async function adminAddOutfitPhoto(bookingId: string, input: z.infer<typeof outfitSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = outfitSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid outfit.' } as const
  }
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, outfitPhotos: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Photos can only be added while the session is running.' } as const
  }
  const photos = parseJsonArray(b.outfitPhotos)
  const next = photos.length + 1
  photos.push({
    n: next,
    o: parsed.data.occasion,
    url: parsed.data.photoUrl ?? '',
  })
  await db.consultationBooking.update({
    where: { id: bookingId },
    data: { outfitPhotos: jsonify(photos) },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true, outfitNumber: next } as const
}

export async function adminRemoveOutfitPhoto(bookingId: string, index: number) {
  await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, outfitPhotos: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Can only edit photos while the session is running.' } as const
  }
  const photos = parseJsonArray(b.outfitPhotos)
  if (index < 0 || index >= photos.length) {
    return { ok: false, error: 'Invalid photo index.' } as const
  }
  photos.splice(index, 1)
  // Renumber so they stay sequential 1, 2, 3 …
  photos.forEach((p: any, i: number) => {
    p.n = i + 1
  })
  await db.consultationBooking.update({
    where: { id: bookingId },
    data: { outfitPhotos: jsonify(photos) },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Gap items ─────────────────────────────────────────────────

const gapSchema = z.object({
  item: z.string().min(1, 'Item is required'),
  priority: z.enum(['High', 'Medium', 'Low']).default('Medium'),
})

export async function adminAddGapItem(bookingId: string, input: z.infer<typeof gapSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = gapSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid gap item.' } as const
  }
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, gapItems: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Gap items can only be added while the session is running.' } as const
  }
  const gaps = parseJsonArray(b.gapItems)
  gaps.push({ i: parsed.data.item.trim(), p: parsed.data.priority })
  await db.consultationBooking.update({
    where: { id: bookingId },
    data: { gapItems: jsonify(gaps) },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true, count: gaps.length } as const
}

export async function adminRemoveGapItem(bookingId: string, index: number) {
  await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, gapItems: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Can only edit gaps while the session is running.' } as const
  }
  const gaps = parseJsonArray(b.gapItems)
  if (index < 0 || index >= gaps.length) {
    return { ok: false, error: 'Invalid gap index.' } as const
  }
  gaps.splice(index, 1)
  await db.consultationBooking.update({
    where: { id: bookingId },
    data: { gapItems: jsonify(gaps) },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Send extra-time payment link ───────────────────────────────

export async function adminSendExtraTimeLink(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      bookingNumber: true,
      status: true,
      elapsedMinutes: true,
      discountAppliesToAll: true,
      discountPct: true,
      discountFree: true,
    },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Session must be running to bill extra time.' } as const
  }
  // Compute extra hours (each started hour, per current setting)
  const settings = await db.consultationServiceSetting.findUnique({ where: { id: 'singleton' } })
  const extraHourFee = settings?.extraHourFee ?? CONSULTATION_HOURLY_AFTER
  const roundMode = settings?.extraTimeRounding ?? 'started'
  const extraMin = Math.max(0, b.elapsedMinutes - 120)
  let extraHours = 0
  if (extraMin > 0) {
    extraHours = roundMode === 'full' ? Math.floor(extraMin / 60) : Math.ceil(extraMin / 60)
  }
  if (extraHours === 0) {
    return { ok: false, error: 'No extra time to bill yet.' } as const
  }
  let amount = extraHours * extraHourFee
  // If the booking discount applies to all, reduce extra time too
  if (b.discountAppliesToAll) {
    if (b.discountFree) amount = 0
    else if (b.discountPct) amount = Math.round(amount * (1 - b.discountPct / 100))
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { extraTimeBilledAt: new Date(), extraTimeAmount: amount },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not record extra-time billing.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.extra_time_billed',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Extra time billed: ${extraHours}h × ₦${extraHourFee} = ₦${amount} for ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true, amount, extraHours } as const
}

// ── Finish the session ────────────────────────────────────────

export async function adminFinishSession(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      bookingNumber: true,
      status: true,
      auditItems: true,
      outfitPhotos: true,
      gapItems: true,
      elapsedMinutes: true,
    },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'IN_SESSION') {
    return { ok: false, error: 'Session must be running to finish.' } as const
  }
  const audits = parseJsonArray(b.auditItems)
  const photos = parseJsonArray(b.outfitPhotos)
  const gaps = parseJsonArray(b.gapItems)
  if (audits.length === 0 || photos.length === 0 || gaps.length === 0) {
    return {
      ok: false,
      error: 'Need at least one audit item, one outfit photo and one gap item before finishing.',
    } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'SUMMARY_PENDING' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not finish session.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.session_finish',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Finished session for ${b.bookingNumber} (${Math.floor(b.elapsedMinutes / 60)}h ${b.elapsedMinutes % 60}m)`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true, elapsedMinutes: b.elapsedMinutes } as const
}

// ============================================================
// 4. After the session — send summary, return visit, PS brief
// ============================================================

export async function adminSendSummary(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      bookingNumber: true,
      status: true,
      bookerName: true,
      bookerPhone: true,
      contactMethod: true,
      outfitPhotos: true,
      gapItems: true,
    },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'SUMMARY_PENDING') {
    return { ok: false, error: 'Summary can only be sent after the session is finished.' } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'COMPLETED', summarySentAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not send summary.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.send_summary',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Sent Wardrobe Map + Gap List via WhatsApp for ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

export async function adminMarkPersonalShoppingBrief(bookingId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({
    where: { id: bookingId },
    select: { id: true, bookingNumber: true, status: true, gapItems: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'COMPLETED' && b.status !== 'SUMMARY_PENDING') {
    return { ok: false, error: 'Brief can only be created from a finished session.' } as const
  }
  const gaps = parseJsonArray(b.gapItems)
  if (gaps.length === 0) {
    return { ok: false, error: 'No gap items to create a brief from.' } as const
  }
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { personalShoppingBriefAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not create PS brief.' } as const
  }
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.ps_brief',
      entityType: 'ConsultationBooking',
      entityId: bookingId,
      description: `Created Personal Shopping brief from gap list (${gaps.length} items) for ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true, gapCount: gaps.length } as const
}

// Return visit: just records the intent + the chosen type so staff can
// follow up manually. A real follow-up booking can be created later
// from the customer's booking page.
const returnVisitSchema = z.object({
  bookingId: z.string().min(1),
  type: z.enum(['dropoff', 'fitting']),
})

export async function adminBookReturnVisit(input: z.infer<typeof returnVisitSchema>) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const parsed = returnVisitSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input.' } as const
  }
  const b = await db.consultationBooking.findUnique({
    where: { id: parsed.data.bookingId },
    select: { id: true, bookingNumber: true, status: true },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status !== 'COMPLETED' && b.status !== 'SUMMARY_PENDING') {
    return { ok: false, error: 'Return visit can only be booked after the session.' } as const
  }
  // We don't create a new booking here — staff will share a payment
  // link with the customer manually based on the chosen type. We just
  // record the intent in the audit log so the customer booking page can
  // show "Return visit: drop-off" or "Return visit: with fitting" in
  // the timeline.
  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.return_visit',
      entityType: 'ConsultationBooking',
      entityId: b.id,
      description: `Booked return visit (${parsed.data.type === 'dropoff' ? 'drop-off only' : 'with fitting'}) for ${b.bookingNumber}`,
    })
  } catch {}
  revalidatePath('/admin/services/consultations')
  return { ok: true, type: parsed.data.type } as const
}

// ============================================================
// 5. Calendar — block/unblock slots
// ============================================================

export async function adminBlockSlot(slotDate: string, slotTime: string, reason?: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(slotDate)) {
    return { ok: false, error: 'Invalid date.' } as const
  }
  if (!CONSULTATION_SLOT_TIMES.includes(slotTime as any)) {
    return { ok: false, error: 'Invalid time.' } as const
  }
  const [y, m, d] = slotDate.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
  try {
    await db.consultationBlockedSlot.upsert({
      where: { slotDate_slotTime: { slotDate: dt, slotTime } },
      create: { slotDate: dt, slotTime, reason: reason?.trim() || null },
      update: { reason: reason?.trim() || null },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not block slot.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

export async function adminUnblockSlot(slotDate: string, slotTime: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(slotDate)) {
    return { ok: false, error: 'Invalid date.' } as const
  }
  const [y, m, d] = slotDate.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
  try {
    await db.consultationBlockedSlot.deleteMany({
      where: { slotDate: dt, slotTime },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not unblock slot.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Availability rules ────────────────────────────────────────

const availabilitySchema = z.object({
  workingDays: z.array(z.string()).min(1, 'Pick at least one working day.'),
  travelBufferMinutes: z.number().int().min(0).max(240),
  minNoticeHours: z.number().int().min(0).max(168),
  allowVideo: z.boolean(),
  allowInPerson: z.boolean(),
})

export async function adminSaveAvailability(input: z.infer<typeof availabilitySchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = availabilitySchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid availability.' } as const
  }
  try {
    await db.consultationAvailability.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        workingDays: parsed.data.workingDays.join(','),
        travelBufferMinutes: parsed.data.travelBufferMinutes,
        minNoticeHours: parsed.data.minNoticeHours,
        allowVideo: parsed.data.allowVideo,
        allowInPerson: parsed.data.allowInPerson,
      },
      update: {
        workingDays: parsed.data.workingDays.join(','),
        travelBufferMinutes: parsed.data.travelBufferMinutes,
        minNoticeHours: parsed.data.minNoticeHours,
        allowVideo: parsed.data.allowVideo,
        allowInPerson: parsed.data.allowInPerson,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not save availability.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ============================================================
// 6. Fees & discounts
// ============================================================

const feesSchema = z.object({
  baseFee: z.number().int().min(1, 'Base fee must be more than ₦0.'),
  extraHourFee: z.number().int().min(0, 'Extra hour fee cannot be negative.'),
  returnVisitDropoffPct: z.number().int().min(0).max(100, 'Percentage must be 0–100.'),
  extraTimeRounding: z.enum(['started', 'full']),
})

export async function adminSaveFees(input: z.infer<typeof feesSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = feesSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid fees.' } as const
  }
  try {
    await db.consultationServiceSetting.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        baseFee: parsed.data.baseFee,
        extraHourFee: parsed.data.extraHourFee,
        returnVisitDropoffPct: parsed.data.returnVisitDropoffPct,
        extraTimeRounding: parsed.data.extraTimeRounding,
      },
      update: {
        baseFee: parsed.data.baseFee,
        extraHourFee: parsed.data.extraHourFee,
        returnVisitDropoffPct: parsed.data.returnVisitDropoffPct,
        extraTimeRounding: parsed.data.extraTimeRounding,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not save fees.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Promo codes ──────────────────────────────────────────────

const promoCodeSchema = z.object({
  code: z
    .string()
    .min(4, 'Code must be at least 4 characters.')
    .max(16, 'Code must be at most 16 characters.')
    .regex(/^[A-Z0-9]+$/, 'Code must be 4–16 letters or numbers, no spaces.')
    .transform((s) => s.toUpperCase()),
  type: z.enum(['pct', 'fix', 'free']),
  value: z.number().int().min(1),
  appliesToAll: z.boolean().default(false),
  expiresAt: z.string().optional(), // YYYY-MM-DD or empty
  usageLimit: z.number().int().min(1).optional(),
})

export async function adminCreatePromoCode(input: z.infer<typeof promoCodeSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = promoCodeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid promo code.' } as const
  }
  // Validate value vs base fee
  const settings = await db.consultationServiceSetting.findUnique({ where: { id: 'singleton' } })
  const baseFee = settings?.baseFee ?? CONSULTATION_PRICE
  if (parsed.data.type === 'pct' && (parsed.data.value < 1 || parsed.data.value > 100)) {
    return { ok: false, error: 'Percentage must be between 1 and 100.' } as const
  }
  if (parsed.data.type === 'fix' && parsed.data.value >= baseFee) {
    return {
      ok: false,
      error: `Fixed amount must be less than the session fee (₦${baseFee.toLocaleString()}). Use Free session instead.`,
    } as const
  }
  // Check expiry not in past
  let expiresAt: Date | null = null
  if (parsed.data.expiresAt) {
    expiresAt = new Date(parsed.data.expiresAt + 'T00:00:00Z')
    if (expiresAt.getTime() < Date.now() - 86400000) {
      return { ok: false, error: 'Expiry date is in the past.' } as const
    }
  }
  // Check code doesn't already exist
  const existing = await db.consultationPromoCode.findUnique({ where: { code: parsed.data.code } })
  if (existing) {
    return { ok: false, error: 'That code already exists.' } as const
  }
  try {
    await db.consultationPromoCode.create({
      data: {
        code: parsed.data.code,
        type: parsed.data.type,
        value: parsed.data.type === 'free' ? 100 : parsed.data.value,
        appliesToAll: parsed.data.appliesToAll,
        expiresAt,
        usageLimit: parsed.data.usageLimit ?? null,
        active: true,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not create promo code.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true, code: parsed.data.code } as const
}

export async function adminTogglePromoCode(promoCodeId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  const c = await db.consultationPromoCode.findUnique({ where: { id: promoCodeId } })
  if (!c) return { ok: false, error: 'Code not found.' } as const
  await db.consultationPromoCode.update({
    where: { id: promoCodeId },
    data: { active: !c.active },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true, active: !c.active } as const
}

export async function adminDeletePromoCode(promoCodeId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  try {
    await db.consultationPromoCode.delete({ where: { id: promoCodeId } })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not delete code.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

// ── Automatic offers (discount rules) ─────────────────────────

const discountRuleSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  condition: z.string().min(3, 'Condition is required.'),
  reward: z.string().min(2, 'Reward is required.'),
})

export async function adminCreateDiscountRule(input: z.infer<typeof discountRuleSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = discountRuleSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid offer.' } as const
  }
  try {
    await db.consultationDiscountRule.create({
      data: {
        name: parsed.data.name.trim(),
        condition: parsed.data.condition.trim(),
        reward: parsed.data.reward.trim(),
        active: false, // start switched off — staff review first
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not create offer.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}

export async function adminToggleDiscountRule(ruleId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  const r = await db.consultationDiscountRule.findUnique({ where: { id: ruleId } })
  if (!r) return { ok: false, error: 'Offer not found.' } as const
  await db.consultationDiscountRule.update({
    where: { id: ruleId },
    data: { active: !r.active },
  })
  revalidatePath('/admin/services/consultations')
  return { ok: true, active: !r.active } as const
}

// ============================================================
// 7. Apply a staff discount to a booking
//
//    Supports percentage, fixed amount, free session, or custom price.
//    If the new price is lower than what was already paid, the
//    difference is returned to the customer as wallet credit (we
//    record the intent in the audit log — actual refund/credit
//    posting is a separate step done by the finance admin).
// ============================================================

const applyDiscountSchema = z.object({
  bookingId: z.string().min(1),
  type: z.enum(['pct', 'fix', 'free', 'custom']),
  value: z.number().int().min(0), // pct: 1-100, fix: naira, free: ignored, custom: new total price
  appliesToAll: z.boolean().default(false),
  reason: z.string().min(2, 'Pick a reason.'),
  note: z.string().min(5, 'Add a short note for the record.'),
  returnAs: z.enum(['wallet', 'refund']).default('wallet'),
})

export async function adminApplyDiscountToBooking(input: z.infer<typeof applyDiscountSchema>) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  const parsed = applyDiscountSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid discount.' } as const
  }
  const d = parsed.data

  const b = await db.consultationBooking.findUnique({
    where: { id: d.bookingId },
    select: {
      id: true,
      bookingNumber: true,
      amountPaid: true,
      listPrice: true,
      status: true,
    },
  })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  if (b.status === 'COMPLETED' || b.status === 'CANCELLED') {
    return { ok: false, error: 'Cannot discount a completed or cancelled booking.' } as const
  }

  // Compute new price
  const listPrice = b.listPrice || CONSULTATION_PRICE
  let newPrice: number
  let labelSuffix: string
  let pct: number | null = null
  let isFree = false
  if (d.type === 'pct') {
    if (d.value < 1 || d.value > 100) {
      return { ok: false, error: 'Percentage must be 1–100.' } as const
    }
    newPrice = Math.round(listPrice * (1 - d.value / 100))
    pct = d.value
    labelSuffix = `${d.value}% off`
  } else if (d.type === 'fix') {
    if (d.value >= listPrice) {
      return { ok: false, error: `Amount off must be less than ₦${listPrice.toLocaleString()}. Use Free session instead.` } as const
    }
    newPrice = listPrice - d.value
    labelSuffix = `₦${d.value.toLocaleString()} off`
  } else if (d.type === 'free') {
    newPrice = 0
    isFree = true
    labelSuffix = 'free session'
  } else {
    // custom
    if (d.value >= listPrice) {
      return { ok: false, error: 'A custom price must be below the list price.' } as const
    }
    newPrice = d.value
    labelSuffix = `custom price ₦${d.value.toLocaleString()}`
  }

  if (newPrice > b.amountPaid) {
    return {
      ok: false,
      error: `The new price (₦${newPrice.toLocaleString()}) is higher than what was paid (₦${b.amountPaid.toLocaleString()}).`,
    } as const
  }

  const refundAmount = Math.max(0, b.amountPaid - newPrice)
  const label = `Staff discount: ${d.reason} (${labelSuffix})`

  try {
    await db.consultationBooking.update({
      where: { id: b.id },
      data: {
        listPrice, // make sure it's set if missing
        amountPaid: newPrice,
        discountLabel: label,
        discountAmount: listPrice - newPrice,
        discountAppliesToAll: d.appliesToAll,
        discountPct: pct,
        discountFree: isFree,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not apply discount.' } as const
  }

  try {
    await auditLog({
      actorId: admin.id,
      action: 'consultation.apply_discount',
      entityType: 'ConsultationBooking',
      entityId: b.id,
      description: `${label}. Reason: ${d.reason}. Note: ${d.note}. New price ₦${newPrice.toLocaleString()}` +
        (refundAmount ? `. ₦${refundAmount.toLocaleString()} returned as ${d.returnAs}.` : '.'),
    })
  } catch {}

  revalidatePath('/admin/services/consultations')
  return { ok: true, newPrice, refundAmount, returnAs: d.returnAs } as const
}

// ============================================================
// 8. Mark session complete (admin-only override if the after-session
//    flow was skipped)
// ============================================================

export async function adminMarkComplete(bookingId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  const b = await db.consultationBooking.findUnique({ where: { id: bookingId } })
  if (!b) return { ok: false, error: 'Booking not found.' } as const
  try {
    await db.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'COMPLETED', summarySentAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not mark complete.' } as const
  }
  revalidatePath('/admin/services/consultations')
  return { ok: true } as const
}
