module.exports = [
"[project]/src/app/icon.png.mjs { IMAGE => \"[project]/src/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/icon.png.mjs { IMAGE => \"[project]/src/app/icon.png (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/category-hubs.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Category hub pages — the dedicated landing pages behind the four main
 * retail nav items (Clothing / Footwear / Accessories / Fragrance & Grooming).
 *
 * Clicking a top-level nav label lands here instead of the all-products shop
 * grid: each hub organises its subcategories into their own editorial
 * sections (mirroring the mega-menu groups 1:1), with a product rail per
 * subcategory. Deep links still point at /shop?category=<slug> for the full
 * filtered grid, so the hub is a wayfinding + SEO layer, never a duplicate
 * of the shop page.
 *
 * `groups` intentionally mirror nav-data.ts mega groups. Sub slugs must match
 * the Prisma Category tree; subs missing from the DB are skipped gracefully.
 */ __turbopack_context__.s([
    "HUBS",
    ()=>HUBS,
    "HUB_LIST",
    ()=>HUB_LIST,
    "getHub",
    ()=>getHub
]);
const HUBS = {
    clothing: {
        route: 'clothing',
        rootSlug: 'clothing',
        navLabel: 'Clothing',
        h1: 'Clothing',
        eyebrow: 'Wardrobecare · Lagos',
        heroLede: 'Every piece we stock, sorted the way a wardrobe is actually built. Shirting, tailoring, knitwear and layers each hold their own edit below — with Bottoms, our companion category, in a section of its own.',
        metaTitle: 'Clothing — Shirts, Suits, Blazers & Bottoms',
        metaDescription: "Shop Wardrobecare's clothing edits — blazers, casual and formal shirts, polos, suits, t-shirts and hoodies, plus chinos, jeans and trousers. Lagos delivery, nationwide shipping.",
        groups: [
            {
                label: 'Clothing',
                subs: [
                    {
                        slug: 'blazers',
                        label: 'Blazers',
                        description: 'Structured shoulders and clean lines — blazers that carry boardrooms and owambe alike.'
                    },
                    {
                        slug: 'casual-shirts',
                        label: 'Casual Shirts',
                        description: 'Everyday shirting in breathable cottons and soft prints, built for Lagos heat and easy dressing.'
                    },
                    {
                        slug: 'formal-shirts',
                        label: 'Formal / Office Shirts',
                        description: 'Crisp, pressed and meeting-ready — the backbone of a working wardrobe.'
                    },
                    {
                        slug: 'hoodies-sweatshirts',
                        label: 'Hoodies & Sweatshirts',
                        description: 'Off-duty layers with a distinguished hand-feel — for flights, Fridays and slow Sundays.'
                    },
                    {
                        slug: 'jackets',
                        label: 'Jackets',
                        description: 'Outer layers with presence, from lightweight overshirts to statement pieces.'
                    },
                    {
                        slug: 'polo-shirts',
                        label: 'Polo Shirts',
                        description: 'The smart-casual middle ground — cut clean, worn often.'
                    },
                    {
                        slug: 'suits',
                        label: 'Suits',
                        description: 'Two- and three-piece tailoring for the days that matter most.'
                    },
                    {
                        slug: 't-shirts',
                        label: 'T-Shirts',
                        description: 'Distinguished tees with weight and shape that survive the wash.'
                    }
                ]
            },
            {
                label: 'Bottoms',
                subs: [
                    {
                        slug: 'chinos',
                        label: 'Chinos',
                        description: 'Smart-casual trousers that move from the office to the evening without a change.'
                    },
                    {
                        slug: 'jeans',
                        label: 'Jeans',
                        description: 'Denim with integrity — straight, clean and dependable.'
                    },
                    {
                        slug: 'joggers',
                        label: 'Joggers',
                        description: 'Relaxed bottoms that still look intentional.'
                    },
                    {
                        slug: 'shorts',
                        label: 'Shorts',
                        description: 'Warm-weather staples cut at exactly the right length.'
                    },
                    {
                        slug: 'trousers',
                        label: 'Trousers',
                        description: 'Pressed pleats and tailored falls — the foundation of formal dress.'
                    }
                ]
            }
        ]
    },
    footwear: {
        route: 'footwear',
        rootSlug: 'footwear',
        navLabel: 'Footwear',
        h1: 'Footwear',
        eyebrow: 'Wardrobecare · Lagos',
        heroLede: 'Every pair we carry, arranged in its own edit below — from boardroom derbies to weekend loafers, each style vetted for leather quality before it reaches these shelves.',
        metaTitle: 'Footwear — Dress Shoes, Loafers & Casual Shoes',
        metaDescription: 'Explore the Wardrobecare footwear edits — casual shoes, dress shoes, exotic shoes and loafers, curated for the distinguished Lagos man. Lagos delivery, nationwide shipping.',
        groups: [
            {
                label: 'Footwear',
                subs: [
                    {
                        slug: 'casual-shoes',
                        label: 'Casual Shoes',
                        description: 'Sneakers and easy pairs that survive Lagos pavements without losing their manners.'
                    },
                    {
                        slug: 'dress-shoes',
                        label: 'Dress Shoes',
                        description: 'Oxfords and derbies with a clean welt — the full stop at the end of a tailored look.'
                    },
                    {
                        slug: 'exotic-shoes',
                        label: 'Exotic Shoes',
                        description: 'Statement leathers for the occasions that call for them.'
                    },
                    {
                        slug: 'loafers',
                        label: 'Loafers',
                        description: 'Slip on and go — the hardest-working pair in a Nigerian wardrobe.'
                    }
                ]
            }
        ]
    },
    accessories: {
        route: 'accessories',
        rootSlug: 'accessories',
        navLabel: 'Accessories',
        h1: 'Accessories',
        eyebrow: 'Wardrobecare · Lagos',
        heroLede: 'The details that finish an outfit. Belts, ties, pocket squares and everything in between — each category holds its own edit below.',
        metaTitle: 'Accessories — Ties, Belts, Wallets & More',
        metaDescription: 'Browse Wardrobecare accessories by category — belts, caps & hats, pocket squares, socks, sunglasses, ties and wallets & purses. Finishing touches for a considered wardrobe.',
        groups: [
            {
                label: 'Accessories',
                subs: [
                    {
                        slug: 'belts',
                        label: 'Belts',
                        description: 'Leather belts that match the formality of the shoe — always.'
                    },
                    {
                        slug: 'caps-hats',
                        label: 'Caps & Hats',
                        description: 'Crowns for the off days — structured caps and easy hats.'
                    },
                    {
                        slug: 'pocket-squares',
                        label: 'Pocket Squares',
                        description: 'A flash of colour and intent for the jacket’s breast pocket.'
                    },
                    {
                        slug: 'socks',
                        label: 'Socks',
                        description: 'The quiet detail — cotton-rich pairs that stay up all day.'
                    },
                    {
                        slug: 'sunglasses',
                        label: 'Sunglasses',
                        description: 'Frames with presence, for the Lagos sun and the drive through it.'
                    },
                    {
                        slug: 'ties',
                        label: 'Ties',
                        description: 'Silk and textured ties tied to the season’s tailoring.'
                    },
                    {
                        slug: 'wallets-purses',
                        label: 'Wallets & Purses',
                        description: 'Everyday carry, leathered and slim — made to age well.'
                    }
                ]
            }
        ]
    },
    'fragrance-grooming': {
        route: 'fragrance-grooming',
        rootSlug: 'fragrance-grooming',
        navLabel: 'Fragrance & Grooming',
        h1: 'Fragrance & Grooming',
        eyebrow: 'Wardrobecare · Lagos',
        heroLede: 'Scent and self-care, curated like the clothes. Men’s fragrance, grooming essentials and a women’s fragrance edit — each in its own section below.',
        metaTitle: "Fragrance & Grooming — Men's & Women's Scents",
        metaDescription: 'Shop Wardrobecare’s fragrance & grooming edits — men’s fragrance, men’s grooming and women’s fragrance, each with its own curated selection. Lagos delivery, nationwide shipping.',
        groups: [
            {
                label: 'Fragrance & Grooming',
                subs: [
                    {
                        slug: 'mens-fragrance',
                        label: "Men's Fragrance",
                        description: 'Signature scents with staying power — from fresh morning sprays to evening woods.'
                    },
                    {
                        slug: 'mens-grooming',
                        label: "Men's Grooming",
                        description: 'The ritual kit — skincare and grooming essentials that keep the look sharp.'
                    },
                    {
                        slug: 'womens-fragrance',
                        label: "Women's Fragrance",
                        description: 'For the women we shop for — a considered edit of feminine scents.'
                    }
                ]
            }
        ]
    }
};
const HUB_LIST = [
    HUBS.clothing,
    HUBS.footwear,
    HUBS.accessories,
    HUBS['fragrance-grooming']
];
function getHub(rootSlug) {
    return HUBS[rootSlug];
}
}),
"[project]/src/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveBanners",
    ()=>getActiveBanners,
    "getAdminSettings",
    ()=>getAdminSettings,
    "getAdminStats",
    ()=>getAdminStats,
    "getAllCategories",
    ()=>getAllCategories,
    "getCartWithProducts",
    ()=>getCartWithProducts,
    "getCategories",
    ()=>getCategories,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getFAQs",
    ()=>getFAQs,
    "getFeaturedProducts",
    ()=>getFeaturedProducts,
    "getHomepageContent",
    ()=>getHomepageContent,
    "getHubData",
    ()=>getHubData,
    "getNewArrivals",
    ()=>getNewArrivals,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProducts",
    ()=>getProducts,
    "getRelatedProducts",
    ()=>getRelatedProducts,
    "getRevenueTrend",
    ()=>getRevenueTrend,
    "getSalesByCategory",
    ()=>getSalesByCategory,
    "getTopProducts",
    ()=>getTopProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
