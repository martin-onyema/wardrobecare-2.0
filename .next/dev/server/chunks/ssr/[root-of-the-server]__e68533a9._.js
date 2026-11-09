module.exports = [
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
"[project]/src/lib/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Format a price in NGN with no decimals and ₦ prefix.
 * Example: 18500 → "₦18,500"
 */ __turbopack_context__.s([
    "NIGERIAN_STATES",
    ()=>NIGERIAN_STATES,
    "calculateDeliveryFee",
    ()=>calculateDeliveryFee,
    "effectivePrice",
    ()=>effectivePrice,
    "formatDate",
    ()=>formatDate,
    "formatDateShort",
    ()=>formatDateShort,
    "formatNGN",
    ()=>formatNGN,
    "formatNGNCompact",
    ()=>formatNGNCompact,
    "generateOrderNumber",
    ()=>generateOrderNumber,
    "slugify",
    ()=>slugify,
    "truncate",
    ()=>truncate,
    "whatsappLink",
    ()=>whatsappLink
]);
function formatNGN(amount) {
    if (amount == null || isNaN(amount)) return '₦0';
    return '₦' + Math.round(amount).toLocaleString('en-NG');
}
function formatNGNCompact(amount) {
    if (amount >= 1000) {
        return '₦' + (amount / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return formatNGN(amount);
}
function effectivePrice(price, salePrice) {
    if (salePrice && salePrice > 0 && salePrice < price) return salePrice;
    return price;
}
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
function formatDateShort(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-NG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
function generateOrderNumber() {
    const ts = Date.now().toString(36).toUpperCase().slice(-5);
    const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
    return `WC-${ts}${rand}`;
}
function whatsappLink(phone, message) {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
function slugify(s) {
    return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}
function truncate(s, n) {
    if (s.length <= n) return s;
    return s.slice(0, n).trim() + '…';
}
const NIGERIAN_STATES = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT (Abuja)',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara'
];
function calculateDeliveryFee(subtotal, defaultFee = 2500, freeThreshold = 500000) {
    if (subtotal >= freeThreshold) return 0;
    return defaultFee;
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/paystack/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Paystack payment integration helper.
 * Secret key is NEVER exposed to the client. All verification happens server-side.
 */ __turbopack_context__.s([
    "getPaystackPublicKey",
    ()=>getPaystackPublicKey,
    "initializePaystackTransaction",
    ()=>initializePaystackTransaction,
    "refundPaystackTransaction",
    ()=>refundPaystackTransaction,
    "verifyPaystackSignature",
    ()=>verifyPaystackSignature,
    "verifyPaystackTransaction",
    ()=>verifyPaystackTransaction
]);
/**
 * Verify the `x-paystack-signature` header against the raw body using
 * HMAC SHA512 with the secret key.
 *
 * Used by the webhook endpoint to ensure the request really came from
 * Paystack and not an attacker.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
async function initializePaystackTransaction(params) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret || secret === 'sk_test_x') {
        // Sandbox / not-configured path: return a mock URL pointing to /checkout/verify
        // so the dev experience is smooth. In production, set PAYSTACK_SECRET_KEY.
        const sep = params.callback_url.includes('?') ? '&' : '?';
        return {
            status: true,
            message: 'Mock (no Paystack secret configured)',
            data: {
                authorization_url: `${params.callback_url}${sep}reference=${params.reference}&mock=1`,
                access_code: 'mock_access_code',
                reference: params.reference
            }
        };
    }
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: params.email,
            amount: Math.round(params.amount * 100),
            reference: params.reference,
            callback_url: params.callback_url,
            metadata: params.metadata,
            currency: 'NGN'
        })
    });
    return res.json();
}
async function verifyPaystackTransaction(reference) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret || secret === 'sk_test_x') {
        // Sandbox path: trust the request only if it carries mock=1
        return {
            status: true,
            message: 'Mock verification',
            data: {
                id: 0,
                domain: 'test',
                status: 'success',
                reference,
                amount: 0,
                currency: 'NGN',
                gateway_response: 'Approved',
                paid_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                channel: 'mock',
                customer: {
                    email: ''
                }
            }
        };
    }
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: {
            Authorization: `Bearer ${secret}`
        }
    });
    if (!res.ok) return null;
    return res.json();
}
function getPaystackPublicKey() {
    return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_x';
}
async function refundPaystackTransaction(params) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret || secret === 'sk_test_x') {
        // Mock path — Pretend the refund succeeded
        return {
            status: true,
            message: 'Mock refund (no Paystack secret configured)',
            data: {
                transaction: 0,
                integration: 0,
                domain: 'test',
                currency: 'NGN',
                amount: Math.round(params.amount * 100),
                channel: 'mock',
                merchant_note: params.merchant_note ?? null,
                status: 'processed',
                refunded_at: new Date().toISOString(),
                refund_reference: `rfn_mock_${Date.now()}`,
                refund_type: 'partial',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        };
    }
    const res = await fetch('https://api.paystack.co/refund', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reference: params.reference,
            amount: Math.round(params.amount * 100),
            currency: 'NGN',
            merchant_note: params.merchant_note
        })
    });
    if (!res.ok) return null;
    return res.json();
}
;
function verifyPaystackSignature(payload, signature) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret || secret === 'sk_test_x') {
        // Mock path: accept any payload so dev webhook tests work
        return true;
    }
    const expected = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHmac('sha512', secret).update(payload).digest('hex');
    // Use timingSafeEqual to avoid timing attacks
    try {
        if (expected.length !== signature.length) return false;
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
    } catch  {
        return false;
    }
}
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
"[project]/src/lib/audit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auditLog",
    ()=>auditLog,
    "describeChanges",
    ()=>describeChanges,
    "diffChangedFields",
    ()=>diffChangedFields
]);
/**
 * Audit log helper.
 *
 * Wraps every admin action so we have a complete trail of:
 *   - WHO did it (actorId)
 *   - WHAT changed (action, entityType, entityId, before/after snapshots)
 *   - WHEN (createdAt)
 *   - WHY (description, reason)
 *
 * Usage:
 *   await auditLog({
 *     actorId: user.id,
 *     action: 'product.update',
 *     entityType: 'Product',
 *     entityId: product.id,
 *     before: existingSnapshot,
 *     after: updatedFields,
 *     description: `Updated product "${product.name}" (price ₦18,500 → ₦17,000)`,
 *   })
 *
 * Audit writes are best-effort — failures here should never break the
 * main operation. They're wrapped in try/catch internally.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function auditLog(input) {
    try {
        const h = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
        const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || null;
        const userAgent = h.get('user-agent') || null;
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].auditLog.create({
            data: {
                actorId: input.actorId,
                action: input.action,
                entityType: input.entityType,
                entityId: input.entityId ?? null,
                before: input.before ? safeStringify(input.before) : null,
                after: input.after ? safeStringify(input.after) : null,
                description: input.description,
                ip,
                userAgent
            }
        });
    } catch (err) {
        // Audit log failure must never break the main operation
        console.error('[auditLog] failed to write audit entry:', err);
    }
}
/**
 * Stringify with circular-reference safety + size cap.
 */ function safeStringify(obj) {
    try {
        const seen = new WeakSet();
        return JSON.stringify(obj, (_key, value)=>{
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) return '[Circular]';
                seen.add(value);
            }
            // Strip Prisma internal fields
            if (typeof value === 'function') return undefined;
            return value;
        }, 0).slice(0, 8000) // cap at 8KB
        ;
    } catch  {
        return '[Unserializable]';
    }
}
function diffChangedFields(before, after) {
    const out = {};
    const keys = new Set([
        ...Object.keys(before),
        ...Object.keys(after)
    ]);
    for (const k of keys){
        const a = before[k];
        const b = after[k];
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            out[k] = {
                from: a,
                to: b
            };
        }
    }
    return out;
}
function describeChanges(changes, fieldLabels) {
    const parts = [];
    for (const [field, { from, to }] of Object.entries(changes)){
        const label = fieldLabels?.[field] ?? field;
        parts.push(`${label}: ${formatVal(from)} → ${formatVal(to)}`);
    }
    return parts.length ? parts.join(', ') : 'no changes';
}
function formatVal(v) {
    if (v == null) return '∅';
    if (typeof v === 'boolean') return v ? 'yes' : 'no';
    if (typeof v === 'number') return String(v);
    if (Array.isArray(v)) return `[${v.length} items]`;
    if (typeof v === 'object') return JSON.stringify(v).slice(0, 80);
    return String(v).slice(0, 80);
}
}),
"[project]/src/lib/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_SELECT_BASE",
    ()=>CATEGORY_SELECT_BASE,
    "CATEGORY_SELECT_WITH_PARENT",
    ()=>CATEGORY_SELECT_WITH_PARENT,
    "PRODUCT_SELECT_BASE",
    ()=>PRODUCT_SELECT_BASE,
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
const CATEGORY_SELECT_BASE = {
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
    seoKeywords: true,
    createdAt: true,
    updatedAt: true
};
const CATEGORY_SELECT_WITH_PARENT = {
    ...CATEGORY_SELECT_BASE,
    parent: {
        select: {
            name: true
        }
    }
};
const PRODUCT_SELECT_BASE = {
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
    status: true,
    createdAt: true,
    updatedAt: true
};
async function getCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].category.findMany({
        where: {
            parentId: null
        },
        orderBy: {
            order: 'asc'
        },
        select: {
            ...CATEGORY_SELECT_BASE,
            children: {
                select: CATEGORY_SELECT_BASE,
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
        select: {
            ...CATEGORY_SELECT_BASE,
            parent: {
                select: {
                    name: true
                }
            },
            children: {
                select: CATEGORY_SELECT_BASE,
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
        select: {
            ...CATEGORY_SELECT_BASE,
            parent: {
                select: {
                    name: true
                }
            },
            children: {
                select: CATEGORY_SELECT_BASE
            }
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
            select: {
                ...CATEGORY_SELECT_BASE,
                children: {
                    select: CATEGORY_SELECT_BASE
                }
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
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: CATEGORY_SELECT_WITH_PARENT
            }
        }
    });
}
async function getProductBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
        where: {
            slug
        },
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: CATEGORY_SELECT_WITH_PARENT
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
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2,
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: CATEGORY_SELECT_BASE
            }
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
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2,
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: CATEGORY_SELECT_BASE
            }
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
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 2,
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: CATEGORY_SELECT_BASE
            }
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
        select: {
            ...PRODUCT_SELECT_BASE,
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 1,
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
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
"[project]/src/lib/email.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emailConfigured",
    ()=>emailConfigured,
    "notifyAdminNewOrder",
    ()=>notifyAdminNewOrder,
    "notifyAdminServiceEnquiry",
    ()=>notifyAdminServiceEnquiry,
    "sendEmail",
    ()=>sendEmail,
    "sendOrderConfirmation",
    ()=>sendOrderConfirmation,
    "sendPaymentReceipt",
    ()=>sendPaymentReceipt,
    "sendRefundConfirmation",
    ()=>sendRefundConfirmation,
    "sendTrackingUpdate",
    ()=>sendTrackingUpdate
]);
/**
 * Transactional email for Wardrobecare — powered by Resend.
 *
 * Design goals:
 *  - ZERO new dependencies: uses the Resend REST API via fetch.
 *  - GRACEFUL DEGRADATION: if RESEND_API_KEY is missing (or Resend is down)
 *    every function logs and returns safely — checkout and admin actions
 *    NEVER fail because of email.
 *  - BRANDED: templates follow the store's monochrome identity
 *    (#121110 black / #f7f6f3 warm white / #e9e7e1 warm grey).
 *
 * Environment variables (set in Vercel):
 *  - RESEND_API_KEY  re_...        (from resend.com/api-keys)
 *  - EMAIL_FROM      Wardrobecare <codes@wardrobecare.com.ng>
 *                                    (domain already verified in Resend)
 * Optional:
 *  - ADMIN_NOTIFY_EMAIL  fallback recipient for new-order alerts when the
 *                        store's supportEmail setting is empty.
 */ const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const SEND_TIMEOUT_MS = 5000;
