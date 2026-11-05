import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { formatNGN, formatDate, formatDateShort } from '@/lib/format'
import { AdminLayout } from '@/components/admin/admin-layout'
import { AdminSearchTrigger } from '@/components/admin/admin-search-trigger'
import { AdminHeaderToolbar } from '@/components/admin/admin-header-toolbar'
import { OrderConsole } from '@/components/admin/orders/order-console'
import { isKnownColor } from '@/lib/order-colors'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Order Console',
  robots: { index: false, follow: false },
}

// ────────────────────────────────────────────────────────────────────
// Types — everything the client console needs, fully serialised so it
// can cross the RSC boundary. Mirrors the pattern used by /admin/orders
// (src/app/admin/orders/page.tsx).
// ────────────────────────────────────────────────────────────────────
export type ConsoleItem = {
  id: string
  productName: string
  productSlug: string
  productImage: string | null
  size: string | null
  color: string | null
  sku: string | null
  unitPrice: number
  quantity: number
  totalPrice: number
}

export type ConsoleStatusEntry = {
  id: string
  status: string
  note: string | null
  createdAt: string
}

export type ConsolePayment = {
  id: string
  provider: string
  reference: string
  amount: number
  status: string
  verified: boolean
  paidAt: string | null
}

export type ConsoleNote = {
  id: string
  body: string
  pinned: boolean
  authorName: string
  createdAt: string
}

export type ConsoleOrder = {
  id: string
  orderNumber: string
  customerName: string
  email: string
  phone: string
  whatsappNumber: string | null
  state: string
  city: string
  address: string
  deliveryInstructions: string | null
  subtotal: number
  deliveryFee: number
  discount: number
  tax: number
  total: number
  status: string
  paymentStatus: string
  paymentMethod: string
  couponCode: string | null
  trackingNumber: string | null
  trackingUrl: string | null
  carrier: string | null
  shippedAt: string | null
  deliveredAt: string | null
  cancelledAt: string | null
  internalNotes: string | null
  notes: string | null
  tags: string | null
  createdAt: string
  items: ConsoleItem[]
  statusHistory: ConsoleStatusEntry[]
  payments: ConsolePayment[]
  orderNotes: ConsoleNote[]
  hasKnownColor: boolean
}

// ────────────────────────────────────────────────────────────────────
// Page — loads every real order with its snapshot data + relations.
// ────────────────────────────────────────────────────────────────────
export default async function AdminOrderConsolePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const admin = await requireAdmin()
  const perms = await getMyPermissionCodes()
  const { id: focusId } = await searchParams

  const myNotifications = await db.notification.findMany({
    where: { recipientId: admin.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { id: true, type: true, title: true, body: true, link: true, read: true, createdAt: true },
  })
  const notifs = myNotifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))

  // Pull the 200 most recent orders — same as /admin/orders. Real data only,
  // no mocks. Items + statusHistory + payments + orderNotes all eager-loaded
  // so the console can render any order without a round-trip.
  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: 'asc' } },
      payments: { orderBy: { createdAt: 'desc' } },
      orderNotes: {
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } },
      },
    },
    take: 200,
  })

  // Detect if any item has a known color name — used to decide whether to
  // render the swatch column at all (cheap perf win, also tells the print
  // panel whether the "Include images" toggle will show swatches).
  const serializedOrders: ConsoleOrder[] = orders.map((o) => {
    const hasKnownColor = o.items.some((it) => isKnownColor(it.color))
    return {
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      email: o.email,
      phone: o.phone,
      whatsappNumber: o.whatsappNumber,
      state: o.state,
      city: o.city,
      address: o.address,
      deliveryInstructions: o.deliveryInstructions,
      subtotal: o.subtotal,
      deliveryFee: o.deliveryFee,
      discount: o.discount,
      tax: o.tax,
      total: o.total,
      status: o.status,
      paymentStatus: o.paymentStatus,
      paymentMethod: o.paymentMethod,
      couponCode: o.couponCode,
      trackingNumber: o.trackingNumber,
      trackingUrl: o.trackingUrl,
      carrier: o.carrier,
      shippedAt: o.shippedAt?.toISOString() ?? null,
      deliveredAt: o.deliveredAt?.toISOString() ?? null,
      cancelledAt: o.cancelledAt?.toISOString() ?? null,
      internalNotes: o.internalNotes,
      notes: o.notes,
      tags: o.tags,
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((it) => ({
        id: it.id,
        productName: it.productName,
        productSlug: it.productSlug,
        productImage: it.productImage,
        size: it.size,
        color: it.color,
        sku: it.sku,
        unitPrice: it.unitPrice,
        quantity: it.quantity,
        totalPrice: it.totalPrice,
      })),
      statusHistory: o.statusHistory.map((h) => ({
        id: h.id,
        status: h.status,
        note: h.note,
        createdAt: h.createdAt.toISOString(),
      })),
      payments: o.payments.map((p) => ({
        id: p.id,
        provider: p.provider,
        reference: p.reference,
        amount: p.amount,
        status: p.status,
        verified: p.verified,
        paidAt: p.paidAt?.toISOString() ?? null,
      })),
      orderNotes: o.orderNotes.map((n) => ({
        id: n.id,
        body: n.body,
        pinned: n.pinned,
        authorName: n.author.name ?? 'Staff',
        createdAt: n.createdAt.toISOString(),
      })),
      hasKnownColor,
    }
  })

  return (
    <AdminLayout
      title="Order Console"
      description={`${serializedOrders.length} order${serializedOrders.length === 1 ? '' : 's'} · split list + detail + printing`}
      permissions={perms}
      headerExtras={
        <div className="flex items-center gap-1">
          <AdminSearchTrigger />
          <AdminHeaderToolbar notifications={notifs} />
        </div>
      }
    >
      {/* Mobile fallback: the console is desktop-first because of the 340px split.
          On small screens, link users back to the existing table view. */}
      <div className="lg:hidden p-6 text-center bg-secondary/40 border border-border rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">
          The split order console needs a wider screen.
        </p>
        <Link
          href="/admin/orders"
          className="text-sm underline underline-offset-4 hover:text-foreground"
        >
          Open the classic order table →
        </Link>
      </div>

      <div className="hidden lg:block">
        <OrderConsole orders={serializedOrders} focusId={focusId} />
      </div>
    </AdminLayout>
  )
}
