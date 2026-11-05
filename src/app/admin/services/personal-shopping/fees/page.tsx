import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { PSTabNav, fmtNGN } from '../_shared'
import { PSFeesClient } from './fees-client'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Personal Shopping Fees', robots: { index: false, follow: false } }

export default async function AdminPSFeesPage() {
  await requireStaffWithPermission('service.enquiry.manage')
  const perms = await getMyPermissionCodes()

  const settings = await db.pSServiceSetting.findUnique({ where: { id: 'singleton' } })
  const zones = await db.pSDeliveryZone.findMany({ orderBy: { zone: 'asc' } })
  const codes = await db.pSPromoCode.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <AdminLayout title="Personal Shopping Fees & Discounts" description="Sourcing fees, delivery fees and promo codes." permissions={perms}>
      <PSTabNav active="fees" />
      <div className="p-6">
        <PSFeesClient
          settings={{
            deliveredFee: settings?.deliveredFee ?? 45000,
            inPersonFittingFee: settings?.inPersonFittingFee ?? 50000,
            includedMinutes: settings?.includedMinutes ?? 60,
            extraBlockMinutes: settings?.extraBlockMinutes ?? 30,
            extraBlockFee: settings?.extraBlockFee ?? 5000,
          }}
          zones={zones.map((z) => ({ id: z.id, zone: z.zone, fee: z.fee }))}
          codes={codes.map((c) => ({
            id: c.id, code: c.code, type: c.type, value: c.value,
            service: c.service,
            expiresAt: c.expiresAt?.toISOString().slice(0, 10) ?? '',
            timesUsed: c.timesUsed, active: c.active,
          }))}
        />
      </div>
    </AdminLayout>
  )
}
