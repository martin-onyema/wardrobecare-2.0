'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, X, Check } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminAddPSItem, adminRemovePSItem, adminSendShortlist,
  adminRecordItemDecision, adminApproveChoices,
} from '@/actions/personal-shopping-workflow'
import { psStatusPill, fmtNGN } from '../_shared'

type Item = {
  id: string; name: string; category: string; size: string;
  price: number; source: string; stylistNote: string | null;
  decision: string; decisionNote: string | null;
}

type Request = {
  id: string; ref: string; customerName: string; tier: string; reviewMethod: string;
  area: string | null; brief: string; categories: string; colours: string; budget: string;
  brandMentioned: string | null; status: string; items: Item[];
}

const DECISIONS = [
  { value: 'PENDING', label: 'Waiting' },
  { value: 'KEEP', label: 'Keep' },
  { value: 'SKIP', label: 'Skip' },
  { value: 'WANTS_DIFFERENT', label: 'Wants different' },
]

export function ShortlistClient({ canManage, requests, initialSelectedId }: {
  canManage: boolean; requests: Request[]; initialSelectedId: string | null;
}) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && requests.some((r) => r.id === initialSelectedId) ? initialSelectedId : requests[0]?.id ?? null,
  )

  if (requests.length === 0) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No requests need a shortlist right now. Accepted requests appear here.</p>
      </div>
    )
  }

  const selected = requests.find((r) => r.id === selectedId) ?? requests[0]
  const kept = selected.items.filter((i) => i.decision === 'KEEP')
  const subtotal = kept.reduce((s, i) => s + i.price, 0)

  return (
    <div className="space-y-4">
      {/* Picker */}
      <div className="flex flex-wrap gap-2">
        {requests.map((r) => (
          <button key={r.id} type="button" onClick={() => setSelectedId(r.id)}
            className={`px-3 py-2 text-xs border ${r.id === selectedId ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
            {r.customerName} · {r.tier === 'DELIVERED' ? 'Delivered' : 'In-Person'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-4">
        {/* Left: item table */}
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-display text-sm">Shortlist for {selected.customerName} ({selected.ref})</h3>
            {psStatusPill(selected.status, selected.tier)}
          </div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground mb-3">
              Brief: {selected.categories} · {selected.colours} · budget {selected.budget}
            </p>
            {selected.brandMentioned && (
              <div className="bg-amber-50 border border-camel px-4 py-3 text-sm mb-3 leading-relaxed">
                <strong className="text-rust">Brand mentioned: {selected.brandMentioned}.</strong> Source by style, colour and fit. In each stylist note say how the piece matches the look.
              </div>
            )}

            {/* Items table */}
            <table className="w-full text-sm border border-border">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Item</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Size</th>
                  <th className="text-right text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Price</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Source</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Customer</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {selected.items.length === 0 ? (
                  <tr><td colSpan={6} className="px-3 py-4 text-center text-muted-foreground">No items yet. Add pieces below.</td></tr>
                ) : selected.items.map((item) => (
                  <ItemRow key={item.id} item={item} requestId={selected.id} canManage={canManage}
                    status={selected.status} reviewMethod={selected.reviewMethod}
                    onMutated={() => router.refresh()} />
                ))}
              </tbody>
            </table>

            {/* Add item form */}
            {selected.status === 'SOURCING' && canManage && (
              <AddItemForm requestId={selected.id} onAdded={() => router.refresh()} />
            )}
          </div>
        </div>

        {/* Right: review + totals */}
        <div className="space-y-4">
          <ReviewPanel request={selected} canManage={canManage} onMutated={() => router.refresh()} />
          <div className="border border-border bg-card">
            <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">Totals</h3></div>
            <div className="p-5 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items kept</span><span>{kept.length} · {fmtNGN(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{selected.tier === 'IN_PERSON_FITTING' ? 'None (brought to fitting)' : selected.area ?? 'To be quoted'}</span></div>
              <div className="flex justify-between font-bold pt-2 border-t border-border"><span>Items total</span><span>{fmtNGN(subtotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ItemRow({ item, requestId, canManage, status, reviewMethod, onMutated }: {
  item: Item; requestId: string; canManage: boolean; status: string; reviewMethod: string; onMutated: () => void;
}) {
  const [removing, startRemove] = useTransition()

  function onRemove() {
    startRemove(async () => {
      const r = await adminRemovePSItem(item.id)
      if (!r.ok) toast.error(r.error)
      onMutated()
    })
  }

  function onDecision(decision: string) {
    adminRecordItemDecision(item.id, decision as any, decision === 'WANTS_DIFFERENT' ? 'asked for something different' : undefined)
      .then((r) => { if (!r.ok) toast.error(r.error); onMutated() })
  }

  const dec = DECISIONS.find((d) => d.value === item.decision) ?? DECISIONS[0]

  return (
    <tr className="border-t border-border/60">
      <td className="px-3 py-2">
        <strong>{item.name}</strong>
        {item.stylistNote && <p className="text-xs text-muted-foreground mt-0.5">{item.stylistNote}</p>}
      </td>
      <td className="px-3 py-2">{item.size}</td>
      <td className="px-3 py-2 text-right font-mono">{fmtNGN(item.price)}</td>
      <td className="px-3 py-2 text-xs">{item.source}</td>
      <td className="px-3 py-2">
        {status === 'SOURCING' ? (
          <span className="text-muted-foreground">Not sent</span>
        ) : (reviewMethod === 'WHATSAPP' || reviewMethod === 'ONLINE') && canManage && status === 'SENT' ? (
          <select value={item.decision} onChange={(e) => onDecision(e.target.value)}
            className="h-8 px-2 text-xs border border-border">
            {DECISIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        ) : (
          <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
            item.decision === 'KEEP' ? 'bg-green-100 text-green-800' :
            item.decision === 'SKIP' ? 'bg-stone-200 text-stone-700' :
            item.decision === 'WANTS_DIFFERENT' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
          }`}>{dec.label}</span>
        )}
      </td>
      <td className="px-3 py-2 text-right">
        {status === 'SOURCING' && canManage && (
          <button type="button" onClick={onRemove} disabled={removing}
            className="text-muted-foreground hover:text-rust disabled:opacity-50">
            {removing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
          </button>
        )}
      </td>
    </tr>
  )
}

function AddItemForm({ requestId, onAdded }: { requestId: string; onAdded: () => void }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('SHIRTS')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [source, setSource] = useState('In stock')
  const [note, setNote] = useState('')
  const [adding, startAdd] = useTransition()

  function onAdd() {
    if (!name.trim() || !size.trim() || !(parseInt(price) > 0)) {
      toast.error('Item name, size and a price above ₦0 are required.')
      return
    }
    startAdd(async () => {
      const r = await adminAddPSItem(requestId, {
        name: name.trim(), category: category as any,
        size: size.trim(), price: parseInt(price),
        source, stylistNote: note.trim() || undefined,
      })
      if (!r.ok) { toast.error(r.error, { duration: 8000 }); return }
      setName(''); setSize(''); setPrice(''); setNote('')
      onAdded()
    })
  }

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex flex-wrap gap-2">
        <input type="text" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)}
          className="flex-1 min-w-[140px] h-9 px-3 text-sm border border-border" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 text-sm border border-border">
          <option value="SHIRTS">Shirts</option><option value="TROUSERS">Trousers</option>
          <option value="SUITING">Suiting</option><option value="FOOTWEAR">Footwear</option>
          <option value="ACCESSORIES">Accessories</option><option value="FRAGRANCE">Fragrance</option>
          <option value="TRADITIONAL">Traditional</option>
        </select>
        <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)}
          className="w-20 h-9 px-3 text-sm border border-border" />
        <input type="number" placeholder="Price ₦" value={price} onChange={(e) => setPrice(e.target.value)}
          className="w-28 h-9 px-3 text-sm border border-border" />
        <select value={source} onChange={(e) => setSource(e.target.value)} className="h-9 px-2 text-sm border border-border">
          <option>In stock</option><option>Sourced from supplier</option>
        </select>
      </div>
      <div className="flex gap-2 mt-2">
        <input type="text" placeholder="Stylist note: how it matches the brief" value={note} onChange={(e) => setNote(e.target.value)}
          className="flex-1 h-9 px-3 text-sm border border-border" />
        <button type="button" onClick={onAdd} disabled={adding}
          className="inline-flex items-center gap-1 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60">
          {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
          Add item
        </button>
      </div>
    </div>
  )
}

