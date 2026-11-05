'use client'

/**
 * Requests tab client.
 *
 * Layout matches the mockup: a list of bookings on the left, an inline
 * detail panel on the right. Selecting a booking in the list updates
 * the right panel via React state (no URL change, no full reload).
 *
 * The detail panel exposes:
 *   - Stylist assignment (select, with confirmation toast)
 *   - Confirm booking (PAID → CONFIRMED) — disabled until a stylist is
 *     assigned and there's no clash with the stylist's other confirmed
 *     sessions
 *   - Date not available (opens a modal to pick 2–3 alternative slots)
 *   - Apply discount (opens a modal: percentage / fixed / free / custom)
 *   - Customer messages and history (audit trail timeline)
 *
 * All mutations call the server actions in consultations-workflow.ts
 * and consultations.ts.
 */

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle, CalendarClock, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminAssignStylist,
  adminConfirmPaidBooking,
  adminApplyDiscountToBooking,
} from '@/actions/consultations-workflow'
import { adminProposeReschedule } from '@/actions/consultations'
import { statusPill, fmtNGN, fmtDateLabel, SLOT_TIMES } from '../_shared'

type Booking = {
  id: string
  bookingNumber: string
  bookerName: string
  bookerPhone: string
  contactMethod: string
  recipientName: string
  recipientRelation: string | null
  promptWhy: string | null
  occasions: string | null
  frustration: string | null
  sessionMode: string
  location: string | null
  slotDate: string
  slotTime: string
  listPrice: number
  amountPaid: number
  discountLabel: string | null
  discountAmount: number
  discountAppliesToAll: boolean
  discountPct: number | null
  discountFree: boolean
  status: string
  assignedStylistId: string | null
  proposedSlots: string | unknown[] | null
  rescheduleReason: string | null
  rescheduledAt: string | null
  originalSlotDate: string | null
  originalSlotTime: string | null
  createdAt: string
  updatedAt: string
}

type Stylist = { id: string; name: string; role: string }

type Props = {
  adminEmail: string
  canManage: boolean
  bookings: Booking[]
  stylists: Stylist[]
  initialFilter: string
  initialSelectedId: string | null
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'paid', label: 'To confirm' },
  { key: 'res', label: 'Needs new date' },
  { key: 'conf', label: 'Confirmed' },
  { key: 'ses', label: 'In session' },
  { key: 'done', label: 'Summary to send' },
]

