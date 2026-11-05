import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { PSTabNav, psStatusPill, fmtNGN } from '../_shared'
import { PSRequestsClient } from './requests-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Personal Shopping Requests',
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ status?: string; selected?: string }>

export default async function AdminPSRequestsPage({ searchParams }: { searchParams: SearchParams }) {
  const admin = await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const statusFilter = typeof sp.status === 'string' ? sp.status : 'all'
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  const requests = await db.personalShoppingRequest.findMany({
    where: { status: { not: 'CANCELLED' } },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  // Fetch items and events separately (sqlite doesn't support Prisma relations)
  const requestIds = requests.map((r) => r.id)
  const [allItems, allEvents] = await Promise.all([
    db.pSItem.findMany({ where: { requestId: { in: requestIds } }, orderBy: { createdAt: 'asc' } }),
    db.pSEvent.findMany({ where: { requestId: { in: requestIds } }, orderBy: { createdAt: 'desc' }, take: 200 }),
  ])
  const itemsByRequest = new Map(allItems.map((i) => [i.requestId, [] as typeof allItems]))
  allItems.forEach((i) => itemsByRequest.get(i.requestId)?.push(i))
  const eventsByRequest = new Map<string, typeof allEvents>()
  allEvents.forEach((e) => {
    if (!eventsByRequest.has(e.requestId)) eventsByRequest.set(e.requestId, [])
    if ((eventsByRequest.get(e.requestId)?.length ?? 0) < 10) eventsByRequest.get(e.requestId)?.push(e)
  })

  const stylists = await db.user.findMany({
    where: { role: { not: 'CUSTOMER' }, active: true },
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: 'asc' },
  })

  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === 'NEW').length,
    sourcing: requests.filter((r) => r.status === 'SOURCING').length,
    sent: requests.filter((r) => r.status === 'SENT').length,
    approved: requests.filter((r) => r.status === 'APPROVED').length,
    fulfilment: requests.filter((r) => r.status === 'PAID' || r.status === 'FULFILLING').length,
  }

  return (
    <AdminLayout
      title="Personal Shopping Requests"
      description={`${stats.total} requests · ${stats.new} to accept · ${stats.sourcing} sourcing · ${stats.sent} with customer · ${stats.approved} approved`}
      permissions={perms}
    >
      <PSTabNav active="requests" />
      <div className="p-6">
        <PSRequestsClient
          adminEmail={admin.email}
          canManage={perms.includes('service.enquiry.manage')}
          requests={requests.map((r) => ({
            id: r.id,
            ref: r.ref,
            customerName: r.customerName,
            customerPhone: r.customerPhone,
            contactVia: r.contactVia,
            shoppingFor: r.shoppingFor,
            tier: r.tier,
            reviewMethod: r.reviewMethod,
            area: r.area,
            isLagos: r.isLagos,
            brief: r.brief,
            categories: r.categories,
            colours: r.colours,
            budget: r.budget,
            neededBy: r.neededBy,
            brandMentioned: r.brandMentioned,
            brandAcknowledged: r.brandAcknowledged,
            stylistId: r.stylistId,
            sourcingFeePaid: r.sourcingFeePaid,
            discountLabel: r.discountLabel,
            discountAmount: r.discountAmount,
            status: r.status,
            fittingDate: r.fittingDate?.toISOString().slice(0, 10) ?? null,
            fittingTime: r.fittingTime,
            fittingArea: r.fittingArea,
            itemsCount: itemsByRequest.get(r.id)?.length ?? 0,
            events: (eventsByRequest.get(r.id) ?? []).map((e) => ({
              note: e.note,
              actorType: e.actorType,
              createdAt: e.createdAt.toISOString(),
            })),
          }))}
          stylists={stylists.map((s) => ({ id: s.id, name: s.name || s.email, role: s.role }))}
          initialFilter={statusFilter}
          initialSelectedId={selectedId}
        />
      </div>
    </AdminLayout>
  )
}
