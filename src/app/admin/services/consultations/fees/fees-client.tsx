'use client'

/**
 * Fees & discounts client.
 *
 * Layout (matches mockup 51):
 *   Left:  - Fees form (base, extra hour, return visit %, rounding)
 *          - Promo codes table + create form
 *   Right: - Automatic offers list + add form
 *          - "How discounts combine" hint
 */

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  adminSaveFees,
  adminCreatePromoCode,
  adminTogglePromoCode,
  adminDeletePromoCode,
  adminCreateDiscountRule,
  adminToggleDiscountRule,
} from '@/actions/consultations-workflow'
import { fmtNGN } from '../_shared'

type Fees = {
  baseFee: number
  extraHourFee: number
  returnVisitDropoffPct: number
  extraTimeRounding: 'started' | 'full'
}

type Code = {
  id: string
  code: string
  type: 'pct' | 'fix' | 'free'
  value: number
  appliesToAll: boolean
  expiresAt: string
  usageLimit: number | null
  timesUsed: number
  active: boolean
}

type Rule = {
  id: string
  name: string
  condition: string
  reward: string
  active: boolean
}

type Props = {
  fees: Fees
  codes: Code[]
  rules: Rule[]
}

export function FeesClient({ fees, codes, rules }: Props) {
  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
      <div className="space-y-6">
        <FeesCard initialFees={fees} />
        <PromoCodesCard codes={codes} />
      </div>
      <div className="space-y-6">
        <RulesCard rules={rules} />
        <CombineCard />
      </div>
    </div>
  )
}

// ─── Fees card ────────────────────────────────────────────────────────────

