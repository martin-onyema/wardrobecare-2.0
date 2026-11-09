import Link from 'next/link'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Developer Notes · SEO Manager',
  robots: { index: false, follow: false },
}

export default async function SeoNotesPage() {
  await requireAdmin()
  const perms = await getMyPermissionCodes()

  return (
    <AdminLayout
      title="Developer Notes"
      description="How the SEO Manager is wired — for the engineering team"
      permissions={perms}
    >
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link href="/admin/seo"><Button variant="ghost" size="sm">Overview</Button></Link>
          <Link href="/admin/seo/pages"><Button variant="ghost" size="sm">All pages</Button></Link>
          <Link href="/admin/seo/templates"><Button variant="ghost" size="sm">Auto templates</Button></Link>
          <Link href="/admin/seo/redirects"><Button variant="ghost" size="sm">Redirects</Button></Link>
          <Link href="/admin/seo/sitemap"><Button variant="ghost" size="sm">Sitemap &amp; robots</Button></Link>
          <Link href="/admin/seo/notes"><Button variant="secondary" size="sm">Developer notes</Button></Link>
        </nav>

        <Card>
          <CardHeader>
            <CardTitle>SEO field map</CardTitle>
            <CardDescription>Where each field is stored and where it's used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground border-b">
                  <tr>
                    <th className="text-left py-2 px-3">SEO field</th>
                    <th className="text-left py-2 px-3">Applies to</th>
                    <th className="text-left py-2 px-3">Stored on</th>
                    <th className="text-left py-2 px-3">Used for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['seoTitle', 'all', 'Category / Product / SeoOverride', '<title>, og:title'],
                    ['seoDescription', 'all', 'Category / Product / SeoOverride', 'meta description, og:description'],
                    ['h1 / seoH1', 'category, service, page', 'Category.seoH1 / SeoOverride.h1', 'page H1 heading (products use product name)'],
                    ['introText / seoIntroText', 'category, service', 'Category.seoIntroText / SeoOverride.introText', 'text above the product grid / service body'],
                    ['imageAlt', 'product images', 'ProductImage.altText', 'alt attribute on <img>'],
                    ['ogImage / seoOgImage', 'all', 'Product.ogImage / Category.seoOgImage / SeoOverride.ogImage', 'og:image, twitter:image (1200×630)'],
                    ['noindex', 'all', 'Product.noindex / Category.noindex / SeoOverride.noindex', 'robots meta tag (noindex) and excludes from sitemap'],
                    ['inSitemap', 'all', 'Product.inSitemap / Category.inSitemap / SeoOverride.inSitemap', 'inclusion in /sitemap.xml'],
                    ['slug', 'all', 'Category.slug / Product.slug (DB) / route (SeoOverride)', 'URL; changing creates a Redirect row'],
                    ['SeoTemplate', 'per content type', 'SeoTemplate table (singleton per type)', 'fills empty fields; never overwrites'],
                    ['Redirect', 'site-wide', 'Redirect table (fromPath, toPath, statusCode)', '308 redirects on slug change or manual add'],
                    ['SeoAuditLog', 'site-wide', 'SeoAuditLog table', 'records every SEO field change with who + when'],
                  ].map(([f, applies, stored, used]) => (
                    <tr key={f} className="border-b last:border-0">
                      <td className="py-2 px-3 font-mono text-xs">{f}</td>
                      <td className="py-2 px-3 text-xs">{applies}</td>
                      <td className="py-2 px-3 text-xs">{stored}</td>
                      <td className="py-2 px-3 text-xs">{used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each public page uses Next.js&apos; <code>generateMetadata</code> API. The product, service and category hub pages read from the SEO fields above and fall back to the product/service/category name + description if a field is empty. The <code>SeoOverride</code> table is queried for static pages and services — keyed by route. Canonical URLs are set via <code>alternates.canonical</code> in the metadata object. OpenGraph image uses the saved share image; if none, the product&apos;s first image is used.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redirect architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Next.js middleware (<code>src/middleware.ts</code>) wraps the existing stealth admin proxy and adds redirect handling: on every request, the path is looked up in the <code>Redirect</code> table (cached for 60 seconds). If found, a {`{ statusCode }`} response is returned with the <code>Location</code> header set to the new path. Duplicate sources are prevented at the DB level via a unique constraint on <code>fromPath</code>. Loops are prevented in <code>addRedirectAction</code> by rejecting a destination that is itself a redirect source.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Slug changes in the editor automatically create a <code>308 Permanent Redirect</code> from the old URL to the new one, with the note <code>&quot;slug change (category|product)&quot;</code>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Indexing rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>A record is included in the sitemap only if <code>inSitemap = true</code> <strong>and</strong> <code>noindex = false</code>.</li>
              <li>A noindex record is never in the sitemap, even if <code>inSitemap = true</code> — the editor disables the sitemap toggle when noindex is on.</li>
              <li>Unpublished products (<code>published = false</code> or status <code>ARCHIVED</code>/<code>DISCONTINUED</code>) are excluded from the sitemap automatically, regardless of <code>inSitemap</code>.</li>
              <li>Inactive categories (<code>active = false</code>) are excluded from the sitemap.</li>
              <li>Coming-soon services (marked <code>comingSoon: true</code> in services-data.ts) are excluded from the sitemap by default — admins can override via the editor.</li>
              <li>Robots.txt is a hint — the real enforcement is the <code>noindex</code> meta tag, set via the metadata object when <code>noindex = true</code>.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sitemap generation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <code>/sitemap.xml</code> is generated on demand by <code>src/app/sitemap.ts</code> using the Next.js MetadataRoute API. It queries the same DB and applies the same inclusion rules as the admin Sitemap tab. The sitemap is regenerated automatically whenever a SEO field or slug changes (via <code>revalidatePath(&#39;/sitemap.xml&#39;)</code> in the save action). The &quot;Regenerate sitemap now&quot; button forces a revalidation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Any staff member (any role except CUSTOMER) can view the SEO Manager.</li>
              <li>Editing SEO fields (title, description, h1, intro, og image) is allowed for staff with the relevant content permission (e.g. <code>product.update</code>, <code>category.manage</code>, <code>cms.manage</code>).</li>
              <li>Changing slugs, noindex, inSitemap requires the <strong>ADMIN</strong> role — these affect URLs or hide pages from Google.</li>
              <li>Managing redirects and global SEO templates requires the <strong>ADMIN</strong> role.</li>
              <li>Every change writes a <code>SeoAuditLog</code> row recording who changed what, when, and the old/new value. Visible via the developer console only (no UI yet).</li>
              <li>Server actions are the source of truth — frontend role checks are convenience, not security. <code>requireSuperAdmin()</code> is the gate for any sensitive action.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO validation rules</CardTitle>
            <CardDescription>Editorial recommendations, not Google ranking requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>SEO title: 20–62 characters. Keyword first, brand last.</li>
              <li>Meta description: 70–160 characters. One benefit, one proof point.</li>
              <li>SEO title and meta description should be unique across the site.</li>
              <li>URL slug: lowercase letters, numbers and hyphens only.</li>
              <li>H1 present (products use the product name as fallback).</li>
              <li>Intro text: at least 40 words for categories and services.</li>
              <li>Every product image has meaningful alt text.</li>
              <li>Share image set (1200×630) for WhatsApp and social previews.</li>
              <li>A noindex page must not be in the sitemap.</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3 italic">
              These are checked live in the editor and used for the score. None of them prevent saving — they are recommendations, not hard blocks. The score is checks passed ÷ checks that apply.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
