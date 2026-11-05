import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AccountShell } from '@/components/account/account-shell'
import { requireUser } from '@/lib/session'
import { db } from '@/lib/db'
import { getConsultationByBookingNumber } from '@/actions/consultations'
import { ArrowRight, AlertCircle, CalendarClock } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Booking Detail',
  robots: { index: false, follow: false },
}

type Params = Promise<{ ref: string }>

const STATUS_LABEL: Record<string, string> = {
  HELD: 'Held — awaiting payment',
  PAID: 'Paid — awaiting our confirmation',
  CONFIRMED: 'Confirmed',
  RESCHEDULE_PROPOSED: 'Action needed — reschedule',
  RESCHEDULED: 'Rescheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

const STATUS_TONE: Record<string, string> = {
  HELD: 'text-muted-foreground',
  PAID: 'text-olive',
  CONFIRMED: 'text-olive',
  RESCHEDULE_PROPOSED: 'text-rust font-medium',
  RESCHEDULED: 'text-olive',
  COMPLETED: 'text-muted-foreground',
  CANCELLED: 'text-rust',
}

export default async function BookingDetailPage({ params }: { params: Params }) {
  const user = await requireUser()
  const { ref: bookingNumber } = await params

  const booking = await getConsultationByBookingNumber(bookingNumber)
  if (!booking) notFound()

  // Visibility: the logged-in user must own this booking.
  const raw = await db.consultationBooking.findUnique({
    where: { bookingNumber },
    select: { userId: true },
  })
  if (!raw || raw.userId !== user.id) {
    redirect('/account/bookings')
  }

  const slotDate = new Date(booking.slotDate).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const summary: [string, string][] = [
    ['Reference', booking.bookingNumber],
    ['Service', 'Wardrobe & Style Consultation'],
    ['For', booking.recipientName + (booking.recipientRelation ? ` (${booking.recipientRelation})` : '')],
    ['When', `${slotDate}, ${booking.slotTime}`],
    ['How', booking.sessionMode + (booking.sessionMode === 'In-person' && booking.location ? ` · ${booking.location}` : '')],
    ['Status', STATUS_LABEL[booking.status] ?? booking.status],
    ['Total paid', `₦${booking.amountPaid.toLocaleString()}`],
  ]

  const hasOriginal = booking.originalSlotDate && booking.originalSlotTime
  const originalDateLabel = hasOriginal
    ? new Date(booking.originalSlotDate!).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : null

  const titleShort = booking.bookingNumber
  const descriptionShort = `${slotDate} · ${booking.slotTime}`

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <AccountShell
          title={titleShort}
          description={descriptionShort}
          actions={
            <Link
              href="/account/bookings"
              className="hidden sm:inline-flex items-center gap-2 border border-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              &larr; All bookings
            </Link>
          }
        >
          <div className="space-y-6">
            {/* Action banner — reschedule proposed */}
            {booking.status === 'RESCHEDULE_PROPOSED' && (
              <div className="bg-rust/10 border-l-4 border-rust px-5 py-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-rust mt-0.5" />
                  <div className="flex-1">
                    <h2 className="font-display text-lg text-foreground mb-1">
                      We need to move your session
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {booking.rescheduleReason && booking.rescheduleReason.split('\n')[0]}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your payment of <strong className="text-foreground">₦{booking.amountPaid.toLocaleString()}</strong>{' '}
                      is safe and still applies.
                    </p>
                    <Link
                      href={`/account/bookings/${booking.bookingNumber}/reschedule`}
                      className="mt-4 inline-flex items-center gap-2 bg-rust text-rust-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
                    >
                      Choose a new date
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Rescheduled history (if any) */}
            {hasOriginal && booking.status === 'RESCHEDULED' && (
              <div className="bg-secondary/40 border-l-4 border-camel px-5 py-4 flex items-start gap-3 rounded-r-lg" style={{ borderLeftWidth: '3px' }}>
                <CalendarClock className="h-5 w-5 flex-shrink-0 text-camel mt-0.5" />
                <div className="flex-1 text-sm text-foreground leading-relaxed">
                  <strong>Rescheduled from</strong>{' '}
                  {originalDateLabel}, {booking.originalSlotTime}.
                  Your payment of ₦{booking.amountPaid.toLocaleString()} stayed valid.
                </div>
              </div>
            )}

            {/* Summary card */}
            <dl className="border border-border rounded-lg bg-card overflow-hidden">
              {summary.map(([label, value], i) => (
                <div
                  key={label}
                  className={`grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-5 md:px-7 py-4 ${
                    i < summary.length - 1 ? 'border-b border-border/60' : ''
                  }`}
                >
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5">
                    {label}
                  </dt>
                  <dd className={`text-sm text-foreground ${label === 'Reference' ? 'font-mono' : ''}`}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* What happens next timeline */}
            {booking.status === 'PAID' && (
              <div className="border border-border rounded-lg bg-secondary/40 p-6 md:p-8">
                <h2 className="font-display text-lg mb-5">What happens next</h2>
                <ol className="relative pl-6 space-y-3 border-l-2 border-border">
                  <li className="relative text-sm text-muted-foreground leading-relaxed">
                    <span className="absolute -left-[31px] top-1.5 h-[10px] w-[10px] rounded-full bg-camel ring-4 ring-secondary/40" />
                    Within 24 hours we confirm your date by{' '}
                    {booking.contactMethod.toLowerCase()} and tell you who your stylist is.
                  </li>
                  <li className="relative text-sm text-muted-foreground leading-relaxed">
                    <span className="absolute -left-[31px] top-1.5 h-[10px] w-[10px] rounded-full bg-camel ring-4 ring-secondary/40" />
                    If your date is not available, we message you at once with new dates to choose from.
                    Nothing more to pay.
                  </li>
                  <li className="relative text-sm text-muted-foreground leading-relaxed">
                    <span className="absolute -left-[31px] top-1.5 h-[10px] w-[10px] rounded-full bg-camel ring-4 ring-secondary/40" />
                    Your session: 2 hours, ending with your outfits photographed and numbered.
                  </li>
                  <li className="relative text-sm text-muted-foreground leading-relaxed">
                    <span className="absolute -left-[31px] top-1.5 h-[10px] w-[10px] rounded-full bg-camel ring-4 ring-secondary/40" />
                    The same day you receive your Wardrobe Map and Gap List on WhatsApp, and
                    your full summary in your account.
                  </li>
                </ol>
              </div>
            )}

            {/* Status pill */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Current status
              </span>
              <span className={`text-sm ${STATUS_TONE[booking.status] ?? 'text-muted-foreground'}`}>
                {STATUS_LABEL[booking.status] ?? booking.status}
              </span>
            </div>

            {/* Contact / actions */}
            <div className="flex flex-col sm:flex-row justify-start gap-3 pt-4">
              <Link
                href="/account/bookings"
                className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
              >
                &larr; All bookings
              </Link>
              <Link
                href="/services/wardrobe-consultation/book"
                className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
              >
                Book another session
              </Link>
            </div>
          </div>
        </AccountShell>
      </main>
      <Footer />
    </>
  )
}
