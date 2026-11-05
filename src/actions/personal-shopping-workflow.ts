'use server'

/**
 * Personal Shopping workflow server actions — admin side.
 *
 * Covers the full lifecycle of a PersonalShoppingRequest:
 *   - Stylist assignment
 *   - Accept request (NEW → SOURCING)
 *   - Shortlist: add/remove PSItems, send to customer (SOURCING → SENT)
 *   - Customer decisions + approve choices (SENT → APPROVED)
 *   - Delivery fee quote, payment link, pay-on-delivery, mark paid
 *     (APPROVED → PAID)
 *   - Dispatch + mark delivered (PAID → FULFILLING → DONE) for DELIVERED tier
 *   - Fitting: start, add-time, payment link, complete
 *     (APPROVED/SENT → FULFILLING → DONE) for IN_PERSON_FITTING tier
 *   - Sourcing-fee discounts (PERCENT / FIXED / FREE / CUSTOM)
 *   - Service settings: fees, delivery zones, promo codes
 *
 * A PSEvent row is written for every state change. Failures are logged
 * but never throw — the workflow must not abort just because the audit
 * trail couldn't be written.
 */

import { db } from '@/lib/db'
import { requireStaffWithPermission } from '@/lib/permissions'
import { auditLog } from '@/lib/audit'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import type { PSItemDecision, PSItemType } from '@prisma/client'

// ============================================================
// Helpers
// ============================================================

/**
 * Write a PSEvent row. Best-effort — failures are swallowed so the
 * workflow never aborts just because the audit trail couldn't be
 * written.
 */
async function writePSEvent(
  requestId: string,
  actorId?: string | null,
  actorType: string = 'SYSTEM',
  note?: string | null,
) {
  try {
    await db.pSEvent.create({
      data: {
        requestId,
        actorId: actorId ?? null,
        actorType,
        note: note ?? null,
      },
    })
  } catch (e) {
    console.warn('[personal-shopping-workflow] writePSEvent failed:', (e as Error).message)
  }
}

/**
 * Compute the total owed at the end of an in-person fitting:
 *   subtotal = Σ price of items the customer kept (decision = KEEP)
 *   extraFee = extra time blocks × extraBlockFee
 *     extraBlocks = ceil((elapsed - includedMinutes) / extraBlockMinutes)
 *     (clamped to ≥ 0 — the included minutes are free)
 *   total = subtotal + extraFee
 *
 * Falls back to the schema defaults (60 / 30 / 5000) when the
 * PSServiceSetting singleton doesn't exist yet.
 */
async function computeFittingTotal(requestId: string): Promise<{
  subtotal: number
  extraFee: number
  total: number
  extraBlocks: number
  elapsed: number
}> {
  const items = await db.pSItem.findMany({
    where: { requestId, decision: 'KEEP' },
    select: { price: true },
  })
  const subtotal = items.reduce((s, i) => s + i.price, 0)

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { fittingElapsedMinutes: true },
  })
  const elapsed = req?.fittingElapsedMinutes ?? 0

  const settings = await db.pSServiceSetting.findUnique({ where: { id: 'singleton' } })
  const includedMinutes = settings?.includedMinutes ?? 60
  const extraBlockMinutes = settings?.extraBlockMinutes ?? 30
  const extraBlockFee = settings?.extraBlockFee ?? 5000

  const extraBlocks = Math.max(
    0,
    Math.ceil((elapsed - includedMinutes) / extraBlockMinutes),
  )
  const extraFee = extraBlocks * extraBlockFee

  return { subtotal, extraFee, total: subtotal + extraFee, extraBlocks, elapsed }
}

// ============================================================
// 1. Stylist assignment
// ============================================================

export async function adminAssignPSStylist(requestId: string, stylistId: string | null) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  // Validate stylist — must be a non-customer user
  let stylist: { id: string; name: string | null; email: string } | null = null
  if (stylistId) {
    stylist = await db.user.findUnique({
      where: { id: stylistId },
      select: { id: true, name: true, email: true, role: true },
    })
    if (!stylist) return { ok: false, error: 'Stylist not found.' } as const
    // Accept any non-customer role as a stylist (CUSTOMER_SUPPORT, SALES,
    // MANAGER, ADMIN can all be assigned; CUSTOMER cannot).
    if ((stylist as any).role === 'CUSTOMER') {
      return { ok: false, error: 'Only staff can be assigned as stylists.' } as const
    }
  }

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { stylistId },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not assign stylist.' } as const
  }

  await writePSEvent(requestId, admin.id, 'STAFF', `Assigned ${stylist?.email ?? 'no one'} to ${req.ref}`)

  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.assign_stylist',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Assigned ${stylist?.email ?? 'no one'} to ${req.ref}`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return {
    ok: true,
    stylistName: stylist?.name || stylist?.email || null,
  } as const
}

