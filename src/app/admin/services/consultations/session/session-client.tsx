'use client'

/**
 * Session workspace client.
 *
 * Layout (matches mockup 51):
 *   Left column:  Client brief + Session time (start, +30m / +1h,
 *                 extra-time billing if over 2h)
 *   Right column: Wardrobe audit (add item, Keep/Alter/Retire, note)
 *                 Outfit photos (add photo with occasion)
 *                 Gap list (add item with priority)
 *                 Finish session (disabled until audit + photo + gap
 *                 all have at least one entry)
 *
 * Time tracking is manual — staff click +30m / +1h to add. (A live timer
 * would require a websocket and adds complexity without much value
 * for in-person sessions.)
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Play, Plus, X, Check, Clock } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminStartSession,
  adminAddSessionTime,
  adminAddAuditItem,
  adminRemoveAuditItem,
  adminAddOutfitPhoto,
  adminRemoveOutfitPhoto,
  adminAddGapItem,
  adminRemoveGapItem,
  adminSendExtraTimeLink,
  adminFinishSession,
} from '@/actions/consultations-workflow'
import { statusPill, fmtNGN, fmtDateLabel } from '../_shared'

type AuditItem = { i: string; cat: string; a: 'Keep' | 'Alter' | 'Retire'; n: string }
type OutfitPhoto = { n: number; o: string; url: string }
type GapItem = { i: string; p: 'High' | 'Medium' | 'Low' }

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
  discountAppliesToAll: boolean
  discountPct: number | null
  discountFree: boolean
  status: string
  assignedStylistId: string | null
  sessionStartedAt: string | null
  elapsedMinutes: number
  auditItems: string | unknown[] | null
  outfitPhotos: string | unknown[] | null
  gapItems: string | unknown[] | null
  sessionNotes: string | null
}

type Fees = {
  baseFee: number
  extraHourFee: number
  extraTimeRounding: 'started' | 'full'
}

type Props = {
  canManage: boolean
  sessions: Booking[]
  fees: Fees
  initialSelectedId: string | null
}

function parseArr(raw: string | unknown[] | null | undefined): any[] {
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

export function SessionWorkspaceClient({ canManage, sessions, fees, initialSelectedId }: Props) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && sessions.some((b) => b.id === initialSelectedId) ? initialSelectedId : sessions[0]?.id ?? null,
  )

  if (sessions.length === 0) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-3" strokeWidth={1.5} />
        <h3 className="font-display text-lg mb-2">No confirmed sessions to run</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Confirmed sessions appear here on the day. Once you start one, the audit,
          outfit photos and gap list open up.
        </p>
      </div>
    )
  }

  const selected = sessions.find((b) => b.id === selectedId) ?? sessions[0]

  return (
    <div className="space-y-4">
      {/* Session picker */}
      <div className="flex flex-wrap gap-2">
        {sessions.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedId(b.id)}
            className={`px-3 py-2 text-xs border transition-colors ${
              b.id === selectedId
                ? 'bg-foreground text-background border-foreground'
                : 'border-border hover:bg-secondary'
            }`}
          >
            {b.bookerName} · {fmtDateLabel(b.slotDate).split(' ').slice(0, 3).join(' ')}, {b.slotTime}
          </button>
        ))}
      </div>

      {selected && (
        <SessionDetail
          booking={selected}
          canManage={canManage}
          fees={fees}
          onMutated={() => router.refresh()}
        />
      )}
    </div>
  )
}

// ─── Session detail ─────────────────────────────────────────────────────

