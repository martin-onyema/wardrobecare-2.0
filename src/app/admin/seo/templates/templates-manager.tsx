'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Loader2, Save, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { saveTemplateAction, applyTemplatesToAllAction } from '@/actions/seo'
import type { SeoContentType } from '@/lib/seo'

type Template = {
  contentType: SeoContentType
  titleTemplate: string
  descriptionTemplate: string
  introTemplate: string
  altTemplate: string
}

const CONTENT_TYPE_LABELS: Record<SeoContentType, string> = {
  category: 'Categories & subcategories',
  product: 'Products',
  service: 'Services',
  page: 'Pages & guides',
}

export function TemplatesManager({
  initialTemplates,
  emptyCount,
}: {
  initialTemplates: Template[]
  emptyCount: number
}) {
  const [pending, startTransition] = useTransition()
  const [templates, setTemplates] = useState<Record<SeoContentType, Template>>(
    () => {
      const m: any = {}
      for (const t of initialTemplates) m[t.contentType] = t
      return m
    }
  )

  function setField(type: SeoContentType, field: keyof Template, value: string) {
    setTemplates((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }))
  }

  function save(type: SeoContentType) {
    startTransition(async () => {
      const t = templates[type]
      const r = await saveTemplateAction({
        contentType: type,
        titleTemplate: t.titleTemplate,
        descriptionTemplate: t.descriptionTemplate,
        introTemplate: t.introTemplate,
        altTemplate: t.altTemplate,
      })
      if (r.ok) toast.success(`${CONTENT_TYPE_LABELS[type]} template saved.`)
      else toast.error(r.error)
    })
  }

  function applyAll() {
    if (!confirm(`This will fill ${emptyCount} empty SEO field(s) across the site. Existing values are NEVER overwritten. Continue?`)) return
    startTransition(async () => {
      const r = await applyTemplatesToAllAction()
      if (r.ok) {
        toast.success(`Filled ${r.filledCount} empty field(s) — categories: ${r.byType.category}, products: ${r.byType.product}, services: ${r.byType.service}, pages: ${r.byType.page}`)
      } else {
        toast.error(r.error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3 text-sm">
            <div>
              <strong>Templates</strong> are used to fill <strong>empty</strong> SEO fields so no page is left blank. Existing values are never overwritten.
              <br />
              Tokens: <code className="bg-muted px-1">{'{name}'}</code> for the page name, <code className="bg-muted px-1">{'{name_lc}'}</code> for lowercase. Edit a template, save it, then apply to all empty fields at once.
            </div>
            <div className="ml-auto flex flex-col items-end gap-2">
              <Button onClick={applyAll} disabled={pending}>
                {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Wand2 className="size-4 mr-2" />}
                Apply to all empty fields
              </Button>
              <span className="text-xs text-muted-foreground">
                {emptyCount} empty field{emptyCount === 1 ? '' : 's'} would be filled
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {(['category', 'product', 'service', 'page'] as SeoContentType[]).map((type) => {
        const t = templates[type]
        const hasIntro = type === 'category'
        const hasAlt = type === 'product'
        return (
          <Card key={type}>
            <CardHeader>
              <CardTitle>{CONTENT_TYPE_LABELS[type]}</CardTitle>
              <CardDescription>
                Default SEO values applied to new {CONTENT_TYPE_LABELS[type].toLowerCase()}.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <Label htmlFor={`tpl-title-${type}`}>Page title template</Label>
                <Input
                  id={`tpl-title-${type}`}
                  value={t.titleTemplate}
                  onChange={(e) => setField(type, 'titleTemplate', e.target.value)}
                  className="mt-1 font-mono text-sm"
                />
              </div>
              <div>
                <Label htmlFor={`tpl-desc-${type}`}>Meta description template</Label>
                <Textarea
                  id={`tpl-desc-${type}`}
                  value={t.descriptionTemplate}
                  onChange={(e) => setField(type, 'descriptionTemplate', e.target.value)}
                  className="mt-1 text-sm"
                  rows={2}
                />
              </div>
              {hasIntro && (
                <div>
                  <Label htmlFor={`tpl-intro-${type}`}>Intro text template (categories only)</Label>
                  <Textarea
                    id={`tpl-intro-${type}`}
                    value={t.introTemplate}
                    onChange={(e) => setField(type, 'introTemplate', e.target.value)}
                    className="mt-1 text-sm"
                    rows={4}
                  />
                </div>
              )}
              {hasAlt && (
                <div>
                  <Label htmlFor={`tpl-alt-${type}`}>Image alt text template (products only)</Label>
                  <Input
                    id={`tpl-alt-${type}`}
                    value={t.altTemplate}
                    onChange={(e) => setField(type, 'altTemplate', e.target.value)}
                    className="mt-1 font-mono text-sm"
                  />
                </div>
              )}
              <div>
                <Button onClick={() => save(type)} disabled={pending} size="sm">
                  {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                  Save {CONTENT_TYPE_LABELS[type]} template
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
