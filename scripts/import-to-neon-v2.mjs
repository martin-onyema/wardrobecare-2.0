import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()
const data = JSON.parse(fs.readFileSync('extracted/scripts/wc-data/archive.json', 'utf8'))

// Get existing product slugs
const existing = await db.product.findMany({ select: { slug: true } })
const existingSlugs = new Set(existing.map(p => p.slug))
console.log(`Already imported: ${existingSlugs.size}, Remaining: ${data.length - existingSlugs.size}`)

// Get all categories
const cats = await db.category.findMany({ select: { id: true, slug: true } })
const catMap = new Map(cats.map(c => [c.slug, c.id]))

let imported = 0, skipped = 0
const toCreate = []

for (const p of data) {
  if (existingSlugs.has(p.slug)) continue
  if (!p.slug) { skipped++; continue }

  const price = p.archivePrice ? parseInt(p.archivePrice.replace(/[^0-9]/g, '')) / 100 : 0
  let categoryId = null
  if (p.categories) {
    for (const c of p.categories) {
      if (catMap.has(c)) { categoryId = catMap.get(c); break }
    }
  }
  if (!categoryId && p.categories && p.categories.length > 0) {
    // Create the category
    const slug = p.categories[0]
    const name = slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
    try {
      const cat = await db.category.create({ data: { name, slug, active: true } })
      catMap.set(slug, cat.id)
      categoryId = cat.id
    } catch {}
  }
  if (!categoryId) { skipped++; continue }

  toCreate.push({
    name: p.name,
    slug: p.slug,
    description: p.name,
    sku: p.slug.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 25) + '-' + Date.now().toString(36).slice(-4),
    price: price,
    currency: 'NGN',
    categoryId,
    tags: p.tags ? p.tags.join(', ') : null,
    published: true,
    status: 'ACTIVE',
    images: p.archiveImage ? { create: [{ url: p.archiveImage, altText: p.name, position: 0 }] } : undefined,
  })
}

console.log(`Creating ${toCreate.length} products in batches...`)

// Create in batches of 25
for (let i = 0; i < toCreate.length; i += 25) {
  const batch = toCreate.slice(i, i + 25)
  for (const item of batch) {
    try {
      const product = await db.product.create({ data: item })
      await db.productVariant.create({
        data: { productId: product.id, size: 'One Size', stock: 10, lowStockThreshold: 5 }
      })
      imported++
    } catch (e) {
      skipped++
    }
  }
  if ((i / 25) % 4 === 0) console.log(`  ${imported} imported...`)
}

console.log(`\nDone: ${imported} new products, ${skipped} skipped`)
const total = await db.product.count()
console.log(`Total products on Neon: ${total}`)
await db.$disconnect()