// ============================================================
// 2. Accept request (NEW → SOURCING)
// ============================================================

export async function adminAcceptPSRequest(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'NEW') {
    return { ok: false, error: 'Only new requests can be accepted.' } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'SOURCING' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not accept request.' } as const
  }

  await writePSEvent(requestId, admin.id, 'STAFF', `Accepted ${req.ref} → SOURCING`)
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.accept',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Accepted ${req.ref} → SOURCING`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

// ============================================================
// 3. Shortlist — add / remove items
// ============================================================

const addItemSchema = z.object({
  name: z.string().min(1, 'Item name is required.'),
  category: z.enum([
    'SHIRTS',
    'TROUSERS',
    'SUITING',
    'FOOTWEAR',
    'ACCESSORIES',
    'FRAGRANCE',
    'TRADITIONAL',
  ]) as unknown as z.ZodType<PSItemType>,
  size: z.string().min(1, 'Size is required.'),
  price: z.number().int().positive('Price must be greater than ₦0.'),
  source: z.string().min(1, 'Source is required.'),
  stylistNote: z.string().optional(),
})

export async function adminAddPSItem(
  requestId: string,
  input: z.infer<typeof addItemSchema>,
) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const parsed = addItemSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid item.' } as const
  }

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  // Items can be added while SOURCING — but we also allow it earlier
  // (NEW) so a stylist can prepare a draft before formally accepting.
  if (req.status !== 'SOURCING' && req.status !== 'NEW') {
    return {
      ok: false,
      error: 'Items can only be added while the request is being sourced.',
    } as const
  }

  try {
    const created = await db.pSItem.create({
      data: {
        requestId,
        name: parsed.data.name.trim(),
        category: parsed.data.category,
        size: parsed.data.size.trim(),
        price: parsed.data.price,
        source: parsed.data.source.trim(),
        stylistNote: parsed.data.stylistNote?.trim() || null,
      },
    })
    await writePSEvent(
      requestId,
      null,
      'STAFF',
      `Added item "${created.name}" (${created.category}, ₦${created.price.toLocaleString()}) to ${req.ref}`,
    )
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not add item.' } as const
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminRemovePSItem(itemId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!itemId) return { ok: false, error: 'Item ID required.' } as const

  const item = await db.pSItem.findUnique({
    where: { id: itemId },
    select: { id: true, requestId: true, name: true },
  })
  if (!item) return { ok: false, error: 'Item not found.' } as const

  try {
    await db.pSItem.delete({ where: { id: itemId } })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not remove item.' } as const
  }

  await writePSEvent(item.requestId, null, 'STAFF', `Removed item "${item.name}"`)

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

// ============================================================
// 4. Send shortlist (SOURCING → SENT)
// ============================================================

export async function adminSendShortlist(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, reviewMethod: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'SOURCING') {
    return {
      ok: false,
      error: 'Shortlist can only be sent while the request is being sourced.',
    } as const
  }

  const items = await db.pSItem.findMany({
    where: { requestId },
    select: { id: true, price: true },
  })
  if (items.length < 2) {
    return {
      ok: false,
      error: 'Add at least 2 items before sending the shortlist.',
    } as const
  }
  if (!items.every((i) => i.price > 0)) {
    return {
      ok: false,
      error: 'Every item must have a price greater than ₦0.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'SENT' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not send shortlist.' } as const
  }

  const reviewLabel =
    req.reviewMethod === 'WHATSAPP'
      ? 'WhatsApp'
      : req.reviewMethod === 'ONSITE'
        ? 'onsite fitting'
        : 'online review'

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Sent shortlist (${items.length} items) via ${reviewLabel} for ${req.ref}`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.send_shortlist',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Sent shortlist (${items.length} items) via ${reviewLabel} for ${req.ref}`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, itemCount: items.length, reviewMethod: req.reviewMethod } as const
}

// ============================================================
// 5. Customer decisions (SENT)
// ============================================================

