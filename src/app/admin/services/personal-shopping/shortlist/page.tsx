import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { PSTabNav, psStatusPill, fmtNGN } from '../_shared'
import { ShortlistClient } from './shortlist-client'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Personal Shopping Shortlist', robots: { index: false, follow: false } }

type SearchParams = Promise<{ selected?: string }>

export default async function AdminPSShortlistPage({ searchParams }: { searchParams: SearchParams }) {
  await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  const requests = await db.personalShoppingRequest.findMany({
    where: { status: { in: ['SOURCING', 'SENT', 'APPROVED'] } },
    orderBy: { createdAt: 'desc' },
  })

  const requestIds = requests.map((r) => r.id)
  const allItems = await db.pSItem.findMany({ where: { requestId: { in: requestIds } }, orderBy: { createdAt: 'asc' } })
  const itemsByRequest = new Map<string, typeof allItems>()
  allItems.forEach((i) => {
    if (!itemsByRequest.has(i.requestId)) itemsByRequest.set(i.requestId, [])
    itemsByRequest.get(i.requestId)!.push(i)
  })

  return (
    <AdminLayout title="Shortlist" description="Build and send the shortlist for accepted requests." permissions={perms}>
      <PSTabNav active="shortlist" />
      <div className="p-6">
        <ShortlistClient
          canManage={perms.includes('service.enquiry.manage')}
          requests={requests.map((r) => ({
            id: r.id, ref: r.ref, customerName: r.customerName,
            tier: r.tier, reviewMethod: r.reviewMethod,
            area: r.area, brief: r.brief, categories: r.categories, colours: r.colours, budget: r.budget,
            brandMentioned: r.brandMentioned, status: r.status,
            items: (itemsByRequest.get(r.id) ?? []).map((i) => ({
              id: i.id, name: i.name, category: i.category, size: i.size,
              price: i.price, source: i.source, stylistNote: i.stylistNote,
              decision: i.decision, decisionNote: i.decisionNote,
            })),
          }))}
          initialSelectedId={selectedId}
        />
      </div>
    </AdminLayout>
  )
}
