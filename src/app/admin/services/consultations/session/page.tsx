import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav, statusPill, fmtNGN, fmtDateLabel, SLOT_TIMES } from '../_shared'
import { SessionWorkspaceClient } from './session-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Session Workspace',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ selected?: string }>

export default async function AdminConsultationSessionPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  // Confirmed or in-session bookings only.
  const sessions = await db.consultationBooking.findMany({
    where: { status: { in: ['CONFIRMED', 'IN_SESSION', 'SUMMARY_PENDING'] } },
    orderBy: { slotDate: 'asc' },
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
      discountAppliesToAll: true,
      discountPct: true,
      discountFree: true,
      status: true,
      assignedStylistId: true,
      sessionStartedAt: true,
      elapsedMinutes: true,
      auditItems: true,
      outfitPhotos: true,
      gapItems: true,
      sessionNotes: true,
    },
  })

  // Fees (for extra-time billing).
  const settings = await db.consultationServiceSetting.findUnique({ where: { id: 'singleton' } })
  const fees = {
    baseFee: settings?.baseFee ?? 45000,
    extraHourFee: settings?.extraHourFee ?? 10000,
    extraTimeRounding: (settings?.extraTimeRounding ?? 'started') as 'started' | 'full',
  }

  return (
    <AdminLayout
      title="Session Workspace"
      description="Run a confirmed session: client brief, time tracker, audit, outfit photos, gap list, finish."
      permissions={perms}
    >
      <ConsultationTabNav active="session" />

      <div className="p-6">
        <SessionWorkspaceClient
          canManage={perms.includes('service.enquiry.manage')}
          sessions={sessions.map((b) => ({
            ...b,
            slotDate: b.slotDate.toISOString().slice(0, 10),
            sessionStartedAt: b.sessionStartedAt ? b.sessionStartedAt.toISOString() : null,
            auditItems: b.auditItems as any,
            outfitPhotos: b.outfitPhotos as any,
            gapItems: b.gapItems as any,
          }))}
          fees={fees}
          initialSelectedId={selectedId}
        />
      </div>
    </AdminLayout>
  )
}