const decisionSchema = z.enum(['PENDING', 'KEEP', 'SKIP', 'WANTS_DIFFERENT'])

export async function adminRecordItemDecision(
  itemId: string,
  decision: PSItemDecision,
  note?: string,
) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!itemId) return { ok: false, error: 'Item ID required.' } as const

  const parsed = decisionSchema.safeParse(decision)
  if (!parsed.success) {
    return { ok: false, error: 'Invalid decision.' } as const
  }

  const item = await db.pSItem.findUnique({
    where: { id: itemId },
    select: { id: true, requestId: true, name: true, decision: true },
  })
  if (!item) return { ok: false, error: 'Item not found.' } as const

  try {
    await db.pSItem.update({
      where: { id: itemId },
      data: {
        decision: parsed.data,
        decisionNote:
          parsed.data === 'WANTS_DIFFERENT' ? (note?.trim() || null) : null,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not record decision.' } as const
  }

  await writePSEvent(
    item.requestId,
    admin.id,
    'STAFF',
    `Recorded decision ${parsed.data} for "${item.name}"` +
      (parsed.data === 'WANTS_DIFFERENT' && note?.trim()
        ? ` — wants: ${note.trim()}`
        : ''),
  )

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, decision: parsed.data } as const
}

export async function adminApproveChoices(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'SENT') {
    return {
      ok: false,
      error: 'Choices can only be approved after the shortlist is sent.',
    } as const
  }

  const keptCount = await db.pSItem.count({
    where: { requestId, decision: 'KEEP' },
  })

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not approve choices.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Approved choices for ${req.ref} — ${keptCount} item${keptCount === 1 ? '' : 's'} kept`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.approve_choices',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Approved choices for ${req.ref} — ${keptCount} item(s) kept`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, keptCount } as const
}

// ============================================================
// 6. Payment (APPROVED → PAID)
// ============================================================

export async function adminQuoteDeliveryFee(requestId: string, fee: number) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const
  if (!Number.isFinite(fee) || fee < 0) {
    return { ok: false, error: 'Fee must be a non-negative number.' } as const
  }

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { deliveryFeeQuoted: Math.round(fee) },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not quote delivery fee.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Quoted delivery fee ₦${Math.round(fee).toLocaleString()} for ${req.ref}`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.quote_delivery_fee',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Quoted delivery fee ₦${Math.round(fee).toLocaleString()} for ${req.ref}`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, fee: Math.round(fee) } as const
}

