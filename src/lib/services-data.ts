/**
 * Wardrobecare Services — static catalogue.
 *
 * Services are content-driven, not user-editable, so we keep them in code
 * (not the database). Enquiries against services ARE stored in the DB
 * (see `ServiceEnquiry` Prisma model).
 *
 * To edit a service: update this file. To add a new service: append to the
 * array — the sitemap, nav mega-menu, /services grid and /services/[slug]
 * route will all pick it up automatically.
 */

export type ServiceCategory = 'Diagnostic' | 'Sourcing' | 'Gifting' | 'Cultural' | 'Tailoring'

export type ServiceFaq = {
  q: string
  a: string
}

/** A single line in an itemised price list — e.g. "Trouser hem — ₦5,000". */
export type PriceListItem = {
  label: string
  /** Price in NGN (integer) */
  amount: number
  /** Optional note under the label */
  note?: string
}

/**
 * Optional itemised price list — used by services like Amendments & Alterations
 * where there's a per-fix menu instead of a single starting price.
 * When present, the service detail page renders this as a table + optional
 * mandatory fee banner.
 */
export type PriceList = {
  /** Per-item rows. */
  items: PriceListItem[]
  /** Optional mandatory fee applied per order, regardless of item count. */
  mandatoryFee?: {
    label: string
    description?: string
    amount: number
  }
  /** Optional notes that appear below the price list. */
  notes?: { lead: string; body: string }[]
}

export type Service = {
  /** URL slug — also stored on ServiceEnquiry rows. */
  slug: string
  /** Display number, e.g. "01". */
  number: string
  /** High-level category — used for grouping on /services. */
  category: ServiceCategory
  /** Service name. */
  name: string
  /** Short tagline used on cards. */
  tagline: string
  /** Longer description used on the service page hero. */
  description: string
  /** Distinguished lifestyle image — Unsplash CDN. */
  image: string
  /** Image alt text. */
  imageAlt: string
  /** Starting price in NGN, numeric (e.g. 45000). */
  startingPrice: number
  /** Human-readable price label, e.g. "From ₦45,000". */
  priceLabel: string
  /** Pricing unit, e.g. "Per trip", "Per session". */
  priceUnit: string
  /** One-line pricing note shown below the price. */
  priceNote?: string
  /** Optional itemised price list (overrides the single-price display). */
  priceList?: PriceList
  /** "Who it's for" bullets. */
  whoFor: string[]
  /** "What's included / How it works" — numbered steps or bullets. */
  whatsIncluded: { step?: string; title: string; body: string }[]
  /** Testimonial / social proof. */
  testimonial?: { quote: string; author: string; role: string }
  /** FAQ list. */
  faqs: ServiceFaq[]
  /** Final CTA copy. */
  finalCta: { title: string; body: string; button: string }
  /** Whether to feature on homepage (4 featured services). */
  featured: boolean
  /** Optional badge label shown on the card (e.g. "Most popular", "Per trip"). */
  badge?: string
  /** When true, the service is greyed out, has no price, and is not bookable. */
  comingSoon?: boolean
}

