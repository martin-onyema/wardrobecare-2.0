/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Resume inserting real products into Supabase — only inserts products
 * that don't already exist (by slug). Skips existing ones.
 *
 * Usage:
 *   DATABASE_URL=... node scripts/wire-real-products-resume.cjs
 */
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const crypto = require('crypto')

const PRODUCTS_DIR = '/home/z/my-project/extracted/public/products'
const prisma = new PrismaClient()

function titleCase(slug) {
  return slug.split('-').map((w) => {
    const small = ['a', 'of', 'the', 'for', 'in', 'and', 'to', 'with']
    if (small.includes(w)) return w
    if (w.length <= 3 && w === w.toUpperCase() && /^[A-Z]+$/.test(w)) return w
    if (/^t-?shirt$/i.test(w)) return 'T-Shirt'
    if (/^edp$/i.test(w)) return 'EDP'
    return w.charAt(0).toUpperCase() + w.slice(1)
  }).join(' ')
}

function generateSku(productKey, index) {
  const words = productKey.split('-').slice(0, 3).join('-').toUpperCase().replace(/[^A-Z0-9-]/g, '')
  const rand = crypto.randomBytes(2).toString('hex').toUpperCase()
  const idx = String(index).padStart(3, '0')
  return `WC-${words || 'PRODUCT'}-${idx}-${rand}`
}

function detectSubCategory(key) {
  const k = key.toLowerCase()
  if (/\b(edp|parfum|parfum|eau-de|perfume|cologne)\b/.test(k) || /lattafa|khadlaj|riiffs|arabiyat|ana-abiyedh|coco|chanel-no5/.test(k)) return 'mens-fragrance'
  if (/grooming|skincare|curology/.test(k)) return 'mens-grooming'
  if (/sneaker|low-top|lace-up|trainer/.test(k)) return 'casual-shoes'
  if (/loafer|driver|slip-on/.test(k)) return 'loafers'
  if (/derby|oxford|monk|brogue|dress-shoe/.test(k)) return 'dress-shoes'
  if (/boot/.test(k)) return 'casual-shoes'
  if (/boxer-short/.test(k)) return 'shorts'
  if (/cargo-pant|tactical-pant|cargo-jean/.test(k)) return 'trousers'
  if (/jean|denim/.test(k) && !/jacket|shirt/.test(k)) return 'jeans'
  if (/jogger/.test(k)) return 'joggers'
  if (/chino/.test(k)) return 'chinos'
  if (/trouser|pant/.test(k)) return 'trousers'
  if (/short/.test(k)) return 'shorts'
  if (/belt/.test(k)) return 'belts'
  if (/wallet|purse|bifold/.test(k)) return 'wallets-purses'
  if (/tie/.test(k) && !/t-shirt|skinny/.test(k)) return 'ties'
  if (/cufflink|pocket-square/.test(k)) return 'pocket-squares'
  if (/sock/.test(k)) return 'socks'
  if (/cap|hat|trucker/.test(k)) return 'caps-hats'
  if (/sunglass|rayban|wayfarer/.test(k)) return 'sunglasses'
  if (/blazer/.test(k)) return 'blazers'
  if (/suit/.test(k) && !/suitcase/.test(k)) return 'suits'
  if (/jacket|overshirt|bomber|denim-jacket/.test(k)) return 'jackets'
  if (/hoodie|sweatshirt/.test(k)) return 'hoodies-sweatshirts'
  if (/polo/.test(k)) return 'polo-shirts'
  if (/t-shirt|crew-neck-t-shirt|graphic-(print-)?crew-neck|tee/.test(k)) return 't-shirts'
  if (/underwear|innerwear|boxer/.test(k) && !/short/.test(k)) return 'innerwear'
  if (/pyjama/.test(k)) return 'pyjamas'
  if (/dress-shirt|formal-shirt|oxford-shirt/.test(k)) return 'formal-shirts'
  if (/shirt/.test(k) && !/t-shirt|polo/.test(k)) return 'casual-shirts'
  return 'casual-shirts'
}

function defaultPrice(subCat) {
  const prices = {
    'mens-fragrance': 28000, 'mens-grooming': 15000, 'womens-fragrance': 28000,
    'casual-shoes': 38000, 'dress-shoes': 55000, 'loafers': 42000, 'exotic-shoes': 65000,
    'jeans': 22000, 'chinos': 18000, 'trousers': 18000, 'joggers': 16000, 'shorts': 14000,
    'blazers': 65000, 'suits': 85000, 'jackets': 45000, 'hoodies-sweatshirts': 22000,
    'polo-shirts': 16000, 't-shirts': 12000, 'casual-shirts': 15000, 'formal-shirts': 18000,
    'innerwear': 8000, 'pyjamas': 12000,
    'belts': 12000, 'wallets-purses': 14000, 'ties': 8000, 'pocket-squares': 6000,
    'socks': 5000, 'caps-hats': 9000, 'sunglasses': 18000,
  }
  return prices[subCat] ?? 15000
}

