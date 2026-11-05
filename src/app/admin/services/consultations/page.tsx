import Link from 'next/link'
import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatNGN } from '@/lib/format'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Consultation Bookings',
  robots: { index: false, follow: false },
}

const STATUS_TONE: Record<string, string> = {
  HELD: 'bg-amber-100 text-amber-800',
  PAID: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  RESCHEDULE_PROPOSED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

type SearchParams = Promise<{ status?: string }>

export default async function AdminConsultationsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const statusFilter = typeof sp.status === 'string' ? sp.status : undefined

  const bookings = await db.consultationBooking.findMany({
    where: {
      // HELD-only entries are pending/expired holds — exclude them from
      // the admin list by default. Admins can still see them via the
      // status filter.
      ...(statusFilter ? { status: statusFilter as any } : { status: { not: 'HELD' } }),
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  const stats = {
    total: bookings.length,
    paid: bookings.filter((b) => b.status === 'PAID').length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    rescheduleNeeded: bookings.filter((b) => b.status === 'RESCHEDULE_PROPOSED').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  }

  return (
    <AdminLayout
      title="Consultation Bookings"
      description="Paid-at-booking Wardrobe & Style Consultations. Manage confirmation and reschedule."
      permissions={perms}
    >
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Total</p>
            <p className="font-display text-3xl mt-2">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Awaiting confirm</p>
            <p className="font-display text-3xl mt-2 text-blue-600">{stats.paid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Confirmed</p>
            <p className="font-display text-3xl mt-2 text-green-600">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Reschedule needed</p>
            <p className="font-display text-3xl mt-2 text-red-600">{stats.rescheduleNeeded}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Completed</p>
            <p className="font-display text-3xl mt-2 text-emerald-600">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/services/consultations"
          className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border ${
            !statusFilter ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          Active
        </Link>
        {(['PAID', 'CONFIRMED', 'RESCHEDULE_PROPOSED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'HELD'] as const).map((s) => (
          <Link
            key={s}
            href={`/admin/services/consultations?status=${s}`}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border ${
              statusFilter === s ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.replace(/_/g, ' ')}
          </Link>
        ))}
      </div>

      {/* Bookings table */}
      <Card>
        <CardContent className="p-0">
          {bookings.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">
                No consultation bookings in this view yet. When customers pay
                for a Wardrobe &amp; Style Consultation, their booking appears
                here immediately — including status and any reschedule actions.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>For</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.bookingNumber}</TableCell>
                    <TableCell>
                      <p className="font-medium">{b.bookerName}</p>
                      <p className="text-xs text-muted-foreground">{b.bookerPhone}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{b.recipientName}</p>
                      {b.recipientRelation && (
                        <p className="text-xs text-muted-foreground">{b.recipientRelation}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-xs">
                        {new Date(b.slotDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-muted-foreground">{b.slotTime}</p>
                    </TableCell>
                    <TableCell className="text-sm">{b.sessionMode}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-sm">
                      {formatNGN(b.amountPaid)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${STATUS_TONE[b.status] || 'bg-gray-100 text-gray-800'}`}>
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/services/consultations/${b.id}`}
                        className="text-[11px] uppercase tracking-[0.18em] text-foreground hover:underline"
                      >
                        Open →
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground mt-6">
        Logged in as {admin.email}. Slot holds (status HELD, no payment yet) are
        hidden from this default view — use the HELD filter to see them.
      </p>
    </AdminLayout>
  )
}
