'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminQuoteDeliveryFee, adminSendPaymentLink, adminApprovePayOnDelivery,
  adminMarkPSPaid, adminDispatch, adminMarkDelivered,
  adminStartFitting, adminAddFittingTime, adminSendFittingPaymentLink,
  adminCompleteFitting,
} from '@/actions/personal-shopping-workflow'
import { psStatusPill, fmtNGN } from '../_shared'

type Item = { id: string; name: string; size: string; price: number; decision: string }
type Request = {
  id: string; ref: string; customerName: string; tier: string;
  area: string | null; isLagos: boolean; status: string;
  fittingDate: string | null; fittingTime: string | null; fittingArea: string | null;
  fittingElapsedMinutes: number; deliveryFeeQuoted: number | null;
  riderName: string | null; paymentMethod: string | null;
  items: Item[];
  events: Array<{ note: string | null; actorType: string; createdAt: string }>;
}
type Settings = { deliveredFee: number; inPersonFittingFee: number; includedMinutes: number; extraBlockMinutes: number; extraBlockFee: number }

export function FulfilmentClient({ canManage, requests, settings, initialSelectedId }: {
  canManage: boolean; requests: Request[]; settings: Settings; initialSelectedId: string | null;
}) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId && requests.some((r) => r.id === initialSelectedId) ? initialSelectedId : requests[0]?.id ?? null,
  )

  if (requests.length === 0) {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Nothing to fulfil yet. Approved requests appear here.</p>
      </div>
    )
  }

  const selected = requests.find((r) => r.id === selectedId) ?? requests[0]
  const kept = selected.items.filter((i) => i.decision === 'KEEP')
  const subtotal = kept.reduce((s, i) => s + i.price, 0)

  function extraBlocks(r: Request): number {
    return Math.max(0, Math.ceil((r.fittingElapsedMinutes - settings.includedMinutes) / settings.extraBlockMinutes))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {requests.map((r) => (
          <button key={r.id} type="button" onClick={() => setSelectedId(r.id)}
            className={`px-3 py-2 text-xs border ${r.id === selectedId ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
            {r.customerName} · {r.tier === 'DELIVERED' ? 'Delivered' : 'In-Person'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left: items + payment */}
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-display text-sm">Items and payment: {selected.ref}</h3>
            {psStatusPill(selected.status, selected.tier)}
          </div>
          <div className="p-5 space-y-3">
            <table className="w-full text-sm border border-border">
              <tbody>
                {selected.items.map((i) => (
                  <tr key={i.id} className="border-b border-border/60">
                    <td className="px-3 py-2">{i.name} <span className="text-xs text-muted-foreground">({i.size})</span></td>
                    <td className="px-3 py-2 text-right font-mono">{fmtNGN(i.price)}</td>
                    <td className="px-3 py-2 text-right">
                      {i.decision === 'KEEP' ? <span className="text-[10px] uppercase tracking-[0.15em] bg-green-100 text-green-800 px-2 py-0.5">Keep</span>
                       : i.decision === 'SKIP' ? <span className="text-[10px] uppercase tracking-[0.15em] bg-stone-200 text-stone-700 px-2 py-0.5">Skip</span>
                       : <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Items kept</span><span className="font-mono">{fmtNGN(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span>{selected.tier === 'IN_PERSON_FITTING' ? 'None (brought to fitting)' :
                selected.deliveryFeeQuoted != null ? fmtNGN(selected.deliveryFeeQuoted) : 'To be quoted'}</span>
            </div>
            {selected.tier === 'IN_PERSON_FITTING' && extraBlocks(selected) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extra fitting time</span>
                <span>{extraBlocks(selected)} × {fmtNGN(settings.extraBlockFee)} = {fmtNGN(extraBlocks(selected) * settings.extraBlockFee)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span>To collect</span>
              <span className="font-mono">{fmtNGN(subtotal + (selected.tier === 'IN_PERSON_FITTING' ? extraBlocks(selected) * settings.extraBlockFee : 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <span>{selected.paymentMethod === 'link' ? 'Payment link sent' :
                     selected.paymentMethod === 'cod' ? 'Pay on delivery' :
                     selected.paymentMethod === 'paid' ? 'Paid' : 'Not requested'}</span>
            </div>
          </div>
        </div>

        {/* Right: fulfilment steps */}
        <FulfilmentSteps
          req={selected} canManage={canManage} settings={settings}
          subtotal={subtotal} extraBlocks={extraBlocks(selected)}
          onMutated={() => router.refresh()}
        />
      </div>
    </div>
  )
}

function FulfilmentSteps({ req, canManage, settings, subtotal, extraBlocks, onMutated }: {
  req: Request; canManage: boolean; settings: Settings; subtotal: number; extraBlocks: number; onMutated: () => void;
}) {
  const [busy, startAction] = useTransition()
  const [quote, setQuote] = useState('')
  const [rider, setRider] = useState('')

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, msg: string) {
    if (!canManage) return
    startAction(async () => {
      const r = await fn()
      if (!r.ok) { toast.error(r.error ?? 'Action failed', { duration: 8000 }); return }
      toast.success(msg)
      onMutated()
    })
  }

  if (req.tier === 'DELIVERED') {
    return (
      <div className="space-y-4">
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">Delivery steps</h3></div>
          <div className="p-5 space-y-3">
            <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
              {req.isLagos ? 'Lagos: delivery within 1 to 24 hours of payment.' : 'Outside Lagos: 3 to 7 working days.'}
            </div>

            {req.status === 'APPROVED' && (
              <>
                {req.deliveryFeeQuoted == null && !req.isLagos && (
                  <div className="flex gap-2">
                    <input type="number" placeholder="Quote ₦" value={quote}
                      onChange={(e) => setQuote(e.target.value)} className="h-9 w-28 px-3 text-sm border border-border" />
                    <button type="button" disabled={busy || !canManage}
                      onClick={() => run(() => adminQuoteDeliveryFee(req.id, parseInt(quote) || 0), 'Delivery quote saved.')}
                      className="border border-foreground px-3 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground hover:text-background disabled:opacity-60">
                      Save quote
                    </button>
                  </div>
                )}
                <button type="button" disabled={busy || (req.deliveryFeeQuoted == null && !req.isLagos) || subtotal === 0 || !canManage}
                  onClick={() => run(() => adminSendPaymentLink(req.id), 'Payment link sent.')}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
                  {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {req.paymentMethod === 'link' ? 'Payment link sent' : `Send payment link for ${fmtNGN(subtotal)}`}
                </button>
                {req.isLagos && (
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-sm font-medium">Pay on delivery</p>
                      <p className="text-xs text-muted-foreground">Lagos only. After speaking to the customer.</p>
                    </div>
                    <button type="button" disabled={busy || !canManage}
                      onClick={() => run(() => adminApprovePayOnDelivery(req.id), 'Pay on delivery approved.')}
                      className={`relative h-5 w-9 rounded-full transition-colors ${req.paymentMethod === 'cod' ? 'bg-olive' : 'bg-muted'}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${req.paymentMethod === 'cod' ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                )}
              </>
            )}

            {req.status === 'PAID' && (
              <>
                <div className="flex gap-2">
                  <input type="text" placeholder="Rider or courier" value={rider}
                    onChange={(e) => setRider(e.target.value)} className="flex-1 h-9 px-3 text-sm border border-border" />
                  <button type="button" disabled={busy || !rider.trim() || !canManage}
                    onClick={() => run(() => adminDispatch(req.id, rider.trim()), 'Dispatched. Customer notified.')}
                    className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
                    Dispatch
                  </button>
                </div>
              </>
            )}

            {req.status === 'FULFILLING' && (
              <button type="button" disabled={busy || !canManage}
                onClick={() => run(() => adminMarkDelivered(req.id), 'Delivered.')}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
                <Check className="h-3.5 w-3.5" /> Mark delivered
              </button>
            )}

            {req.status === 'DONE' && (
              <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
                Delivered. Exchange window: 48 hours for wrong size, wrong item or defect; 24 hours for change of mind. Exchanges only.
              </div>
            )}
          </div>
        </div>
        <HistoryPanel events={req.events} />
      </div>
    )
  }

  // IN_PERSON_FITTING
  const extraFee = extraBlocks * settings.extraBlockFee
  const total = subtotal + extraFee
  return (
    <div className="space-y-4">
      <div className="border border-border bg-card">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-display text-sm">
            Fitting: {req.fittingDate && `${req.fittingDate}, ${req.fittingTime}`}
            {req.fittingArea && ` · ${req.fittingArea}`}
          </h3>
        </div>
        <div className="p-5 space-y-3">
          {(req.status === 'APPROVED' || req.status === 'SENT') && (
            <button type="button" disabled={busy || !canManage}
              onClick={() => run(() => adminStartFitting(req.id), 'Fitting started.')}
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
              Start fitting
            </button>
          )}
          {req.status === 'FULFILLING' && (
            <>
              <p className="font-mono text-sm">{Math.floor(req.fittingElapsedMinutes / 60)}h {('0' + req.fittingElapsedMinutes % 60).slice(-2)}m</p>
              <div className="flex gap-2">
                <button type="button" disabled={busy} onClick={() => run(() => adminAddFittingTime(req.id, 30), '+30 min added.')}
                  className="border border-border px-3 py-1.5 text-xs uppercase hover:bg-secondary disabled:opacity-60">+30 min</button>
                <button type="button" disabled={busy} onClick={() => run(() => adminAddFittingTime(req.id, 60), '+1 hour added.')}
                  className="border border-border px-3 py-1.5 text-xs uppercase hover:bg-secondary disabled:opacity-60">+1 hour</button>
              </div>
              {extraBlocks > 0 ? (
                <div className="bg-rust/10 border-l-4 border-rust px-4 py-3 text-sm">
                  Over the {settings.includedMinutes} included minutes. {extraBlocks} extra block(s) of {settings.extraBlockMinutes} minutes = {fmtNGN(extraFee)}.
                </div>
              ) : (
                <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
                  Within the {settings.includedMinutes} minutes covered by the fee.
                </div>
              )}
              <button type="button" disabled={busy || total === 0 || req.paymentMethod === 'paid' || !canManage}
                onClick={() => run(() => adminSendFittingPaymentLink(req.id), 'Payment link sent.')}
                className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 disabled:opacity-60">
                Send payment link for {fmtNGN(total)}
              </button>
              <button type="button" disabled={busy || (total > 0 && req.paymentMethod !== 'paid') || !canManage}
                onClick={() => run(() => adminCompleteFitting(req.id), 'Fitting complete.')}
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 disabled:opacity-60">
                <Check className="h-3.5 w-3.5" /> Complete fitting
              </button>
              {total > 0 && req.paymentMethod !== 'paid' && (
                <p className="text-xs text-muted-foreground">Complete unlocks once what the customer keeps has been paid.</p>
              )}
            </>
          )}
          {req.status === 'DONE' && (
            <div className="bg-olive/10 border-l-4 border-olive px-4 py-3 text-sm">
              Fitting complete. Exchange window: 48 hours for wrong size, wrong item or defect; 24 hours for change of mind.
            </div>
          )}
        </div>
      </div>
      <HistoryPanel events={req.events} />
    </div>
  )
}

function HistoryPanel({ events }: { events: Array<{ note: string | null; actorType: string; createdAt: string }> }) {
  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">History</h3></div>
      <div className="p-5">
        <ul className="space-y-2 text-sm">
          {events.map((e, i) => (
            <li key={i} className="border-l-2 border-border pl-3">
              <p>{e.note}</p>
              <p className="text-xs text-muted-foreground">{e.actorType} · {new Date(e.createdAt).toLocaleString('en-GB')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
