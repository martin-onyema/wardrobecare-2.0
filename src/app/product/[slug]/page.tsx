import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductInfo } from '@/components/product/product-info'
import { ProductCard } from '@/components/product/product-card'
import { ProductDetail } from '@/components/product/product-detail'
import { getProductBySlug, getRelatedProducts, getAdminSettings } from '@/lib/queries'
import { getCurrentStaffUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  // Use SEO fields if they exist, otherwise fall back to name/description
  const title = product.seoTitle ?? product.name
  const description = product.seoDescription ?? product.description.slice(0, 160)
  const keywords = product.seoKeywords ?? undefined
  const canonical = product.canonicalUrl ?? `/product/${product.slug}`
  const ogImage = product.ogImage ?? product.images[0]?.url

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'website',
      images: ogImage ? [{ url: ogImage, alt: product.name }] : product.images.map((img) => ({ url: img.url, alt: img.altText ?? product.name })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : product.images.map((img) => img.url),
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product || !product.published) notFound()

  // Run admin check + related products + settings in parallel.
  const [related, settings, staffUser] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getAdminSettings(),
    getCurrentStaffUser(),
  ])
  const isAdmin = !!staffUser

  // Enhanced JSON-LD: uses real brand name, outOfStock flag, aggregateRating
  const productJsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand?.name ?? 'Wardrobecare Clothing' },
    url: `https://wardrobecare.com.ng/product/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'NGN',
      availability: (product.outOfStock === true)
        ? 'https://schema.org/OutOfStock'
        : product.variants.some((v) => v.stock > 0)
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  }

  // Add aggregateRating if the product has reviews
  if (product.rating > 0 && product.reviewCount > 0) {
    productJsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    }
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
          <ProductDetail product={product as any} settings={settings} />
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