function FeesCard({ initialFees }: { initialFees: Fees }) {
  const router = useRouter()
  const [baseFee, setBaseFee] = useState(initialFees.baseFee)
  const [extraHourFee, setExtraHourFee] = useState(initialFees.extraHourFee)
  const [dropPct, setDropPct] = useState(initialFees.returnVisitDropoffPct)
  const [rounding, setRounding] = useState<'started' | 'full'>(initialFees.extraTimeRounding)
  const [saving, startSave] = useTransition()

  // Live preview table
  const previewRows: Array<[string, number]> = [
    ['2-hour session', baseFee],
    ['2 hours 40 min', baseFee + (rounding === 'started' ? 1 : 0) * extraHourFee],
    ['3 hours', baseFee + extraHourFee],
    ['Return visit, drop-off only', Math.round((baseFee * dropPct) / 100)],
    ['Return visit with fitting', baseFee],
  ]

  // Validation
  const warnings: string[] = []
  if (baseFee <= 0) warnings.push('The session fee must be more than ₦0.')
  if (extraHourFee < 0) warnings.push('Extra hour fee cannot be negative.')
  if (dropPct < 0 || dropPct > 100) warnings.push('Return-visit percentage must be between 0 and 100.')

  function onSave() {
    startSave(async () => {
      const r = await adminSaveFees({
        baseFee,
        extraHourFee,
        returnVisitDropoffPct: dropPct,
        extraTimeRounding: rounding,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Fees saved. New bookings use these amounts. Existing bookings keep what they paid.', { duration: 6000 })
      router.refresh()
    })
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="font-display text-sm">1 · Fees</h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="First two hours (₦)">
            <input
              type="number"
              min={0}
              value={baseFee}
              onChange={(e) => setBaseFee(parseInt(e.target.value, 10) || 0)}
              className="w-full h-10 px-3 text-sm bg-white border border-border"
            />
          </Field>
          <Field label="Each extra hour (₦)">
            <input
              type="number"
              min={0}
              value={extraHourFee}
              onChange={(e) => setExtraHourFee(parseInt(e.target.value, 10) || 0)}
              className="w-full h-10 px-3 text-sm bg-white border border-border"
            />
          </Field>
          <Field label="Return visit, drop-off only (% of base)">
            <input
              type="number"
              min={0}
              max={100}
              value={dropPct}
              onChange={(e) => setDropPct(parseInt(e.target.value, 10) || 0)}
              className="w-full h-10 px-3 text-sm bg-white border border-border"
            />
          </Field>
        </div>
        <Field label="Extra time is counted per">
          <select
            value={rounding}
            onChange={(e) => setRounding(e.target.value as 'started' | 'full')}
            className="w-full sm:max-w-xs h-10 px-3 text-sm bg-white border border-border"
          >
            <option value="started">Each started hour</option>
            <option value="full">Full hours only</option>
          </select>
        </Field>

        {/* Preview table */}
        <table className="w-full text-sm border border-border">
          <thead className="bg-secondary/40">
            <tr>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Customer is charged</th>
              <th className="text-right text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {previewRows.map(([label, amt]) => (
              <tr key={label} className="border-t border-border/60">
                <td className="px-3 py-2">{label}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{fmtNGN(amt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {warnings.length > 0 && (
          <div className="bg-rust/10 border-l-4 border-rust px-4 py-3 text-sm">
            {warnings.join(' ')}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSave}
            disabled={saving || warnings.length > 0}
            className="inline-flex items-center gap-2 bg-camel text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-camel/90 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            Save fees
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          New fees apply to new bookings only. A booking keeps the price it was paid at.
        </p>
      </div>
    </div>
  )
}

// ─── Promo codes card ─────────────────────────────────────────────────────

function PromoCodesCard({ codes }: { codes: Code[] }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [type, setType] = useState<'pct' | 'fix' | 'free'>('pct')
  const [value, setValue] = useState('')
  const [appliesToAll, setAppliesToAll] = useState(false)
  const [expiresAt, setExpiresAt] = useState('')
  const [usageLimit, setUsageLimit] = useState('')
  const [creating, startCreate] = useTransition()
  const [togglingId, startToggle] = useState<string | null>(null)
  const [deletingId, startDelete] = useState<string | null>(null)

  function onCreate() {
    startCreate(async () => {
      const r = await adminCreatePromoCode({
        code,
        type,
        value: parseInt(value, 10) || (type === 'free' ? 100 : 0),
        appliesToAll,
        expiresAt: expiresAt || undefined,
        usageLimit: usageLimit ? parseInt(usageLimit, 10) : undefined,
      })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success(`Code ${r.code} created. Customers can use it now.`, { duration: 5000 })
      setCode('')
      setValue('')
      setExpiresAt('')
      setUsageLimit('')
      setAppliesToAll(false)
      router.refresh()
    })
  }

  async function onToggle(id: string) {
    startToggle(id)
    const r = await adminTogglePromoCode(id)
    if (!r.ok) toast.error(r.error, { duration: 8000 })
    router.refresh()
    startToggle(null)
  }

  async function onDelete(id: string) {
    startDelete(id)
    const r = await adminDeletePromoCode(id)
    if (!r.ok) toast.error(r.error, { duration: 8000 })
    else toast.success('Code deleted. Past bookings that used it are unchanged.', { duration: 5000 })
    router.refresh()
    startDelete(null)
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm">2 · Promo codes</h3>
        <span className="text-xs text-muted-foreground">customers enter these at checkout</span>
      </div>
      <div className="p-5 space-y-4">
        {codes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No codes yet. Create one below.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Code</th>
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Discount</th>
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Applies to</th>
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Expires</th>
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Used</th>
                <th className="px-3 py-2">On?</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => {
                const expired = c.expiresAt && c.expiresAt < new Date().toISOString().slice(0, 10)
                return (
                  <tr key={c.id} className="border-t border-border/60">
                    <td className="px-3 py-2 font-mono text-xs font-bold">{c.code}</td>
                    <td className="px-3 py-2 text-xs">{describeDiscount(c)}</td>
                    <td className="px-3 py-2 text-xs">
                      {c.appliesToAll ? 'Everything on booking' : 'First two hours'}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {c.expiresAt || 'None'}
                      {expired && <span className="ml-1 text-rust">(expired)</span>}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {c.timesUsed}
                      {c.usageLimit ? ` / ${c.usageLimit}` : ''}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => onToggle(c.id)}
                        disabled={togglingId === c.id}
                        className={`relative h-5 w-9 rounded-full transition-colors disabled:opacity-50 ${
                          c.active && !expired ? 'bg-olive' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                            c.active && !expired ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(c.id)}
                        disabled={deletingId === c.id}
                        className="text-muted-foreground hover:text-rust disabled:opacity-50"
                      >
                        {deletingId === c.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        {/* Create form */}
        <div className="pt-4 border-t border-border">
          <p className="font-display text-sm mb-3">Create a code</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <Field label="Code">
              <input
                type="text"
                placeholder="e.g. EASTER15"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full h-10 px-3 text-sm bg-white border border-border uppercase"
              />
            </Field>
            <Field label="Type">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as 'pct' | 'fix' | 'free')
                  if (e.target.value === 'free') setValue('100')
                  else setValue('')
                }}
                className="w-full h-10 px-3 text-sm bg-white border border-border"
              >
                <option value="pct">Percentage off</option>
                <option value="fix">Fixed amount off (₦)</option>
                <option value="free">Free session (100%)</option>
              </select>
            </Field>
            <Field label={type === 'pct' ? 'Value (%)' : type === 'fix' ? 'Value (₦)' : 'Value'}>
              <input
                type="number"
                min={1}
                value={value}
                disabled={type === 'free'}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-border disabled:opacity-50"
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <Field label="Applies to">
              <select
                value={appliesToAll ? '1' : '0'}
                onChange={(e) => setAppliesToAll(e.target.value === '1')}
                className="w-full h-10 px-3 text-sm bg-white border border-border"
              >
                <option value="0">First two hours only</option>
                <option value="1">Everything on the booking (extra time, return visit)</option>
              </select>
            </Field>
            <Field label="Expires">
              <input
                type="date"
                value={expiresAt}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-border"
              />
            </Field>
            <Field label="Total uses (blank = unlimited)">
              <input
                type="number"
                min={1}
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                placeholder="unlimited"
                className="w-full h-10 px-3 text-sm bg-white border border-border"
              />
            </Field>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCreate}
              disabled={creating || code.length < 4}
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
            >
              {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
              Create code
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Each customer can use a code once. A booking can carry one discount.
        </p>
      </div>
    </div>
  )
}

function describeDiscount(c: Code): string {
  if (c.type === 'pct') return `${c.value}% off`
  if (c.type === 'fix') return `${fmtNGN(c.value)} off`
  return 'Free session'
}

// ─── Automatic offers card ──────────────────────────────────────────────

function RulesCard({ rules }: { rules: Rule[] }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('Client reaches N referrals')
  const [reward, setReward] = useState('10% off')
  const [creating, startCreate] = useTransition()
  const [togglingId, startToggle] = useState<string | null>(null)

  function onCreate() {
    startCreate(async () => {
      const r = await adminCreateDiscountRule({ name, condition, reward })
      if (!r.ok) {
        toast.error(r.error, { duration: 8000 })
        return
      }
      toast.success('Added, switched off. Review it, then switch it on.', { duration: 5000 })
      setName('')
      router.refresh()
    })
  }

  async function onToggle(id: string) {
    startToggle(id)
    const r = await adminToggleDiscountRule(id)
    if (!r.ok) toast.error(r.error, { duration: 8000 })
    else toast.success(r.active ? 'Offer is off.' : 'Offer is on. Eligible clients will see it at checkout.', { duration: 5000 })
    router.refresh()
    startToggle(null)
  }

  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-sm">3 · Automatic offers</h3>
        <span className="text-xs text-muted-foreground">no code needed</span>
      </div>
      <div className="p-5 space-y-3">
        {rules.length === 0 ? (
          <p className="text-sm text-muted-foreground">No automatic offers yet.</p>
        ) : (
          rules.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 py-2 border-b border-border/40 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {r.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.condition} → {r.reward}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(r.id)}
                disabled={togglingId === r.id}
                className={`relative h-5 w-9 rounded-full transition-colors disabled:opacity-50 ${
                  r.active ? 'bg-olive' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    r.active ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))
        )}

        <div className="pt-3 border-t border-border">
          <p className="font-display text-sm mb-2">Add an offer</p>
          <div className="grid sm:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Offer name, e.g. Referral reward"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 px-3 text-sm border border-border"
            />
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="h-9 px-2 text-sm border border-border"
            >
              <option>Client reaches N referrals</option>
              <option>Client has no earlier booking</option>
              <option>Client birthday month</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 mb-3">
            <select
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="h-9 px-2 text-sm border border-border"
            >
              <option>10% off</option>
              <option>₦5,000 off</option>
              <option>Free session</option>
            </select>
            <button
              type="button"
              onClick={onCreate}
              disabled={creating || name.length < 2}
              className="inline-flex items-center gap-1 bg-foreground text-background px-3 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60"
            >
              {creating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
              Add offer
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            The referral reward matches your referral programme (free
            consultation at 3 referrals). When a client reaches it, checkout
            shows &quot;You have a free consultation. Use it&quot;. Using it marks the
            reward as spent.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Combine card ─────────────────────────────────────────────────────────

function CombineCard() {
  return (
    <div className="border border-border bg-card">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="font-display text-sm">4 · How discounts combine</h3>
      </div>
      <div className="p-5 space-y-3 text-sm">
        <Field label="On one booking">
          <select className="w-full h-10 px-3 text-sm bg-white border border-border">
            <option>One discount only: the customer&apos;s best offer is suggested</option>
            <option>Allow an automatic offer plus a code</option>
          </select>
        </Field>
        <p className="text-xs text-muted-foreground">
          The customer booking flow currently allows one discount at a time.
        </p>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
