import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AccountShell } from '@/components/account/account-shell'
import { requireUser } from '@/lib/session'
import { db } from '@/lib/db'
import { ArrowRight, CalendarCheck, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'My Bookings',
  robots: { index: false, follow: false },
}

const STATUS_LABEL: Record<string, string> = {
  HELD: 'Held — awaiting payment',
  PAID: 'Paid — awaiting our confirmation',
  CONFIRMED: 'Confirmed',
  NEEDS_NEW_DATE: 'Action needed — reschedule',
  IN_SESSION: 'Session in progress',
  COMPLETED: 'Summary being prepared',
  SUMMARY_SENT: 'Completed',
  NO_SHOW: 'No show',
  CANCELLED: 'Cancelled',
}

const STATUS_TONE: Record<string, string> = {
  HELD: 'text-muted-foreground',
  PAID: 'text-olive',
  CONFIRMED: 'text-olive',
  NEEDS_NEW_DATE: 'text-rust font-medium',
  IN_SESSION: 'text-olive',
  COMPLETED: 'text-olive',
  SUMMARY_SENT: 'text-muted-foreground',
  NO_SHOW: 'text-rust',
  CANCELLED: 'text-rust',
}

export default async function BookingsPage() {
  const user = await requireUser()

  const bookings = await db.consultationBooking.findMany({
    where: {
      userId: user.id,
      status: { not: 'HELD' },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <AccountShell
          title="My Bookings"
          description={`${bookings.length} ${bookings.length === 1 ? 'booking' : 'bookings'}`}
          actions={
            <Link
              href="/services/wardrobe-consultation/book"
              className="hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
            >
              Book a session
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {bookings.length === 0 ? (
            <div className="border border-border rounded-lg p-10 md:p-16 text-center bg-card">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <CalendarCheck className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-2xl md:text-3xl mb-2">No bookings yet</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                Once you book a Wardrobe &amp; Style Consultation it shows up
                here — including status, reference, and any reschedule actions.
              </p>
              <Link
                href="/services/wardrobe-consultation"
                className="inline-flex items-center gap-2 bg-rust text-rust-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors"
              >
                See the consultation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {bookings.map((b) => {
                const slotDate = new Date(b.slotDate).toLocaleString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
                const needsAction = b.status === 'NEEDS_NEW_DATE'
                return (
                  <li key={b.id}>
                    <Link
                      href={`/account/bookings/${b.bookingNumber}`}
                      className={`block border bg-card rounded-lg p-5 md:p-6 hover:border-foreground transition-colors ${
                        needsAction ? 'border-rust/60' : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {b.bookingNumber}
                            </span>
                            <span className={`text-xs ${STATUS_TONE[b.status] ?? 'text-muted-foreground'}`}>
                              {STATUS_LABEL[b.status] ?? b.status}
                            </span>
                          </div>
                          <h3 className="font-display text-lg md:text-xl mb-1.5">
                            {slotDate}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {b.slotTime} · {b.sessionMode}
                            {b.sessionMode === 'In-person' && b.location ? ` · ${b.location}` : ''}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
                            Paid
                          </p>
                          <p className="font-mono text-lg tabular-nums">
                            ₦{b.amountPaid.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {needsAction && (
                        <div className="mt-4 pt-4 border-t border-rust/30 flex items-center gap-2 text-rust">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">
                            We cannot keep your booked date. Tap to choose a new one.
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </AccountShell>
      </main>
      <Footer />
    </>
  )
}