export async function adminSendPaymentLink(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, paymentMethod: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'APPROVED') {
    return {
      ok: false,
      error: 'Payment links can only be sent after choices are approved.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { paymentMethod: 'link' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not send payment link.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Sent payment link to customer for ${req.ref}`,
  )

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminApprovePayOnDelivery(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, isLagos: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'APPROVED') {
    return {
      ok: false,
      error: 'Pay-on-delivery can only be approved after choices are approved.',
    } as const
  }
  if (!req.isLagos) {
    return {
      ok: false,
      error: 'Pay-on-delivery is only available for Lagos deliveries.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { paymentMethod: 'cod', status: 'PAID' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not approve pay-on-delivery.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Approved pay-on-delivery for ${req.ref} → PAID`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.approve_cod',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Approved pay-on-delivery for ${req.ref} → PAID`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminMarkPSPaid(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { paymentMethod: 'paid', status: 'PAID', paidAt: new Date() },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not mark paid.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Customer paid payment link for ${req.ref} → PAID`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.mark_paid',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Customer paid payment link for ${req.ref} → PAID`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

// ============================================================
// 7. Dispatch (PAID → FULFILLING → DONE) — DELIVERED tier
// ============================================================

export async function adminDispatch(requestId: string, riderName: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const
  if (!riderName || !riderName.trim()) {
    return { ok: false, error: 'Rider name is required.' } as const
  }

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'PAID') {
    return {
      ok: false,
      error: 'Only paid requests can be dispatched.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { riderName: riderName.trim(), status: 'FULFILLING' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not dispatch.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Dispatched ${req.ref} with rider "${riderName.trim()}" → FULFILLING`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.dispatch',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Dispatched ${req.ref} with rider "${riderName.trim()}" → FULFILLING`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminMarkDelivered(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'FULFILLING') {
    return {
      ok: false,
      error: 'Only out-for-delivery requests can be marked delivered.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'DONE' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not mark delivered.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Marked ${req.ref} delivered → DONE`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.mark_delivered',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Marked ${req.ref} delivered → DONE`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

// ============================================================
// 8. Fitting (APPROVED/SENT → FULFILLING → DONE) — IN_PERSON_FITTING tier
// ============================================================

export async function adminStartFitting(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, tier: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'APPROVED' && req.status !== 'SENT') {
    return {
      ok: false,
      error: 'Fitting can only start from APPROVED or SENT.',
    } as const
  }
  if (req.tier !== 'IN_PERSON_FITTING') {
    return {
      ok: false,
      error: 'Fitting sessions are only for the in-person fitting tier.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'FULFILLING' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not start fitting.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Started in-person fitting for ${req.ref} → FULFILLING`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.start_fitting',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Started in-person fitting for ${req.ref} → FULFILLING`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminAddFittingTime(requestId: string, minutes: number) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const
  if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 600) {
    return { ok: false, error: 'Minutes must be between 1 and 600.' } as const
  }

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, tier: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'FULFILLING') {
    return {
      ok: false,
      error: 'Time can only be added while the fitting is in progress.',
    } as const
  }
  if (req.tier !== 'IN_PERSON_FITTING') {
    return {
      ok: false,
      error: 'Fitting time only applies to in-person fitting requests.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { fittingElapsedMinutes: { increment: Math.round(minutes) } },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not add fitting time.' } as const
  }

  await writePSEvent(
    requestId,
    null,
    'STAFF',
    `Added ${Math.round(minutes)} minute(s) to ${req.ref}`,
  )

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

export async function adminSendFittingPaymentLink(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, tier: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'FULFILLING') {
    return {
      ok: false,
      error: 'Payment link can only be sent while the fitting is in progress.',
    } as const
  }

  const { subtotal, extraFee, total, extraBlocks, elapsed } =
    await computeFittingTotal(requestId)

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { paymentMethod: 'link' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not send fitting payment link.' } as const
  }

  const noteParts = [
    `Sent fitting payment link for ${req.ref}`,
    `Subtotal: ₦${subtotal.toLocaleString()}`,
    `Extra time: ${elapsed} min elapsed → ${extraBlocks} block(s) × ₦${(extraFee && extraBlocks ? extraFee / extraBlocks : 0).toLocaleString()} = ₦${extraFee.toLocaleString()}`,
    `Total due: ₦${total.toLocaleString()}`,
  ].join(' · ')

  await writePSEvent(requestId, admin.id, 'STAFF', noteParts)
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.send_fitting_payment_link',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: noteParts,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, subtotal, extraFee, total, extraBlocks } as const
}

export async function adminCompleteFitting(requestId: string) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: { id: true, ref: true, status: true, paymentMethod: true },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status !== 'FULFILLING') {
    return {
      ok: false,
      error: 'Only in-progress fittings can be completed.',
    } as const
  }

  const { total } = await computeFittingTotal(requestId)
  if (req.paymentMethod !== 'paid' && total > 0) {
    return {
      ok: false,
      error: 'Customer has not paid the fitting payment link yet.',
    } as const
  }

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: { status: 'DONE' },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not complete fitting.' } as const
  }

  await writePSEvent(
    requestId,
    admin.id,
    'STAFF',
    `Completed fitting for ${req.ref} → DONE (total ₦${total.toLocaleString()})`,
  )
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.complete_fitting',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: `Completed fitting for ${req.ref} → DONE (total ₦${total.toLocaleString()})`,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, total } as const
}

// ============================================================
// 9. Sourcing-fee discounts
//
//   Supports PERCENT, FIXED, FREE, or CUSTOM. The new fee must be
//   strictly less than what the customer already paid. The original
//   fee (pre-discount) is sourcingFeePaid + discountAmount. The
//   delta between what's been paid and the new fee is recorded as
//   a wallet credit / refund intent in the audit trail.
// ============================================================

const applyDiscountSchema = z.object({
  type: z.enum(['PERCENT', 'FIXED', 'FREE', 'CUSTOM']),
  value: z.number().int().min(0),
  reason: z.string().min(2, 'Pick a reason.'),
  note: z.string().min(5, 'Add a short note for the record.'),
  returnMethod: z.enum(['wallet', 'refund']).default('wallet'),
})

export async function adminApplyPSDiscount(
  requestId: string,
  input: z.infer<typeof applyDiscountSchema>,
) {
  const admin = await requireStaffWithPermission('service.enquiry.manage')
  if (!requestId) return { ok: false, error: 'Request ID required.' } as const

  const parsed = applyDiscountSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid discount.',
    } as const
  }
  const d = parsed.data

  const req = await db.personalShoppingRequest.findUnique({
    where: { id: requestId },
    select: {
      id: true,
      ref: true,
      status: true,
      sourcingFeePaid: true,
      discountAmount: true,
    },
  })
  if (!req) return { ok: false, error: 'Request not found.' } as const
  if (req.status === 'DONE' || req.status === 'CANCELLED') {
    return {
      ok: false,
      error: 'Cannot discount a completed or cancelled request.',
    } as const
  }

  // Pre-discount original fee (so repeated discounts compound from the
  // full fee, not the already-discounted price).
  const originalFee = req.sourcingFeePaid + req.discountAmount
  if (originalFee <= 0) {
    return {
      ok: false,
      error: 'No sourcing fee has been paid on this request yet.',
    } as const
  }

  let newFee: number
  let labelSuffix: string
  if (d.type === 'PERCENT') {
    if (d.value < 1 || d.value > 100) {
      return { ok: false, error: 'Percentage must be 1–100.' } as const
    }
    newFee = Math.round(originalFee * (1 - d.value / 100))
    labelSuffix = `${d.value}% off`
  } else if (d.type === 'FIXED') {
    if (d.value <= 0 || d.value >= originalFee) {
      return {
        ok: false,
        error: `Amount off must be between ₦1 and ₦${(originalFee - 1).toLocaleString()}. Use FREE for a full discount.`,
      } as const
    }
    newFee = originalFee - d.value
    labelSuffix = `₦${d.value.toLocaleString()} off`
  } else if (d.type === 'FREE') {
    newFee = 0
    labelSuffix = 'free sourcing'
  } else {
    // CUSTOM
    if (d.value >= req.sourcingFeePaid) {
      return {
        ok: false,
        error: 'A custom price must be below what the customer has paid.',
      } as const
    }
    newFee = d.value
    labelSuffix = `custom price ₦${d.value.toLocaleString()}`
  }

  // New fee must be strictly less than what's already been paid.
  if (newFee >= req.sourcingFeePaid) {
    return {
      ok: false,
      error: `The new fee (₦${newFee.toLocaleString()}) must be less than what was paid (₦${req.sourcingFeePaid.toLocaleString()}).`,
    } as const
  }

  const refundAmount = Math.max(0, req.sourcingFeePaid - newFee)
  const newDiscountAmount = originalFee - newFee
  const label = `Staff discount: ${d.reason} (${labelSuffix})`

  try {
    await db.personalShoppingRequest.update({
      where: { id: requestId },
      data: {
        sourcingFeePaid: newFee,
        discountLabel: label,
        discountAmount: newDiscountAmount,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not apply discount.' } as const
  }

  const eventNote =
    `${label}. Reason: ${d.reason}. Note: ${d.note}. New sourcing fee ₦${newFee.toLocaleString()}` +
    (refundAmount
      ? `. ₦${refundAmount.toLocaleString()} returned as ${d.returnMethod}.`
      : '.')

  await writePSEvent(requestId, admin.id, 'STAFF', eventNote)
  try {
    await auditLog({
      actorId: admin.id,
      action: 'personal_shopping.apply_discount',
      entityType: 'PersonalShoppingRequest',
      entityId: requestId,
      description: eventNote,
    })
  } catch {}

  revalidatePath('/admin/services/personal-shopping')
  return {
    ok: true,
    newFee,
    refundAmount,
    returnMethod: d.returnMethod,
  } as const
}

// ============================================================
// 10. Service settings — fees, delivery zones, promo codes
// ============================================================

const psFeesSchema = z.object({
  deliveredFee: z.number().int().min(1, 'Delivered fee must be more than ₦0.'),
  inPersonFittingFee: z.number().int().min(1, 'In-person fitting fee must be more than ₦0.'),
  includedMinutes: z.number().int().min(1, 'Included minutes must be at least 1.'),
  extraBlockMinutes: z.number().int().min(1, 'Extra block minutes must be at least 1.'),
  extraBlockFee: z.number().int().min(1, 'Extra block fee must be more than ₦0.'),
})

export async function adminSavePSFees(input: z.infer<typeof psFeesSchema>) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = psFeesSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid fees.' } as const
  }

  try {
    await db.pSServiceSetting.upsert({
      where: { id: 'singleton' },
      create: {
        id: 'singleton',
        deliveredFee: parsed.data.deliveredFee,
        inPersonFittingFee: parsed.data.inPersonFittingFee,
        includedMinutes: parsed.data.includedMinutes,
        extraBlockMinutes: parsed.data.extraBlockMinutes,
        extraBlockFee: parsed.data.extraBlockFee,
      },
      update: {
        deliveredFee: parsed.data.deliveredFee,
        inPersonFittingFee: parsed.data.inPersonFittingFee,
        includedMinutes: parsed.data.includedMinutes,
        extraBlockMinutes: parsed.data.extraBlockMinutes,
        extraBlockFee: parsed.data.extraBlockFee,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not save fees.' } as const
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true } as const
}

const deliveryZoneSchema = z.object({
  zone: z.string().min(1, 'Zone name is required.'),
  fee: z.number().int().min(0, 'Fee cannot be negative.'),
})

const deliveryZonesSchema = z.array(deliveryZoneSchema)

export async function adminSaveDeliveryZones(
  zones: z.infer<typeof deliveryZonesSchema>,
) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = deliveryZonesSchema.safeParse(zones)
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid delivery zones.',
    } as const
  }

  try {
    for (const zItem of parsed.data) {
      await db.pSDeliveryZone.upsert({
        where: { zone: zItem.zone.trim() },
        create: { zone: zItem.zone.trim(), fee: zItem.fee },
        update: { fee: zItem.fee },
      })
    }
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message ?? 'Could not save delivery zones.',
    } as const
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, count: parsed.data.length } as const
}

const psPromoCodeSchema = z.object({
  code: z
    .string()
    .min(4, 'Code must be at least 4 characters.')
    .max(16, 'Code must be at most 16 characters.')
    .regex(/^[A-Z0-9]+$/, 'Code must be 4–16 letters or numbers, no spaces.')
    .transform((s) => s.toUpperCase()),
  type: z.enum(['PERCENT', 'FIXED', 'FREE']),
  value: z.number().int().min(1),
  service: z.enum(['Personal Shopping', 'Both']).default('Both'),
  expiresAt: z.string().optional(), // YYYY-MM-DD or empty
})

export async function adminCreatePSPromoCode(
  input: z.infer<typeof psPromoCodeSchema>,
) {
  await requireStaffWithPermission('service.enquiry.manage')
  const parsed = psPromoCodeSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid promo code.',
    } as const
  }

  if (parsed.data.type === 'PERCENT' && (parsed.data.value < 1 || parsed.data.value > 100)) {
    return { ok: false, error: 'Percentage must be between 1 and 100.' } as const
  }

  let expiresAt: Date | null = null
  if (parsed.data.expiresAt) {
    expiresAt = new Date(parsed.data.expiresAt + 'T00:00:00Z')
    if (Number.isNaN(expiresAt.getTime())) {
      return { ok: false, error: 'Invalid expiry date.' } as const
    }
    if (expiresAt.getTime() < Date.now() - 86400000) {
      return { ok: false, error: 'Expiry date is in the past.' } as const
    }
  }

  const existing = await db.pSPromoCode.findUnique({
    where: { code: parsed.data.code },
  })
  if (existing) {
    return { ok: false, error: 'That code already exists.' } as const
  }

  try {
    await db.pSPromoCode.create({
      data: {
        code: parsed.data.code,
        type: parsed.data.type,
        value: parsed.data.type === 'FREE' ? 100 : parsed.data.value,
        service: parsed.data.service,
        expiresAt,
        active: true,
      },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not create promo code.' } as const
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, code: parsed.data.code } as const
}

export async function adminTogglePSPromoCode(codeId: string) {
  await requireStaffWithPermission('service.enquiry.manage')
  if (!codeId) return { ok: false, error: 'Code ID required.' } as const

  const code = await db.pSPromoCode.findUnique({ where: { id: codeId } })
  if (!code) return { ok: false, error: 'Code not found.' } as const

  try {
    await db.pSPromoCode.update({
      where: { id: codeId },
      data: { active: !code.active },
    })
  } catch (e: any) {
    return { ok: false, error: e?.message ?? 'Could not toggle code.' } as const
  }

  revalidatePath('/admin/services/personal-shopping')
  return { ok: true, active: !code.active } as const
}
