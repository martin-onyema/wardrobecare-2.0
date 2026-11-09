module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'error',
        'warn'
    ] : "TURBOPACK unreachable",
    datasources: process.env.DATABASE_URL ? {
        db: {
            url: process.env.DATABASE_URL
        }
    } : undefined
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/lib/services-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "SERVICES",
    ()=>SERVICES,
    "SERVICE_GROUPS",
    ()=>SERVICE_GROUPS,
    "getFeaturedServices",
    ()=>getFeaturedServices,
    "getRelatedServices",
    ()=>getRelatedServices,
    "getServiceBySlug",
    ()=>getServiceBySlug
]);
const SERVICES = [
    {
        slug: 'wardrobe-consultation',
        number: '01',
        category: 'Diagnostic',
        name: 'Wardrobe & Style Consultation',
        tagline: 'One session that defines your style direction and reviews what you own — your palette, your silhouette, your wardrobe gaps.',
        description: 'A focused 90-minute session that combines a personal style direction with a practical review of what you own. You leave with a defined palette, silhouette, and a clear picture of what to keep, retire, and add next.',
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
            'You want a defined palette, silhouette, and a real shopping plan'
        ],
        whatsIncluded: [
            {
                step: '01',
                title: 'Questionnaire',
                body: 'You complete a short style + lifestyle questionnaire before the session. Photos of three outfits you love and three you don\'t help, but aren\'t required.'
            },
            {
                step: '02',
                title: 'Consultation',
                body: 'A 90-minute conversation — what you wear now, what you want to wear, what\'s holding you back. We define your palette, silhouette, and aesthetic.'
            },
            {
                step: '03',
                title: 'Wardrobe Review',
                body: 'Together we walk through what you own (in-person for Lagos clients, by photographs elsewhere). What stays, what to alter, what to retire, what\'s missing.'
            },
            {
                step: '04',
                title: 'Style Direction & Plan',
                body: 'You leave with a written style direction: palette, silhouette, references, and a 12-month shopping plan that prioritises the gaps and matches them to specific brands and price points.'
            }
        ],
        testimonial: {
            quote: 'I\'d been wearing the same three outfits for years and had a wardrobe full of pieces I never wore. One session gave me a framework I still use every time I shop — and a clear list of what to actually buy next.',
            author: 'Femi O.',
            role: 'Tech founder, Lagos'
        },
        faqs: [
            {
                q: 'Is this in person or virtual?',
                a: 'Both options are available and equally effective. The virtual session uses a shared moodboard throughout. In-person sessions in Lagos can also include a walk through your wardrobe in the second half.'
            },
            {
                q: 'Do I need to prepare anything?',
                a: 'Just the questionnaire we send on booking. Photos of three outfits you love and three you don\'t also help, but aren\'t required. If you want the wardrobe review portion, have your wardrobe accessible or photographed.'
            },
            {
                q: 'How is this different from a Wardrobe Audit?',
                a: 'It isn\'t — we combined them. The old "Style Consultation" defined direction without reviewing what you owned; the old "Wardrobe Consultation" reviewed what you owned without setting a direction. Doing only one was always half the job. This single session covers both.'
            },
            {
                q: 'Can I extend this into a full wardrobe rebuild?',
                a: 'Yes. Many clients use the consultation as the diagnostic, then book Personal Shopping trips to source the gaps in the plan.'
            }
        ],
        finalCta: {
            title: 'Define your style direction in one session.',
            body: 'A 90-minute consultation that gives you a clear, defensible framework for every future purchase — and a real plan for your wardrobe.',
            button: 'Book a Consultation'
        }
    },
    {
        slug: 'personal-shopping',
        number: '02',
        category: 'Sourcing',
        name: 'Personal Shopping',
        tagline: 'We shop for you, sourcing pieces to your brief, budget, taste, and occasion — including hard-to-find or specialty pieces.',
        description: 'Give us the brief — occasion, budget, taste, or something specific and hard to find. You review a curated shortlist and only pay for what you keep.',
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
            "You'd rather review a shortlist than browse a full store"
        ],
        whatsIncluded: [
            {
                step: '01',
                title: 'Brief',
                body: 'Tell us what you need, your budget, sizing, and anything specific or hard-to-find.'
            },
            {
                step: '02',
                title: 'Sourcing',
                body: 'We pull options across our vetted network of suppliers.'
            },
            {
                step: '03',
                title: 'Shortlist',
                body: 'You review a curated set and approve what to purchase.'
            },
            {
                step: '04',
                title: 'In-Person Fitting (Optional)',
                body: 'Want to try before you buy? We can come to your home or office for a fitting session — at no extra cost when bundled with a Personal Shopping brief. Available within Lagos mainland and island.'
            }
        ],
        testimonial: {
            quote: 'I needed three outfits for a work trip and didn\'t have time to leave the office. They delivered a shortlist the next morning. I kept everything.',
            author: 'Tunde A.',
            role: 'Investment banker, Lagos'
        },
        faqs: [
            {
                q: 'Do I have to buy everything shortlisted?',
                a: 'No. You only pay for what you decide to keep. The styling fee covers our time sourcing and curating — not the items themselves.'
            },
            {
                q: 'Can this be done without meeting in person?',
                a: 'Yes. We work over WhatsApp and email. You can review the shortlist digitally and approve remotely.'
            },
            {
                q: 'Do you offer in-person fittings?',
                a: 'Yes. As part of your Personal Shopping brief, we can come to your home or office for a fitting session — at no extra cost. We bring a curated rail, take your measurements, and fit pieces on the spot. Available within Lagos mainland and island.'
            },
            {
                q: 'Do you source from outside Lagos?',
                a: 'Yes — we have supplier relationships across Lagos, Abuja, and internationally. Sourcing lead time depends on the brief.'
            },
            {
                q: 'Can you find hard-to-find or specialty pieces?',
                a: 'Yes. Sourcing specialty items is part of the service — we work our network to find pieces that aren\'t on the shelf.'
            }
        ],
        finalCta: {
            title: 'Send us your brief — we\'ll do the shopping.',
            body: 'Tell us what you need, when you need it, and the budget you\'re working with. We\'ll come back with a shortlist within 48 hours.',
            button: 'Start Your Brief'
        }
    },
    {
        slug: 'outfit-gifting',
        number: '03',
        category: 'Gifting',
        name: 'Outfit Gifting',
        tagline: 'Give someone a complete, thoughtfully styled outfit curated around their taste, size, and occasion.',
        description: 'A complete styled outfit, curated around the recipient\'s taste and size, delivered for a birthday, anniversary, wedding, or just because.',
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
            'You\'re gifting for a specific occasion — wedding, birthday, anniversary'
        ],
        whatsIncluded: [
            {
                step: '01',
                title: 'Recipient Brief',
                body: 'You tell us about them — taste, size if known, occasion, budget.'
            },
            {
                step: '02',
                title: 'Curate',
                body: 'We assemble a complete outfit (e.g. shirt + trousers + accessory) around the brief.'
            },
            {
                step: '03',
                title: 'Present',
                body: 'Distinguished gift-wrapped and delivered with a handwritten note.'
            }
        ],
        testimonial: {
            quote: 'I gifted my brother a full outfit for his 30th. They handled everything — sizing, styling, wrapping, delivery. He still talks about it.',
            author: 'Ngozi M.',
            role: 'Gifting client, Lagos'
        },
        faqs: [
            {
                q: 'What if it doesn\'t fit?',
                a: 'All gifting outfits include one free size exchange within 7 days of delivery.'
            },
            {
                q: 'Can you deliver on a specific date?',
                a: 'Yes — specify the date in the brief and we\'ll confirm scheduling before you pay.'
            },
            {
                q: 'Can I see the outfit before it\'s delivered?',
                a: 'Yes. We can send a preview for your approval, or deliver as a complete surprise.'
            }
        ],
        finalCta: {
            title: 'Give a wardrobe moment, not just a gift.',
            body: 'A complete styled outfit, beautifully presented. Tell us who it\'s for and we\'ll handle the rest.',
            button: 'Plan a Gift'
        }
    },
    {
        slug: 'traditional-wear-consultation',
        number: '04',
        category: 'Cultural',
        name: 'Traditional Wear Consultation',
        tagline: 'Agbada, kaftan, senator, and ceremonial wear — styled correctly for the occasion, culture, and your build.',
        description: 'Agbada, kaftan, senator, and ceremonial wear — styled correctly for the occasion, the culture, and your build. We coordinate fabric, accessories, and tailoring.',
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
            'You want the right fabric, cap, and accessories paired together'
        ],
        whatsIncluded: [
            {
                title: 'Occasion & cultural briefing',
                body: 'We start with the event, the culture, and your role in it.'
            },
            {
                title: 'Fabric and cap/accessory pairing guidance',
                body: 'Fabric choices, cap pairing, beads, shoes — every element considered.'
            },
            {
                title: 'Tailor referral for made-to-measure pieces',
                body: 'We refer trusted ateliers for agbada, kaftan, and senator styles.'
            },
            {
                title: 'Coordination with family or entourage looks',
                body: 'If others are dressing with you, we coordinate so the looks read as one.'
            }
        ],
        testimonial: {
            quote: 'My father\'s chieftaincy was a once-in-a-lifetime event. They styled all four of us — me, my brothers, and my dad — and every detail was right.',
            author: 'Kunle A.',
            role: 'Chieftaincy client, Ibadan'
        },
        faqs: [
            {
                q: 'Do you provide the fabric?',
                a: 'We can. We also work with fabric you provide — particularly if it\'s a family piece or culturally significant.'
            },
            {
                q: 'Which cultures do you cover?',
                a: 'All major Nigerian ceremonial traditions — Yoruba, Igbo, Hausa, Benin, and more. Brief us on the specific occasion and we\'ll confirm.'
            },
            {
                q: 'How far ahead should I book?',
                a: 'For made-to-measure pieces, 4–6 weeks minimum. For styling only, 2 weeks is usually enough.'
            }
        ],
        finalCta: {
            title: 'Style your next occasion correctly.',
            body: 'Whether it\'s a wedding, a chieftaincy, or a naming ceremony — join the waitlist and we\'ll be in touch when bookings open.',
            button: 'Join the Waitlist'
        }
    },
    {
        slug: 'amendments-alterations',
        number: '05',
        category: 'Tailoring',
        name: 'Amendments & Alterations',
        tagline: 'Tailoring fixes and adjustments for any garment — not just pieces bought from Wardrobecare. Hems, slimming, sleeve shortening, repairs, and more.',
        description: 'Tailoring fixes and adjustments for any garment — not just pieces bought from Wardrobecare. Hems, slimming, sleeve shortening, repairs, and more.',
        image: '/services/amendments-alterations.jpg',
        imageAlt: 'A tailor making an alteration to a garment on a sewing machine',
        startingPrice: 20000,
        priceLabel: 'From ₦20,000',
        priceUnit: 'Per alteration',
        priceNote: 'Per alteration · mandatory ₦20,000 service & handling fee per order',
        featured: false,
        badge: 'Per alteration',
        whoFor: [
            'Something you own no longer fits quite right',
            'A new piece needs a small adjustment before it\'s wearable',
            'You want a quick repair, not a full re-tailor',
            'The item didn\'t come from Wardrobecare — that\'s fine, we still take it'
        ],
        whatsIncluded: [
            {
                step: '01',
                title: 'Tell Us What\'s Needed',
                body: 'Garment type and the alteration(s) required, photos optional.'
            },
            {
                step: '02',
                title: 'Pick-up',
                body: 'We collect the item(s) at a time that works for you.'
            },
            {
                step: '03',
                title: 'Drop-off',
                body: 'Altered items returned to you, ready to wear.'
            }
        ],
        priceList: {
            items: [
                {
                    label: 'Trouser hem (shorten/lengthen)',
                    amount: 5000
                },
                {
                    label: 'Waist adjustment (trouser)',
                    amount: 7000
                },
                {
                    label: 'Sleeve shortening — shirt',
                    amount: 5000
                },
                {
                    label: 'Sleeve shortening — blazer/jacket',
                    amount: 10000
                },
                {
                    label: 'Take in / let out sides — blazer/jacket',
                    amount: 15000
                },
                {
                    label: 'Take in / let out sides — shirt',
                    amount: 6000
                },
                {
                    label: 'Take in / let out sides — t-shirt',
                    amount: 5000
                },
                {
                    label: 'Take in / let out sides — jean/pant',
                    amount: 6000
                },
                {
                    label: 'Tear/rib/gash repair',
                    amount: 5000
                },
                {
                    label: 'Button replacement',
                    amount: 5000
                },
                {
                    label: 'Zipper replacement',
                    amount: 5000
                }
            ],
            mandatoryFee: {
                label: 'Service & Handling Fee',
                description: 'Mandatory on every order — covers pick-up/drop-off logistics, supervision, and expertise, regardless of item count.',
                amount: 20000
            },
            notes: [
                {
                    lead: 'Need something not listed here?',
                    body: 'Contact us for a custom quote — if the job can be done, we\'ll price it for you.'
                },
                {
                    lead: 'Outside our standard pick-up/drop-off area?',
                    body: 'Further locations are quoted case by case, confirmed before you book.'
                }
            ]
        },
        faqs: [
            {
                q: 'What does this service cover?',
                a: 'Tailoring fixes and adjustments for any garment — hems, waist adjustments, slimming, sleeve shortening, repairs, and button or zipper replacement. It doesn\'t have to be something you bought from us.'
            },
            {
                q: 'How is it priced?',
                a: 'Per alteration — each fix has its own price, and you can combine several on one order. On top of that, a Service & Handling fee applies to every order, covering pick-up, drop-off, supervision, and expertise.'
            },
            {
                q: 'Is the Service & Handling fee optional?',
                a: 'No — it\'s mandatory on every Amendments & Alterations order, regardless of how many items you bring, since pick-up, drop-off, and oversight happen either way.'
            },
            {
                q: 'How does pick-up and drop-off work?',
                a: 'We collect the item(s) from you, complete the work, and return them once finished — just tell us a pick-up time and address when you book.'
            },
            {
                q: "What if my alteration isn't on the price list?",
                a: 'Contact us for a custom quote. If the job can be done, we\'ll price it for you after seeing the garment and the work involved.'
            },
            {
                q: "What if I'm outside your usual pick-up area?",
                a: "That's handled case by case — let us know your location and we'll confirm whether it's covered and what it costs before you book."
            }
        ],
        finalCta: {
            title: 'Send us a photo — we\'ll quote it.',
            body: 'Tell us what needs fixing on what garment. We\'ll come back with a quote and a pick-up time.',
            button: 'Book an Alteration'
        }
    }
];
const SERVICE_GROUPS = [
    {
        label: 'Find Your Direction',
        description: 'Define, audit, and direct your style.',
        services: SERVICES.filter((s)=>s.category === 'Diagnostic')
    },
    {
        label: 'Let Us Shop For You',
        description: 'We find it, you approve it.',
        services: SERVICES.filter((s)=>s.category === 'Sourcing')
    },
    {
        label: 'An Occasion, or For Someone Else',
        description: 'One-off services for a specific moment.',
        services: SERVICES.filter((s)=>s.category === 'Gifting' || s.category === 'Cultural')
    },
    {
        label: 'Tailoring & Alterations',
        description: 'Fixes, hems, and repairs — for any garment.',
        services: SERVICES.filter((s)=>s.category === 'Tailoring')
    }
];
function getServiceBySlug(slug) {
    return SERVICES.find((s)=>s.slug === slug);
}
function getFeaturedServices() {
    return SERVICES.filter((s)=>s.featured);
}
function getRelatedServices(currentSlug, limit = 3) {
    const current = getServiceBySlug(currentSlug);
    if (!current) return SERVICES.slice(0, limit);
    // Same category first, then fill from the rest
    const sameCategory = SERVICES.filter((s)=>s.slug !== currentSlug && s.category === current.category);
    const others = SERVICES.filter((s)=>s.slug !== currentSlug && s.category !== current.category);
    return [
        ...sameCategory,
        ...others
    ].slice(0, limit);
}
}),
"[project]/src/lib/seo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TEMPLATES",
    ()=>DEFAULT_TEMPLATES,
    "ISSUE_LABELS",
    ()=>ISSUE_LABELS,
    "STATIC_PAGES",
    ()=>STATIC_PAGES,
    "bandFor",
    ()=>bandFor,
    "buildDuplicateMaps",
    ()=>buildDuplicateMaps,
    "categoryToRecord",
    ()=>categoryToRecord,
    "checksFor",
    ()=>checksFor,
    "fillTemplate",
    ()=>fillTemplate,
    "getAllTemplates",
    ()=>getAllTemplates,
    "getOrCreateSeoOverride",
    ()=>getOrCreateSeoOverride,
    "getSeoOverride",
    ()=>getSeoOverride,
    "getTemplate",
    ()=>getTemplate,
    "pageOverrideToRecord",
    ()=>pageOverrideToRecord,
    "productToRecord",
    ()=>productToRecord,
    "scoreFor",
    ()=>scoreFor,
    "serviceRoutes",
    ()=>serviceRoutes,
    "serviceToRecord",
    ()=>serviceToRecord
]);
/**
 * SEO Manager — core helpers.
 *
 * Shared by the admin /admin/seo pages, the public generateMetadata hooks,
 * and the sitemap. Keeps the editorial-check rules in one place so the
 * admin UI, the public pages and the sitemap all agree on what "good
 * SEO" means.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-route] (ecmascript)");
;
;
const STATIC_PAGES = [
    {
        route: '/',
        name: 'Home'
    },
    {
        route: '/shop',
        name: 'Shop (all products)'
    },
    {
        route: '/services',
        name: 'Services hub'
    },
    {
        route: '/about',
        name: 'About'
    },
    {
        route: '/faq',
        name: 'FAQ'
    },
    {
        route: '/shipping',
        name: 'Shipping & Delivery'
    },
    {
        route: '/returns',
        name: 'Returns & Exchanges'
    },
    {
        route: '/privacy',
        name: 'Privacy Policy'
    },
    {
        route: '/terms',
        name: 'Terms & Conditions'
    },
    {
        route: '/measurement-guide',
        name: 'Measurement Guide'
    },
    {
        route: '/track-order',
        name: 'Track Order'
    },
    {
        route: '/delivery-charges',
        name: 'Delivery Charges'
    },
    {
        route: '/gift-card',
        name: 'Gift Cards'
    },
    {
        route: '/digital-closet',
        name: 'Digital Closet'
    },
    {
        route: '/clothing',
        name: 'Clothing hub'
    },
    {
        route: '/footwear',
        name: 'Footwear hub'
    },
    {
        route: '/accessories',
        name: 'Accessories hub'
    },
    {
        route: '/fragrance-grooming',
        name: 'Fragrance & Grooming hub'
    },
    {
        route: '/bottoms',
        name: 'Bottoms hub'
    }
];
const ISSUE_LABELS = [
    {
        key: 'title',
        label: 'Pages with no SEO title'
    },
    {
        key: 'titleLen',
        label: 'Titles too short or too long (20–62 chars)'
    },
    {
        key: 'titleDup',
        label: 'Duplicate SEO titles'
    },
    {
        key: 'desc',
        label: 'Pages with no meta description'
    },
    {
        key: 'descLen',
        label: 'Descriptions too short or too long (70–160 chars)'
    },
    {
        key: 'intro',
        label: 'Categories / services with thin intro text (under 40 words)'
    },
    {
        key: 'alt',
        label: 'Products with no main image alt text'
    },
    {
        key: 'og',
        label: 'Pages with no social sharing image'
    },
    {
        key: 'h1',
        label: 'Pages with no H1 heading'
    }
];
const TITLE_MIN = 20;
const TITLE_MAX = 62;
const DESC_MIN = 70;
const DESC_MAX = 160;
const INTRO_MIN_WORDS = 40;
function wordCount(s) {
    const t = s.trim();
    return t ? t.split(/\s+/).length : 0;
}
function normalize(s) {
    return (s || '').trim().toLowerCase();
}
async function buildDuplicateMaps() {
    const titles = {};
    const descs = {};
    const bump = (m, v)=>{
        const n = normalize(v);
        if (n) m[n] = (m[n] || 0) + 1;
    };
    // Categories
    const cats = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
        select: {
            seoTitle: true,
            seoDescription: true,
            name: true
        }
    });
    for (const c of cats){
        bump(titles, c.seoTitle || c.name);
        bump(descs, c.seoDescription || '');
    }
    // Products
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
        select: {
            seoTitle: true,
            seoDescription: true,
            name: true
        }
    });
    for (const p of products){
        bump(titles, p.seoTitle || p.name);
        bump(descs, p.seoDescription || '');
    }
    // Services (static) — derive default title/desc from name+tagline so duplicates can be detected too
    for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SERVICES"]){
        bump(titles, `${s.name} — Wardrobecare Services`);
        bump(descs, s.tagline);
    }
    // Static page overrides
    const overrides = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoOverride.findMany({
        select: {
            seoTitle: true,
            seoDescription: true,
            name: true
        }
    });
    for (const o of overrides){
        bump(titles, o.seoTitle || o.name);
        bump(descs, o.seoDescription || '');
    }
    return {
        titles,
        descs
    };
}
function checksFor(r, dups) {
    const out = [];
    const tN = normalize(r.seoTitle);
    const dN = normalize(r.seoDescription);
    out.push({
        key: 'title',
        ok: !!r.seoTitle.trim(),
        message: 'Page title is set'
    });
    out.push({
        key: 'titleLen',
        ok: r.seoTitle.length >= TITLE_MIN && r.seoTitle.length <= TITLE_MAX,
        message: `Title is ${TITLE_MIN}–${TITLE_MAX} characters (${r.seoTitle.length})`
    });
    out.push({
        key: 'titleDup',
        ok: !r.seoTitle.trim() || (dups.titles[tN] ?? 0) <= 1,
        message: 'Title is unique across the site'
    });
    out.push({
        key: 'desc',
        ok: !!r.seoDescription.trim(),
        message: 'Meta description is set'
    });
    out.push({
        key: 'descLen',
        ok: r.seoDescription.length >= DESC_MIN && r.seoDescription.length <= DESC_MAX,
        message: `Description is ${DESC_MIN}–${DESC_MAX} characters (${r.seoDescription.length})`
    });
    out.push({
        key: 'descDup',
        ok: !r.seoDescription.trim() || (dups.descs[dN] ?? 0) <= 1,
        message: 'Description is unique across the site'
    });
    out.push({
        key: 'slug',
        ok: /^\/[a-z0-9\-/]*$/.test(r.url),
        message: 'URL is lowercase with hyphens'
    });
    out.push({
        key: 'h1',
        ok: !!r.h1.trim(),
        message: 'Page heading (H1) is set'
    });
    if (r.type === 'category' || r.type === 'service') {
        out.push({
            key: 'intro',
            ok: wordCount(r.introText) >= INTRO_MIN_WORDS,
            message: `Intro text is at least ${INTRO_MIN_WORDS} words (${wordCount(r.introText)})`
        });
    }
    if (r.type === 'product') {
        out.push({
            key: 'alt',
            ok: !!r.imageAlt.trim(),
            message: 'Main image has alt text'
        });
    }
    out.push({
        key: 'og',
        ok: !!r.ogImage.trim(),
        message: 'Social share image is set'
    });
    out.push({
        key: 'idxMap',
        ok: r.noindex ? !r.inSitemap : true,
        message: r.noindex ? 'noindex page is excluded from sitemap' : 'Index and sitemap settings agree'
    });
    return out;
}
function scoreFor(r, dups) {
    let cs = checksFor(r, dups);
    if (r.hidden && r.noindex) {
        cs = cs.filter((c)=>c.key === 'slug' || c.key === 'idxMap');
    }
    if (cs.length === 0) return 100;
    const passed = cs.filter((c)=>c.ok).length;
    return Math.round(passed / cs.length * 100);
}
function bandFor(score) {
    if (score >= 85) return {
        cls: 'good',
        label: 'Good'
    };
    if (score >= 60) return {
        cls: 'warn',
        label: 'Needs work'
    };
    return {
        cls: 'bad',
        label: 'Poor'
    };
}
function serviceRoutes() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SERVICES"].map((s)=>({
            route: `/services/${s.slug}`,
            name: s.name
        }));
}
function categoryToRecord(c) {
    return {
        id: c.id,
        type: 'category',
        name: c.name,
        url: `/shop?category=${c.slug}`,
        parent: c.parent?.name ?? undefined,
        seoTitle: c.seoTitle ?? '',
        seoDescription: c.seoDescription ?? c.description ?? '',
        h1: c.seoH1 ?? c.name,
        introText: c.seoIntroText ?? '',
        ogImage: c.seoOgImage ?? '',
        imageAlt: '',
        noindex: c.noindex,
        inSitemap: c.inSitemap,
        published: c.active
    };
}
function productToRecord(p) {
    // Pick the first image's alt text as the "main image alt"
    const mainImage = p.images && p.images.length > 0 ? [
        ...p.images
    ].sort((a, b)=>a.position - b.position)[0] : null;
    return {
        id: p.id,
        type: 'product',
        name: p.name,
        url: `/product/${p.slug}`,
        seoTitle: p.seoTitle ?? '',
        seoDescription: p.seoDescription ?? p.description.slice(0, 160),
        h1: p.seoH1 ?? p.name,
        introText: '',
        ogImage: p.ogImage ?? '',
        imageAlt: mainImage?.altText ?? '',
        noindex: p.noindex,
        inSitemap: p.inSitemap,
        published: p.published && p.status !== 'ARCHIVED' && p.status !== 'DISCONTINUED'
    };
}
function serviceToRecord(s, ov) {
    const route = `/services/${s.slug}`;
    return {
        id: route,
        type: 'service',
        name: s.name,
        url: route,
        hidden: !!s.comingSoon,
        seoTitle: ov?.seoTitle ?? `${s.name} — Wardrobecare Services`,
        seoDescription: ov?.seoDescription ?? s.tagline,
        h1: ov?.h1 ?? s.name,
        introText: ov?.introText ?? '',
        ogImage: ov?.ogImage ?? '',
        imageAlt: '',
        noindex: ov?.noindex ?? !!s.comingSoon,
        inSitemap: ov?.inSitemap ?? !s.comingSoon,
        published: !s.comingSoon
    };
}
function pageOverrideToRecord(route, name, ov) {
    return {
        id: route,
        type: 'page',
        name,
        url: route,
        seoTitle: ov?.seoTitle ?? '',
        seoDescription: ov?.seoDescription ?? '',
        h1: ov?.h1 ?? name,
        introText: ov?.introText ?? '',
        ogImage: ov?.ogImage ?? '',
        imageAlt: '',
        noindex: ov?.noindex ?? false,
        inSitemap: ov?.inSitemap ?? true,
        published: true
    };
}
const DEFAULT_TEMPLATES = {
    category: {
        titleTemplate: "Men's {name} in Lagos | Wardrobecare",
        descriptionTemplate: "Shop men's {name_lc} in Lagos. Delivery within Lagos in 1–24 hours; exchange within 48 hours. Wardrobecare, since 2003.",
        introTemplate: "Shop men's {name_lc} in Lagos, chosen by a stylist and sized for Nigerian men. Delivery within Lagos takes 1–24 hours, and exchanges are accepted within 48 hours if the size or item is wrong. Not sure what suits you? Book a Wardrobe & Style Consultation and we will help you decide.",
        altTemplate: ''
    },
    product: {
        titleTemplate: '{name} | Wardrobecare',
        descriptionTemplate: '{name} — shop online at Wardrobecare, Lagos. Delivery within Lagos in 1–24 hours; exchange within 48 hours if the size or item is wrong.',
        introTemplate: '',
        altTemplate: '{name} — front view'
    },
    service: {
        titleTemplate: '{name} in Lagos | Wardrobecare',
        descriptionTemplate: '{name} in Lagos — book online with Wardrobecare. Menswear styling and shopping services since 2003.',
        introTemplate: '',
        altTemplate: ''
    },
    page: {
        titleTemplate: '{name} | Wardrobecare',
        descriptionTemplate: '{name} — Wardrobecare, menswear styling, shopping and services in Lagos, Nigeria.',
        introTemplate: '',
        altTemplate: ''
    }
};
function fillTemplate(template, name) {
    if (!template) return '';
    return template.replace(/\{name_lc\}/g, name.toLowerCase()).replace(/\{name\}/g, name);
}
async function getTemplate(contentType) {
    const stored = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoTemplate.findUnique({
        where: {
            contentType
        }
    });
    const def = DEFAULT_TEMPLATES[contentType];
    return {
        contentType,
        titleTemplate: stored?.titleTemplate ?? def.titleTemplate,
        descriptionTemplate: stored?.descriptionTemplate ?? def.descriptionTemplate,
        introTemplate: stored?.introTemplate ?? def.introTemplate,
        altTemplate: stored?.altTemplate ?? def.altTemplate
    };
}
async function getAllTemplates() {
    const types = [
        'category',
        'product',
        'service',
        'page'
    ];
    const stored = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoTemplate.findMany();
    const byType = new Map(stored.map((t)=>[
            t.contentType,
            t
        ]));
    return types.map((type)=>{
        const s = byType.get(type);
        const def = DEFAULT_TEMPLATES[type];
        return {
            contentType: type,
            titleTemplate: s?.titleTemplate ?? def.titleTemplate,
            descriptionTemplate: s?.descriptionTemplate ?? def.descriptionTemplate,
            introTemplate: s?.introTemplate ?? def.introTemplate,
            altTemplate: s?.altTemplate ?? def.altTemplate
        };
    });
}
async function getSeoOverride(route) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoOverride.findUnique({
        where: {
            route
        }
    });
}
async function getOrCreateSeoOverride(route, contentType, name) {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoOverride.findUnique({
        where: {
            route
        }
    });
    if (existing) return existing;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoOverride.create({
        data: {
            route,
            contentType,
            name
        }
    });
}
}),
"[project]/src/app/sitemap.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>sitemap,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function sitemap() {
    const baseUrl = 'https://wardrobecare.com.ng';
    // Pull all overrides once
    const overrides = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seoOverride.findMany({
        select: {
            route: true,
            noindex: true,
            inSitemap: true,
            contentType: true
        }
    });
    const overrideMap = new Map(overrides.map((o)=>[
            o.route,
            o
        ]));
    // ── Products ──
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            published: true,
            status: 'ACTIVE',
            inSitemap: true,
            noindex: false
        },
        select: {
            slug: true,
            updatedAt: true
        }
    });
    const productPages = products.map((p)=>({
            url: `${baseUrl}/product/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'monthly',
            priority: 0.8
        }));
    // ── Categories (top-level + sub) ──
    const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
        where: {
            active: true,
            inSitemap: true,
            noindex: false
        },
        select: {
            slug: true,
            updatedAt: true,
            parentId: true
        }
    });
    const categoryPages = categories.map((c)=>({
            url: `${baseUrl}/shop?category=${c.slug}`,
            lastModified: c.updatedAt,
            changeFrequency: 'weekly',
            priority: c.parentId ? 0.5 : 0.6
        }));
    // ── Services hub + individual services ──
    const serviceHubOverride = overrideMap.get('/services');
    const serviceHubIncluded = !serviceHubOverride || !serviceHubOverride.noindex && serviceHubOverride.inSitemap;
    const serviceHubPages = serviceHubIncluded ? [
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9
        }
    ] : [];
    const servicePages = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SERVICES"].flatMap((s)=>{
        // Coming-soon services are never in the sitemap
        if (s.comingSoon) return [];
        const route = `/services/${s.slug}`;
        const ov = overrideMap.get(route);
        // Default: in sitemap. Override can opt out.
        const included = !ov || !ov.noindex && ov.inSitemap;
        if (!included) return [];
        return [
            {
                url: `${baseUrl}/services/${s.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8
            }
        ];
    });
    // ── Static pages — pulled from the registry in src/lib/seo.ts ──
    // Skip /shop (covered by category pages) and the homepage (covered separately)
    const staticPageEntries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STATIC_PAGES"].flatMap((p)=>{
        if (p.route === '/') {
            return [
                {
                    url: `${baseUrl}/`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 1
                }
            ];
        }
        if (p.route === '/shop') {
            return [
                {
                    url: `${baseUrl}/shop`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.9
                }
            ];
        }
        if (p.route === '/services') return [] // already covered above
        ;
        const ov = overrideMap.get(p.route);
        const included = !ov || !ov.noindex && ov.inSitemap;
        if (!included) return [];
        return [
            {
                url: `${baseUrl}${p.route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            }
        ];
    });
    return [
        ...staticPageEntries,
        ...serviceHubPages,
        ...servicePages,
        ...productPages,
        ...categoryPages
    ];
}
}),
"[project]/src/app/sitemap--route-entry.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/sitemap.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$metadata$2f$resolve$2d$route$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js [app-route] (ecmascript)");
;
;
;
const contentType = "application/xml";
const cacheControl = "public, max-age=0, must-revalidate";
const fileType = "sitemap";
if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"] !== 'function') {
    throw new Error('Default export is missing in "./sitemap.ts"');
}
async function GET() {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$metadata$2f$resolve$2d$route$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRouteData"])(data, fileType);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](content, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': cacheControl
        }
    });
}
;
}),
"[project]/src/app/sitemap--route-entry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2d2d$route$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GET"],
    "dynamic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dynamic"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2d2d$route$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/sitemap--route-entry.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$sitemap$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/sitemap.ts [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0876a4a2._.js.map