function variantSizes(subCat) {
  if (['casual-shoes', 'dress-shoes', 'loafers', 'exotic-shoes'].includes(subCat)) return ['40', '41', '42', '43', '44', '45']
  if (['jeans', 'chinos', 'trousers', 'joggers'].includes(subCat)) return ['30', '32', '34', '36', '38']
  if (subCat === 'shorts') return ['30', '32', '34']
  if (['mens-fragrance', 'womens-fragrance', 'mens-grooming', 'belts', 'wallets-purses', 'ties', 'pocket-squares', 'socks', 'caps-hats', 'sunglasses'].includes(subCat)) return ['ONE SIZE']
  if (['innerwear', 'pyjamas'].includes(subCat)) return ['S', 'M', 'L', 'XL']
  return ['S', 'M', 'L', 'XL', 'XXL']
}

function detectBrand(key) {
  const brands = ['abercrombie-fitch', 'abercrombie', 'aeropostale', 'ana-abiyedh', 'arabiyat-prestige', 'ben-sherman', 'celio', 'jack-jones', 'jack', 'khadlaj', 'lattafa', 'lerros', 'levis', 'pepe-jeans', 'pepe', 'riiffs', 'tom-tailor', 'under-armour', 'us-polo-assn', 'us-polo', 'uspa', 'usap', 'ward', 'zara', 'coco', 'chanel']
  const kl = key.toLowerCase()
  for (const b of brands) {
    if (kl.startsWith(b + '-') || kl === b) return b.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  return key.split('-')[0].charAt(0).toUpperCase() + key.split('-')[0].slice(1)
}

async function main() {
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const productMap = new Map()
  for (const f of files) {
    const base = f.replace(/\.(jpg|jpeg|png|webp)$/i, '')
    const productKey = base.replace(/-\d+$/, '')
    if (!productMap.has(productKey)) productMap.set(productKey, [])
    productMap.get(productKey).push(f)
  }
  const productKeys = Array.from(productMap.keys()).sort()
  console.log(`Total products to insert: ${productKeys.length}`)

  // Get existing slugs
  const existing = await prisma.product.findMany({ select: { slug: true } })
  const existingSlugs = new Set(existing.map((p) => p.slug))
  console.log(`Already in DB: ${existingSlugs.size}`)

  // Get sub-categories
  const subCats = await prisma.category.findMany({ where: { parentId: { not: null } }, select: { id: true, slug: true, name: true } })
  const subCatBySlug = new Map(subCats.map((c) => [c.slug, c]))

  let inserted = 0
  let skipped = 0
  let featured = await prisma.product.count({ where: { featured: true } })
  const FEATURED_COUNT = 14

  for (let i = 0; i < productKeys.length; i++) {
    const key = productKeys[i]
    if (existingSlugs.has(key)) { skipped++; continue }

    const imageFiles = productMap.get(key).sort((a, b) => {
      const an = parseInt((a.match(/-(\d+)\.jpg$/) || [])[1] ?? '0', 10)
      const bn = parseInt((b.match(/-(\d+)\.jpg$/) || [])[1] ?? '0', 10)
      return an - bn
    })

    const subCatSlug = detectSubCategory(key)
    const subCat = subCatBySlug.get(subCatSlug)
    if (!subCat) { console.warn(`   ⚠ Missing sub-cat: ${subCatSlug} for ${key}`); continue }

    const name = titleCase(key)
    const slug = key
    const sku = generateSku(key, i + 1)
    const price = defaultPrice(subCatSlug)
    const sizes = variantSizes(subCatSlug)
    const brand = detectBrand(key)
    const isFeatured = featured < FEATURED_COUNT
    const imageUrls = imageFiles.map((f) => `/products/${f}`)
    const description = `${brand} ${name}. Curated by Wardrobecare — sourced for fit, fabric, and value. Browse the photos for colour and detail.`

    try {
      await prisma.product.create({
        data: {
          name, slug, description, sku, price, categoryId: subCat.id, tags: brand,
          featured: isFeatured, published: true, outOfStock: false, status: 'ACTIVE',
          images: { create: imageUrls.map((url, idx) => ({ url, altText: name, position: idx })) },
          variants: { create: sizes.map((size) => ({ size, sku: `${sku}-${size}`, stock: 9, lowStockThreshold: 3 })) },
        },
      })
      if (isFeatured) featured++
      inserted++
      if (inserted % 50 === 0) console.log(`   ...${inserted} inserted`)
    } catch (e) {
      console.warn(`   ⚠ Skipped "${name}": ${e.message.slice(0, 80)}`)
    }
  }

  console.log(`\n✅ Done. Inserted: ${inserted}, Skipped (existing): ${skipped}`)
}

main().catch((e) => { console.error('❌', e.message); process.exit(1) }).finally(() => prisma.$disconnect())
