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
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
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
"[project]/src/lib/rate-limit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Simple in-memory sliding-window rate limiter with automatic lockout.
 *
 * Zero-dependency and works everywhere (Node runtime in server actions and
 * the NextAuth `authorize` callback). On multi-instance serverless hosts the
 * map is per-instance, so it is best-effort — it still stops brute-force
 * bursts and is fully effective on single-instance deployments (Docker, FC,
 * small Vercel traffic). For strict multi-instance guarantees, swap the
 * storage for Upstash Redis later; the call sites stay identical.
 */ __turbopack_context__.s([
    "clientIpFromHeaders",
    ()=>clientIpFromHeaders,
    "rateLimit",
    ()=>rateLimit
]);
const buckets = new Map();
const WINDOW_TTL = 15 * 60 * 1000 // keep hits max 15 min
;
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();
function cleanup(now) {
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;
    for (const [key, bucket] of buckets){
        const fresh = bucket.hits.filter((t)=>now - t < WINDOW_TTL);
        const stillBlocked = bucket.blockedUntil && bucket.blockedUntil > now;
        if (fresh.length === 0 && !stillBlocked) {
            buckets.delete(key);
        } else {
            bucket.hits = fresh;
        }
    }
}
function rateLimit(key, opts = {}) {
    const { limit = 8, windowMs = 10 * 60 * 1000, blockMs = 15 * 60 * 1000 } = opts;
    const now = Date.now();
    cleanup(now);
    const bucket = buckets.get(key) ?? {
        hits: []
    };
    // Locked out?
    if (bucket.blockedUntil && bucket.blockedUntil > now) {
        return {
            ok: false,
            retryAfterSec: Math.ceil((bucket.blockedUntil - now) / 1000),
            remaining: 0
        };
    }
    // Slide the window
    bucket.hits = bucket.hits.filter((t)=>now - t < windowMs);
    bucket.hits.push(now);
    if (bucket.hits.length > limit) {
        bucket.blockedUntil = now + blockMs;
        buckets.set(key, bucket);
        return {
            ok: false,
            retryAfterSec: Math.ceil(blockMs / 1000),
            remaining: 0
        };
    }
    buckets.set(key, bucket);
    return {
        ok: true,
        retryAfterSec: 0,
        remaining: Math.max(0, limit - bucket.hits.length)
    };
}
function clientIpFromHeaders(h) {
    return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}
}),
"[project]/src/lib/auth-fallback-secret.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared NextAuth fallback secret.
// Kept in its own module (no Prisma / DB imports) so that the Edge-runtime
// middleware can import it WITHOUT pulling the full auth stack into the
// Edge bundle.
//
// Used only when NEXTAUTH_SECRET is not set in the environment. In
// production you should always set NEXTAUTH_SECRET as a real env var.
__turbopack_context__.s([
    "FALLBACK_SECRET",
    ()=>FALLBACK_SECRET,
    "authSecret",
    ()=>authSecret
]);
const FALLBACK_SECRET = 'qpeD1LhpzwbQBwjsFoLy2tTKyJKDx0XWxlZujeLSIuM=';
const authSecret = process.env.NEXTAUTH_SECRET || FALLBACK_SECRET;
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@next-auth/prisma-adapter/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-fallback-secret.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
const authOptions = {
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/account/login'
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const email = credentials.email.toLowerCase();
                // Brute-force throttle: 8 failed-capable attempts per 10 min per email,
                // then a 15-minute lockout. Rate-limit BEFORE any DB work so locked
                // attackers never touch the database.
                const rl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rateLimit"])(`login:${email}`, {
                    limit: 8,
                    windowMs: 10 * 60 * 1000,
                    blockMs: 15 * 60 * 1000
                });
                if (!rl.ok) {
                    console.warn(`[auth] login rate-limited for ${email} — retry in ${rl.retryAfterSec}s`);
                    return null;
                }
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user || !user.passwordHash) return null;
                // Defensive: inactive accounts cannot sign in.
                if (user.active === false) return null;
                const ok = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.passwordHash);
                if (!ok) return null;
                // Stamp lastLoginAt so the dashboard can show the most recent login.
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        lastLoginAt: new Date()
                    }
                }).catch(()=>{});
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                ;
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authSecret"]
};
}),
"[project]/src/lib/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentStaffUser",
    ()=>getCurrentStaffUser,
    "getSession",
    ()=>getSession,
    "requireAdmin",
    ()=>requireAdmin,
    "requireUser",
    ()=>requireUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getSession() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
}
async function requireUser() {
    const session = await getSession();
    if (!session?.user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/account/login?callbackUrl=' + encodeURIComponent('/account'));
    }
    return session.user;
}
const getCurrentStaffUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const session = await getSession();
    if (!session?.user) return null;
    const u = session.user;
    if (!u.id) return null;
    const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
        where: {
            id: u.id
        }
    });
    if (!dbUser || dbUser.role === 'CUSTOMER' || !dbUser.active) return null;
    return dbUser;
});
async function requireAdmin() {
    const dbUser = await getCurrentStaffUser();
    if (!dbUser) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
    return dbUser;
}
}),
"[project]/src/lib/permissions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "getMyPermissionCodes",
    ()=>getMyPermissionCodes,
    "getStaffContext",
    ()=>getStaffContext,
    "requireStaff",
    ()=>requireStaff,
    "requireStaffWithPermission",
    ()=>requireStaffWithPermission,
    "requireSuperAdmin",
    ()=>requireSuperAdmin,
    "roleHasPermission",
    ()=>roleHasPermission
]);
/**
 * Permissions library
 *
 * Defines the granular permission codes used by the admin dashboard and
 * provides a `requireStaff(permission)` gate that:
 *   1. Requires an authenticated session
 *   2. Re-fetches the user from DB to ensure role is current
 *   3. Checks the user's role grants the requested permission
 *   4. Returns the user object (or redirects to /admin/login or 403)
 *
 * All admin server actions should call `requireStaff()` (or `requireAdmin()`
 * for super-admin-only operations) as their FIRST line.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-rsc] (ecmascript)");
;
;
const PERMISSIONS = [
    // Catalogue
    {
        code: 'product.create',
        name: 'Create products',
        roles: [
            'ADMIN',
            'MANAGER',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'product.update',
        name: 'Edit products',
        roles: [
            'ADMIN',
            'MANAGER',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'product.delete',
        name: 'Delete products',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'product.publish',
        name: 'Publish/unpublish products',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'category.manage',
        name: 'Manage categories',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'brand.manage',
        name: 'Manage brands',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'attribute.manage',
        name: 'Manage attributes',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    // Inventory
    {
        code: 'inventory.view',
        name: 'View inventory',
        roles: [
            'ADMIN',
            'MANAGER',
            'INVENTORY_MANAGER',
            'SALES'
        ]
    },
    {
        code: 'inventory.adjust',
        name: 'Adjust stock',
        roles: [
            'ADMIN',
            'MANAGER',
            'INVENTORY_MANAGER'
        ]
    },
    // Orders
    {
        code: 'order.view',
        name: 'View orders',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT',
            'INVENTORY_MANAGER'
        ]
    },
    {
        code: 'order.update_status',
        name: 'Update order status',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT'
        ]
    },
    {
        code: 'order.cancel',
        name: 'Cancel orders',
        roles: [
            'ADMIN',
            'MANAGER',
            'CUSTOMER_SUPPORT'
        ]
    },
    {
        code: 'order.refund',
        name: 'Refund orders',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'order.update_tracking',
        name: 'Update tracking',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT'
        ]
    },
    // Customers
    {
        code: 'customer.view',
        name: 'View customers',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT'
        ]
    },
    {
        code: 'customer.update',
        name: 'Edit customers',
        roles: [
            'ADMIN',
            'MANAGER',
            'CUSTOMER_SUPPORT'
        ]
    },
    {
        code: 'customer.disable',
        name: 'Disable customers',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'customer.note',
        name: 'Add customer notes',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT'
        ]
    },
    // Services
    {
        code: 'service.enquiry.view',
        name: 'View service enquiries',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT'
        ]
    },
    {
        code: 'service.enquiry.manage',
        name: 'Manage service enquiries',
        roles: [
            'ADMIN',
            'MANAGER',
            'CUSTOMER_SUPPORT'
        ]
    },
    // Marketing
    {
        code: 'coupon.manage',
        name: 'Manage coupons',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'campaign.manage',
        name: 'Manage campaigns',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'banner.manage',
        name: 'Manage banners',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'faq.manage',
        name: 'Manage FAQs',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    {
        code: 'review.moderate',
        name: 'Moderate reviews',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER',
            'CUSTOMER_SUPPORT'
        ]
    },
    // Shipping
    {
        code: 'shipping.manage',
        name: 'Manage shipping',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    // Insights
    {
        code: 'analytics.view',
        name: 'View analytics',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES'
        ]
    },
    {
        code: 'report.view',
        name: 'View reports',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'report.export',
        name: 'Export reports',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    // CMS
    {
        code: 'cms.manage',
        name: 'Manage homepage content',
        roles: [
            'ADMIN',
            'MANAGER',
            'CONTENT_MANAGER'
        ]
    },
    // System
    {
        code: 'settings.manage',
        name: 'Manage store settings',
        roles: [
            'ADMIN'
        ]
    },
    {
        code: 'staff.manage',
        name: 'Manage staff users',
        roles: [
            'ADMIN'
        ]
    },
    {
        code: 'audit.view',
        name: 'View audit log',
        roles: [
            'ADMIN',
            'MANAGER'
        ]
    },
    {
        code: 'notification.view',
        name: 'View notifications',
        roles: [
            'ADMIN',
            'MANAGER',
            'SALES',
            'CUSTOMER_SUPPORT',
            'INVENTORY_MANAGER',
            'CONTENT_MANAGER'
        ]
    }
];
// Build a Set of {role, code} pairs for quick lookup
const ROLE_PERMISSIONS = new Set();
for (const p of PERMISSIONS){
    for (const r of p.roles){
        ROLE_PERMISSIONS.add(`${r}:${p.code}`);
    }
}
function roleHasPermission(role, code) {
    // ADMIN is superuser — has every permission
    if (role === 'ADMIN') return true;
    return ROLE_PERMISSIONS.has(`${role}:${code}`);
}
async function requireStaff() {
    const dbUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentStaffUser"])();
    if (!dbUser) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
    return dbUser;
}
async function requireStaffWithPermission(code) {
    const user = await requireStaff();
    if (!roleHasPermission(user.role, code)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin?forbidden=1');
    }
    return user;
}
async function requireSuperAdmin() {
    const user = await requireStaff();
    if (user.role !== 'ADMIN') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin?forbidden=1');
    }
    return user;
}
async function getStaffContext() {
    const dbUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentStaffUser"])();
    if (!dbUser) return null;
    return {
        user: dbUser,
        can: (code)=>roleHasPermission(dbUser.role, code),
        isSuperAdmin: dbUser.role === 'ADMIN'
    };
}
async function getMyPermissionCodes() {
    const ctx = await getStaffContext();
    if (!ctx) return [];
    if (ctx.isSuperAdmin) {
        // Super-admin has all permissions — return empty array (legacy mode)
        return [];
    }
    return PERMISSIONS.filter((p)=>ctx.can(p.code)).map((p)=>p.code);
}
}),
"[project]/src/components/admin/admin-layout.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AdminLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AdminLayout() from the server but AdminLayout is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/admin/admin-layout.tsx <module evaluation>", "AdminLayout");
}),
"[project]/src/components/admin/admin-layout.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminLayout",
    ()=>AdminLayout
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AdminLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AdminLayout() from the server but AdminLayout is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/admin/admin-layout.tsx", "AdminLayout");
}),
"[project]/src/components/admin/admin-layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$admin$2d$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/admin/admin-layout.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$admin$2d$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/admin/admin-layout.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$admin$2d$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/components/ui/card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/lib/services-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/seo.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-rsc] (ecmascript)");
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
    const cats = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
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
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
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
    for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES"]){
        bump(titles, `${s.name} — Wardrobecare Services`);
        bump(descs, s.tagline);
    }
    // Static page overrides
    const overrides = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findMany({
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES"].map((s)=>({
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
    const stored = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoTemplate.findUnique({
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
    const stored = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoTemplate.findMany();
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findUnique({
        where: {
            route
        }
    });
}
async function getOrCreateSeoOverride(route, contentType, name) {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findUnique({
        where: {
            route
        }
    });
    if (existing) return existing;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.create({
        data: {
            route,
            contentType,
            name
        }
    });
}
}),
"[project]/src/lib/seo-queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findNextPageNeedingWork",
    ()=>findNextPageNeedingWork,
    "getSeoOverviewStats",
    ()=>getSeoOverviewStats,
    "getSeoRecordForEdit",
    ()=>getSeoRecordForEdit,
    "listSeoPages",
    ()=>listSeoPages
]);
/**
 * SEO Manager — server-side data fetching helpers.
 *
 * All the queries that build the "page list" the admin sees, with
 * pagination at the DB level. Reused by /admin/seo (overview) and
 * /admin/seo/pages (full list).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo.ts [app-rsc] (ecmascript)");
;
;
;
async function listSeoPages(opts) {
    const limit = opts.limit ?? 50;
    const offset = opts.offset ?? 0;
    // Build all records in memory — fine for the typical catalogue size
    // (the project has hundreds of products, not millions). We use
    // db.findMany with select to keep payload size down.
    const [categories, products, overrides, dups] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                parentId: true,
                parent: {
                    select: {
                        name: true
                    }
                },
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                seoIntroText: true,
                seoOgImage: true,
                noindex: true,
                inSitemap: true,
                active: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                ogImage: true,
                noindex: true,
                inSitemap: true,
                published: true,
                status: true,
                images: {
                    select: {
                        altText: true,
                        url: true,
                        position: true
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findMany(),
        __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.buildDuplicateMaps())
    ]);
    const rows = [];
    for (const c of categories)rows.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categoryToRecord"])(c));
    for (const p of products)rows.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productToRecord"])(p));
    for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES"]){
        const route = `/services/${s.slug}`;
        const ov = overrides.find((o)=>o.route === route);
        rows.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serviceToRecord"])(s, ov ?? null));
    }
    const { STATIC_PAGES } = await __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)");
    for (const p of STATIC_PAGES){
        const ov = overrides.find((o)=>o.route === p.route);
        rows.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pageOverrideToRecord"])(p.route, p.name, ov ?? null));
    }
    // Score each
    const { scoreFor, checksFor, bandFor } = await __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)");
    let scored = rows.map((r)=>{
        const score = scoreFor(r, dups);
        return {
            ...r,
            score
        };
    });
    // Filter by content type
    if (opts.type && opts.type !== 'all') {
        scored = scored.filter((r)=>r.type === opts.type);
    }
    // Filter by issue
    if (opts.issue) {
        scored = scored.filter((r)=>{
            // Skip hidden coming-soon records unless they're the issue we're after
            if (r.hidden && r.noindex) return opts.issue === 'idxMap';
            const cs = checksFor(r, dups);
            return cs.some((c)=>c.key === opts.issue && !c.ok);
        });
    }
    // Filter by band
    if (opts.band) {
        scored = scored.filter((r)=>bandFor(r.score).cls === opts.band);
    }
    // Filter by query (name + url)
    if (opts.query) {
        const q = opts.query.toLowerCase();
        scored = scored.filter((r)=>(r.name + r.url).toLowerCase().includes(q));
    }
    // Sort: by score ascending (worst first) — that's the most actionable view
    scored.sort((a, b)=>a.score - b.score);
    const total = scored.length;
    const page = scored.slice(offset, offset + limit);
    return {
        rows: page,
        total
    };
}
async function getSeoOverviewStats() {
    const { buildDuplicateMaps, checksFor, scoreFor, bandFor } = await __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)");
    const [categories, products, overrides, dups] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                parentId: true,
                parent: {
                    select: {
                        name: true
                    }
                },
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                seoIntroText: true,
                seoOgImage: true,
                noindex: true,
                inSitemap: true,
                active: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                ogImage: true,
                noindex: true,
                inSitemap: true,
                published: true,
                status: true,
                images: {
                    select: {
                        altText: true,
                        url: true,
                        position: true
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findMany(),
        buildDuplicateMaps()
    ]);
    const all = [];
    for (const c of categories)all.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categoryToRecord"])(c));
    for (const p of products)all.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productToRecord"])(p));
    for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES"]){
        const route = `/services/${s.slug}`;
        const ov = overrides.find((o)=>o.route === route);
        all.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serviceToRecord"])(s, ov ?? null));
    }
    const { STATIC_PAGES } = await __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)");
    for (const p of STATIC_PAGES){
        const ov = overrides.find((o)=>o.route === p.route);
        all.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pageOverrideToRecord"])(p.route, p.name, ov ?? null));
    }
    const scored = all.map((r)=>({
            r,
            score: scoreFor(r, dups)
        }));
    const scores = scored.map((s)=>s.score);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b)=>a + b, 0) / scores.length) : 0;
    const good = scores.filter((s)=>s >= 85).length;
    const needsWork = scores.filter((s)=>s >= 60 && s < 85).length;
    const poor = scores.filter((s)=>s < 60).length;
    const total = all.length;
    const noindex = all.filter((r)=>r.noindex).length;
    // Issue counts — the "Fix these first" cards
    const issueKeys = [
        'title',
        'titleLen',
        'titleDup',
        'desc',
        'descLen',
        'intro',
        'alt',
        'og',
        'h1'
    ];
    const issues = issueKeys.map((k)=>{
        const count = all.filter((r)=>{
            if (r.hidden && r.noindex) return false;
            const cs = checksFor(r, dups);
            return cs.some((c)=>c.key === k && !c.ok);
        }).length;
        return {
            key: k,
            count
        };
    }).filter((i)=>i.count > 0);
    // Per-type progress
    const byType = [];
    for (const [type, label] of [
        [
            'category',
            'Categories & subcategories'
        ],
        [
            'product',
            'Products'
        ],
        [
            'service',
            'Services'
        ],
        [
            'page',
            'Pages & guides'
        ]
    ]){
        const subset = scored.filter((s)=>s.r.type === type);
        if (subset.length === 0) {
            byType.push({
                type,
                label,
                count: 0,
                avg: 0
            });
        } else {
            const a = Math.round(subset.reduce((x, s)=>x + s.score, 0) / subset.length);
            byType.push({
                type,
                label,
                count: subset.length,
                avg: a
            });
        }
    }
    return {
        avg,
        good,
        needsWork,
        poor,
        total,
        noindex,
        issues,
        byType
    };
}
async function getSeoRecordForEdit(type, id) {
    if (type === 'category') {
        const c = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                parentId: true,
                parent: {
                    select: {
                        name: true
                    }
                },
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                seoIntroText: true,
                seoOgImage: true,
                noindex: true,
                inSitemap: true,
                active: true
            }
        });
        return c ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categoryToRecord"])(c) : null;
    }
    if (type === 'product') {
        const p = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                seoTitle: true,
                seoDescription: true,
                seoH1: true,
                ogImage: true,
                noindex: true,
                inSitemap: true,
                published: true,
                status: true,
                images: {
                    select: {
                        id: true,
                        altText: true,
                        url: true,
                        position: true
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });
        return p ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productToRecord"])(p) : null;
    }
    if (type === 'service' || type === 'page') {
        // For service/page, "id" passed in is the route
        const ov = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].seoOverride.findUnique({
            where: {
                route: id
            }
        });
        if (type === 'service') {
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES"].find((x)=>`/services/${x.slug}` === id);
            if (!s) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serviceToRecord"])(s, ov);
        } else {
            const { STATIC_PAGES } = await __turbopack_context__.A("[project]/src/lib/seo.ts [app-rsc] (ecmascript, async loader)");
            const p = STATIC_PAGES.find((x)=>x.route === id);
            if (!p) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pageOverrideToRecord"])(p.route, p.name, ov);
        }
    }
    return null;
}
async function findNextPageNeedingWork(currentType, currentId) {
    const { rows } = await listSeoPages({
        limit: 10000
    });
    const idx = rows.findIndex((r)=>r.type === currentType && r.id === currentId);
    if (idx < 0) {
        // Not in list — return first <85
        const next = rows.find((r)=>r.score < 85 && !(r.hidden && r.noindex));
        return next ? {
            type: next.type,
            id: next.id
        } : null;
    }
    // Search forward from idx+1, wrapping around
    for(let i = 1; i <= rows.length; i++){
        const candidate = rows[(idx + i) % rows.length];
        if (candidate.score < 85 && !(candidate.hidden && candidate.noindex)) {
            return {
                type: candidate.type,
                id: candidate.id
            };
        }
    }
    return null;
}
}),
"[project]/src/app/admin/seo/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeoOverviewPage,
    "dynamic",
    ()=>dynamic,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/permissions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$admin$2d$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/admin-layout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2d$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo-queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const dynamic = 'force-dynamic';
const metadata = {
    title: 'SEO Manager',
    description: 'Manage SEO across every category, product, service and page',
    robots: {
        index: false,
        follow: false
    }
};
async function SeoOverviewPage() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const perms = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMyPermissionCodes"])();
    const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2d$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSeoOverviewStats"])();
    const bandColor = (avg)=>avg >= 85 ? 'text-emerald-600' : avg >= 60 ? 'text-amber-600' : 'text-red-600';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$admin$2d$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AdminLayout"], {
        title: "SEO Manager",
        description: "One place to fix SEO across categories, products, services and pages",
        permissions: perms,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-wrap gap-2 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                size: "sm",
                                children: "Overview"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 35,
                                columnNumber: 35
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo/pages",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: "All pages"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 36,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo/templates",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: "Auto templates"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 37,
                                columnNumber: 45
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo/redirects",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: "Redirects"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 38,
                                columnNumber: 45
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo/sitemap",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: "Sitemap & robots"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 39,
                                columnNumber: 43
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin/seo/notes",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: "Developer notes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 40,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/seo/page.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 lg:grid-cols-5 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-3xl font-display ${bandColor(stats.avg)}`,
                                        children: stats.avg
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase text-muted-foreground mt-1",
                                        children: "Average SEO score"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-display text-emerald-600",
                                        children: stats.good
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase text-muted-foreground mt-1",
                                        children: "Pages in good shape"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-display text-amber-600",
                                        children: stats.needsWork
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase text-muted-foreground mt-1",
                                        children: "Pages needing work"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-display text-red-600",
                                        children: stats.poor
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase text-muted-foreground mt-1",
                                        children: "Pages scoring poor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-display",
                                        children: stats.total
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase text-muted-foreground mt-1",
                                        children: "Pages monitored"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/seo/page.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "Fix these first"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "The most common SEO issues across the site"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                    children: stats.issues.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground py-6 text-center",
                                        children: "No SEO issues detected. Every page passes the editorial checks."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "flex flex-col gap-2",
                                        children: stats.issues.map((issue)=>{
                                            const label = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ISSUE_LABELS"].find((l)=>l.key === issue.key)?.label ?? issue.key;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between gap-2 py-2 border-b last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "destructive",
                                                                className: "font-mono",
                                                                children: issue.count
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm truncate",
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/admin/seo/pages?issue=${issue.key}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: "ghost",
                                                            children: "Show pages →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, issue.key, true, {
                                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "Progress by content type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Average SEO score per content type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-4",
                                            children: stats.byType.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        t.label,
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-muted-foreground",
                                                                            children: [
                                                                                "(",
                                                                                t.count,
                                                                                ")"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                            lineNumber: 121,
                                                                            columnNumber: 39
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: bandColor(t.avg),
                                                                    children: t.avg
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                    lineNumber: 122,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-2 bg-muted rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: t.avg >= 85 ? 'bg-emerald-500' : t.avg >= 60 ? 'bg-amber-500' : 'bg-red-500',
                                                                style: {
                                                                    width: `${t.avg}%`,
                                                                    height: '100%'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, t.type, true, {
                                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mt-4 italic",
                                            children: "Score = checks passed ÷ checks that apply. Good ≥ 85, Needs work 60–84, Poor < 60."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/seo/page.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardTitle"], {
                                children: "Quick actions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/seo/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "flex flex-wrap gap-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            children: stats.noindex
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground ml-2",
                                            children: "pages hidden from Google"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/seo/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/seo/pages",
                                    className: "ml-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "outline",
                                        children: "Open all pages →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/seo/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/seo/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/seo/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/seo/page.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/seo/page.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/seo/page.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/admin/seo/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/admin/seo/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fea0f8a2._.js.map