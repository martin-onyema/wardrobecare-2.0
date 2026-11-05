'use client'

import { useState, useMemo } from 'react'
import { ProductGallery } from './product-gallery'
import { ProductInfo } from './product-info'

type Variant = {
  id: string
  size: string | null
  color: string | null
  price: number | null
  stock: number
  sku: string | null
  imageUrl: string | null
}

type Image = { url: string; altText?: string | null; id?: string }

type Product = {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  description: string
  features: string | null
  material: string | null
  fit: string | null
  care: string | null
  sku: string
  outOfStock?: boolean
  featured?: boolean
  createdAt?: string
  category: { name: string; slug: string; parent?: { name: string; slug: string } | null }
  brand?: { name: string; slug: string } | null
  variants: Variant[]
  images: Image[]
}

/**
 * Client wrapper that manages shared state between the gallery and the
 * purchase panel. When a colour is selected:
 * 1. The gallery prepends any variant-specific images (variant.imageUrl)
 *    to the product image list.
 * 2. The info panel filters available sizes to those matching the colour.
 *
 * This is the ONLY new orchestration component — ProductGallery and
 * ProductInfo keep their existing props and logic, just receive the
 * shared colour + filtered images as additional props.
 */
export function ProductDetail({
  product,
  settings,
}: {
  product: Product
  settings: { whatsappNumber?: string | null } | null
}) {
  // Extract distinct non-null colors from variants
  const distinctColors = useMemo(() => {
    const colors = product.variants
      .map((v) => v.color)
      .filter((c): c is string => !!c && c.trim().length > 0)
    return [...new Set(colors)]
  }, [product.variants])

  // Default to the first colour if variants have distinct colors
  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    return distinctColors.length > 0 ? distinctColors[0] : null
  })

  // Compute gallery images for the selected colour:
  // If any variant with the selected colour has an imageUrl, prepend those
  // to the product's own images. Dedup by URL to avoid showing the same
  // image twice if the variant imageUrl is the same as the product image.
  const galleryImages = useMemo(() => {
    if (!selectedColor) return product.images
    const variantImages = product.variants
      .filter((v) => v.color === selectedColor && v.imageUrl)
      .map((v) => ({
        url: v.imageUrl!,
        altText: `${product.name} — ${v.color ?? ''}`.trim(),
      }))
    if (variantImages.length === 0) return product.images
    // Dedup: remove product images that have the same URL as a variant image
    const variantUrls = new Set(variantImages.map((vi) => vi.url))
    const dedupedProductImages = product.images.filter((pi) => !variantUrls.has(pi.url))
    return [...variantImages, ...dedupedProductImages]
  }, [selectedColor, product.images, product.variants, product.name])

  // Whether to show the colour selector at all (only when there are 2+ distinct colors)
  const showColorSelector = distinctColors.length >= 2

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
      <ProductGallery images={galleryImages} name={product.name} />
      <ProductInfo
        product={product as any}
        settings={settings}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        showColorSelector={showColorSelector}
        distinctColors={distinctColors}
      />
    </div>
  )
}
