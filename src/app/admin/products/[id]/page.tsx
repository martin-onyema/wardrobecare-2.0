import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/session'
import { getMyPermissionCodes } from '@/lib/permissions'
import { db } from '@/lib/db'
import { getAllCategories, PRODUCT_SELECT_BASE, CATEGORY_SELECT_WITH_PARENT } from '@/lib/queries'
import { AdminLayout } from '@/components/admin/admin-layout'
import { ProductForm } from '@/components/admin/product-form'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit Product',
  robots: { index: false, follow: false },
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const perms = await getMyPermissionCodes()
  const { id } = await params
  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      select: {
        ...PRODUCT_SELECT_BASE,
        images: { orderBy: { position: 'asc' }, select: { id: true, url: true, altText: true, position: true, productId: true } },
        variants: { orderBy: { size: 'asc' } },
        category: { select: CATEGORY_SELECT_WITH_PARENT },
      },
    }),
    getAllCategories(),
  ])
  if (!product) notFound()

  return (
    <AdminLayout
      title="Edit Product"
      description={product.name}
      permissions={perms}
    >
      <ProductForm categories={categories} product={product} />
    </AdminLayout>
  )
}