;
// ============================================================
// CATALOGUE QUERIES
// ============================================================
/**
 * Pre-existing Category columns only — used in explicit `select` to avoid
 * fetching the new SEO Manager columns (seoH1, seoIntroText, seoOgImage,
 * noindex, inSitemap) that may not exist on the production DB yet.
 *
 * Without this, `db.category.findUnique({ include: { ... } })` would emit
 * `SELECT * FROM Category` which fails on a DB that hasn't had the SEO
 * migration applied. With explicit `select`, Prisma only fetches the
 * columns listed here.
 */ const CATEGORY_SELECT_BASE = {
    id: true,
    name: true,
    slug: true,
    description: true,
    parentId: true,
    image: true,
    order: true,
    featured: true,
    active: true,
    seoTitle: true,
    seoDescription: true,
    seoKeywords: true
};
const CATEGORY_SELECT_WITH_PARENT = {
    ...CATEGORY_SELECT_BASE,
    parent: {
        select: {
            name: true
        }
    }
};
/**
 * Pre-existing Product columns only — same rationale as above.
 */ const PRODUCT_SELECT_BASE = {
    id: true,
    name: true,
    slug: true,
    description: true,
    sku: true,
    price: true,
    salePrice: true,
    costPrice: true,
    currency: true,
    categoryId: true,
    brandId: true,
    tags: true,
    featured: true,
    published: true,
    rating: true,
    reviewCount: true,
    outOfStock: true,
    freeShipping: true,
    seoTitle: true,
    seoDescription: true,
    seoKeywords: true,
    canonicalUrl: true,
    ogImage: true,
    status: true
};
async function getCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
        where: {
            parentId: null
        },
        orderBy: {
            order: 'asc'
        },
        include: {
            children: {
                orderBy: {
                    name: 'asc'
                }
            }
        }
    });
}
async function getAllCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            parent: true,
            children: {
                orderBy: {
                    name: 'asc'
                }
            }
        }
    });
}
async function getCategoryBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findUnique({
        where: {
            slug
        },
        include: {
            parent: true,
            children: true
        }
    });
}
async function getHubData(rootSlug, groups) {
    const sections = await Promise.all(groups.flatMap((group)=>group.subs.map(async (sub)=>{
            const category = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findUnique({
                where: {
                    slug: sub.slug
                },
                select: {
                    ...CATEGORY_SELECT_BASE,
                    products: {
                        where: {
                            published: true
                        },
                        orderBy: [
                            {
                                featured: 'desc'
                            },
                            {
                                createdAt: 'desc'
                            }
                        ],
                        take: 4,
                        select: {
                            ...PRODUCT_SELECT_BASE,
                            images: {
                                orderBy: {
                                    position: 'asc'
                                },
                                take: 1,
                                select: {
                                    url: true,
                                    altText: true,
                                    position: true
                                }
                            }
                        }
                    }
                }
            });
            if (!category) return null;
            return {
                groupLabel: group.label,
                section: {
                    slug: category.slug,
                    name: sub.label,
                    description: sub.description,
                    count: category.products.length,
                    products: category.products.map((product)=>({
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            salePrice: product.salePrice,
                            image: product.images[0]?.url ?? null
                        }))
                }
            };
        })));
    const byGroup = new Map();
    for (const item of sections){
        if (!item) continue;
        const current = byGroup.get(item.groupLabel) ?? [];
        current.push(item.section);
        byGroup.set(item.groupLabel, current);
    }
    const dataGroups = groups.map((group)=>({
            label: group.label,
            sections: byGroup.get(group.label) ?? []
        })).filter((group)=>group.sections.length > 0);
    return {
        totalProducts: dataGroups.reduce((sum, group)=>sum + group.sections.reduce((n, section)=>n + section.count, 0), 0),
        totalCategories: dataGroups.reduce((sum, group)=>sum + group.sections.length, 0),
        groups: dataGroups
    };
}
async function getProducts(params) {
    const { category, search, sort = 'featured', minPrice, maxPrice, size, tag, limit = 50, featuredOnly, publishedOnly = true } = params;
    const where = {};
    if (publishedOnly) where.published = true;
    if (category) {
        const cat = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                slug: category
            },
            include: {
                children: true
            }
        });
        if (cat) {
            const catIds = [
                cat.id,
                ...cat.children.map((c)=>c.id)
            ];
            where.categoryId = {
                in: catIds
            };
        }
    }
    // Tag filtering — allows the admin to tag products with multiple
    // category-like labels and customers can browse by any tag.
    if (tag) {
        const tagNormalized = tag.replace(/-/g, ' ').toLowerCase();
        where.tags = {
            contains: tagNormalized
        };
    }
    if (search) {
        where.OR = [
            {
                name: {
                    contains: search
                }
            },
            {
                description: {
                    contains: search
                }
            },
            {
                tags: {
                    contains: search
                }
            },
            {
                sku: {
                    contains: search
                }
            }
        ];
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) where.price.gte = minPrice;
        if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    if (size) {
        where.variants = {
            some: {
                size
            }
        };
    }
    if (featuredOnly) where.featured = true;
    const orderBy = sort === 'newest' ? {
        createdAt: 'desc'
    } : sort === 'price-asc' ? {
        price: 'asc'
    } : sort === 'price-desc' ? {
        price: 'desc'
    } : {
        featured: 'desc'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where,
        orderBy,
        take: limit,
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                }
            },
            variants: true,
            category: {
                include: {
                    parent: true
                }
            }
        }
    });
}
async function getProductBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
        where: {
            slug
        },
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                }
            },
            variants: true,
            category: {
                include: {
                    parent: true
                }
            },
            brand: true,
            reviews: {
                where: {
                    published: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });
}
async function getFeaturedProducts(limit = 8) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            featured: true,
            published: true,
            // Exclude underwear / innerwear / pyjamas from homepage surfaces
            category: {
                slug: {
                    notIn: [
                        'innerwear',
                        'pyjamas'
                    ]
                }
            },
            // Also exclude any product whose name mentions "underwear" or "boxer"
            // (case-insensitive — SQLite's LIKE is case-insensitive by default)
            NOT: [
                {
                    name: {
                        contains: 'underwear'
                    }
                },
                {
                    name: {
                        contains: 'Underwear'
                    }
                },
                {
                    name: {
                        contains: 'boxer'
                    }
                },
                {
                    name: {
                        contains: 'Boxer'
                    }
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2
            },
            variants: true,
            category: true
        }
    });
}
async function getNewArrivals(limit = 12) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            published: true,
            // Exclude underwear / innerwear / pyjamas from homepage surfaces
            category: {
                slug: {
                    notIn: [
                        'innerwear',
                        'pyjamas'
                    ]
                }
            },
            // Also exclude any product whose name mentions "underwear" or "boxer"
            NOT: [
                {
                    name: {
                        contains: 'underwear'
                    }
                },
                {
                    name: {
                        contains: 'Underwear'
                    }
                },
                {
                    name: {
                        contains: 'boxer'
                    }
                },
                {
                    name: {
                        contains: 'Boxer'
                    }
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2
            },
            variants: true,
            category: true
        }
    });
}
async function getRelatedProducts(productId, categoryId, limit = 4) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            categoryId,
            published: true,
            status: 'ACTIVE',
            id: {
                not: productId
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2
            },
            variants: true,
            category: true
        }
    });
}
async function getHomepageContent() {
    const c = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].homepageContent.findUnique({
        where: {
            id: 'singleton'
        }
    });
    return c;
}
async function getAdminSettings() {
    const s = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
        where: {
            id: 'singleton'
        }
    });
    return s;
}
async function getActiveBanners() {
    const now = new Date();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].promotionalBanner.findMany({
        where: {
            active: true,
            AND: [
                {
                    OR: [
                        {
                            startsAt: null
                        },
                        {
                            startsAt: {
                                lte: now
                            }
                        }
                    ]
                },
                {
                    OR: [
                        {
                            endsAt: null
                        },
                        {
                            endsAt: {
                                gte: now
                            }
                        }
                    ]
                }
            ]
        },
        orderBy: {
            order: 'asc'
        }
    });
}
async function getFAQs(category) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].fAQ.findMany({
        where: {
            published: true,
            ...category ? {
                category
            } : {}
        },
        orderBy: [
            {
                order: 'asc'
            },
            {
                createdAt: 'asc'
            }
        ]
    });
}
async function getCartWithProducts(lines) {
    if (!lines.length) return [];
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            id: {
                in: lines.map((l)=>l.productId)
            }
        },
        include: {
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 1
            },
            variants: true
        }
    });
    return lines.map((line)=>{
        const p = products.find((p)=>p.id === line.productId);
        if (!p) return null;
        const variant = line.variantId ? p.variants.find((v)=>v.id === line.variantId) : undefined;
        return {
            ...line,
            name: p.name,
            slug: p.slug,
            price: variant?.price ?? p.salePrice ?? p.price,
            originalPrice: p.salePrice ? p.price : undefined,
            image: p.images[0]?.url,
            sku: variant?.sku ?? p.sku,
            inStock: variant ? variant.stock > 0 : p.variants.some((v)=>v.stock > 0),
            maxQuantity: variant?.stock ?? Math.max(...p.variants.map((v)=>v.stock), 0)
        };
    }).filter(Boolean);
}
async function getAdminStats(daysBack = 30) {
    const now = new Date();
    const since = new Date();
    since.setDate(since.getDate() - daysBack);
    const [totalOrders, pendingOrders, completedOrders, totalProducts, lowStockProducts, outOfStockProducts, customers, newCustomers, recentOrders, revenueAgg, refundsAgg, avgOrderAgg, cancelledOrders] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                createdAt: {
                    gte: since
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                createdAt: {
                    gte: since
                },
                status: {
                    in: [
                        'PENDING',
                        'PAID',
                        'PROCESSING',
                        'READY_FOR_DISPATCH'
                    ]
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                createdAt: {
                    gte: since
                },
                status: 'DELIVERED'
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.count({
            where: {
                published: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].productVariant.count({
            where: {
                stock: {
                    lte: 5,
                    gt: 0
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].productVariant.count({
            where: {
                stock: {
                    lte: 0
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                role: 'CUSTOMER'
            }
        }),
        // New customers (joined in the window)
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.count({
            where: {
                role: 'CUSTOMER',
                createdAt: {
                    gte: since
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.findMany({
            take: 8,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                createdAt: {
                    gte: since
                }
            },
            include: {
                items: true,
                user: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.aggregate({
            where: {
                createdAt: {
                    gte: since
                },
                status: {
                    in: [
                        'DELIVERED',
                        'SHIPPED',
                        'READY_FOR_DISPATCH'
                    ]
                }
            },
            _sum: {
                total: true
            }
        }),
        // Refunds total in window
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].refund.aggregate({
            where: {
                createdAt: {
                    gte: since
                },
                status: {
                    in: [
                        'SUCCESS',
                        'PARTIAL'
                    ]
                }
            },
            _sum: {
                amount: true
            }
        }),
        // Average order value
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.aggregate({
            where: {
                createdAt: {
                    gte: since
                },
                status: {
                    notIn: [
                        'CANCELLED'
                    ]
                }
            },
            _avg: {
                total: true
            },
            _count: true
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.count({
            where: {
                createdAt: {
                    gte: since
                },
                status: 'CANCELLED'
            }
        })
    ]);
    // Compute returning customers (ordered in this window AND had a previous order)
    // For perf, just count customers who have >1 order total. Approximate but useful.
    const returningCustomersResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$queryRaw`
    SELECT COUNT(*) as count FROM (
      SELECT "userId"
      FROM "Order"
      WHERE "userId" IS NOT NULL
        AND "createdAt" >= ${since}
        AND "status" != 'CANCELLED'
      GROUP BY "userId"
      HAVING COUNT(*) > 1
    ) as sub
  `;
    const returningCustomers = Number(returningCustomersResult[0]?.count ?? 0);
    return {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        customers,
        newCustomers,
        returningCustomers,
        recentOrders,
        revenue: revenueAgg._sum.total ?? 0,
        refunds: refundsAgg._sum.amount ?? 0,
        netRevenue: (revenueAgg._sum.total ?? 0) - (refundsAgg._sum.amount ?? 0),
        avgOrderValue: avgOrderAgg._avg.total ?? 0,
        ordersForAov: avgOrderAgg._count ?? 0
    };
}
async function getTopProducts(limit = 5, sinceDays = null) {
    const where = sinceDays ? {
        order: {
            createdAt: {
                gte: new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000)
            },
            status: {
                notIn: [
                    'CANCELLED'
                ]
            }
        }
    } : {};
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orderItem.groupBy({
        by: [
            'productId',
            'productName',
            'productSlug',
            'productImage'
        ],
        where,
        _sum: {
            quantity: true,
            totalPrice: true
        },
        _count: true,
        orderBy: {
            _sum: {
                quantity: 'desc'
            }
        },
        take: limit
    });
    return items;
}
async function getSalesByCategory() {
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].orderItem.findMany({
        select: {
            quantity: true,
            totalPrice: true,
            product: {
                select: {
                    category: {
                        select: {
                            name: true,
                            parent: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    const byCat = new Map();
    for (const it of items){
        const catName = it.product.category.parent?.name ?? it.product.category.name;
        const existing = byCat.get(catName) ?? {
            revenue: 0,
            quantity: 0
        };
        existing.revenue += it.totalPrice;
        existing.quantity += it.quantity;
        byCat.set(catName, existing);
    }
    return Array.from(byCat.entries()).map(([name, v])=>({
            name,
            ...v
        }));
}
async function getRevenueTrend(days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.findMany({
        where: {
            createdAt: {
                gte: since
            },
            status: {
                notIn: [
                    'CANCELLED'
                ]
            }
        },
        select: {
            createdAt: true,
            total: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    // group by day
    const byDay = new Map();
    for(let i = days - 1; i >= 0; i--){
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        byDay.set(key, 0);
    }
    for (const o of orders){
        const key = o.createdAt.toISOString().slice(0, 10);
        byDay.set(key, (byDay.get(key) ?? 0) + o.total);
    }
    return Array.from(byDay.entries()).map(([date, revenue])=>({
            date,
            revenue
        }));
}
}),
"[project]/src/components/shop/category-hub-content.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryHubContent",
    ()=>CategoryHubContent
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoryHubContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoryHubContent() from the server but CategoryHubContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/shop/category-hub-content.tsx <module evaluation>", "CategoryHubContent");
}),
"[project]/src/components/shop/category-hub-content.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryHubContent",
    ()=>CategoryHubContent
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CategoryHubContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CategoryHubContent() from the server but CategoryHubContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/shop/category-hub-content.tsx", "CategoryHubContent");
}),
"[project]/src/components/shop/category-hub-content.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/shop/category-hub-content.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/shop/category-hub-content.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/shop/category-hub.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryHub",
    ()=>CategoryHub,
    "CategoryHubPage",
    ()=>CategoryHubPage,
    "default",
    ()=>__TURBOPACK__default__export__,
    "hubMetadata",
    ()=>hubMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2d$hubs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/category-hubs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/category-hub-content.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
function hubMetadata(route) {
    const hub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2d$hubs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHub"])(route);
    if (!hub) return {};
    return {
        title: hub.metaTitle,
        description: hub.metaDescription
    };
}
async function CategoryHubPage({ route }) {
    const hub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2d$hubs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHub"])(route);
    if (!hub) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHubData"])(hub.rootSlug, hub.groups);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryHubContent"], {
        hub: hub,
        data: data
    }, void 0, false, {
        fileName: "[project]/src/components/shop/category-hub.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
function CategoryHub() {
    return null;
}
const __TURBOPACK__default__export__ = CategoryHub;
}),
"[project]/src/app/footwear/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FootwearPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/category-hub.tsx [app-rsc] (ecmascript)");
;
;
const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hubMetadata"])('footwear');
function FootwearPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$category$2d$hub$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryHubPage"], {
        route: "footwear"
    }, void 0, false, {
        fileName: "[project]/src/app/footwear/page.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/footwear/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/footwear/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__96cc2690._.js.map