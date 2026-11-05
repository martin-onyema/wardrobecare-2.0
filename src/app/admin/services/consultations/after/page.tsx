import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav, statusPill, fmtNGN, fmtDateLabel } from '../_shared'
import { AfterClient } from './after-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'After the Session',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ selected?: string }>

export default async function AdminConsultationAfterPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  // Sessions that have finished (SUMMARY_PENDING) or are fully done (COMPLETED).
  const sessions = await db.consultationBooking.findMany({
    where: { status: { in: ['SUMMARY_PENDING', 'COMPLETED'] } },
    orderBy: { slotDate: 'desc' },
    select: {
      id: true,
      bookingNumber: true,
      bookerName: true,
      bookerPhone: true,
      contactMethod: true,
      slotDate: true,
      slotTime: true,
      sessionMode: true,
      status: true,
      summarySentAt: true,
      personalShoppingBriefAt: true,
      auditItems: true,
      outfitPhotos: true,
      gapItems: true,
      elapsedMinutes: true,
    },
  })

  return (
    <AdminLayout
      title="After the Session"
      description="Send the Wardrobe Map and Gap List the same day. Anything not sent by 8 PM shows as overdue."
      permissions={perms}
    >
      <ConsultationTabNav active="after" />

      <div className="p-6">
        <AfterClient
          canManage={perms.includes('service.enquiry.manage')}
          sessions={sessions.map((b) => ({
            ...b,
            slotDate: b.slotDate.toISOString().slice(0, 10),
            summarySentAt: b.summarySentAt ? b.summarySentAt.toISOString() : null,
            personalShoppingBriefAt: b.personalShoppingBriefAt ? b.personalShoppingBriefAt.toISOString() : null,
            auditItems: b.auditItems as any,
            outfitPhotos: b.outfitPhotos as any,
            gapItems: b.gapItems as any,
          }))}
          initialSelectedId={selectedId}
        />
      </div>
    </AdminLayout>
  )
}
