'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { requireStaffWithPermission } from '@/lib/permissions'
import { auditLog } from '@/lib/audit'

// ────────────────────────────────────────────────────────────────────
// Order staff-notes timeline.
//
// Pattern cloned from adminCreateCustomerNote / adminDeleteCustomerNote
// (src/actions/admin.ts lines 1541–1578). Same auth gate convention
// (`requireStaffWithPermission`), same audit-log shape.
// ────────────────────────────────────────────────────────────────────

/**
 * Create an internal staff note on an order.
 * Requires `order.update_status` permission — same gate used for the
 * existing `adminUpdateOrderStatus` action.
 */
export async function adminCreateOrderNote(orderId: string, body: string, pinned: boolean = false) {
  const user = await requireStaffWithPermission('order.update_status')
  try {
    const note = await db.orderNote.create({
      data: {
        orderId,
        authorId: user.id,
        body,
        pinned,
      },
    })

    const order = await db.order.findUnique({
      where: { id: orderId },
      select: { orderNumber: true },
    })

    await auditLog({
      actorId: user.id,
      action: 'order.note',
      entityType: 'OrderNote',
      entityId: note.id,
      after: { orderId, body: body.slice(0, 80), pinned },
      description: `Added note to order ${order?.orderNumber ?? orderId}`,
    })

    revalidatePath('/admin/orders')
    revalidatePath('/admin/orders/console')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath(`/admin/orders/console/${orderId}`)
    return { ok: true, id: note.id }
  } catch (e: any) {
    return { ok: false, error: e?.message }
  }
}

/**
 * Delete an order note. Same permission gate as create.
 */
export async function adminDeleteOrderNote(id: string) {
  await requireStaffWithPermission('order.update_status')
  try {
    const note = await db.orderNote.findUnique({ where: { id } })
    if (!note) return { ok: false, error: 'Note not found' }
    await db.orderNote.delete({ where: { id } })

    await auditLog({
      actorId: note.authorId,
      action: 'order.note.delete',
      entityType: 'OrderNote',
      entityId: id,
      description: `Deleted note from order ${note.orderId}`,
    })

    revalidatePath('/admin/orders')
    revalidatePath('/admin/orders/console')
    revalidatePath(`/admin/orders/${note.orderId}`)
    revalidatePath(`/admin/orders/console/${note.orderId}`)
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message }
  }
}
