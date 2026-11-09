import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PRODUCT_SELECT_BASE, CATEGORY_SELECT_BASE } from '@/lib/queries'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const product = await db.product.findUnique({
    where: { id },
    select: {
      ...PRODUCT_SELECT_BASE,
      images: { orderBy: { position: 'asc' }, select: { id: true, url: true, altText: true, position: true, productId: true } },
      variants: true,
      category: { select: CATEGORY_SELECT_BASE },
    },
  })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}
