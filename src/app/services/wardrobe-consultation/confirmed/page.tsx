import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

// Confirmation is a transactional utility page — keep it out of search indexes.
export const metadata: Metadata = {
  title: 'Booking Received — Wardrobecare',
  description: 'Your Wardrobe & Style Consultation booking has been received.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/services/wardrobe-consultation/confirmed' },
}

type SearchParams = Promise<{ ref?: string; for?: string; mode?: string; amount?: string }>

export default async function ConfirmedPage({ searchParams }: { searchParams: SearchParams }) {
  const { ref, for: forName, mode, amount } = await searchParams
  const amountNum = parseInt(amount ?? '45000', 10) || 45000

  const summary: [string, string][] = [
    ['Service', 'Wardrobe & Style Consultation'],
    ['For', forName || '—'],
    ['Session mode', mode || '—'],
    ['Session', 'First two hours'],
    ['Reference no.', ref || '—'],
    ['Total due', `₦${amountNum.toLocaleString()}`],
  ]

  const nextSteps = [
    'A stylist reviews your booking (within 24 hours)',
    "We confirm the time and send a secure payment link via your preferred contact method",
    'Once paid, the session is locked in — you\'re ready to go',
    'Additional hours beyond the first two are billed at +₦10,000/hr at the session itself',
  ]

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
          {/* Checkmark — olive, matching the confirmation design */}
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-background">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </div>

          <h1 className="font-display text-4xl md:text-6xl leading-[1] tracking-[-0.02em] text-balance">
            Your booking has been sent
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-5 max-w-md mx-auto leading-relaxed">
            We&apos;ve received your Wardrobe &amp; Style Consultation booking. A stylist will
            review it and reach out within 24 hours to confirm the time and send your payment link.
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
                <dd className="text-sm font-semibold text-foreground text-right">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Next steps */}
          <div className="mt-6 border border-border bg-secondary/40 text-left p-6 md:p-8">
            <h2 className="font-display text-lg mb-4">What happens next</h2>
            <ol className="space-y-3">
              {nextSteps.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-[11px] tabular-nums text-muted-foreground/70 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
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
              href="/shop"
              className="inline-flex items-center justify-center bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
