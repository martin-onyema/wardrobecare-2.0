import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { confirmConsultationPayment, getConsultationByBookingNumber } from '@/actions/consultations'

// Confirmation is a transactional utility page — keep it out of search indexes.
export const metadata: Metadata = {
  title: 'Booking Confirmed — Wardrobecare',
  description: 'Your Wardrobe & Style Consultation booking is confirmed.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/wardrobe-consultation/confirmed' },
}

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ reference?: string; ref?: string; trxref?: string }>

export default async function ConfirmedPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const reference = sp.reference ?? sp.trxref ?? sp.ref

  // ── Verify payment with Paystack ──
  // This is the secondary path. The webhook is the canonical truth, but
  // we still call verify so the customer sees the right state immediately
  // (the webhook may race or be delayed).
  let verifyError: string | null = null
  let bookingNumber: string | null = null
  let booking: Awaited<ReturnType<typeof getConsultationByBookingNumber>> = null

  if (reference) {
    const result = await confirmConsultationPayment(reference)
    if (!result.ok) {
      verifyError = result.error
    } else {
      bookingNumber = result.bookingNumber
      if (bookingNumber) booking = await getConsultationByBookingNumber(bookingNumber)
    }
  } else {
    verifyError = 'No payment reference found in the URL.'
  }

  // ── Failure state ──
  if (verifyError || !booking) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
            <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-rust/10 text-rust">
              <AlertCircle className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-[1] tracking-[-0.02em] text-balance mb-5">
              We couldn&apos;t confirm your payment
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
              {verifyError ??
                'Please wait a moment and check your bookings. If you were charged, contact us with the reference below and we will sort it out.'}
            </p>
            {reference && (
              <p className="text-xs text-muted-foreground mt-6 font-mono break-all">
                Reference: {reference}
              </p>
            )}

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services/wardrobe-consultation/book"
                className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
              >
                Try again
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
              >
                Back to site
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── Success state ──
  const slotDateLabel = new Date(booking.slotDate).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const summary: [string, string][] = [
    ['Status', 'Paid, awaiting our confirmation'],
    ['Service', 'Wardrobe & Style Consultation'],
    ['For', booking.recipientName || '—'],
    ['When', `${slotDateLabel}, ${booking.slotTime}`],
    ['How', booking.sessionMode + (booking.sessionMode === 'In-person' && booking.location ? ` · ${booking.location}` : '')],
    ['Reference', booking.bookingNumber],
    ['Total paid', `₦${booking.amountPaid.toLocaleString()}`],
  ]

  const nextSteps = [
    'Within 24 hours we confirm your date by ' +
      booking.contactMethod.toLowerCase() +
      ' and tell you who your stylist is.',
    'If your date is not available, we message you at once with new dates to choose from. Nothing more to pay.',
    'Your session: 2 hours, ending with your outfits photographed and numbered.',
    'The same day you receive your Wardrobe Map and Gap List on WhatsApp, and your full summary in your account.',
  ]

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
          {/* Checkmark — olive, matching the mockup confirmation design */}
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-background">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </div>

          <h1 className="font-display text-4xl md:text-5xl leading-[1] tracking-[-0.02em] text-balance">
            Payment received.
            <br />
            Your session is booked.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-5 max-w-md mx-auto leading-relaxed">
            We have received{' '}
            <strong className="text-foreground">₦{booking.amountPaid.toLocaleString()}</strong> for{' '}
            <strong className="text-foreground">
              {slotDateLabel}, {booking.slotTime}
            </strong>{' '}
            ({booking.sessionMode}). Reference{' '}
            <strong className="text-foreground font-mono">{booking.bookingNumber}</strong>.
          </p>

          {/* Summary card */}
          <dl className="mt-12 border border-border text-left">
            {summary.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-baseline justify-between gap-6 px-6 md:px-8 py-4 ${
                  i < summary.length - 1 ? 'border-b border-border/60' : ''
                }`}
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold text-foreground text-right">
                  {label === 'Reference' ? <span className="font-mono">{value}</span> : value}
                </dd>
              </div>
            ))}
          </dl>

          {/* What happens next — timeline */}
          <div className="mt-6 border border-border bg-secondary/40 text-left p-6 md:p-8">
            <h2 className="font-display text-lg mb-5">What happens next</h2>
            <ol className="relative pl-6 space-y-4 border-l-2 border-border">
              {nextSteps.map((s, i) => (
                <li
                  key={i}
                  className="relative text-sm text-muted-foreground leading-relaxed"
                >
                  {/* Bullet */}
                  <span className="absolute -left-[31px] top-1.5 h-[10px] w-[10px] rounded-full bg-camel ring-4 ring-secondary/40" />
                  {s}
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              Back to Services
            </Link>
            <Link
              href={`/account/bookings/${booking.bookingNumber}`}
              className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
            >
              View my booking
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
