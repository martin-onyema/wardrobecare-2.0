import { redirect } from 'next/navigation'

// The admin consultations surface is split into 6 tabs (requests,
// calendar, session, after, fees, roles). The landing page just
// redirects to the default tab — Requests — so the URL always reflects
// which tab the admin is on.

export const dynamic = 'force-dynamic'

export default async function AdminConsultationsIndexPage() {
  redirect('/admin/services/consultations/requests')
}
