'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Save, Send, Check, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  saveSaleDraftAction,
  saveSaleItemsAction,
  submitSaleAction,
  approveSaleAction,
  sendBackSaleAction,
  endSaleAction,
  deleteSaleAction,
} from '@/actions/sales'
import { formatNGN } from '@/lib/format'

type SaleItem = {
  id: string
  productId: string
  pct: number | null
  reasonId: string | null
  reason: string | null
  note: string | null
  flawPhotoUrl: string | null
  product: {
    id: string
    name: string
    slug: string
    price: number
    images: { url: string }[]
    category: { name: string } | null
  }
}

type SaleEvent = {
  id: string
  text: string
  actor: { name: string | null; email: string } | null
  createdAt: string
}

type Sale = {
  id: string
  name: string
  kind: 'CAMPAIGN' | 'CLEARANCE'
  status: string
  startsAt: string
  endsAt: string | null
  defaultPct: number
  home: boolean
  countdown: boolean
  allowFlawOnHome: boolean
  bundleSavingOnSale: boolean
  blockPromoCodes: boolean
  headline: string | null
  subheadline: string | null
  announcement: string | null
  sentBackNote: string | null
  revision: number
  items: SaleItem[]
  events: SaleEvent[]
}

type DealReason = {
  id: string
  label: string
  type: string
  returnRule: string
}

type DealSettings = {
  roundTo: number
  minPercent: number
  maxPercent: number
  ownerOnlyAbove: number
  homeMinItems: number
  homeMaxCards: number
  countdownHours: number
  urgentHours: number
}

