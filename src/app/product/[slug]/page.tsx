import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductInfo } from '@/components/product/product-info'
import { ProductCard } from '@/components/product/product-card'
import { getProductBySlug, getRelatedProducts, getAdminSettings } from '@/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentStaffUser } from '@/lib/session'

export const dynamic = 'force-dynamic'
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images.map((img) => ({ url: img.url, alt: img.altText ?? product.name })),
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product || !product.published) notFound()

  // Run admin check + related products + settings in parallel.
  // getCurrentStaffUser() returns null if not signed in or not staff — no redirect.
  const [related, settings, staffUser] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getAdminSettings(),
    getCurrentStaffUser(),
  ])
  const isAdmin = !!staffUser

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Wardrobecare Clothing' },
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'NGN',
      availability: product.variants.some((v) => v.stock > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-8 md:py-12">
          {/* Admin quick-edit bar — only visible to signed-in staff */}
          {isAdmin && (
            <div className="mb-6 flex items-center justify-between bg-foreground text-background px-4 py-3 text-xs">
              <div className="flex items-center gap-2 uppercase tracking-[0.18em]">
                <span className="inline-block w-1.5 h-1.5 bg-rust rounded-full" aria-hidden />
                Admin mode
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/products"
                  className="text-background/80 hover:text-background underline-offset-2 hover:underline"
                >
                  Product list
                </Link>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="bg-background text-foreground px-3 py-1.5 uppercase tracking-[0.15em] font-medium hover:bg-rust hover:text-background transition-colors flex items-center gap-1.5"
                >
                  Edit this product
                </Link>
              </div>
            </div>
          )}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo product={product as any} settings={settings} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border mt-12 md:mt-20 py-16 md:py-24">
            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    You may also like
                  </p>
                  <h2 className="font-display text-3xl md:text-5xl tracking-[-0.02em]">
                    Complete the Wardrobe
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="text-[11px] uppercase tracking-[0.2em] link-underline hidden md:inline-block"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
