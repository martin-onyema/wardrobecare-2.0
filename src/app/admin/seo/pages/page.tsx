import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { listSeoPages } from '@/lib/seo-queries'
import { bandFor, ISSUE_LABELS } from '@/lib/seo'
import { PagesFilters } from './pages-filters'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'All Pages · SEO Manager',
  robots: { index: false, follow: false },
}

const PAGE_SIZE = 25

type SearchParams = Promise<{
  type?: string
  band?: string
  issue?: string
  q?: string
  page?: string
}>

export default async function SeoPagesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const sp = await searchParams

  const type = sp.type ?? 'all'
  const band = (sp.band === 'good' || sp.band === 'warn' || sp.band === 'bad') ? sp.band : undefined
  const issue = sp.issue ?? ''
  const q = sp.q ?? ''
  const pageNum = Math.max(1, parseInt(sp.page ?? '1', 10) || 1)
  const offset = (pageNum - 1) * PAGE_SIZE

  const { rows, total } = await listSeoPages({
    type: type === 'all' ? undefined : type,
    band,
    issue,
    query: q,
    limit: PAGE_SIZE,
    offset,
  })

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const issueLabel = issue ? ISSUE_LABELS.find((l) => l.key === issue)?.label : null

  return (
    <AdminLayout
      title="All Pages"
      description={`${total} page${total === 1 ? '' : 's'}${issueLabel ? ` · filtered: ${issueLabel}` : ''}`}
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        {/* Sub-navigation */}
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="secondary" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        {/* Filters */}
        <PagesFilters
          currentType={type}
          currentBand={band ?? 'all'}
          currentIssue={issue}
          currentQuery={q}
        />

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground border-b">
                  <tr>
                    <th className="text-left py-3 px-4">Page</th>
                    <th className="text-left py-3 px-3">Type</th>
                    <th className="text-left py-3 px-3">Title</th>
                    <th className="text-left py-3 px-3">Description</th>
                    <th className="text-left py-3 px-3">Score</th>
                    <th className="text-left py-3 px-3">Index</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-muted-foreground">
                        No pages match these filters.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => {
                      const band = bandFor(r.score)
                      const titleOk = r.seoTitle.trim().length >= 20 && r.seoTitle.trim().length <= 62
                      const descOk = r.seoDescription.trim().length >= 70 && r.seoDescription.trim().length <= 160
                      return (
                        <tr key={`${r.type}:${r.id}`} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="py-3 px-4">
                            <Link
                              href={`/admin/seo/edit/${r.type}/${encodeURIComponent(r.id)}`}
                              className="block group"
                            >
                              <div className="font-medium group-hover:underline">
                                {r.parent ? <span className="text-muted-foreground">↳ </span> : null}
                                {r.name}
                                {r.hidden && (
                                  <Badge variant="outline" className="ml-2 text-xs">Coming soon</Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground font-mono mt-0.5">{r.url}</div>
                            </Link>
                          </td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="font-mono text-xs">{r.type}</Badge>
                          </td>
                          <td className="py-3 px-3">
                            {r.seoTitle.trim() === '' ? (
                              <Badge variant="destructive">Missing</Badge>
                            ) : titleOk ? (
                              <Badge variant="default">OK</Badge>
                            ) : (
                              <Badge variant="destructive">Fix</Badge>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.seoDescription.trim() === '' ? (
                              <Badge variant="destructive">Missing</Badge>
                            ) : descOk ? (
                              <Badge variant="default">OK</Badge>
                            ) : (
                              <Badge variant="destructive">Fix</Badge>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono font-bold mr-2">{r.score}</span>
                            <Badge
                              variant={band.cls === 'good' ? 'default' : band.cls === 'warn' ? 'secondary' : 'destructive'}
                            >
                              {band.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            {r.noindex ? (
                              <Badge variant="outline">Hidden</Badge>
                            ) : (
                              <Badge variant="default">Indexed</Badge>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total}
            </div>
            <div className="flex gap-2">
              {pageNum > 1 && (
                <Link
                  href={`/admin/seo/pages?type=${type}&band=${band ?? 'all'}&issue=${issue}&q=${encodeURIComponent(q)}&page=${pageNum - 1}`}
                >
                  <Button size="sm" variant="outline">← Prev</Button>
                </Link>
              )}
              <span className="text-sm self-center px-2">Page {pageNum} of {totalPages}</span>
              {pageNum < totalPages && (
                <Link
                  href={`/admin/seo/pages?type=${type}&band=${band ?? 'all'}&issue=${issue}&q=${encodeURIComponent(q)}&page=${pageNum + 1}`}
                >
                  <Button size="sm" variant="outline">Next →</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
