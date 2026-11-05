import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNGN } from '@/lib/format'
import { AdminProposeReschedule } from './propose-reschedule'
import { AdminConsultationActions } from './admin-actions'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Consultation Booking Detail',
  robots: { index: false, follow: false },
}

type Params = Promise<{ id: string }>

const STATUS_TONE: Record<string, string> = {
  HELD: 'bg-amber-100 text-amber-800',
  PAID: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  RESCHEDULE_PROPOSED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

function parseProposedSlots(raw: string | unknown[] | null | undefined): Array<{ date: string; time: string }> {
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
  if (!Array.isArray(arr)) return []
  return arr
    .filter((x: any) => x && typeof x.date === 'string' && typeof x.time === 'string')
    .map((x: any) => ({ date: x.date, time: x.time }))
}

export default async function AdminConsultationDetailPage({ params }: { params: Params }) {
  const admin = await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const { id } = await params

  const b = await db.consultationBooking.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true, phone: true } } },
  })
  if (!b) notFound()

  const slotDateLabel = new Date(b.slotDate).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const originalSlotLabel =
    b.originalSlotDate && b.originalSlotTime
      ? new Date(b.originalSlotDate).toLocaleString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) + `, ${b.originalSlotTime}`
      : null

  const proposedSlots = parseProposedSlots(b.proposedSlots)
  const customerReply = b.rescheduleReason
    ? (b.rescheduleReason.split('\n\n— Customer reply —\n')[1] ?? '').trim()
    : ''
  const rescheduleReasonFirstLine = b.rescheduleReason
    ? (b.rescheduleReason.split('\n')[0] ?? '').trim()
    : ''

  const canProposeReschedule =
    b.status === 'PAID' || b.status === 'CONFIRMED' || b.status === 'RESCHEDULED'

  return (
    <AdminLayout
      title={b.bookingNumber}
      description={`${b.bookerName} · ${slotDateLabel} · ${b.slotTime}`}
      permissions={perms}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Slot & status card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Slot date</p>
                  <p className="font-medium mt-1">{slotDateLabel}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Slot time</p>
                  <p className="font-medium mt-1">{b.slotTime}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Session mode</p>
                  <p className="font-medium mt-1">{b.sessionMode}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Location</p>
                  <p className="font-medium mt-1">
                    {b.sessionMode === 'In-person' ? (b.location || '—') : 'Video call'}
                  </p>
                </div>
                {originalSlotLabel && (
                  <div className="sm:col-span-2 pt-3 border-t border-border">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Originally booked</p>
                    <p className="text-sm mt-1 text-muted-foreground">{originalSlotLabel}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer + recipient card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                People
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Booker (pays + receives comms)</p>
                <p className="font-medium mt-1">{b.bookerName}</p>
                <p className="text-sm text-muted-foreground">
                  <a href={`tel:${b.bookerPhone}`} className="text-foreground hover:underline">{b.bookerPhone}</a>
                  {' · '}
                  Preferred: {b.contactMethod}
                </p>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Recipient (the session is for)</p>
                <p className="font-medium mt-1">{b.recipientName}</p>
                {b.recipientRelation && (
                  <p className="text-sm text-muted-foreground">{b.recipientRelation}</p>
                )}
              </div>
              {b.user && (
                <div className="pt-3 border-t border-border">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Linked account</p>
                  <p className="font-medium mt-1">
                    <Link href={`/admin/customers/${b.user.id}`} className="text-foreground hover:underline">
                      {b.user.email}
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Style goals card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Style goals (about the recipient)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">What prompted this?</p>
                <p className="leading-relaxed whitespace-pre-wrap">{b.promptWhy || '—'}</p>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Occasions dressed for</p>
                <p className="leading-relaxed whitespace-pre-wrap">{b.occasions || '—'}</p>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Biggest frustration</p>
                <p className="leading-relaxed whitespace-pre-wrap">{b.frustration || '—'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Reschedule proposals (if any) */}
          {(b.status === 'RESCHEDULE_PROPOSED' || b.status === 'RESCHEDULED') && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Reschedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {rescheduleReasonFirstLine && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Reason we gave the customer</p>
                    <p className="leading-relaxed">{rescheduleReasonFirstLine}</p>
                  </div>
                )}
                {proposedSlots.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Slots we proposed</p>
                    <ul className="space-y-1.5">
                      {proposedSlots.map((s, i) => (
                        <li key={i} className="text-sm">
                          <span className="font-mono text-xs text-muted-foreground mr-2">{i + 1}.</span>
                          {(() => {
                            const [y, m, d] = s.date.split('-').map(Number)
                            return new Date(y, m - 1, d).toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
                          })()}{' '}
                          · {s.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {customerReply && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Customer&apos;s reply (their own suggested dates)</p>
                    <p className="leading-relaxed whitespace-pre-wrap">{customerReply}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Reply via {b.contactMethod.toLowerCase()} to confirm a new date with the customer.
                    </p>
                  </div>
                )}
                {b.rescheduledAt && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Rescheduled at</p>
                    <p className="text-sm mt-1">{new Date(b.rescheduledAt).toLocaleString('en-GB')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: workflow */}
        <div className="space-y-6">
          {/* Status + payment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Current</p>
                <span className={`inline-block px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${STATUS_TONE[b.status] || 'bg-gray-100 text-gray-800'}`}>
                  {b.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="pt-3 border-t border-border space-y-2 text-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-[0.15em]">Amount paid</span>
                  <span className="font-mono tabular-nums">{formatNGN(b.amountPaid)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-[0.15em]">Paid at</span>
                  <span className="font-mono text-xs">{b.paidAt ? new Date(b.paidAt).toLocaleString('en-GB') : '—'}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-muted-foreground text-[11px] uppercase tracking-[0.15em] flex-shrink-0">Paystack ref</span>
                  <span className="font-mono text-xs text-right break-all">{b.paymentReference || '—'}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                <p>Submitted: {new Date(b.createdAt).toLocaleString('en-GB')}</p>
                <p className="mt-1">Last updated: {new Date(b.updatedAt).toLocaleString('en-GB')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Workflow actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AdminConsultationActions
                bookingId={b.id}
                bookingNumber={b.bookingNumber}
                status={b.status}
              />
              <div className="pt-4 border-t border-border">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Reschedule (admin-initiated)
                </p>
                {canProposeReschedule ? (
                  <AdminProposeReschedule
                    bookingId={b.id}
                    bookingNumber={b.bookingNumber}
                    // If a reschedule is already proposed (customer has been
                    // asked to pick a slot), default to "Set manually" mode —
                    // proposing again would replace the existing proposal.
                    defaultMode={b.status === 'RESCHEDULE_PROPOSED' ? 'manual' : 'propose'}
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Reschedule can only be proposed while the booking is PAID, CONFIRMED, or already RESCHEDULED.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Quick contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <a
                href={`https://wa.me/${b.bookerPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 bg-green-50 hover:bg-green-100 text-green-800 text-xs uppercase tracking-[0.15em] rounded"
              >
                WhatsApp {b.bookerName} →
              </a>
              <a
                href={`tel:${b.bookerPhone}`}
                className="block px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs uppercase tracking-[0.15em] rounded"
              >
                Call {b.bookerPhone} →
              </a>
              <a
                href={`/account/bookings/${b.bookingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 bg-secondary hover:bg-secondary/80 text-foreground text-xs uppercase tracking-[0.15em] rounded"
              >
                View customer page ↗
              </a>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground px-1">
            Logged in as {admin.email}.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
