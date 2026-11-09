'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2, Save, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  saveSeoAction,
  fillFromTemplateAction,
} from '@/actions/seo'
import {
  checksFor,
  scoreFor,
  bandFor,
  type SeoPageRecord,
} from '@/lib/seo'

type Dups = { titles: Record<string, number>; descs: Record<string, number> }

export function SeoEditor({
  record,
  dups,
  next,
}: {
  record: SeoPageRecord
  dups: Dups
  next: { type: string; id: string } | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [seoTitle, setSeoTitle] = useState(record.seoTitle)
  const [seoDescription, setSeoDescription] = useState(record.seoDescription)
  const [h1, setH1] = useState(record.h1)
  const [introText, setIntroText] = useState(record.introText)
  const [ogImage, setOgImage] = useState(record.ogImage)
  const [imageAlt, setImageAlt] = useState(record.imageAlt)
  // For category/product: store slug (without leading /product/ or /shop?category=).
  // For service/page: store the route.
  const [url, setUrl] = useState(
    record.type === 'category' || record.type === 'product'
      ? record.url.split('/').pop() || record.url
      : record.url
  )
  const [noindex, setNoindex] = useState(record.noindex)
  const [inSitemap, setInSitemap] = useState(record.inSitemap)

  const isProduct = record.type === 'product'
  const hasIntro = record.type === 'category' || record.type === 'service'

  // Live computed values
  const liveRecord: SeoPageRecord = useMemo(() => ({
    ...record,
    seoTitle,
    seoDescription,
    h1,
    introText,
    ogImage,
    imageAlt,
    url:
      record.type === 'category'
        ? `/shop?category=${url}`
        : record.type === 'product'
        ? `/product/${url}`
        : url,
    noindex,
    inSitemap,
  }), [record, seoTitle, seoDescription, h1, introText, ogImage, imageAlt, url, noindex, inSitemap])

  const checks = useMemo(() => checksFor(liveRecord, dups), [liveRecord, dups])
  const score = useMemo(() => scoreFor(liveRecord, dups), [liveRecord, dups])
  const band = bandFor(score)

  // SERP preview
  const serpTitle = seoTitle.length > 62 ? seoTitle.slice(0, 60).trim() + '…' : (seoTitle || '(no title)')
  const serpDesc = seoDescription.length > 160 ? seoDescription.slice(0, 157).trim() + '…' : (seoDescription || '(no description — Google will pick text from the page)')
  const serpUrl = `wardrobecare.com.ng${liveRecord.url.replace(/\//g, ' › ').replace(/^ › /, '› ')}`

  function handleSave() {
    startTransition(async () => {
      const result = await saveSeoAction({
        type: record.type,
        id: record.id,
        seoTitle,
        seoDescription,
        h1,
        introText,
        ogImage,
        imageAlt,
        url,
        noindex,
        inSitemap,
      })
      if (result.ok) {
        toast.success(
          result.redirectCreated
            ? 'Saved — and a 301 redirect was created from the old URL.'
            : 'Saved and published.'
        )
        router.refresh()
      } else {
        toast.error(result.error)
      }
    })
  }

  function handleFillFromTemplate() {
    startTransition(async () => {
      const result = await fillFromTemplateAction({
        type: record.type,
        id: record.id,
        name: record.name,
      })
      if (result.ok) {
        if (result.filledCount === 0) {
          toast.info('No empty fields to fill — every field already has a value.')
        } else {
          toast.success(`Filled ${result.filledCount} empty field(s) from the template.`)
          router.refresh()
          // Re-fetch the record to refresh local state
          setTimeout(() => window.location.reload(), 800)
        }
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
      {/* LEFT: form */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="capitalize">{record.type}</span>
              {record.parent && <span className="text-sm font-normal text-muted-foreground">· under {record.parent}</span>}
            </CardTitle>
            <CardDescription className="text-base font-medium text-foreground">{record.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <Label htmlFor="seo-title">Page title</Label>
                <span className={seoTitle.length >= 20 && seoTitle.length <= 62 ? 'text-emerald-600' : 'text-amber-600'}>
                  {seoTitle.length} / 62
                </span>
              </div>
              <Input
                id="seo-title"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={`${record.name} — Wardrobecare`}
              />
              <p className="text-xs text-muted-foreground mt-1 italic">Keyword first, brand last. Aim for 20–62 characters.</p>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <Label htmlFor="seo-desc">Meta description</Label>
                <span className={seoDescription.length >= 70 && seoDescription.length <= 160 ? 'text-emerald-600' : 'text-amber-600'}>
                  {seoDescription.length} / 160
                </span>
              </div>
              <Textarea
                id="seo-desc"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="One benefit, one proof point. 70–160 characters."
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1 italic">Shown on Google results and WhatsApp / social previews.</p>
            </div>

            <div>
              <Label htmlFor="h1">Page heading (H1)</Label>
              <Input
                id="h1"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                placeholder={record.name}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1 italic">Products use the product name by default — set this only if you want a different H1.</p>
            </div>

            {hasIntro && (
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <Label htmlFor="intro">Intro text</Label>
                  <span className={introText.trim().split(/\s+/).filter(Boolean).length >= 40 ? 'text-emerald-600' : 'text-amber-600'}>
                    {introText.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <Textarea
                  id="intro"
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  placeholder="Shown above the product grid / service body. Aim for at least 40 words."
                  rows={5}
                />
              </div>
            )}

            {isProduct && (
              <div>
                <Label htmlFor="alt">Main image alt text</Label>
                <Input
                  id="alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder={`${record.name}, front view`}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1 italic">Describe the picture for screen readers and Google image search.</p>
              </div>
            )}

            <div>
              <Label htmlFor="og">Share image (WhatsApp / social, 1200×630)</Label>
              <Input
                id="og"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/images/your-share-image.jpg or full URL"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="url">Page address (slug)</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={record.type === 'category' || record.type === 'product' ? 'lowercase-with-hyphens' : '/about'}
                className="mt-1 font-mono text-sm"
              />
              {record.type === 'category' && (
                <p className="text-xs text-muted-foreground mt-1 italic">Live URL: <code>/shop?category={url}</code>. Changing it creates a 308 redirect from the old address automatically.</p>
              )}
              {record.type === 'product' && (
                <p className="text-xs text-muted-foreground mt-1 italic">Live URL: <code>/product/{url}</code>. Changing it creates a 308 redirect from the old address automatically.</p>
              )}
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div>
                <Label htmlFor="noindex" className="cursor-pointer">Show in Google (index this page)</Label>
                <p className="text-xs text-muted-foreground">Off = hidden from search engines.</p>
              </div>
              <Switch
                id="noindex"
                checked={!noindex}
                onCheckedChange={(checked) => {
                  setNoindex(!checked)
                  if (!checked) setInSitemap(false)
                }}
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div>
                <Label htmlFor="insitemap" className="cursor-pointer">Include in sitemap</Label>
                <p className="text-xs text-muted-foreground">Off = excluded from /sitemap.xml.</p>
              </div>
              <Switch
                id="insitemap"
                checked={inSitemap}
                onCheckedChange={setInSitemap}
                disabled={noindex}
              />
            </div>

            {record.hidden && (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                <strong>Coming soon.</strong> This page is hidden from Google until the underlying record goes live. Toggle index &amp; sitemap on when ready.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleSave} disabled={pending}>
            {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
            Save SEO changes
          </Button>
          <Button onClick={handleFillFromTemplate} disabled={pending} variant="outline">
            <Sparkles className="size-4 mr-2" />
            Fill empty fields from template
          </Button>
          {next && (
            <Link href={`/admin/seo/edit/${next.type}/${encodeURIComponent(next.id)}`}>
              <Button variant="ghost" disabled={pending}>
                Next page needing work <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT: live preview, score, checklist */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-display">
                {score}
              </div>
              <div>
                <Badge
                  variant={band.cls === 'good' ? 'default' : band.cls === 'warn' ? 'secondary' : 'destructive'}
                >
                  {band.label}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Updates as you type</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Google preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-3 bg-white">
              <div className="text-xs text-[#4d5156]">{serpUrl}</div>
              <div className="text-lg text-[#1a0dab] leading-tight mt-1 truncate">{serpTitle}</div>
              <div className="text-xs text-[#4d5156] leading-snug mt-1 line-clamp-2">{serpDesc}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Editorial checklist</CardTitle>
            <CardDescription>Recommendations, not hard blocks — you can save with warnings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1.5">
              {checks.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className={c.ok ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                    {c.ok ? '✓' : '✗'}
                  </span>
                  <span className={c.ok ? '' : 'text-foreground'}>{c.message}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
