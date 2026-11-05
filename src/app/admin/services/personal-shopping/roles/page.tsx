import { requireStaffWithPermission } from '@/lib/permissions'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { AdminLayout } from '@/components/admin/admin-layout'
import { PSTabNav } from '../_shared'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Personal Shopping Roles', robots: { index: false, follow: false } }

const CAPABILITIES = [
  { code: 'view_all', label: 'See all requests' },
  { code: 'view_own', label: 'See only requests assigned to them' },
  { code: 'accept', label: 'Accept a request and start sourcing' },
  { code: 'assign', label: 'Assign a stylist' },
  { code: 'shortlist', label: 'Build and send the shortlist' },
  { code: 'record', label: 'Record customer choices (WhatsApp, on-site)' },
  { code: 'fulfil', label: 'Dispatch deliveries and run fittings' },
  { code: 'discount', label: 'Apply a discount to a request fee' },
  { code: 'fees', label: 'Edit fees, delivery fees and promo codes' },
  { code: 'roles', label: 'Manage roles and people' },
]

const PERM: Record<string, Record<string, 1 | 0>> = {
  owner:     { view_all: 1, view_own: 0, accept: 1, assign: 1, shortlist: 1, record: 1, fulfil: 1, discount: 1, fees: 1, roles: 1 },
  frontdesk: { view_all: 1, view_own: 0, accept: 1, assign: 1, shortlist: 0, record: 1, fulfil: 1, discount: 0, fees: 0, roles: 0 },
  stylist:   { view_all: 0, view_own: 1, accept: 1, assign: 0, shortlist: 1, record: 1, fulfil: 1, discount: 0, fees: 0, roles: 0 },
}

export default async function AdminPSRolesPage() {
  await requireStaffWithPermission('service.enquiry.manage')
  const perms = await getMyPermissionCodes()

  const people = await db.user.findMany({
    where: { role: { not: 'CUSTOMER' } },
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { name: 'asc' },
  })

  function mapRole(r: string): string {
    if (r === 'ADMIN' || r === 'MANAGER') return 'owner'
    if (r === 'CUSTOMER_SUPPORT' || r === 'SALES') return 'frontdesk'
    return 'stylist'
  }

  return (
    <AdminLayout title="Roles & Access" description="Access decided at login. A stylist sees only requests assigned to them." permissions={perms}>
      <PSTabNav active="roles" />
      <div className="p-6">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div>
            <h3 className="font-display text-base mb-2">Roles and access</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-xl">
              Set by your developer, adjustable by the owner. Access is decided at login:
              a stylist sees only requests assigned to them.
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
                        const on = PERM[role][cap.code] === 1
                        return (
                          <td key={role} className="text-center px-4 py-3">
                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded ${on ? 'bg-olive text-white' : 'bg-muted text-muted-foreground'}`}>
                              {on && <Check className="h-3.5 w-3.5" />}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="border border-border bg-card">
              <div className="px-5 py-3 border-b border-border"><h3 className="font-display text-sm">People</h3></div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <thead><tr className="bg-secondary/40"><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Name</th><th className="text-left text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono px-3 py-2">Role</th></tr></thead>
                  <tbody>
                    {people.map((p) => (
                      <tr key={p.id} className="border-t border-border/60">
                        <td className="px-3 py-2"><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.email}</p></td>
                        <td className="px-3 py-2">
                          <span className={`inline-block px-2 py-0.5 uppercase tracking-[0.15em] text-xs ${
                            mapRole(p.role) === 'owner' ? 'bg-olive text-white' :
                            mapRole(p.role) === 'frontdesk' ? 'bg-yellow-100 text-yellow-800' : 'bg-stone-100 text-stone-700'
                          }`}>{mapRole(p.role) === 'frontdesk' ? 'front desk' : mapRole(p.role)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm mt-4">
              <strong>Assigned at login:</strong> role plus assignment decides what the person sees, on the server. Unassigned requests are visible to owner and front desk only.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
