import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AccountShell } from '@/components/account/account-shell'
import { requireUser } from '@/lib/session'
import { db } from '@/lib/db'
import { getConsultationByBookingNumber } from '@/actions/consultations'
import { RescheduleClient } from './reschedule-client'
import { Check } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Reschedule Booking',
  robots: { index: false, follow: false },
}

type Params = Promise<{ ref: string }>
type SearchParams = Promise<{ thanks?: string; rescheduled?: string }>

// The booking now returns `rescheduleOffers` (from the RescheduleOffer table)
// instead of the old `proposedSlots` JSON column. Each offer has
// { slotDate: string (YYYY-MM-DD), slotTime: string, offeredAt, chosenAt, ... }.
function mapOffers(
  offers: Array<{ slotDate: string; slotTime: string; chosenAt: string | null }>,
): Array<{ date: string; time: string }> {
  // Only show offers that haven't been chosen yet
  return offers
    .filter((o) => !o.chosenAt)
    .map((o) => ({ date: o.slotDate, time: o.slotTime }))
}

export default async function RescheduleBookingPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const user = await requireUser()
  const { ref: bookingNumber } = await params
  const sp = await searchParams

  const booking = await getConsultationByBookingNumber(bookingNumber)
  if (!booking) notFound()

  // Visibility check
  const raw = await db.consultationBooking.findUnique({
    where: { bookingNumber },
    select: { userId: true },
  })
  if (!raw || raw.userId !== user.id) {
    redirect('/account/bookings')
  }

  const originalDateLabel = booking.originalSlotDate
    ? new Date(booking.originalSlotDate).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : new Date(booking.slotDate).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
  const originalTime = booking.originalSlotTime ?? booking.slotTime

  // ── Thank-you view (customer submitted free-text suggestions) ──
  if (sp.thanks === '1') {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <AccountShell title="Reschedule" description={booking.bookingNumber}>
            <div className="text-center max-w-xl mx-auto py-10">
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-background">
                <Check className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl tracking-[-0.01em] mb-3">
                Thank you. We have your suggestions.
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                A team member will confirm a new date by{' '}
                {booking.contactMethod.toLowerCase()} shortly. Your payment
                of ₦{booking.amountPaid.toLocaleString()} is kept against{' '}
                <span className="font-mono">{booking.bookingNumber}</span>.
              </p>
              <div className="mt-12">
                <Link
                  href={`/account/bookings/${booking.bookingNumber}`}
                  className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
                >
                  Back to my booking
                </Link>
              </div>
            </div>
          </AccountShell>
        </main>
        <Footer />
      </>
    )
  }

  // ── New date confirmed view ──
  if (sp.rescheduled === '1') {
    const newDateLabel = new Date(booking.slotDate).toLocaleString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <AccountShell title="Reschedule" description={booking.bookingNumber}>
            <div className="text-center max-w-xl mx-auto py-10">
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-background">
                <Check className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl tracking-[-0.01em] mb-3">
                New date confirmed
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                <strong className="text-foreground">
                  {newDateLabel}, {booking.slotTime}
                </strong>{' '}
                ({booking.sessionMode}). We have updated your booking{' '}
                <span className="font-mono">{booking.bookingNumber}</span>{' '}
                and will remind you the day before.
              </p>
              <div className="mt-12">
                <Link
                  href={`/account/bookings/${booking.bookingNumber}`}
                  className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
                >
                  View my booking
                </Link>
              </div>
            </div>
          </AccountShell>
        </main>
        <Footer />
      </>
    )
  }

  // ── Default: show the picker ──
  // If the booking is no longer NEEDS_NEW_DATE (the customer already
  // accepted a slot or admin cancelled the proposal), bounce to the
  // detail page so they don't see an empty picker.
  if (booking.status !== 'NEEDS_NEW_DATE') {
    redirect(`/account/bookings/${booking.bookingNumber}`)
  }

  const slots = mapOffers(booking.rescheduleOffers ?? [])

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <AccountShell title="Reschedule" description={booking.bookingNumber}>
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-3">
              Booking {booking.bookingNumber} — action needed
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-3">
              We need to move your session
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Your payment of <strong className="text-foreground">₦{booking.amountPaid.toLocaleString()}</strong>{' '}
              is safe and still applies.
            </p>

            {slots.length === 0 ? (
              <div className="bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm text-foreground leading-relaxed rounded-r-lg" style={{ borderLeftWidth: '3px' }}>
                We have not proposed any new slots yet. Please check back shortly, or
                message us and we will reply within a few hours.
              </div>
            ) : (
              <RescheduleClient
                bookingNumber={booking.bookingNumber}
                originalDateLabel={originalDateLabel}
                originalTime={originalTime}
                sessionMode={booking.sessionMode}
                reason={booking.rescheduleReason ?? ''}
                slots={slots}
                contactMethod={booking.contactMethod}
              />
            )}
          </div>
        </AccountShell>
      </main>
      <Footer />
    </>
  )
}
