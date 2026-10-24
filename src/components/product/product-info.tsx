'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, ShoppingBag, Heart, MessageCircle, Truck, RotateCcw, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNGN, effectivePrice, whatsappLink } from '@/lib/format'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useUIStore } from '@/lib/stores/ui-store'
import { toast } from 'sonner'
import Link from 'next/link'
import { colorToCss, isKnownColor } from '@/lib/order-colors'

type Variant = {
  id: string
  size: string | null
  color: string | null
  price: number | null
  stock: number
  sku: string | null
  imageUrl: string | null
}

type ProductInfoProps = {
  product: {
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
    images: { url: string }[]
  }
  settings: { whatsappNumber?: string | null } | null
  selectedColor: string | null
  onColorChange: (color: string | null) => void
  showColorSelector: boolean
  distinctColors: string[]
}

export function ProductInfo({
  product,
  settings,
  selectedColor,
  onColorChange,
  showColorSelector,
  distinctColors,
}: ProductInfoProps) {
  const router = useRouter()
  // Compute initial size from product on first render — no effect needed
  // If a colour is selected, default to the first in-stock size within that colour
  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    if (product.variants.length > 0) {
      const colourVariants = selectedColor
        ? product.variants.filter((v) => v.color === selectedColor)
        : product.variants
      const firstAvailable = colourVariants.find((v) => v.stock > 0)
      return firstAvailable?.size ?? colourVariants[0]?.size ?? product.variants[0]?.size ?? null
    }
    return null
  })
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const addToCart = useCartStore((s) => s.add)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const hasWishlist = useWishlistStore((s) => s.has)
  const setCartOpen = useUIStore((s) => s.setCartOpen)

  // Filter variants by selected colour if the colour selector is active
  const colourFilteredVariants = showColorSelector && selectedColor
    ? product.variants.filter((v) => v.color === selectedColor)
    : product.variants

  const selectedVariant = colourFilteredVariants.find((v) => v.size === selectedSize) ?? product.variants.find((v) => v.size === selectedSize)
  const price = effectivePrice(product.price, product.salePrice)
  // Use variant price override if set, otherwise product price
  const effectiveVariantPrice = selectedVariant?.price ?? null
  const displayPrice = effectiveVariantPrice !== null ? effectiveVariantPrice : price
  const isOnSale = product.salePrice && product.salePrice < product.price
  // Respect the explicit admin-set outOfStock flag; otherwise infer from variants
  const inStock = (product.outOfStock !== true) && (!product.variants.length || product.variants.some((v) => v.stock > 0))
  const selectedInStock = (product.outOfStock !== true) && (selectedVariant ? selectedVariant.stock > 0 : inStock)
  const maxQuantity = selectedVariant?.stock ?? 99
  const inWishlist = hasWishlist(product.id)

  // New arrival: product was created within the last 30 days OR is featured
  const isNewArrival = product.featured || (product.createdAt && Date.now() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000)

  function handleColorChange(color: string) {
    onColorChange(color)
    // Reset size to first available within the new colour
    const colourVariants = product.variants.filter((v) => v.color === color)
    const firstAvailable = colourVariants.find((v) => v.stock > 0)
    setSelectedSize(firstAvailable?.size ?? colourVariants[0]?.size ?? null)
  }

  const handleAddToCart = () => {
    if (product.variants.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (!selectedInStock) {
      toast.error('Selected size is out of stock')
      return
    }
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id ?? undefined,
      size: selectedSize ?? undefined,
      quantity,
      name: product.name,
      slug: product.slug,
      price: displayPrice,
      originalPrice: isOnSale ? product.price : undefined,
      image: product.images[0]?.url ?? undefined,
      sku: selectedVariant?.sku ?? product.sku,
    })
    toast.success('Added to bag')
    setCartOpen(true)
  }

  const handleBuyNow = () => {
    if (product.variants.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (!selectedInStock) {
      toast.error('Selected size is out of stock')
      return
    }
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id ?? undefined,
      size: selectedSize ?? undefined,
      quantity,
      name: product.name,
      slug: product.slug,
      price: displayPrice,
      originalPrice: isOnSale ? product.price : undefined,
      image: product.images[0]?.url ?? undefined,
      sku: selectedVariant?.sku ?? product.sku,
    })
    setTimeout(() => {
      router.push('/checkout')
    }, 50)
  }

  const handleWhatsApp = () => {
    const phone = settings?.whatsappNumber || '2348000000000'
    const msg = `Hello Wardrobecare, I'd like to order:\n\n*${product.name}*\nColour: ${selectedColor ?? 'N/A'}\nSize: ${selectedSize ?? 'N/A'}\nQuantity: ${quantity}\nPrice: ${formatNGN(displayPrice * quantity)}\nSKU: ${selectedVariant?.sku ?? product.sku}\n\nPlease confirm availability.`
    window.open(whatsappLink(phone, msg), '_blank')
  }

  const handleWishlist = () => {
    toggleWishlist({
      productId: product.id,
      variantId: selectedVariant?.id ?? undefined,
      size: selectedSize ?? undefined,
      name: product.name,
      slug: product.slug,
      price: displayPrice,
      image: product.images[0]?.url ?? undefined,
    })
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
      {/* Breadcrumb */}
      <nav className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        {product.category.parent && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop?category=${product.category.parent.slug}`} className="hover:text-foreground">
              {product.category.parent.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
      </nav>

      {/* Category eyebrow + new arrival label */}
      <div className="flex items-center gap-3">
        {product.category && (
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {product.category.parent ? `${product.category.parent.name} · ` : ''}{product.category.name}
          </p>
        )}
        {isNewArrival && (
          <span className="text-[10px] uppercase tracking-[0.15em] bg-foreground text-background px-2 py-0.5">
            New
          </span>
        )}
      </div>

      {/* Title + brand + price */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em]">
          {product.name}
        </h1>
        {product.brand && (
          <p className="text-sm text-muted-foreground mt-2">
            by <Link href={`/shop?brand=${product.brand.slug}`} className="hover:text-foreground underline underline-offset-4">{product.brand.name}</Link>
          </p>
        )}
        <div className="flex items-baseline gap-3 mt-4">
          <span className="text-xl tabular-nums">{formatNGN(displayPrice)}</span>
          {isOnSale && (
            <>
              <span className="text-base text-muted-foreground line-through tabular-nums">
                {formatNGN(product.price)}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] bg-foreground text-background px-2 py-0.5">
                Save {Math.round((1 - (product.salePrice! / product.price)) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Status */}
      <div className="flex items-center gap-3 text-xs">
        {inStock ? (
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
            Sold Out
          </span>
        )}
        <span className="text-muted-foreground">SKU: {selectedVariant?.sku ?? product.sku}</span>
      </div>

      {/* Colour selector — only shown when there are 2+ distinct colours */}
      {showColorSelector && distinctColors.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Colour {selectedColor && <span className="text-foreground ml-1">— {selectedColor}</span>}
          </p>
          <div className="flex flex-wrap gap-2">
            {distinctColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm border transition-all',
                  selectedColor === color
                    ? 'border-foreground bg-secondary/60'
                    : 'border-border hover:border-foreground/40',
                )}
                title={color}
              >
                {isKnownColor(color) && (
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-foreground/20 shrink-0"
                    style={{ background: colorToCss(color) }}
                  />
                )}
                <span>{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Size {selectedSize && <span className="text-foreground ml-1">— {selectedSize}</span>}
            </p>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show only sizes available in the selected colour (or all sizes if no colour filter) */}
            {(showColorSelector && selectedColor ? colourFilteredVariants : product.variants).map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedSize(v.size)}
                disabled={v.stock <= 0}
                className={cn(
                  'min-w-[3rem] px-4 py-2.5 text-sm border transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:line-through',
                  selectedSize === v.size
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground',
                )}
              >
                {v.size}
              </button>
            ))}
          </div>
          {showSizeGuide && (
            <div className="mt-4 p-4 bg-secondary/60 border border-border text-xs space-y-2">
              <p className="font-medium uppercase tracking-[0.15em] text-[10px]">Size Guide</p>
              <p className="text-muted-foreground">Chest (inches): S — 36–38, M — 38–40, L — 40–42, XL — 42–44, XXL — 44–46</p>
              <p className="text-muted-foreground">Waist (inches): 30 — 30, 32 — 32, 34 — 34, 36 — 36, 38 — 38, 40 — 40</p>
              <p className="text-muted-foreground">Shoes (EU): True to size. If between sizes, size up.</p>
            </div>
          )}
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Quantity</p>
        <div className="inline-flex items-center border border-border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2.5 hover:bg-muted transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="px-6 text-sm tabular-nums">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
            className="px-4 py-2.5 hover:bg-muted transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
          <p className="text-xs text-amber-700 mt-2">Only {selectedVariant.stock} left in this size.</p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={cn(
            "w-full py-4 text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2",
            inStock
              ? "bg-foreground text-background hover:bg-foreground/90"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
        >
          {inStock ? (
            <>
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Add to Bag
            </>
          ) : (
            <span className="font-bold tracking-[0.22em]">Sold Out</span>
          )}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className={cn(
              "py-3.5 border text-[11px] uppercase tracking-[0.2em] transition-colors",
              inStock
                ? "border-foreground hover:bg-foreground hover:text-background"
                : "border-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            Buy Now
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 py-3.5 border border-border text-[11px] uppercase tracking-[0.2em] hover:border-foreground transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            WhatsApp
          </button>
        </div>
        <button
          onClick={handleWishlist}
          className="w-full flex items-center justify-center gap-2 py-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <Heart className={cn('h-3.5 w-3.5', inWishlist && 'fill-current')} strokeWidth={1.5} />
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Reassurance */}
      <div className="pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-3">
          <Truck className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-foreground">Cash on Delivery</p>
            <p>Lagos 1hr–3 days · Other states up to 7 days. Complimentary over ₦500,000.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-foreground">7-Day Returns</p>
            <p>Unworn items in original packaging. Sale items are final.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-foreground">Secure Payment</p>
            <p>Verified by Paystack. Server-side payment verification.</p>
          </div>
        </div>
      </div>

      {/* Details accordion */}
      <div className="pt-6 border-t border-border space-y-4">
        {product.features && (
          <DetailRow label="Features" value={product.features} />
        )}
        {product.material && (
          <DetailRow label="Material" value={product.material} />
        )}
        {product.fit && (
          <DetailRow label="Fit" value={product.fit} />
        )}
        {product.care && (
          <DetailRow label="Care" value={product.care} />
        )}
      </div>

      {/* Consultation CTA — links to the existing Wardrobe & Style Consultation
          and Personal Shopping services */}
      <div className="pt-6 border-t border-border">
        <div className="bg-secondary/40 p-6 border border-border">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Not sure of your size?
          </p>
          <p className="text-sm leading-relaxed mb-4">
            Book a Wardrobe &amp; Style Consultation and we&apos;ll help you decide — or add it to a Personal Shopping brief.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/services/wardrobe-consultation"
              className="flex-1 text-center py-3 text-[11px] uppercase tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services/personal-shopping"
              className="flex-1 text-center py-3 text-[11px] uppercase tracking-[0.2em] border border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Personal Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/60 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground">{label}</span>
        <Plus className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-45')} strokeWidth={1.5} />
      </button>
      {open && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{value}</p>
      )}
    </div>
  )
}
