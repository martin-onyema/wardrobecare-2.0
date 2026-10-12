/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Wire real product images → DB products.
 *
 * Reads all files from /public/products/, groups them by product (strips the
 * `-<N>` suffix), auto-detects category + variants + price, and REPLACES
 * the placeholder products in the database with the real 534 products.
 *
 * Safe to re-run — script is idempotent (deletes all existing products first,
 * then re-inserts).
 *
 * Usage:
 *   node /home/z/my-project/scripts/wire-real-products.cjs
 */
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const PRODUCTS_DIR = '/home/z/my-project/extracted/public/products'
const prisma = new PrismaClient()

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Title Case a slug-derived name. */
function titleCase(slug) {
  // Replace hyphens with spaces, capitalize each word
  return slug
    .split('-')
    .map((w) => {
      // Keep short words lowercase for readability (a, of, the, for, in, and)
      const small = ['a', 'of', 'the', 'for', 'in', 'and', 'to', 'with']
      if (small.includes(w)) return w
      // All-caps acronyms (US, UK, EDP, etc.)
      if (w.length <= 3 && w === w.toUpperCase() && /^[A-Z]+$/.test(w)) return w
      // T-Shirt, T-Shirt etc — special handling
      if (/^t-?shirt$/i.test(w)) return 'T-Shirt'
      if (/^edp$/i.test(w)) return 'EDP'
      // Default: capitalize first letter
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

/** Generate a unique SKU from the product key. Format: WC-<BRAND-3>-<XXXX> */
function generateSku(productKey, index) {
  // Take the first 3 words of the slug, uppercase
  const words = productKey.split('-').slice(0, 3).join('-').toUpperCase().replace(/[^A-Z0-9-]/g, '')
  // Suffix: 4-char random + index for uniqueness within same brand prefix
  const rand = crypto.randomBytes(2).toString('hex').toUpperCase()
  const idx = String(index).padStart(3, '0')
  return `WC-${words || 'PRODUCT'}-${idx}-${rand}`
}

// ─── Category detection ──────────────────────────────────────────────────────

/** Map a product key (filename prefix) to a sub-category slug. */
function detectSubCategory(key) {
  const k = key.toLowerCase()

  // Fragrance (check first — these are specific brand/product names)
  if (
    /\b(edp|parfum|parfum|eau-de|perfume|cologne)\b/.test(k) ||
    /lattafa|khadlaj|riiffs|arabiyat|ana-abiyedh|coco|chanel-no5/.test(k)
  ) return 'mens-fragrance'
  if (/grooming|skincare|curology/.test(k)) return 'mens-grooming'

  // Footwear
  if (/sneaker|low-top|lace-up|trainer/.test(k)) return 'casual-shoes'
  if (/loafer|driver|slip-on/.test(k)) return 'loafers'
  if (/derby|oxford|monk|brogue|dress-shoe/.test(k)) return 'dress-shoes'
  if (/boot/.test(k)) return 'casual-shoes'

  // Bottoms (children of "bottoms")
  if (/boxer-short/.test(k)) return 'shorts'
  if (/cargo-pant|tactical-pant|cargo-jean/.test(k)) return 'trousers'
  if (/jean|denim/.test(k) && !/jacket|shirt/.test(k)) return 'jeans'
  if (/jogger/.test(k)) return 'joggers'
  if (/chino/.test(k)) return 'chinos'
  if (/trouser|pant/.test(k)) return 'trousers'
  if (/short/.test(k)) return 'shorts'

  // Accessories (children of "accessories")
  if (/belt/.test(k)) return 'belts'
  if (/wallet|purse|bifold/.test(k)) return 'wallets-purses'
  if (/tie/.test(k) && !/t-shirt|skinny/.test(k)) return 'ties'
  if (/cufflink|pocket-square/.test(k)) return 'pocket-squares'
  if (/sock/.test(k)) return 'socks'
  if (/cap|hat|trucker/.test(k)) return 'caps-hats'
  if (/sunglass|rayban|wayfarer/.test(k)) return 'sunglasses'

  // Clothing (children of "clothing")
  if (/blazer/.test(k)) return 'blazers'
  if (/suit/.test(k) && !/suitcase/.test(k)) return 'suits'
  if (/jacket|overshirt|bomber|denim-jacket/.test(k)) return 'jackets'
  if (/hoodie|sweatshirt/.test(k)) return 'hoodies-sweatshirts'
  if (/polo/.test(k)) return 'polo-shirts'
  if (/t-shirt|crew-neck-t-shirt|graphic-(print-)?crew-neck|tee/.test(k)) return 't-shirts'
  if (/underwear|innerwear|boxer/.test(k) && !/short/.test(k)) return 'innerwear'
  if (/pyjama/.test(k)) return 'pyjamas'
  // Shirts (formal vs casual) — check after t-shirt/polo
  if (/dress-shirt|formal-shirt|oxford-shirt/.test(k)) return 'formal-shirts'
  if (/shirt/.test(k) && !/t-shirt|polo/.test(k)) return 'casual-shirts'

  // Default: clothing > casual-shirts (catch-all)
  return 'casual-shirts'
}

/** Sensible default price (₦) per sub-category. */
function defaultPrice(subCat) {
  const prices = {
    // Fragrance
    'mens-fragrance': 28000,
    'mens-grooming': 15000,
    'womens-fragrance': 28000,
    // Footwear
    'casual-shoes': 38000,
    'dress-shoes': 55000,
    'loafers': 42000,
    'exotic-shoes': 65000,
    // Bottoms
    'jeans': 22000,
    'chinos': 18000,
    'trousers': 18000,
    'joggers': 16000,
    'shorts': 14000,
    // Clothing
    'blazers': 65000,
    'suits': 85000,
    'jackets': 45000,
    'hoodies-sweatshirts': 22000,
    'polo-shirts': 16000,
    't-shirts': 12000,
    'casual-shirts': 15000,
    'formal-shirts': 18000,
    'innerwear': 8000,
    'pyjamas': 12000,
    // Accessories
    'belts': 12000,
    'wallets-purses': 14000,
    'ties': 8000,
    'pocket-squares': 6000,
    'socks': 5000,
    'caps-hats': 9000,
    'sunglasses': 18000,
  }
  return prices[subCat] ?? 15000
}

/** Variant sizes per sub-category. */
function variantSizes(subCat) {
  if (
    subCat === 'casual-shoes' ||
    subCat === 'dress-shoes' ||
    subCat === 'loafers' ||
    subCat === 'exotic-shoes'
  ) {
    return ['40', '41', '42', '43', '44', '45']
  }
  if (subCat === 'jeans' || subCat === 'chinos' || subCat === 'trousers' || subCat === 'joggers') {
    return ['30', '32', '34', '36', '38']
  }
  if (subCat === 'shorts') {
    return ['30', '32', '34']
  }
  // Fragrance, grooming, accessories, sunglasses, etc.
  if (
    subCat === 'mens-fragrance' ||
    subCat === 'womens-fragrance' ||
    subCat === 'mens-grooming' ||
    subCat === 'belts' ||
    subCat === 'wallets-purses' ||
    subCat === 'ties' ||
    subCat === 'pocket-squares' ||
    subCat === 'socks' ||
    subCat === 'caps-hats' ||
    subCat === 'sunglasses'
  ) {
    return ['ONE SIZE']
  }
  // Default clothing sizes
  if (subCat === 'innerwear' || subCat === 'pyjamas') {
    return ['S', 'M', 'L', 'XL']
  }
  return ['S', 'M', 'L', 'XL', 'XXL']
}

/** Detect brand from filename (first word or two, before "mens"/"womens" etc). */
function detectBrand(key) {
  // Common known brand prefixes
  const brands = [
    'abercrombie-fitch', 'abercrombie', 'aeropostale', 'ana-abiyedh', 'arabiyat-prestige',
    'ben-sherman', 'celio', 'jack-jones', 'jack', 'khadlaj', 'lattafa', 'lerros',
    'levis', 'pepe-jeans', 'pepe', 'riiffs', 'tom-tailor', 'under-armour', 'us-polo-assn',
    'us-polo', 'uspa', 'usap', 'ward', 'zara', 'coco', 'chanel',
  ]
  const kl = key.toLowerCase()
  for (const b of brands) {
    if (kl.startsWith(b + '-') || kl === b) {
      return b.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }
  // Default: first word of the slug
  return key.split('-')[0].charAt(0).toUpperCase() + key.split('-')[0].slice(1)
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('📦 Reading product images from', PRODUCTS_DIR)
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  console.log(`   ${files.length} image files found`)

  // Group by product key (strip the -N suffix)
  const productMap = new Map()
  for (const f of files) {
    const base = f.replace(/\.(jpg|jpeg|png|webp)$/i, '')
    const productKey = base.replace(/-\d+$/, '')
    if (!productMap.has(productKey)) productMap.set(productKey, [])
    productMap.get(productKey).push(f)
  }

  const productKeys = Array.from(productMap.keys()).sort()
  console.log(`   ${productKeys.length} unique products`)

  // Pre-fetch all sub-category IDs
  console.log('🔗 Resolving categories...')
  const subCats = await prisma.category.findMany({
    where: { parentId: { not: null } },
    select: { id: true, slug: true, name: true },
  })
  const subCatBySlug = new Map(subCats.map((c) => [c.slug, c]))

  // Determine each product's sub-category + count by sub-cat
  const subCatCounts = new Map()
  for (const k of productKeys) {
    const sc = detectSubCategory(k)
    subCatCounts.set(sc, (subCatCounts.get(sc) || 0) + 1)
  }
  console.log('   Category breakdown:')
  for (const [sc, count] of Array.from(subCatCounts.entries()).sort((a, b) => b[1] - a[1])) {
    const cat = subCatBySlug.get(sc)
    console.log(`     ${sc} → ${cat?.name || '(missing!)'}: ${count} products`)
  }

  // Validate all sub-cats exist in DB
  for (const sc of subCatCounts.keys()) {
    if (!subCatBySlug.has(sc)) {
      console.error(`❌ Sub-category "${sc}" not found in DB. Run the seed script first.`)
      process.exit(1)
    }
  }

  // Wipe existing placeholder products
  console.log('🗑  Wiping existing placeholder products...')
  const deleted = await prisma.product.deleteMany({})
  console.log(`   Deleted ${deleted.count} placeholder products`)

  // Insert real products in batches — use individual creates (no single big transaction)
  // to avoid the 60s transaction timeout on remote DBs.
  console.log('✨ Inserting real products...')
  let inserted = 0
  let featured = 0
  const FEATURED_COUNT = 14

  for (let i = 0; i < productKeys.length; i++) {
    const key = productKeys[i]
    const imageFiles = productMap.get(key).sort((a, b) => {
      // Sort by the trailing -N suffix (0, 1, 2, ...)
      const an = parseInt((a.match(/-(\d+)\.jpg$/) || [])[1] ?? '0', 10)
      const bn = parseInt((b.match(/-(\d+)\.jpg$/) || [])[1] ?? '0', 10)
      return an - bn
    })

    const subCatSlug = detectSubCategory(key)
    const subCat = subCatBySlug.get(subCatSlug)
    if (!subCat) throw new Error(`Missing sub-category: ${subCatSlug}`)

    const name = titleCase(key)
    const slug = key
    const sku = generateSku(key, i + 1)
    const price = defaultPrice(subCatSlug)
    const sizes = variantSizes(subCatSlug)
    const brand = detectBrand(key)
    const isFeatured = featured < FEATURED_COUNT

    const imageUrls = imageFiles.map((f) => `/products/${f}`)

    // Auto-generate a description
    const description = `${brand} ${name}. Curated by Wardrobecare — sourced for fit, fabric, and value. Browse the photos for colour and detail.`

    try {
      await prisma.product.create({
        data: {
          name,
          slug,
          description,
          sku,
          price,
          categoryId: subCat.id,
          tags: brand,
          featured: isFeatured,
          published: true,
          outOfStock: false,
          status: 'ACTIVE',
          images: {
            create: imageUrls.map((url, idx) => ({
              url,
              altText: name,
              position: idx,
            })),
          },
          variants: {
            create: sizes.map((size) => ({
              size,
              sku: `${sku}-${size}`,
              stock: 9,
              lowStockThreshold: 3,
            })),
          },
        },
      })
    } catch (e) {
      // Log but continue — don't fail the whole batch on one product
      console.warn(`   ⚠ Skipped "${name}": ${e.message}`)
      continue
    }

    if (isFeatured) featured++
    inserted++
    if (inserted % 50 === 0) console.log(`   ...${inserted}/${productKeys.length}`)
  }

  console.log(`✅ Inserted ${inserted} real products (${featured} featured)`)

  // Final count
  const totalProducts = await prisma.product.count()
  const totalImages = await prisma.productImage.count()
  const totalVariants = await prisma.productVariant.count()
  console.log(`\n📊 Final DB state:`)
  console.log(`   Products: ${totalProducts}`)
  console.log(`   Images:   ${totalImages}`)
  console.log(`   Variants: ${totalVariants}`)
}

main()
  .catch((e) => {
    console.error('❌ Failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
