import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const data = JSON.parse(fs.readFileSync('extracted/scripts/wc-data/archive.json', 'utf8'))
console.log(`Importing ${data.length} products...`)

// Step 1: Create categories from the unique slugs
const catSlugs = [...new Set(data.flatMap(p => p.categories))]
console.log(`Creating ${catSlugs.length} categories...`)

for (const slug of catSlugs) {
  // Convert slug to display name
  const name = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/\bNigeria\b/g, 'Nigeria')
    .replace(/\bIn\b/g, 'in')

  await db.category.upsert({
    where: { slug },
    create: { name, slug, active: true, parentId: null },
    update: {},
  })
}
console.log('Categories created.')

// Step 2: Import products
let imported = 0
let skipped = 0

for (const p of data) {
  try {
    const price = p.archivePrice ? parseInt(p.archivePrice.replace(/[^0-9]/g, '')) / 100 : 0

    // Skip if no slug
    if (!p.slug) {
      skipped++
      continue
    }

    // Find or create the primary category
    let categoryId = null
    if (p.categories && p.categories.length > 0) {
      const cat = await db.category.findUnique({ where: { slug: p.categories[0] } })
      if (cat) categoryId = cat.id
    }

    // Skip if no category found
    if (!categoryId) {
      skipped++
      continue
    }

    // Create SKU from slug
    const sku = p.slug.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 30)

    // Check if product already exists
    const existing = await db.product.findUnique({ where: { slug: p.slug } }).catch(() => null)

    if (existing) {
      // Update price and name
      await db.product.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          price: price,
          published: p.inStock !== false,
        },
      })
      imported++
      continue
    }

    // Create product
    const product = await db.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.name, // minimal description from name
        sku: sku + '-' + Date.now().toString(36).slice(-4), // unique SKU
        price: price,
        currency: 'NGN',
        categoryId,
        tags: p.tags ? p.tags.join(', ') : null,
        published: p.inStock !== false,
        status: 'ACTIVE',
        published: true,
        images: p.archiveImage ? {
          create: [{ url: p.archiveImage, altText: p.name, position: 0 }],
        } : undefined,
      },
    })

    // Create a default variant with stock
    await db.productVariant.create({
      data: {
        productId: product.id,
        size: 'One Size',
        stock: 10,
        lowStockThreshold: 5,
      },
    })

    imported++
    if (imported % 50 === 0) console.log(`  ${imported} imported...`)
  } catch (e) {
    console.error(`  Skip "${p.slug}": ${e.message.slice(0, 80)}`)
    skipped++
  }
}

console.log(`\nDone: ${imported} imported, ${skipped} skipped`)
await db.$disconnect()
