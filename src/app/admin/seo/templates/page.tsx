import Link from 'next/link'
import { requireSuperAdmin } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllTemplates } from '@/lib/seo'
import { db } from '@/lib/db'
import { SERVICES } from '@/lib/services-data'
import { TemplatesManager } from './templates-manager'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Auto Templates · SEO Manager',
  robots: { index: false, follow: false },
}

export default async function SeoTemplatesPage() {
  await requireSuperAdmin()
  const perms = await getMyPermissionCodes()
  const templates = await getAllTemplates()

  // Count empty fields across the catalogue — for the "Apply to all empty fields" pre-count.
  // Wrapped in try/catch because the new SEO columns may not exist yet if the migration
  // hasn't been applied. In that case, we fall back to counting only the pre-existing
  // fields (seoTitle, seoDescription).
  let emptyCount = 0

  // Categories — try with new columns, fall back without
  let categories: any[] = []
  try {
    categories = await db.category.findMany({ select: { seoTitle: true, seoDescription: true, seoH1: true, seoIntroText: true } })
  } catch {
    categories = await db.category.findMany({ select: { seoTitle: true, seoDescription: true } })
  }
  for (const c of categories) {
    if (!c.seoTitle) emptyCount++
    if (!c.seoDescription) emptyCount++
    if ((c as any).seoH1 === undefined ? true : !(c as any).seoH1) emptyCount++
    if ((c as any).seoIntroText === undefined ? false : !(c as any).seoIntroText) emptyCount++
  }

  // Products — try with new columns, fall back without
  let products: any[] = []
  try {
    products = await db.product.findMany({
      select: {
        seoTitle: true, seoDescription: true, seoH1: true,
        images: { select: { altText: true }, orderBy: { position: 'asc' }, take: 1 },
      },
    })
  } catch {
    products = await db.product.findMany({
      select: {
        seoTitle: true, seoDescription: true,
        images: { select: { altText: true }, orderBy: { position: 'asc' }, take: 1 },
      },
    })
  }
  for (const p of products) {
    if (!p.seoTitle) emptyCount++
    if (!p.seoDescription) emptyCount++
    if ((p as any).seoH1 === undefined ? true : !(p as any).seoH1) emptyCount++
    if (p.images[0] && !p.images[0].altText) emptyCount++
  }

  // Overrides — try, fall back to empty list if table doesn't exist
  let overrides: any[] = []
  try {
    overrides = await db.seoOverride.findMany({ select: { route: true, contentType: true, seoTitle: true, seoDescription: true, h1: true, introText: true } })
  } catch {
    overrides = []
  }

  // Services and pages — count missing fields across all known routes
  const serviceRoutes = SERVICES.map((s) => `/services/${s.slug}`)
  const { STATIC_PAGES } = await import('@/lib/seo')
  const pageRoutes = STATIC_PAGES.map((p) => p.route)
  for (const route of [...serviceRoutes, ...pageRoutes]) {
    const ov = overrides.find((o) => o.route === route)
    if (!ov?.seoTitle) emptyCount++
    if (!ov?.seoDescription) emptyCount++
    if (!ov?.h1) emptyCount++
    if (!ov?.introText) emptyCount++
  }

  return (
    <AdminLayout
      title="Auto Templates"
      description="Patterns used to fill empty SEO fields so no page is left blank"
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="secondary" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Templates are stored in the database and persist across deployments. They are applied as defaults — never overwriting existing SEO content.
            </p>
          </CardContent>
        </Card>

        <TemplatesManager initialTemplates={templates} emptyCount={emptyCount} />
      </div>
    </AdminLayout>
  )
}
