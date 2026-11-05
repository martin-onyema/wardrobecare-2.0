import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav, fmtNGN } from '../_shared'
import { FeesClient } from './fees-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Fees & Discounts',
  robots: { index: false, follow: false },
}

export default async function AdminConsultationFeesPage() {
  await requireStaffWithPermission('service.enquiry.manage')
  const perms = await getMyPermissionCodes()

  // Current fees (singleton)
  const settings = await db.consultationServiceSetting.findUnique({ where: { id: 'singleton' } })
  const fees = {
    baseFee: settings?.baseFee ?? 45000,
    extraHourFee: settings?.extraHourFee ?? 10000,
    returnVisitDropoffPct: settings?.returnVisitDropoffPct ?? 50,
    extraTimeRounding: (settings?.extraTimeRounding ?? 'started') as 'started' | 'full',
  }

  // Promo codes
  const codes = await db.consultationPromoCode.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // Automatic offers (discount rules)
  const rules = await db.consultationDiscountRule.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <AdminLayout
      title="Fees & Discounts"
      description="Edit the consultation fee structure. Manage promo codes and automatic offers."
      permissions={perms}
    >
      <ConsultationTabNav active="fees" />

      <div className="p-6">
        <FeesClient
          fees={fees}
          codes={codes.map((c) => ({
            id: c.id,
            code: c.code,
            type: c.type as 'pct' | 'fix' | 'free',
            value: c.value,
            appliesToAll: c.appliesToAll,
            expiresAt: c.expiresAt ? c.expiresAt.toISOString().slice(0, 10) : '',
            usageLimit: c.usageLimit,
            timesUsed: c.timesUsed,
            active: c.active,
          }))}
          rules={rules.map((r) => ({
            id: r.id,
            name: r.name,
            condition: r.condition,
            reward: r.reward,
            active: r.active,
          }))}
        />
      </div>
    </AdminLayout>
  )
}
