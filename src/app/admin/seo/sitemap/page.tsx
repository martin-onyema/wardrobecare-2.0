import Link from 'next/link'
import { requireSuperAdmin } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/db'
import { SERVICES } from '@/lib/services-data'
import { STATIC_PAGES } from '@/lib/seo'
import { SitemapManager } from './sitemap-manager'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sitemap & Robots · SEO Manager',
  robots: { index: false, follow: false },
}

export default async function SeoSitemapPage() {
  await requireSuperAdmin()
  const perms = await getMyPermissionCodes()

  const [categories, products, overrides, lastAudit] = await Promise.all([
    db.category.findMany({
      where: { active: true },
      select: { id: true, name: true, slug: true, parentId: true, noindex: true, inSitemap: true },
    }),
    db.product.findMany({
      where: { published: true, status: 'ACTIVE' },
      select: { id: true, name: true, slug: true, noindex: true, inSitemap: true },
    }),
    db.seoOverride.findMany({
      select: { route: true, contentType: true, name: true, noindex: true, inSitemap: true },
    }),
    db.seoAuditLog.findFirst({
      where: { entityType: 'sitemap', fieldName: '_regenerate' },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    }),
  ])

  // Sitemap included pages — products, categories, services, static pages
  const includedCategories = categories.filter((c) => c.inSitemap && !c.noindex)
  const excludedCategories = categories.filter((c) => !c.inSitemap || c.noindex)
  const includedProducts = products.filter((p) => p.inSitemap && !p.noindex)
  const excludedProducts = products.filter((p) => !p.inSitemap || p.noindex)

  // Services
  const serviceRoutes = SERVICES.map((s) => ({ route: `/services/${s.slug}`, name: s.name, comingSoon: !!s.comingSoon }))
  const includedServices = serviceRoutes.filter((s) => {
    if (s.comingSoon) return false
    const ov = overrides.find((o) => o.route === s.route)
    if (ov) return ov.inSitemap && !ov.noindex
    return true
  })
  const excludedServices = serviceRoutes.filter((s) => {
    if (s.comingSoon) return true
    const ov = overrides.find((o) => o.route === s.route)
    if (ov) return !ov.inSitemap || ov.noindex
    return false
  })

  // Static pages
  const includedPages = STATIC_PAGES.filter((p) => {
    const ov = overrides.find((o) => o.route === p.route)
    if (ov) return ov.inSitemap && !ov.noindex
    // Default for /shop, /services, /, etc. — included
    return true
  })
  const excludedPages = STATIC_PAGES.filter((p) => {
    const ov = overrides.find((o) => o.route === p.route)
    if (ov) return !ov.inSitemap || ov.noindex
    return false
  })

  const totalIncluded = includedCategories.length + includedProducts.length + includedServices.length + includedPages.length
  const totalExcluded = excludedCategories.length + excludedProducts.length + excludedServices.length + excludedPages.length

  const reasonForExclusion = (r: { noindex: boolean; inSitemap: boolean; comingSoon?: boolean }) => {
    if (r.comingSoon) return 'Coming soon / hidden'
    if (r.noindex) return 'Hidden from Google (noindex)'
    if (!r.inSitemap) return 'Marked "not in sitemap"'
    return 'Unknown'
  }

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /api
Disallow: /cart
Disallow: /checkout
Disallow: /track-order
Disallow: /gift-card/checkout
Disallow: /*/book

Sitemap: https://wardrobecare.com.ng/sitemap.xml`

  return (
    <AdminLayout
      title="Sitemap & Robots"
      description="What's included in /sitemap.xml and what's hidden from search engines"
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="secondary" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        {/* Counts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card><CardContent className="p-4"><div className="text-3xl font-display text-emerald-600">{totalIncluded}</div><div className="text-xs uppercase text-muted-foreground mt-1">Pages in sitemap</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-3xl font-display">{totalExcluded}</div><div className="text-xs uppercase text-muted-foreground mt-1">Left out</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-3xl font-display">{includedProducts.length}</div><div className="text-xs uppercase text-muted-foreground mt-1">Products included</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-3xl font-display">{excludedProducts.length}</div><div className="text-xs uppercase text-muted-foreground mt-1">Products excluded</div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Left out of the sitemap</CardTitle>
              <CardDescription>Pages excluded from /sitemap.xml with the reason</CardDescription>
            </CardHeader>
            <CardContent>
              {totalExcluded === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">No pages are excluded. Everything eligible is in the sitemap.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase text-muted-foreground border-b">
                      <tr>
                        <th className="text-left py-2 px-2">Page</th>
                        <th className="text-left py-2 px-2">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {excludedCategories.map((r) => (
                        <tr key={`c-${r.id}`} className="border-b last:border-0">
                          <td className="py-2 px-2">{r.name}<br /><code className="text-xs">/shop?category={r.slug}</code></td>
                          <td className="py-2 px-2"><Badge variant="outline">{reasonForExclusion(r)}</Badge></td>
                        </tr>
                      ))}
                      {excludedProducts.map((r) => (
                        <tr key={`p-${r.id}`} className="border-b last:border-0">
                          <td className="py-2 px-2">{r.name}<br /><code className="text-xs">/product/{r.slug}</code></td>
                          <td className="py-2 px-2"><Badge variant="outline">{reasonForExclusion(r)}</Badge></td>
                        </tr>
                      ))}
                      {excludedServices.map((r) => (
                        <tr key={`s-${r.route}`} className="border-b last:border-0">
                          <td className="py-2 px-2">{r.name}<br /><code className="text-xs">{r.route}</code></td>
                          <td className="py-2 px-2"><Badge variant="outline">{reasonForExclusion({ noindex: r.comingSoon, inSitemap: !r.comingSoon, comingSoon: r.comingSoon })}</Badge></td>
                        </tr>
                      ))}
                      {excludedPages.map((p) => {
                        const ov = overrides.find((o) => o.route === p.route)
                        return (
                          <tr key={`pg-${p.route}`} className="border-b last:border-0">
                            <td className="py-2 px-2">{p.name}<br /><code className="text-xs">{p.route}</code></td>
                            <td className="py-2 px-2"><Badge variant="outline">{reasonForExclusion({ noindex: !!ov?.noindex, inSitemap: !!ov?.inSitemap })}</Badge></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Regenerate sitemap</CardTitle>
                <CardDescription>Force Next.js to rebuild /sitemap.xml on the next request</CardDescription>
              </CardHeader>
              <CardContent>
                <SitemapManager lastRegenerated={lastAudit?.createdAt.toISOString() ?? null} />
                <p className="text-xs text-muted-foreground mt-3 italic">
                  The sitemap regenerates automatically whenever a page is saved, published, hidden or removed. Use this button to force a refresh if you suspect stale data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>robots.txt</CardTitle>
                <CardDescription>Live at <code>/robots.txt</code></CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto whitespace-pre">{robotsTxt}</pre>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Booking flows, account, cart and checkout are never listed in the sitemap. Robots.txt is a hint to crawlers — noindex meta tags / response headers are the real enforcement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
