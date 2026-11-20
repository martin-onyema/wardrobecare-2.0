import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
const imageMap = JSON.parse(fs.readFileSync('extracted/scripts/wc-data/image-map.json', 'utf8'))

console.log('=== FIXING PRODUCT IMAGES + FEATURED PRODUCTS ===\n')

// Step 1: Get all products with their images
const products = await db.product.findMany({
  select: { id: true, slug: true, name: true, featured: true },
  take: 1000,
})
console.log(`Found ${products.length} products`)

let updated = 0
let imageFixed = 0

// Step 2: Update images for each product
for (const p of products) {
  const localImages = imageMap[p.slug]
  if (!localImages || localImages.length === 0) continue

  // Delete existing images
  await db.productImage.deleteMany({ where: { productId: p.id } })

  // Create new images from local paths
  for (let i = 0; i < localImages.length; i++) {
    await db.productImage.create({
      data: {
        productId: p.id,
        url: localImages[i],
        altText: p.name,
        position: i,
      },
    })
    imageFixed++
  }
  updated++

  if (updated % 50 === 0) console.log(`  ${updated} products updated, ${imageFixed} images fixed...`)
}

console.log(`\nImages fixed: ${updated} products, ${imageFixed} images`)

// Step 3: Mark 12 products as featured (pick diverse products)
const allProducts = await db.product.findMany({
  where: { published: true, status: 'ACTIVE' },
  select: { id: true, name: true, slug: true, categoryId: true },
  take: 600,
})

// Pick 12 products spread across different categories
const byCategory = new Map()
for (const p of allProducts) {
  if (!byCategory.has(p.categoryId)) byCategory.set(p.categoryId, [])
  byCategory.get(p.categoryId).push(p)
}

const featured = []
for (const [, products] of byCategory) {
  if (products.length > 0) featured.push(products[0])
  if (featured.length >= 12) break
}
// If we don't have 12 from unique categories, fill from the rest
if (featured.length < 12) {
  const featuredIds = new Set(featured.map(p => p.id))
  for (const p of allProducts) {
    if (featured.length >= 12) break
    if (!featuredIds.has(p.id)) {
      featured.push(p)
      featuredIds.add(p.id)
    }
  }
}

// Set featured: true for selected products, false for the rest
await db.product.updateMany({ where: { featured: true }, data: { featured: false } })
for (const p of featured) {
  await db.product.update({ where: { id: p.id }, data: { featured: true } })
}
console.log(`Featured products set: ${featured.length}`)

// Verify
const totalImages = await db.productImage.count()
const featuredCount = await db.product.count({ where: { featured: true } })
console.log(`\n=== FINAL STATUS ===`)
console.log('Total images:', totalImages)
console.log('Featured products:', featuredCount)

await db.$disconnect()
