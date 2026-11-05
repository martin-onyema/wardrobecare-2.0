'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle, Tag } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminAssignPSStylist,
  adminAcceptPSRequest,
  adminApplyPSDiscount,
} from '@/actions/personal-shopping-workflow'
import { psStatusPill, fmtNGN } from '../_shared'

type Request = {
  id: string
  ref: string
  customerName: string
  customerPhone: string
  contactVia: string
  shoppingFor: string
  tier: string
  reviewMethod: string
  area: string | null
  isLagos: boolean
  brief: string
  categories: string
  colours: string
  budget: string
  neededBy: string | null
  brandMentioned: string | null
  brandAcknowledged: string | null
  stylistId: string | null
  sourcingFeePaid: number
  discountLabel: string | null
  discountAmount: number
  status: string
  fittingDate: string | null
  fittingTime: string | null
  fittingArea: string | null
  itemsCount: number
  events: Array<{ note: string | null; actorType: string; createdAt: string }>
}

type Stylist = { id: string; name: string; role: string }

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'NEW', label: 'To accept' },
  { key: 'SOURCING', label: 'Sourcing' },
  { key: 'SENT', label: 'With customer' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'PAID', label: 'Ready' },
  { key: 'FULFILLING', label: 'In progress' },
  { key: 'DONE', label: 'Complete' },
]

