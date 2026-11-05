'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  Search,
  Printer,
  ArrowRight,
  Package,
  Truck,
  CreditCard,
  User,
  MapPin,
  StickyNote,
  History,
  ChevronDown,
  Image as ImageIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OrderStatusBadge } from '@/components/admin/order-status-badge'
import { OrderStaffNotes } from '@/components/admin/orders/order-staff-notes'
import { colorToCss, isKnownColor } from '@/lib/order-colors'
import { formatNGN, formatDate } from '@/lib/format'
import { adminUpdateOrderStatus } from '@/actions/store'
import type {
  ConsoleOrder,
} from '@/app/admin/orders/console/page'

// ────────────────────────────────────────────────────────────────────
// Status definitions — map the existing Prisma OrderStatus enum to the
// 5-step stepper shown in the mockup. The DB has 11 values; we surface
// the 5 user-facing ones in the stepper plus a separate "HOLD" category
// for CANCELLED/REFUNDED. No new enum values are introduced.
// ────────────────────────────────────────────────────────────────────
type StepKey = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'

const STEPS: { key: StepKey; label: string }[] = [
  { key: 'PENDING', label: 'Pending payment' },
  { key: 'PAID', label: 'Paid' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'SHIPPED', label: 'Out for delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
]

// Which step is "current" for a given status?
function currentStep(status: string): number {
  switch (status) {
    case 'PENDING':
    case 'CONFIRMED':
      return 0
    case 'PAID':
      return 1
    case 'PROCESSING':
    case 'PACKED':
    case 'READY_FOR_DISPATCH':
      return 2
    case 'SHIPPED':
      return 3
    case 'DELIVERED':
      return 4
    default: // CANCELLED, REFUNDED, PARTIALLY_REFUNDED → no step active
      return -1
  }
}

const FILTER_CHIPS = [
  'All',
  'Pending payment',
  'Paid',
  'Processing',
  'Out for delivery',
  'Delivered',
  'Cancelled',
  'Needs action',
] as const

function matchesFilter(o: ConsoleOrder, filter: string): boolean {
  switch (filter) {
    case 'All':
      return true
    case 'Pending payment':
      return o.status === 'PENDING'
    case 'Paid':
      return o.status === 'PAID'
    case 'Processing':
      return ['PROCESSING', 'PACKED', 'READY_FOR_DISPATCH', 'CONFIRMED'].includes(o.status)
    case 'Out for delivery':
      return o.status === 'SHIPPED'
    case 'Delivered':
      return o.status === 'DELIVERED'
    case 'Cancelled':
      return ['CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED'].includes(o.status)
    case 'Needs action':
      // PENDING orders that haven't moved past the first step
      return o.status === 'PENDING'
    default:
      return true
  }
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'PACKED', label: 'Packed' },
  { value: 'READY_FOR_DISPATCH', label: 'Ready for dispatch' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
]

// ────────────────────────────────────────────────────────────────────
// Main console — left list (340px), right detail panel.
// ────────────────────────────────────────────────────────────────────
export function OrderConsole({
  orders,
  focusId,
}: {
  orders: ConsoleOrder[]
  focusId?: string
}) {
  const router = useRouter()
  const [filter, setFilter] = useState<(typeof FILTER_CHIPS)[number]>('All')
  const [query, setQuery] = useState('')
  const [userSelectedId, setUserSelectedId] = useState<string | null>(null)
  // If the URL has ?id= and it matches an order, prefer it (URL wins).
  // Otherwise fall back to the user's last manual selection, then the
  // first order. Computed during render — no setState-in-effect.
  const focusMatch = focusId && orders.some((o) => o.id === focusId) ? focusId : null
  const selectedId = focusMatch ?? userSelectedId ?? orders[0]?.id ?? null

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((o) => {
      if (!matchesFilter(o, filter)) return false
      if (!q) return true
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q)
      )
    })
  }, [orders, filter, query])

  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId) ?? null,
    [orders, selectedId],
  )

  return (
    <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
      {/* Left list — 340px, sticky, scrollable */}
      <aside className="w-[340px] shrink-0 flex flex-col gap-3 sticky top-32 self-start max-h-[calc(100vh-9rem)]">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={
                'text-[11px] uppercase tracking-[0.04em] px-2.5 py-1 rounded-full border transition-colors ' +
                (filter === chip
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/40')
              }
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order #, name, phone"
            className="pl-8"
          />
        </div>

        {/* Order rows */}
        <div className="flex-1 overflow-y-auto border border-border bg-card -mx-1 px-1 rounded-md">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No orders match.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((o) => {
                const isSelected = o.id === selectedId
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setUserSelectedId(o.id)}
                      className={
                        'w-full text-left p-3.5 transition-colors ' +
                        (isSelected
                          ? 'bg-secondary/60 border-l-2 border-l-foreground'
                          : 'hover:bg-secondary/40 border-l-2 border-l-transparent')
                      }
                    >
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-[13px] font-medium tabular-nums">{o.orderNumber}</span>
                        <span className="text-[12px] tabular-nums text-foreground/80">
                          {formatNGN(o.total)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2 mt-1">
                        <span className="text-[11px] text-muted-foreground truncate">
                          {o.customerName} · {o.city}
                        </span>
                        <OrderStatusBadge status={o.status} />
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Right detail panel */}
      <section className="flex-1 min-w-0">
        {!selected ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Select an order from the list to see details.
            </CardContent>
          </Card>
        ) : (
          <OrderDetailPanel order={selected} onStatusChange={() => router.refresh()} />
        )}
      </section>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Detail panel — stepper + info boxes + items table + totals + print panel
// + staff notes + status history.
// ────────────────────────────────────────────────────────────────────
function OrderDetailPanel({
  order,
  onStatusChange,
}: {
  order: ConsoleOrder
  onStatusChange: () => void
}) {
  const router = useRouter()
  const [saving, startSave] = useTransition()
  const [status, setStatus] = useState(order.status)
  const [statusNote, setStatusNote] = useState('')
  // Reset local status when the order changes (React 19 "adjust state
  // during render" pattern — keeps the lint rule happy without an effect
  // that triggers cascading renders).
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [prevOrderId, setPrevOrderId] = useState(order.id)
  if (order.id !== prevOrderId) {
    setPrevOrderId(order.id)
    setStatus(order.status)
    setStatusNote('')
  }

  // Print panel state — ephemeral (no persistence; matches the mockup)
  const [copies, setCopies] = useState({ file: true, ship: true, cust: true })
  const [includeImages, setIncludeImages] = useState(true)

  const step = currentStep(order.status)

  function saveStatus() {
    if (status === order.status && !statusNote.trim()) return
    startSave(async () => {
      const r = await adminUpdateOrderStatus(order.id, status, statusNote.trim() || undefined)
      if (r.ok) {
        toast.success(`Order ${order.orderNumber} updated`)
        setStatusNote('')
        onStatusChange()
        router.refresh()
      } else {
        toast.error(r.error ?? 'Could not update order')
      }
    })
  }

  const payment = order.payments[0]
  const areaLabel = [order.city, order.state].filter(Boolean).join(', ')

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl tracking-[-0.02em]">
            Order {order.orderNumber}
          </h2>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
            <span>{formatDate(order.createdAt)}</span>
            <span className="text-foreground/30">·</span>
            <OrderStatusBadge status={order.status} />
            <span className="text-foreground/30">·</span>
            <span className="uppercase tracking-[0.04em]">{order.paymentStatus}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/orders/${order.id}`} target="_blank">
            <Button variant="outline" size="sm">Classic view</Button>
          </Link>
        </div>
      </div>

      {/* Horizontal stepper */}
      <div className="flex gap-1">
        {STEPS.map((s, i) => {
          const done = step > i
          const now = step === i
          return (
            <div
              key={s.key}
              className={
                'flex-1 text-center py-2 border-t-2 text-[11px] uppercase tracking-[0.04em] ' +
                (done
                  ? 'border-foreground text-foreground font-medium'
                  : now
                    ? 'border-rust text-rust font-medium'
                    : 'border-border text-muted-foreground')
              }
            >
              {s.label}
            </div>
          )
        })}
      </div>

      {/* Info boxes: Customer / Delivery / Payment */}
      <div className="grid sm:grid-cols-3 gap-4">
        <InfoCard icon={<User className="size-4" />} title="Customer">
          <div className="font-medium">{order.customerName}</div>
          <div className="text-sm">{order.phone}</div>
          <div className="text-sm text-muted-foreground">{order.email}</div>
          {order.whatsappNumber && (
            <div className="text-sm text-muted-foreground">WhatsApp: {order.whatsappNumber}</div>
          )}
        </InfoCard>

        <InfoCard icon={<MapPin className="size-4" />} title="Delivery">
          <div className="font-medium">{areaLabel}</div>
          <div className="text-sm">{order.address}</div>
          {order.deliveryInstructions && (
            <div className="text-sm text-muted-foreground mt-1 italic">
              “{order.deliveryInstructions}”
            </div>
          )}
          {order.trackingNumber && (
            <div className="text-sm mt-2 pt-2 border-t border-border">
              Tracking: <span className="tabular-nums">{order.trackingNumber}</span>
              {order.carrier && <span className="text-muted-foreground"> · {order.carrier}</span>}
            </div>
          )}
        </InfoCard>

        <InfoCard icon={<CreditCard className="size-4" />} title="Payment">
          <div className="font-medium">
            {formatPaymentMethod(order.paymentMethod)}
          </div>
          <div className="text-sm uppercase tracking-[0.04em] text-muted-foreground">
            {order.paymentStatus}
          </div>
          {payment && (
            <div className="text-sm mt-1 pt-1 border-t border-border">
              <div className="text-muted-foreground">Ref: <span className="font-mono">{payment.reference}</span></div>
              {payment.paidAt && (
                <div className="text-muted-foreground">Paid: {formatDate(payment.paidAt)}</div>
              )}
            </div>
          )}
          {order.couponCode && (
            <div className="text-sm mt-1 text-muted-foreground">Coupon: {order.couponCode}</div>
          )}
        </InfoCard>
      </div>

      {/* Customer note (if any) */}
      {order.notes && (
        <Card>
          <CardContent className="p-4 bg-secondary/30">
            <div className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-1">
              Customer note
            </div>
            <p className="text-sm whitespace-pre-wrap">{order.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Items table */}
      <Card>
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Package className="size-4" />
            Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-[10px] uppercase tracking-[0.06em] text-muted-foreground px-4 py-2 w-16">
                  Photo
                </th>
                <th className="text-left text-[10px] uppercase tracking-[0.06em] text-muted-foreground px-2 py-2">
                  Product
                </th>
                <th className="text-right text-[10px] uppercase tracking-[0.06em] text-muted-foreground px-2 py-2">
                  Price
                </th>
                <th className="text-right text-[10px] uppercase tracking-[0.06em] text-muted-foreground px-2 py-2 w-16">
                  Qty
                </th>
                <th className="text-right text-[10px] uppercase tracking-[0.06em] text-muted-foreground px-4 py-2">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it) => (
                <tr key={it.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative size-12 rounded-md overflow-hidden bg-secondary border border-border">
                      {it.productImage ? (
                        <Image
                          src={it.productImage}
                          alt={it.productName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[10px] text-muted-foreground">
                          No img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <Link
                      href={`/product/${it.productSlug}`}
                      target="_blank"
                      className="font-medium hover:underline underline-offset-2"
                    >
                      {it.productName}
                    </Link>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      {isKnownColor(it.color) && (
                        <span
                          className="inline-block size-2.5 rounded-full border border-foreground/20 shrink-0"
                          style={{ background: colorToCss(it.color) }}
                          title={it.color ?? ''}
                        />
                      )}
                      {[it.color, it.size].filter(Boolean).join(' · ')}
                    </div>
                    {it.sku && (
                      <div className="text-[10px] font-mono text-muted-foreground/80 mt-0.5">
                        SKU {it.sku}
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-3 text-right tabular-nums">
                    {formatNGN(it.unitPrice)}
                  </td>
                  <td className="px-2 py-3 text-right tabular-nums">× {it.quantity}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">
                    {formatNGN(it.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-72 text-sm">
          <div className="flex justify-between px-3 py-1.5">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatNGN(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between px-3 py-1.5">
              <span className="text-muted-foreground">Discount</span>
              <span className="tabular-nums">−{formatNGN(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between px-3 py-1.5">
            <span className="text-muted-foreground">Delivery ({areaLabel})</span>
            <span className="tabular-nums">{formatNGN(order.deliveryFee)}</span>
          </div>
          {order.tax > 0 && (
            <div className="flex justify-between px-3 py-1.5">
              <span className="text-muted-foreground">Tax</span>
              <span className="tabular-nums">{formatNGN(order.tax)}</span>
            </div>
          )}
          <div className="flex justify-between px-3 py-2 border-t-2 border-foreground font-medium text-base">
            <span>Total</span>
            <span className="tabular-nums">{formatNGN(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Status update bar */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
              Set status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
              Status note (optional)
            </label>
            <Input
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="e.g. Customer called to confirm"
            />
          </div>
          <Button
            type="button"
            onClick={saveStatus}
            disabled={saving || (status === order.status && !statusNote.trim())}
          >
            {saving ? 'Saving…' : 'Save status'}
          </Button>
        </CardContent>
      </Card>

      {/* Print panel */}
      <PrintPanel
        order={order}
        copies={copies}
        setCopies={setCopies}
        includeImages={includeImages}
        setIncludeImages={setIncludeImages}
      />

      {/* Staff notes */}
      <Card>
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <StickyNote className="size-4" />
            Staff notes &amp; activity
          </CardTitle>
          <CardDescription>
            Internal notes only visible to staff. Pinned notes appear at the top.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <OrderStaffNotes orderId={order.id} notes={order.orderNotes} />
        </CardContent>
      </Card>

      {/* Status history */}
      <Card>
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <History className="size-4" />
            Status history
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          {order.statusHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No history yet.</p>
          ) : (
            <ol className="relative pl-5 border-l border-border">
              {[...order.statusHistory].reverse().map((h) => (
                <li key={h.id} className="mb-3 relative">
                  <span className="absolute -left-[1.42rem] top-1.5 size-2 rounded-full bg-foreground" />
                  <div className="text-sm">
                    <span className="font-medium uppercase tracking-[0.04em]">{h.status.replace(/_/g, ' ')}</span>
                    {h.note && <span className="text-muted-foreground"> — {h.note}</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{formatDate(h.createdAt)}</div>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Print panel — 3 checkboxes (File / Shipping / Customer copy) +
// Include images toggle + Print button. Builds a print URL and opens it
// in a new tab; the print route renders the selected A4 sheets with a
// @media print stylesheet.
// ────────────────────────────────────────────────────────────────────
function PrintPanel({
  order,
  copies,
  setCopies,
  includeImages,
  setIncludeImages,
}: {
  order: ConsoleOrder
  copies: { file: boolean; ship: boolean; cust: boolean }
  setCopies: (v: { file: boolean; ship: boolean; cust: boolean }) => void
  includeImages: boolean
  setIncludeImages: (v: boolean) => void
}) {
  const selectedCount =
    (copies.file ? 1 : 0) + (copies.ship ? 1 : 0) + (copies.cust ? 1 : 0)

  function buildPrintUrl() {
    const params = new URLSearchParams()
    if (copies.file) params.set('file', '1')
    if (copies.ship) params.set('ship', '1')
    if (copies.cust) params.set('cust', '1')
    if (includeImages) params.set('imgs', '1')
    return `/admin/orders/console/print?id=${order.id}&${params.toString()}`
  }

  function handlePrint() {
    if (selectedCount === 0) {
      toast.error('Select at least one copy to print')
      return
    }
    window.open(buildPrintUrl(), '_blank')
  }

  function selectAll() {
    setCopies({ file: true, ship: true, cust: true })
  }

  const COPY_DESCRIPTIONS = [
    {
      key: 'file' as const,
      title: 'File copy',
      desc: 'Internal record — payment ref, staff notes, full item list with prices, sign-off line.',
    },
    {
      key: 'ship' as const,
      title: 'Shipping copy',
      desc: 'Packing list + delivery slip — address, phone, items & sizes, amount to collect on COD. No prices.',
    },
    {
      key: 'cust' as const,
      title: 'Customer copy',
      desc: 'Receipt — items, prices, discounts, delivery, total, exchange policy.',
    },
  ]

  return (
    <Card className="border-2 border-foreground/30">
      <CardHeader className="border-b border-border pb-3 bg-foreground text-background rounded-t-md">
        <CardTitle className="font-display text-base flex items-center gap-2">
          <Printer className="size-4" />
          Print order
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="grid sm:grid-cols-3 gap-2.5">
          {COPY_DESCRIPTIONS.map((c) => (
            <label
              key={c.key}
              className={
                'flex flex-col gap-1 p-3 border rounded-md cursor-pointer transition-all ' +
                (copies[c.key]
                  ? 'border-foreground bg-secondary/30 shadow-[0_0_0_1px_var(--foreground)]'
                  : 'border-border hover:border-foreground/40')
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{c.title}</span>
                <Checkbox
                  checked={copies[c.key]}
                  onCheckedChange={(v) =>
                    setCopies({ ...copies, [c.key]: v === true })
                  }
                />
              </div>
              <span className="text-[11px] text-muted-foreground leading-snug">{c.desc}</span>
            </label>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={includeImages}
            onCheckedChange={(v) => setIncludeImages(v === true)}
          />
          <ImageIcon className="size-3.5 text-muted-foreground" />
          Include product images
        </label>

        <div className="flex gap-2">
          <Button type="button" onClick={handlePrint} disabled={selectedCount === 0}>
            <Printer className="size-4" />
            Print {selectedCount} cop{selectedCount === 1 ? 'y' : 'ies'}
          </Button>
          <Button type="button" variant="outline" onClick={selectAll}>
            Select all 3
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground">
          Opens a print-ready page in a new tab. Use your browser&apos;s print dialog (Ctrl/Cmd+P) and choose A4 portrait. Each copy prints on its own page.
        </p>
      </CardContent>
    </Card>
  )
}

// ────────────────────────────────────────────────────────────────────
// Small helpers
// ────────────────────────────────────────────────────────────────────
function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-2 pt-3">
        <CardTitle className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground flex items-center gap-1.5 font-normal">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm flex flex-col gap-0.5">{children}</CardContent>
    </Card>
  )
}

function formatPaymentMethod(m: string): string {
  switch (m) {
    case 'PAYSTACK': return 'Paid online (Paystack)'
    case 'WHATSAPP': return 'WhatsApp checkout'
    case 'BANK_TRANSFER': return 'Bank transfer'
    case 'CASH_ON_DELIVERY': return 'Cash on Delivery'
    case 'CARD': return 'Card'
    default: return m.replace(/_/g, ' ').toLowerCase()
  }
}
