import Link from 'next/link'
import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav, statusPill, fmtNGN, fmtDateLabel } from '../_shared'
import { RequestsClient } from './requests-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Consultation Requests',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ status?: string; selected?: string }>

export default async function AdminConsultationRequestsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const statusFilter = typeof sp.status === 'string' ? sp.status : 'all'
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  // Load all active bookings (exclude HELD — those are pending/expired holds).
  const bookings = await db.consultationBooking.findMany({
    where: { status: { not: 'HELD' } },
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: {
      id: true,
      bookingNumber: true,
      bookerName: true,
      bookerPhone: true,
      contactMethod: true,
      recipientName: true,
      recipientRelation: true,
      promptWhy: true,
      occasions: true,
      frustration: true,
      sessionMode: true,
      location: true,
      slotDate: true,
      slotTime: true,
      listPrice: true,
      amountPaid: true,
      discountLabel: true,
      discountAmount: true,
      discountAppliesToAll: true,
      discountPct: true,
      discountFree: true,
      status: true,
      assignedStylistId: true,
      rescheduleReason: true,
      rescheduledAt: true,
      originalSlotDate: true,
      originalSlotTime: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  // Stylist options — staff users only (any role except CUSTOMER).
  const stylists = await db.user.findMany({
    where: { role: { not: 'CUSTOMER' }, active: true },
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: 'asc' },
  })

  // Stats for the top cards
  const stats = {
    total: bookings.length,
    paid: bookings.filter((b) => b.status === 'PAID').length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    rescheduleNeeded: bookings.filter((b) => b.status === 'NEEDS_NEW_DATE').length,
    inSession: bookings.filter((b) => b.status === 'IN_SESSION').length,
    summaryPending: bookings.filter((b) => b.status === 'COMPLETED').length,
  }

  return (
    <AdminLayout
      title="Consultation Requests"
      description={`${stats.total} bookings · ${stats.paid} to confirm · ${stats.inSession} in session · ${stats.summaryPending} summaries to send`}
      permissions={perms}
    >
      <ConsultationTabNav active="requests" />

      <div className="p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <StatCard label="Total"        value={stats.total} tone="text-foreground" />
          <StatCard label="To confirm"   value={stats.paid} tone="text-yellow-700" />
          <StatCard label="Confirmed"    value={stats.confirmed} tone="text-green-700" />
          <StatCard label="Needs new date" value={stats.rescheduleNeeded} tone="text-red-700" />
          <StatCard label="In session"  value={stats.inSession} tone="text-indigo-700" />
          <StatCard label="Summary to send" value={stats.summaryPending} tone="text-stone-700" />
        </div>

        <RequestsClient
          adminEmail={admin.email}
          canManage={perms.includes('service.enquiry.manage')}
          bookings={bookings.map((b) => ({
            ...b,
            slotDate: b.slotDate.toISOString().slice(0, 10),
            originalSlotDate: b.originalSlotDate ? b.originalSlotDate.toISOString().slice(0, 10) : null,
            rescheduledAt: b.rescheduledAt ? b.rescheduledAt.toISOString() : null,
            createdAt: b.createdAt.toISOString(),
            updatedAt: b.updatedAt.toISOString(),
            
          }))}
          stylists={stylists.map((s) => ({ id: s.id, name: s.name || s.email, role: s.role }))}
          initialFilter={statusFilter}
          initialSelectedId={selectedId}
        />

        <p className="text-xs text-muted-foreground">
          Logged in as {admin.email}. Every paid booking appears here instantly
          with status <code className="font-mono text-[10px]">Paid — to confirm</code>.
          Nothing is confirmed until a person confirms it, so the customer never
          assumes a slot that cannot be kept.
        </p>
      </div>
    </AdminLayout>
  )
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="border border-border bg-card p-4 rounded">
      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className={`font-display text-2xl mt-1 ${tone}`}>{value}</p>
    </div>
  )
}
