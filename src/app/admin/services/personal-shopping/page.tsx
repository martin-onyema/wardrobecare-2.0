import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminPersonalShoppingIndexPage() {
  redirect('/admin/services/personal-shopping/requests')
}
