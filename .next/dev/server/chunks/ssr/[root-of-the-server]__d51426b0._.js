module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/src/lib/gmail.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gmailConfigured",
    ()=>gmailConfigured,
    "sendGmail",
    ()=>sendGmail
]);
/**
 * Gmail SMTP email sender — sends directly through Gmail.
 * Bypasses Resend entirely.
 * 
 * Requires:
 *   GMAIL_USER="Wardrobecare@gmail.com"
 *   GMAIL_APP_PASSWORD="16-char app password from Google"
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)");
;
function gmailConfigured() {
    return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}
let transporter = null;
function getTransporter() {
    if (transporter) return transporter;
    transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
    return transporter;
}
async function sendGmail(input) {
    if (!gmailConfigured()) {
        console.log('[gmail] not configured — set GMAIL_USER and GMAIL_APP_PASSWORD');
        return {
            ok: false,
            error: 'not-configured'
        };
    }
    try {
        const info = await getTransporter().sendMail({
            from: process.env.GMAIL_USER,
            to: input.to,
            subject: input.subject,
            html: input.html
        });
        console.log('[gmail] sent:', info.messageId);
        return {
            ok: true,
            messageId: info.messageId
        };
    } catch (e) {
        console.error('[gmail] error:', e?.message);
        return {
            ok: false,
            error: e?.message
        };
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d51426b0._.js.map