function emailConfigured() {
    return !!process.env.RESEND_API_KEY;
}
function fromAddress() {
    return process.env.EMAIL_FROM || 'Wardrobecare Clothing <onboarding@resend.dev>';
}
function baseUrl() {
    return (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/+$/, '');
}
async function sendEmail(input) {
    // ── Try Gmail SMTP first ──
    // Gmail is the primary email provider for Wardrobecare (more reliable
    // for Nigerian delivery than Resend's shared IP pool).
    try {
        const { sendGmail, gmailConfigured } = await __turbopack_context__.A("[project]/src/lib/gmail.ts [app-rsc] (ecmascript, async loader)");
        if (gmailConfigured()) {
            const result = await sendGmail({
                to: input.to,
                subject: input.subject,
                html: input.html
            });
            if (result.ok) {
                console.log(`[email] gmail sent "${input.subject}" → ${input.to}`);
                return {
                    ok: true,
                    id: result.messageId
                };
            }
            console.error(`[email] gmail failed, falling back to Resend: ${result.error}`);
        }
    } catch (e) {
        console.error(`[email] gmail import/send error, falling back to Resend: ${e?.message}`);
    }
    // ── Fallback: Resend ──
    if (!emailConfigured()) {
        console.log(`[email] skipped (neither Gmail nor Resend configured): "${input.subject}" → ${input.to}`);
        return {
            ok: false,
            skipped: true,
            error: 'email-not-configured'
        };
    }
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), SEND_TIMEOUT_MS);
    try {
        const res = await fetch(RESEND_ENDPOINT, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromAddress(),
                to: [
                    input.to
                ],
                subject: input.subject,
                html: input.html,
                ...input.text ? {
                    text: input.text
                } : {},
                ...input.replyTo ? {
                    reply_to: input.replyTo
                } : {}
            })
        });
        if (!res.ok) {
            const body = await res.text().catch(()=>'');
            console.error(`[email] resend ${res.status} for "${input.subject}" → ${input.to}: ${body.slice(0, 300)}`);
            return {
                ok: false,
                error: `resend-${res.status}`
            };
        }
        const data = await res.json().catch(()=>({}));
        console.log(`[email] resend sent "${input.subject}" → ${input.to} (id: ${data?.id ?? '?'})`);
        return {
            ok: true,
            id: data?.id
        };
    } catch (e) {
        const reason = e?.name === 'AbortError' ? 'timeout' : e?.message;
        console.error(`[email] failed "${input.subject}" → ${input.to}: ${reason}`);
        return {
            ok: false,
            error: String(reason)
        };
    } finally{
        clearTimeout(timer);
    }
}
// ────────────────────────────────────────────────────────────
// Branding helpers
// ────────────────────────────────────────────────────────────
function naira(amount) {
    return `₦${Number(amount || 0).toLocaleString('en-NG', {
        maximumFractionDigits: 0
    })}`;
}
function escapeHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
const C = {
    ink: '#121110',
    paper: '#f7f6f3',
    card: '#ffffff',
    muted: '#6f6c66',
    line: '#e9e7e1',
    good: '#1f7a4d'
};
function layout(opts) {
    const year = new Date().getFullYear();
    return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(opts.title)}</title></head>
<body style="margin:0;padding:0;background:${C.paper};font-family:Georgia,'Times New Roman',serif;">
<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(opts.preheader ?? opts.title)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper};padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Brand bar -->
    <tr><td style="background:${C.ink};padding:28px 40px;text-align:center;">
      <div style="color:#f7f6f3;font-family:Helvetica,Arial,sans-serif;font-size:20px;letter-spacing:6px;font-weight:bold;">WARDROBECARE</div>
      <div style="color:#a8a49c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;margin-top:6px;">CLOTHING &middot; LAGOS</div>
    </td></tr>

    <!-- Body card -->
    <tr><td style="background:${C.card};border:1px solid ${C.line};border-top:none;padding:40px;">
      <h1 style="margin:0 0 8px;color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;">${escapeHtml(opts.title)}</h1>
      ${opts.body}
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:24px 8px;text-align:center;">
      <div style="color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:18px;">
        &copy; ${year} Wardrobecare Clothing &middot; Your #1 Personal Shopper for distinguished men's fashion<br>
        Questions? Reply to this email or reach us on WhatsApp &middot; <a href="${baseUrl()}/track-order" style="color:${C.ink};">Track your order</a>
      </div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}
