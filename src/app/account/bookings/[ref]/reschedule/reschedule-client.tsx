'use client'

/**
 * Customer-facing reschedule page.
 *
 * Reached when admin marks a paid booking as RESCHEDULE_PROPOSED.
 * The customer sees:
 *   - The original booked slot
 *   - The reason we cannot keep it
 *   - Up to 3 alternative slots (radio choices)
 *   - A "None of these suit me" option that reveals a textarea for
 *     the customer to suggest their own dates.
 *
 * On submit:
 *   - If they picked one of our proposals → `acceptRescheduleSlot`
 *     updates the booking, sets status RESCHEDULED.
 *   - If they chose "none of these" → `submitRescheduleSuggestion`
 *     stores their free-text reply. We show a "Thank you" screen.
 */

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import {
  acceptRescheduleSlot,
  submitRescheduleSuggestion,
} from '@/actions/consultations'

type ProposedSlot = { date: string; time: string }

export function RescheduleClient({
  bookingNumber,
  originalDateLabel,
  originalTime,
  sessionMode,
  reason,
  slots,
  contactMethod,
}: {
  bookingNumber: string
  originalDateLabel: string
  originalTime: string
  sessionMode: string
  reason: string
  slots: ProposedSlot[]
  contactMethod: string
}) {
  const router = useRouter()
  const [pick, setPick] = useState<number>(-1) // index into slots, or 999 for "none of these"
  const [suggestion, setSuggestion] = useState('')
  const [submitting, startSubmit] = useTransition()

  const reasonLine = (reason ?? '').split('\n')[0] // only the original reason, not appended customer replies

  const fmtSlot = (s: ProposedSlot) => {
    const [y, m, d] = s.date.split('-').map(Number)
    const dt = new Date(y, m - 1, d)
    const label = dt.toLocaleString('en', { weekday: 'long', day: 'numeric', month: 'long' })
    return `${label}, ${s.time}`
  }

  const onSubmit = () => {
    if (pick === -1) {
      toast.error('Please pick one of the proposed dates or "None of these suit me".', {
        duration: 6000,
      })
      return
    }
    startSubmit(async () => {
      if (pick === 999) {
        const r = await submitRescheduleSuggestion(bookingNumber, suggestion)
        if (!r.ok) {
          toast.error(r.error, { duration: 8000 })
          return
        }
        // Show thank-you screen — we use a toast + refresh because the
        // server-side `submitRescheduleSuggestion` does not change the
        // booking status, so the page would still show the picker.
        toast.success('Got it. We will reply shortly.', { duration: 6000 })
        // Push a query-state so the same page renders the thank-you view.
        router.push(`/account/bookings/${bookingNumber}?thanks=1`)
      } else {
        const r = await acceptRescheduleSlot(bookingNumber, pick)
        if (!r.ok) {
          toast.error(r.error, { duration: 8000 })
          return
        }
        toast.success('New date confirmed.', { duration: 6000 })
        router.push(`/account/bookings/${bookingNumber}?rescheduled=1`)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Warning block */}
      <div className="bg-rust/10 border-l-4 border-rust px-5 py-4">
        <p className="text-sm text-foreground leading-relaxed">
          <strong>
            {originalDateLabel}, {originalTime} is no longer available.
          </strong>{' '}
          Our stylist cannot keep that slot. We are sorry for the change.
          Please choose one of these new times.
        </p>
        {reasonLine && (
          <p className="text-xs text-muted-foreground mt-3 italic">
            {reasonLine}
          </p>
        )}
      </div>

      {/* Proposed slots */}
      <div className="space-y-2.5">
        {slots.map((s, i) => {
          const selected = pick === i
          return (
            <button
              key={`${s.date}|${s.time}`}
              type="button"
              onClick={() => setPick(i)}
              className={`w-full text-left border-1.5 p-4 flex items-start gap-3 transition-colors ${
                selected
                  ? 'border-olive bg-olive/5'
                  : 'border-border hover:border-foreground'
              }`}
              style={{ borderWidth: '1.5px' }}
            >
              <span
                className={`mt-0.5 h-4 w-4 rounded-full border flex-shrink-0 ${
                  selected ? 'border-olive bg-olive' : 'border-border'
                }`}
              >
                {selected && <Check className="h-3 w-3 text-background mx-auto" />}
              </span>
              <span className="flex-1 text-sm text-foreground">
                {fmtSlot(s)} <span className="text-muted-foreground">· {sessionMode}</span>
              </span>
            </button>
          )
        })}

        {/* None of these suit me */}
        <button
          type="button"
          onClick={() => setPick(999)}
          className={`w-full text-left border-1.5 p-4 flex items-start gap-3 transition-colors ${
            pick === 999 ? 'border-olive bg-olive/5' : 'border-border hover:border-foreground'
          }`}
          style={{ borderWidth: '1.5px' }}
        >
          <span
            className={`mt-0.5 h-4 w-4 rounded-full border flex-shrink-0 ${
              pick === 999 ? 'border-olive bg-olive' : 'border-border'
            }`}
          >
            {pick === 999 && <Check className="h-3 w-3 text-background mx-auto" />}
          </span>
          <span className="flex-1 text-sm text-foreground">
            None of these suit me. I will suggest other dates.
          </span>
        </button>
      </div>

      {/* Free-text textarea when "none of these" is selected */}
      {pick === 999 && (
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Tell us the days and times that work for you
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 text-sm bg-transparent border border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground/60 resize-y"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="e.g. Any weekday morning from the 17th onwards, or Saturday afternoons."
          />
          <p className="text-xs text-muted-foreground mt-2">
            We will reply within a few hours via {contactMethod.toLowerCase()} to confirm a new date.
          </p>
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || (pick === 999 && suggestion.trim().length < 3)}
          className="inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : pick === 999 ? (
            'Send my suggestions'
          ) : (
            'Confirm new date'
          )}
        </button>
      </div>
    </div>
  )
}
