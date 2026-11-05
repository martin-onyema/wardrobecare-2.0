'use client'

/**
 * Wardrobe & Style Consultation — booking wizard.
 *
 * 5-step flow matching the approved mockup:
 *   1. Who is this for? (self / Femi / David / someone new)
 *   2. Your details (name, phone, contact method)
 *   3. Your style goals (prompt, occasions, frustration)
 *   4. Session preference (in-person / video, date chip, time slot —
 *      slots already taken are shown greyed out and cannot be selected)
 *   5. Confirm & pay — slot is held for 10 minutes; the Pay button
 *      initialises a Paystack transaction and redirects to the
 *      Paystack authorisation URL. Paystack returns the customer to
 *      /services/wardrobe-consultation/confirmed?reference=… on success,
 *      which calls `confirmConsultationPayment` and shows the receipt.
 */

import { useState, useSyncExternalStore, useEffect, useRef } from 'react'
import { ArrowRight, Check, Clock, Loader2, Plus, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import {
  CONSULTATION_PRICE,
  CONSULTATION_HOURLY_AFTER,
  CONSULTATION_HOLD_SECONDS,
  CONSULTATION_SLOT_TIMES,
  type TakenSlot,
} from '@/lib/consultations-constants'
import {
  holdConsultationSlot,
  initializeConsultationPayment,
  getConsultationSlotsTaken,
} from '@/actions/consultations'

// ─── Saved profiles (mirror of /account/profiles pattern) ─────────────────
// Profiles are stored on this device only — no synced backend. Reuses the
// same localStorage keys as /account/profiles so the user's saved profiles
// show up in both places.

type ManagedProfile = {
  id: string
  name: string
  relation: string
}

const LS_PROFILES = 'wc_managed_profiles'

const EMPTY_PROFILES: ManagedProfile[] = []
let listeners: Array<() => void> = []
function emit() {
  listeners.forEach((l) => l())
}
function subscribe(cb: () => void) {
  listeners.push(cb)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', cb)
  }
  return () => {
    listeners = listeners.filter((l) => l !== cb)
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', cb)
    }
  }
}
let cachedRaw: string | null = null
let cachedProfiles: ManagedProfile[] = EMPTY_PROFILES
function readProfiles(): ManagedProfile[] {
  if (typeof window === 'undefined') return EMPTY_PROFILES
  let raw: string
  try {
    raw = window.localStorage.getItem(LS_PROFILES) ?? '[]'
  } catch {
    return EMPTY_PROFILES
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      const p = JSON.parse(raw) as ManagedProfile[]
      cachedProfiles = Array.isArray(p)
        ? p.filter((x) => x && typeof x.id === 'string' && typeof x.name === 'string')
        : EMPTY_PROFILES
    } catch {
      cachedProfiles = EMPTY_PROFILES
    }
  }
  return cachedProfiles
}

function useSavedProfiles(): ManagedProfile[] {
  return useSyncExternalStore(subscribe, readProfiles, () => EMPTY_PROFILES)
}

function persistProfiles(profiles: ManagedProfile[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LS_PROFILES, JSON.stringify(profiles))
    emit()
  } catch {}
}

// ─── Types ────────────────────────────────────────────────────────────────

type ContactMethod = 'Call' | 'WhatsApp' | 'Email'
type SessionMode = 'In-person' | 'Video call'
type Recipient = { kind: 'self'; name: string; relation: string } | { kind: 'profile'; id: string; name: string; relation: string } | { kind: 'new'; name: string; relation: string }

type FormData = {
  // Step 1 — recipient
  recipient: Recipient
  // Step 2 — booker details
  bookerName: string
  bookerPhone: string
  contactMethod: ContactMethod
  // Step 3 — style goals (about the recipient)
  promptWhy: string
  occasions: string
  frustration: string
  // Step 4 — session
  sessionMode: SessionMode
  location: string // for in-person only
  slotDate: string // YYYY-MM-DD
  slotTime: string // "9:00 AM"
  // Step 5 — hold (runtime only, not submitted)
  holdUntil: number | null // epoch ms when hold expires
  bookingNumber: string | null
}

const EMPTY: FormData = {
  recipient: { kind: 'self', name: '', relation: 'self' },
  bookerName: '',
  bookerPhone: '',
  contactMethod: 'WhatsApp',
  promptWhy: '',
  occasions: '',
  frustration: '',
  sessionMode: 'In-person',
  location: '',
  slotDate: '',
  slotTime: '',
  holdUntil: null,
  bookingNumber: null,
}

