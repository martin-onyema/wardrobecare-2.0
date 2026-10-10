/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Seed the missing CMS/admin tables on Supabase:
 *   - AdminSettings (store name, WhatsApp, Paystack public key, social links)
 *   - HomepageContent (hero text, Instagram handle, featured subtitle)
 *   - FAQs (the FAQ categories + items)
 *   - ShippingZones + ShippingMethods (Lagos, Abuja, nationwide defaults)
 *   - PromotionalBanner (announcement bar)
 *   - Brands (auto-detect from existing product tags)
 */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })

async function main() {
  console.log('🌱 Seeding missing tables on Supabase...\n')

  // ─── 1. AdminSettings ─────────────────────────────────────────────────────
  console.log('→ Seeding AdminSettings...')
  const existingSettings = await prisma.adminSettings.findFirst()
  if (!existingSettings) {
    await prisma.adminSettings.create({
      data: {
        id: 'singleton',
        storeName: 'Wardrobecare Clothing',
        storeTagline: "Your #1 Personal Shopper for premium men's fashion.",
        whatsappNumber: '+2348030000000',
        whatsappEnabled: true,
        paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        paystackEnabled: true,
        instagramUrl: 'https://instagram.com/wardrobecareng',
        supportEmail: 'codes@wardrobecare.com.ng',
        defaultDeliveryFee: 2500,
        freeDeliveryThreshold: 50000,
      },
    })
    console.log('  ✅ AdminSettings created')
  } else {
    console.log('  ✓ AdminSettings already exists')
  }

  // ─── 2. HomepageContent ──────────────────────────────────────────────────
  console.log('→ Seeding HomepageContent...')
  const existingContent = await prisma.homepageContent.findFirst()
  if (!existingContent) {
    await prisma.homepageContent.create({
      data: {
        heroTitle: 'A service built around your style.',
        heroSubtitle: 'Personal shopping, wardrobe consultations, home fittings and more — guided by a real stylist, built around how you live and dress.',
        heroImage: '/services/hero.jpg',
        heroPrimaryCta: 'EXPLORE SERVICES',
        heroPrimaryHref: '/services',
        heroSecondaryCta: 'SHOP PIECES',
        heroSecondaryHref: '/shop',
        featuredSubtitle: 'Curated pieces for work, weekends, evenings and every occasion in between.',
        instagramHandle: 'wardrobecareng',
        instagramTitle: '@wardrobecareng',
      },
    })
    console.log('  ✅ HomepageContent created')
  } else {
    console.log('  ✓ HomepageContent already exists')
  }

  // ─── 3. ShippingZones + ShippingMethods ───────────────────────────────────
  console.log('→ Seeding ShippingZones...')
  const existingZones = await prisma.shippingZone.count()
  if (existingZones === 0) {
    const zones = [
      { name: 'Lagos', states: '["Lagos"]', methods: [
        { name: 'Standard Delivery', baseCost: 2000, estimatedDaysMin: 1, estimatedDaysMax: 2 },
        { name: 'Express Delivery', baseCost: 3500, estimatedDaysMin: 1, estimatedDaysMax: 1 },
      ]},
      { name: 'Abuja', states: '["Abuja"]', methods: [
        { name: 'Standard Delivery', baseCost: 3500, estimatedDaysMin: 2, estimatedDaysMax: 3 },
      ]},
      { name: 'South West', states: '["Oyo","Ogun","Osun","Ondo","Ekiti","Kwara"]', methods: [
        { name: 'Standard Delivery', baseCost: 4000, estimatedDaysMin: 2, estimatedDaysMax: 4 },
      ]},
      { name: 'South East', states: '["Anambra","Imo","Enugu","Abia","Ebonyi"]', methods: [
        { name: 'Standard Delivery', baseCost: 4500, estimatedDaysMin: 3, estimatedDaysMax: 5 },
      ]},
      { name: 'South South', states: '["Rivers","Delta","Edo","Cross River","Akwa Ibom","Bayelsa"]', methods: [
        { name: 'Standard Delivery', baseCost: 4500, estimatedDaysMin: 3, estimatedDaysMax: 5 },
      ]},
      { name: 'North Central', states: '["Plateau","Benue","Kogi","Nasarawa","Niger"]', methods: [
        { name: 'Standard Delivery', baseCost: 5000, estimatedDaysMin: 3, estimatedDaysMax: 5 },
      ]},
      { name: 'North West', states: '["Kano","Kaduna","Sokoto","Katsina","Jigawa","Zamfara","Kebbi"]', methods: [
        { name: 'Standard Delivery', baseCost: 5500, estimatedDaysMin: 4, estimatedDaysMax: 6 },
      ]},
      { name: 'North East', states: '["Borno","Yobe","Bauchi","Gombe","Adamawa","Taraba"]', methods: [
        { name: 'Standard Delivery', baseCost: 5500, estimatedDaysMin: 4, estimatedDaysMax: 6 },
      ]},
    ]
    for (const z of zones) {
      const zone = await prisma.shippingZone.create({
        data: { name: z.name, states: z.states, active: true },
      })
      for (const m of z.methods) {
        await prisma.shippingMethod.create({
          data: { ...m, zoneId: zone.id, active: true },
        })
      }
    }
    console.log(`  ✅ ${zones.length} shipping zones + methods created`)
  } else {
    console.log(`  ✓ ${existingZones} shipping zones already exist`)
  }

  // ─── 4. FAQ ──────────────────────────────────────────────────────────────
  console.log('→ Seeding FAQs...')
  const existingFaqs = await prisma.fAQ.count()
  if (existingFaqs === 0) {
    const faqs = [
      { category: 'About Wardrobecare', question: 'What is Wardrobecare?', answer: "A Lagos-based menswear and personal styling business built around one idea: dressing well shouldn't require guesswork. We pair a curated retail edit with real styling expertise." },
      { category: 'About Wardrobecare', question: 'What makes Wardrobecare different?', answer: "Most clothing shops stop at checkout — we start there. Every service is built around answering a real question first: what actually fits you, what works together, what's worth buying." },
      { category: 'About Wardrobecare', question: 'Who is Wardrobecare for?', answer: "Any man who wants to look put-together without spending hours figuring out how — whether that's for the office, church, a wedding, or an ordinary Tuesday." },
      { category: 'About Wardrobecare', question: 'Do I need to visit a store in person?', answer: "Not necessarily. A large part of how we work happens over WhatsApp and video call, so you can be styled and shop without ever walking into a physical space." },
      { category: 'Products', question: 'What do you sell?', answer: "Menswear essentials and accessories — shirts, trousers, jackets, blazers, suits, footwear, belts, ties, wallets, fragrance and grooming essentials, and more." },
      { category: 'Products', question: 'Can I buy a complete outfit?', answer: "Either way works. Buy individual items on your own, or hand the brief to Personal Shopping and let us put a full look together for you." },
      { category: 'Products', question: 'Do you have different price levels?', answer: "Yes — our range spans Essential, Classic, and Signature tiers, depending on stock." },
      { category: 'Products', question: 'Is everything shown always in stock?', answer: "Stock moves quickly, so please confirm an item's availability, colour, and size with us before paying." },
      { category: 'Services', question: 'What services do you offer?', answer: "Six services: Wardrobe & Style Consultation, Personal Shopping, Home Fitting, Outfit Gifting, Traditional Wear Consultation (coming soon), and Amendments & Alterations." },
      { category: 'Services', question: 'How do I book a service?', answer: "Visit the Services page, choose the service you need, and fill out the enquiry form or booking wizard. We respond within 24 hours." },
      { category: 'Shipping', question: 'Do you deliver nationwide?', answer: "Yes — we deliver across Nigeria. Delivery fees vary by location and are calculated at checkout." },
      { category: 'Shipping', question: 'How long does delivery take?', answer: "Lagos: 1-2 business days. Other cities: 2-5 business days depending on the zone." },
      { category: 'Shipping', question: 'Is there free delivery?', answer: "Yes — complimentary delivery on orders over ₦50,000." },
      { category: 'Orders', question: 'How do I track my order?', answer: "Visit the Order Tracking page and enter your order number. You will see the current status and tracking information once your order has been shipped." },
      { category: 'Orders', question: 'Can I return or exchange an item?', answer: "Yes — returns and exchanges are accepted within 7 days of delivery, provided the item is unworn with tags attached." },
      { category: 'Orders', question: 'What payment methods do you accept?', answer: "Paystack (cards, bank transfer, USSD) at checkout. Cash on delivery is available in select Lagos areas." },
      { category: 'Amendments & Alterations', question: 'What does this service cover?', answer: "Tailoring fixes and adjustments for any garment — hems, waist adjustments, slimming, sleeve shortening, repairs, and button or zipper replacement." },
      { category: 'Amendments & Alterations', question: 'How is it priced?', answer: "Per alteration — each fix has its own price, plus a mandatory ₦20,000 Service & Handling fee per order covering pick-up/drop-off." },
      { category: 'Amendments & Alterations', question: 'Is the Service & Handling fee optional?', answer: "No — it's mandatory on every order, regardless of how many items you bring." },
      { category: 'Amendments & Alterations', question: 'How does pick-up and drop-off work?', answer: "We collect the item(s) from you, complete the work, and return them once finished — just tell us a pick-up time and address when you book." },
      { category: 'Amendments & Alterations', question: "What if my alteration isn't on the price list?", answer: "Contact us for a custom quote. If the job can be done, we'll price it for you after seeing the garment." },
    ]
    for (let i = 0; i < faqs.length; i++) {
      await prisma.fAQ.create({ data: { ...faqs[i], order: i, published: true } })
    }
    console.log(`  ✅ ${faqs.length} FAQs created`)
  } else {
    console.log(`  ✓ ${existingFaqs} FAQs already exist`)
  }

  // ─── 5. PromotionalBanner ────────────────────────────────────────────────
  console.log('→ Seeding PromotionalBanner...')
  const existingBanners = await prisma.promotionalBanner.count()
  if (existingBanners === 0) {
    await prisma.promotionalBanner.create({
      data: {
        title: 'Book a wardrobe consultation this week',
        subtitle: 'Personal shopping via WhatsApp · Complimentary delivery over ₦50,000',
        active: true,
        order: 0,
      },
    })
    console.log('  ✅ Banner created')
  } else {
    console.log(`  ✓ ${existingBanners} banner(s) already exist`)
  }

  // ─── 6. Brands ────────────────────────────────────────────────────────────
  console.log('→ Seeding Brands from product tags...')
  const existingBrands = await prisma.brand.count()
  if (existingBrands === 0) {
    const products = await prisma.product.findMany({ select: { tags: true }, distinct: ['tags'] })
    const brandSet = new Set()
    for (const p of products) {
      if (p.tags) brandSet.add(p.tags)
    }
    let brandCount = 0
    for (const name of brandSet) {
      if (!name) continue
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      try {
        await prisma.brand.upsert({ where: { slug }, update: {}, create: { name, slug } })
        brandCount++
      } catch {}
    }
    console.log(`  ✅ ${brandCount} brands created`)
  } else {
    console.log(`  ✓ ${existingBrands} brands already exist`)
  }

  console.log('\n✅ All missing tables seeded!')
}

main()
  .catch((e) => { console.error('❌', e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())