export function PSRequestsClient({
  adminEmail,
  canManage,
  requests,
  stylists,
  initialFilter,
  initialSelectedId,
}: {
  adminEmail: string
  canManage: boolean
  requests: Request[]
  stylists: Stylist[]
  initialFilter: string
  initialSelectedId: string | null
}) {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter || 'all')
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && requests.some((r) => r.id === initialSelectedId) ? initialSelectedId : null,
  )

  const filtered = requests.filter((r) => filter === 'all' || r.status === filter)
  const selected = requests.find((r) => r.id === selectedId) ?? null

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
      {/* List */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] border transition-colors ${
                filter === f.key
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Nothing here for you right now.
          </div>
        ) : (
          <div className="border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Ref</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Client</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Type</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Stylist</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const stylist = stylists.find((s) => s.id === r.stylistId)
                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className={`cursor-pointer border-t border-border/60 hover:bg-secondary/40 ${
                        selectedId === r.id ? 'bg-secondary/80' : ''
                      }`}
                    >
                      <td className="px-3 py-2.5 font-mono text-xs">{r.ref}</td>
                      <td className="px-3 py-2.5">
                        <span className="font-medium">{r.customerName}</span>
                        {r.brandMentioned && (
                          <span className="ml-2 inline-block px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] bg-red-100 text-red-800 rounded">
                            <Tag className="inline h-2.5 w-2.5 mr-0.5" />Brand
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">{r.shoppingFor}</p>
                      </td>
                      <td className="px-3 py-2.5 text-xs">
                        {r.tier === 'DELIVERED' ? 'Delivered' : 'In-Person'}
                      </td>
                      <td className="px-3 py-2.5 text-xs">
                        {stylist ? stylist.name : <span className="text-rust italic">Unassigned</span>}
                      </td>
                      <td className="px-3 py-2.5">{psStatusPill(r.status, r.tier)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-3 border-l-4 border-camel bg-secondary/40 px-4 py-3 text-sm text-foreground leading-relaxed">
          <strong className="text-rust">Needed by the website:</strong> a request appears here as
          soon as the sourcing fee is paid. A request with a brand or exact-item mention carries
          a <strong>Brand</strong> tag from the brief guard.
        </div>
      </div>

      {/* Detail */}
      <div>
        {selected ? (
          <PSRequestDetail
            req={selected}
            stylists={stylists}
            canManage={canManage}
            onMutated={() => router.refresh()}
          />
        ) : (
          <div className="border border-border bg-card p-6">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-camel" />
              <p>Select a request to see the brief, assign a stylist and accept it.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PSRequestDetail({
  req,
  stylists,
  canManage,
  onMutated,
}: {
  req: Request
  stylists: Stylist[]
  canManage: boolean
  onMutated: () => void
}) {
  const [assigning, startAssign] = useTransition()
  const [accepting, startAccept] = useTransition()
  const [discountOpen, setDiscountOpen] = useState(false)

  const stylist = stylists.find((s) => s.id === req.stylistId)

  function onAssign(stylistId: string) {
    if (!canManage) return
    startAssign(async () => {
      const r = await adminAssignPSStylist(req.id, stylistId || null)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(stylistId ? `Assigned to ${stylistId}` : 'Unassigned', { duration: 5000 })
      onMutated()
    })
  }

  function onAccept() {
    startAccept(async () => {
      const r = await adminAcceptPSRequest(req.id)
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Accepted. Build the shortlist next.', { duration: 5000 })
      onMutated()
    })
  }

  return (
    <div className="space-y-4">
      <div className="border border-border bg-card">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-base">{req.ref} · {req.customerName}</h3>
          {psStatusPill(req.status, req.tier)}
        </div>
        <div className="p-5 space-y-3 text-sm">
          <KV label="Shopping for">{req.shoppingFor}</KV>
          <KV label="Type">
            {req.tier === 'DELIVERED'
              ? `Delivered to ${req.area}${req.isLagos ? '' : ' (outside Lagos, quote the fee)'}`
              : `In-Person Fitting${req.fittingDate ? `, ${req.fittingDate} ${req.fittingTime}, ${req.fittingArea}` : ''}`}
          </KV>
          <KV label="Shortlist review">
            {req.reviewMethod === 'ONLINE' ? 'Online shortlist' : req.reviewMethod === 'WHATSAPP' ? 'WhatsApp' : 'On-site at the fitting'}
          </KV>
          <KV label="Looking for">{req.categories} · {req.colours}</KV>
          <KV label="Item budget">{req.budget}</KV>
          <KV label="Brief">{req.brief}</KV>
          <KV label="Contact">{req.customerPhone} ({req.contactVia})</KV>
          <KV label="Fee paid">
            {req.sourcingFeePaid === 0 ? 'Nothing (free)' : fmtNGN(req.sourcingFeePaid)}
            {req.discountLabel ? ` · ${req.discountLabel}` : ''}
          </KV>

          {/* Brand guard */}
          {req.brandMentioned && (
            <div className="bg-amber-50 border border-camel px-4 py-3 text-sm leading-relaxed">
              <strong className="text-rust">Brand mentioned: {req.brandMentioned}.</strong> The
              customer saw the Personal Shopping vs Premium Sourcing explanation and
              acknowledged. Match by category, colour, fit and style. Tell them clearly if
              a brand is not what you sourced.
            </div>
          )}

          {/* Stylist assignment */}
          {canManage && req.status !== 'DONE' && (
            <div className="pt-3 border-t border-border">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Stylist
              </label>
              <select
                value={req.stylistId ?? ''}
                onChange={(e) => onAssign(e.target.value)}
                disabled={assigning}
                className="w-full h-10 px-3 text-sm bg-white border border-border disabled:opacity-60"
              >
                <option value="">Unassigned</option>
                {stylists.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role.toLowerCase()})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {req.status === 'NEW' && (
              <button
                type="button"
                onClick={onAccept}
                disabled={accepting || !canManage || !req.stylistId}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                {accepting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Accept and start sourcing
              </button>
            )}
            {canManage && req.status !== 'DONE' && (
              <button
                type="button"
                onClick={() => setDiscountOpen(true)}
                className="inline-flex items-center border border-foreground px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
              >
                {req.discountLabel ? 'Change fee discount' : 'Discount the sourcing fee'}
              </button>
            )}
          </div>
          {req.status === 'NEW' && !req.stylistId && (
            <p className="text-xs text-muted-foreground pt-1">
              Assign a stylist first. Accept unlocks after that.
            </p>
          )}
        </div>
      </div>

      {/* History */}
      <div className="border border-border bg-card">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-display text-sm">History</h3>
        </div>
        <div className="p-5">
          <ul className="space-y-2.5 text-sm">
            {req.events.map((e, i) => (
              <li key={i} className="border-l-2 border-border pl-4">
                <p className="text-foreground">{e.note}</p>
                <p className="text-xs text-muted-foreground">{e.actorType} · {new Date(e.createdAt).toLocaleString('en-GB')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm border-b border-border/40 pb-2">
      <span className="w-32 flex-shrink-0 text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-0.5">
        {label}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  )
}
