import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav, weekChips, SLOT_TIMES, fmtDateShort } from '../_shared'
import { CalendarClient } from './calendar-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Calendar & Availability',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ weekOffset?: string; stylist?: string }>

export default async function AdminConsultationCalendarPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const weekOffset = parseInt(sp.weekOffset ?? '0', 10) || 0
  const stylistFilter = typeof sp.stylist === 'string' ? sp.stylist : 'all'

  // Compute the Monday of the current week (with optional offset)
  const monday = new Date()
  monday.setHours(0, 0, 0, 0)
  while (monday.getDay() !== 1) monday.setDate(monday.getDate() - 1)
  monday.setDate(monday.getDate() + weekOffset * 7)

  const days = weekChips(monday)

  // Stylists (staff users, excluding customer)
  const stylists = await db.user.findMany({
    where: { role: { not: 'CUSTOMER' }, active: true },
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: 'asc' },
  })

  // Load all bookings for this week (Mon–Sat, all times)
  const startDate = new Date(days[0].key + 'T00:00:00Z')
  const endDate = new Date(days[5].key + 'T23:59:59Z')
  const bookings = await db.consultationBooking.findMany({
    where: {
      slotDate: { gte: startDate, lte: endDate },
      status: { in: ['PAID', 'CONFIRMED', 'NEEDS_NEW_DATE', 'IN_SESSION', 'COMPLETED', 'SUMMARY_SENT'] },
      ...(stylistFilter !== 'all' ? { assignedStylistId: stylistFilter } : {}),
    },
    select: {
      id: true,
      bookingNumber: true,
      bookerName: true,
      slotDate: true,
      slotTime: true,
      status: true,
      sessionMode: true,
      location: true,
      assignedStylistId: true,
    },
  })

  // Blocked slots for this week
  const blocked = await db.consultationBlockedSlot.findMany({
    where: { slotDate: { gte: startDate, lte: endDate } },
    select: { slotDate: true, slotTime: true, reason: true },
  })

  // Availability rules (singleton)
  const availability = await db.consultationAvailability.findUnique({ where: { id: 'singleton' } })

  return (
    <AdminLayout
      title="Calendar & Availability"
      description="Week grid of consultation bookings. Block slots, manage availability rules."
      permissions={perms}
    >
      <ConsultationTabNav active="calendar" />

      <div className="p-6">
        <CalendarClient
          canManage={perms.includes('service.enquiry.manage')}
          days={days}
          weekOffset={weekOffset}
          stylistFilter={stylistFilter}
          stylists={stylists.map((s) => ({ id: s.id, name: s.name || s.email, role: s.role }))}
          bookings={bookings.map((b) => ({
            ...b,
            slotDate: b.slotDate.toISOString().slice(0, 10),
          }))}
          blocked={blocked.map((b) => ({
            ...b,
            slotDate: b.slotDate.toISOString().slice(0, 10),
          }))}
          availability={
            availability
              ? {
                  workingDays: availability.workingDays.split(','),
                  travelBufferMinutes: availability.travelBufferMinutes,
                  minNoticeHours: availability.minNoticeHours,
                  allowVideo: availability.allowVideo,
                  allowInPerson: availability.allowInPerson,
                }
              : {
                  workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  travelBufferMinutes: 60,
                  minNoticeHours: 24,
                  allowVideo: true,
                  allowInPerson: true,
                }
          }
        />
      </div>
    </AdminLayout>
  )
}
