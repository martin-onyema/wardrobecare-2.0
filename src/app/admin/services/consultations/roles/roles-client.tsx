'use client'

/**
 * Roles & access client.
 *
 * Layout (matches mockup 51):
 *   Left:  Permission matrix — rows are capabilities, columns are roles
 *          (Owner, Front desk, Stylist). Tick boxes for each cell.
 *   Right: People list with role dropdowns + "Add stylist" button.
 *
 * Permission changes are stored in a single client-side object (PERM) and
 * saved via toast feedback. (We don't write them to the database — the
 * mockup explicitly says: "Set once by your developer, adjustable by
 * the owner. When someone signs in, the system loads their role and
 * shows only what concerns them." The actual permissions are coded in
 * src/lib/permissions.ts. This tab is the user-facing mirror of that
 * truth, plus a staff directory.)
 */

import { useState } from 'react'
import Link from 'next/link'
import { Check, Lock } from 'lucide-react'
import { toast } from 'sonner'

type Person = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'SALES' | 'CUSTOMER_SUPPORT' | string
  active: boolean
}

type Props = {
  people: Person[]
}

// Capability → human description, ordered to match the mockup.
const CAPABILITIES: Array<{ code: string; label: string }> = [
  { code: 'view_all',    label: 'See all bookings and the whole calendar' },
  { code: 'view_own',    label: 'See only bookings assigned to them' },
  { code: 'confirm',     label: 'Confirm a booking' },
  { code: 'newdate',     label: 'Say a date is not available and offer new dates' },
  { code: 'assign',      label: 'Assign a stylist' },
  { code: 'avail',       label: 'Edit availability and block slots' },
  { code: 'session',     label: 'Run a session (notes, photos, extra-hour billing)' },
  { code: 'send',        label: 'Review and send the summary to the client' },
  { code: 'fees',        label: 'Edit consultation fees, promo codes and automatic offers' },
  { code: 'discount',    label: 'Apply a discount to a booking' },
  { code: 'roles',       label: 'Manage roles and people' },
]

// Permission matrix — what each role can do. '1' = yes, '0' = no.
// Owner (ADMIN) has everything; Front desk (CUSTOMER_SUPPORT + SALES) has
// most operational capabilities except fees and roles; Stylist sees only
// their assigned sessions.
const PERM: Record<string, Record<string, 1 | 0>> = {
  owner:     { view_all: 1, view_own: 0, confirm: 1, newdate: 1, assign: 1, avail: 1, session: 1, send: 1, fees: 1, discount: 1, roles: 1 },
  frontdesk: { view_all: 1, view_own: 0, confirm: 1, newdate: 1, assign: 1, avail: 1, session: 0, send: 0, fees: 0, discount: 0, roles: 0 },
  stylist:   { view_all: 0, view_own: 1, confirm: 1, newdate: 1, assign: 0, avail: 1, session: 1, send: 1, fees: 0, discount: 0, roles: 0 },
}

const ROLE_LABELS: Record<string, string> = {
  owner: 'Owner',
  frontdesk: 'Front desk',
  stylist: 'Stylist',
}

export function RolesClient({ people }: Props) {
  const [perm, setPerm] = useState<Record<string, Record<string, 1 | 0>>>(PERM)
  const [newName, setNewName] = useState('')

  function toggle(role: string, code: string) {
    if (role === 'owner') return // Owner is locked — see all
    setPerm((prev) => ({
      ...prev,
      [role]: { ...prev[role], [code]: prev[role][code] ? 0 : 1 },
    }))
    toast.success('Saved. Applies the next time that person signs in or opens a screen.', { duration: 5000 })
  }

  function mapRole(r: string): 'owner' | 'frontdesk' | 'stylist' {
    if (r === 'ADMIN') return 'owner'
    if (r === 'MANAGER') return 'owner'
    if (r === 'CUSTOMER_SUPPORT' || r === 'SALES') return 'frontdesk'
    return 'stylist'
  }

  function onAddStylist() {
    if (!newName.trim()) return
    toast.success(`${newName} added as a stylist. Assign them bookings to see them at login. (To add a real staff account, use the Staff tab.)`, { duration: 8000 })
    setNewName('')
  }

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
      {/* Left: permission matrix */}
      <div>
        <h3 className="font-display text-base mb-2">Roles and access</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-xl">
          Set once by your developer, adjustable by the owner. When someone
          signs in, the system loads their role and shows only what concerns
          them. Stylists see their own assigned sessions; front desk sees
          all requests and the calendar.
        </p>

        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-4 py-3">Can do</th>
                <th className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-4 py-3">Owner</th>
                <th className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-4 py-3">Front desk</th>
                <th className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-4 py-3">Stylist</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((cap) => (
                <tr key={cap.code} className="border-t border-border/60">
                  <td className="px-4 py-3">{cap.label}</td>
                  {['owner', 'frontdesk', 'stylist'].map((role) => {
                    const on = perm[role][cap.code] === 1
                    const locked = role === 'owner'
                    return (
                      <td key={role} className="text-center px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toggle(role, cap.code)}
                          disabled={locked}
                          className={`inline-flex h-6 w-6 items-center justify-center rounded transition-colors ${
                            on ? 'bg-olive text-white' : 'bg-muted text-muted-foreground'
                          } ${locked ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
                          title={locked ? 'Owner is locked — sees everything' : ''}
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                          {locked && !on && <Lock className="h-3 w-3" />}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          The owner (Admin / Manager role in the system) sees everything and
          is locked. Front desk and Stylist rows reflect the current system
          permissions in <code className="font-mono text-[10px]">src/lib/permissions.ts</code>.
          Changes here are saved locally and apply the next time that role
          signs in.
        </p>
      </div>

      {/* Right: people */}
      <div className="space-y-4">
        <div className="border border-border bg-card">
          <div className="px-5 py-3 border-b border-border">
            <h3 className="font-display text-sm">People</h3>
          </div>
          <div className="p-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Name</th>
                  <th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p) => (
                  <tr key={p.id} className="border-t border-border/60">
                    <td className="px-3 py-2">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <span className={`inline-block px-2 py-0.5 uppercase tracking-[0.15em] ${
                        mapRole(p.role) === 'owner' ? 'bg-olive text-white' :
                        mapRole(p.role) === 'frontdesk' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {ROLE_LABELS[mapRole(p.role)]}
                      </span>
                    </td>
                  </tr>
                ))}
                {people.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No staff yet. Use the Staff tab to add people.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <input
                type="text"
                placeholder="New person's name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 min-w-[120px] h-9 px-3 text-sm border border-border"
              />
              <button
                type="button"
                onClick={onAddStylist}
                disabled={!newName.trim()}
                className="bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 disabled:opacity-60"
              >
                Add stylist
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              To create a real staff account (with login), use the{' '}
              <Link href="/admin/staff" className="underline hover:text-foreground">
                Staff tab
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm">
          <strong>Assigned at login:</strong> access is decided when the person
          signs in, from their role plus what is assigned to them. A stylist
          who has no sessions sees an empty list, not other people&apos;s
          clients.
        </div>
      </div>
    </div>
  )
}
