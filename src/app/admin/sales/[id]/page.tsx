import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { SaleEditor } from './sale-editor'
import { PRODUCT_SELECT_BASE, CATEGORY_SELECT_BASE } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit Campaign',
  robots: { index: false, follow: false },
}

type Params = Promise<{ id: string }>

export default async function SaleDetailPage({ params }: { params: Params }) {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const { id } = await params

  const sale = await db.sale.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            select: {
              ...PRODUCT_SELECT_BASE,
              images: { select: { url: true, altText: true }, orderBy: { position: 'asc' }, take: 1 },
              category: { select: { name: true, slug: true } },
              variants: { select: { size: true, stock: true } },
            },
          },
        },
      },
      events: {
        include: { actor: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      },
      createdBy: { select: { name: true, email: true } },
    },
  })

  if (!sale) notFound()

  // Get deal reasons
  const dealReasons = await db.dealReason.findMany({ where: { active: true } })

  // Get deal settings
  const dealSettings = await db.dealSettings.findFirst() || {
    roundTo: 50, minPercent: 5, maxPercent: 70, ownerOnlyAbove: 50,
    homeMinItems: 3, homeMaxCards: 4, countdownHours: 72, urgentHours: 24,
  }

  // Serialise dates for client
  const serialised = {
    ...sale,
    startsAt: sale.startsAt.toISOString(),
    endsAt: sale.endsAt?.toISOString() ?? null,
    endedAt: sale.endedAt?.toISOString() ?? null,
    createdAt: sale.createdAt.toISOString(),
    updatedAt: sale.updatedAt.toISOString(),
    items: sale.items.map((item) => ({
      ...item,
      product: {
        ...item.product,
        images: item.product.images.map((img) => ({ url: img.url, altText: img.altText })),
      },
    })),
    events: sale.events.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
    })),
  }

  return (
    <AdminLayout
      title={sale.name}
      description={`${sale.status} · ${sale.items.length} products · ${sale.kind}`}
      permissions={perms}
    >
      <SaleEditor
        sale={serialised}
        dealReasons={dealReasons.map((r) => ({ id: r.id, label: r.label, type: r.type, returnRule: r.returnRule }))}
        dealSettings={dealSettings}
        canApprove={perms.length === 0 || perms.includes('settings.manage')} // ADMIN has empty perms array
      />
    </AdminLayout>
  )
}