export const SERVICES: Service[] = [
  {
    slug: 'wardrobe-consultation',
    number: '01',
    category: 'Diagnostic',
    name: 'Wardrobe & Style Consultation',
    tagline:
      'One session that defines your style direction and reviews what you own — your palette, your silhouette, your wardrobe gaps.',
    description:
      'A focused 90-minute session that combines a personal style direction with a practical review of what you own. You leave with a defined palette, silhouette, and a clear picture of what to keep, retire, and add next.',
    image: '/services/wardrobe-consultation.jpg',
    imageAlt: 'A man reviewing a curated style moodboard alongside his wardrobe during a consultation',
    startingPrice: 35000,
    priceLabel: 'From ₦35,000',
    priceUnit: '1 session',
    priceNote: '90-minute consultation · in-person or video call',
    featured: true,
    badge: 'Most popular',
    whoFor: [
      'You feel stuck in a style rut and want a clearer direction',
      "You're transitioning roles — new job, new industry, new city",
      'You have a full wardrobe but nothing to wear and want to know why',
      'You want a defined palette, silhouette, and a real shopping plan',
    ],
    whatsIncluded: [
      {
        step: '01',
        title: 'Questionnaire',
        body: 'You complete a short style + lifestyle questionnaire before the session. Photos of three outfits you love and three you don\'t help, but aren\'t required.',
      },
      {
        step: '02',
        title: 'Consultation',
        body: 'A 90-minute conversation — what you wear now, what you want to wear, what\'s holding you back. We define your palette, silhouette, and aesthetic.',
      },
      {
        step: '03',
        title: 'Wardrobe Review',
        body: 'Together we walk through what you own (in-person for Lagos clients, by photographs elsewhere). What stays, what to alter, what to retire, what\'s missing.',
      },
      {
        step: '04',
        title: 'Style Direction & Plan',
        body: 'You leave with a written style direction: palette, silhouette, references, and a 12-month shopping plan that prioritises the gaps and matches them to specific brands and price points.',
      },
    ],
    testimonial: {
      quote:
        'I\'d been wearing the same three outfits for years and had a wardrobe full of pieces I never wore. One session gave me a framework I still use every time I shop — and a clear list of what to actually buy next.',
      author: 'Femi O.',
      role: 'Tech founder, Lagos',
    },
    faqs: [
      {
        q: 'Is this in person or virtual?',
        a: 'Both options are available and equally effective. The virtual session uses a shared moodboard throughout. In-person sessions in Lagos can also include a walk through your wardrobe in the second half.',
      },
      {
        q: 'Do I need to prepare anything?',
        a: 'Just the questionnaire we send on booking. Photos of three outfits you love and three you don\'t also help, but aren\'t required. If you want the wardrobe review portion, have your wardrobe accessible or photographed.',
      },
      {
        q: 'How is this different from a Wardrobe Audit?',
        a: 'It isn\'t — we combined them. The old "Style Consultation" defined direction without reviewing what you owned; the old "Wardrobe Consultation" reviewed what you owned without setting a direction. Doing only one was always half the job. This single session covers both.',
      },
      {
        q: 'Can I extend this into a full wardrobe rebuild?',
        a: 'Yes. Many clients use the consultation as the diagnostic, then book Personal Shopping trips to source the gaps in the plan.',
      },
    ],
    finalCta: {
      title: 'Define your style direction in one session.',
      body: 'A 90-minute consultation that gives you a clear, defensible framework for every future purchase — and a real plan for your wardrobe.',
      button: 'Book a Consultation',
    },
  },

  {
    slug: 'personal-shopping',
    number: '02',
    category: 'Sourcing',
    name: 'Personal Shopping',
    tagline:
      'We shop for you, sourcing pieces to your brief, budget, taste, and occasion — including hard-to-find or specialty pieces.',
    description:
      'Give us the brief — occasion, budget, taste, or something specific and hard to find. You review a curated shortlist and only pay for what you keep.',
    image: '/services/personal-shopping-hero.jpg',
    imageAlt: 'A curated rail of distinguished menswear pieces styled for a personal shopping brief',
    startingPrice: 45000,
    priceLabel: 'From ₦45,000',
    priceUnit: 'Per trip',
    priceNote: 'Styling fee per trip · sourcing cost separate',
    featured: true,
    badge: 'Per trip',
    whoFor: [
      "You know what you need but don't have time to shop for it",
      'You want options curated to your taste, not endless scrolling',
      "You're looking for something specific or hard to find",
      "You'd rather review a shortlist than browse a full store",
    ],
    whatsIncluded: [
      { step: '01', title: 'Brief', body: 'Tell us what you need, your budget, sizing, and anything specific or hard-to-find.' },
      { step: '02', title: 'Sourcing', body: 'We pull options across our vetted network of suppliers.' },
      { step: '03', title: 'Shortlist', body: 'You review a curated set and approve what to purchase.' },
      { step: '04', title: 'In-Person Fitting (Optional)', body: 'Want to try before you buy? We can come to your home or office for a fitting session — at no extra cost when bundled with a Personal Shopping brief. Available within Lagos mainland and island.' },
    ],
    testimonial: {
      quote:
        'I needed three outfits for a work trip and didn\'t have time to leave the office. They delivered a shortlist the next morning. I kept everything.',
      author: 'Tunde A.',
      role: 'Investment banker, Lagos',
    },
    faqs: [
      { q: 'Do I have to buy everything shortlisted?', a: 'No. You only pay for what you decide to keep. The styling fee covers our time sourcing and curating — not the items themselves.' },
      { q: 'Can this be done without meeting in person?', a: 'Yes. We work over WhatsApp and email. You can review the shortlist digitally and approve remotely.' },
      { q: 'Do you offer in-person fittings?', a: 'Yes. As part of your Personal Shopping brief, we can come to your home or office for a fitting session — at no extra cost. We bring a curated rail, take your measurements, and fit pieces on the spot. Available within Lagos mainland and island.' },
      { q: 'Do you source from outside Lagos?', a: 'Yes — we have supplier relationships across Lagos, Abuja, and internationally. Sourcing lead time depends on the brief.' },
      { q: 'Can you find hard-to-find or specialty pieces?', a: 'Yes. Sourcing specialty items is part of the service — we work our network to find pieces that aren\'t on the shelf.' },
    ],
    finalCta: {
      title: 'Send us your brief — we\'ll do the shopping.',
      body: 'Tell us what you need, when you need it, and the budget you\'re working with. We\'ll come back with a shortlist within 48 hours.',
      button: 'Start Your Brief',
    },
  },


  {
    slug: 'outfit-gifting',
    number: '03',
    category: 'Gifting',
    name: 'Outfit Gifting',
    tagline:
      'Give someone a complete, thoughtfully styled outfit curated around their taste, size, and occasion.',
    description:
      'A complete styled outfit, curated around the recipient\'s taste and size, delivered for a birthday, anniversary, wedding, or just because.',
    image: '/services/outfit-gifting-m.jpg',
    imageAlt: 'A beautifully wrapped gift box containing a styled menswear outfit',
    startingPrice: 40000,
    priceLabel: 'From ₦40,000',
    priceUnit: 'Per gift',
    priceNote: 'Styling + gift wrapping · item cost separate',
    featured: true,
    badge: 'Per gift',
    whoFor: [
      'You want to gift clothing but don\'t know their size or taste',
      'You want a complete outfit, not just a single piece',
      'You want it beautifully presented',
      'You\'re gifting for a specific occasion — wedding, birthday, anniversary',
    ],
    whatsIncluded: [
      { step: '01', title: 'Recipient Brief', body: 'You tell us about them — taste, size if known, occasion, budget.' },
      { step: '02', title: 'Curate', body: 'We assemble a complete outfit (e.g. shirt + trousers + accessory) around the brief.' },
      { step: '03', title: 'Present', body: 'Distinguished gift-wrapped and delivered with a handwritten note.' },
    ],
    testimonial: {
      quote:
        'I gifted my brother a full outfit for his 30th. They handled everything — sizing, styling, wrapping, delivery. He still talks about it.',
      author: 'Ngozi M.',
      role: 'Gifting client, Lagos',
    },
    faqs: [
      { q: 'What if it doesn\'t fit?', a: 'All gifting outfits include one free size exchange within 7 days of delivery.' },
      { q: 'Can you deliver on a specific date?', a: 'Yes — specify the date in the brief and we\'ll confirm scheduling before you pay.' },
      { q: 'Can I see the outfit before it\'s delivered?', a: 'Yes. We can send a preview for your approval, or deliver as a complete surprise.' },
    ],
    finalCta: {
      title: 'Give a wardrobe moment, not just a gift.',
      body: 'A complete styled outfit, beautifully presented. Tell us who it\'s for and we\'ll handle the rest.',
      button: 'Plan a Gift',
    },
  },

  {
    slug: 'traditional-wear-consultation',
    number: '04',
    category: 'Cultural',
    name: 'Traditional Wear Consultation',
    tagline:
      'Agbada, kaftan, senator, and ceremonial wear — styled correctly for the occasion, culture, and your build.',
    description:
      'Agbada, kaftan, senator, and ceremonial wear — styled correctly for the occasion, the culture, and your build. We coordinate fabric, accessories, and tailoring.',
    image: '/services/traditional-wear-consultation.jpg',
    imageAlt: 'A finely tailored agbada displayed for a traditional wear consultation',
    startingPrice: 120000,
    priceLabel: 'From ₦120,000',
    priceUnit: 'Per occasion',
    priceNote: 'Per occasion · fabric & tailoring costs separate',
    featured: false,
    comingSoon: true,
    badge: 'Coming Soon',
    whoFor: [
      'You have a wedding, chieftaincy, or ceremonial event coming up',
      'You want traditional wear styled correctly for your culture',
      'You want to coordinate looks with family or an entourage',
      'You want the right fabric, cap, and accessories paired together',
    ],
    whatsIncluded: [
      { title: 'Occasion & cultural briefing', body: 'We start with the event, the culture, and your role in it.' },
      { title: 'Fabric and cap/accessory pairing guidance', body: 'Fabric choices, cap pairing, beads, shoes — every element considered.' },
      { title: 'Tailor referral for made-to-measure pieces', body: 'We refer trusted ateliers for agbada, kaftan, and senator styles.' },
      { title: 'Coordination with family or entourage looks', body: 'If others are dressing with you, we coordinate so the looks read as one.' },
    ],
    testimonial: {
      quote:
        'My father\'s chieftaincy was a once-in-a-lifetime event. They styled all four of us — me, my brothers, and my dad — and every detail was right.',
      author: 'Kunle A.',
      role: 'Chieftaincy client, Ibadan',
    },
    faqs: [
      { q: 'Do you provide the fabric?', a: 'We can. We also work with fabric you provide — particularly if it\'s a family piece or culturally significant.' },
      { q: 'Which cultures do you cover?', a: 'All major Nigerian ceremonial traditions — Yoruba, Igbo, Hausa, Benin, and more. Brief us on the specific occasion and we\'ll confirm.' },
      { q: 'How far ahead should I book?', a: 'For made-to-measure pieces, 4–6 weeks minimum. For styling only, 2 weeks is usually enough.' },
    ],
    finalCta: {
      title: 'Style your next occasion correctly.',
      body: 'Whether it\'s a wedding, a chieftaincy, or a naming ceremony — join the waitlist and we\'ll be in touch when bookings open.',
      button: 'Join the Waitlist',
    },
  },

  {
    slug: 'amendments-alterations',
    number: '05',
    category: 'Tailoring',
    name: 'Amendments & Alterations',
    tagline:
      'Tailoring fixes and adjustments for any garment — not just pieces bought from Wardrobecare. Hems, slimming, sleeve shortening, repairs, and more.',
    description:
      'Tailoring fixes and adjustments for any garment — not just pieces bought from Wardrobecare. Hems, slimming, sleeve shortening, repairs, and more.',
    image: '/services/amendments-alterations.jpg',
    imageAlt: 'A tailor making an alteration to a garment on a sewing machine',
    startingPrice: 5000,
    priceLabel: 'From ₦5,000',
    priceUnit: 'Per alteration',
    priceNote: 'Per alteration · mandatory ₦20,000 service & handling fee per order',
    featured: false,
    badge: 'Per alteration',
    whoFor: [
      'Something you own no longer fits quite right',
      'A new piece needs a small adjustment before it\'s wearable',
      'You want a quick repair, not a full re-tailor',
      'The item didn\'t come from Wardrobecare — that\'s fine, we still take it',
    ],
    whatsIncluded: [
      { step: '01', title: 'Tell Us What\'s Needed', body: 'Garment type and the alteration(s) required, photos optional.' },
      { step: '02', title: 'Pick-up', body: 'We collect the item(s) at a time that works for you.' },
      { step: '03', title: 'Drop-off', body: 'Altered items returned to you, ready to wear.' },
    ],
    priceList: {
      items: [
        { label: 'Trouser hem (shorten/lengthen)', amount: 5000 },
        { label: 'Waist adjustment (trouser)', amount: 7000 },
        { label: 'Sleeve shortening — shirt', amount: 5000 },
        { label: 'Sleeve shortening — blazer/jacket', amount: 10000 },
        { label: 'Take in / let out sides — blazer/jacket', amount: 15000 },
        { label: 'Take in / let out sides — shirt', amount: 6000 },
        { label: 'Take in / let out sides — t-shirt', amount: 5000 },
        { label: 'Take in / let out sides — jean/pant', amount: 6000 },
        { label: 'Tear/rib/gash repair', amount: 5000 },
        { label: 'Button replacement', amount: 5000 },
        { label: 'Zipper replacement', amount: 5000 },
      ],
      mandatoryFee: {
        label: 'Service & Handling Fee',
        description:
          'Mandatory on every order — covers pick-up/drop-off logistics, supervision, and expertise, regardless of item count.',
        amount: 20000,
      },
      notes: [
        {
          lead: 'Need something not listed here?',
          body: 'Contact us for a custom quote — if the job can be done, we\'ll price it for you.',
        },
        {
          lead: 'Outside our standard pick-up/drop-off area?',
          body: 'Further locations are quoted case by case, confirmed before you book.',
        },
      ],
    },
    faqs: [
      { q: 'What does this service cover?', a: 'Tailoring fixes and adjustments for any garment — hems, waist adjustments, slimming, sleeve shortening, repairs, and button or zipper replacement. It doesn\'t have to be something you bought from us.' },
      { q: 'How is it priced?', a: 'Per alteration — each fix has its own price, and you can combine several on one order. On top of that, a Service & Handling fee applies to every order, covering pick-up, drop-off, supervision, and expertise.' },
      { q: 'Is the Service & Handling fee optional?', a: 'No — it\'s mandatory on every Amendments & Alterations order, regardless of how many items you bring, since pick-up, drop-off, and oversight happen either way.' },
      { q: 'How does pick-up and drop-off work?', a: 'We collect the item(s) from you, complete the work, and return them once finished — just tell us a pick-up time and address when you book.' },
      { q: "What if my alteration isn't on the price list?", a: 'Contact us for a custom quote. If the job can be done, we\'ll price it for you after seeing the garment and the work involved.' },
      { q: "What if I'm outside your usual pick-up area?", a: "That's handled case by case — let us know your location and we'll confirm whether it's covered and what it costs before you book." },
    ],
    finalCta: {
      title: 'Send us a photo — we\'ll quote it.',
      body: 'Tell us what needs fixing on what garment. We\'ll come back with a quote and a pick-up time.',
      button: 'Book an Alteration',
    },
  },
]

