'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminSavePSFees, adminSaveDeliveryZones,
  adminCreatePSPromoCode, adminTogglePSPromoCode,
} from '@/actions/personal-shopping-workflow'
import { fmtNGN } from '../_shared'

type Zone = { id: string; zone: string; fee: number }
type Code = {
  id: string; code: string; type: string; value: number;
  service: string; expiresAt: string; timesUsed: number; active: boolean;
}

export function PSFeesClient({ settings, zones, codes }: {
  settings: { deliveredFee: number; inPersonFittingFee: number; includedMinutes: number; extraBlockMinutes: number; extraBlockFee: number }
  zones: Zone[]
  codes: Code[]
}) {
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="space-y-6">
        <FeesCard initial={settings} />
        <ZonesCard initial={zones} />
        <PromoCodesCard codes={codes} settings={settings} />
      </div>
      <div className="space-y-6">
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">How it differs from Consultation</h3></div>
          <div className="p-5 text-sm leading-relaxed space-y-3">
            <p>Promo codes and staff discounts work the same way, but they only reduce the <strong>sourcing fee</strong>. Items are paid at their own price.</p>
            <p>The referral reward (free consultation at 3 referrals) is <strong>not</strong> valid here.</p>
          </div>
        </div>
        <div className="bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm">
          <strong className="text-rust">Needed by the website:</strong> fees and delivery fees come from settings, never hard-coded. Each request stores a price snapshot for the fee, and each item order stores its own prices.
        </div>
      </div>
    </div>
  )
}

function FeesCard({ initial }: { initial: { deliveredFee: number; inPersonFittingFee: number; includedMinutes: number; extraBlockMinutes: number; extraBlockFee: number } }) {
  const router = useRouter()
  const [d, setD] = useState(initial.deliveredFee)
  const [i, setI] = useState(initial.inPersonFittingFee)
  const [m, setM] = useState(initial.includedMinutes)
  const [b, setB] = useState(initial.extraBlockMinutes)
  const [x, setX] = useState(initial.extraBlockFee)
  const [saving, startSave] = useTransition()

  const rows: Array<[string, number]> = [
    ['Delivered', d],
    [`In-Person Fitting, up to ${m} minutes`, i],
    [`In-Person Fitting, ${m + b} minutes`, i + x],
    [`In-Person Fitting, ${m + 2 * b} minutes`, i + 2 * x],
  ]

  function onSave() {
    startSave(async () => {
      const r = await adminSavePSFees({ deliveredFee: d, inPersonFittingFee: i, includedMinutes: m, extraBlockMinutes: b, extraBlockFee: x })
      if (!r.ok) { toast.error(r.error); return }
      toast.success('Fees saved for new requests.')
      router.refresh()
    })
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">1 · Sourcing fees</h3></div>
      <div className="p-5 space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          {[['Delivered (₦)', d, setD], ['In-Person Fitting (₦)', i, setI], ['Minutes included', m, setM]].map(([label, val, set]) => (
            <div key={label as string}>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">{label as string}</label>
              <input type="number" min={1} value={val as number} onChange={(e) => (set as any)(parseInt(e.target.value) || 0)}
                className="w-full h-10 px-3 text-sm border border-border" />
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[['Extra time block (minutes)', b, setB], ['Fee per extra block (₦)', x, setX]].map(([label, val, set]) => (
            <div key={label as string}>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">{label as string}</label>
              <input type="number" min={1} value={val as number} onChange={(e) => (set as any)(parseInt(e.target.value) || 0)}
                className="w-full h-10 px-3 text-sm border border-border" />
            </div>
          ))}
        </div>
        <table className="w-full text-sm border border-border">
          <thead className="bg-secondary/40"><tr><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Customer pays for sourcing</th><th className="text-right text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Amount</th></tr></thead>
          <tbody>
            {rows.map(([label, amt]) => <tr key={label} className="border-t border-border/60"><td className="px-3 py-2">{label}</td><td className="px-3 py-2 text-right font-mono">{fmtNGN(amt)}</td></tr>)}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button type="button" onClick={onSave} disabled={saving}
            className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 disabled:opacity-60">
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save fees
          </button>
        </div>
        <p className="text-xs text-muted-foreground">New fees apply to new requests only. A request keeps the fee it paid. Items are priced from the catalogue or by the stylist, not here.</p>
      </div>
    </div>
  )
}

