import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { getSeoRecordForEdit, findNextPageNeedingWork } from '@/lib/seo-queries'
import { buildDuplicateMaps } from '@/lib/seo'
import { SeoEditor } from './seo-editor'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit SEO',
  robots: { index: false, follow: false },
}

type Params = Promise<{ type: string; id: string }>

export default async function SeoEditPage({ params }: { params: Params }) {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const { type, id } = await params

  // Decode the id (it's URL-encoded because routes contain slashes)
  const decodedId = decodeURIComponent(id)
  const validTypes = ['category', 'product', 'service', 'page']
  if (!validTypes.includes(type)) notFound()

  const record = await getSeoRecordForEdit(type, decodedId)
  if (!record) notFound()

  // Build duplicate maps so the editor can show live uniqueness checks
  const dups = await buildDuplicateMaps()

  // Pre-compute the next page needing work, for the "Next →" button
  const next = await findNextPageNeedingWork(type, decodedId)

  return (
    <AdminLayout
      title="Edit SEO"
      description={`${record.type} · ${record.name}`}
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        {/* Sub-navigation */}
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="ghost" size="sm">Developer notes</Button></Link>
        </nav>

        <SeoEditor
          record={record}
          dups={dups}
          next={next}
        />
      </div>
    </AdminLayout>
  )
}
