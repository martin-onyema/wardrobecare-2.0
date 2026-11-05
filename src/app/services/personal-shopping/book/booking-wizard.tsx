'use client'

/**
 * Personal Shopping booking wizard — paid version.
 *
 * 4-step flow matching the consultation wizard pattern:
 *   1. Your details (name, phone, contact method)
 *   2. The brief (what you need, categories, colours, budget, sizes, fit, occasion)
 *      — includes the brand/exact-item guard: if the brief text mentions
 *        brands or exact items, the customer sees a warning and must
 *        acknowledge to continue or join the waitlist
 *   3. Service preference (Delivered or In-Person Fitting; if In-Person,
 *      pick a date+time slot which gets held for 10 minutes)
 *   4. Confirm & pay (review summary, pay the sourcing fee via Paystack)
 *
 * On the last step the wizard calls `createPersonalShoppingRequest` to
 * create the request + hold the slot (if In-Person), then
 * `initializePSPayment` to start the Paystack flow.
 */

import { useState, useEffect } from 'react'
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
  createPersonalShoppingRequest,
  initializePSPayment,
  checkBriefGuard,
  getPSAvailableSlots,
} from '@/actions/personal-shopping-customer'

type FormData = {
  // Step 1 — Your details
  customerName: string
  customerPhone: string
  contactVia: 'WhatsApp' | 'Call' | 'Email'
  shoppingFor: string
  // Step 2 — The brief
  brief: string
  categories: string[]
  colours: string[]
  budget: string
  sizes: string
  fit: string
  occasion: string
  // Step 3 — Service preference
  tier: 'DELIVERED' | 'IN_PERSON_FITTING'
  reviewMethod: 'ONLINE' | 'WHATSAPP' | 'ONSITE'
  area: string
  isLagos: boolean
  neededBy: string
  fitDate: string
  fitTime: string
  // Brand guard
  brandTerms: string[]
  brandChoice: '' | 'CONTINUED_ACK' | 'WAITLIST'
  // Promo code
  promoCode: string
}

const EMPTY: FormData = {
  customerName: '',
  customerPhone: '',
  contactVia: 'WhatsApp',
  shoppingFor: 'Myself',
  brief: '',
  categories: [],
  colours: [],
  budget: '',
  sizes: '',
  fit: '',
  occasion: '',
  tier: 'DELIVERED',
  reviewMethod: 'ONLINE',
  area: '',
  isLagos: true,
  neededBy: '',
  fitDate: '',
  fitTime: '',
  brandTerms: [],
  brandChoice: '',
  promoCode: '',
}

const STEPS = [
  { num: '01', label: 'Your Details' },
  { num: '02', label: 'The Brief' },
  { num: '03', label: 'Service Preference' },
  { num: '04', label: 'Confirm & Pay' },
]

const CATEGORIES = ['Shirts / Tops', 'Trousers', 'Suiting', 'Footwear', 'Accessories', 'Fragrance & Grooming', 'Traditional Wear']
const COLOURS = ['Navy', 'Black', 'White', 'Grey', 'Olive / Sage', 'Earth tones', 'Red', 'Blue', 'Green', 'Brown', 'Cream']
const BUDGETS = ['Under ₦100,000', '₦100,000 to ₦250,000', '₦250,000 to ₦500,000', 'Above ₦500,000']
const FITS = ['Slim', 'Regular', 'Relaxed', 'Not sure']
const OCCASIONS = ['Work', 'Events', 'Everyday', 'Wedding', 'Church', 'Travel', 'Traditional']
const SLOT_TIMES = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM']

const inputCls = 'w-full h-12 px-4 text-sm bg-transparent border border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground/60'