function ZonesCard({ initial }: { initial: Zone[] }) {
  const router = useRouter()
  const [zones, setZones] = useState(initial)
  const [saving, startSave] = useTransition()

  function onSave() {
    startSave(async () => {
      const r = await adminSaveDeliveryZones(zones.map((z) => ({ zone: z.zone, fee: z.fee })))
      if (!r.ok) { toast.error(r.error); return }
      toast.success('Delivery fees saved. They apply to new approvals.')
      router.refresh()
    })
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm">2 · Delivery fees by area</h3>
        <span className="text-xs text-muted-foreground">added when the customer approves items</span>
      </div>
      <div className="p-5">
        <table className="w-full text-sm border border-border">
          <thead className="bg-secondary/40"><tr><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Area</th><th className="text-right text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Fee (₦)</th></tr></thead>
          <tbody>
            {zones.map((z, i) => (
              <tr key={z.id} className="border-t border-border/60">
                <td className="px-3 py-2">{z.zone}</td>
                <td className="px-3 py-2 text-right">
                  <input type="number" value={z.fee} onChange={(e) => setZones((prev) => prev.map((p, j) => j === i ? { ...p, fee: parseInt(e.target.value) || 0 } : p))}
                    className="w-24 h-8 px-2 text-sm text-right border border-border" />
                </td>
              </tr>
            ))}
            <tr className="border-t border-border/60"><td className="px-3 py-2 text-muted-foreground">Outside Lagos</td><td className="px-3 py-2 text-right text-muted-foreground">Quoted per order</td></tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-3">
          <button type="button" onClick={onSave} disabled={saving}
            className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 disabled:opacity-60">
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save delivery fees
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Same table as the Delivery Charges page. In-Person Fitting has no delivery fee: travel is part of the fitting fee.</p>
      </div>
    </div>
  )
}

function PromoCodesCard({ codes, settings }: { codes: Code[]; settings: any }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [type, setType] = useState<'PERCENT' | 'FIXED' | 'FREE'>('PERCENT')
  const [val, setVal] = useState('')
  const [service, setService] = useState<'Personal Shopping' | 'Both'>('Both')
  const [expires, setExpires] = useState('')
  const [creating, startCreate] = useTransition()
  const [togglingId, startToggle] = useState<string | null>(null)

  function onCreate() {
    startCreate(async () => {
      const r = await adminCreatePSPromoCode({
        code: code.toUpperCase(), type,
        value: parseInt(val) || (type === 'FREE' ? 100 : 0),
        service, expiresAt: expires || undefined,
      })
      if (!r.ok) { toast.error(r.error, { duration: 8000 }); return }
      toast.success(`Code ${r.code} created.`)
      setCode(''); setVal(''); setExpires('')
      router.refresh()
    })
  }

  async function onToggle(id: string) {
    startToggle(id)
    const r = await adminTogglePSPromoCode(id)
    if (!r.ok) toast.error(r.error)
    router.refresh()
    startToggle(null)
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm">3 · Promo codes</h3>
        <span className="text-xs text-muted-foreground">discount the sourcing fee, never the items</span>
      </div>
      <div className="p-5 space-y-4">
        {codes.length > 0 && (
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary/40"><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Code</th><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Discount</th><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Service</th><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Expires</th><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Used</th><th className="px-3 py-2">On?</th></tr></thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="px-3 py-2 font-mono text-xs font-bold">{c.code}</td>
                  <td className="px-3 py-2 text-xs">{c.type === 'PERCENT' ? `${c.value}% off` : c.type === 'FIXED' ? fmtNGN(c.value) + ' off' : 'Free fee'}</td>
                  <td className="px-3 py-2 text-xs">{c.service}</td>
                  <td className="px-3 py-2 text-xs">{c.expiresAt || 'None'}</td>
                  <td className="px-3 py-2 text-xs">{c.timesUsed}</td>
                  <td className="px-3 py-2">
                    <button type="button" onClick={() => onToggle(c.id)} disabled={togglingId === c.id}
                      className={`relative h-5 w-9 rounded-full transition-colors disabled:opacity-50 ${c.active ? 'bg-olive' : 'bg-muted'}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${c.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <input type="text" placeholder="CODE" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={16} className="w-28 h-9 px-3 text-sm border border-border uppercase" />
            <select value={type} onChange={(e) => { setType(e.target.value as 'PERCENT' | 'FIXED' | 'FREE'); setVal('') }} className="h-9 px-2 text-sm border border-border">
              <option value="PERCENT">% off</option><option value="FIXED">₦ off</option><option value="FREE">Free fee</option>
            </select>
            <input type="number" placeholder="Value" value={val} disabled={type === 'FREE'} onChange={(e) => setVal(e.target.value)} className="w-24 h-9 px-3 text-sm border border-border disabled:opacity-50" />
            <select value={service} onChange={(e) => setService(e.target.value as 'Personal Shopping' | 'Both')} className="h-9 px-2 text-sm border border-border">
              <option>Personal Shopping</option><option>Both</option>
            </select>
            <input type="date" value={expires} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setExpires(e.target.value)} className="h-9 px-2 text-sm border border-border" />
            <button type="button" onClick={onCreate} disabled={creating || code.length < 4}
              className="inline-flex items-center gap-1 bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60">
              {creating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />} Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
