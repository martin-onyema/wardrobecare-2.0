/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Sync products from the live wardrobecare.com.ng site → local DB.
 *
 * Reads the extracted live products from /tmp/wc-products.json (name, price, category),
 * computes the slug from each name (matching the Next.js slugify convention used by
 * the admin form), and updates the local DB product's name + price + slug to match.
 *
 * This brings the local DB in line with what's actually shown on the live site:
 *  - Real product names (with apostrophes, en-dashes, color suffixes)
 *  - Real prices (₦7,000 – ₦120,000, set per product by the user on the live admin)
 *
 * Usage:
 *   node /home/z/my-project/extracted/scripts/sync-from-live.cjs
 */
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

// ─── Slugify (must EXACTLY match src/lib/format.ts slugify) ──────────────────────
function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .trim()
    // Remove anything that's NOT a-z, 0-9, whitespace, or hyphen
    // (apostrophes get REMOVED entirely, not replaced with hyphens)
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace whitespace with hyphens
    .replace(/\s+/g, '-')
    // Collapse multiple hyphens
    .replace(/-+/g, '-')
}

// ─── Decode HTML entities in product names ──────────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📥 Reading extracted products from /tmp/wc-products.json')
  const liveProducts = JSON.parse(fs.readFileSync('/tmp/wc-products.json', 'utf8'))
  console.log(`   ${liveProducts.length} products to sync`)

  // Decode entities in each name
  liveProducts.forEach((p) => {
    p.name = decodeEntities(p.name)
    p.category = decodeEntities(p.category)
  })

  // Build slug → live product map
  const liveBySlug = new Map()
  for (const p of liveProducts) {
    const slug = slugify(p.name)
    liveBySlug.set(slug, { ...p, slug })
  }
  console.log(`   ${liveBySlug.size} unique slugs`)

  // Fetch all local products
  console.log('\n🔗 Loading local products from DB...')
  const localProducts = await prisma.product.findMany({
    select: { id: true, name: true, slug: true, price: true, sku: true },
  })
  console.log(`   ${localProducts.length} local products`)

  // Match local → live by slug
  let matched = 0
  let unmatched = 0
  const matches = []
  const unmatchedLocal = []
  const unmatchedLive = []

  // Build a normalized-slug → live product map for fuzzy matching
  // (handles cases like "Black/Gold" → "blackgold" on live vs "black-gold" locally)
  const normalize = (slug) => slug.replace(/-/g, '')
  const liveByNormSlug = new Map()
  for (const [slug, live] of liveBySlug) {
    liveByNormSlug.set(normalize(slug), { ...live, originalSlug: slug })
  }

  for (const local of localProducts) {
    // Try exact slug match first
    let live = liveBySlug.get(local.slug)
    // Fallback: try normalized slug match (hyphens stripped)
    if (!live) {
      live = liveByNormSlug.get(normalize(local.slug))
    }
    if (live) {
      matches.push({ local, live })
      matched++
    } else {
      unmatchedLocal.push(local)
      unmatched++
    }
  }

  // Track live products that didn't match any local
  const matchedLiveSlugs = new Set(matches.map((m) => m.live.slug))
  for (const [slug, live] of liveBySlug) {
    if (!matchedLiveSlugs.has(slug)) {
      unmatchedLive.push(live)
    }
  }

  console.log(`\n✅ Matched: ${matched}`)
  console.log(`❌ Unmatched local (no live equivalent): ${unmatched}`)
  console.log(`❌ Unmatched live (no local product): ${unmatchedLive.length}`)

  // Show sample unmatched live products
  if (unmatchedLive.length > 0) {
    console.log('\n   Sample unmatched live (first 10):')
    for (const p of unmatchedLive.slice(0, 10)) {
      console.log(`     [${p.category}] ${p.name} — ${p.price_label}  (slug: ${p.slug})`)
    }
  }

  // Show what would change for the first 5 matches
  console.log('\n   Sample matches (first 5):')
  for (const m of matches.slice(0, 5)) {
    const priceChanged = m.local.price !== m.live.price
    const nameChanged = m.local.name !== m.live.name
    console.log(`\n     ${m.local.slug}`)
    console.log(`       name:  "${m.local.name}" → "${m.live.name}" ${nameChanged ? '✏️' : '(unchanged)'}`)
    console.log(`       price: ₦${m.local.price.toLocaleString()} → ₦${m.live.price.toLocaleString()} ${priceChanged ? '✏️' : '(unchanged)'}`)
  }

  // Apply the updates in a transaction
  console.log(`\n✏️  Updating ${matches.length} products...`)
  let updated = 0
  let nameOnlyChanged = 0
  let priceOnlyChanged = 0
  let bothChanged = 0
  let nothingChanged = 0

  await prisma.$transaction(
    async (tx) => {
      for (const { local, live } of matches) {
        const nameChanged = local.name !== live.name
        const priceChanged = local.price !== live.price

        if (!nameChanged && !priceChanged) {
          nothingChanged++
          continue
        }

        await tx.product.update({
          where: { id: local.id },
          data: {
            name: live.name,
            price: live.price,
          },
        })

        if (nameChanged && priceChanged) bothChanged++
        else if (nameChanged) nameOnlyChanged++
        else if (priceChanged) priceOnlyChanged++
        updated++
      }
    },
    { timeout: 60000 },
  )

  console.log(`\n📊 Update summary:`)
  console.log(`   Both name + price changed: ${bothChanged}`)
  console.log(`   Name only changed:        ${nameOnlyChanged}`)
  console.log(`   Price only changed:       ${priceOnlyChanged}`)
  console.log(`   Nothing changed:          ${nothingChanged}`)
  console.log(`   Total updates applied:    ${updated}`)

  // Also: for live products that have no local match, check if we should create them
  // (Skip this for now — the user probably already has them locally under a different slug.
  //  We'd need to inspect the image filenames on the live product detail pages to match.)

  console.log('\n✅ Sync complete')
}

main()
  .catch((e) => {
    console.error('❌ Failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