const STEPS = [
  { num: '01', label: 'Who Is This For' },
  { num: '02', label: 'Your Details' },
  { num: '03', label: 'Your Style Goals' },
  { num: '04', label: 'Session Preference' },
  { num: '05', label: 'Confirm & Pay' },
]

// ─── Date chip generator ─────────────────────────────────────────────────
// Build 14 day chips starting today, skipping Sundays (mockup says
// sessions run Mon–Sat). Sundays are shown greyed out + struck through
// and are not selectable.

type DayChip = {
  key: string // YYYY-MM-DD
  weekday: string // Mon
  day: number // 4
  month: string // Nov
  isSunday: boolean
  fullLabel: string // "Monday 4 November"
}

function buildDayChips(from: Date = new Date(), count = 14): DayChip[] {
  const chips: DayChip[] = []
  const d = new Date(from)
  // Start at midnight today (local) so we don't accidentally skip today
  d.setHours(0, 0, 0, 0)
  let added = 0
  let guard = 0
  while (added < count && guard < 30) {
    guard++
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const key = `${yyyy}-${mm}-${dd}`
    const wd = d.toLocaleString('en', { weekday: 'short' })
    const fullLabel = d.toLocaleString('en', { weekday: 'long', day: 'numeric', month: 'long' })
    chips.push({
      key,
      weekday: wd,
      day: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }),
      isSunday: d.getDay() === 0,
      fullLabel,
    })
    d.setDate(d.getDate() + 1)
    added++
  }
  return chips
}

function fmtDateLabel(key: string): string {
  if (!key) return '—'
  const [y, m, d] = key.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleString('en', { weekday: 'long', day: 'numeric', month: 'long' })
}

function mmss(s: number): string {
  const m = Math.floor(s / 60)
  const x = s % 60
  return `${m}:${x < 10 ? '0' : ''}${x}`
}