function SessionDetail({
  booking,
  canManage,
  fees,
  onMutated,
}: {
  booking: Booking
  canManage: boolean
  fees: Fees
  onMutated: () => void
}) {
  const audits = parseArr(booking.auditItems) as AuditItem[]
  const photos = parseArr(booking.outfitPhotos) as OutfitPhoto[]
  const gaps = parseArr(booking.gapItems) as GapItem[]
  const isRunning = booking.status === 'IN_SESSION'

  // Time helpers
  const elapsed = booking.elapsedMinutes ?? 0
  const extraMin = Math.max(0, elapsed - 120)
  const extraHours =
    fees.extraTimeRounding === 'full'
      ? Math.floor(extraMin / 60)
      : Math.ceil(extraMin / 60)
  let extraAmount = extraHours * fees.extraHourFee
  if (booking.discountAppliesToAll) {
    if (booking.discountFree) extraAmount = 0
    else if (booking.discountPct) extraAmount = Math.round(extraAmount * (1 - booking.discountPct / 100))
  }

  return (
    <div className="grid lg:grid-cols-[1.3fr_1.6fr] gap-4">
      {/* Left column */}
      <div className="space-y-4">
        {/* Client brief */}
        <Card title="1 · Client brief" right={statusPill(booking.status)}>
          <KV label="For">{booking.recipientName}{booking.recipientRelation ? ` (${booking.recipientRelation})` : ''}</KV>
          <KV label="When">{fmtDateLabel(booking.slotDate)}, {booking.slotTime}</KV>
          <KV label="How">{booking.sessionMode}{booking.location ? ` · ${booking.location}` : ''}</KV>
          <KV label="Contact">{booking.bookerPhone} ({booking.contactMethod})</KV>
          <KV label="Paid">{booking.discountFree && booking.amountPaid === 0 ? 'Free session' : fmtNGN(booking.amountPaid)}</KV>
          {booking.promptWhy && <KV label="Prompting this">{booking.promptWhy}</KV>}
          {booking.occasions && <KV label="Occasions">{booking.occasions}</KV>}
          {booking.frustration && <KV label="Frustration">{booking.frustration}</KV>}
        </Card>

        {/* Session time */}
        <Card
          title="2 · Session time"
          right={<span className="font-mono text-xs">{Math.floor(elapsed / 60)}h {('0' + (elapsed % 60)).slice(-2)}m</span>}
        >
          <SessionTimeCard
            bookingId={booking.id}
            status={booking.status}
            elapsed={elapsed}
            extraMin={extraMin}
            extraHours={extraHours}
            extraAmount={extraAmount}
            extraHourFee={fees.extraHourFee}
            discountAppliesToAll={booking.discountAppliesToAll}
            canManage={canManage}
            onMutated={onMutated}
          />
        </Card>
      </div>

      {/* Right column */}
      <div className="space-y-4">
        {isRunning ? (
          <>
            {/* Audit */}
            <Card title="3 · Wardrobe audit (keep / alter / retire)">
              <AuditCard bookingId={booking.id} audits={audits} canManage={canManage} onMutated={onMutated} />
            </Card>

            {/* Photos */}
            <Card title="4 · Outfit photos (numbered, with occasion)">
              <PhotosCard bookingId={booking.id} photos={photos} canManage={canManage} onMutated={onMutated} />
            </Card>

            {/* Gaps */}
            <Card title="5 · Gap list (what to buy next)">
              <GapsCard bookingId={booking.id} gaps={gaps} canManage={canManage} onMutated={onMutated} />
            </Card>

            {/* Finish */}
            <FinishCard
              bookingId={booking.id}
              auditsCount={audits.length}
              photosCount={photos.length}
              gapsCount={gaps.length}
              elapsed={elapsed}
              canManage={canManage}
              onMutated={onMutated}
            />
          </>
        ) : booking.status === 'CONFIRMED' ? (
          <div className="border border-border bg-secondary/40 p-6 text-sm text-muted-foreground leading-relaxed">
            <Play className="h-5 w-5 mb-2 text-camel" />
            Start the session to open the audit, outfit photos and gap list.
          </div>
        ) : (
          <div className="border border-border bg-secondary/40 p-6 text-sm text-muted-foreground leading-relaxed">
            Session finished. Go to the <strong>After the session</strong> tab to send the summary.
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Session time card ──────────────────────────────────────────────────

function SessionTimeCard({
  bookingId,
  status,
  elapsed,
  extraMin,
  extraHours,
  extraAmount,
  extraHourFee,
  discountAppliesToAll,
  canManage,
  onMutated,
}: {
  bookingId: string
  status: string
  elapsed: number
  extraMin: number
  extraHours: number
  extraAmount: number
  extraHourFee: number
  discountAppliesToAll: boolean
  canManage: boolean
  onMutated: () => void
}) {
  const [starting, startStart] = useTransition()
  const [addingTime, startAddTime] = useTransition()
  const [billing, startBill] = useTransition()

  function onStart() {
    startStart(async () => {
      const r = await adminStartSession(bookingId)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Session started.', { duration: 4000 })
      onMutated()
    })
  }

  function onAddTime(minutes: number) {
    startAddTime(async () => {
      const r = await adminAddSessionTime(bookingId, minutes)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      onMutated()
    })
  }

  function onBill() {
    startBill(async () => {
      const r = await adminSendExtraTimeLink(bookingId)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Payment link sent for ${fmtNGN(r.amount)}.`, { duration: 5000 })
      onMutated()
    })
  }

  if (status === 'CONFIRMED') {
    return (
      <button
        type="button"
        onClick={onStart}
        disabled={starting || !canManage}
        className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
      >
        {starting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
        Start session
      </button>
    )
  }

  if (status === 'IN_SESSION') {
    return (
      <div>
        <div className="flex gap-2 mb-3">
          <button type="button" onClick={() => onAddTime(30)} disabled={addingTime || !canManage} className="inline-flex items-center gap-1 border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-secondary transition-colors disabled:opacity-60">
            <Plus className="h-3 w-3" /> 30 min
          </button>
          <button type="button" onClick={() => onAddTime(60)} disabled={addingTime || !canManage} className="inline-flex items-center gap-1 border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-secondary transition-colors disabled:opacity-60">
            <Plus className="h-3 w-3" /> 1 hour
          </button>
        </div>
        {extraMin > 0 ? (
          <div className="bg-rust/10 border-l-4 border-rust px-4 py-3 text-sm">
            Over the 2 hours by <strong>{elapsed - 120} minutes</strong>. Extra time: <strong>{extraHours} × {fmtNGN(extraHourFee)}{discountAppliesToAll ? ' (less booking discount)' : ''} = {fmtNGN(extraAmount)}</strong> (each started hour counted).
            <div className="mt-3">
              <button type="button" onClick={onBill} disabled={billing || !canManage} className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-5 py-2 text-xs uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60">
                {billing && <Loader2 className="h-3 w-3 animate-spin" />}
                {extraAmount === 0 ? 'Record extra time (no charge)' : `Send payment link for ${fmtNGN(extraAmount)}`}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
            Within the two hours covered by the {fmtNGN(45000)} flat fee.
          </div>
        )}
      </div>
    )
  }

  // COMPLETED — show the final time
  return (
    <p className="text-sm text-muted-foreground">
      Session finished after {Math.floor(elapsed / 60)}h {elapsed % 60}m. Go to the
      After the session tab to send the summary.
    </p>
  )
}

// ─── Audit card ──────────────────────────────────────────────────────────

function AuditCard({
  bookingId,
  audits,
  canManage,
  onMutated,
}: {
  bookingId: string
  audits: AuditItem[]
  canManage: boolean
  onMutated: () => void
}) {
  const [item, setItem] = useState('')
  const [cat, setCat] = useState('Shirts')
  const [action, setAction] = useState<'Keep' | 'Alter' | 'Retire'>('Keep')
  const [note, setNote] = useState('')
  const [adding, startAdd] = useTransition()

  function onAdd() {
    if (!item.trim()) {
      toast.error('Enter the item first.')
      return
    }
    startAdd(async () => {
      const r = await adminAddAuditItem(bookingId, { item, category: cat, action, note })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      setItem('')
      setNote('')
      onMutated()
    })
  }

  function onRemove(i: number) {
    adminRemoveAuditItem(bookingId, i).then((r) => {
      if (!r.ok) toast.error(r.error)
      onMutated()
    })
  }

  return (
    <div>
      {audits.length > 0 && (
        <table className="w-full text-sm mb-3">
          <thead>
            <tr className="bg-secondary/40">
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Item</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Category</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Action</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Note</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {audits.map((a, i) => (
              <tr key={i} className="border-t border-border/60">
                <td className="px-3 py-2">{a.i}</td>
                <td className="px-3 py-2">{a.cat}</td>
                <td className="px-3 py-2">
                  <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
                    a.a === 'Keep' ? 'bg-green-100 text-green-800' :
                    a.a === 'Alter' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {a.a}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{a.n}</td>
                <td className="px-3 py-2 text-right">
                  <button type="button" onClick={() => onRemove(i)} className="text-muted-foreground hover:text-rust">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {canManage && (
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Item, e.g. Navy blazer"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-1 min-w-[140px] h-9 px-3 text-sm border border-border"
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-9 px-2 text-sm border border-border">
            <option>Shirts</option>
            <option>Trousers</option>
            <option>Suiting</option>
            <option>Outerwear</option>
            <option>Footwear</option>
            <option>Accessories</option>
            <option>Traditional Wear</option>
          </select>
          <select value={action} onChange={(e) => setAction(e.target.value as any)} className="h-9 px-2 text-sm border border-border">
            <option>Keep</option>
            <option>Alter</option>
            <option>Retire</option>
          </select>
          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 min-w-[100px] h-9 px-3 text-sm border border-border"
          />
          <button type="button" onClick={onAdd} disabled={adding} className="inline-flex items-center gap-1 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60">
            {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
            Add
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Photos card ─────────────────────────────────────────────────────────

function PhotosCard({
  bookingId,
  photos,
  canManage,
  onMutated,
}: {
  bookingId: string
  photos: OutfitPhoto[]
  canManage: boolean
  onMutated: () => void
}) {
  const [occasion, setOccasion] = useState('Work')
  const [adding, startAdd] = useTransition()

  function onAdd() {
    startAdd(async () => {
      const r = await adminAddOutfitPhoto(bookingId, { occasion })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      onMutated()
    })
  }

  function onRemove(i: number) {
    adminRemoveOutfitPhoto(bookingId, i).then((r) => {
      if (!r.ok) toast.error(r.error)
      onMutated()
    })
  }

  return (
    <div>
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {photos.map((p, i) => (
            <div key={i} className="w-24 border border-border text-xs text-center relative group">
              <div className="h-20 bg-gradient-to-br from-stone-200 to-stone-100 flex items-center justify-center text-muted-foreground">
                Photo
              </div>
              <div className="px-1 py-1">
                <strong>Outfit {p.n}</strong>
                <br />
                {p.o}
              </div>
              {canManage && (
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute top-1 right-1 bg-card/80 hover:bg-card rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {canManage && (
        <div className="flex gap-2">
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="h-9 px-2 text-sm border border-border">
            <option>Work</option>
            <option>Events</option>
            <option>Church</option>
            <option>Casual</option>
            <option>Travel</option>
            <option>Traditional</option>
          </select>
          <button type="button" onClick={onAdd} disabled={adding} className="inline-flex items-center gap-1 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60">
            {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
            Add photo as Outfit {photos.length + 1}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Gaps card ────────────────────────────────────────────────────────────

function GapsCard({
  bookingId,
  gaps,
  canManage,
  onMutated,
}: {
  bookingId: string
  gaps: GapItem[]
  canManage: boolean
  onMutated: () => void
}) {
  const [item, setItem] = useState('')
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium')
  const [adding, startAdd] = useTransition()

  function onAdd() {
    if (!item.trim()) {
      toast.error('Enter the item first.')
      return
    }
    startAdd(async () => {
      const r = await adminAddGapItem(bookingId, { item, priority })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      setItem('')
      onMutated()
    })
  }

  function onRemove(i: number) {
    adminRemoveGapItem(bookingId, i).then((r) => {
      if (!r.ok) toast.error(r.error)
      onMutated()
    })
  }

  return (
    <div>
      {gaps.length > 0 && (
        <table className="w-full text-sm mb-3">
          <tbody>
            {gaps.map((g, i) => (
              <tr key={i} className="border-b border-border/60">
                <td className="px-3 py-2">{g.i}</td>
                <td className="px-3 py-2 text-right">
                  <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
                    g.p === 'High' ? 'bg-red-100 text-red-800' :
                    g.p === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-stone-100 text-stone-700'
                  }`}>
                    {g.p}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <button type="button" onClick={() => onRemove(i)} className="text-muted-foreground hover:text-rust">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {canManage && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Cream turtleneck"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-1 min-w-[140px] h-9 px-3 text-sm border border-border"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="h-9 px-2 text-sm border border-border">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button type="button" onClick={onAdd} disabled={adding} className="inline-flex items-center gap-1 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60">
            {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
            Add
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Finish card ─────────────────────────────────────────────────────────

function FinishCard({
  bookingId,
  auditsCount,
  photosCount,
  gapsCount,
  elapsed,
  canManage,
  onMutated,
}: {
  bookingId: string
  auditsCount: number
  photosCount: number
  gapsCount: number
  elapsed: number
  canManage: boolean
  onMutated: () => void
}) {
  const [finishing, startFinish] = useTransition()
  const canFinish = auditsCount > 0 && photosCount > 0 && gapsCount > 0

  function onFinish() {
    startFinish(async () => {
      const r = await adminFinishSession(bookingId)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Session finished. Review and send today.', { duration: 5000 })
      onMutated()
    })
  }

  return (
    <div className="border border-border bg-card p-5">
      <button
        type="button"
        onClick={onFinish}
        disabled={!canFinish || finishing || !canManage}
        className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60"
      >
        {finishing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        Finish session and prepare summary
      </button>
      <p className="text-xs text-muted-foreground mt-3">
        Needs at least one audit item, one outfit photo and one gap item.
        ({auditsCount} audit, {photosCount} photos, {gapsCount} gaps · {Math.floor(elapsed / 60)}h {elapsed % 60}m elapsed)
      </p>
    </div>
  )
}

// ─── Primitives ─────────────────────────────────────────────────────────

function Card({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm">{title}</h3>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm border-b border-border/40 pb-2 mb-2 last:border-0 last:mb-0">
      <span className="w-32 flex-shrink-0 text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
        {label}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  )
}
