'use client'

/**
 * Outfit Gifting — Booking Wizard (Mockup 54).
 *
 * Two paths share one wizard:
 *   1. Styled by Us — buyer fills a brief, pays styling fee + items + boxes + delivery
 *   2. Gift Card — buyer pays a value, recipient shops the site
 *
 * Steps (Styled): Gift type → Recipient → Brief & budget → Boxes & delivery → Pay
 * Steps (Card):   Gift type → Recipient → Amount & message → Pay
 *
 * Prices are from the developer guide section 9:
 *   Styling fee ₦40,000 (includes first Small or Medium box)
 *   Large first box +₦10,000
 *   Extra boxes: Small ₦10,000 / Medium ₦20,000 / Large ₦30,000
 *   Gift Card minimum ₦100,000, no maximum
 *   Delivery fees from src/lib/delivery-zones.ts
 */

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Gift, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DELIVERY_ZONES } from '@/lib/delivery-zones'

// ─── Constants ──────────────────────────────────────────────────────────────

const STYLING_FEE = 40000
const LARGE_FIRST_BOX_SURCHARGE = 10000
const GIFT_CARD_MIN = 100000
const BOX_PRICES = { sm: 10000, md: 20000, lg: 30000 } as const
const BOX_LABELS = { sm: 'Small', md: 'Medium', lg: 'Large' } as const

const RELATIONSHIPS = ['Husband', 'Boyfriend / Fiancé', 'Father', 'Son', 'Brother', 'Friend', 'Colleague / Boss', 'Other']
const CATEGORIES = ['Shirts / Tops', 'Trousers', 'Footwear', 'Accessories', 'Fragrance & Grooming', 'Traditional Wear']
const QUICK_AMOUNTS = [100000, 150000, 250000, 500000]

// ─── Types ──────────────────────────────────────────────────────────────────

type Path = '' | 'styled' | 'card'

type WizardState = {
  step: number
  path: Path
  // Recipient
  recipientName: string
  relationship: string
  recipientPhone: string
  recipientEmail: string
  // Sizes (styled only)
  sizes: string
  shoeSize: string
  // Brief (styled only)
  occasion: string
  stylePrefs: string
  colours: string
  categories: string[]
  budget: string
  // Boxes (styled only)
  firstBox: 'sm' | 'lg'
  extraBoxes: { sm: number; md: number; lg: number }
  messageCard: string
  // Delivery
  deliveryArea: string
  deliveryAddress: string
  deliveryDate: string
  surprise: boolean
  // Gift card
  giftCardAmount: string
  giftCardMessage: string
  giftCardBox: boolean
}

function initialState(): WizardState {
  return {
    step: 1,
    path: '',
    recipientName: '',
    relationship: '',
    recipientPhone: '',
    recipientEmail: '',
    sizes: '',
    shoeSize: '',
    occasion: '',
    stylePrefs: '',
    colours: '',
    categories: [],
    budget: '',
    firstBox: 'sm',
    extraBoxes: { sm: 0, md: 0, lg: 0 },
    messageCard: '',
    deliveryArea: '',
    deliveryAddress: '',
    deliveryDate: '',
    surprise: true,
    giftCardAmount: '',
    giftCardMessage: '',
    giftCardBox: false,
  }
}

// ─── Pricing ────────────────────────────────────────────────────────────────

function getDeliveryFee(area: string): number | null {
  if (!area) return null
  if (area === 'Outside Lagos') return null // quoted
  const zone = DELIVERY_ZONES.find((z) => z.name === area)
  return zone ? zone.fee : null
}

function calculateTotals(s: WizardState) {
  if (s.path === 'card') {
    const fee = parseInt(s.giftCardAmount) || 0
    const del = getDeliveryFee(s.deliveryArea) ?? 0
    return { fee, box: 0, items: 0, del, total: fee + del, quote: s.deliveryArea === 'Outside Lagos' }
  }
  // Styled path
  const box =
    (s.firstBox === 'lg' ? LARGE_FIRST_BOX_SURCHARGE : 0) +
    s.extraBoxes.sm * BOX_PRICES.sm +
    s.extraBoxes.md * BOX_PRICES.md +
    s.extraBoxes.lg * BOX_PRICES.lg
  const items = parseInt(s.budget) || 0
  const del = getDeliveryFee(s.deliveryArea) ?? 0
  return {
    fee: STYLING_FEE,
    box,
    items,
    del,
    total: STYLING_FEE + box + items + del,
    quote: s.deliveryArea === 'Outside Lagos',
  }
}

