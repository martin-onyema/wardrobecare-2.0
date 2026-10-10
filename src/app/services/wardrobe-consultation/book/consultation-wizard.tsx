'use client'

import { useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Loader2, Plus, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { submitServiceEnquiry } from '@/actions/store'

// ─── Saved profiles (mirror of account/profiles pattern) ────────────────────
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

// ─── Wizard ──────────────────────────────────────────────────────────────────

type ContactMethod = 'Call' | 'WhatsApp' | 'Email'
type SessionMode = 'In-person' | 'Video call'

type FormData = {
  // Step 1 — Who Is This For
  forProfileId: string | null  // existing profile ID, 'new', or null
  newProfileName: string
  newProfileRelation: string
  // Step 2 — Your Details (the person booking, not necessarily the person receiving)
  bookerName: string
  bookerPhone: string
  contactMethod: ContactMethod
  // Step 3 — Your Style Goals (about the recipient)
  promptWhy: string
  occasions: string
  frustration: string
  // Step 4 — Session Preference
  sessionMode: SessionMode
  preferredDateTime: string
  location: string
}

const EMPTY: FormData = {
  forProfileId: null,
  newProfileName: '',
  newProfileRelation: '',
  bookerName: '',
  bookerPhone: '',
  contactMethod: 'WhatsApp',
  promptWhy: '',
  occasions: '',
  frustration: '',
  sessionMode: 'In-person',
  preferredDateTime: '',
  location: '',
}

const STEPS = [
  { num: '01', label: 'Who Is This For' },
  { num: '02', label: 'Your Details' },
  { num: '03', label: 'Your Style Goals' },
  { num: '04', label: 'Session Preference' },
  { num: '05', label: 'Confirm & Book' },
]

const SESSION_PRICE = 45000  // ₦45,000 — first two hours, paid in full at booking
const HOURLY_RATE_AFTER = 10000  // ₦10,000/hr after the first 2 hours, billed at session

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

export function ConsultationWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const savedProfiles = useSavedProfiles()

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }))

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (data.forProfileId === 'new') {
        if (data.newProfileName.trim().length < 2) e.newProfileName = 'Please enter a name'
        if (data.newProfileRelation.trim().length < 2) e.newProfileRelation = 'Please enter a relation'
      } else if (!data.forProfileId) {
        e.forProfileId = 'Please select a profile or create a new one'
      }
    }
    if (s === 1) {
      if (data.bookerName.trim().length < 2) e.bookerName = 'Please enter your name'
      if (data.bookerPhone.trim().length < 7) e.bookerPhone = 'Please enter a valid phone number'
    }
    if (s === 2) {
      if (data.promptWhy.trim().length < 3) e.promptWhy = 'Tell us a bit about what prompted this'
      if (data.occasions.trim().length < 3) e.occasions = 'Please list the occasions'
    }
    if (s === 3) {
      if (data.preferredDateTime.trim().length < 3) e.preferredDateTime = 'Please suggest a date/time'
      if (data.sessionMode === 'In-person' && data.location.trim().length < 3) {
        e.location = 'Please enter the location for an in-person session'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, 4))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Determine the display name for the recipient (used in step 5 + message)
  const recipientName = (() => {
    if (data.forProfileId === 'new') return data.newProfileName.trim() || 'New profile'
    const p = savedProfiles.find((p) => p.id === data.forProfileId)
    return p ? `${p.name} (${p.relation})` : 'Selected profile'
  })()

  const recipientRelation = (() => {
    if (data.forProfileId === 'new') return data.newProfileRelation.trim() || '—'
    return savedProfiles.find((p) => p.id === data.forProfileId)?.relation ?? '—'
  })()

  // Save a new profile to localStorage on submit (if user chose "Someone New")
  const maybeSaveNewProfile = () => {
    if (data.forProfileId !== 'new') return
    if (data.newProfileName.trim().length < 2) return
    const newProfile: ManagedProfile = {
      id: `prof_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: data.newProfileName.trim(),
      relation: data.newProfileRelation.trim() || '—',
    }
    persistProfiles([...savedProfiles, newProfile])
  }

  const composedMessage = () => {
    const lines = [
      `BOOKING TYPE: Wardrobe & Style Consultation (paid in full at booking)`,
      `FOR: ${recipientName} (${recipientRelation})`,
      `PROMPT: ${data.promptWhy.trim()}`,
      `OCCASIONS: ${data.occasions.trim()}`,
      data.frustration.trim() ? `FRUSTRATION: ${data.frustration.trim()}` : '',
      `SESSION MODE: ${data.sessionMode}`,
      `PREFERRED DATE/TIME: ${data.preferredDateTime.trim()}`,
      data.sessionMode === 'In-person' && data.location.trim()
        ? `LOCATION: ${data.location.trim()}`
        : '',
      `CONTACT METHOD: ${data.contactMethod}`,
      '',
      `PRICE: ₦${SESSION_PRICE.toLocaleString()} — first two hours, paid in full at booking.`,
      `Additional hours billed at +₦${HOURLY_RATE_AFTER.toLocaleString()}/hr at the session itself.`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const submit = async () => {
    // Validate all steps
    if (!validateStep(0) || !validateStep(1) || !validateStep(2) || !validateStep(3)) {
      // Jump to the first invalid step
      for (let i = 0; i < 4; i++) {
        if (!validateStep(i)) {
          setStep(i)
          return
        }
      }
      return
    }
    setSubmitting(true)
    try {
      // Save the new profile if user created one
      maybeSaveNewProfile()

      const fd = new FormData()
      fd.set('name', data.bookerName.trim())
      fd.set('email', 'consultation-booking@wardrobecare.local') // No email collected in step 2 per mockup
      fd.set('phone', data.bookerPhone.trim())
      fd.set('serviceSlug', 'wardrobe-consultation')
      fd.set('serviceName', 'Wardrobe & Style Consultation')
      fd.set('occasion', data.promptWhy.trim().slice(0, 240))
      if (data.preferredDateTime) fd.set('preferredDate', data.preferredDateTime)
      fd.set('preferredTime', data.sessionMode)
      if (data.sessionMode === 'In-person' && data.location.trim()) {
        fd.set('location', data.location.trim())
      }
      fd.set('message', composedMessage())

      const result = await submitServiceEnquiry(fd)
      if (!result.ok) {
        toast.error(result.error || 'Could not submit booking. Please try again.', { duration: 8000 })
        setSubmitting(false)
        return
      }

      const params = new URLSearchParams({
        ref: result.enquiryNumber ?? '',
        for: recipientName,
        mode: data.sessionMode,
        amount: String(SESSION_PRICE),
      })
      router.push(`/services/wardrobe-consultation/confirmed?${params.toString()}`)
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not submit booking. Please try again.', { duration: 8000 })
      setSubmitting(false)
    }
  }

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
              Who is this for?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Pick a saved profile, or start fresh with someone new.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {/* Saved profiles */}
              {savedProfiles.map((p) => {
                const isSelected = data.forProfileId === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => set({ forProfileId: p.id })}
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
                onClick={() => set({ forProfileId: 'new' })}
                className={`text-left p-4 border-1.5 transition-colors ${
                  data.forProfileId === 'new'
                    ? 'border-rust bg-rust/5'
                    : 'border-border hover:border-foreground'
                }`}
                style={{ borderWidth: '1.5px' }}
              >
                <div className="flex items-start gap-2 mb-1">
                  <Plus className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Someone New</p>
                    <p className="text-xs text-muted-foreground">Create a profile</p>
                  </div>
                  {data.forProfileId === 'new' && <Check className="h-4 w-4 text-rust" />}
                </div>
              </button>

              {savedProfiles.length === 0 && (
                <p className="text-xs text-muted-foreground col-span-full mt-2">
                  No saved profiles yet — profiles you create will appear here next time,
                  stored on this device.
                </p>
              )}
            </div>

            {/* New profile form (only when "Someone New" selected) */}
            {data.forProfileId === 'new' && (
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  New profile details
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" required error={errors.newProfileName}>
                    <input
                      className={inputCls}
                      value={data.newProfileName}
                      onChange={(e) => set({ newProfileName: e.target.value })}
                      placeholder="e.g. Adewale"
                    />
                  </Field>
                  <Field label="Relation" required error={errors.newProfileRelation}>
                    <input
                      className={inputCls}
                      value={data.newProfileRelation}
                      onChange={(e) => set({ newProfileRelation: e.target.value })}
                      placeholder="e.g. Husband, Brother, Self"
                    />
                  </Field>
                </div>
              </div>
            )}

            {errors.forProfileId && (
              <p className="text-xs text-red-700 mt-4">{errors.forProfileId}</p>
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
              The person booking the session. We&apos;ll use this to confirm with you.
            </p>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full name" required error={errors.bookerName}>
                  <input
                    className={inputCls}
                    value={data.bookerName}
                    onChange={(e) => set({ bookerName: e.target.value })}
                    placeholder="Your name — the person booking"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Phone number" required error={errors.bookerPhone}>
                  <input
                    className={inputCls}
                    value={data.bookerPhone}
                    onChange={(e) => set({ bookerPhone: e.target.value })}
                    placeholder="+234..."
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Field>
              </div>
              <Field label="Preferred contact method">
                <select
                  className={`${inputCls} h-12`}
                  value={data.contactMethod}
                  onChange={(e) => set({ contactMethod: e.target.value as ContactMethod })}
                >
                  <option>Call</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>
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
              These questions are about{' '}
              <span className="text-foreground font-medium">
                {data.forProfileId === 'new' ? (data.newProfileName.trim() || 'the new profile') : recipientName.split(' (')[0]}
              </span>
              &apos;s wardrobe, since that&apos;s who this session is for.
            </p>

            <div className="space-y-6">
              <Field label="What's prompting this? (new job, life change, general refresh)" required error={errors.promptWhy}>
                <input
                  className={inputCls}
                  value={data.promptWhy}
                  onChange={(e) => set({ promptWhy: e.target.value })}
                  placeholder="e.g. Starting a new role next month"
                />
              </Field>
              <Field label="Occasions dressed for most (work, events, everyday)" required error={errors.occasions}>
                <input
                  className={inputCls}
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
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Session preference
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Choose how and when you&apos;d like the session to happen.
            </p>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="In-person or video call">
                  <select
                    className={`${inputCls} h-12`}
                    value={data.sessionMode}
                    onChange={(e) => set({ sessionMode: e.target.value as SessionMode })}
                  >
                    <option>In-person</option>
                    <option>Video call</option>
                  </select>
                </Field>
                <Field label="Preferred date & time" required error={errors.preferredDateTime}>
                  <input
                    className={inputCls}
                    value={data.preferredDateTime}
                    onChange={(e) => set({ preferredDateTime: e.target.value })}
                    placeholder="e.g. Sat 27th, morning"
                  />
                </Field>
              </div>
              {data.sessionMode === 'In-person' && (
                <Field label="Location (if in-person)" required error={errors.location}>
                  <input
                    className={inputCls}
                    value={data.location}
                    onChange={(e) => set({ location: e.target.value })}
                    placeholder="Address or area in Lagos"
                  />
                </Field>
              )}

              {/* Presence note */}
              <div
                className="bg-secondary/40 border-l-4 border-olive px-5 py-4 text-sm text-foreground leading-relaxed"
                style={{ borderLeftWidth: '3px' }}
              >
                <strong className="text-rust">
                  {data.forProfileId === 'new' ? (data.newProfileName.trim() || 'They') : recipientName.split(' (')[0]}{' '}
                  needs to be there.
                </strong>{' '}
                Whether in-person or by video, the session assesses their actual body and
                wardrobe — it can&apos;t be done through you alone.
              </div>
            </div>
          </section>
        )}

        {/* STEP 5 — Confirm & Book */}
        {step === 4 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2">
              Confirm &amp; book
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Review the details. Submitting sends the booking to our stylists — we&apos;ll
              confirm the time and send a payment link within 24 hours.
            </p>

            <dl className="border-t border-border">
              {[
                ['Service', 'Wardrobe & Style Consultation'],
                ['For', recipientName],
                ['Session', 'First two hours'],
                ['Mode', data.sessionMode],
                ['Preferred date/time', data.preferredDateTime || '—'],
                ['Location', data.sessionMode === 'In-person' ? (data.location || '—') : 'Video call'],
                ['Booker', data.bookerName || '—'],
                ['Contact', `${data.bookerPhone || '—'} · ${data.contactMethod}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 border-b border-border/60"
                >
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5">
                    {label}
                  </dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
              <div className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-5 border-b-2 border-foreground bg-secondary/30">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-foreground pt-0.5 font-semibold">
                  Total due
                </dt>
                <dd className="font-mono text-2xl text-rust font-bold tabular-nums">
                  ₦{SESSION_PRICE.toLocaleString()}
                </dd>
              </div>
            </dl>

            {/* Pay-in-full note */}
            <div
              className="mt-6 bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm text-foreground leading-relaxed"
              style={{ borderLeftWidth: '3px' }}
            >
              <strong className="text-rust">Paid in full at booking</strong> — the first two
              hours are a flat ₦45,000, no deposit or balance due afterward. Additional hours
              beyond that, if needed, are billed at +₦10,000/hr at the session itself.
            </div>

            <p className="text-xs text-muted-foreground mt-6 flex items-start gap-2">
              <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" strokeWidth={2} />
              Submitting this form sends a booking request. We&apos;ll confirm the time and send
              a secure payment link via {data.contactMethod.toLowerCase()} within 24 hours.
              No payment is taken here.
            </p>
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
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Confirm &amp; Book · ₦{SESSION_PRICE.toLocaleString()}
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
