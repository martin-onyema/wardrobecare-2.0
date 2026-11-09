import Link from 'next/link'
import { requireSuperAdmin } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { RedirectsManager } from './redirects-manager'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Redirects · SEO Manager',
  robots: { index: false, follow: false },
}

export default async function SeoRedirectsPage() {
  await requireSuperAdmin()
  const perms = await getMyPermissionCodes()

  const redirects = await db.redirect.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      fromPath: true,
      toPath: true,
      statusCode: true,
      note: true,
      createdAt: true,
    },
  })

  const serialised = redirects.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }))

  return (
    <AdminLayout
      title="Redirects"
      description={`${redirects.length} redirect${redirects.length === 1 ? '' : 's'} configured`}
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="secondary" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        <RedirectsManager initial={serialised} />
      </div>
    </AdminLayout>
  )
}
