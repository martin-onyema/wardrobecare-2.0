/* Audit every table in the Supabase DB */
const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })

// Use the Prisma model names exactly as they appear in the schema
const models = [
  'user', 'category', 'product', 'productImage', 'productVariant',
  'order', 'orderItem', 'address', 'cartItem', 'wishlistItem',
  'adminSettings', 'coupon', 'banner', 'brand', 'review',
  'serviceEnquiry', 'notification', 'auditLog', 'shippingZone',
  'homepageContent', 'fAQ',
]

async function main() {
  console.log('=== DATABASE STATE — every table ===\n')
  for (const model of models) {
    try {
      const count = await p[model].count()
      const status = count > 0 ? '✅' : '❌'
      console.log(`  ${status}  ${model.padEnd(20)} ${count}`)
    } catch (e) {
      console.log(`  ⚠️  ${model.padEnd(20)} ERROR: ${e.message.slice(0, 60)}`)
    }
  }
}

main().finally(() => p.$disconnect())
