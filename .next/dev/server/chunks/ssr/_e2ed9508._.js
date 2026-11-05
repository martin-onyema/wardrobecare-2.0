module.exports = [
"[project]/src/lib/gmail.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_nodemailer_ba4ecd24._.js",
  "server/chunks/ssr/[root-of-the-server]__d51426b0._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/gmail.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
    });
});
}),
];