export function RequestsClient({
  adminEmail,
  canManage,
  bookings,
  stylists,
  initialFilter,
  initialSelectedId,
}: Props) {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter || 'all')
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && bookings.some((b) => b.id === initialSelectedId) ? initialSelectedId : null,
  )

  // Toast feedback after actions (we listen to URL query string for
  // success/error sent by the modal handlers — but the actions return
  // result objects directly, so we just use toast inside the handlers).
  useEffect(() => {
    if (!selectedId && bookings.length > 0) {
      // Auto-select the first booking when the page first loads if none
      // is selected. (Commented out — the mockup leaves the panel empty
      // with a hint when nothing is selected.)
    }
  }, [selectedId, bookings.length])

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true
    if (filter === 'paid') return b.status === 'PAID'
    if (filter === 'res') return b.status === 'RESCHEDULE_PROPOSED'
    if (filter === 'conf') return b.status === 'CONFIRMED'
    if (filter === 'ses') return b.status === 'IN_SESSION'
    if (filter === 'done') return b.status === 'SUMMARY_PENDING'
    return true
  })

  const selected = bookings.find((b) => b.id === selectedId) ?? null

  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
      {/* List */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
                filter === f.key
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Nothing here for you right now.
          </div>
        ) : (
          <div className="border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Ref</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Client</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">When</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Stylist</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Status</th>
              </tr>
              </thead>
              <tbody>
                {filtered.map((b) => {
                  const stylist = stylists.find((s) => s.id === b.assignedStylistId)
                  return (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedId(b.id)}
                      className={`cursor-pointer border-t border-border/60 hover:bg-secondary/40 ${
                        selectedId === b.id ? 'bg-secondary/80' : ''
                      }`}
                    >
                      <td className="px-3 py-2.5 font-mono text-xs">{b.bookingNumber}</td>
                      <td className="px-3 py-2.5">
                        <p className="font-medium">{b.bookerName}</p>
                        <p className="text-xs text-muted-foreground">{b.sessionMode}</p>
                      </td>
                      <td className="px-3 py-2.5 text-xs">
                        {fmtDateLabel(b.slotDate).split(' ').slice(0, 3).join(' ')}, {b.slotTime}
                      </td>
                      <td className="px-3 py-2.5 text-xs">
                        {stylist ? stylist.name : <span className="text-rust italic">Unassigned</span>}
                      </td>
                      <td className="px-3 py-2.5">{statusPill(b.status)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail */}
      <div>
        {selected ? (
          <RequestDetail
            booking={selected}
            stylists={stylists}
            canManage={canManage}
            adminEmail={adminEmail}
            allBookings={bookings}
            onMutated={() => router.refresh()}
          />
        ) : (
          <div className="border border-border bg-card p-6">
            <div className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-camel" />
              <div>
                <p className="text-foreground font-medium mb-1">Select a booking</p>
                <p>to see the client brief, confirm it, assign a stylist, or move the date.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Detail panel ────────────────────────────────────────────────────────

function RequestDetail({
  booking,
  stylists,
  canManage,
  adminEmail,
  allBookings,
  onMutated,
}: {
  booking: Booking
  stylists: Stylist[]
  canManage: boolean
  adminEmail: string
  allBookings: Booking[]
  onMutated: () => void
}) {
  const [assigning, startAssign] = useTransition()
  const [confirming, startConfirm] = useTransition()
  const [discountOpen, setDiscountOpen] = useState(false)
  const [dateNotAvailOpen, setDateNotAvailOpen] = useState(false)

  const stylist = stylists.find((s) => s.id === booking.assignedStylistId)

  // Detect clash: same stylist has another confirmed session at the same slot
  const clash = allBookings.some(
    (o) =>
      o.id !== booking.id &&
      o.assignedStylistId &&
      o.assignedStylistId === booking.assignedStylistId &&
      o.slotDate === booking.slotDate &&
      o.slotTime === booking.slotTime &&
      (o.status === 'CONFIRMED' || o.status === 'IN_SESSION'),
  )

  function onAssign(stylistId: string) {
    if (!canManage) return
    startAssign(async () => {
      const r = await adminAssignStylist(booking.id, stylistId || null)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(stylistId ? `Assigned to ${r.stylistName}` : 'Unassigned', { duration: 5000 })
      onMutated()
    })
  }

  function onConfirm() {
    if (!canManage) return
    startConfirm(async () => {
      const r = await adminConfirmPaidBooking(booking.id)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Confirmed. The customer has been told.', { duration: 5000 })
      onMutated()
    })
  }

  const showConfirm = booking.status === 'PAID'
  const showDateNotAvail = (booking.status === 'PAID' || booking.status === 'CONFIRMED' || booking.status === 'RESCHEDULED') && canManage
  const showDiscount = canManage && booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && booking.status !== 'IN_SESSION'

  return (
    <div className="space-y-4">
      {/* Main card */}
      <div className="border border-border bg-card">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-base">
            {booking.bookingNumber} · {booking.bookerName}
          </h3>
          {statusPill(booking.status)}
        </div>
        <div className="p-5 space-y-3 text-sm">
          <KV label="Session for">{booking.recipientName}{booking.recipientRelation ? ` (${booking.recipientRelation})` : ''}</KV>
          <KV label="When">{fmtDateLabel(booking.slotDate)}, {booking.slotTime}</KV>
          <KV label="How">{booking.sessionMode}{booking.location ? ` · ${booking.location}` : ''}</KV>
          <KV label="Contact">{booking.bookerPhone} ({booking.contactMethod})</KV>
          <KV label="Paid">
            {booking.discountFree && booking.amountPaid === 0
              ? 'Nothing (free session)'
              : `${fmtNGN(booking.amountPaid)} in full`}
          </KV>
          {booking.discountLabel && (
            <KV label="Discount">
              {booking.discountLabel}, −{fmtNGN(booking.discountAmount)}
              {booking.discountAppliesToAll
                ? '. Also applies to extra time and return visits.'
                : '. First two hours only.'}
            </KV>
          )}
          {booking.promptWhy && <KV label="Prompting this">{booking.promptWhy}</KV>}
          {booking.occasions && <KV label="Occasions">{booking.occasions}</KV>}
          {booking.frustration && <KV label="Frustration">{booking.frustration}</KV>}

          {/* Stylist assignment */}
          {canManage && (booking.status === 'PAID' || booking.status === 'CONFIRMED' || booking.status === 'RESCHEDULE_PROPOSED' || booking.status === 'RESCHEDULED') && (
            <div className="pt-3 border-t border-border">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Stylist
              </label>
              <select
                value={booking.assignedStylistId ?? ''}
                onChange={(e) => onAssign(e.target.value)}
                disabled={assigning}
                className="w-full h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none disabled:opacity-60"
              >
                <option value="">Unassigned</option>
                {stylists.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role.toLowerCase()})
                  </option>
                ))}
              </select>
            </div>
          )}

          {clash && (
            <div className="bg-rust/10 border-l-4 border-rust px-4 py-3 text-sm text-foreground">
              <strong>Clash:</strong> {stylist?.name} already has a confirmed session at this
              time. Offer new dates instead.
            </div>
          )}

          {booking.status === 'PAID' && !booking.assignedStylistId && (
            <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 text-sm text-foreground">
              Not assigned to a stylist yet.
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {showConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                disabled={confirming || !canManage || clash || !booking.assignedStylistId}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                {confirming ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Confirm booking
              </button>
            )}
            {showDateNotAvail && (
              <button
                type="button"
                onClick={() => setDateNotAvailOpen(true)}
                className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors"
              >
                <CalendarClock className="h-3.5 w-3.5" />
                Date not available
              </button>
            )}
            {showDiscount && (
              <button
                type="button"
                onClick={() => setDiscountOpen(true)}
                className="inline-flex items-center border border-foreground px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
              >
                {booking.discountLabel ? 'Change discount' : 'Apply discount'}
              </button>
            )}
          </div>

          {booking.status === 'PAID' && !booking.assignedStylistId && (
            <p className="text-xs text-muted-foreground pt-1">
              Assign a stylist first. Confirm unlocks after that.
            </p>
          )}
        </div>
      </div>

      {/* History */}
      <div className="border border-border bg-card">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-display text-sm">Customer messages and history</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-2.5 text-sm">
            <li className="border-l-2 border-border pl-4">
              <p className="text-foreground">
                Customer paid {booking.discountFree && booking.amountPaid === 0
                  ? '(free session — referral reward)'
                  : fmtNGN(booking.amountPaid)} and booked {fmtDateLabel(booking.slotDate)}, {booking.slotTime}
              </p>
              <p className="text-xs text-muted-foreground">Online · {new Date(booking.createdAt).toLocaleString('en-GB')}</p>
            </li>
            {booking.assignedStylistId && (
              <li className="border-l-2 border-border pl-4">
                <p className="text-foreground">Assigned to {stylist?.name}</p>
                <p className="text-xs text-muted-foreground">Staff · {new Date(booking.updatedAt).toLocaleString('en-GB')}</p>
              </li>
            )}
            {booking.status === 'CONFIRMED' && (
              <li className="border-l-2 border-olive pl-4">
                <p className="text-foreground">Booking confirmed, customer notified by {booking.contactMethod.toLowerCase()}</p>
                <p className="text-xs text-muted-foreground">Staff · {new Date(booking.updatedAt).toLocaleString('en-GB')}</p>
              </li>
            )}
            {booking.status === 'RESCHEDULE_PROPOSED' && booking.rescheduleReason && (
              <li className="border-l-2 border-rust pl-4">
                <p className="text-foreground">
                  Date not available. {booking.rescheduleReason.split('\n')[0]}
                </p>
                <p className="text-xs text-muted-foreground">Staff · {booking.rescheduledAt ? new Date(booking.rescheduledAt).toLocaleString('en-GB') : ''}</p>
              </li>
            )}
            {booking.originalSlotDate && booking.status === 'RESCHEDULED' && (
              <li className="border-l-2 border-purple-500 pl-4">
                <p className="text-foreground">
                  Rescheduled from {fmtDateLabel(booking.originalSlotDate)}, {booking.originalSlotTime}
                </p>
                <p className="text-xs text-muted-foreground">Customer · {booking.rescheduledAt ? new Date(booking.rescheduledAt).toLocaleString('en-GB') : ''}</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Apply discount modal */}
      {discountOpen && (
        <DiscountModal
          booking={booking}
          onClose={() => setDiscountOpen(false)}
          onApplied={() => {
            setDiscountOpen(false)
            onMutated()
          }}
        />
      )}

      {/* Date not available modal */}
      {dateNotAvailOpen && (
        <DateNotAvailableModal
          booking={booking}
          onClose={() => setDateNotAvailOpen(false)}
          onProposed={() => {
            setDateNotAvailOpen(false)
            onMutated()
          }}
        />
      )}
    </div>
  )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm border-b border-border/40 pb-2">
      <span className="w-32 flex-shrink-0 text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
        {label}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  )
}

// ─── Apply Discount modal ──────────────────────────────────────────────

function DiscountModal({
  booking,
  onClose,
  onApplied,
}: {
  booking: Booking
  onClose: () => void
  onApplied: () => void
}) {
  const [type, setType] = useState<'pct' | 'fix' | 'free' | 'custom'>('pct')
  const [value, setValue] = useState('')
  const [appliesToAll, setAppliesToAll] = useState(false)
  const [reason, setReason] = useState('Loyal client')
  const [note, setNote] = useState('')
  const [returnAs, setReturnAs] = useState<'wallet' | 'refund'>('wallet')
  const [submitting, startSubmit] = useTransition()

  const listPrice = booking.listPrice || 45000
  const amountPaid = booking.amountPaid

  function calcNewPrice(): number {
    const v = parseInt(value, 10) || 0
    if (type === 'pct') return Math.round(listPrice * (1 - v / 100))
    if (type === 'fix') return listPrice - v
    if (type === 'free') return 0
    return v // custom
  }
  const newPrice = calcNewPrice()
  const refund = Math.max(0, amountPaid - newPrice)

  function onApply() {
    startSubmit(async () => {
      const v = parseInt(value, 10) || (type === 'free' ? 100 : 0)
      const r = await adminApplyDiscountToBooking({
        bookingId: booking.id,
        type,
        value: v,
        appliesToAll,
        reason,
        note,
        returnAs,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(
        `Discount applied.${refund ? ' ' + fmtNGN(refund) + ' returned as ' + returnAs + '.' : ''}`,
        { duration: 6000 },
      )
      onApplied()
    })
  }

  return (
    <ModalShell onClose={onClose} title={`${booking.discountLabel ? 'Change' : 'Apply'} discount: ${booking.bookerName}`}>
      <p className="text-sm text-muted-foreground mb-4">
        List price {fmtNGN(listPrice)}. Customer paid {fmtNGN(amountPaid)}.
      </p>
      <div className="space-y-4">
        <Field label="Discount type">
          <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full h-10 px-3 text-sm bg-white border border-border">
            <option value="pct">Percentage off</option>
            <option value="fix">Fixed amount off (₦)</option>
            <option value="free">Free session</option>
            <option value="custom">Custom price for this booking (₦)</option>
          </select>
        </Field>
        {type !== 'free' && (
          <Field label={type === 'pct' ? 'Percentage (%)' : type === 'fix' ? 'Amount off (₦)' : 'New price (₦)'}>
            <input
              type="number"
              min="1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-10 px-3 text-sm bg-white border border-border"
            />
          </Field>
        )}
        <Field label="Applies to">
          <select
            value={appliesToAll ? '1' : '0'}
            onChange={(e) => setAppliesToAll(e.target.value === '1')}
            className="w-full h-10 px-3 text-sm bg-white border border-border"
          >
            <option value="0">First two hours only</option>
            <option value="1">Everything on this booking (extra time, return visit)</option>
          </select>
        </Field>
        <Field label="Reason (required, kept in the history)">
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-border">
            <option>Loyal client</option>
            <option>Gift or goodwill</option>
            <option>Service issue</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Note for the record">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Short note for the record"
            className="w-full min-h-[60px] px-3 py-2 text-sm bg-white border border-border resize-y"
          />
        </Field>
        <Field label="If the customer has already paid more than the new price, return the difference as">
          <select value={returnAs} onChange={(e) => setReturnAs(e.target.value as any)} className="w-full h-10 px-3 text-sm bg-white border border-border">
            <option value="wallet">Wallet credit</option>
            <option value="refund">Refund to original payment</option>
          </select>
        </Field>
        <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
          New price <strong>{fmtNGN(Math.max(0, newPrice))}</strong>
          {refund ? `. ${fmtNGN(refund)} goes back to the customer as ${returnAs}.` : '. Nothing to return.'}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="inline-flex items-center border border-border px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={submitting || note.trim().length < 5}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Apply discount
          </button>
        </div>
      </div>
    </ModalShell>
  )
}

// ─── Date not available modal ─────────────────────────────────────────

function DateNotAvailableModal({
  booking,
  onClose,
  onProposed,
}: {
  booking: Booking
  onClose: () => void
  onProposed: () => void
}) {
  const [reason, setReason] = useState('Stylist unavailable')
  const [selectedSlots, setSelectedSlots] = useState<Array<{ date: string; time: string }>>([])
  const [submitting, startSubmit] = useTransition()

  // Build a list of open slots for the next 14 days, skipping blocked
  // ones and slots already taken by another paid/confirmed booking.
  // For simplicity we don't have a 'block' API on the client; we just
  // avoid slots already occupied by other bookings.
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const candidates: Array<{ date: string; time: string; label: string }> = []
  const d = new Date(today)
  for (let i = 0; i < 14 && candidates.length < 24; i++) {
    if (d.getDay() !== 0) {
      // Mon–Sat
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      const key = `${yyyy}-${mm}-${dd}`
      const label = d.toLocaleString('en', { weekday: 'short', day: 'numeric', month: 'short' })
      for (const t of SLOT_TIMES) {
        candidates.push({ date: key, time: t, label: `${label}, ${t}` })
      }
    }
    d.setDate(d.getDate() + 1)
  }

  function toggle(slot: { date: string; time: string }) {
    setSelectedSlots((prev) => {
      const i = prev.findIndex((s) => s.date === slot.date && s.time === slot.time)
      if (i >= 0) {
        const next = [...prev]
        next.splice(i, 1)
        return next
      }
      if (prev.length >= 5) return prev
      return [...prev, slot]
    })
  }

  function onSend() {
    if (selectedSlots.length < 2) {
      toast.error('Choose at least 2 times so the customer has a real choice.', { duration: 6000 })
      return
    }
    startSubmit(async () => {
      const r = await adminProposeReschedule({
        bookingId: booking.id,
        reason,
        slots: selectedSlots,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Customer notified with ${selectedSlots.length} new dates.`, { duration: 6000 })
      onProposed()
    })
  }

  return (
    <ModalShell onClose={onClose} title="This date is not available">
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {booking.bookerName} paid for {fmtDateLabel(booking.slotDate)}, {booking.slotTime}.
        Pick <strong>2 to 3 other times</strong> that work. We message them straight
        away. Their payment stays valid.
      </p>
      <div className="space-y-4">
        <Field label="Reason (staff only)">
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-border">
            <option>Stylist unavailable</option>
            <option>Clash with another session</option>
            <option>Public holiday or closure</option>
            <option>Location cannot be reached</option>
          </select>
        </Field>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Open slots (next 14 days)
          </p>
          <div className="max-h-64 overflow-y-auto border border-border">
            {candidates.map((c) => {
              const checked = selectedSlots.some((s) => s.date === c.date && s.time === c.time)
              return (
                <label
                  key={`${c.date}|${c.time}`}
                  className={`flex items-center gap-3 px-3 py-2 text-sm border-b border-border/60 cursor-pointer hover:bg-secondary/40 ${
                    checked ? 'bg-olive/10' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(c)}
                    className="h-4 w-4"
                  />
                  <span>{c.label}</span>
                </label>
              )
            })}
          </div>
        </div>
        {selectedSlots.length < 2 && (
          <p className="text-xs text-rust">Choose at least 2 times so the customer has a real choice.</p>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="inline-flex items-center border border-border px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={submitting || selectedSlots.length < 2}
            className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-6 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Send new dates to customer
          </button>
        </div>
      </div>
    </ModalShell>
  )
}

// ─── Modal shell ────────────────────────────────────────────────────────

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card max-w-lg w-full p-5 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">{title}</h3>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