function fmtNGN(n: number): string {
  return '₦' + Math.round(n).toLocaleString('en-US')
}

// ─── Date chips ─────────────────────────────────────────────────────────────

function nextDateChips(count = 8) {
  const chips: { key: string; label: string; disabled: boolean }[] = []
  const d = new Date()
  d.setDate(d.getDate() + 3) // earliest is 3 days from today
  let added = 0
  while (added < count && chips.length < 20) {
    if (d.getDay() !== 0) { // skip Sundays
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const label = d.toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      chips.push({ key: k, label, disabled: false })
      added++
    }
    d.setDate(d.getDate() + 1)
  }
  return chips
}

// ─── Validation ─────────────────────────────────────────────────────────────

function validateStep(s: WizardState, step: number): Record<string, string> {
  const errors: Record<string, string> = {}
  const phoneRe = /^(0|\+?234)\d{9,10}$/

  if (step === 1) {
    if (!s.path) errors.path = 'Choose one to continue.'
  }
  if (step === 2) {
    if (!s.recipientName.trim()) errors.recipientName = 'Recipient name is required.'
    if (!s.relationship) errors.relationship = 'Select a relationship.'
    if (s.path === 'card') {
      if (!s.recipientPhone.trim()) errors.recipientPhone = 'Phone is required.'
      else if (!phoneRe.test(s.recipientPhone.trim())) errors.recipientPhone = 'Enter a valid Nigerian phone number.'
      if (!s.recipientEmail.trim()) errors.recipientEmail = 'Email is required.'
      else if (!/^\S+@\S+\.\S+$/.test(s.recipientEmail.trim())) errors.recipientEmail = 'Enter a valid email.'
    }
  }
  if (step === 3 && s.path === 'styled') {
    if (!s.occasion.trim()) errors.occasion = 'Tell us the occasion.'
    if (!s.budget.trim()) errors.budget = 'Enter a budget for the gift items.'
    else if (parseInt(s.budget) < 5000) errors.budget = 'Budget must be at least ₦5,000.'
  }
  if (step === 3 && s.path === 'card') {
    if (!s.giftCardAmount.trim()) errors.giftCardAmount = 'Enter a gift card amount.'
    else if (parseInt(s.giftCardAmount) < GIFT_CARD_MIN) errors.giftCardAmount = `Minimum is ${fmtNGN(GIFT_CARD_MIN)}.`
    if (!s.deliveryArea) errors.deliveryArea = 'Choose a delivery area.'
  }
  if (step === 4 && s.path === 'styled') {
    if (!s.deliveryArea) errors.deliveryArea = 'Choose a delivery area.'
    if (!s.deliveryAddress.trim()) errors.deliveryAddress = 'Delivery address is required.'
    if (!s.deliveryDate) errors.deliveryDate = 'Choose a delivery date.'
  }
  return errors
}

// ─── Step names ─────────────────────────────────────────────────────────────

function stepNames(path: Path): string[] {
  return path === 'card'
    ? ['Gift type', 'Recipient', 'Amount & message', 'Pay']
    : ['Gift type', 'Recipient', 'Brief & budget', 'Boxes & delivery', 'Pay']
}

// ─── Component ──────────────────────────────────────────────────────────────

