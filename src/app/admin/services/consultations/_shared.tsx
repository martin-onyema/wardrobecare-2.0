/**
 * Shared helpers for the admin consultations tabs.
 *
 * Status labels + tone are used by every tab so the colour language
 * stays consistent. The tab nav array drives the sub-nav at the top
 * of /admin/services/consultations.
 */

import Link from 'next/link'

// Status label + tone. Tone is the Tailwind class for the pill background.
export const BOOKING_STATUS: Record<
  string,
  { label: string; tone: string; dot: string }
> = {
  HELD:                { label: 'Held — awaiting payment', tone: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  EXPIRED:             { label: 'Hold expired',              tone: 'bg-gray-100 text-gray-500',     dot: 'bg-gray-400' },
  PAID:                { label: 'Paid — to confirm',       tone: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-600' },
  NEEDS_NEW_DATE:      { label: 'Needs new date',         tone: 'bg-red-100 text-red-800',       dot: 'bg-red-600' },
  CONFIRMED:           { label: 'Confirmed',               tone: 'bg-green-100 text-green-800',   dot: 'bg-green-600' },
  IN_SESSION:          { label: 'In session',             tone: 'bg-indigo-100 text-indigo-800', dot: 'bg-indigo-600' },
  COMPLETED:           { label: 'Summary to send',        tone: 'bg-stone-200 text-stone-700',   dot: 'bg-stone-500' },
  SUMMARY_SENT:        { label: 'Completed',               tone: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-600' },
  NO_SHOW:             { label: 'No show',                tone: 'bg-orange-100 text-orange-800', dot: 'bg-orange-600' },
  CANCELLED:           { label: 'Cancelled',               tone: 'bg-gray-100 text-gray-500',    dot: 'bg-gray-400' },
}

export function statusPill(status: string) {
  const s = BOOKING_STATUS[status] ?? { label: status, tone: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-medium ${s.tone}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

// Tab navigation — used by every tab page so the sub-nav stays in sync.
export const TABS = [
  { key: 'requests',  label: 'Requests',            href: '/admin/services/consultations/requests',  perm: 'service.enquiry.view' },
  { key: 'calendar',  label: 'Calendar & availability', href: '/admin/services/consultations/calendar', perm: 'service.enquiry.view' },
  { key: 'session',   label: 'Session workspace',   href: '/admin/services/consultations/session',   perm: 'service.enquiry.view' },
  { key: 'after',     label: 'After the session',   href: '/admin/services/consultations/after',     perm: 'service.enquiry.view' },
  { key: 'fees',      label: 'Fees & discounts',    href: '/admin/services/consultations/fees',     perm: 'service.enquiry.manage' },
  { key: 'roles',     label: 'Roles & access',      href: '/admin/services/consultations/roles',    perm: 'service.enquiry.manage' },
] as const

export function ConsultationTabNav({ active }: { active: string }) {
  return (
    <div className="flex border-b border-border overflow-x-auto bg-card">
      {TABS.map((tab) => {
        const isActive = tab.key === active
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`px-5 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
              isActive
                ? 'border-rust text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}

// Formatting helpers used across tabs.

export function fmtNGN(n: number): string {
  return '₦' + (n ?? 0).toLocaleString('en-US')
}

export function fmtDateLabel(dateIso: string): string {
  if (!dateIso) return '—'
  const [y, m, d] = dateIso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function fmtDateShort(dateIso: string): string {
  if (!dateIso) return '—'
  const [y, m, d] = dateIso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

// Convert a Date object (slotDate stored as UTC midnight) to a YYYY-MM-DD
// string for the client to compare against chip keys.
export function dateToISO(d: Date): string {
  return d.toISOString().slice(0, 10)
}

// Slot times used across the tabs.
export const SLOT_TIMES = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] as const

// Compute the next 7 day-chips starting today, skipping Sundays
// (sessions run Mon–Sat). Used by the calendar tab.
export function nextWeekChips(from: Date = new Date(), count = 14): Array<{
  key: string
  weekday: string
  day: number
  month: string
  isSunday: boolean
  fullLabel: string
}> {
  const chips: Array<{
    key: string
    weekday: string
    day: number
    month: string
    isSunday: boolean
    fullLabel: string
  }> = []
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  let added = 0
  let guard = 0
  while (added < count && guard < 30) {
    guard++
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const key = `${yyyy}-${mm}-${dd}`
    chips.push({
      key,
      weekday: d.toLocaleString('en', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }),
      isSunday: d.getDay() === 0,
      fullLabel: d.toLocaleString('en', { weekday: 'long', day: 'numeric', month: 'long' }),
    })
    d.setDate(d.getDate() + 1)
    added++
  }
  return chips
}

// Build a week starting on the Monday of the week containing `from`.
// Returns 6 entries: Mon–Sat (skips Sunday).
export function weekChips(from: Date = new Date()): Array<{
  key: string
  weekday: string
  day: number
  month: string
  fullLabel: string
}> {
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  // back up to Monday
  while (d.getDay() !== 1) d.setDate(d.getDate() - 1)
  const chips: Array<{
    key: string
    weekday: string
    day: number
    month: string
    fullLabel: string
  }> = []
  for (let i = 0; i < 6; i++) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    chips.push({
      key: `${yyyy}-${mm}-${dd}`,
      weekday: d.toLocaleString('en', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }),
      fullLabel: d.toLocaleString('en', { weekday: 'long', day: 'numeric', month: 'long' }),
    })
    d.setDate(d.getDate() + 1)
  }
  return chips
}
