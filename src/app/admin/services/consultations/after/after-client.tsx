'use client'

/**
 * After the session client.
 *
 * Layout (matches mockup 51):
 *   Left:  List of finished/sent sessions with their status
 *   Right: Selected session detail:
 *          - Checklist (audit count, outfit count, gap count)
 *          - WhatsApp message preview
 *          - "Send to client now" button (or "Sent" banner if already sent)
 *          - Scheduled gap reminders (2-3 weeks, 6 weeks, 10-12 weeks)
 *          - "Create Personal Shopping brief from gap list"
 *          - "Book a return visit"
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Check, MessageSquare, ShoppingBag, RotateCcw, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminSendSummary,
  adminMarkPersonalShoppingBrief,
  adminBookReturnVisit,
} from '@/actions/consultations-workflow'
import { statusPill, fmtDateLabel, fmtNGN } from '../_shared'

type Session = {
  id: string
  bookingNumber: string
  bookerName: string
  bookerPhone: string
  contactMethod: string
  slotDate: string
  slotTime: string
  sessionMode: string
  status: string
  summarySentAt: string | null
  personalShoppingBriefAt: string | null
  auditItems: string | unknown[] | null
  outfitPhotos: string | unknown[] | null
  gapItems: string | unknown[] | null
  elapsedMinutes: number
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

type Props = {
  canManage: boolean
  sessions: Session[]
  initialSelectedId: string | null
}

export function AfterClient({ canManage, sessions, initialSelectedId }: Props) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && sessions.some((b) => b.id === initialSelectedId) ? initialSelectedId : sessions[0]?.id ?? null,
  )

  if (sessions.length === 0) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <Check className="h-10 w-10 mx-auto text-muted-foreground mb-3" strokeWidth={1.5} />
        <h3 className="font-display text-lg mb-2">No finished sessions waiting</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Once you finish a session in the Session workspace tab, it shows up
          here so you can send the Wardrobe Map and Gap List.
        </p>
      </div>
    )
  }

  const selected = sessions.find((b) => b.id === selectedId) ?? sessions[0]

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
      {/* Left: list */}
      <div>
        <table className="w-full text-sm border border-border bg-card">
          <thead className="bg-secondary/40">
            <tr>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Client</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Session</th>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((b) => (
              <tr
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`cursor-pointer border-t border-border/60 hover:bg-secondary/40 ${
                  selectedId === b.id ? 'bg-secondary/80' : ''
                }`}
              >
                <td className="px-3 py-2.5 font-medium">{b.bookerName}</td>
                <td className="px-3 py-2.5 text-xs">
                  {fmtDateLabel(b.slotDate).split(' ').slice(0, 3).join(' ')}, {b.slotTime}
                </td>
                <td className="px-3 py-2.5">{statusPill(b.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 border-l-4 border-camel bg-secondary/40 px-4 py-3 text-sm text-foreground leading-relaxed">
          <strong className="text-rust">Same-day rule:</strong> the Wardrobe Map
          and Gap List go to the client on WhatsApp the day of the session.
          Anything not sent by 8 PM shows as overdue here.
        </div>
      </div>

      {/* Right: detail */}
      <div>
        {selected && (
          <AfterDetail
            session={selected}
            canManage={canManage}
            onMutated={() => router.refresh()}
          />
        )}
      </div>
    </div>
  )
}

function AfterDetail({
  session,
  canManage,
  onMutated,
}: {
  session: Session
  canManage: boolean
  onMutated: () => void
}) {
  const [sending, startSend] = useTransition()
  const [psing, startPs] = useTransition()
  const [returnOpen, setReturnOpen] = useState(false)

  const audits = parseArr(session.auditItems)
  const photos = parseArr(session.outfitPhotos)
  const gaps = parseArr(session.gapItems) as Array<{ i: string; p: string }>

  const firstName = session.bookerName.split(' ')[0]
  const whatsappPreview = `Hello ${firstName}, thank you for your session today. Your Wardrobe Map (${photos.length} numbered outfits) and Gap List (${gaps.length} items: ${gaps.map((g) => g.i).join(', ')}) are attached. Your full summary is in your account at wardrobecare.com.ng/account/bookings/${session.bookingNumber}. When you are ready, we can source your gap list for you through Personal Shopping.`

  function onSend() {
    startSend(async () => {
      const r = await adminSendSummary(session.id)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Sent. Gap reminders are scheduled.', { duration: 5000 })
      onMutated()
    })
  }

  function onPsBrief() {
    startPs(async () => {
      const r = await adminMarkPersonalShoppingBrief(session.id)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Personal Shopping brief created with ${r.gapCount} gap items.`, { duration: 5000 })
      onMutated()
    })
  }

  const isSent = session.status === 'COMPLETED' && !!session.summarySentAt

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-base">
          {session.bookerName} · {fmtDateLabel(session.slotDate)}, {session.slotTime}
        </h3>
        {statusPill(session.status)}
      </div>

      <div className="p-5 space-y-4 text-sm">
        {/* Checklist */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Checklist
          </p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-olive" />
              Summary reviewed ({audits.length} {audits.length === 1 ? 'audit item' : 'audit items'})
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-olive" />
              Wardrobe Map ready ({photos.length} {photos.length === 1 ? 'numbered outfit photo' : 'numbered outfit photos'})
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-olive" />
              Gap List ready ({gaps.length} {gaps.length === 1 ? 'item' : 'items'})
            </li>
          </ul>
        </div>

        {/* WhatsApp preview */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            WhatsApp message to client
          </p>
          <div className="bg-olive/5 border border-olive/30 px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed">
            {whatsappPreview}
          </div>
        </div>

        {/* Send / sent */}
        {isSent ? (
          <>
            <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
              Sent. Summary is live in the client&apos;s account.
              {session.summarySentAt && (
                <span className="text-xs text-muted-foreground ml-1">
                  ({new Date(session.summarySentAt).toLocaleString('en-GB')})
                </span>
              )}
            </div>
            {/* Reminders + PS + return visit */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Scheduled gap reminders
              </p>
              <ul className="space-y-2">
                <li className="border-l-2 border-border pl-3">
                  <p className="text-sm">About 2 to 3 weeks: soft nudge naming the first gap</p>
                  <p className="text-xs text-muted-foreground">Cancelled if they buy it</p>
                </li>
                <li className="border-l-2 border-border pl-3">
                  <p className="text-sm">About 6 weeks: offer to handle it for them</p>
                  <p className="text-xs text-muted-foreground">Cancelled if they buy it</p>
                </li>
                <li className="border-l-2 border-border pl-3">
                  <p className="text-sm">About 10 to 12 weeks: final mention, then normal re-engagement</p>
                  <p className="text-xs text-muted-foreground">No repeat consultation prompt</p>
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onPsBrief}
                disabled={psing || !canManage || !!session.personalShoppingBriefAt}
                className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 transition-colors disabled:opacity-60"
              >
                {psing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                {session.personalShoppingBriefAt ? 'PS brief created' : 'Create Personal Shopping brief from gap list'}
              </button>
              <button
                type="button"
                onClick={() => setReturnOpen(true)}
                disabled={!canManage}
                className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-60"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Book a return visit
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onSend}
              disabled={sending || !canManage}
              className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60"
            >
              {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageSquare className="h-3.5 w-3.5" />}
              Send to client now
            </button>
          </div>
        )}
      </div>

      {returnOpen && (
        <ReturnVisitModal
          session={session}
          onClose={() => setReturnOpen(false)}
          onBooked={() => {
            setReturnOpen(false)
            onMutated()
          }}
        />
      )}
    </div>
  )
}

function ReturnVisitModal({
  session,
  onClose,
  onBooked,
}: {
  session: Session
  onClose: () => void
  onBooked: () => void
}) {
  const [type, setType] = useState<'dropoff' | 'fitting'>('dropoff')
  const [submitting, startSubmit] = useTransition()

  // Fee preview (drop-off only = 50% of base, fitting = full)
  // Hard-coded here; the real values come from ConsultationServiceSetting.
  const baseFee = 45000
  const dropFee = Math.round(baseFee * 0.5)

  function onBook() {
    startSubmit(async () => {
      const r = await adminBookReturnVisit({ bookingId: session.id, type })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Booking and payment link sent to the client.', { duration: 5000 })
      onBooked()
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card max-w-md w-full p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Return visit for {session.bookerName}</h3>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Choose what the visit is for. Price follows the rate card.
        </p>
        <label className={`flex items-center gap-3 border p-3 mb-2 cursor-pointer ${type === 'dropoff' ? 'border-olive bg-olive/5' : 'border-border'}`}>
          <input
            type="radio"
            name="rv"
            checked={type === 'dropoff'}
            onChange={() => setType('dropoff')}
          />
          <span className="flex-1 text-sm">
            Drop-off and confirmation only. Selection already made.{' '}
            <strong>{fmtNGN(dropFee)}</strong> (50%)
          </span>
        </label>
        <label className={`flex items-center gap-3 border p-3 mb-4 cursor-pointer ${type === 'fitting' ? 'border-olive bg-olive/5' : 'border-border'}`}>
          <input
            type="radio"
            name="rv"
            checked={type === 'fitting'}
            onChange={() => setType('fitting')}
          />
          <span className="flex-1 text-sm">
            With a fitting. Full session rate <strong>{fmtNGN(baseFee)}</strong> for 2 hours
          </span>
        </label>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button
            type="button"
            onClick={onBook}
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Send booking link to client
          </button>
        </div>
      </div>
    </div>
  )
}