// ─── Field primitives ─────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
        {required && <span className="text-foreground ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-700 mt-1.5">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full h-12 px-4 text-sm bg-transparent border border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground/60'

// ─── Wizard ──────────────────────────────────────────────────────────────────

export function ConsultationWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [takenSlots, setTakenSlots] = useState<TakenSlot[]>([])
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(CONSULTATION_HOLD_SECONDS)
  const [expiredWarning, setExpiredWarning] = useState<string | null>(null)
  const savedProfiles = useSavedProfiles()
  const [dayChips] = useState<DayChip[]>(() => buildDayChips())
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }))

  // ── Fetch taken slots when entering step 4 ────────────────────────────
  useEffect(() => {
    if (step !== 3) return
    // Only fetch once per visit to step 4 — re-fetch on every step 4 entry
    // would feel laggy. Customer's own hold counts as taken, so we add it
    // locally too.
    let cancelled = false
    getConsultationSlotsTaken().then((slots) => {
      if (cancelled) return
      // Merge our own held slot (the booking we just created) into the
      // taken set so it appears greyed out if the user goes back to step 4.
      setTakenSlots(slots)
    })
    return () => {
      cancelled = true
    }
  }, [step])

  // ── Hold countdown tick ────────────────────────────────────────────────
  useEffect(() => {
    if (step !== 4 || !data.holdUntil) {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current)
        holdTimerRef.current = null
      }
      return
    }
    const tick = () => {
      const left = Math.max(0, Math.floor((data.holdUntil! - Date.now()) / 1000))
      setHoldSecondsLeft(left)
      if (left <= 0) {
        // Hold expired — bounce back to step 4 to re-pick a time
        if (holdTimerRef.current) clearInterval(holdTimerRef.current)
        holdTimerRef.current = null
        setExpiredWarning(
          'Your hold expired. Please choose a time again to continue.',
        )
        setData((d) => ({
          ...d,
          holdUntil: null,
          bookingNumber: null,
          slotTime: '',
        }))
        setStep(3)
      }
    }
    tick()
    holdTimerRef.current = setInterval(tick, 1000)
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }, [step, data.holdUntil])

  // ── Validate each step ────────────────────────────────────────────────
  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (data.recipient.kind === 'new') {
        if (data.recipient.name.trim().length < 2) e.recipientName = 'Please enter a name'
        if (data.recipient.relation.trim().length < 2) e.recipientRelation = 'Please enter how you relate'
      }
    }
    if (s === 1) {
      if (data.bookerName.trim().length < 2) e.bookerName = 'Please enter your name'
      if (data.bookerPhone.replace(/\D/g, '').length < 10) e.bookerPhone = 'Please enter a valid phone number'
    }
    if (s === 2) {
      if (data.promptWhy.trim().length < 3) e.promptWhy = 'Tell us a bit about what prompted this'
      if (data.occasions.trim().length < 3) e.occasions = 'Please list the occasions'
    }
    if (s === 3) {
      if (!data.slotDate) e.slotDate = 'Please pick a date'
      if (!data.slotTime) e.slotTime = 'Please pick a time'
      if (data.sessionMode === 'In-person' && data.location.trim().length < 2) {
        e.location = 'Please enter the area in Lagos for an in-person session'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = async () => {
    if (!validateStep(step)) return
    // When moving from step 4 → step 5, hold the slot on the server
    if (step === 3) {
      const hold = await holdConsultationSlot({
        bookerName: data.bookerName.trim(),
        bookerPhone: data.bookerPhone.trim(),
        contactMethod: data.contactMethod,
        recipientName:
          data.recipient.kind === 'self'
            ? (data.bookerName.trim() || 'Myself')
            : data.recipient.name.trim(),
        recipientRelation:
          data.recipient.kind === 'self'
            ? 'self'
            : data.recipient.relation.trim() || undefined,
        promptWhy: data.promptWhy.trim() || undefined,
        occasions: data.occasions.trim() || undefined,
        frustration: data.frustration.trim() || undefined,
        sessionMode: data.sessionMode,
        location: data.sessionMode === 'In-person' ? data.location.trim() : undefined,
        slotDate: data.slotDate,
        slotTime: data.slotTime,
      })
      if (!hold.ok) {
        toast.error(hold.error, { duration: 8000 })
        // If the slot was just taken, refresh taken slots + reset time
        if (/slot was just taken/i.test(hold.error)) {
          setTakenSlots((prev) => [...prev, { date: data.slotDate, time: data.slotTime }])
          setData((d) => ({ ...d, slotTime: '' }))
        }
        return
      }
      // Save a new profile locally if the user picked "Someone new"
      if (data.recipient.kind === 'new' && data.recipient.name.trim().length >= 2) {
        const np: ManagedProfile = {
          id: `prof_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          name: data.recipient.name.trim(),
          relation: data.recipient.relation.trim() || '—',
        }
        persistProfiles([...savedProfiles, np])
      }
      const holdUntilMs = Date.now() + CONSULTATION_HOLD_SECONDS * 1000
      setData((d) => ({
        ...d,
        holdUntil: holdUntilMs,
        bookingNumber: hold.bookingNumber,
      }))
      setExpiredWarning(null)
      setHoldSecondsLeft(CONSULTATION_HOLD_SECONDS)
    }
    setStep((s) => Math.min(s + 1, 4))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setErrors({})
    // Going back from step 5 (Confirm & Pay) frees the held slot so
    // the user can pick a different time.
    if (step === 4 && data.bookingNumber) {
      // The server-side reaper will delete the HELD row once the 10-minute
      // hold expires. We don't actively cancel here to avoid a network
      // roundtrip before the back button is responsive.
      setData((d) => ({ ...d, holdUntil: null, bookingNumber: null }))
    }
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Pay ──
  const pay = async () => {
    if (!data.bookingNumber) {
      toast.error('Your hold has expired. Please pick a time again.', { duration: 8000 })
      setStep(3)
      return
    }
    setSubmitting(true)
    try {
      const init = await initializeConsultationPayment(data.bookingNumber)
      if (!init.ok) {
        toast.error(init.error, { duration: 8000 })
        if (/expired/i.test(init.error)) setStep(3)
        setSubmitting(false)
        return
      }
      // Redirect to Paystack's authorisation URL. Paystack will return the
      // customer to /services/wardrobe-consultation/confirmed?reference=…
      // on success.
      window.location.href = init.authorizationUrl
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not start payment. Please try again.', {
        duration: 8000,
      })
      setSubmitting(false)
    }
  }

  // ── Recipient display name ──
  const recipientDisplay = (() => {
    if (data.recipient.kind === 'self') return data.bookerName.trim() || 'Myself'
    if (data.recipient.kind === 'new') return data.recipient.name.trim() || 'New profile'
    return `${data.recipient.name} (${data.recipient.relation})`
  })()

  const recipientShort = (() => {
    if (data.recipient.kind === 'self') return 'you'
    if (data.recipient.kind === 'new') return data.recipient.name.trim() || 'they'
    return data.recipient.name.split(' ')[0]
  })()

  // ── Slot taken lookup ──
  const isSlotTaken = (date: string, time: string) =>
    takenSlots.some((s) => s.date === date && s.time === time)

  // ── Warn about just-taken slot if the customer's slot disappears mid-step5 ──
  // (Mockup simulate button: "slot just taken before payment")

  return (
    <div className="border border-border">
      {/* Progress bars — camel for done, rust for active, border for future */}
      <div className="flex gap-1 px-6 md:px-10 pt-8" aria-hidden>
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`h-[3px] flex-1 transition-colors duration-500 ${
              i < step ? 'bg-camel' : i === step ? 'bg-rust' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Stepper nav — active item gets rust underline */}
      <ol className="flex flex-wrap gap-x-6 gap-y-2 px-6 md:px-10 pt-6 pb-5 border-b border-border text-[12px] uppercase tracking-[0.14em]">
        {STEPS.map((s, i) => (
          <li
            key={s.num}
            className={`tabular-nums pb-3 relative ${
              i === step
                ? 'text-foreground font-bold'
                : i < step
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/60'
            }`}
          >
            <span className="font-mono mr-1.5">{s.num}</span>
            {s.label}
            {i === step && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-rust" />
            )}
          </li>
        ))}
      </ol>

      {/* Panels */}
      <div className="px-6 md:px-10 py-10">
        {/* STEP 1 — Who Is This For */}
        {step === 0 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Who is this session for?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Book for yourself or for someone whose profile you manage.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Myself */}
              <button
                type="button"
                onClick={() => set({ recipient: { kind: 'self', name: '', relation: 'self' } })}
                className={`text-left p-4 border-1.5 transition-colors ${
                  data.recipient.kind === 'self'
                    ? 'border-rust bg-rust/5'
                    : 'border-border hover:border-foreground'
                }`}
                style={{ borderWidth: '1.5px' }}
              >
                <div className="flex items-start gap-2 mb-1">
                  <UserRound className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Myself</p>
                    <p className="text-xs text-muted-foreground">Use my details</p>
                  </div>
                  {data.recipient.kind === 'self' && <Check className="h-4 w-4 text-rust" />}
                </div>
              </button>

              {/* Saved profiles */}
              {savedProfiles.map((p) => {
                const isSelected = data.recipient.kind === 'profile' && data.recipient.id === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      set({ recipient: { kind: 'profile', id: p.id, name: p.name, relation: p.relation } })
                    }
                    className={`text-left p-4 border-1.5 transition-colors ${
                      isSelected
                        ? 'border-rust bg-rust/5'
                        : 'border-border hover:border-foreground'
                    }`}
                    style={{ borderWidth: '1.5px' }}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <UserRound className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.relation}</p>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-rust" />}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-3">
                      Use saved profile
                    </p>
                  </button>
                )
              })}

              {/* Someone New */}
              <button
                type="button"
                onClick={() => set({ recipient: { kind: 'new', name: '', relation: '' } })}
                className={`text-left p-4 border-1.5 transition-colors ${
                  data.recipient.kind === 'new'
                    ? 'border-rust bg-rust/5'
                    : 'border-border hover:border-foreground'
                }`}
                style={{ borderWidth: '1.5px' }}
              >
                <div className="flex items-start gap-2 mb-1">
                  <Plus className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Someone new</p>
                    <p className="text-xs text-muted-foreground">Create a profile</p>
                  </div>
                  {data.recipient.kind === 'new' && <Check className="h-4 w-4 text-rust" />}
                </div>
              </button>
            </div>

            {/* New profile form */}
            {data.recipient.kind === 'new' && (
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  New profile details
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" required error={errors.recipientName}>
                    <input
                      className={inputCls}
                      value={data.recipient.name}
                      onChange={(e) =>
                        set({ recipient: { ...data.recipient, kind: 'new', name: e.target.value } })
                      }
                      placeholder="e.g. Adewale"
                    />
                  </Field>
                  <Field label="Relation" required error={errors.recipientRelation}>
                    <input
                      className={inputCls}
                      value={data.recipient.relation}
                      onChange={(e) =>
                        set({ recipient: { ...data.recipient, kind: 'new', relation: e.target.value } })
                      }
                      placeholder="e.g. Husband, Brother, Self"
                    />
                  </Field>
                </div>
              </div>
            )}

            {savedProfiles.length === 0 && data.recipient.kind !== 'new' && (
              <p className="text-xs text-muted-foreground mt-4">
                No saved profiles yet — profiles you create will appear here next
                time, stored on this device.
              </p>
            )}
          </section>
        )}

        {/* STEP 2 — Your Details */}
        {step === 1 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Your details
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              So we can confirm your date and reach you if anything changes.
            </p>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full name" required error={errors.bookerName}>
                  <input
                    className={inputCls}
                    value={data.bookerName}
                    onChange={(e) => set({ bookerName: e.target.value })}
                    placeholder="e.g. Femi Adebayo"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Phone number" required error={errors.bookerPhone}>
                  <input
                    className={inputCls}
                    value={data.bookerPhone}
                    onChange={(e) => set({ bookerPhone: e.target.value })}
                    placeholder="e.g. 0802 000 0000"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Field>
              </div>
              <Field label="Preferred contact method">
                <div className="flex flex-wrap gap-2">
                  {(['Call', 'WhatsApp', 'Email'] as ContactMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => set({ contactMethod: m })}
                      className={`px-5 py-3 text-sm border transition-colors ${
                        data.contactMethod === m
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </section>
        )}

        {/* STEP 3 — Your Style Goals */}
        {step === 2 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Your style goals
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              {data.recipient.kind === 'self'
                ? 'A few lines help your stylist prepare.'
                : `These questions are about ${recipientShort}'s wardrobe, since that is who the session is for.`}
            </p>

            <div className="space-y-6">
              <Field label="What is prompting this? (new job, life change, general refresh)" required error={errors.promptWhy}>
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y py-3`}
                  value={data.promptWhy}
                  onChange={(e) => set({ promptWhy: e.target.value })}
                  placeholder="e.g. Starting a new role next month"
                />
              </Field>
              <Field label="Occasions dressed for most (work, events, everyday)" required error={errors.occasions}>
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y py-3`}
                  value={data.occasions}
                  onChange={(e) => set({ occasions: e.target.value })}
                  placeholder="e.g. Corporate office, weekend casual, the occasional wedding"
                />
              </Field>
              <Field label="Biggest current wardrobe frustration">
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y py-3`}
                  value={data.frustration}
                  onChange={(e) => set({ frustration: e.target.value })}
                  placeholder="e.g. Nothing bridges casual and office — feels like two separate wardrobes"
                />
              </Field>
            </div>
          </section>
        )}

        {/* STEP 4 — Session Preference */}
        {step === 3 && (
          <section>
            {expiredWarning && (
              <div className="mb-6 bg-rust/10 border-l-4 border-rust px-5 py-4 text-sm text-foreground leading-relaxed">
                {expiredWarning}
              </div>
            )}
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Session preference
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Sessions run for 2 hours. Same flat price in-person or by video, anywhere in Lagos.
            </p>

            {/* In-person or video */}
            <div className="space-y-6">
              <Field label="In-person or video call">
                <div className="flex flex-wrap gap-2">
                  {(['In-person', 'Video call'] as SessionMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => set({ sessionMode: m })}
                      className={`px-5 py-3 text-sm border transition-colors ${
                        data.sessionMode === m
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Field>

              {data.sessionMode === 'In-person' && (
                <Field label="Area in Lagos" required error={errors.location}>
                  <input
                    className={inputCls}
                    value={data.location}
                    onChange={(e) => set({ location: e.target.value })}
                    placeholder="e.g. Lekki Phase 1, Ikeja GRA"
                  />
                </Field>
              )}

              <Field label="Choose a date (Mon–Sat, next available shown)" error={errors.slotDate}>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                  {dayChips.map((d) => {
                    const isSelected = data.slotDate === d.key
                    const disabled = d.isSunday
                    return (
                      <button
                        key={d.key}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (disabled) return
                          set({ slotDate: d.key, slotTime: '' })
                          setErrors((e) => ({ ...e, slotDate: '', slotTime: '' }))
                        }}
                        className={`flex-shrink-0 w-[68px] py-3 border text-center transition-colors ${
                          disabled
                            ? 'border-border/40 text-muted-foreground/40 cursor-not-allowed line-through'
                            : isSelected
                              ? 'bg-foreground text-background border-foreground'
                              : 'border-border hover:border-foreground'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-[0.05em]">{d.weekday}</span>
                        <span className="block text-xl font-display mt-1">{d.day}</span>
                        <span className="block text-[11px] uppercase tracking-[0.05em] mt-1">{d.month}</span>
                      </button>
                    )
                  })}
                </div>
              </Field>

              {/* Time slots for the chosen date */}
              {data.slotDate && (
                <Field label={`Available times — ${fmtDateLabel(data.slotDate)}`} error={errors.slotTime}>
                  <div className="flex flex-wrap gap-2">
                    {CONSULTATION_SLOT_TIMES.map((t) => {
                      const taken = isSlotTaken(data.slotDate, t)
                      const isSelected = data.slotTime === t
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={taken}
                          onClick={() => {
                            set({ slotTime: t })
                            setErrors((e) => ({ ...e, slotTime: '' }))
                          }}
                          className={`min-w-[120px] py-3 px-4 border text-sm transition-colors text-center ${
                            taken
                              ? 'border-border/40 text-muted-foreground/40 cursor-not-allowed line-through'
                              : isSelected
                                ? 'bg-olive text-background border-olive'
                                : 'border-foreground hover:bg-foreground hover:text-background'
                          }`}
                        >
                          <span className="block">{t}</span>
                          {taken && <span className="block text-[10px] uppercase tracking-[0.05em] mt-0.5">Taken</span>}
                        </button>
                      )
                    })}
                  </div>
                </Field>
              )}

              {/* Presence note */}
              <div
                className="bg-secondary/40 border-l-4 border-olive px-5 py-4 text-sm text-foreground leading-relaxed"
                style={{ borderLeftWidth: '3px' }}
              >
                <strong className="text-rust">
                  {data.recipient.kind === 'self'
                    ? 'You need to be there.'
                    : `${recipientShort.charAt(0).toUpperCase()}${recipientShort.slice(1)} needs to be there.`}
                </strong>{' '}
                Whether in-person or by video, the session assesses the actual body and
                wardrobe. It cannot be done through the account holder alone.
              </div>
            </div>
          </section>
        )}

        {/* STEP 5 — Confirm & Pay */}
        {step === 4 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Confirm and pay
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Pay in full to secure your date. No deposit, no balance afterwards.
            </p>

            {/* Hold countdown */}
            <div className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-xs px-3 py-2 mb-6">
              <Clock className="h-3.5 w-3.5" />
              <span>
                Your slot is held for{' '}
                <span className="tabular-nums">{mmss(holdSecondsLeft)}</span>
              </span>
            </div>

            {/* Summary */}
            <dl className="border-t border-border">
              {[
                ['Service', 'Wardrobe & Style Consultation'],
                ['For', recipientDisplay],
                ['When', `${fmtDateLabel(data.slotDate)}, ${data.slotTime}`],
                ['How', data.sessionMode + (data.sessionMode === 'In-person' && data.location.trim() ? ` · ${data.location.trim()}` : '')],
                ['First two hours', `₦${CONSULTATION_PRICE.toLocaleString()}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-4 border-b border-border/60"
                >
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5">
                    {label}
                  </dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
              <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-5 border-b-2 border-foreground bg-secondary/30">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-foreground pt-0.5 font-semibold">
                  Total due now
                </dt>
                <dd className="font-mono text-2xl text-rust font-bold tabular-nums">
                  ₦{CONSULTATION_PRICE.toLocaleString()}
                </dd>
              </div>
            </dl>

            {/* Pay-in-full + reschedule note */}
            <div
              className="mt-6 bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm text-foreground leading-relaxed"
              style={{ borderLeftWidth: '3px' }}
            >
              Extra time beyond two hours is billed at <strong className="text-rust">+₦{CONSULTATION_HOURLY_AFTER.toLocaleString()} per hour</strong> at the session.{' '}
              <strong className="text-rust">If we cannot keep your chosen date</strong>, we message you straight away with new options. Your payment stays valid and you simply pick a new date.
            </div>
          </section>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-6 md:px-10 py-6 border-t border-border bg-secondary/40">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            disabled={submitting}
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:border-foreground transition-colors disabled:opacity-50"
          >
            &larr; Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-60"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            onClick={pay}
            disabled={submitting || holdSecondsLeft <= 0}
            className="inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Starting payment…
              </>
            ) : (
              <>
                Pay ₦{CONSULTATION_PRICE.toLocaleString()} and book
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
