import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { PSTabNav } from '../_shared'
import { FulfilmentClient } from './fulfilment-client'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Personal Shopping Fulfilment', robots: { index: false, follow: false } }

type SearchParams = Promise<{ selected?: string }>

export default async function AdminPSFulfilmentPage({ searchParams }: { searchParams: SearchParams }) {
  await requireStaffWithPermission('service.enquiry.view')
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const selectedId = typeof sp.selected === 'string' ? sp.selected : null

  const requests = await db.personalShoppingRequest.findMany({
    where: { status: { in: ['APPROVED', 'PAID', 'FULFILLING', 'DONE'] } },
    orderBy: { createdAt: 'desc' },
  })

  const requestIds = requests.map((r) => r.id)
  const [allItems, allEvents] = await Promise.all([
    db.pSItem.findMany({ where: { requestId: { in: requestIds } }, orderBy: { createdAt: 'asc' } }),
    db.pSEvent.findMany({ where: { requestId: { in: requestIds } }, orderBy: { createdAt: 'desc' }, take: 200 }),
  ])
  const itemsByRequest = new Map<string, typeof allItems>()
  allItems.forEach((i) => { if (!itemsByRequest.has(i.requestId)) itemsByRequest.set(i.requestId, []); itemsByRequest.get(i.requestId)!.push(i) })
  const eventsByRequest = new Map<string, typeof allEvents>()
  allEvents.forEach((e) => { if (!eventsByRequest.has(e.requestId)) eventsByRequest.set(e.requestId, []); if ((eventsByRequest.get(e.requestId)?.length ?? 0) < 6) eventsByRequest.get(e.requestId)!.push(e) })

  const settings = await db.pSServiceSetting.findUnique({ where: { id: 'singleton' } })

  return (
    <AdminLayout title="Fulfilment" description="Dispatch deliveries and run in-person fittings." permissions={perms}>
      <PSTabNav active="fulfilment" />
      <div className="p-6">
        <FulfilmentClient
          canManage={perms.includes('service.enquiry.manage')}
          requests={requests.map((r) => ({
            id: r.id, ref: r.ref, customerName: r.customerName, tier: r.tier,
            area: r.area, isLagos: r.isLagos, status: r.status,
            fittingDate: r.fittingDate?.toISOString().slice(0, 10) ?? null,
            fittingTime: r.fittingTime, fittingArea: r.fittingArea,
            fittingElapsedMinutes: r.fittingElapsedMinutes,
            deliveryFeeQuoted: r.deliveryFeeQuoted,
            riderName: r.riderName, paymentMethod: r.paymentMethod,
            items: (itemsByRequest.get(r.id) ?? []).map((i) => ({
              id: i.id, name: i.name, size: i.size, price: i.price, decision: i.decision,
            })),
            events: (eventsByRequest.get(r.id) ?? []).map((e) => ({ note: e.note, actorType: e.actorType, createdAt: e.createdAt.toISOString() })),
          }))}
          settings={{
            deliveredFee: settings?.deliveredFee ?? 45000,
            inPersonFittingFee: settings?.inPersonFittingFee ?? 50000,
            includedMinutes: settings?.includedMinutes ?? 60,
            extraBlockMinutes: settings?.extraBlockMinutes ?? 30,
            extraBlockFee: settings?.extraBlockFee ?? 5000,
          }}
          initialSelectedId={selectedId}
        />
      </div>
    </AdminLayout>
  )
}