function ReviewPanel({ request, canManage, onMutated }: { request: Request; canManage: boolean; onMutated: () => void }) {
  const [sending, startSend] = useTransition()
  const [approving, startApprove] = useTransition()

  const ok = request.items.length >= 2 && request.items.every((i) => i.price > 0)
  const hasDecisions = request.items.some((i) => i.decision !== 'PENDING')

  function onSend() {
    startSend(async () => {
      const r = await adminSendShortlist(request.id)
      if (!r.ok) { toast.error(r.error, { duration: 8000 }); return }
      toast.success(request.reviewMethod === 'ONLINE' ? 'Link sent.' : request.reviewMethod === 'WHATSAPP' ? 'Sent on WhatsApp.' : 'Marked prepared.')
      onMutated()
    })
  }

  function onApprove() {
    startApprove(async () => {
      const r = await adminApproveChoices(request.id)
      if (!r.ok) { toast.error(r.error, { duration: 8000 }); return }
      toast.success('Approved. Continue in Fulfilment.')
      onMutated()
    })
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="font-display text-sm">
          Review: {request.reviewMethod === 'ONLINE' ? 'Online shortlist' : request.reviewMethod === 'WHATSAPP' ? 'WhatsApp' : 'On-site at the fitting'}
        </h3>
      </div>
      <div className="p-5 space-y-3 text-sm">
        {request.status === 'SOURCING' && (
          <>
            {request.reviewMethod === 'ONLINE' && (
              <p className="text-muted-foreground leading-relaxed">
                Customer gets a link to a page with photos, prices and your notes. They tap Keep, Skip or Show me something different on each item.
              </p>
            )}
            {request.reviewMethod === 'WHATSAPP' && (
              <div className="bg-olive/5 border border-olive/30 px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed">
                Hello {request.customerName.split(' ')[0]}, here is your Personal Shopping shortlist:{'\n'}
                {request.items.map((i, k) => `${k + 1}. ${i.name}, size ${i.size}, ${fmtNGN(i.price)}`).join('\n')}
                {'\n'}Reply with the numbers you want to keep. Items are held for you for 48 hours.
              </div>
            )}
            {request.reviewMethod === 'ONSITE' && (
              <p className="text-muted-foreground leading-relaxed">
                Items are prepared for the fitting. The customer chooses on site, and you record what they keep in Fulfilment.
              </p>
            )}
            <button type="button" onClick={onSend} disabled={sending || !ok || !canManage}
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
              {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              {request.reviewMethod === 'ONLINE' ? 'Send shortlist link' : request.reviewMethod === 'WHATSAPP' ? 'Send on WhatsApp' : 'Mark items prepared'}
            </button>
            {!ok && <p className="text-xs text-muted-foreground">Needs at least 2 items, each with a price.</p>}
          </>
        )}
        {request.status === 'SENT' && (
          <>
            <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
              {request.reviewMethod === 'ONLINE' ? 'Link sent. Waiting for the customer.' :
               request.reviewMethod === 'WHATSAPP' ? 'Sent on WhatsApp. Record their reply in the table.' :
               `Items prepared for the fitting.`}
            </div>
            <button type="button" onClick={onApprove} disabled={approving || !hasDecisions || !canManage}
              className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 disabled:opacity-60">
              {approving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              {request.reviewMethod === 'ONSITE' ? 'Go to fitting' : 'Save choices and approve'}
            </button>
          </>
        )}
        {request.status === 'APPROVED' && (
          <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
            Choices recorded. {request.items.filter((i) => i.decision === 'KEEP').length} kept. Continue in Fulfilment.
          </div>
        )}
      </div>
    </div>
  )
}
