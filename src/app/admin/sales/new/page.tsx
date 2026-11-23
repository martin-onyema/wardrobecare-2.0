import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { NewSaleWizard } from './new-sale-wizard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'New Campaign',
  robots: { index: false, follow: false },
}

export default async function NewSalePage() {
  await requireAdmin()
  const perms = await getMyPermissionCodes()

  return (
    <AdminLayout
      title="New Campaign"
      description="Create a new sale or clearance campaign"
      permissions={perms}
    >
      <NewSaleWizard />
    </AdminLayout>
  )
}
