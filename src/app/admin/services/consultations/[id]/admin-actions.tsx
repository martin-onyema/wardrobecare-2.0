'use client'

import { useTransition } from 'react'
import { Loader2, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { adminConfirmConsultation, adminCompleteConsultation } from '@/actions/consultations'

type Props = {
  bookingId: string
  bookingNumber: string
  status: string
}

export function AdminConsultationActions({ bookingId, bookingNumber, status }: Props) {
  const [confirming, startConfirm] = useTransition()
  const [completing, startComplete] = useTransition()

  const onConfirm = () => {
    startConfirm(async () => {
      const r = await adminConfirmConsultation(bookingId)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`${bookingNumber} confirmed. Customer will be notified.`, { duration: 6000 })
      window.location.reload()
    })
  }

  const onComplete = () => {
    startComplete(async () => {
      const r = await adminCompleteConsultation(bookingId)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`${bookingNumber} marked complete.`, { duration: 6000 })
      window.location.reload()
    })
  }

  const canConfirm = status === 'PAID' || status === 'RESCHEDULED'
  const canComplete = status === 'CONFIRMED'

  return (
    <div className="space-y-2">
      {canConfirm && (
        <button
          type="button"
          onClick={onConfirm}
          disabled={confirming}
          className="w-full inline-flex items-center justify-center gap-2 bg-olive text-olive-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] hover:bg-olive/90 transition-colors disabled:opacity-60"
          style={{ color: '#fff' }}
        >
          {confirming ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Confirming…
            </>
          ) : (
            <>
              <Check className="h-3.5 w-3.5" />
              Confirm date & assign stylist
            </>
          )}
        </button>
      )}
      {canComplete && (
        <button
          type="button"
          onClick={onComplete}
          disabled={completing}
          className="w-full inline-flex items-center justify-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-60"
        >
          {completing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Completing…
            </>
          ) : (
            <>
              <Check className="h-3.5 w-3.5" />
              Mark session completed
            </>
          )}
        </button>
      )}
      {!canConfirm && !canComplete && (
        <p className="text-xs text-muted-foreground px-1 py-2">
          No actions available for this status.
        </p>
      )}
      {confirming && (
        <p className="text-xs text-muted-foreground px-1 pt-1 flex items-center gap-1">
          <X className="h-3 w-3" /> Pressing confirm sends the customer a message — undo not available.
        </p>
      )}
    </div>
  )
}