export function GiftingWizard() {
  const [s, setS] = useState<WizardState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paying, setPaying] = useState(false)
  const dates = nextDateChips()

  const names = stepNames(s.path || '')
  const stepCount = s.path ? names.length : 1
  const totals = calculateTotals(s)

  function update(patch: Partial<WizardState>) {
    setS((prev) => ({ ...prev, ...patch }))
  }

  function next() {
    const errs = validateStep(s, s.step)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (s.step === stepCount) {
      handlePay()
    } else {
      update({ step: s.step + 1 })
      setErrors({})
    }
  }

  function back() {
    if (s.step > 1) {
      update({ step: s.step - 1 })
      setErrors({})
    }
  }

  function selectPath(path: Path) {
    update({ path, step: 2 })
    setErrors({})
  }

  function toggleCategory(cat: string) {
    const cats = s.categories.includes(cat)
      ? s.categories.filter((c) => c !== cat)
      : [...s.categories, cat]
    update({ categories: cats })
  }

  function adjustExtraBox(size: 'sm' | 'md' | 'lg', dir: number) {
    const current = s.extraBoxes[size]
    update({ extraBoxes: { ...s.extraBoxes, [size]: Math.max(0, current + dir) } })
  }

  function setQuickAmount(amt: number) {
    update({ giftCardAmount: String(amt) })
  }

  async function handlePay() {
    setPaying(true)
    // In production: create a server action that creates the gift order
    // and initializes a Paystack transaction. For now, simulate the flow.
    try {
      const orderData = {
        path: s.path,
        recipientName: s.recipientName,
        relationship: s.relationship,
        recipientPhone: s.recipientPhone,
        recipientEmail: s.recipientEmail,
        sizes: s.sizes,
        shoeSize: s.shoeSize,
        occasion: s.occasion,
        stylePrefs: s.stylePrefs,
        colours: s.colours,
        categories: s.categories,
        budget: s.budget,
        firstBox: s.firstBox,
        extraBoxes: s.extraBoxes,
        messageCard: s.messageCard,
        deliveryArea: s.deliveryArea,
        deliveryAddress: s.deliveryAddress,
        deliveryDate: s.deliveryDate,
        surprise: s.surprise,
        giftCardAmount: s.giftCardAmount,
        giftCardMessage: s.giftCardMessage,
        giftCardBox: s.giftCardBox,
        total: totals.total,
      }
      console.log('Gift order data:', orderData)
      // TODO: call server action to create order + init Paystack
      // For now, show success state
      update({ step: stepCount + 1 }) // go to confirmation
    } catch (e: any) {
      console.error('Payment failed:', e)
      alert('Payment could not be started. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  const isCard = s.path === 'card'
  const isStyled = s.path === 'styled'
  const showStep = Math.min(s.step, stepCount)
  const isConfirmation = s.step > stepCount

  if (isConfirmation) {
    return <ConfirmationScreen s={s} totals={totals} />
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-[#1B1917]">
          {isCard ? 'Gift Card' : isStyled ? 'Styled by Us' : 'Outfit Gifting'}
        </h1>
        <p className="mt-2 text-sm text-[#6B7A6E]">
          {isCard
            ? 'He shops the site himself, up to the value you pay.'
            : isStyled
            ? 'Our stylist picks the outfit, packs it in a gift box, and sends you a photo preview to approve.'
            : 'Give a complete styled outfit, curated for him.'}
        </p>
      </div>

      {/* Progress bar */}
      {s.path && (
        <div className="mb-8 flex items-center gap-2">
          {names.map((name, i) => {
            const stepNum = i + 1
            const isActive = showStep === stepNum
            const isDone = showStep > stepNum
            return (
              <div key={i} className="flex items-center">
                <div
                  className={`flex items-center gap-2 ${isActive ? 'text-[#1B1917] font-semibold' : isDone ? 'text-[#3E4630]' : 'text-[#A8823D]/50'}`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                      isActive ? 'bg-[#1B1917] text-white' : isDone ? 'bg-[#3E4630] text-white' : 'bg-[#EDE6D8] text-[#6B7A6E]'
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
                  </span>
                  <span className="hidden sm:inline text-xs">{name}</span>
                </div>
                {i < names.length - 1 && <div className={`mx-2 h-px w-8 ${isDone ? 'bg-[#3E4630]' : 'bg-[#D9D0C0]'}`} />}
              </div>
            )
          })}
        </div>
      )}

      {/* Step content */}
      <div className="rounded-lg border border-[#D9D0C0] bg-white p-6 md:p-8">
        {/* Step 1: Gift type */}
        {showStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Who are you gifting?</h3>
            <p className="text-sm text-[#6B7A6E]">Choose how you want to give. You can come back and use the other one any time.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => selectPath('styled')}
                className={`rounded-lg border-2 p-4 text-left transition-colors ${
                  s.path === 'styled' ? 'border-[#1B1917] bg-[#F7F3EA]' : 'border-[#D9D0C0] hover:border-[#A8823D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#A8823D]" />
                  <b className="font-display text-base">Styled by Us</b>
                </div>
                <div className="mt-1 text-xs text-[#6B7A6E]">From {fmtNGN(STYLING_FEE)} + the gift items</div>
                <p className="mt-2 text-xs text-[#6B7A6E] leading-relaxed">
                  You tell us about him. Our stylist picks the outfit, packs it in a gift box, and sends you a photo preview to approve before it goes out.
                </p>
              </button>
              <button
                onClick={() => selectPath('card')}
                className={`rounded-lg border-2 p-4 text-left transition-colors ${
                  s.path === 'card' ? 'border-[#1B1917] bg-[#F7F3EA]' : 'border-[#D9D0C0] hover:border-[#A8823D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#A8823D]" />
                  <b className="font-display text-base">Gift Card</b>
                </div>
                <div className="mt-1 text-xs text-[#6B7A6E]">From {fmtNGN(GIFT_CARD_MIN)}</div>
                <p className="mt-2 text-xs text-[#6B7A6E] leading-relaxed">
                  He shops the site himself up to the value you pay. We notify him by email, SMS and WhatsApp with a shop link.
                </p>
              </button>
            </div>
            {errors.path && <p className="text-sm text-[#8C3B2E]">{errors.path}</p>}
          </div>
        )}

        {/* Step 2: Recipient */}
        {showStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Who is it for?</h3>
            <p className="text-sm text-[#6B7A6E]">
              {isCard
                ? 'We need his contact details so we can tell him a gift card is waiting.'
                : 'We never contact him about the gift. Sizes come from you, or from someone close to him.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="rn">Recipient name</Label>
                <Input id="rn" value={s.recipientName} onChange={(e) => update({ recipientName: e.target.value })} placeholder="e.g. Femi Okoro" className="mt-1" />
                {errors.recipientName && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.recipientName}</p>}
              </div>
              <div>
                <Label htmlFor="rrel">Relationship</Label>
                <select id="rrel" value={s.relationship} onChange={(e) => update({ relationship: e.target.value })} className="mt-1 w-full rounded-md border border-[#D9D0C0] px-3 py-2 text-sm">
                  <option value="">Select</option>
                  {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
                </select>
                {errors.relationship && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.relationship}</p>}
              </div>
            </div>
            {isCard && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="rph">Recipient phone (for SMS and WhatsApp)</Label>
                  <Input id="rph" type="tel" value={s.recipientPhone} onChange={(e) => update({ recipientPhone: e.target.value })} placeholder="0803 123 4567" className="mt-1" />
                  {errors.recipientPhone && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.recipientPhone}</p>}
                </div>
                <div>
                  <Label htmlFor="rem">Recipient email</Label>
                  <Input id="rem" type="email" value={s.recipientEmail} onChange={(e) => update({ recipientEmail: e.target.value })} placeholder="name@email.com" className="mt-1" />
                  {errors.recipientEmail && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.recipientEmail}</p>}
                </div>
              </div>
            )}
            {isStyled && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="sz">Clothing sizes (if known)</Label>
                    <Input id="sz" value={s.sizes} onChange={(e) => update({ sizes: e.target.value })} placeholder="e.g. Shirt L, Trousers 34" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="ssz">Shoe size (if known)</Label>
                    <Input id="ssz" value={s.shoeSize} onChange={(e) => update({ shoeSize: e.target.value })} placeholder="e.g. 43" className="mt-1" />
                  </div>
                </div>
                <p className="text-xs text-[#6B7A6E] italic">Not sure? Leave the sizes blank — every gift includes one free size exchange.</p>
              </>
            )}
          </div>
        )}

        {/* Step 3: Brief & budget (styled) or Amount & message (card) */}
        {showStep === 3 && isStyled && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Brief and budget</h3>
            <p className="text-sm text-[#6B7A6E]">Tell us about the occasion and what he likes. The more we know, the better the picks.</p>
            <div>
              <Label htmlFor="occ">Occasion</Label>
              <Input id="occ" value={s.occasion} onChange={(e) => update({ occasion: e.target.value })} placeholder="e.g. 30th birthday, promotion, anniversary" className="mt-1" />
              {errors.occasion && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.occasion}</p>}
            </div>
            <div>
              <Label>What categories are you thinking? (select any)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      s.categories.includes(cat) ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E] hover:border-[#A8823D]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="sty">Style preferences (optional)</Label>
              <Textarea id="sty" value={s.stylePrefs} onChange={(e) => update({ stylePrefs: e.target.value })} placeholder="e.g. Likes classic looks, not too flashy. Usually wears blues and earth tones." className="mt-1" rows={2} />
            </div>
            <div>
              <Label htmlFor="cols">Colour preferences (optional)</Label>
              <Input id="cols" value={s.colours} onChange={(e) => update({ colours: e.target.value })} placeholder="e.g. Navy, olive, white, black" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bud">Budget for gift items (₦)</Label>
              <Input id="bud" type="number" value={s.budget} onChange={(e) => update({ budget: e.target.value })} placeholder="e.g. 50000" className="mt-1" />
              <p className="mt-1 text-xs text-[#6B7A6E] italic">This is separate from the styling fee. It covers the actual clothing items in the gift.</p>
              {errors.budget && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.budget}</p>}
            </div>
          </div>
        )}

        {showStep === 3 && isCard && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Amount and message</h3>
            <p className="text-sm text-[#6B7A6E]">Any amount from {fmtNGN(GIFT_CARD_MIN)}. He can spend up to this value on the site.</p>
            <div>
              <Label htmlFor="amt">Gift card amount (₦)</Label>
              <Input id="amt" type="number" value={s.giftCardAmount} onChange={(e) => update({ giftCardAmount: e.target.value })} placeholder="e.g. 150000" className="mt-1" />
              {errors.giftCardAmount && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.giftCardAmount}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setQuickAmount(amt)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    s.giftCardAmount === String(amt) ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E] hover:border-[#A8823D]'
                  }`}
                >
                  {fmtNGN(amt)}
                </button>
              ))}
            </div>
            <div>
              <Label htmlFor="msg">Message to him (optional)</Label>
              <Textarea id="msg" value={s.giftCardMessage} onChange={(e) => update({ giftCardMessage: e.target.value })} placeholder="Happy birthday, enjoy choosing something you love." className="mt-1" rows={2} />
            </div>
            <DeliveryAreaSelect s={s} update={update} errors={errors} />
            <div>
              <Label>Packaging</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => update({ giftCardBox: false })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    !s.giftCardBox ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E]'
                  }`}
                >
                  Custom shopping bags (no extra cost)
                </button>
                <button
                  onClick={() => update({ giftCardBox: true })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    s.giftCardBox ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E]'
                  }`}
                >
                  Gift box instead
                </button>
              </div>
              {s.giftCardBox && (
                <p className="mt-2 text-xs text-[#6B7A6E] italic">
                  We will contact <b>you</b> once he has chosen, to confirm the box size and cost. Box prices: Small {fmtNGN(BOX_PRICES.sm)}, Medium {fmtNGN(BOX_PRICES.md)}, Large {fmtNGN(BOX_PRICES.lg)}.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Boxes & delivery (styled only) */}
        {showStep === 4 && isStyled && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Boxes, message and delivery</h3>
            <p className="text-sm text-[#6B7A6E]">
              Your {fmtNGN(STYLING_FEE)} styling fee includes packing and the first box, if it is small or medium.
            </p>
            {/* First box */}
            <div>
              <Label>First box</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => update({ firstBox: 'sm' })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    s.firstBox === 'sm' ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E]'
                  }`}
                >
                  Small / Medium (included)
                </button>
                <button
                  onClick={() => update({ firstBox: 'lg' })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    s.firstBox === 'lg' ? 'border-[#1B1917] bg-[#1B1917] text-white' : 'border-[#D9D0C0] text-[#6B7A6E]'
                  }`}
                >
                  Large (+{fmtNGN(LARGE_FIRST_BOX_SURCHARGE)})
                </button>
              </div>
            </div>
            {/* Extra boxes */}
            <div>
              <Label>Extra boxes (for more outfits or categories)</Label>
              <div className="mt-2 space-y-2">
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <div key={size} className="flex items-center justify-between rounded-lg border border-[#D9D0C0] p-3">
                    <div>
                      <div className="text-sm font-medium">{BOX_LABELS[size]} box</div>
                      <div className="text-xs text-[#6B7A6E]">{fmtNGN(BOX_PRICES[size])} each, box and packaging included</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => adjustExtraBox(size, -1)} className="flex h-8 w-8 items-center justify-center rounded border border-[#D9D0C0] text-sm" type="button">−</button>
                      <span className="w-6 text-center text-sm font-mono">{s.extraBoxes[size]}</span>
                      <button onClick={() => adjustExtraBox(size, 1)} className="flex h-8 w-8 items-center justify-center rounded border border-[#D9D0C0] text-sm" type="button">+</button>
                    </div>
                  </div>
                ))}
              </div>
              {(s.extraBoxes.sm + s.extraBoxes.md + s.extraBoxes.lg >= 3) && (
                <p className="mt-2 text-xs text-[#6B7A6E] italic">Large orders may need a vehicle. We confirm the delivery arrangement with you before checkout.</p>
              )}
            </div>
            {/* Message card */}
            <div>
              <Label htmlFor="note">Message card (optional, printed and placed in the box)</Label>
              <Textarea id="note" value={s.messageCard} onChange={(e) => update({ messageCard: e.target.value })} placeholder="Happy birthday, with love." className="mt-1" rows={2} maxLength={200} />
            </div>
            {/* Delivery */}
            <DeliveryAreaSelect s={s} update={update} errors={errors} />
            <div>
              <Label htmlFor="addr">Delivery address</Label>
              <Input id="addr" value={s.deliveryAddress} onChange={(e) => update({ deliveryAddress: e.target.value })} placeholder="House number, street, landmark" className="mt-1" />
              {errors.deliveryAddress && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.deliveryAddress}</p>}
            </div>
            {/* Delivery date */}
            <div>
              <Label>Delivery date (earliest is 3 days from today, so we can source, style and pack)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {dates.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => update({ deliveryDate: d.key })}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      s.deliveryDate === d.key ? 'border-[#1B1917] bg-[#1B1917] text-white' : d.disabled ? 'border-[#D9D0C0] text-[#D9D0C0] cursor-not-allowed' : 'border-[#D9D0C0] text-[#6B7A6E] hover:border-[#A8823D]'
                    }`}
                    disabled={d.disabled}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {errors.deliveryDate && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.deliveryDate}</p>}
            </div>
            {/* Surprise note */}
            <div className="rounded-md border-l-4 border-[#A8823D] bg-[#F7F3EA] p-3">
              <p className="text-xs text-[#6B7A6E]">
                <b>Surprise handling:</b> the rider calls <b>you</b>, not him, before delivery. No prices are on the invoice or in the box.
              </p>
            </div>
          </div>
        )}

        {/* Step 5 (or 4 for card): Review and pay */}
        {showStep === stepCount && showStep > 1 && (
          <div className="space-y-4">
            <h3 className="font-display text-xl text-[#1B1917]">Review and pay</h3>
            <p className="text-sm text-[#6B7A6E]">
              {isCard
                ? 'Paid in full now. He is notified straight after payment.'
                : 'Paid in full now. A stylist then sources the outfit and sends you a photo preview to approve before it is packed.'}
            </p>
            <div className="rounded-lg border border-[#D9D0C0]">
              <div className="border-b border-[#D9D0C0] px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7A6E]">{isCard ? 'Gift card value' : 'Styling fee (includes packing and first box)'}</span>
                  <span className="font-mono font-medium">{fmtNGN(totals.fee)}</span>
                </div>
              </div>
              {!isCard && totals.box > 0 && (
                <div className="border-b border-[#D9D0C0] px-4 py-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7A6E]">Box upgrades and extra boxes</span>
                    <span className="font-mono font-medium">{fmtNGN(totals.box)}</span>
                  </div>
                </div>
              )}
              {!isCard && (
                <div className="border-b border-[#D9D0C0] px-4 py-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7A6E]">Gift items (your budget)</span>
                    <span className="font-mono font-medium">{fmtNGN(totals.items)}</span>
                  </div>
                </div>
              )}
              <div className="border-b border-[#D9D0C0] px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7A6E]">Delivery {s.deliveryArea ? `(${s.deliveryArea.split(',')[0]})` : ''}</span>
                  <span className="font-mono font-medium">
                    {totals.quote ? 'Quoted after you confirm' : fmtNGN(totals.del)}
                  </span>
                </div>
              </div>
              <div className="bg-[#F7F3EA] px-4 py-3">
                <div className="flex justify-between text-sm font-bold">
                  <span>Total today</span>
                  <span className="font-mono">{fmtNGN(totals.total)}{totals.quote ? ' + delivery' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex items-center justify-between">
        {showStep > 1 ? (
          <Button variant="outline" onClick={back} type="button">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        ) : (
          <span />
        )}
        <Button
          onClick={next}
          disabled={paying || !s.path}
          className="bg-[#1B1917] text-white hover:bg-[#2A2725]"
        >
          {paying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing…
            </>
          ) : showStep === stepCount ? (
            <>Pay {fmtNGN(totals.total)}{totals.quote ? ' + delivery' : ''} now</>
          ) : (
            <>
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function DeliveryAreaSelect({
  s,
  update,
  errors,
}: {
  s: WizardState
  update: (patch: Partial<WizardState>) => void
  errors: Record<string, string>
}) {
  return (
    <div>
      <Label htmlFor="area">Delivery area (where the recipient is)</Label>
      <select
        id="area"
        value={s.deliveryArea}
        onChange={(e) => update({ deliveryArea: e.target.value })}
        className="mt-1 w-full rounded-md border border-[#D9D0C0] px-3 py-2 text-sm"
      >
        <option value="">Select area</option>
        {DELIVERY_ZONES.map((z) => (
          <option key={z.name}>{z.name}</option>
        ))}
        <option>Outside Lagos</option>
      </select>
      {errors.deliveryArea && <p className="mt-1 text-xs text-[#8C3B2E]">{errors.deliveryArea}</p>}
      {s.deliveryArea && (
        <p className="mt-2 rounded-md border-l-4 border-[#A8823D] bg-[#F7F3EA] p-2 text-xs text-[#6B7A6E]">
          {s.deliveryArea === 'Outside Lagos' ? (
            <><b>Outside Lagos:</b> we quote the delivery fee after you confirm. Arrival is in 3 to 7 working days.</>
          ) : (
            <>Delivery to this area: <b>{fmtNGN(getDeliveryFee(s.deliveryArea) ?? 0)}</b>, added to your total. Lagos arrives within 1 to 24 hours of dispatch.</>
          )}
        </p>
      )}
    </div>
  )
}

function ConfirmationScreen({ s, totals }: { s: WizardState; totals: ReturnType<typeof calculateTotals> }) {
  const ref = s.path === 'card' ? 'WC-GC-2001' : 'WC-GF-1001'
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3E4630]">
        <Check className="h-8 w-8 text-white" />
      </div>
      <h1 className="mt-6 font-display text-2xl text-[#1B1917]">Gift order received</h1>
      <p className="mt-3 text-sm text-[#6B7A6E]">
        Your reference is <b className="font-mono">{ref}</b>.
        {s.path === 'card'
          ? ' We have notified the recipient by email, SMS and WhatsApp.'
          : ' A stylist will source the outfit and send you a photo preview to approve before it is packed.'}
      </p>
      <div className="mt-6 rounded-lg border border-[#D9D0C0] bg-[#F7F3EA] p-4 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B7A6E]">Total paid</span>
          <span className="font-mono font-bold">{fmtNGN(totals.total)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-[#6B7A6E]">Recipient</span>
          <span>{s.recipientName}</span>
        </div>
      </div>
      <a href="/" className="mt-6 inline-block text-sm text-[#A8823D] hover:underline">
        Back to home →
      </a>
    </div>
  )
}