export function BookingWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [slots, setSlots] = useState<Array<{ date: string; time: string; fullLabel: string }>>([])
  const [briefGuard, setBriefGuard] = useState<{ flagged: boolean; terms: string[]; type: string | null } | null>(null)
  const [heldUntil, setHeldUntil] = useState<number | null>(null)

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }))

  // Brief guard: check as user types
  useEffect(() => {
    if (step !== 1) return
    if (data.brief.trim().length < 10) {
      // Use a microtask to avoid synchronous setState in effect
      queueMicrotask(() => {
        setBriefGuard(null)
        setData((d) => ({ ...d, brandTerms: [] }))
      })
      return
    }
    const guard = checkBriefGuard(data.brief)
    queueMicrotask(() => {
      setBriefGuard(guard)
      if (guard.flagged && guard.type !== 'INSPIRATION') {
        setData((d) => ({ ...d, brandTerms: guard.terms }))
      } else {
        setData((d) => ({ ...d, brandTerms: [] }))
      }
    })
  }, [data.brief, step])

  // Fetch available slots when entering step 3 with In-Person selected
  useEffect(() => {
    if (step !== 2 || data.tier !== 'IN_PERSON_FITTING') return
    getPSAvailableSlots({ from: new Date().toISOString().slice(0, 10), days: 14, mode: 'IN_PERSON_FITTING' })
      .then(setSlots)
      .catch(() => setSlots([]))
  }, [step, data.tier])

  // Hold countdown
  useEffect(() => {
    if (step !== 3 || !heldUntil) return
    const interval = setInterval(() => {
      const left = Math.floor((heldUntil - Date.now()) / 1000)
      if (left <= 0) {
        clearInterval(interval)
        setHeldUntil(null)
        setStep(2)
        toast.error('Your slot hold expired. Please pick a new time.')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [step, heldUntil])

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (data.customerName.trim().length < 2) e.customerName = 'Please enter your name'
      if (data.customerPhone.replace(/\D/g, '').length < 10) e.customerPhone = 'Please enter a valid phone number'
    }
    if (s === 1) {
      if (data.brief.trim().length < 10) e.brief = 'Please tell us what you need'
      if (data.categories.length === 0) e.categories = 'Pick at least one category'
    }
    if (s === 2) {
      if (data.tier === 'DELIVERED' && data.area.trim().length < 2) e.area = 'Please enter your area'
      if (data.tier === 'IN_PERSON_FITTING') {
        if (!data.fitDate) e.fitDate = 'Please pick a date'
        if (!data.fitTime) e.fitTime = 'Please pick a time'
      }
      if (data.tier === 'IN_PERSON_FITTING' && data.brandTerms.length > 0 && data.brandChoice !== 'CONTINUED_ACK') {
        e.brandChoice = 'Please acknowledge the brand note to continue'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = async () => {
    if (!validateStep(step)) return
    // When moving from step 2 → step 3 (Service Preference), if In-Person
    // is selected and we have a brand flag, make sure the customer acknowledged
    if (step === 1 && briefGuard?.flagged && briefGuard.type !== 'INSPIRATION' && data.brandChoice !== 'CONTINUED_ACK') {
      toast.error('Please acknowledge the brand note before continuing.')
      return
    }
    setStep((s) => Math.min(s + 1, 3))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pay = async () => {
    setSubmitting(true)
    try {
      // 1. Create the request (holds the slot if In-Person)
      const create = await createPersonalShoppingRequest({
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone.trim(),
        contactVia: data.contactVia,
        shoppingFor: data.shoppingFor,
        tier: data.tier,
        reviewMethod: data.reviewMethod,
        area: data.tier === 'DELIVERED' ? data.area : undefined,
        isLagos: data.isLagos,
        brief: data.brief.trim(),
        categories: data.categories.join(', '),
        colours: data.colours.join(', '),
        budget: data.budget,
        neededBy: data.neededBy || undefined,
        brandTerms: data.brandTerms.length > 0 ? data.brandTerms : undefined,
        brandChoice: data.brandChoice || undefined,
        fitDate: data.tier === 'IN_PERSON_FITTING' ? data.fitDate : undefined,
        fitTime: data.tier === 'IN_PERSON_FITTING' ? data.fitTime : undefined,
        promoCode: data.promoCode || undefined,
      })
      if (!create.ok) {
        toast.error(create.error, { duration: 8000 })
        setSubmitting(false)
        return
      }

      // 2. Initialize Paystack payment
      const init = await initializePSPayment(create.requestId)
      if (!init.ok) {
        toast.error(init.error, { duration: 8000 })
        setSubmitting(false)
        return
      }

      // If fee is 0 (free promo code), init returns a mock URL that
      // redirects to the confirmed page
      if (init.authorizationUrl) {
        window.location.href = init.authorizationUrl
      }
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not start payment. Please try again.', { duration: 8000 })
      setSubmitting(false)
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="border border-border">
      {/* Progress bars */}
      <div className="flex gap-1 px-6 md:px-10 pt-8" aria-hidden>
        {STEPS.map((s, i) => (
          <div key={s.num} className={`h-[3px] flex-1 transition-colors duration-500 ${i < step ? 'bg-camel' : i === step ? 'bg-rust' : 'bg-border'}`} />
        ))}
      </div>

      {/* Stepper nav */}
      <ol className="flex flex-wrap gap-x-6 gap-y-2 px-6 md:px-10 pt-6 pb-5 border-b border-border text-[12px] uppercase tracking-[0.14em]">
        {STEPS.map((s, i) => (
          <li key={s.num} className={`tabular-nums pb-3 relative ${i === step ? 'text-foreground font-bold' : i < step ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
            <span className="font-mono mr-1.5">{s.num}</span>
            {s.label}
            {i === step && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-rust" />}
          </li>
        ))}
      </ol>

      {/* Panels */}
      <div className="px-6 md:px-10 py-10">
        {/* STEP 1 — Your Details */}
        {step === 0 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">Your details</h2>
            <p className="text-sm text-muted-foreground mb-8">So we can confirm your request and reach you with the shortlist.</p>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Full name <span className="text-foreground ml-1">*</span></label>
                  <input className={inputCls} value={data.customerName} onChange={(e) => set({ customerName: e.target.value })} placeholder="e.g. Ngozi Okoro" autoComplete="name" />
                  {errors.customerName && <p className="text-xs text-red-700 mt-1.5">{errors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Phone number <span className="text-foreground ml-1">*</span></label>
                  <input className={inputCls} value={data.customerPhone} onChange={(e) => set({ customerPhone: e.target.value })} placeholder="e.g. 0803 123 4567" inputMode="tel" autoComplete="tel" />
                  {errors.customerPhone && <p className="text-xs text-red-700 mt-1.5">{errors.customerPhone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Shopping for</label>
                <input className={inputCls} value={data.shoppingFor} onChange={(e) => set({ shoppingFor: e.target.value })} placeholder="Myself, or e.g. Femi (Husband)" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Preferred contact method</label>
                <div className="flex flex-wrap gap-2">
                  {(['Call', 'WhatsApp', 'Email'] as const).map((m) => (
                    <button key={m} type="button" onClick={() => set({ contactVia: m })}
                      className={`px-5 py-3 text-sm border transition-colors ${data.contactVia === m ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2 — The Brief */}
        {step === 1 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">The brief</h2>
            <p className="text-sm text-muted-foreground mb-8">Tell us what you need. The more detail you give, the better the shortlist.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">What are you looking for? <span className="text-foreground ml-1">*</span></label>
                <textarea className={`${inputCls} min-h-[100px] resize-y py-3`} value={data.brief}
                  onChange={(e) => set({ brief: e.target.value })}
                  placeholder="e.g. Slim fit office wear. Shirt L, waist 34. Needs to work for boardroom and travel." />
                {errors.brief && <p className="text-xs text-red-700 mt-1.5">{errors.brief}</p>}
              </div>

              {/* Brand guard */}
              {briefGuard?.flagged && briefGuard.type !== 'INSPIRATION' && (
                <div className="bg-amber-50 border border-camel px-5 py-4 text-sm leading-relaxed">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-camel" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-2">
                        {briefGuard.type === 'BRAND' && 'You mentioned specific brands or exact items.'}
                        {briefGuard.type === 'EXACT' && 'You asked for an exact item match.'}
                        {briefGuard.type === 'LINK' && 'You included a link.'}
                      </p>
                      <p className="text-muted-foreground mb-3">
                        Personal Shopping matches by style, colour, fit and category — not by brand.
                        If you need a specific brand or exact item, that is <strong>Premium Sourcing</strong>
                        (coming soon). You can continue and we will match the look, or join the waitlist
                        for Premium Sourcing.
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">Detected: {briefGuard.terms.join(', ')}</p>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => set({ brandChoice: 'CONTINUED_ACK' })}
                          className={`px-4 py-2 text-xs border transition-colors ${data.brandChoice === 'CONTINUED_ACK' ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
                          Continue with Personal Shopping
                        </button>
                        <button type="button" onClick={() => set({ brandChoice: 'WAITLIST' })}
                          className={`px-4 py-2 text-xs border transition-colors ${data.brandChoice === 'WAITLIST' ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`}>
                          Join the Premium Sourcing waitlist
                        </button>
                      </div>
                      {errors.brandChoice && <p className="text-xs text-red-700 mt-2">{errors.brandChoice}</p>}
                    </div>
                  </div>
                </div>
              )}

              {briefGuard?.flagged && briefGuard.type === 'INSPIRATION' && (
                <div className="bg-secondary/40 border-l-4 border-camel px-4 py-3 text-sm">
                  <strong>Note:</strong> We match by style and vibe, not by brand. Tell us more about the
                  look and we will find something similar.
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Categories <span className="text-foreground ml-1">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} type="button"
                      onClick={() => set({ categories: data.categories.includes(c) ? data.categories.filter((x) => x !== c) : [...data.categories, c] })}
                      className={`px-4 py-2 text-sm border transition-colors ${data.categories.includes(c) ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`}>
                      {c}
                    </button>
                  ))}
                </div>
                {errors.categories && <p className="text-xs text-red-700 mt-1.5">{errors.categories}</p>}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Colours</label>
                <div className="flex flex-wrap gap-2">
                  {COLOURS.map((c) => (
                    <button key={c} type="button"
                      onClick={() => set({ colours: data.colours.includes(c) ? data.colours.filter((x) => x !== c) : [...data.colours, c] })}
                      className={`px-4 py-2 text-sm border transition-colors ${data.colours.includes(c) ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Budget range</label>
                  <select className={`${inputCls} h-12`} value={data.budget} onChange={(e) => set({ budget: e.target.value })}>
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Sizes (top / bottom / shoe)</label>
                  <input className={inputCls} value={data.sizes} onChange={(e) => set({ sizes: e.target.value })} placeholder="e.g. L / 34 / 43" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Fit preference</label>
                  <select className={`${inputCls} h-12`} value={data.fit} onChange={(e) => set({ fit: e.target.value })}>
                    <option value="">Select fit</option>
                    {FITS.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Main occasion</label>
                  <select className={`${inputCls} h-12`} value={data.occasion} onChange={(e) => set({ occasion: e.target.value })}>
                    <option value="">Select occasion</option>
                    {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3 — Service Preference */}
        {step === 2 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">Service preference</h2>
            <p className="text-sm text-muted-foreground mb-8">Choose how you want to receive your shortlist.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Delivered or In-Person Fitting</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'DELIVERED', label: 'Delivered', desc: '₦45,000' },
                    { value: 'IN_PERSON_FITTING', label: 'In-Person Fitting', desc: '₦50,000 (60 min included)' },
                  ].map((t) => (
                    <button key={t.value} type="button" onClick={() => set({ tier: t.value as 'DELIVERED' | 'IN_PERSON_FITTING' })}
                      className={`text-left p-4 border-1.5 transition-colors ${data.tier === t.value ? 'border-rust bg-rust/5' : 'border-border hover:border-foreground'}`}
                      style={{ borderWidth: '1.5px' }}>
                      <p className="text-sm font-semibold">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">How do you want to review the shortlist?</label>
                <select className={`${inputCls} h-12`} value={data.reviewMethod} onChange={(e) => set({ reviewMethod: e.target.value as 'ONLINE' | 'WHATSAPP' | 'ONSITE' })}>
                  <option value="ONLINE">Online — you get a link to a page with photos and prices</option>
                  <option value="WHATSAPP">WhatsApp — stylist sends the list as a message</option>
                  {data.tier === 'IN_PERSON_FITTING' && <option value="ONSITE">On-site at the fitting</option>}
                </select>
              </div>

              {data.tier === 'DELIVERED' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Area <span className="text-foreground ml-1">*</span></label>
                      <input className={inputCls} value={data.area} onChange={(e) => set({ area: e.target.value })} placeholder="e.g. Lekki Phase 1, Ikeja GRA" />
                      {errors.area && <p className="text-xs text-red-700 mt-1.5">{errors.area}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Is this in Lagos?</label>
                      <select className={`${inputCls} h-12`} value={data.isLagos ? '1' : '0'} onChange={(e) => set({ isLagos: e.target.value === '1' })}>
                        <option value="1">Yes, Lagos</option>
                        <option value="0">No, outside Lagos</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {data.tier === 'IN_PERSON_FITTING' && (
                <>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Pick a fitting date <span className="text-foreground ml-1">*</span></label>
                    {slots.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Loading available slots…</p>
                    ) : (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {Array.from(new Set(slots.map((s) => s.date))).map((date) => {
                          const d = new Date(date)
                          return (
                            <button key={date} type="button" disabled={d.getDay() === 0}
                              onClick={() => set({ fitDate: date, fitTime: '' })}
                              className={`flex-shrink-0 w-[68px] py-3 border text-center ${data.fitDate === date ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`}>
                              <span className="block text-[11px] uppercase">{d.toLocaleString('en', { weekday: 'short' })}</span>
                              <span className="block text-xl font-display mt-1">{d.getDate()}</span>
                              <span className="block text-[11px] uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                    {errors.fitDate && <p className="text-xs text-red-700 mt-1.5">{errors.fitDate}</p>}
                  </div>
                  {data.fitDate && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Available times</label>
                      <div className="flex flex-wrap gap-2">
                        {slots.filter((s) => s.date === data.fitDate).map((s) => (
                          <button key={s.time} type="button"
                            onClick={() => set({ fitTime: s.time })}
                            className={`min-w-[120px] py-3 px-4 border text-sm text-center ${data.fitTime === s.time ? 'bg-olive text-white border-olive' : 'border-foreground hover:bg-foreground hover:text-background'}`}>
                            {s.time}
                          </button>
                        ))}
                      </div>
                      {errors.fitTime && <p className="text-xs text-red-700 mt-1.5">{errors.fitTime}</p>}
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Needed by (optional)</label>
                <input type="date" className={inputCls} value={data.neededBy} min={new Date().toISOString().slice(0, 10)} onChange={(e) => set({ neededBy: e.target.value })} />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Promo code (optional)</label>
                <input className={inputCls} value={data.promoCode} onChange={(e) => set({ promoCode: e.target.value.toUpperCase() })} placeholder="e.g. WELCOME10" />
              </div>
            </div>
          </section>
        )}

        {/* STEP 4 — Confirm & Pay */}
        {step === 3 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">Confirm and pay</h2>
            <p className="text-sm text-muted-foreground mb-6">Pay the sourcing fee to start. Items are paid only when you approve them.</p>
            <dl className="border-t border-border">
              {[
                ['Service', 'Personal Shopping'],
                ['For', data.shoppingFor],
                ['Type', data.tier === 'DELIVERED' ? 'Delivered' : 'In-Person Fitting'],
                ['Brief', data.brief.slice(0, 120) + (data.brief.length > 120 ? '…' : '')],
                ['Categories', data.categories.join(', ')],
                ['Colours', data.colours.join(', ') || '—'],
                ['Budget', data.budget || '—'],
                data.tier === 'DELIVERED' ? ['Area', data.area] : ['Fitting', `${data.fitDate}, ${data.fitTime}`],
                ['Contact', `${data.customerPhone} · ${data.contactVia}`],
              ].map(([label, value]) => (
                <div key={label as string} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 border-b border-border/60">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5">{label}</dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
              <div className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-5 border-b-2 border-foreground bg-secondary/30">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-foreground pt-0.5 font-semibold">Sourcing fee due now</dt>
                <dd className="font-mono text-2xl text-rust font-bold tabular-nums">
                  ₦{data.tier === 'DELIVERED' ? '45,000' : '50,000'}
                </dd>
              </div>
            </dl>
            <div className="mt-6 bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm leading-relaxed" style={{ borderLeftWidth: '3px' }}>
              The sourcing fee covers finding and shortlisting your items. You only pay for the items you
              choose to keep. {data.tier === 'IN_PERSON_FITTING' && 'Extra fitting time beyond 60 minutes is ₦5,000 per started 30 minutes.'}
            </div>
          </section>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-6 md:px-10 py-6 border-t border-border bg-secondary/40">
        {step > 0 ? (
          <button type="button" onClick={back} disabled={submitting}
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:border-foreground transition-colors disabled:opacity-50">
            &larr; Back
          </button>
        ) : <span />}
        {step < 3 ? (
          <button type="button" onClick={next}
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors">
            Continue <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button type="button" onClick={pay} disabled={submitting}
            className="inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors disabled:opacity-60">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Starting payment…</> : <>Pay sourcing fee & book <ArrowRight className="h-3.5 w-3.5" /></>}
          </button>
        )}
      </div>
    </div>
  )
}