export function SaleEditor({
  sale,
  dealReasons,
  dealSettings,
  canApprove,
}: {
  sale: Sale
  dealReasons: DealReason[]
  dealSettings: DealSettings
  canApprove: boolean
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [tab, setTab] = useState<'details' | 'products' | 'activity'>('details')

  // Step 1 fields
  const [name, setName] = useState(sale.name)
  const [kind, setKind] = useState(sale.kind)
  const [startsAt, setStartsAt] = useState(sale.startsAt.slice(0, 16))
  const [endsAt, setEndsAt] = useState(sale.endsAt?.slice(0, 16) ?? '')
  const [headline, setHeadline] = useState(sale.headline ?? '')
  const [subheadline, setSubheadline] = useState(sale.subheadline ?? '')
  const [announcement, setAnnouncement] = useState(sale.announcement ?? '')

  // Step 2: products
  const [items, setItems] = useState<SaleItem[]>(sale.items)
  const [defaultPct, setDefaultPct] = useState(sale.defaultPct)

  // Step 4: homepage rules
  const [home, setHome] = useState(sale.home)
  const [countdown, setCountdown] = useState(sale.countdown)
  const [allowFlawOnHome, setAllowFlawOnHome] = useState(sale.allowFlawOnHome)
  const [bundleSavingOnSale, setBundleSavingOnSale] = useState(sale.bundleSavingOnSale)
  const [blockPromoCodes, setBlockPromoCodes] = useState(sale.blockPromoCodes)

  const isDraft = sale.status === 'DRAFT'
  const isPending = sale.status === 'PENDING'
  const isLive = sale.status === 'LIVE'
  const canEdit = isDraft || isPending

  function saveDraft() {
    startTransition(async () => {
      const r = await saveSaleDraftAction({
        saleId: sale.id,
        revision: sale.revision,
        name,
        kind,
        startsAt,
        endsAt: kind === 'CLEARANCE' ? null : endsAt,
        headline,
        subheadline,
        announcement,
        home,
        countdown,
        allowFlawOnHome,
        bundleSavingOnSale,
        blockPromoCodes,
      })
      if (r.ok) toast.success('Draft saved.')
      else toast.error(r.error)
    })
  }

  function saveItems() {
    startTransition(async () => {
      const r = await saveSaleItemsAction({
        saleId: sale.id,
        items: items.map((i) => ({
          productId: i.productId,
          pct: i.pct ?? undefined,
          reasonId: i.reasonId ?? undefined,
          reasonLabel: dealReasons.find((r) => r.id === i.reasonId)?.label ?? undefined,
          note: i.note ?? undefined,
          flawPhotoUrl: i.flawPhotoUrl ?? undefined,
        })),
      })
      if (r.ok) toast.success(`${r.count} products saved.`)
      else toast.error(r.error)
    })
  }

  function submitForApproval() {
    startTransition(async () => {
      const r = await submitSaleAction(sale.id)
      if (r.ok) { toast.success('Submitted for approval.'); router.refresh() }
      else toast.error(r.error)
    })
  }

  function approve() {
    startTransition(async () => {
      const r = await approveSaleAction(sale.id)
      if (r.ok) { toast.success('Campaign approved and published.'); router.refresh() }
      else toast.error(r.error)
    })
  }

  function endCampaign() {
    if (!confirm('End this campaign now? Normal prices will be restored.')) return
    startTransition(async () => {
      const r = await endSaleAction(sale.id)
      if (r.ok) { toast.success('Campaign ended.'); router.refresh() }
      else toast.error(r.error)
    })
  }

  function deleteCampaign() {
    if (!confirm('Delete this draft campaign? This cannot be undone.')) return
    startTransition(async () => {
      const r = await deleteSaleAction(sale.id)
      if (r.ok) { toast.success('Campaign deleted.'); router.push('/admin/sales') }
      else toast.error(r.error)
    })
  }

  function updateItemPct(index: number, pct: number) {
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, pct } : it))
  }

  function updateItemReason(index: number, reasonId: string) {
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, reasonId } : it))
  }

  function updateItemNote(index: number, note: string) {
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, note } : it))
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function calcSalePrice(price: number, pct: number | null): number {
    const p = pct ?? defaultPct
    const raw = price * (1 - p / 100)
    return Math.round(raw / dealSettings.roundTo) * dealSettings.roundTo
  }

  // Validation
  const errors: string[] = []
  if (!name.trim()) errors.push('Campaign name is required')
  if (!headline.trim()) errors.push('Homepage headline is required')
  if (kind === 'CAMPAIGN' && !endsAt) errors.push('End date is required for timed campaigns')
  if (items.length === 0) errors.push('At least one product is required')
  items.forEach((it, i) => {
    if (!it.reasonId) errors.push(`Product "${it.product.name}" needs a deal reason`)
  })

  return (
    <div className="p-6 space-y-6">
      {/* Tab nav */}
      <div className="flex gap-2 border-b border-border">
        {[
          { key: 'details', label: 'Details & Settings' },
          { key: 'products', label: `Products (${items.length})` },
          { key: 'activity', label: 'Activity Log' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-4 py-2 text-sm border-b-2 ${tab === t.key ? 'border-foreground font-medium' : 'border-transparent text-muted-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Details tab */}
      {tab === 'details' && (
        <div className="space-y-4 max-w-2xl">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label htmlFor="name">Campaign name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!canEdit} className="mt-1" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="start">Start date & time</Label>
                  <Input id="start" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} disabled={!canEdit} className="mt-1" />
                </div>
                {kind === 'CAMPAIGN' && (
                  <div>
                    <Label htmlFor="end">End date & time</Label>
                    <Input id="end" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} disabled={!canEdit} className="mt-1" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="headline">Homepage headline (max 60)</Label>
                <Input id="headline" maxLength={60} value={headline} onChange={(e) => setHeadline(e.target.value)} disabled={!canEdit} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="sub">Supporting headline (max 140)</Label>
                <Textarea id="sub" maxLength={140} value={subheadline} onChange={(e) => setSubheadline(e.target.value)} disabled={!canEdit} className="mt-1" rows={2} />
              </div>

              <div>
                <Label htmlFor="announce">Announcement bar (max 80)</Label>
                <Input id="announce" maxLength={80} value={announcement} onChange={(e) => setAnnouncement(e.target.value)} disabled={!canEdit} className="mt-1" />
              </div>

              <div>
                <Label htmlFor="pct">Default discount percentage ({dealSettings.minPercent}-{dealSettings.maxPercent}%)</Label>
                <Input id="pct" type="number" min={dealSettings.minPercent} max={dealSettings.maxPercent} value={defaultPct} onChange={(e) => setDefaultPct(Number(e.target.value))} disabled={!canEdit} className="mt-1" />
              </div>

              {/* Homepage & rules */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label>Show on homepage</Label>
                  <input type="checkbox" checked={home} onChange={(e) => setHome(e.target.checked)} disabled={!canEdit} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable countdown</Label>
                  <input type="checkbox" checked={countdown} onChange={(e) => setCountdown(e.target.checked)} disabled={!canEdit} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow flawed products on homepage</Label>
                  <input type="checkbox" checked={allowFlawOnHome} onChange={(e) => setAllowFlawOnHome(e.target.checked)} disabled={!canEdit} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Block promo codes on sale products</Label>
                  <input type="checkbox" checked={blockPromoCodes} onChange={(e) => setBlockPromoCodes(e.target.checked)} disabled={!canEdit} />
                </div>
              </div>

              {sale.sentBackNote && (
                <div className="rounded-md border-l-4 border-red-400 bg-red-50 p-3 text-sm">
                  <strong>Sent back:</strong> {sale.sentBackNote}
                </div>
              )}
            </CardContent>
          </Card>

          {canEdit && (
            <Button onClick={saveDraft} disabled={pending} variant="outline">
              {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Draft
            </Button>
          )}
        </div>
      )}

      {/* Products tab */}
      {tab === 'products' && (
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No products added yet.</p>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground border-b">
                  <tr>
                    <th className="text-left p-3">Product</th>
                    <th className="text-right p-3">Normal Price</th>
                    <th className="text-right p-3">Discount %</th>
                    <th className="text-right p-3">Sale Price</th>
                    <th className="text-left p-3">Reason</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => {
                    const sp = calcSalePrice(it.product.price, it.pct)
                    return (
                      <tr key={it.id} className="border-b last:border-0">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {it.product.images[0] ? (
                              <img src={it.product.images[0].url} alt={it.product.name} className="h-10 w-10 rounded object-cover" />
                            ) : <div className="h-10 w-10 rounded bg-muted" />}
                            <span className="font-medium">{it.product.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-right tabular-nums">{formatNGN(it.product.price)}</td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min={dealSettings.minPercent}
                            max={dealSettings.maxPercent}
                            value={it.pct ?? defaultPct}
                            onChange={(e) => updateItemPct(i, Number(e.target.value))}
                            disabled={!canEdit}
                            className="w-16 rounded border px-2 py-1 text-right"
                          />
                        </td>
                        <td className="p-3 text-right tabular-nums font-medium">{formatNGN(sp)}</td>
                        <td className="p-3">
                          <select
                            value={it.reasonId ?? ''}
                            onChange={(e) => updateItemReason(i, e.target.value)}
                            disabled={!canEdit}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            <option value="">Select reason</option>
                            {dealReasons.map((r) => (
                              <option key={r.id} value={r.id}>{r.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3">
                          {canEdit && (
                            <Button size="sm" variant="ghost" onClick={() => removeItem(i)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {canEdit && items.length > 0 && (
            <Button onClick={saveItems} disabled={pending} variant="outline">
              {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Products
            </Button>
          )}
        </div>
      )}

      {/* Activity log tab */}
      {tab === 'activity' && (
        <div className="space-y-2 max-w-2xl">
          {sale.events.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No activity yet.</p>
          ) : (
            sale.events.map((e) => (
              <div key={e.id} className="flex gap-3 border-b last:border-0 py-2">
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(e.createdAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                </div>
                <div className="text-sm flex-1">
                  {e.text}
                  {e.actor && <span className="text-xs text-muted-foreground"> — {e.actor.name || e.actor.email}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        {canEdit && (
          <Button onClick={submitForApproval} disabled={pending || errors.length > 0}>
            {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Submit for Approval
          </Button>
        )}
        {isPending && canApprove && (
          <Button onClick={approve} disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
            Approve & Publish
          </Button>
        )}
        {isLive && canApprove && (
          <Button onClick={endCampaign} disabled={pending} variant="destructive">
            <X className="h-4 w-4 mr-2" />
            End Campaign
          </Button>
        )}
        {isDraft && (
          <Button onClick={deleteCampaign} disabled={pending} variant="ghost" className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Draft
          </Button>
        )}
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="rounded-md border-l-4 border-red-400 bg-red-50 p-3 text-sm">
          <strong>Cannot submit:</strong>
          <ul className="mt-1 list-disc list-inside">
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
