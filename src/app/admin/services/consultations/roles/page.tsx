import Link from 'next/link'
import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ConsultationTabNav } from '../_shared'
import { RolesClient } from './roles-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Roles & Access',
  robots: { index: false, follow: false },
}

export default async function AdminConsultationRolesPage() {
  await requireStaffWithPermission('service.enquiry.manage')
  const perms = await getMyPermissionCodes()

  // Load staff (non-customer users)
  const people = await db.user.findMany({
    where: { role: { not: 'CUSTOMER' } },
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { name: 'asc' },
  })

  return (
    <AdminLayout
      title="Roles & Access"
      description="Set once by your developer, adjustable by the owner. Each role sees only what concerns them."
      permissions={perms}
    >
      <ConsultationTabNav active="roles" />

      <div className="p-6">
        <RolesClient
          people={people.map((p) => ({
            id: p.id,
            name: p.name || p.email,
            email: p.email,
            role: p.role,
            active: p.active,
          }))}
        />
      </div>
    </AdminLayout>
  )
}
