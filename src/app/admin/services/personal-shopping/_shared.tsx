/**
 * Shared helpers for the admin Personal Shopping tabs.
 */

import Link from 'next/link'

export const PS_STATUS: Record<string, { label: string; tone: string; dot: string }> = {
  NEW:         { label: 'Paid, to accept', tone: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-600' },
  SOURCING:    { label: 'Sourcing',       tone: 'bg-purple-100 text-purple-800', dot: 'bg-purple-600' },
  SENT:        { label: 'With customer',   tone: 'bg-blue-100 text-blue-800',   dot: 'bg-blue-600' },
  APPROVED:    { label: 'Approved',       tone: 'bg-green-100 text-green-800', dot: 'bg-green-600' },
  PAID:        { label: 'Ready to dispatch', tone: 'bg-teal-100 text-teal-800', dot: 'bg-teal-600' },
  FULFILLING:  { label: 'In progress',    tone: 'bg-orange-100 text-orange-800', dot: 'bg-orange-600' },
  DONE:        { label: 'Complete',      tone: 'bg-stone-200 text-stone-700', dot: 'bg-stone-500' },
  CANCELLED:   { label: 'Cancelled',      tone: 'bg-red-100 text-red-800',     dot: 'bg-red-600' },
}

export function psStatusPill(status: string, tier?: string) {
  const s = PS_STATUS[status] ?? { label: status, tone: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' }
  let label = s.label
  if (status === 'FULFILLING' && tier === 'DELIVERED') label = 'Out for delivery'
  if (status === 'FULFILLING' && tier === 'IN_PERSON_FITTING') label = 'At fitting'
  if (status === 'PAID') label = 'Ready to dispatch'
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-medium ${s.tone}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  )
}

export const PS_TABS = [
  { key: 'requests',   label: 'Requests',       href: '/admin/services/personal-shopping/requests',   perm: 'service.enquiry.view' },
  { key: 'shortlist',  label: 'Shortlist',      href: '/admin/services/personal-shopping/shortlist',  perm: 'service.enquiry.view' },
  { key: 'fulfilment', label: 'Fulfilment',     href: '/admin/services/personal-shopping/fulfilment', perm: 'service.enquiry.view' },
  { key: 'fees',       label: 'Fees & discounts', href: '/admin/services/personal-shopping/fees',     perm: 'service.enquiry.manage' },
  { key: 'roles',      label: 'Roles & access', href: '/admin/services/personal-shopping/roles',     perm: 'service.enquiry.manage' },
] as const

export function PSTabNav({ active }: { active: string }) {
  return (
    <div className="flex border-b border-border overflow-x-auto bg-card">
      {PS_TABS.map((tab) => {
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

export const PS_ITEM_CATEGORIES = ['Shirts / Tops', 'Trousers', 'Suiting', 'Footwear', 'Accessories', 'Fragrance & Grooming', 'Traditional Wear'] as const
export const PS_ITEM_SOURCES = ['In stock', 'Sourced from supplier'] as const
export const PS_DECISIONS = [
  { value: 'PENDING', label: 'Waiting', tone: 'bg-gray-100 text-gray-500' },
  { value: 'KEEP', label: 'Keep', tone: 'bg-green-100 text-green-800' },
  { value: 'SKIP', label: 'Skip', tone: 'bg-stone-200 text-stone-700' },
  { value: 'WANTS_DIFFERENT', label: 'Wants different', tone: 'bg-yellow-100 text-yellow-800' },
] as const
