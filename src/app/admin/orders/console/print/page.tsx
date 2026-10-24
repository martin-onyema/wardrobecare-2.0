import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { db } from '@/lib/db'
import { formatNGN, formatDate } from '@/lib/format'
import { colorToCss, isKnownColor } from '@/lib/order-colors'
import { notFound } from 'next/navigation'
import { PrintToolbar } from '@/components/admin/orders/print-toolbar'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Print Order',
  robots: { index: false, follow: false },
}

// ────────────────────────────────────────────────────────────────────
// Print route — server-rendered, fully styled for A4 portrait print.
// The page is opened in a new tab by the OrderConsole print panel. The
// URL carries the order id + which copies to render + whether to show
// product images. Print CSS lives at the bottom of this file in a
// <style> block scoped to .print-root.
// ────────────────────────────────────────────────────────────────────

type SearchParams = {
  id?: string
  file?: string
  ship?: string
  cust?: string
  imgs?: string
}

export default async function PrintOrderPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  await requireAdmin()
  const { id, file, ship, cust, imgs } = await searchParams
  if (!id) notFound()

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: true,
      payments: { orderBy: { createdAt: 'desc' }, take: 1 },
      orderNotes: {
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } },
      },
      statusHistory: { orderBy: { createdAt: 'asc' } },
    },
  })
  if (!order) notFound()

  const copies = {
    file: file === '1',
    ship: ship === '1',
    cust: cust === '1',
  }
  const includeImages = imgs === '1'

  if (!copies.file && !copies.ship && !copies.cust) {
    notFound()
  }

  const payment = order.payments[0]
  const areaLabel = [order.city, order.state].filter(Boolean).join(', ')
  const subtotal = order.items.reduce((s, it) => s + it.totalPrice, 0)
  const isCod = order.paymentMethod === 'CASH_ON_DELIVERY'
  const codAmount = order.total

  return (
    <div className="print-root bg-white text-black min-h-screen">
      <PrintToolbar
        orderNumber={order.orderNumber}
        copiesLabel={[
          copies.file && 'File',
          copies.ship && 'Shipping',
          copies.cust && 'Customer',
        ].filter(Boolean).join(' · ')}
      />

      <div className="p-4 print:p-0">
        {copies.file && (
          <PrintSheet kind="file">
            <FileCopySheet
              order={order}
              items={order.items}
              payment={payment}
              notes={order.orderNotes}
              areaLabel={areaLabel}
              subtotal={subtotal}
              includeImages={includeImages}
            />
          </PrintSheet>
        )}

        {copies.ship && (
          <PrintSheet kind="ship">
            <ShippingCopySheet
              order={order}
              items={order.items}
              areaLabel={areaLabel}
              includeImages={includeImages}
              isCod={isCod}
              codAmount={codAmount}
            />
          </PrintSheet>
        )}

        {copies.cust && (
          <PrintSheet kind="cust">
            <CustomerCopySheet
              order={order}
              items={order.items}
              payment={payment}
              areaLabel={areaLabel}
              subtotal={subtotal}
              includeImages={includeImages}
            />
          </PrintSheet>
        )}
      </div>

      {/* Print stylesheet — scoped to .print-root so it never leaks to
          the rest of the admin UI */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Sheet wrapper — provides page-break-after between copies
// ────────────────────────────────────────────────────────────────────
function PrintSheet({
  kind,
  children,
}: {
  kind: 'file' | 'ship' | 'cust'
  children: React.ReactNode
}) {
  return (
    <div data-print-sheet={kind} className="sheet">
      {children}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// File copy — internal record
// ────────────────────────────────────────────────────────────────────
function FileCopySheet({
  order,
  items,
  payment,
  notes,
  areaLabel,
  subtotal,
  includeImages,
}: {
  order: any
  items: any[]
  payment: any
  notes: any[]
  areaLabel: string
  subtotal: number
  includeImages: boolean
}) {
  return (
    <div className="sheet-body">
      <SheetHead title="FILE COPY" sub={`Order ${order.orderNumber} · ${formatDate(order.createdAt)}`} />

      <div className="sheet-three">
        <SheetBox title="Customer">
          <strong>{order.customerName}</strong><br />
          {order.phone}<br />
          {order.email}
          {order.whatsappNumber && <><br />WhatsApp: {order.whatsappNumber}</>}
        </SheetBox>
        <SheetBox title="Delivery">
          {areaLabel}<br />
          {order.address}
          {order.deliveryInstructions && <><br /><em>“{order.deliveryInstructions}”</em></>}
        </SheetBox>
        <SheetBox title="Payment">
          {formatPaymentMethod(order.paymentMethod)}<br />
          Ref: <span className="mono">{payment?.reference ?? '—'}</span><br />
          Status: <span className="uppercase">{order.paymentStatus}</span>
        </SheetBox>
      </div>

      <SheetTable
        items={items}
        includeImages={includeImages}
        columns={['unit', 'qty', 'total']}
      />

      <div className="sheet-totals">
        <div><span>Subtotal</span><span className="mono">{formatNGN(subtotal)}</span></div>
        {order.discount > 0 && (
          <div><span>Discount</span><span className="mono">−{formatNGN(order.discount)}</span></div>
        )}
        <div><span>Delivery</span><span className="mono">{formatNGN(order.deliveryFee)}</span></div>
        <div className="grand"><span>Total</span><span className="mono">{formatNGN(order.total)}</span></div>
      </div>

      {order.notes && (
        <div className="mt-3">
          <strong>Customer note:</strong> {order.notes}
        </div>
      )}

      <div className="mt-3">
        <strong>Staff notes:</strong>
        {notes.length === 0 ? (
          <div className="text-muted">—</div>
        ) : (
          <ul className="staff-notes">
            {notes.map((n) => (
              <li key={n.id}>
                <span className="text-muted">[{formatDate(n.createdAt)}]</span>{' '}
                <strong>{n.author.name ?? 'Staff'}</strong>: {n.body}
                {n.pinned && <em className="text-muted"> · pinned</em>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sign-row">
        <div>Prepared by</div>
        <div>Checked by</div>
        <div>Date</div>
      </div>

      <div className="sheet-foot">
        Internal record — keep on file. Exchanges only, no cash refunds. Do not hand to customer.
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Shipping copy — packing list + delivery slip
// ────────────────────────────────────────────────────────────────────
function ShippingCopySheet({
  order,
  items,
  areaLabel,
  includeImages,
  isCod,
  codAmount,
}: {
  order: any
  items: any[]
  areaLabel: string
  includeImages: boolean
  isCod: boolean
  codAmount: number
}) {
  return (
    <div className="sheet-body">
      <SheetHead title="SHIPPING COPY" sub={`Order ${order.orderNumber} · Packing list & delivery slip`} />

      <div className="sheet-three">
        <SheetBox title="DELIVER TO">
          <strong className="text-lg">{order.customerName}</strong><br />
          {order.address}<br />
          {areaLabel}<br />
          <strong>{order.phone}</strong>
        </SheetBox>
        <SheetBox title="Zone &amp; window">
          {areaLabel}<br />
          Placed: {formatDate(order.createdAt)}<br />
          {order.trackingNumber && <>Tracking: <span className="mono">{order.trackingNumber}</span></>}
        </SheetBox>
      </div>

      {isCod && (
        <div className="cod-box">
          COLLECT ON DELIVERY: {formatNGN(codAmount)}
        </div>
      )}

      <SheetTable
        items={items}
        includeImages={includeImages}
        columns={['qty', 'check']}
        hidePrices
      />

      {order.notes && (
        <div className="mt-3">
          <strong>Customer note:</strong> {order.notes}
        </div>
      )}

      <div className="sign-row">
        <div>Packed by</div>
        <div>Rider / courier</div>
        <div>Received by (customer signature)</div>
      </div>

      <div className="sheet-foot">
        Check size and colour against this list before sealing. Customer: inspect on delivery — wrong size, wrong item or defect: exchange within 48 hours.
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Customer copy — receipt
// ────────────────────────────────────────────────────────────────────
function CustomerCopySheet({
  order,
  items,
  payment,
  areaLabel,
  subtotal,
  includeImages,
}: {
  order: any
  items: any[]
  payment: any
  areaLabel: string
  subtotal: number
  includeImages: boolean
}) {
  const saved = items.reduce((s, it) => s + (it.unitPrice < it.totalPrice / it.quantity ? 0 : 0), 0)
  const paidLabel =
    order.paymentStatus === 'SUCCESS' ? 'PAID' :
    order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Pay on delivery' :
    'Awaiting payment'

  return (
    <div className="sheet-body">
      <SheetHead title="RECEIPT" sub={`Order ${order.orderNumber} · ${formatDate(order.createdAt)}`} />

      <div className="sheet-three">
        <SheetBox title="Billed to">
          <strong>{order.customerName}</strong><br />
          {order.phone}
        </SheetBox>
        <SheetBox title="Delivering to">
          {order.address}<br />
          {areaLabel}
        </SheetBox>
        <SheetBox title="Payment">
          {formatPaymentMethod(order.paymentMethod)}<br />
          <strong>{paidLabel}</strong>
        </SheetBox>
      </div>

      <SheetTable
        items={items}
        includeImages={includeImages}
        columns={['unit', 'qty', 'total']}
      />

      <div className="sheet-totals">
        <div><span>Subtotal</span><span className="mono">{formatNGN(subtotal)}</span></div>
        {order.discount > 0 && (
          <div><span>You saved</span><span className="mono">{formatNGN(order.discount)}</span></div>
        )}
        <div><span>Delivery</span><span className="mono">{formatNGN(order.deliveryFee)}</span></div>
        <div className="grand"><span>Total</span><span className="mono">{formatNGN(order.total)}</span></div>
      </div>

      <div className="sheet-foot">
        <strong>Exchange policy.</strong> We offer exchanges only — no cash refunds. Wrong size, wrong item or defect: within 48 hours of delivery. Change of mind: within 24 hours, you cover delivery, for an exchange or wallet credit. Sale-clearance and final-sale items are not returnable.
        <br /><br />
        Thank you for shopping with Wardrobecare — Lagos.
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Sheet primitives
// ────────────────────────────────────────────────────────────────────
function SheetHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="sheet-head">
      <div className="sheet-logo">
        <span className="brand">Wardrobecare</span>
        <small className="text-muted">Lagos · distinguished menswear</small>
      </div>
      <div className="sheet-title">
        {title}
        <small>{sub}</small>
      </div>
    </div>
  )
}

function SheetBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sheet-box">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  )
}

function SheetTable({
  items,
  includeImages,
  columns,
  hidePrices = false,
}: {
  items: any[]
  includeImages: boolean
  columns: ('unit' | 'qty' | 'total' | 'check')[]
  hidePrices?: boolean
}) {
  return (
    <table className="sheet-items">
      <thead>
        <tr>
          {includeImages && <th className="th-img">Photo</th>}
          <th>Item</th>
          {columns.includes('unit') && !hidePrices && <th className="num">Unit</th>}
          {columns.includes('qty') && <th className="num">Qty</th>}
          {columns.includes('total') && !hidePrices && <th className="num">Total</th>}
          {columns.includes('check') && <th className="check-col">Packed</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it.id}>
            {includeImages && (
              <td className="td-img">
                {it.productImage ? (
                  <div className="thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.productImage} alt={it.productName} />
                  </div>
                ) : (
                  <div className="thumb empty">—</div>
                )}
              </td>
            )}
            <td>
              <strong>{it.productName}</strong>
              <div className="text-muted small">
                {isKnownColor(it.color) && (
                  <span
                    className="swatch"
                    style={{ background: colorToCss(it.color) }}
                  />
                )}
                {[it.color, it.size].filter(Boolean).join(' · ')}
              </div>
              {it.sku && <div className="text-muted smaller mono">SKU {it.sku}</div>}
            </td>
            {columns.includes('unit') && !hidePrices && (
              <td className="num mono">{formatNGN(it.unitPrice)}</td>
            )}
            {columns.includes('qty') && (
              <td className="num"><strong>× {it.quantity}</strong></td>
            )}
            {columns.includes('total') && !hidePrices && (
              <td className="num mono"><strong>{formatNGN(it.totalPrice)}</strong></td>
            )}
            {columns.includes('check') && <td className="check-col">☐</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ────────────────────────────────────────────────────────────────────
// Print CSS — scoped to .print-root so it never affects the rest of the
// admin UI. Uses @page for A4 portrait margins and page-break-after
// between sheets.
// ────────────────────────────────────────────────────────────────────
const PRINT_CSS = `
.print-root { font-family: Inter, system-ui, sans-serif; color: #121110; }
.print-root .print-toolbar { background: #fbfaf8; border-bottom: 1px solid #e3e1da; }
.print-root .text-muted { color: #6e6a62; }
.print-root .small { font-size: 11px; }
.print-root .smaller { font-size: 9.5px; }
.print-root .mono { font-family: 'Courier New', monospace; }
.print-root .sheet { padding: 0; margin-bottom: 24px; page-break-after: always; border: 1px solid #e3e1da; background: #fff; }
.print-root .sheet:last-child { page-break-after: auto; margin-bottom: 0; }
.print-root .sheet-body { padding: 18px; font-size: 11.5px; line-height: 1.5; }
.print-root .sheet-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 2px solid #121110; margin-bottom: 14px; }
.print-root .sheet-logo { display: flex; flex-direction: column; }
.print-root .sheet-logo .brand { font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 600; }
.print-root .sheet-title { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 700; text-align: right; }
.print-root .sheet-title small { display: block; font-family: Inter, sans-serif; font-size: 11px; font-weight: 400; color: #6e6a62; margin-top: 2px; }
.print-root .sheet-three { display: flex; gap: 12px; margin-bottom: 12px; }
.print-root .sheet-box { flex: 1; border: 1px solid #c7c4be; padding: 8px 10px; font-size: 11px; line-height: 1.5; }
.print-root .sheet-box strong { display: block; font-size: 10px; letter-spacing: 0.04em; margin-bottom: 4px; }
.print-root .sheet-items { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 10px; }
.print-root .sheet-items th { text-align: left; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.04em; color: #6e6a62; border-bottom: 1.5px solid #121110; padding: 5px 6px; }
.print-root .sheet-items td { padding: 7px 6px; border-bottom: 1px solid #d5d2cc; vertical-align: middle; }
.print-root .sheet-items .num { text-align: right; }
.print-root .sheet-items .check-col { width: 42px; text-align: center; font-size: 14px; }
.print-root .sheet-items .th-img { width: 56px; }
.print-root .sheet-items .td-img { width: 56px; }
.print-root .sheet-items .thumb { width: 44px; height: 44px; border: 1px solid #c7c4be; overflow: hidden; }
.print-root .sheet-items .thumb img { width: 100%; height: 100%; object-fit: cover; }
.print-root .sheet-items .thumb.empty { display: flex; align-items: center; justify-content: center; color: #999; }
.print-root .swatch { display: inline-block; width: 9px; height: 9px; border-radius: 50%; border: 1px solid #121110; margin-right: 5px; vertical-align: middle; }
.print-root .sheet-totals { width: 260px; margin-left: auto; font-size: 12px; }
.print-root .sheet-totals > div { display: flex; justify-content: space-between; padding: 3px 0; }
.print-root .sheet-totals .grand { border-top: 2px solid #121110; font-weight: 700; font-size: 14px; padding-top: 6px; margin-top: 3px; }
.print-root .sign-row { display: flex; gap: 30px; margin-top: 24px; font-size: 11px; }
.print-root .sign-row > div { flex: 1; border-top: 1px solid #121110; padding-top: 4px; }
.print-root .cod-box { border: 3px solid #121110; padding: 8px 12px; font-size: 15px; font-weight: 800; margin: 10px 0; text-align: center; }
.print-root .sheet-foot { font-size: 10px; color: #444; margin-top: 14px; border-top: 1px solid #c7c4be; padding-top: 6px; line-height: 1.5; }
.print-root .staff-notes { margin-top: 4px; padding-left: 16px; font-size: 11px; }
.print-root .staff-notes li { margin-bottom: 4px; }
@media print {
  @page { size: A4 portrait; margin: 14mm; }
  body { background: #fff !important; }
  .print-root { color: #000; }
  .print-toolbar { display: none !important; }
  .print-root > .p-4 { padding: 0 !important; }
  .print-root .sheet { border: none !important; margin: 0 !important; box-shadow: none !important; }
}
`

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
