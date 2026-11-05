import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { confirmPSPayment } from '@/actions/personal-shopping-customer'

export const metadata: Metadata = {
  title: 'Booking Confirmed — Wardrobecare',
  description: 'Your Personal Shopping request has been received.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/personal-shopping/confirmed' },
}

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ reference?: string; trxref?: string; ref?: string }>

export default async function PSConfirmedPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const reference = sp.reference ?? sp.trxref ?? sp.ref

  let verifyError: string | null = null
  let psRef: string | null = null

  if (reference) {
    const result = await confirmPSPayment(reference)
    if (!result.ok) {
      verifyError = result.error
    } else {
      psRef = result.ref
    }
  } else {
    verifyError = 'No payment reference found in the URL.'
  }

  if (verifyError || !psRef) {
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
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              {verifyError ?? 'Please wait a moment and check your bookings. If you were charged, contact us with the reference below.'}
            </p>
            {reference && (
              <p className="text-xs text-muted-foreground mt-6 font-mono break-all">Reference: {reference}</p>
            )}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/services/personal-shopping/book" className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
                Try again
              </Link>
              <Link href="/shop" className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors">
                Back to site
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-background">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl leading-[1] tracking-[-0.02em] text-balance">
            Payment received.
            <br />
            Your request is in.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-5 max-w-md mx-auto leading-relaxed">
            We have received your Personal Shopping request. A stylist will
            accept it and build your shortlist within 24 hours.
            Reference <strong className="text-foreground font-mono">{psRef}</strong>.
          </p>

          <dl className="mt-12 border border-border text-left max-w-md mx-auto">
            <div className="flex items-baseline justify-between gap-6 px-6 py-4 border-b border-border/60">
              <dt className="text-sm text-muted-foreground">Service</dt>
              <dd className="text-sm font-semibold">Personal Shopping</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 px-6 py-4 border-b border-border/60">
              <dt className="text-sm text-muted-foreground">Reference</dt>
              <dd className="text-sm font-semibold font-mono">{psRef}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 px-6 py-4">
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd className="text-sm font-semibold">Paid, awaiting acceptance</dd>
            </div>
          </dl>

          <div className="mt-6 border border-border bg-secondary/40 text-left p-6 max-w-md mx-auto">
            <h2 className="font-display text-lg mb-4">What happens next</h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-[11px] tabular-nums text-muted-foreground/70 mt-0.5">01</span>
                A stylist accepts your request within 24 hours.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-[11px] tabular-nums text-muted-foreground/70 mt-0.5">02</span>
                You receive a shortlist with photos, prices and stylist notes.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-[11px] tabular-nums text-muted-foreground/70 mt-0.5">03</span>
                You pick what you want to keep. You only pay for those items.
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-[11px] tabular-nums text-muted-foreground/70 mt-0.5">04</span>
                Items are delivered or brought to your fitting.
              </li>
            </ol>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services" className="inline-flex items-center justify-center border border-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
              Back to Services
            </Link>
            <Link href="/shop" className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
