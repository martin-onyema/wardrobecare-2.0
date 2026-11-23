'use server'

/**
 * Sales & Campaign Management — Server Actions.
 *
 * All actions are server-side authorised:
 *   - Merchandiser: create, edit drafts, submit for approval
 *   - Owner (ADMIN): approve, publish, schedule, end, extend, remove products
 *   - Front desk: view only
 *
 * Every status transition writes a SaleEvent row.
 */

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentStaffUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { invalidateSaleCache, effectiveStatus } from '@/lib/pricing'

// ─── Helper: log a sale event ────────────────────────────────────────────────

async function logSaleEvent(saleId: string, text: string, actorId?: string) {
  try {
    await db.saleEvent.create({
      data: { saleId, text, actorId },
    })
  } catch (e: any) {
    console.error('[sale] could not write event:', e?.message)
  }
}

// ─── Create a new sale (draft) ───────────────────────────────────────────────

export async function createSaleAction(input: {
  name: string
  kind: 'CAMPAIGN' | 'CLEARANCE'
  startsAt: string
  endsAt?: string | null
  headline?: string
  subheadline?: string
  announcement?: string
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  if (!input.name.trim()) return { ok: false, error: 'Campaign name is required.' }

  const sale = await db.sale.create({
    data: {
      name: input.name,
      kind: input.kind,
      status: 'DRAFT',
      startsAt: new Date(input.startsAt),
      endsAt: input.endsAt ? new Date(input.endsAt) : input.kind === 'CLEARANCE' ? null : new Date(input.endsAt || input.startsAt),
      headline: input.headline || null,
      subheadline: input.subheadline || null,
      announcement: input.announcement || null,
      createdById: user.id,
    },
  })

  await logSaleEvent(sale.id, `Campaign created as ${input.kind}`, user.id)
  revalidatePath('/admin/sales')
  return { ok: true, id: sale.id }
}

// ─── Save draft (step 1-4 data) ─────────────────────────────────────────────

export async function saveSaleDraftAction(input: {
  saleId: string
  revision: number
  name: string
  kind: 'CAMPAIGN' | 'CLEARANCE'
  startsAt: string
  endsAt?: string | null
  headline?: string
  subheadline?: string
  announcement?: string
  home: boolean
  countdown: boolean
  allowFlawOnHome: boolean
  bundleSavingOnSale: boolean
  blockPromoCodes: boolean
  pins?: string[]
}): Promise<{ ok: true; revision: number } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  const existing = await db.sale.findUnique({ where: { id: input.saleId } })
  if (!existing) return { ok: false, error: 'Campaign not found.' }
  if (existing.status !== 'DRAFT' && existing.status !== 'PENDING') {
    return { ok: false, error: 'Only draft or pending campaigns can be edited.' }
  }

  // Optimistic concurrency check
  if (existing.revision !== input.revision) {
    return { ok: false, error: 'Another user has saved a newer version. Please reload.' }
  }

  await db.sale.update({
    where: { id: input.saleId },
    data: {
      name: input.name,
      kind: input.kind,
      startsAt: new Date(input.startsAt),
      endsAt: input.kind === 'CLEARANCE' ? null : (input.endsAt ? new Date(input.endsAt) : null),
      headline: input.headline || null,
      subheadline: input.subheadline || null,
      announcement: input.announcement || null,
      home: input.home,
      countdown: input.countdown,
      allowFlawOnHome: input.allowFlawOnHome,
      bundleSavingOnSale: input.bundleSavingOnSale,
      blockPromoCodes: input.blockPromoCodes,
      pins: input.pins ? JSON.stringify(input.pins) : null,
      revision: { increment: 1 },
    },
  })

  await logSaleEvent(input.saleId, `Draft saved by ${user.name || user.email}`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  return { ok: true, revision: input.revision + 1 }
}

// ─── Add/update sale items (products + discounts) ────────────────────────────

export async function saveSaleItemsAction(input: {
  saleId: string
  items: Array<{
    productId: string
    pct?: number
    reasonId?: string
    reasonLabel?: string
    note?: string
    flawPhotoUrl?: string
  }>
}): Promise<{ ok: true; count: number } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  const sale = await db.sale.findUnique({ where: { id: input.saleId } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }
  if (sale.status !== 'DRAFT' && sale.status !== 'PENDING') {
    return { ok: false, error: 'Products can only be added to draft or pending campaigns.' }
  }

  // Delete existing items not in the new list
  const productIds = input.items.map((i) => i.productId)
  await db.saleItem.deleteMany({
    where: { saleId: input.saleId, productId: { notIn: productIds } },
  })

  // Upsert each item
  for (const item of input.items) {
    await db.saleItem.upsert({
      where: {
        saleId_productId: { saleId: input.saleId, productId: item.productId },
      },
      create: {
        saleId: input.saleId,
        productId: item.productId,
        pct: item.pct ?? null,
        reasonId: item.reasonId ?? null,
        reason: item.reasonLabel ?? null,
        note: item.note ?? null,
        flawPhotoUrl: item.flawPhotoUrl ?? null,
      },
      update: {
        pct: item.pct ?? null,
        reasonId: item.reasonId ?? null,
        reason: item.reasonLabel ?? null,
        note: item.note ?? null,
        flawPhotoUrl: item.flawPhotoUrl ?? null,
      },
    })
  }

  await logSaleEvent(input.saleId, `Products updated: ${input.items.length} items`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  return { ok: true, count: input.items.length }
}

// ─── Submit for approval ─────────────────────────────────────────────────────

export async function submitSaleAction(saleId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  const sale = await db.sale.findUnique({ where: { id: saleId }, include: { items: true } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }
  if (sale.status !== 'DRAFT') return { ok: false, error: 'Only draft campaigns can be submitted.' }
  if (sale.items.length === 0) return { ok: false, error: 'At least one product is required.' }
  if (!sale.headline) return { ok: false, error: 'Homepage headline is required.' }

  await db.sale.update({ where: { id: saleId }, data: { status: 'PENDING' } })
  await logSaleEvent(saleId, `Submitted for approval by ${user.name || user.email}`, user.id)
  revalidatePath('/admin/sales')
  return { ok: true }
}

// ─── Approve & publish (owner only) ──────────────────────────────────────────

export async function approveSaleAction(saleId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can approve campaigns.' }

  const sale = await db.sale.findUnique({ where: { id: saleId }, include: { items: true } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }
  if (sale.status !== 'PENDING') return { ok: false, error: 'Only pending campaigns can be approved.' }

  const now = new Date()
  const isLive = sale.startsAt <= now
  const newStatus = isLive ? 'LIVE' : 'SCHEDULED'

  await db.sale.update({ where: { id: saleId }, data: { status: newStatus } })
  await logSaleEvent(saleId, `Approved by ${user.name || user.email} → ${newStatus}`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  revalidatePath('/')
  return { ok: true }
}

// ─── Send back (owner → merchandiser with note) ────────────────────────────────

export async function sendBackSaleAction(saleId: string, note: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can send campaigns back.' }

  if (!note.trim()) return { ok: false, error: 'A note explaining why is required.' }

  await db.sale.update({ where: { id: saleId }, data: { status: 'DRAFT', sentBackNote: note } })
  await logSaleEvent(saleId, `Sent back by ${user.name || user.email}: ${note}`, user.id)
  revalidatePath('/admin/sales')
  return { ok: true }
}

// ─── End campaign (owner only) ───────────────────────────────────────────────

export async function endSaleAction(saleId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can end campaigns.' }

  const sale = await db.sale.findUnique({ where: { id: saleId } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }

  await db.sale.update({ where: { id: saleId }, data: { status: 'ENDED', endedAt: new Date() } })
  await logSaleEvent(saleId, `Ended manually by ${user.name || user.email}`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  revalidatePath('/')
  return { ok: true }
}

// ─── Extend campaign (owner only) ────────────────────────────────────────────

export async function extendSaleAction(saleId: string, newEndsAt: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can extend campaigns.' }

  const sale = await db.sale.findUnique({ where: { id: saleId } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }
  if (sale.status !== 'LIVE') return { ok: false, error: 'Only live campaigns can be extended.' }
  if (!sale.endsAt) return { ok: false, error: 'Clearance campaigns have no end date to extend.' }

  const newEnd = new Date(newEndsAt)
  if (newEnd <= sale.endsAt) return { ok: false, error: 'New end date must be later than current.' }

  await db.sale.update({ where: { id: saleId }, data: { endsAt: newEnd } })
  await logSaleEvent(saleId, `Extended to ${newEnd.toISOString()} by ${user.name || user.email}`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  return { ok: true }
}

// ─── Remove product from live campaign (owner only) ───────────────────────────

export async function removeSaleItemAction(saleId: string, productId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can remove products from live campaigns.' }

  const count = await db.saleItem.count({ where: { saleId } })
  if (count <= 1) return { ok: false, error: 'Cannot remove the last product. End the campaign instead.' }

  await db.saleItem.delete({ where: { saleId_productId: { saleId, productId } } })
  await logSaleEvent(saleId, `Product removed by ${user.name || user.email}`, user.id)
  invalidateSaleCache()
  revalidatePath('/admin/sales')
  revalidatePath('/')
  return { ok: true }
}

// ─── Delete sale (draft only) ──────────────────────────────────────────────────

export async function deleteSaleAction(saleId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')

  const sale = await db.sale.findUnique({ where: { id: saleId } })
  if (!sale) return { ok: false, error: 'Campaign not found.' }
  if (sale.status !== 'DRAFT') return { ok: false, error: 'Only draft campaigns can be deleted.' }

  await db.sale.delete({ where: { id: saleId } })
  revalidatePath('/admin/sales')
  return { ok: true }
}

// ─── Get deal settings ────────────────────────────────────────────────────────

export async function getDealSettings() {
  const existing = await db.dealSettings.findFirst()
  if (existing) return existing
  return db.dealSettings.create({ data: {} })
}

// ─── Update deal settings (owner only) ──────────────────────────────────────────

export async function updateDealSettingsAction(input: {
  roundTo: number
  minPercent: number
  maxPercent: number
  ownerOnlyAbove: number
  homeMinItems: number
  homeMaxCards: number
  countdownHours: number
  urgentHours: number
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getCurrentStaffUser()
  if (!user) redirect('/admin/login')
  if (user.role !== 'ADMIN') return { ok: false, error: 'Only the owner can edit deal settings.' }

  const existing = await db.dealSettings.findFirst()
  if (existing) {
    await db.dealSettings.update({ where: { id: existing.id }, data: input })
  } else {
    await db.dealSettings.create({ data: input })
  }

  invalidateSaleCache()
  revalidatePath('/admin/sales')
  return { ok: true }
}

// ─── Seed default deal reasons ─────────────────────────────────────────────────

export async function seedDealReasons() {
  const count = await db.dealReason.count()
  if (count > 0) return

  const reasons = [
    { label: 'Old Stock', type: 'INFO' as const, returnRule: 'STANDARD' as const, defaultText: 'This piece is from a previous season.' },
    { label: 'Older Design', type: 'INFO' as const, returnRule: 'STANDARD' as const, defaultText: 'An earlier design from our collection.' },
    { label: 'Discontinued Style', type: 'INFO' as const, returnRule: 'STANDARD' as const, defaultText: 'This style is no longer being produced.' },
    { label: 'Minor Flaw', type: 'MINOR_FLAW' as const, returnRule: 'FLAW_DISCLOSED' as const, defaultText: 'This item has a minor flaw. See description.' },
    { label: 'Final Clearance', type: 'FINAL_CLEARANCE' as const, returnRule: 'FINAL_SALE' as const, defaultText: 'Final clearance — no exchanges.' },
  ]

  for (const r of reasons) {
    await db.dealReason.create({ data: r })
  }
}
