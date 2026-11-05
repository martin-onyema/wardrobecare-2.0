'use client'

/**
 * Admin-side "Cannot keep date" panel for a paid consultation.
 *
 * Lets the admin enter:
 *   - Why we cannot keep the slot (free text)
 *   - Up to 3 new proposed slots (date + time)
 *
 * Calls `adminProposeReschedule`. On success, the booking's status flips
 * to RESCHEDULE_PROPOSED and the customer sees a banner on their booking
 * page + a link to choose one of the new slots.
 *
 * Also includes a "Manually set a new slot" mode for the case where the
 * customer has already submitted free-text suggestions and the admin
 * has confirmed a date with them out-of-band (phone/WhatsApp). This
 * calls `adminManualReschedule` and immediately sets RESCHEDULED.
 */

import { useState, useTransition } from 'react'
import { Loader2, AlertCircle, CalendarCheck } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminProposeReschedule,
  adminManualReschedule,
} from '@/actions/consultations'
import { CONSULTATION_SLOT_TIMES } from '@/lib/consultations-constants'

type Props = {
  bookingId: string
  bookingNumber: string
  // When true, the panel renders expanded with the manual-reschedule mode
  // preselected — used when the booking is already RESCHEDULE_PROPOSED
  // (i.e. we already proposed and the customer replied with suggestions).
  defaultMode?: 'propose' | 'manual'
}

type Mode = 'propose' | 'manual'

export function AdminProposeReschedule({ bookingId, bookingNumber, defaultMode = 'propose' }: Props) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [reason, setReason] = useState('')
  const [slots, setSlots] = useState<{ date: string; time: string }[]>([
    { date: '', time: CONSULTATION_SLOT_TIMES[0] },
    { date: '', time: CONSULTATION_SLOT_TIMES[0] },
    { date: '', time: CONSULTATION_SLOT_TIMES[0] },
  ])
  const [manualDate, setManualDate] = useState('')
  const [manualTime, setManualTime] = useState<string>(CONSULTATION_SLOT_TIMES[0])
  const [manualNote, setManualNote] = useState('')
  const [submitting, startSubmit] = useTransition()

  const updateSlot = (i: number, patch: Partial<{ date: string; time: string }>) =>
    setSlots((prev) => prev.map((s, j) => (i === j ? { ...s, ...patch } : s)))

  const onPropose = () => {
    const validSlots = slots.filter((s) => s.date && s.time)
    if (reason.trim().length < 3) {
      toast.error('Please tell the customer why we cannot keep the date.', { duration: 6000 })
      return
    }
    if (validSlots.length === 0) {
      toast.error('Please propose at least one new slot.', { duration: 6000 })
      return
    }
    startSubmit(async () => {
      const r = await adminProposeReschedule({
        bookingId,
        reason: reason.trim(),
        slots: validSlots,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Reschedule proposed for ${bookingNumber}. Customer has been notified.`, { duration: 6000 })
      window.location.reload()
    })
  }

  const onManual = () => {
    if (!manualDate) {
      toast.error('Please pick a date.', { duration: 6000 })
      return
    }
    if (!manualTime) {
      toast.error('Please pick a time.', { duration: 6000 })
      return
    }
    startSubmit(async () => {
      const r = await adminManualReschedule({
        bookingId,
        slotDate: manualDate,
        slotTime: manualTime,
        note: manualNote.trim() || undefined,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Booking ${bookingNumber} moved to ${r.slotDate} at ${r.slotTime}.`, { duration: 6000 })
      window.location.reload()
    })
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-start gap-2 border border-rust/40 bg-rust/5 text-rust px-4 py-3 text-xs uppercase tracking-[0.18em] hover:bg-rust/10 transition-colors"
      >
        <AlertCircle className="h-4 w-4" />
        Cannot keep this date — propose reschedule
      </button>
    )
  }

  return (
    <div className="border border-rust/40 bg-rust/5 rounded-md">
      <div className="px-5 py-4 border-b border-rust/30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-rust">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.18em] font-medium">
            Reschedule this booking
          </span>
        </div>
        {/* Mode switcher — only show both buttons if the booking hasn't
            already had a reschedule proposed. If the booking is already
            RESCHEDULE_PROPOSED, defaultMode === 'manual' makes the manual
            form preselected and we hide the propose option (you can't
            propose twice — the existing proposal is still pending). */}
        {defaultMode === 'propose' && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setMode('propose')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border ${
                mode === 'propose'
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Propose slots
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border ${
                mode === 'manual'
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Set manually
            </button>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {mode === 'propose' && (
          <>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Why can&apos;t we keep this date? (the customer will see this)
              </label>
              <textarea
                className="w-full min-h-[80px] px-4 py-3 text-sm bg-white border border-border focus:border-foreground outline-none resize-y"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Our stylist is called away on a fitting that day. Sorry for the change."
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Propose up to 3 new slots
              </label>
              <div className="space-y-2">
                {slots.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="date"
                      className="flex-1 h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none"
                      value={s.date}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => updateSlot(i, { date: e.target.value })}
                    />
                    <select
                      className="flex-1 h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none"
                      value={s.time}
                      onChange={(e) => updateSlot(i, { time: e.target.value })}
                    >
                      {CONSULTATION_SLOT_TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Empty rows are skipped. At least one slot is required.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="inline-flex items-center border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onPropose}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-rust/90 transition-colors disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Propose reschedule'
                )}
              </button>
            </div>
          </>
        )}

        {mode === 'manual' && (
          <>
            <div className="bg-secondary/60 border-l-4 border-camel px-4 py-3 text-xs text-foreground leading-relaxed" style={{ borderLeftWidth: '3px' }}>
              <strong>Manual reschedule</strong> — use this after you and the
              customer have agreed a new date out-of-band (e.g. on WhatsApp).
              The booking jumps straight to RESCHEDULED and the customer sees
              the new date immediately on their booking page.
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  New date
                </label>
                <input
                  type="date"
                  className="w-full h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none"
                  value={manualDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setManualDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  New time
                </label>
                <select
                  className="w-full h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none"
                  value={manualTime}
                  onChange={(e) => setManualTime(e.target.value)}
                >
                  {CONSULTATION_SLOT_TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Note (optional — for the audit trail)
              </label>
              <input
                className="w-full h-10 px-3 text-sm bg-white border border-border focus:border-foreground outline-none"
                value={manualNote}
                onChange={(e) => setManualNote(e.target.value)}
                placeholder="e.g. Customer said only Monday mornings work — confirmed Mon 17th 9am."
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={submitting}
                className="inline-flex items-center border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onManual}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-olive text-white px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-olive/90 transition-colors disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-3.5 w-3.5" />
                    Set new date
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
