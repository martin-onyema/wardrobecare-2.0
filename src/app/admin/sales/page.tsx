import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatNGN, formatDateShort } from '@/lib/format'
import { effectiveStatus } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sales & Campaigns',
  robots: { index: false, follow: false },
}

const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-amber-100 text-amber-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
  LIVE: 'bg-green-100 text-green-800',
  ENDED: 'bg-stone-200 text-stone-600',
}

type SearchParams = Promise<{ status?: string }>

export default async function AdminSalesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const sp = await searchParams
  const statusFilter = sp.status || 'all'

  const sales = await db.sale.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: { select: { productId: true, pct: true } },
      createdBy: { select: { name: true, email: true } },
    },
  })

  const now = new Date()
  const withEffectiveStatus = sales.map((s) => ({
    ...s,
    effectiveStatus: effectiveStatus(s, now),
    itemCount: s.items.length,
  }))

  const filtered = statusFilter === 'all'
    ? withEffectiveStatus
    : withEffectiveStatus.filter((s) => s.effectiveStatus === statusFilter)

  const pendingCount = withEffectiveStatus.filter((s) => s.effectiveStatus === 'PENDING').length
  const liveCount = withEffectiveStatus.filter((s) => s.effectiveStatus === 'LIVE').length

  return (
    <AdminLayout
      title="Sales & Campaigns"
      description={`${sales.length} campaigns · ${liveCount} live · ${pendingCount} pending approval`}
      permissions={perms}
      actions={
        <Link href="/admin/sales/new">
          <Button size="sm">+ New Campaign</Button>
        </Link>
      }
    >
      <div className="p-6 space-y-6">
        {pendingCount > 0 && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <strong>{pendingCount} campaign{pendingCount === 1 ? '' : 's'}</strong> awaiting your approval.
            <Link href="/admin/sales?status=PENDING" className="ml-2 underline">Review now →</Link>
          </div>
        )}

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'DRAFT', 'PENDING', 'SCHEDULED', 'LIVE', 'ENDED'].map((s) => (
            <Link key={s} href={`/admin/sales?status=${s}`}>
              <Button size="sm" variant={statusFilter === s ? 'secondary' : 'ghost'}>
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </Button>
            </Link>
          ))}
        </div>

        {/* Campaign cards */}
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-sm text-muted-foreground">No campaigns found.</p>
                <Link href="/admin/sales/new" className="mt-4 inline-block">
                  <Button size="sm">Create your first campaign</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filtered.map((sale) => (
              <Link key={sale.id} href={`/admin/sales/${sale.id}`}>
                <Card className="p-4 hover:border-foreground/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium truncate">{sale.name}</h3>
                        <Badge className={STATUS_STYLES[sale.effectiveStatus] || 'bg-gray-100'}>
                          {sale.effectiveStatus}
                        </Badge>
                        <Badge variant="outline">{sale.kind}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span>{sale.itemCount} products</span>
                        <span>·</span>
                        <span>{sale.defaultPct}% default discount</span>
                        <span>·</span>
                        <span>Starts {formatDateShort(sale.startsAt.toISOString())}</span>
                        {sale.endsAt && (
                          <>
                            <span>·</span>
                            <span>Ends {formatDateShort(sale.endsAt.toISOString())}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>{sale.home ? 'On homepage' : 'Not on homepage'}</span>
                        {sale.createdBy && (
                          <>
                            <span>·</span>
                            <span>by {sale.createdBy.name || sale.createdBy.email}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
