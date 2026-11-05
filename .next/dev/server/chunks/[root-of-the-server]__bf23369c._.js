module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

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
"[project]/src/lib/auth-fallback-secret.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-fallback-secret.ts [middleware] (ecmascript)");
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
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])({
            token: raw,
            secret: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$fallback$2d$secret$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["authSecret"]
        });
        if (!token) return false;
        const role = token.role;
        // Staff = any role except CUSTOMER (mirrors requireAdmin()).
        return !!role && role !== 'CUSTOMER';
    } catch  {
        return false;
    }
}
async function proxy(req) {
    const { pathname } = req.nextUrl;
    // ── 1. Secret admin path: internal rewrite, browser URL unchanged ──
    if (pathname === SECRET_PATH || pathname.startsWith(SECRET_PATH + '/')) {
        const rest = pathname.slice(SECRET_PATH.length) // '' | '/orders' | '/login' ...
        ;
        const target = rest && rest !== '/' ? ADMIN_PREFIX + rest : ADMIN_PREFIX + '/login';
        const url = req.nextUrl.clone();
        url.pathname = target;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(url);
    }
    // ── 2. Stealth gate on the real admin paths ──
    if (pathname === ADMIN_PREFIX || pathname.startsWith(ADMIN_PREFIX + '/')) {
        const staff = await isStaff(req);
        if (!staff) {
            // Indistinguishable from a non-existent page. No redirect, no hint.
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"](null, {
                status: 404
            });
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    // Static assets and the public API surface are skipped; everything else
    // passes through so the secret path can live at any URL.
    matcher: [
        '/((?!api|_next/static|_next/image|images|uploads|favicon.ico|robots.txt|sitemap.xml).*)'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf23369c._.js.map