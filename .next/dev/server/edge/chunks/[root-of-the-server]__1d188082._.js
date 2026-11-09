(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1d188082._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/auth-fallback-secret.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/proxy-handler.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleProxy",
    ()=>handleProxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-fallback-secret.ts [middleware-edge] (ecmascript)");
;
;
;
/**
 * SECURITY PROXY — stealth admin + access gating.
 *
 * 1. SECRET ADMIN PATH
 *    The admin console lives at /admin, but that path is never exposed:
 *    unauthenticated requests to ANY /admin/* route get a plain 404, exactly
 *    like a page that does not exist. Attackers and scanners cannot discover
 *    the admin panel or its login form.
 *
 *    The owner reaches it through a secret path instead:
 *        https://<site>/<ADMIN_ACCESS_PATH>            -> admin login page
 *        https://<site>/<ADMIN_ACCESS_PATH>/<anything> -> /admin/<anything>
 *    The browser URL keeps showing the secret path — /admin is never shown
 *    or linked until the user is actually signed in as staff.
 *
 *    Set ADMIN_ACCESS_PATH in the deployment environment to customise it.
 *    It must start with "/" and must NOT start with "/admin".
 *
 * 2. STEALTH RULE
 *    /admin/* is only served when the session JWT belongs to staff
 *    (any role except CUSTOMER). Everyone else — including signed-in
 *    customers, bots and anonymous visitors — receives 404 Not Found.
 *
 * 3. DEFENCE IN DEPTH
 *    Every admin page additionally calls requireAdmin() server-side
 *    (DB-backed role + active check), so the middleware is a first line,
 *    not the only line.
 */ const ADMIN_PREFIX = '/admin';
function normalizeSecretPath(raw) {
    const fallback = '/wardrobe-hq-9xk2';
    if (!raw) return fallback;
    let p = raw.trim();
    if (!p) return fallback;
    if (!p.startsWith('/')) p = '/' + p;
    p = p.replace(/\/+$/, '');
    if (p === ADMIN_PREFIX || p.startsWith(ADMIN_PREFIX + '/')) return fallback;
    return p;
}
const SECRET_PATH = normalizeSecretPath(process.env.ADMIN_ACCESS_PATH);
async function isStaff(req) {
    // Try both cookie names: __Secure- prefix is used on HTTPS deployments
    // (Vercel), the bare name on plain HTTP (local dev).
    const raw = req.cookies.get('__Secure-next-auth.session-token')?.value ?? req.cookies.get('next-auth.session-token')?.value;
    if (!raw) return false;
    try {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["decode"])({
            token: raw,
            secret: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["authSecret"]
        });
        if (!token) return false;
        const role = token.role;
        // Staff = any role except CUSTOMER (mirrors requireAdmin()).
        return !!role && role !== 'CUSTOMER';
    } catch  {
        return false;
    }
}
async function handleProxy(req) {
    const { pathname } = req.nextUrl;
    // ── 1. Secret admin path: internal rewrite, browser URL unchanged ──
    if (pathname === SECRET_PATH || pathname.startsWith(SECRET_PATH + '/')) {
        const rest = pathname.slice(SECRET_PATH.length) // '' | '/orders' | '/login' ...
        ;
        const target = rest && rest !== '/' ? ADMIN_PREFIX + rest : ADMIN_PREFIX + '/login';
        const url = req.nextUrl.clone();
        url.pathname = target;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(url);
    }
    // ── 2. Stealth gate on the real admin paths ──
    if (pathname === ADMIN_PREFIX || pathname.startsWith(ADMIN_PREFIX + '/')) {
        const staff = await isStaff(req);
        if (!staff) {
            // Indistinguishable from a non-existent page. No redirect, no hint.
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](null, {
                status: 404
            });
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
} // Note: the matcher is now defined on src/middleware.ts, which calls
 // handleProxy() after running redirect handling. This file is no longer
 // a "middleware-shaped" file — it's a regular module imported by middleware.
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
/**
 * Wardrobecare middleware — wraps the existing stealth admin proxy and
 * adds URL-redirect handling.
 *
 * Order:
 *   1. Look up the request path in the Redirect table (via an internal
 *      API route — see below) cached for 60s. If a redirect exists,
 *      return it with the configured statusCode.
 *   2. Otherwise delegate to the existing stealth admin proxy
 *      (Secret admin path rewrite + /admin stealth gate.)
 *
 * Why the API-route indirection for redirect lookups?
 *   Importing Prisma directly in middleware is fragile on Vercel —
 *   the Prisma query engine binary may not bundle correctly into the
 *   middleware runtime, even with `runtime = 'nodejs'`. Fetching an
 *   internal API route (which runs in normal Node.js runtime and can
 *   use Prisma normally) is the universally-safe pattern. The internal
 *   API route is excluded from the middleware matcher, so the fetch
 *   doesn't recurse.
 *
 * The redirect lookup is cached per-instance with a 60-second TTL.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$proxy$2d$handler$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/proxy-handler.ts [middleware-edge] (ecmascript)");
;
;
let redirectCache = {
    map: new Map(),
    at: 0
};
const CACHE_TTL_MS = 60 * 1000;
async function getRedirectForPath(req, path) {
    // Return cached value if available and fresh
    if (Date.now() - redirectCache.at < CACHE_TTL_MS) {
        const cached = redirectCache.map.get(path);
        if (cached !== undefined) return cached;
    } else {
        // Cache expired — reset
        redirectCache = {
            map: new Map(),
            at: Date.now()
        };
    }
    // Fetch from the internal API route — runs in normal Node runtime, can use Prisma.
    // Use the request's own origin so this works on local dev, Vercel preview URLs,
    // and production.
    try {
        const lookupUrl = new URL('/api/seo/redirect-lookup', req.nextUrl.origin).toString();
        const res = await fetch(`${lookupUrl}?path=${encodeURIComponent(path)}`, {
            // Internal request — no cookies needed, fast timeout
            headers: {
                'x-internal': '1'
            },
            // Avoid caching at the fetch layer — we have our own cache
            cache: 'no-store',
            // Short timeout — if the API route is slow, fall through to no redirect
            signal: AbortSignal.timeout(2000)
        }).catch(()=>null);
        if (res && res.ok) {
            const data = await res.json().catch(()=>({
                    redirect: null
                }));
            if (data.redirect) {
                const entry = {
                    toPath: data.redirect.toPath,
                    statusCode: data.redirect.statusCode
                };
                redirectCache.map.set(path, entry);
                return entry;
            }
        }
    } catch (e) {
        // Network / timeout / parse error — fall through to no redirect
        console.warn('[middleware] redirect lookup failed:', e?.message?.slice(0, 100));
    }
    redirectCache.map.set(path, null);
    return null;
}
async function middleware(req) {
    const { pathname, search } = req.nextUrl;
    // 1. Redirect lookup
    const redirect = await getRedirectForPath(req, pathname);
    if (redirect) {
        const url = req.nextUrl.clone();
        url.pathname = redirect.toPath;
        url.search = search; // preserve query string
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url, redirect.statusCode);
    }
    // 2. Delegate to the existing stealth admin proxy
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$proxy$2d$handler$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["handleProxy"])(req);
}
const config = {
    matcher: [
        // Skip static assets, the public API surface, and the redirect-lookup
        // API route itself (otherwise the middleware would recurse when calling
        // itself to look up redirects).
        '/((?!api|_next/static|_next/image|images|uploads|favicon.ico|robots.txt|sitemap.xml).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1d188082._.js.map