// ---- Groupings shown on /services ----

export type ServiceGroup = {
  label: string
  description: string
  services: Service[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: 'Find Your Direction',
    description: 'Define, audit, and direct your style.',
    services: SERVICES.filter((s) => s.category === 'Diagnostic'),
  },
  {
    label: 'Let Us Shop For You',
    description: 'We find it, you approve it.',
    services: SERVICES.filter((s) => s.category === 'Sourcing'),
  },
  {
    label: 'An Occasion, or For Someone Else',
    description: 'One-off services for a specific moment.',
    services: SERVICES.filter((s) => s.category === 'Gifting' || s.category === 'Cultural'),
  },
  {
    label: 'Tailoring & Alterations',
    description: 'Fixes, hems, and repairs — for any garment.',
    services: SERVICES.filter((s) => s.category === 'Tailoring'),
  },
]

// ---- Helpers ----

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured)
}

export function getRelatedServices(currentSlug: string, limit = 3): Service[] {
  const current = getServiceBySlug(currentSlug)
  if (!current) return SERVICES.slice(0, limit)
  // Same category first, then fill from the rest
  const sameCategory = SERVICES.filter((s) => s.slug !== currentSlug && s.category === current.category)
  const others = SERVICES.filter((s) => s.slug !== currentSlug && s.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}
