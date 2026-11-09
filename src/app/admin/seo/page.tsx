import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getSeoOverviewStats } from '@/lib/seo-queries'
import { ISSUE_LABELS } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'SEO Manager',
  description: 'Manage SEO across every category, product, service and page',
  robots: { index: false, follow: false },
}

export default async function SeoOverviewPage() {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const stats = await getSeoOverviewStats()

  const bandColor = (avg: number) => (avg >= 85 ? 'text-emerald-600' : avg >= 60 ? 'text-amber-600' : 'text-red-600')

  return (
    <AdminLayout
      title="SEO Manager"
      description="One place to fix SEO across categories, products, services and pages"
      permissions={perms}
    >
      <div className="flex flex-col gap-6">
        {/* Sub-navigation */}
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="secondary" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className={`text-3xl font-display ${bandColor(stats.avg)}`}>{stats.avg}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Average SEO score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-3xl font-display text-emerald-600">{stats.good}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Pages in good shape</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-3xl font-display text-amber-600">{stats.needsWork}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Pages needing work</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-3xl font-display text-red-600">{stats.poor}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Pages scoring poor</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-3xl font-display">{stats.total}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Pages monitored</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fix these first */}
          <Card>
            <CardHeader>
              <CardTitle>Fix these first</CardTitle>
              <CardDescription>The most common SEO issues across the site</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.issues.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No SEO issues detected. Every page passes the editorial checks.
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {stats.issues.map((issue) => {
                    const label = ISSUE_LABELS.find((l) => l.key === issue.key)?.label ?? issue.key
                    return (
                      <li key={issue.key} className="flex items-center justify-between gap-2 py-2 border-b last:border-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <Badge variant="destructive" className="font-mono">{issue.count}</Badge>
                          <span className="text-sm truncate">{label}</span>
                        </div>
                        <Link href={`/admin/seo/pages?issue=${issue.key}`}>
                          <Button size="sm" variant="ghost">Show pages →</Button>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Progress by type */}
          <Card>
            <CardHeader>
              <CardTitle>Progress by content type</CardTitle>
              <CardDescription>Average SEO score per content type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {stats.byType.map((t) => (
                  <div key={t.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.label} <span className="text-muted-foreground">({t.count})</span></span>
                      <span className={bandColor(t.avg)}>{t.avg}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={t.avg >= 85 ? 'bg-emerald-500' : t.avg >= 60 ? 'bg-amber-500' : 'bg-red-500'}
                        style={{ width: `${t.avg}%`, height: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Score = checks passed ÷ checks that apply. Good ≥ 85, Needs work 60–84, Poor &lt; 60.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hidden-from-Google count + Jump-in */}
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 text-sm">
            <div>
              <Badge variant="secondary">{stats.noindex}</Badge>
              <span className="text-muted-foreground ml-2">pages hidden from Google</span>
            </div>
            <Link href="/admin/seo/pages" className="ml-auto">
              <Button size="sm" variant="outline">Open all pages →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