function button(href, label) {
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 4px;"><tr>
<td style="background:${C.ink};border-radius:3px;">
  <a href="${href}" style="display:inline-block;padding:13px 34px;color:#f7f6f3;font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:2px;text-decoration:none;">${escapeHtml(label)}</a>
</td></tr></table>`;
}
function itemsTable(items) {
    const rows = items.map((it)=>{
        const variant = [
            it.size,
            it.color
        ].filter(Boolean).join(' / ');
        return `<tr>
  <td style="padding:10px 0;border-bottom:1px solid ${C.line};color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;">
    ${escapeHtml(it.productName)}${variant ? `<span style="color:${C.muted};"> &nbsp;(${escapeHtml(variant)})</span>` : ''}
    <span style="color:${C.muted};"> &nbsp;&times;${it.quantity}</span>
  </td>
  <td align="right" style="padding:10px 0;border-bottom:1px solid ${C.line};color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;white-space:nowrap;">${naira(it.totalPrice)}</td>
</tr>`;
    });
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>`;
}
function totalsBlock(order) {
    const discount = order.discount && order.discount > 0 ? `<tr><td style="padding:4px 0;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Discount</td>
       <td align="right" style="padding:4px 0;color:${C.good};font-family:Helvetica,Arial,sans-serif;font-size:13px;">&minus;${naira(order.discount)}</td></tr>` : '';
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
  <tr><td style="padding:4px 0;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Subtotal</td>
      <td align="right" style="padding:4px 0;color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;">${naira(order.subtotal)}</td></tr>
  ${discount}
  <tr><td style="padding:4px 0;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:13px;">Delivery</td>
      <td align="right" style="padding:4px 0;color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;">${order.deliveryFee > 0 ? naira(order.deliveryFee) : 'Free'}</td></tr>
  <tr><td style="padding:12px 0 0;border-top:2px solid ${C.ink};color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;">Total</td>
      <td align="right" style="padding:12px 0 0;border-top:2px solid ${C.ink};color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;">${naira(order.total)}</td></tr>
</table>`;
}
function addressBlock(order) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:${C.paper};border:1px solid ${C.line};">
  <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:20px;color:${C.muted};">
    <strong style="color:${C.ink};letter-spacing:1px;">DELIVERING TO</strong><br>
    ${escapeHtml(order.customerName)}<br>
    ${escapeHtml(order.address)}, ${escapeHtml(order.city)}, ${escapeHtml(order.state)}<br>
    ${escapeHtml(order.phone ?? '')}
  </td></tr>
</table>`;
}
function paragraph(text) {
    return `<p style="margin:8px 0 20px;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;">${text}</p>`;
}
function orderBadge(orderNumber) {
    return `<div style="margin:0 0 20px;color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:1px;">
    <span style="background:${C.paper};border:1px solid ${C.line};padding:6px 14px;">ORDER ${escapeHtml(orderNumber)}</span>
  </div>`;
}
async function sendOrderConfirmation(order, items, replyTo) {
    const payNote = order.paymentMethod === 'WHATSAPP' ? 'One of our stylists will contact you on WhatsApp to arrange payment and delivery.' : 'Complete your payment via the secure Paystack checkout — you will receive a receipt the moment it succeeds.';
    const html = layout({
        title: `Thank you, ${order.customerName.split(' ')[0]} — your order is confirmed`,
        preheader: `Order ${order.orderNumber} received — ${naira(order.total)}`,
        body: `
      ${orderBadge(order.orderNumber)}
      ${paragraph(`We have received your order and our team is already preparing it. ${payNote}`)}
      ${itemsTable(items)}
      ${totalsBlock(order)}
      ${addressBlock(order)}
      ${button(`${baseUrl()}/track-order`, 'TRACK YOUR ORDER')}
    `
    });
    return sendEmail({
        to: order.email,
        subject: `Order ${order.orderNumber} confirmed — Wardrobecare Clothing`,
        html,
        replyTo
    });
}
async function sendPaymentReceipt(order, items, payment, replyTo) {
    const html = layout({
        title: 'Payment confirmed — thank you',
        preheader: `We received ${naira(order.total)} for order ${order.orderNumber}`,
        body: `
      ${orderBadge(order.orderNumber)}
      ${paragraph(`Your payment of <strong style="color:${C.ink};">${naira(order.total)}</strong> was received successfully${payment?.paidAt ? ` on ${payment.paidAt.toUTCString()}` : ''}. Your order is now being prepared for dispatch.`)}
      ${itemsTable(items)}
      ${totalsBlock(order)}
      ${payment?.reference ? `<p style="margin:20px 0 0;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:12px;">Payment reference: <span style="color:${C.ink};">${escapeHtml(payment.reference)}</span></p>` : ''}
      ${addressBlock(order)}
      ${button(`${baseUrl()}/track-order`, 'TRACK YOUR ORDER')}
    `
    });
    return sendEmail({
        to: order.email,
        subject: `Receipt for order ${order.orderNumber} — payment confirmed`,
        html,
        replyTo
    });
}
async function sendTrackingUpdate(order, tracking, replyTo) {
    const carrierLine = tracking.carrier ? ` with ${escapeHtml(tracking.carrier)}` : '';
    const trackingBlock = tracking.trackingNumber ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:${C.paper};border:1px solid ${C.line};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${C.muted};">
          <strong style="color:${C.ink};letter-spacing:1px;">TRACKING</strong><br>
          ${tracking.carrier ? `${escapeHtml(tracking.carrier)} &nbsp;&middot;&nbsp; ` : ''}
          <span style="color:${C.ink};font-size:15px;">${escapeHtml(tracking.trackingNumber)}</span>
        </td></tr>
      </table>` : '';
    const html = layout({
        title: 'Your order is on the way',
        preheader: `Order ${order.orderNumber} has been dispatched`,
        body: `
      ${orderBadge(order.orderNumber)}
      ${paragraph(`Great news — your order has been dispatched${carrierLine} and is on its way to you.`)}
      ${trackingBlock}
      ${paragraph(`Expected delivery: <strong style="color:${C.ink};">2&ndash;5 business days</strong> depending on your location. Our support line will follow up on WhatsApp on the day of delivery.`)}
      ${tracking.trackingUrl ? button(tracking.trackingUrl, 'TRACK PARCEL') : button(`${baseUrl()}/track-order`, 'TRACK YOUR ORDER')}
    `
    });
    return sendEmail({
        to: order.email,
        subject: `Your Wardrobecare order ${order.orderNumber} is on the way`,
        html,
        replyTo
    });
}
async function sendRefundConfirmation(order, refund, replyTo) {
    const html = layout({
        title: 'Your refund has been processed',
        preheader: `Refund of ${naira(refund.amount)} for order ${order.orderNumber}`,
        body: `
      ${orderBadge(order.orderNumber)}
      ${paragraph(`We have processed a refund of <strong style="color:${C.ink};">${naira(refund.amount)}</strong> for your order${refund.reason ? ` — reason: ${escapeHtml(refund.reason)}` : ''}. ${refund.full ? 'This is a full refund for the order.' : 'This is a partial refund for the returned items.'}`)}
      ${paragraph(`Refunds to cards typically appear within <strong style="color:${C.ink};">5&ndash;10 business days</strong>, depending on your bank. If you do not see it by then, reply to this email and we will trace it with Paystack immediately.`)}
      ${paragraph(`We are sorry this purchase did not work out, and we appreciate your patience.`)}
    `
    });
    return sendEmail({
        to: order.email,
        subject: `Refund processed for order ${order.orderNumber} — Wardrobecare Clothing`,
        html,
        replyTo
    });
}
async function notifyAdminNewOrder(order, items, adminEmail) {
    const target = adminEmail || process.env.ADMIN_NOTIFY_EMAIL;
    if (!target) {
        console.log('[email] admin alert skipped (no supportEmail / ADMIN_NOTIFY_EMAIL)');
        return {
            ok: false,
            skipped: true,
            error: 'no-admin-email'
        };
    }
    const html = layout({
        title: `New order ${order.orderNumber} — ${naira(order.total)}`,
        preheader: `${order.customerName} placed a ${naira(order.total)} order`,
        body: `
      ${orderBadge(order.orderNumber)}
      ${paragraph(`<strong style="color:${C.ink};">${escapeHtml(order.customerName)}</strong> just placed an order via
        ${order.paymentMethod === 'WHATSAPP' ? 'WhatsApp' : 'Paystack checkout'}.`)}
      ${itemsTable(items)}
      ${totalsBlock(order)}
      ${addressBlock(order)}
      ${button(`${baseUrl()}/admin/orders`, 'OPEN ADMIN CONSOLE')}
    `
    });
    return sendEmail({
        to: target,
        subject: `🔔 New order ${order.orderNumber} — ${naira(order.total)}`,
        html
    });
}
async function notifyAdminServiceEnquiry(input, adminEmail) {
    const target = adminEmail || process.env.ADMIN_NOTIFY_EMAIL || process.env.GMAIL_USER;
    if (!target) {
        console.log('[email] service enquiry alert skipped (no admin email)');
        return {
            ok: false,
            skipped: true,
            error: 'no-admin-email'
        };
    }
    const details = [
        input.occasion && `<strong>Occasion:</strong> ${escapeHtml(input.occasion)}`,
        input.preferredDate && `<strong>Preferred date:</strong> ${escapeHtml(input.preferredDate)}`,
        input.location && `<strong>Location:</strong> ${escapeHtml(input.location)}`,
        input.budget && `<strong>Budget:</strong> ${escapeHtml(input.budget)}`
    ].filter(Boolean).join('<br>');
    const html = layout({
        title: `New ${input.serviceName} enquiry — ${input.enquiryNumber}`,
        preheader: `${input.customerName} requested ${input.serviceName}`,
        body: `
      <div style="margin:0 0 20px;color:${C.ink};font-family:Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:1px;">
        <span style="background:${C.paper};border:1px solid ${C.line};padding:6px 14px;">ENQUIRY ${escapeHtml(input.enquiryNumber)}</span>
      </div>
      <p style="margin:8px 0 20px;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;">
        <strong style="color:${C.ink};">${escapeHtml(input.customerName)}</strong> just submitted a
        <strong style="color:${C.ink};">${escapeHtml(input.serviceName)}</strong> enquiry.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:${C.paper};border:1px solid ${C.line};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${C.muted};">
          <strong style="color:${C.ink};letter-spacing:1px;">CONTACT</strong><br>
          ${escapeHtml(input.customerName)}<br>
          ${escapeHtml(input.email)}<br>
          ${escapeHtml(input.phone)}
        </td></tr>
      </table>
      ${details ? `<p style="margin:12px 0;color:${C.muted};font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;">${details}</p>` : ''}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:${C.paper};border:1px solid ${C.line};">
        <tr><td style="padding:16px 20px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:${C.muted};">
          <strong style="color:${C.ink};letter-spacing:1px;">MESSAGE</strong><br>
          ${escapeHtml(input.message)}
        </td></tr>
      </table>
      ${button(`${baseUrl()}/admin/services/enquiries`, 'VIEW ENQUIRY')}
    `
    });
    return sendEmail({
        to: target,
        subject: `🔔 New ${input.serviceName} enquiry — ${input.enquiryNumber}`,
        html
    });
}
}),
"[project]/src/lib/sms.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOrderSms",
    ()=>buildOrderSms,
    "notifyOwnerNewOrder",
    ()=>notifyOwnerNewOrder,
    "resolveOwnerPhone",
    ()=>resolveOwnerPhone,
    "sendSms",
    ()=>sendSms,
    "sendTestSms",
    ()=>sendTestSms,
    "termiiConfigured",
    ()=>termiiConfigured
]);
/**
 * Termii SMS integration for Wardrobecare.
 *
 * Sends SMS notifications to the store owner when a new order is placed.
 * Uses the Termii Messaging API: POST https://api.termii.com/api/sms/send
 *
 * Security:
 *   - The Termii API key is read from process.env.TERMII_API_KEY — never
 *     exposed to the client. This module is server-only.
 *   - The store owner's phone number is read from env.TERMII_TO or from
 *     AdminSettings.supportPhone / AdminSettings.whatsappNumber (in that
 *     order of preference).
 *
 * Reliability:
 *   - SMS sending is best-effort — a failure NEVER blocks order creation.
 *   - Every send attempt (success or failure) is recorded in the SmsLog
 *     table so admins can see in /admin/notifications exactly why an SMS
 *     did or didn't go out. SmsLog writes are themselves best-effort
 *     and never throw.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
;
const TERMII_ENDPOINT = 'https://api.termii.com/api/sms/send';
const SMS_TIMEOUT_MS = 8000;
function termiiConfigured() {
    return !!process.env.TERMII_API_KEY;
}
async function resolveOwnerPhone() {
    if (process.env.TERMII_TO && process.env.TERMII_TO.trim()) {
        return {
            phone: process.env.TERMII_TO.trim(),
            source: 'TERMII_TO'
        };
    }
    try {
        const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
            where: {
                id: 'singleton'
            },
            select: {
                supportPhone: true,
                whatsappNumber: true
            }
        });
        if (settings?.supportPhone && settings.supportPhone.trim()) {
            return {
                phone: settings.supportPhone.trim(),
                source: 'AdminSettings.supportPhone'
            };
        }
        if (settings?.whatsappNumber && settings.whatsappNumber.trim()) {
            return {
                phone: settings.whatsappNumber.trim(),
                source: 'AdminSettings.whatsappNumber'
            };
        }
    } catch (e) {
        console.error('[sms] could not read AdminSettings for owner phone:', e?.message);
    }
    return {
        phone: null,
        source: 'none'
    };
}
function normalizePhone(phone) {
    // Strip everything except digits and +
    let p = phone.replace(/[^\d+]/g, '');
    // Remove leading +
    p = p.replace(/^\+/, '');
    // If starts with 0, replace with 234 (Nigeria)
    if (p.startsWith('0')) p = '234' + p.slice(1);
    // If starts with 234, leave as is
    // If doesn't start with a country code, assume Nigeria
    if (!p.startsWith('234') && p.length === 10) p = '234' + p;
    return p;
}
function buildOrderSms(data) {
    const itemsSummary = data.items.map((it)=>`${it.productName} (x${it.quantity})`).join(', ');
    // Truncate items if the SMS would exceed 160 chars (single SMS)
    let itemsLine = itemsSummary;
    if (itemsLine.length > 80) {
        itemsLine = itemsSummary.slice(0, 77) + '...';
    }
    const totalFormatted = `NGN ${Number(data.total).toLocaleString('en-NG', {
        maximumFractionDigits: 0
    })}`;
    const paymentLabel = data.paymentStatus === 'SUCCESS' ? 'Paid' : data.paymentStatus === 'PENDING' ? 'Pending' : data.paymentStatus;
    return `WARDROBECARE - NEW ORDER!

Order: ${data.orderNumber}
Customer: ${data.customerName}
Phone: ${data.customerPhone}
Product: ${itemsLine}
Total: ${totalFormatted}
Payment: ${paymentLabel}

Check your dashboard to process this order.`;
}
/**
 * Persist a SmsLog row. Best-effort — never throws. The SmsLog table is
 * the admin's only way to see why an SMS didn't go out, so we swallow
 * any DB error and just log to console.
 */ async function logSmsAttempt(input) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].smsLog.create({
            data: {
                reason: input.reason,
                orderId: input.orderId ?? null,
                recipient: input.recipient,
                message: input.message.slice(0, 480),
                ok: input.ok,
                error: (input.error ?? null)?.toString().slice(0, 240) ?? null,
                providerResponse: (input.providerResponse ?? null)?.toString().slice(0, 800) ?? null,
                recipientSource: input.recipientSource ?? null
            }
        });
    } catch (e) {
        // Logging must never break the send or the order flow.
        console.error('[sms] could not write SmsLog row:', e?.message);
    }
}
async function sendSms(to, message, meta) {
    const reason = meta?.reason ?? 'manual';
    const recipientSource = meta?.recipientSource ?? null;
    const orderId = meta?.orderId ?? null;
    if (!termiiConfigured()) {
        console.log('[sms] skipped (TERMII_API_KEY not set)');
        await logSmsAttempt({
            reason,
            orderId,
            recipient: to,
            message,
            ok: false,
            error: 'TERMII_API_KEY not set',
            recipientSource
        });
        return {
            ok: false,
            error: 'not-configured'
        };
    }
    const recipient = normalizePhone(to);
    if (!recipient || recipient.length < 10) {
        console.error('[sms] invalid phone number:', to);
        await logSmsAttempt({
            reason,
            orderId,
            recipient: to,
            message,
            ok: false,
            error: 'invalid phone number',
            recipientSource
        });
        return {
            ok: false,
            error: 'invalid-phone'
        };
    }
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), SMS_TIMEOUT_MS);
    try {
        const res = await fetch(TERMII_ENDPOINT, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: process.env.TERMII_API_KEY,
                to: recipient,
                from: process.env.TERMII_SENDER_ID || 'WARDROBECARE',
                sms: message,
                type: 'plain',
                channel: 'dnd'
            })
        });
        if (!res.ok) {
            const body = await res.text().catch(()=>'');
            console.error(`[sms] termii ${res.status}: ${body.slice(0, 300)}`);
            await logSmsAttempt({
                reason,
                orderId,
                recipient,
                message,
                ok: false,
                error: `termii-${res.status}`,
                providerResponse: body.slice(0, 800),
                recipientSource
            });
            return {
                ok: false,
                error: `termii-${res.status}`
            };
        }
        const data = await res.json().catch(()=>({}));
        if (data.code === 'ok' || data.message === 'Successfully Sent') {
            console.log(`[sms] sent to ${recipient} (id: ${data.message_id ?? '?'})`);
            await logSmsAttempt({
                reason,
                orderId,
                recipient,
                message,
                ok: true,
                providerResponse: JSON.stringify(data).slice(0, 800),
                recipientSource
            });
            return {
                ok: true
            };
        }
        console.error(`[sms] termii returned non-ok:`, data);
        await logSmsAttempt({
            reason,
            orderId,
            recipient,
            message,
            ok: false,
            error: data.message || 'termii-error',
            providerResponse: JSON.stringify(data).slice(0, 800),
            recipientSource
        });
        return {
            ok: false,
            error: data.message || 'termii-error'
        };
    } catch (e) {
        const reason2 = e?.name === 'AbortError' ? 'timeout' : e?.message;
        console.error(`[sms] failed to send to ${recipient}: ${reason2}`);
        await logSmsAttempt({
            reason,
            orderId,
            recipient,
            message,
            ok: false,
            error: String(reason2),
            recipientSource
        });
        return {
            ok: false,
            error: String(reason2)
        };
    } finally{
        clearTimeout(timer);
    }
}
async function notifyOwnerNewOrder(data, ownerPhone, orderId) {
    // If caller passed a phone, use it. Otherwise resolve via env + AdminSettings.
    let target = ownerPhone || null;
    let source = ownerPhone ? 'AdminSettings.supportPhone' : null;
    if (!target) {
        const r = await resolveOwnerPhone();
        target = r.phone;
        source = r.source === 'none' ? null : r.source;
    }
    if (!target) {
        console.log('[sms] owner notification skipped (no phone number configured)');
        await logSmsAttempt({
            reason: 'NEW_ORDER',
            orderId: orderId ?? null,
            recipient: '(none)',
            message: buildOrderSms(data),
            ok: false,
            error: 'no owner phone number configured (set TERMII_TO env var or AdminSettings.supportPhone)',
            recipientSource: 'none'
        });
        return {
            ok: false,
            error: 'no-owner-phone'
        };
    }
    const message = buildOrderSms(data);
    return sendSms(target, message, {
        reason: 'NEW_ORDER',
        orderId: orderId ?? null,
        recipientSource: source
    });
}
async function sendTestSms(to) {
    const target = to?.trim() || process.env.TERMII_TO || '';
    if (!target) {
        await logSmsAttempt({
            reason: 'TEST',
            recipient: '(none)',
            message: 'Wardrobecare SMS test',
            ok: false,
            error: 'no recipient provided and TERMII_TO not set',
            recipientSource: 'none'
        });
        return {
            ok: false,
            error: 'no-recipient'
        };
    }
    const message = `WARDROBECARE — test SMS.\nIf you can read this, your Termii integration is working.\nSent: ${new Date().toISOString()}`;
    return sendSms(target, message, {
        reason: 'TEST',
        recipientSource: to?.trim() ? 'manual' : 'TERMII_TO'
    });
}
}),
"[project]/src/actions/store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4001f13de01a3ce132f63c8f2203146e835faeb3e4":"adminCreateProduct","404c3b985be59792046f602f3945fa9cc16fa7bf30":"submitServiceEnquiry","405e95efd1919b754f69e6a0a77914ad5ad388a636":"verifyPayment","406fa6a8bbdb05aa300267d4abdc6ae7866069db28":"createOrder","4070e962700c9012e8add24460d88d9c640b5454dd":"saveAddress","407a625ef6ce9a4fa3b43b3dd312017de684dc9deb":"deleteAddress","4090f5ff6c3772b6c678c38829c51371641452f77c":"adminDeleteProduct","40982ad8f54fa1a9a7cc99bcea1fd640106a1b9a86":"adminUpdateSettings","40ab5b5feefe9e60a30f6b46f5fcc376af8cada3fa":"getCartLinesWithProducts","40acaad1f7057bddc0b5c70d82a280f89cfdc23b57":"registerUser","40b32f044c6e73417465263e3d819347daa0af2df7":"trackOrder","40b8768d70307752950c912e991cadada77528ea5a":"subscribeToNewsletter","40de0032ccb8bedf3665302af97d16e19bc2b98c42":"updateProfile","40eb917b2e4beebf0f52d82a05aa8de5c203cd8b51":"adminUpdateHomepageContent","602e2f2443ee9dac67556def1217ee07c358126046":"adminUpdateProduct","7c26caf4b0442a124ddde4d163261674a65df3468f":"adminUpdateOrderStatus"},"",""] */ __turbopack_context__.s([
    "adminCreateProduct",
    ()=>adminCreateProduct,
    "adminDeleteProduct",
    ()=>adminDeleteProduct,
    "adminUpdateHomepageContent",
    ()=>adminUpdateHomepageContent,
    "adminUpdateOrderStatus",
    ()=>adminUpdateOrderStatus,
    "adminUpdateProduct",
    ()=>adminUpdateProduct,
    "adminUpdateSettings",
    ()=>adminUpdateSettings,
    "createOrder",
    ()=>createOrder,
    "deleteAddress",
    ()=>deleteAddress,
    "getCartLinesWithProducts",
    ()=>getCartLinesWithProducts,
    "registerUser",
    ()=>registerUser,
    "saveAddress",
    ()=>saveAddress,
    "submitServiceEnquiry",
    ()=>submitServiceEnquiry,
    "subscribeToNewsletter",
    ()=>subscribeToNewsletter,
    "trackOrder",
    ()=>trackOrder,
    "updateProfile",
    ()=>updateProfile,
    "verifyPayment",
    ()=>verifyPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paystack$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/paystack/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/permissions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/audit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
// Resilient Prisma select constants — list only pre-existing columns so
// queries work whether or not the SEO Manager migration has been applied.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
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
;
;
;
;
async function getCartLinesWithProducts(lines) {
    if (!lines.length) return [];
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            id: {
                in: lines.map((l)=>l.productId)
            }
        },
        select: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_SELECT_BASE"],
            images: {
                orderBy: {
                    position: 'asc'
                },
                take: 1,
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            },
            variants: true,
            category: {
                select: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CATEGORY_SELECT_BASE"]
            }
        }
    });
    return lines.map((line)=>{
        const p = products.find((p)=>p.id === line.productId);
        if (!p) return null;
        const variant = line.variantId ? p.variants.find((v)=>v.id === line.variantId) : undefined;
        const price = variant?.price ?? p.salePrice ?? p.price;
        return {
            ...line,
            name: p.name,
            slug: p.slug,
            price,
            originalPrice: p.salePrice && p.salePrice < p.price ? p.price : undefined,
            image: p.images[0]?.url,
            sku: variant?.sku ?? p.sku,
            inStock: variant ? variant.stock > 0 : p.variants.some((v)=>v.stock > 0),
            maxQuantity: variant?.stock ?? Math.max(...p.variants.map((v)=>v.stock), 0),
            categoryId: p.categoryId,
            categoryName: p.category.name
        };
    }).filter(Boolean);
}
// ============================================================
// NEWSLETTER
// ============================================================
const newsletterSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
async function subscribeToNewsletter(formData) {
    const parsed = newsletterSchema.safeParse({
        email: formData.get('email'),
        name: formData.get('name') || undefined
    });
    if (!parsed.success) {
        return {
            ok: false,
            error: 'Please enter a valid email.'
        };
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].newsletterSubscriber.upsert({
            where: {
                email: parsed.data.email.toLowerCase()
            },
            update: {
                active: true
            },
            create: {
                email: parsed.data.email.toLowerCase(),
                name: parsed.data.name,
                source: 'footer'
            }
        });
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: 'Could not subscribe. Try again.'
        };
    }
}
// ============================================================
// CHECKOUT — server-side order creation with server-calculated totals
// ============================================================
const checkoutSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    customerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(7),
    whatsappNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(5),
    deliveryInstructions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    lines: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        variantId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
        quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(99)
    })),
    couponCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    paymentMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'PAYSTACK',
        'WHATSAPP',
        'BANK_TRANSFER'
    ]).default('PAYSTACK')
});
async function createOrder(formData) {
    // Accept either FormData or a plain object (called from client)
    const input = formData instanceof FormData ? Object.fromEntries(formData.entries()) : formData;
    // lines may arrive as JSON string from FormData
    if (typeof input.lines === 'string') {
        try {
            input.lines = JSON.parse(input.lines);
        } catch  {
            input.lines = [];
        }
    }
    // Coerce quantity to number
    if (Array.isArray(input.lines)) {
        input.lines = input.lines.map((l)=>({
                ...l,
                quantity: Number(l.quantity)
            }));
    }
    const parsed = checkoutSchema.safeParse(input);
    if (!parsed.success) {
        return {
            ok: false,
            error: parsed.error.issues[0]?.message ?? 'Invalid checkout data.'
        };
    }
    const data = parsed.data;
    if (!data.lines.length) {
        return {
            ok: false,
            error: 'Your bag is empty.'
        };
    }
    // Fetch products server-side to recompute totals — never trust client prices
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findMany({
        where: {
            id: {
                in: data.lines.map((l)=>l.productId)
            }
        },
        select: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_SELECT_BASE"],
            variants: true,
            category: {
                select: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CATEGORY_SELECT_BASE"]
            },
            images: {
                take: 1,
                orderBy: {
                    position: 'asc'
                },
                select: {
                    id: true,
                    url: true,
                    altText: true,
                    position: true,
                    productId: true
                }
            }
        }
    });
    let subtotal = 0;
    const orderItemsData = [];
    for (const line of data.lines){
        const p = products.find((p)=>p.id === line.productId);
        if (!p) continue;
        const variant = line.variantId ? p.variants.find((v)=>v.id === line.variantId) : undefined;
        // stock check
        if (variant) {
            if (variant.stock < line.quantity) {
                return {
                    ok: false,
                    error: `Insufficient stock for ${p.name} (${variant.size}).`
                };
            }
        } else {
            const totalStock = p.variants.reduce((s, v)=>s + v.stock, 0);
            if (totalStock < line.quantity) {
                return {
                    ok: false,
                    error: `Insufficient stock for ${p.name}.`
                };
            }
        }
        const unitPrice = variant?.price ?? p.salePrice ?? p.price;
        const totalPrice = unitPrice * line.quantity;
        subtotal += totalPrice;
        orderItemsData.push({
            productId: p.id,
            variantId: variant?.id,
            productName: p.name,
            productSlug: p.slug,
            productImage: p.images[0]?.url,
            size: line.size ?? variant?.size,
            color: variant?.color,
            sku: variant?.sku ?? p.sku,
            unitPrice,
            quantity: line.quantity,
            totalPrice
        });
    }
    if (!orderItemsData.length) {
        return {
            ok: false,
            error: 'No valid items in your bag.'
        };
    }
    // Apply coupon if provided
    let discount = 0;
    if (data.couponCode) {
        const coupon = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].coupon.findUnique({
            where: {
                code: data.couponCode.toUpperCase()
            }
        });
        if (coupon && coupon.active && (!coupon.endsAt || coupon.endsAt > new Date())) {
            if (coupon.minOrder && subtotal < coupon.minOrder) {
                return {
                    ok: false,
                    error: `Coupon requires a minimum order of ₦${coupon.minOrder.toLocaleString()}.`
                };
            }
            if (coupon.type === 'PERCENTAGE') {
                discount = subtotal * coupon.value / 100;
                if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
            } else {
                discount = coupon.value;
            }
        }
    }
    // Delivery fee
    const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
        where: {
            id: 'singleton'
        }
    });
    const deliveryFee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateDeliveryFee"])(subtotal - discount, settings?.defaultDeliveryFee ?? 2500, settings?.freeDeliveryThreshold ?? 500000);
    const total = Math.max(0, subtotal - discount + deliveryFee);
    // Create order
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    const orderNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateOrderNumber"])();
    const reference = `${orderNumber}-${Date.now().toString(36)}`;
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.create({
        data: {
            orderNumber,
            userId: session?.user?.id,
            customerName: data.customerName,
            email: data.email.toLowerCase(),
            phone: data.phone,
            whatsappNumber: data.whatsappNumber,
            state: data.state,
            city: data.city,
            address: data.address,
            deliveryInstructions: data.deliveryInstructions,
            subtotal,
            deliveryFee,
            discount,
            total,
            couponCode: data.couponCode,
            paymentMethod: data.paymentMethod,
            status: data.paymentMethod === 'WHATSAPP' ? 'PENDING' : 'PENDING',
            paymentStatus: 'PENDING',
            items: {
                create: orderItemsData
            },
            statusHistory: {
                create: {
                    status: 'PENDING',
                    note: 'Order received'
                }
            },
            payments: data.paymentMethod === 'PAYSTACK' ? {
                create: {
                    provider: 'PAYSTACK',
                    reference,
                    amount: total,
                    status: 'PENDING'
                }
            } : undefined
        },
        include: {
            items: true
        }
    });
    // ── Transactional emails: customer confirmation + owner alert ──
    // sendEmail never throws and skips instantly when RESEND_API_KEY is not
    // configured, so checkout cannot be slowed or broken by email.
    try {
        await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendOrderConfirmation"])(order, order.items, settings?.supportEmail ?? undefined),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notifyAdminNewOrder"])(order, order.items, settings?.supportEmail)
        ]);
    } catch (e) {
        console.error('[email] order confirmation flow error:', e?.message);
    }
    // ── SMS notification to the store owner ──
    // Best-effort — never blocks the order. Uses Termii SMS API.
    // The SMS is sent only when the order meets the confirmation criteria
    // (order was successfully created — payment status is handled separately
    // by the Paystack webhook for online payments).
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notifyOwnerNewOrder"])({
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerPhone: order.phone,
            items: order.items.map((it)=>({
                    productName: it.productName,
                    quantity: it.quantity
                })),
            total: order.total,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod
        }, settings?.supportPhone, order.id);
    } catch (e) {
        console.error('[sms] order notification error:', e?.message);
    }
    // For WhatsApp orders, return the order number so the client can compose a
    // WhatsApp message. No payment initialization needed.
    if (data.paymentMethod === 'WHATSAPP') {
        return {
            ok: true,
            orderNumber: order.orderNumber,
            reference,
            total
        };
    }
    // For Paystack: initialize transaction
    const callbackUrl = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/checkout/verify?order=${order.orderNumber}`;
    const init = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paystack$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initializePaystackTransaction"])({
        email: data.email,
        amount: total,
        reference,
        callback_url: callbackUrl,
        metadata: {
            order_id: order.id,
            order_number: order.orderNumber,
            customer_name: data.customerName,
            custom_fields: [
                {
                    display_name: 'Order Number',
                    variable_name: 'order_number',
                    value: order.orderNumber
                },
                {
                    display_name: 'Items',
                    variable_name: 'items',
                    value: `${orderItemsData.length} item(s)`
                }
            ]
        }
    });
    if (!init.status) {
        return {
            ok: false,
            error: init.message || 'Could not initialise payment.'
        };
    }
    return {
        ok: true,
        orderNumber: order.orderNumber,
        authorizationUrl: init.data.authorization_url,
        reference,
        total
    };
}
async function verifyPayment(reference) {
    if (!reference) return {
        ok: false,
        error: 'Missing payment reference.'
    };
    const payment = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].payment.findUnique({
        where: {
            reference
        },
        include: {
            order: {
                include: {
                    items: true
                }
            }
        }
    });
    if (!payment) return {
        ok: false,
        error: 'Payment not found.'
    };
    if (payment.verified) {
        return {
            ok: true,
            orderNumber: payment.order.orderNumber,
            status: payment.order.status,
            total: payment.order.total
        };
    }
    const verifyResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paystack$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyPaystackTransaction"])(reference);
    if (!verifyResp || !verifyResp.status) {
        return {
            ok: false,
            error: 'Payment verification failed.'
        };
    }
    const isMock = process.env.PAYSTACK_SECRET_KEY === 'sk_test_x' || !process.env.PAYSTACK_SECRET_KEY;
    const paidAmount = verifyResp.data.amount / 100 // kobo → naira
    ;
    // Verify amount matches (skip for mock)
    if (!isMock && Math.abs(paidAmount - payment.amount) > 1) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].payment.update({
            where: {
                id: payment.id
            },
            data: {
                status: 'FAILED',
                rawResponse: JSON.stringify(verifyResp)
            }
        });
        return {
            ok: false,
            error: 'Payment amount mismatch.'
        };
    }
    if (verifyResp.data.status !== 'success' && !isMock) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].payment.update({
            where: {
                id: payment.id
            },
            data: {
                status: 'FAILED',
                rawResponse: JSON.stringify(verifyResp)
            }
        });
        return {
            ok: false,
            error: 'Payment was not successful.'
        };
    }
    // Mark payment verified — THIS is the only place an order becomes paid
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
        await tx.payment.update({
            where: {
                id: payment.id
            },
            data: {
                status: 'SUCCESS',
                verified: true,
                paidAt: new Date(),
                rawResponse: JSON.stringify(verifyResp)
            }
        });
        await tx.order.update({
            where: {
                id: payment.orderId
            },
            data: {
                status: 'PAID',
                paymentStatus: 'SUCCESS',
                statusHistory: {
                    create: {
                        status: 'PAID',
                        note: 'Payment confirmed'
                    }
                }
            }
        });
        // Decrement stock for each order item
        for (const item of payment.order.items){
            if (item.variantId) {
                await tx.productVariant.update({
                    where: {
                        id: item.variantId
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }
        }
    });
    // ── Payment receipt email (guarded: only reached when payment was not
    // previously verified, so duplicate verifications never double-send) ──
    try {
        const receiptSettings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
            where: {
                id: 'singleton'
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendPaymentReceipt"])(payment.order, payment.order.items, {
            reference,
            paidAt: new Date()
        }, receiptSettings?.supportEmail ?? undefined);
    } catch (e) {
        console.error('[email] receipt flow error:', e?.message);
    }
    return {
        ok: true,
        orderNumber: payment.order.orderNumber,
        status: 'PAID',
        total: payment.order.total
    };
}
async function trackOrder(orderNumber) {
    if (!orderNumber) return null;
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.findUnique({
        where: {
            orderNumber: orderNumber.trim().toUpperCase()
        },
        include: {
            items: true,
            statusHistory: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });
    return order;
}
// ============================================================
// ADMIN: PRODUCT CRUD
// ============================================================
const productSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10),
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    material: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    fit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    care: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    sku: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0),
    salePrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    costPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    categoryId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    brandId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    featured: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.boolean().optional(),
    published: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.boolean().optional(),
    // Explicit "Out of Stock" flag — independent of variant stock sums
    outOfStock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.boolean().optional(),
    // Optional status override — used by the Send-to-Trash flow
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'ACTIVE',
        'DRAFT',
        'ARCHIVED',
        'DISCONTINUED'
    ]).optional(),
    // Physical
    weightKg: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    lengthCm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    widthCm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    heightCm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
    // Shipping
    freeShipping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.boolean().optional(),
    shippingClass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    // SEO
    seoTitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    seoDescription: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    seoKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    images: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).min(1),
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        sku: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        barcode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional(),
        stock: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(0),
        lowStockThreshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(0).optional(),
        imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        weightKg: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().optional()
    }))
});
async function adminCreateProduct(input) {
    // Auth + permission gate
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])('product.create');
    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
        // Surface the FULL list of validation errors — not just the first
        const issues = parsed.error.issues.map((i)=>`${i.path.join('.') || 'root'}: ${i.message}`).join(' · ');
        return {
            ok: false,
            error: `Validation failed: ${issues}`
        };
    }
    const data = parsed.data;
    try {
        // Pre-check for SKU uniqueness — fail with a clear message instead of a Prisma error
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                sku: data.sku
            },
            select: {
                id: true,
                name: true
            }
        });
        if (existing) {
            return {
                ok: false,
                error: `A product with SKU "${data.sku}" already exists (${existing.name}). Use a different SKU.`
            };
        }
        const existingSlug = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                slug: data.slug
            },
            select: {
                id: true,
                name: true
            }
        });
        if (existingSlug) {
            return {
                ok: false,
                error: `A product with slug "${data.slug}" already exists (${existingSlug.name}). Change the slug.`
            };
        }
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                features: data.features,
                material: data.material,
                fit: data.fit,
                care: data.care,
                sku: data.sku,
                price: data.price,
                salePrice: data.salePrice,
                costPrice: data.costPrice,
                categoryId: data.categoryId,
                brandId: data.brandId || null,
                tags: data.tags,
                featured: data.featured ?? false,
                published: data.published ?? true,
                outOfStock: data.outOfStock ?? false,
                status: data.status ?? 'ACTIVE',
                weightKg: data.weightKg,
                lengthCm: data.lengthCm,
                widthCm: data.widthCm,
                heightCm: data.heightCm,
                freeShipping: data.freeShipping,
                shippingClass: data.shippingClass,
                seoTitle: data.seoTitle,
                seoDescription: data.seoDescription,
                seoKeywords: data.seoKeywords,
                images: {
                    create: data.images.map((url, i)=>({
                            url,
                            altText: data.name,
                            position: i
                        }))
                },
                variants: {
                    create: data.variants.map((v)=>({
                            size: v.size,
                            sku: v.sku ?? `${data.sku}-${v.size}`,
                            barcode: v.barcode,
                            price: v.price,
                            stock: v.stock,
                            lowStockThreshold: v.lowStockThreshold ?? 5,
                            imageUrl: v.imageUrl,
                            weightKg: v.weightKg
                        }))
                }
            },
            include: {
                images: true,
                variants: true
            }
        });
        // Audit log
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
            actorId: user.id,
            action: 'product.create',
            entityType: 'Product',
            entityId: created.id,
            after: {
                name: created.name,
                slug: created.slug,
                sku: created.sku,
                price: created.price,
                salePrice: created.salePrice
            },
            description: `Created product "${created.name}" (SKU ${created.sku}, ₦${created.price.toLocaleString()})`
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        return {
            ok: true,
            id: created.id
        };
    } catch (e) {
        // Unwrap Prisma errors to be useful to the admin
        let msg = e?.message ?? 'Could not create product';
        if (e?.code === 'P2002') {
            msg = `Unique constraint failed on ${e?.meta?.target?.join(', ') ?? 'unknown field'}. This value already exists.`;
        }
        return {
            ok: false,
            error: msg
        };
    }
}
async function adminUpdateProduct(id, input) {
    // Auth + permission gate
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])('product.update');
    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
        const issues = parsed.error.issues.map((i)=>`${i.path.join('.') || 'root'}: ${i.message}`).join(' · ');
        return {
            ok: false,
            error: `Validation failed: ${issues}`
        };
    }
    const data = parsed.data;
    try {
        // Fetch existing for audit diff
        const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            },
            include: {
                images: true,
                variants: true
            }
        });
        if (!before) {
            return {
                ok: false,
                error: 'Product not found'
            };
        }
        // Pre-check for SKU uniqueness — make sure we're not colliding with another product
        if (data.sku !== before.sku) {
            const skuCollision = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                where: {
                    sku: data.sku
                },
                select: {
                    id: true,
                    name: true
                }
            });
            if (skuCollision && skuCollision.id !== id) {
                return {
                    ok: false,
                    error: `A different product (${skuCollision.name}) already uses SKU "${data.sku}".`
                };
            }
        }
        if (data.slug !== before.slug) {
            const slugCollision = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
                where: {
                    slug: data.slug
                },
                select: {
                    id: true,
                    name: true
                }
            });
            if (slugCollision && slugCollision.id !== id) {
                return {
                    ok: false,
                    error: `A different product (${slugCollision.name}) already uses slug "${data.slug}".`
                };
            }
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
            await tx.product.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    slug: data.slug,
                    description: data.description,
                    features: data.features,
                    material: data.material,
                    fit: data.fit,
                    care: data.care,
                    sku: data.sku,
                    price: data.price,
                    salePrice: data.salePrice,
                    costPrice: data.costPrice,
                    categoryId: data.categoryId,
                    brandId: data.brandId || null,
                    tags: data.tags,
                    featured: data.featured ?? false,
                    published: data.published ?? true,
                    outOfStock: data.outOfStock ?? false,
                    // Only update status if explicitly provided (e.g. Send-to-Trash flow)
                    ...data.status ? {
                        status: data.status
                    } : {},
                    weightKg: data.weightKg,
                    lengthCm: data.lengthCm,
                    widthCm: data.widthCm,
                    heightCm: data.heightCm,
                    freeShipping: data.freeShipping,
                    shippingClass: data.shippingClass,
                    seoTitle: data.seoTitle,
                    seoDescription: data.seoDescription,
                    seoKeywords: data.seoKeywords
                }
            });
            // Replace images
            await tx.productImage.deleteMany({
                where: {
                    productId: id
                }
            });
            await tx.productImage.createMany({
                data: data.images.map((url, i)=>({
                        url,
                        altText: data.name,
                        position: i,
                        productId: id
                    }))
            });
            // Replace variants (simple approach — could be improved for diffing)
            await tx.productVariant.deleteMany({
                where: {
                    productId: id
                }
            });
            await tx.productVariant.createMany({
                data: data.variants.map((v)=>({
                        productId: id,
                        size: v.size,
                        sku: v.sku ?? `${data.sku}-${v.size}`,
                        barcode: v.barcode,
                        price: v.price,
                        stock: v.stock,
                        lowStockThreshold: v.lowStockThreshold ?? 5,
                        imageUrl: v.imageUrl,
                        weightKg: v.weightKg
                    }))
            });
        });
        // Audit log
        if (before) {
            const changes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diffChangedFields"])({
                name: before.name,
                price: before.price,
                salePrice: before.salePrice,
                featured: before.featured,
                published: before.published,
                sku: before.sku,
                outOfStock: before.outOfStock
            }, {
                name: data.name,
                price: data.price,
                salePrice: data.salePrice,
                featured: data.featured,
                published: data.published,
                sku: data.sku,
                outOfStock: data.outOfStock
            });
            const desc = Object.keys(changes).length > 0 ? `Updated product "${data.name}" — ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["describeChanges"])(changes, {
                name: 'name',
                price: 'price',
                salePrice: 'salePrice',
                featured: 'featured',
                published: 'published',
                sku: 'SKU',
                outOfStock: 'outOfStock'
            })}` : `Updated product "${data.name}" (images/variants refreshed)`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
                actorId: user.id,
                action: 'product.update',
                entityType: 'Product',
                entityId: id,
                before: {
                    name: before.name,
                    sku: before.sku,
                    price: before.price
                },
                after: {
                    name: data.name,
                    sku: data.sku,
                    price: data.price
                },
                description: desc
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/product/${data.slug}`);
        return {
            ok: true
        };
    } catch (e) {
        let msg = e?.message ?? 'Could not update product';
        if (e?.code === 'P2002') {
            msg = `Unique constraint failed on ${e?.meta?.target?.join(', ') ?? 'unknown field'}. This value already exists.`;
        }
        return {
            ok: false,
            error: msg
        };
    }
}
async function adminDeleteProduct(id) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])('product.delete');
    try {
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                sku: true,
                slug: true
            }
        });
        if (!product) return {
            ok: false,
            error: 'Product not found'
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].product.delete({
            where: {
                id
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
            actorId: user.id,
            action: 'product.delete',
            entityType: 'Product',
            entityId: id,
            before: product,
            description: `Deleted product "${product.name}" (SKU ${product.sku})`
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message
        };
    }
}
async function adminUpdateOrderStatus(orderId, status, note, trackingNumber, trackingUrl) {
    // Permission: cancel/refund have stricter requirements than status update
    const permCode = status === 'CANCELLED' || status === 'REFUNDED' || status === 'PARTIALLY_REFUNDED' ? 'order.refund' : 'order.update_status';
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])(permCode);
    try {
        const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].order.findUnique({
            where: {
                id: orderId
            },
            select: {
                orderNumber: true,
                status: true,
                trackingNumber: true,
                customerName: true
            }
        });
        if (!before) return {
            ok: false,
            error: 'Order not found'
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
            await tx.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status,
                    ...trackingNumber !== undefined ? {
                        trackingNumber
                    } : {},
                    ...trackingUrl !== undefined ? {
                        trackingUrl
                    } : {},
                    // Set timestamps for shipped/delivered/cancelled
                    ...status === 'SHIPPED' ? {
                        shippedAt: new Date()
                    } : {},
                    ...status === 'DELIVERED' ? {
                        deliveredAt: new Date()
                    } : {},
                    ...status === 'CANCELLED' ? {
                        cancelledAt: new Date()
                    } : {},
                    statusHistory: {
                        create: {
                            status,
                            note
                        }
                    }
                }
            });
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
            actorId: user.id,
            action: 'order.update_status',
            entityType: 'Order',
            entityId: orderId,
            before: {
                status: before.status,
                trackingNumber: before.trackingNumber
            },
            after: {
                status,
                trackingNumber,
                note
            },
            description: `Updated order ${before.orderNumber} status: ${before.status} → ${status}${note ? ` (${note})` : ''}`
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/orders');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/orders/${orderId}`);
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message
        };
    }
}
async function adminUpdateSettings(input) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])('settings.manage');
    try {
        const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
            where: {
                id: 'singleton'
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.upsert({
            where: {
                id: 'singleton'
            },
            update: input,
            create: {
                id: 'singleton',
                ...input
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
            actorId: user.id,
            action: 'settings.update',
            entityType: 'AdminSettings',
            entityId: 'singleton',
            before,
            after: input,
            description: 'Updated store settings'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/settings');
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message
        };
    }
}
async function adminUpdateHomepageContent(input) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStaffWithPermission"])('cms.manage');
    try {
        const before = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].homepageContent.findUnique({
            where: {
                id: 'singleton'
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].homepageContent.upsert({
            where: {
                id: 'singleton'
            },
            update: input,
            create: {
                id: 'singleton',
                ...input
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auditLog"])({
            actorId: user.id,
            action: 'cms.update',
            entityType: 'HomepageContent',
            entityId: 'singleton',
            before,
            after: input,
            description: 'Updated homepage content'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message
        };
    }
}
// ============================================================
// AUTH: REGISTER / RESET
// ============================================================
async function createStoreNotification(input) {
    try {
        const staff = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findMany({
            where: {
                role: {
                    not: 'CUSTOMER'
                },
                active: true
            },
            select: {
                id: true
            }
        });
        if (!staff.length) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].notification.createMany({
            data: staff.map((s)=>({
                    recipientId: s.id,
                    type: input.type,
                    title: input.title,
                    body: input.body,
                    link: input.link
                }))
        });
    } catch (e) {
        console.error('[createStoreNotification] failed:', e);
    }
}
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
async function registerUser(formData) {
    // Abuse throttle: max 5 registrations per hour per IP (1h lockout after).
    const rl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rateLimit"])(`register:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clientIpFromHeaders"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])())}`, {
        limit: 5,
        windowMs: 60 * 60 * 1000,
        blockMs: 60 * 60 * 1000
    });
    if (!rl.ok) {
        return {
            ok: false,
            error: 'Too many sign-up attempts. Please try again later.'
        };
    }
    const parsed = registerSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
        return {
            ok: false,
            error: parsed.error.issues[0]?.message ?? 'Invalid input'
        };
    }
    const { name, email, password, phone } = parsed.data;
    const bcrypt = await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript, async loader)");
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    });
    if (existing) {
        return {
            ok: false,
            error: 'An account with this email already exists.'
        };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.create({
        data: {
            name,
            email: email.toLowerCase(),
            passwordHash,
            phone,
            role: 'CUSTOMER'
        }
    });
    await createStoreNotification({
        type: 'NEW_CUSTOMER',
        title: 'New customer registered',
        body: `${createdUser.name ?? createdUser.email} created a new customer account.`,
        link: `/admin/customers/${createdUser.id}`
    });
    return {
        ok: true
    };
}
// ============================================================
// ACCOUNT: ADDRESS MANAGEMENT
// ============================================================
const addressSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(7),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(5),
    landmark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    isDefault: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.boolean().optional()
});
async function saveAddress(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session?.user?.id) return {
        ok: false,
        error: 'Not authenticated'
    };
    const parsed = addressSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) return {
        ok: false,
        error: parsed.error.issues[0]?.message
    };
    const data = parsed.data;
    const id = formData.get('id');
    try {
        if (data.isDefault) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].address.updateMany({
                where: {
                    userId: session.user.id
                },
                data: {
                    isDefault: false
                }
            });
        }
        if (id) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].address.update({
                where: {
                    id
                },
                data
            });
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].address.create({
                data: {
                    ...data,
                    userId: session.user.id
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/account/addresses');
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message
        };
    }
}
async function deleteAddress(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session?.user?.id) return {
        ok: false,
        error: 'Not authenticated'
    };
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].address.deleteMany({
        where: {
            id,
            userId: session.user.id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/account/addresses');
    return {
        ok: true
    };
}
// ============================================================
// ACCOUNT: PROFILE MANAGEMENT
// ============================================================
const profileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, 'Name must be at least 2 characters'),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(7, 'Phone number must be at least 7 characters'),
    whatsappNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
async function updateProfile(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session?.user?.id) return {
        ok: false,
        error: 'Not authenticated'
    };
    const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
        return {
            ok: false,
            error: parsed.error.issues[0]?.message ?? 'Invalid input'
        };
    }
    const { name, phone, whatsappNumber } = parsed.data;
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].user.update({
            where: {
                id: session.user.id
            },
            data: {
                name,
                phone,
                whatsappNumber: whatsappNumber || null
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/account');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/account/profile');
        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message ?? 'Could not update profile'
        };
    }
}
// ============================================================
// SERVICES — service enquiry submission (public, guest-friendly)
// ============================================================
const serviceEnquirySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, 'Please enter your full name'),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email('Please enter a valid email'),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(7, 'Please enter a valid phone number'),
    whatsappNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    serviceSlug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Please select a service'),
    serviceName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    occasion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    preferredDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    preferredTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    location: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    budget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    clothingSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(5, 'Please tell us a bit more about what you need')
});
async function submitServiceEnquiry(formData) {
    const parsed = serviceEnquirySchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
        return {
            ok: false,
            error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.'
        };
    }
    const d = parsed.data;
    // Optional: link to authenticated user if logged in
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    const userId = session?.user?.id || null;
    // Generate enquiry number: SVC-YYYY-NNNN
    const year = new Date().getFullYear();
    const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].serviceEnquiry.count();
    const enquiryNumber = `SVC-${year}-${String(count + 1).padStart(4, '0')}`;
    try {
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].serviceEnquiry.create({
            data: {
                enquiryNumber,
                userId,
                customerName: d.name,
                email: d.email.toLowerCase(),
                phone: d.phone,
                whatsappNumber: d.whatsappNumber || null,
                serviceSlug: d.serviceSlug,
                serviceName: d.serviceName,
                occasion: d.occasion || null,
                preferredDate: d.preferredDate ? new Date(d.preferredDate) : null,
                preferredTime: d.preferredTime || null,
                location: d.location || null,
                budget: d.budget || null,
                clothingSize: d.clothingSize || null,
                message: d.message
            }
        });
        await createStoreNotification({
            type: 'SYSTEM',
            title: `New service enquiry ${created.enquiryNumber}`,
            body: `${created.customerName} requested ${created.serviceName}.`,
            link: `/admin/services/enquiries/${created.id}`
        });
        // ── Email alert to the store owner ──
        // Best-effort — never blocks the enquiry submission.
        try {
            const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].adminSettings.findUnique({
                where: {
                    id: 'singleton'
                }
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notifyAdminServiceEnquiry"])({
                enquiryNumber: created.enquiryNumber,
                customerName: created.customerName,
                email: created.email,
                phone: created.phone,
                serviceSlug: created.serviceSlug,
                serviceName: created.serviceName,
                message: created.message,
                occasion: created.occasion,
                preferredDate: created.preferredDate?.toISOString() ?? null,
                location: created.location,
                budget: created.budget
            }, settings?.supportEmail);
        } catch (e) {
            console.error('[email] service enquiry notification error:', e?.message);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/services/enquiries');
        return {
            ok: true,
            enquiryNumber: created.enquiryNumber
        };
    } catch (e) {
        return {
            ok: false,
            error: e?.message ?? 'Could not submit enquiry. Please try again.'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCartLinesWithProducts,
    subscribeToNewsletter,
    createOrder,
    verifyPayment,
    trackOrder,
    adminCreateProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminUpdateOrderStatus,
    adminUpdateSettings,
    adminUpdateHomepageContent,
    registerUser,
    saveAddress,
    deleteAddress,
    updateProfile,
    submitServiceEnquiry
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCartLinesWithProducts, "40ab5b5feefe9e60a30f6b46f5fcc376af8cada3fa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(subscribeToNewsletter, "40b8768d70307752950c912e991cadada77528ea5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrder, "406fa6a8bbdb05aa300267d4abdc6ae7866069db28", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyPayment, "405e95efd1919b754f69e6a0a77914ad5ad388a636", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(trackOrder, "40b32f044c6e73417465263e3d819347daa0af2df7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminCreateProduct, "4001f13de01a3ce132f63c8f2203146e835faeb3e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminUpdateProduct, "602e2f2443ee9dac67556def1217ee07c358126046", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminDeleteProduct, "4090f5ff6c3772b6c678c38829c51371641452f77c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminUpdateOrderStatus, "7c26caf4b0442a124ddde4d163261674a65df3468f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminUpdateSettings, "40982ad8f54fa1a9a7cc99bcea1fd640106a1b9a86", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminUpdateHomepageContent, "40eb917b2e4beebf0f52d82a05aa8de5c203cd8b51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerUser, "40acaad1f7057bddc0b5c70d82a280f89cfdc23b57", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveAddress, "4070e962700c9012e8add24460d88d9c640b5454dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAddress, "407a625ef6ce9a4fa3b43b3dd312017de684dc9deb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProfile, "40de0032ccb8bedf3665302af97d16e19bc2b98c42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitServiceEnquiry, "404c3b985be59792046f602f3945fa9cc16fa7bf30", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/store.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/store.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/store.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40b8768d70307752950c912e991cadada77528ea5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subscribeToNewsletter"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/store.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/store.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e68533a9._.js.map