(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/ui-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/cart-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/wishlist-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
// The top-level retail links now point to their dedicated category pages.
// Dropdown children continue to point to the filtered shop grids.
const NAV_LINKS = [
    {
        label: 'New Arrivals',
        href: '/shop?sort=newest'
    },
    {
        label: 'Clothing',
        href: '/clothing',
        children: [
            {
                label: 'Blazers',
                href: '/shop?category=blazers'
            },
            {
                label: 'Bottoms',
                href: '/bottoms'
            },
            {
                label: 'Casual Shirts',
                href: '/shop?category=casual-shirts'
            },
            {
                label: 'Formal / Office Shirts',
                href: '/shop?category=formal-shirts'
            },
            {
                label: 'Hoodies & Sweatshirts',
                href: '/shop?category=hoodies-sweatshirts'
            },
            {
                label: 'Innerwear',
                href: '/shop?category=innerwear'
            },
            {
                label: 'Jackets',
                href: '/shop?category=jackets'
            },
            {
                label: 'Polo Shirts',
                href: '/shop?category=polo-shirts'
            },
            {
                label: 'Suits',
                href: '/shop?category=suits'
            },
            {
                label: 'T-Shirts',
                href: '/shop?category=t-shirts'
            }
        ]
    },
    {
        label: 'Footwear',
        href: '/footwear',
        children: [
            {
                label: 'Casual Shoes',
                href: '/shop?category=casual-shoes'
            },
            {
                label: 'Dress Shoes',
                href: '/shop?category=dress-shoes'
            },
            {
                label: 'Exotic Shoes',
                href: '/shop?category=exotic-shoes'
            },
            {
                label: 'Loafers',
                href: '/shop?category=loafers'
            }
        ]
    },
    {
        label: 'Accessories',
        href: '/accessories',
        children: [
            {
                label: 'Belts',
                href: '/shop?category=belts'
            },
            {
                label: 'Caps & Hats',
                href: '/shop?category=caps-hats'
            },
            {
                label: 'Pocket Squares',
                href: '/shop?category=pocket-squares'
            },
            {
                label: 'Socks',
                href: '/shop?category=socks'
            },
            {
                label: 'Sunglasses',
                href: '/shop?category=sunglasses'
            },
            {
                label: 'Ties',
                href: '/shop?category=ties'
            },
            {
                label: 'Wallets & Purses',
                href: '/shop?category=wallets-purses'
            }
        ]
    },
    {
        label: 'Fragrance & Grooming',
        href: '/fragrance-grooming',
        children: [
            {
                label: "Men's Fragrance",
                href: '/shop?category=mens-fragrance'
            },
            {
                label: "Men's Grooming",
                href: '/shop?category=mens-grooming'
            },
            {
                label: "Women's Fragrance",
                href: '/shop?category=womens-fragrance'
            }
        ]
    }
];
function Navbar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openKey, setOpenKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const closeTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const setSearchOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "Navbar.useUIStore[setSearchOpen]": (s)=>s.setSearchOpen
    }["Navbar.useUIStore[setSearchOpen]"]);
    const setCartOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "Navbar.useUIStore[setCartOpen]": (s)=>s.setCartOpen
    }["Navbar.useUIStore[setCartOpen]"]);
    const setWishlistOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "Navbar.useUIStore[setWishlistOpen]": (s)=>s.setWishlistOpen
    }["Navbar.useUIStore[setWishlistOpen]"]);
    const setMobileMenuOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "Navbar.useUIStore[setMobileMenuOpen]": (s)=>s.setMobileMenuOpen
    }["Navbar.useUIStore[setMobileMenuOpen]"]);
    const cartCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])({
        "Navbar.useCartStore[cartCount]": (s)=>s.lines.reduce({
                "Navbar.useCartStore[cartCount]": (n, l)=>n + l.quantity
            }["Navbar.useCartStore[cartCount]"], 0)
    }["Navbar.useCartStore[cartCount]"]);
    const wishlistCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])({
        "Navbar.useWishlistStore[wishlistCount]": (s)=>s.lines.length
    }["Navbar.useWishlistStore[wishlistCount]"]);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>setScrolled(window.scrollY > 20)
            }["Navbar.useEffect.onScroll"];
            onScroll();
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    // Close dropdown menus when the route changes — React 19 "adjust state
    // during render" pattern (avoids setState-in-effect lint error).
    const [prevPath, setPrevPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(pathname);
    if (pathname !== prevPath) {
        setPrevPath(pathname);
        if (openKey !== null) setOpenKey(null);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onKey = {
                "Navbar.useEffect.onKey": (event)=>{
                    if (event.key === 'Escape') {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                        setOpenKey(null);
                    }
                }
            }["Navbar.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const openMenu = (key)=>{
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = null;
        setOpenKey(key);
    };
    const scheduleClose = ()=>{
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(()=>setOpenKey(null), 160);
    };
    const closeNow = ()=>{
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = null;
        setOpenKey(null);
    };
    if (pathname?.startsWith('/admin')) return null;
    const onServicesPage = pathname === '/services' || pathname?.startsWith('/services/');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-background', scrolled ? 'border-b border-foreground/10 shadow-[0_1px_0_rgba(18,17,16,0.02)]' : 'border-b border-transparent'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-foreground/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container-editorial",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-9 text-[9px] md:text-[10px] uppercase tracking-[0.06em] md:tracking-[0.22em] text-foreground/70 whitespace-nowrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sm:hidden",
                                            children: "Book a consultation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: "Book a wardrobe consultation this week"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-2 md:mx-2.5 text-foreground/30",
                                            "aria-hidden": true,
                                            children: "·"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        "Personal shopping via WhatsApp",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden xl:inline text-foreground/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mx-2.5 text-foreground/30",
                                                    "aria-hidden": true,
                                                    children: "·"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, this),
                                                "Complimentary delivery over ₦500,000"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container-editorial",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-between gap-6 transition-all duration-300', scrolled ? 'h-14' : 'h-16 md:h-[72px]'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMobileMenuOpen(true),
                                    className: "lg:hidden p-2 -ml-2 text-foreground",
                                    "aria-label": "Open menu",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        className: "h-5 w-5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex-shrink-0 font-display text-[1.35rem] md:text-2xl leading-none tracking-[0.01em]",
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: "Wardrobecare"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden lg:flex items-center gap-1 xl:gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            onMouseEnter: ()=>openMenu('services'),
                                            onMouseLeave: scheduleClose,
                                            onFocus: ()=>openMenu('services'),
                                            onBlur: scheduleClose,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/services",
                                                    "aria-expanded": openKey === 'services',
                                                    "aria-haspopup": "true",
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-full transition-all duration-300', 'bg-foreground text-background hover:bg-foreground/85', onServicesPage && 'ring-1 ring-foreground/30'),
                                                    children: [
                                                        "Services",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-3 w-3 transition-transform duration-200', openKey === 'services' && 'rotate-180'),
                                                            strokeWidth: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 17
                                                }, this),
                                                openKey === 'services' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-full left-0 pt-3 z-50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-[640px] bg-background border border-foreground/12 shadow-[0_24px_60px_-24px_rgba(18,17,16,0.25)]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-7",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-3 gap-7",
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVICE_GROUPS"].map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "eyebrow text-foreground/50 mb-4 pb-2.5 border-b border-foreground/10",
                                                                                    children: group.label
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 211,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                                    className: "space-y-3.5",
                                                                                    children: group.services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                                href: `/services/${service.slug}`,
                                                                                                className: "group block",
                                                                                                onClick: closeNow,
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "flex items-baseline gap-2",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-[10px] text-foreground/40 tabular-nums",
                                                                                                                children: service.number
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                                lineNumber: 217,
                                                                                                                columnNumber: 41
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-sm text-foreground group-hover:text-foreground/60 transition-colors",
                                                                                                                children: service.name
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                                lineNumber: 218,
                                                                                                                columnNumber: 41
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                        lineNumber: 216,
                                                                                                        columnNumber: 39
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-[11px] text-foreground/50 mt-0.5 pl-6",
                                                                                                        children: service.priceLabel
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                        lineNumber: 220,
                                                                                                        columnNumber: 39
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                lineNumber: 215,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        }, service.slug, false, {
                                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                            lineNumber: 214,
                                                                                            columnNumber: 35
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 212,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, group.label, true, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 210,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 208,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-7 pt-4 border-t border-foreground/10 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-foreground/60",
                                                                            children: "Not sure which service you need?"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 229,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            href: "/services#book",
                                                                            className: "text-[11px] uppercase tracking-[0.18em] text-foreground link-underline",
                                                                            onClick: closeNow,
                                                                            children: "Book a Consultation →"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 230,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        NAV_LINKS.map((link)=>link.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                onMouseEnter: ()=>openMenu(link.label),
                                                onMouseLeave: scheduleClose,
                                                onFocus: ()=>openMenu(link.label),
                                                onBlur: scheduleClose,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: link.href,
                                                        "aria-expanded": openKey === link.label,
                                                        "aria-haspopup": "true",
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap', openKey === link.label && 'text-foreground'),
                                                        children: [
                                                            link.label,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-3 w-3 transition-transform duration-200', openKey === link.label && 'rotate-180'),
                                                                strokeWidth: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, this),
                                                    openKey === link.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-full left-0 pt-3 z-50",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-[460px] bg-background border border-foreground/12 shadow-[0_24px_60px_-24px_rgba(18,17,16,0.25)]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-6",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "eyebrow text-foreground/50 mb-4 pb-2.5 border-b border-foreground/10",
                                                                            children: link.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 270,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                            className: "grid grid-cols-2 gap-x-6",
                                                                            children: link.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                        href: child.href,
                                                                                        onClick: closeNow,
                                                                                        className: "group flex items-center justify-between py-2 text-sm text-foreground/75 hover:text-foreground transition-colors",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "group-hover:translate-x-0.5 transition-transform duration-300",
                                                                                                children: child.label
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                lineNumber: 279,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-foreground/30 group-hover:text-foreground transition-colors",
                                                                                                "aria-hidden": true,
                                                                                                children: "→"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                                lineNumber: 280,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                        lineNumber: 274,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, child.href, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 273,
                                                                                    columnNumber: 33
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 271,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-6 py-3.5 border-t border-foreground/10 flex items-center justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-foreground/60",
                                                                            children: [
                                                                                "Everything in ",
                                                                                link.label.toLowerCase(),
                                                                                "."
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 287,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            href: link.href,
                                                                            onClick: closeNow,
                                                                            className: "text-[11px] uppercase tracking-[0.18em] text-foreground link-underline",
                                                                            children: "Shop All →"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 288,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, link.label, true, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "px-3 xl:px-3.5 py-2 text-[11px] uppercase tracking-[0.16em] text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap",
                                                children: link.label
                                            }, link.label, false, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 297,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 sm:gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSearchOpen(true),
                                            "aria-label": "Search",
                                            className: "p-2 text-foreground/75 hover:text-foreground transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "h-[18px] w-[18px]",
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: session ? '/account' : '/account/login',
                                            "aria-label": "Account",
                                            className: "hidden sm:block p-2 text-foreground/75 hover:text-foreground transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "h-[18px] w-[18px]",
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setWishlistOpen(true),
                                            "aria-label": "Wishlist",
                                            className: "relative p-2 text-foreground/75 hover:text-foreground transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "h-[18px] w-[18px]",
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 17
                                                }, this),
                                                wishlistCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-0.5 right-0.5 bg-foreground text-background text-[9px] font-medium rounded-full h-3.5 w-3.5 flex items-center justify-center tabular-nums",
                                                    children: wishlistCount
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCartOpen(true),
                                            "aria-label": "Cart",
                                            className: "relative p-2 text-foreground/75 hover:text-foreground transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "h-[18px] w-[18px]",
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 17
                                                }, this),
                                                cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-0.5 right-0.5 bg-foreground text-background text-[9px] font-medium rounded-full h-3.5 w-3.5 flex items-center justify-center tabular-nums",
                                                    children: cartCount
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                            lineNumber: 321,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[100px] md:h-[108px]",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "KaHFKB2mDGD2QDBTT3VxUBPp428=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/actions/data:05b916 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscribeToNewsletter",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40d3f405df0b3e0b61465fabd287ac817772bc5d78":"subscribeToNewsletter"},"src/actions/store.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40d3f405df0b3e0b61465fabd287ac817772bc5d78", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "subscribeToNewsletter");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc3RvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBnZW5lcmF0ZU9yZGVyTnVtYmVyLCBjYWxjdWxhdGVEZWxpdmVyeUZlZSB9IGZyb20gJ0AvbGliL2Zvcm1hdCdcbmltcG9ydCB7IGluaXRpYWxpemVQYXlzdGFja1RyYW5zYWN0aW9uLCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uIH0gZnJvbSAnQC9saWIvcGF5c3RhY2svc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ0AvbGliL3Nlc3Npb24nXG5pbXBvcnQgeyByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbiB9IGZyb20gJ0AvbGliL3Blcm1pc3Npb25zJ1xuaW1wb3J0IHsgYXVkaXRMb2csIGRpZmZDaGFuZ2VkRmllbGRzLCBkZXNjcmliZUNoYW5nZXMgfSBmcm9tICdAL2xpYi9hdWRpdCdcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG4vLyBSZXNpbGllbnQgUHJpc21hIHNlbGVjdCBjb25zdGFudHMg4oCUIGxpc3Qgb25seSBwcmUtZXhpc3RpbmcgY29sdW1ucyBzb1xuLy8gcXVlcmllcyB3b3JrIHdoZXRoZXIgb3Igbm90IHRoZSBTRU8gTWFuYWdlciBtaWdyYXRpb24gaGFzIGJlZW4gYXBwbGllZC5cbmltcG9ydCB7IFBST0RVQ1RfU0VMRUNUX0JBU0UsIENBVEVHT1JZX1NFTEVDVF9CQVNFIH0gZnJvbSAnQC9saWIvcXVlcmllcydcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tICduZXh0L2hlYWRlcnMnXG5pbXBvcnQgeyByYXRlTGltaXQsIGNsaWVudElwRnJvbUhlYWRlcnMgfSBmcm9tICdAL2xpYi9yYXRlLWxpbWl0J1xuaW1wb3J0IHtcbiAgc2VuZE9yZGVyQ29uZmlybWF0aW9uLFxuICBzZW5kUGF5bWVudFJlY2VpcHQsXG4gIG5vdGlmeUFkbWluTmV3T3JkZXIsXG4gIG5vdGlmeUFkbWluU2VydmljZUVucXVpcnksXG4gIHR5cGUgRW1haWxPcmRlcixcbiAgdHlwZSBFbWFpbE9yZGVySXRlbSxcbn0gZnJvbSAnQC9saWIvZW1haWwnXG5pbXBvcnQgeyBub3RpZnlPd25lck5ld09yZGVyIH0gZnJvbSAnQC9saWIvc21zJ1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENBUlQg4oCUIHNlcnZlci1zaWRlIGxpbmUgcGVyc2lzdGVuY2UgKHVzZWQgYWZ0ZXIgc2VydmVyIHZlcmlmaWNhdGlvbilcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBDYXJ0TGluZUlucHV0ID0ge1xuICBwcm9kdWN0SWQ6IHN0cmluZ1xuICB2YXJpYW50SWQ/OiBzdHJpbmcgfCBudWxsXG4gIHNpemU/OiBzdHJpbmcgfCBudWxsXG4gIHF1YW50aXR5OiBudW1iZXJcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENhcnRMaW5lc1dpdGhQcm9kdWN0cyhsaW5lczogQ2FydExpbmVJbnB1dFtdKSB7XG4gIGlmICghbGluZXMubGVuZ3RoKSByZXR1cm4gW11cbiAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRNYW55KHtcbiAgICB3aGVyZTogeyBpZDogeyBpbjogbGluZXMubWFwKChsKSA9PiBsLnByb2R1Y3RJZCkgfSB9LFxuICAgIHNlbGVjdDoge1xuICAgICAgLi4uUFJPRFVDVF9TRUxFQ1RfQkFTRSxcbiAgICAgIGltYWdlczogeyBvcmRlckJ5OiB7IHBvc2l0aW9uOiAnYXNjJyB9LCB0YWtlOiAxLCBzZWxlY3Q6IHsgaWQ6IHRydWUsIHVybDogdHJ1ZSwgYWx0VGV4dDogdHJ1ZSwgcG9zaXRpb246IHRydWUsIHByb2R1Y3RJZDogdHJ1ZSB9IH0sXG4gICAgICB2YXJpYW50czogdHJ1ZSxcbiAgICAgIGNhdGVnb3J5OiB7IHNlbGVjdDogQ0FURUdPUllfU0VMRUNUX0JBU0UgfSxcbiAgICB9LFxuICB9KVxuICByZXR1cm4gbGluZXNcbiAgICAubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCBwID0gcHJvZHVjdHMuZmluZCgocCkgPT4gcC5pZCA9PT0gbGluZS5wcm9kdWN0SWQpXG4gICAgICBpZiAoIXApIHJldHVybiBudWxsXG4gICAgICBjb25zdCB2YXJpYW50ID0gbGluZS52YXJpYW50SWQgPyBwLnZhcmlhbnRzLmZpbmQoKHYpID0+IHYuaWQgPT09IGxpbmUudmFyaWFudElkKSA6IHVuZGVmaW5lZFxuICAgICAgY29uc3QgcHJpY2UgPSB2YXJpYW50Py5wcmljZSA/PyBwLnNhbGVQcmljZSA/PyBwLnByaWNlXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5saW5lLFxuICAgICAgICBuYW1lOiBwLm5hbWUsXG4gICAgICAgIHNsdWc6IHAuc2x1ZyxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIG9yaWdpbmFsUHJpY2U6IHAuc2FsZVByaWNlICYmIHAuc2FsZVByaWNlIDwgcC5wcmljZSA/IHAucHJpY2UgOiB1bmRlZmluZWQsXG4gICAgICAgIGltYWdlOiBwLmltYWdlc1swXT8udXJsLFxuICAgICAgICBza3U6IHZhcmlhbnQ/LnNrdSA/PyBwLnNrdSxcbiAgICAgICAgaW5TdG9jazogdmFyaWFudCA/IHZhcmlhbnQuc3RvY2sgPiAwIDogcC52YXJpYW50cy5zb21lKCh2KSA9PiB2LnN0b2NrID4gMCksXG4gICAgICAgIG1heFF1YW50aXR5OiB2YXJpYW50Py5zdG9jayA/PyBNYXRoLm1heCguLi5wLnZhcmlhbnRzLm1hcCgodikgPT4gdi5zdG9jayksIDApLFxuICAgICAgICBjYXRlZ29yeUlkOiBwLmNhdGVnb3J5SWQsXG4gICAgICAgIGNhdGVnb3J5TmFtZTogcC5jYXRlZ29yeS5uYW1lLFxuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBhbnlbXVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE5FV1NMRVRURVJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBuZXdzbGV0dGVyU2NoZW1hID0gei5vYmplY3Qoe1xuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgpLFxuICBuYW1lOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3Vic2NyaWJlVG9OZXdzbGV0dGVyKGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICBjb25zdCBwYXJzZWQgPSBuZXdzbGV0dGVyU2NoZW1hLnNhZmVQYXJzZSh7XG4gICAgZW1haWw6IGZvcm1EYXRhLmdldCgnZW1haWwnKSxcbiAgICBuYW1lOiBmb3JtRGF0YS5nZXQoJ25hbWUnKSB8fCB1bmRlZmluZWQsXG4gIH0pXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwuJyB9XG4gIH1cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5uZXdzbGV0dGVyU3Vic2NyaWJlci51cHNlcnQoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IHBhcnNlZC5kYXRhLmVtYWlsLnRvTG93ZXJDYXNlKCkgfSxcbiAgICAgIHVwZGF0ZTogeyBhY3RpdmU6IHRydWUgfSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICBlbWFpbDogcGFyc2VkLmRhdGEuZW1haWwudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbmFtZTogcGFyc2VkLmRhdGEubmFtZSxcbiAgICAgICAgc291cmNlOiAnZm9vdGVyJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICByZXR1cm4geyBvazogdHJ1ZSB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnQ291bGQgbm90IHN1YnNjcmliZS4gVHJ5IGFnYWluLicgfVxuICB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ0hFQ0tPVVQg4oCUIHNlcnZlci1zaWRlIG9yZGVyIGNyZWF0aW9uIHdpdGggc2VydmVyLWNhbGN1bGF0ZWQgdG90YWxzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY2hlY2tvdXRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGN1c3RvbWVyTmFtZTogei5zdHJpbmcoKS5taW4oMiksXG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKCksXG4gIHBob25lOiB6LnN0cmluZygpLm1pbig3KSxcbiAgd2hhdHNhcHBOdW1iZXI6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc3RhdGU6IHouc3RyaW5nKCkubWluKDIpLFxuICBjaXR5OiB6LnN0cmluZygpLm1pbigyKSxcbiAgYWRkcmVzczogei5zdHJpbmcoKS5taW4oNSksXG4gIGRlbGl2ZXJ5SW5zdHJ1Y3Rpb25zOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGxpbmVzOiB6LmFycmF5KFxuICAgIHoub2JqZWN0KHtcbiAgICAgIHByb2R1Y3RJZDogei5zdHJpbmcoKSxcbiAgICAgIHZhcmlhbnRJZDogei5zdHJpbmcoKS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gICAgICBzaXplOiB6LnN0cmluZygpLm51bGxhYmxlKCkub3B0aW9uYWwoKSxcbiAgICAgIHF1YW50aXR5OiB6Lm51bWJlcigpLmludCgpLm1pbigxKS5tYXgoOTkpLFxuICAgIH0pLFxuICApLFxuICBjb3Vwb25Db2RlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHBheW1lbnRNZXRob2Q6IHouZW51bShbJ1BBWVNUQUNLJywgJ1dIQVRTQVBQJywgJ0JBTktfVFJBTlNGRVInXSkuZGVmYXVsdCgnUEFZU1RBQ0snKSxcbn0pXG5cbmV4cG9ydCB0eXBlIENoZWNrb3V0UmVzdWx0ID1cbiAgfCB7IG9rOiB0cnVlOyBvcmRlck51bWJlcjogc3RyaW5nOyBhdXRob3JpemF0aW9uVXJsPzogc3RyaW5nOyByZWZlcmVuY2U6IHN0cmluZzsgdG90YWw6IG51bWJlciB9XG4gIHwgeyBvazogZmFsc2U7IGVycm9yOiBzdHJpbmcgfVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhIHwgUmVjb3JkPHN0cmluZywgYW55Pik6IFByb21pc2U8Q2hlY2tvdXRSZXN1bHQ+IHtcbiAgLy8gQWNjZXB0IGVpdGhlciBGb3JtRGF0YSBvciBhIHBsYWluIG9iamVjdCAoY2FsbGVkIGZyb20gY2xpZW50KVxuICBjb25zdCBpbnB1dDogUmVjb3JkPHN0cmluZywgYW55PiA9XG4gICAgZm9ybURhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSA/IE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpIDogZm9ybURhdGFcbiAgLy8gbGluZXMgbWF5IGFycml2ZSBhcyBKU09OIHN0cmluZyBmcm9tIEZvcm1EYXRhXG4gIGlmICh0eXBlb2YgaW5wdXQubGluZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHsgaW5wdXQubGluZXMgPSBKU09OLnBhcnNlKGlucHV0LmxpbmVzKSB9IGNhdGNoIHsgaW5wdXQubGluZXMgPSBbXSB9XG4gIH1cbiAgLy8gQ29lcmNlIHF1YW50aXR5IHRvIG51bWJlclxuICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dC5saW5lcykpIHtcbiAgICBpbnB1dC5saW5lcyA9IGlucHV0LmxpbmVzLm1hcCgobDogYW55KSA9PiAoeyAuLi5sLCBxdWFudGl0eTogTnVtYmVyKGwucXVhbnRpdHkpIH0pKVxuICB9XG4gIGNvbnN0IHBhcnNlZCA9IGNoZWNrb3V0U2NoZW1hLnNhZmVQYXJzZShpbnB1dClcbiAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ0ludmFsaWQgY2hlY2tvdXQgZGF0YS4nIH1cbiAgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcblxuICBpZiAoIWRhdGEubGluZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1lvdXIgYmFnIGlzIGVtcHR5LicgfVxuICB9XG5cbiAgLy8gRmV0Y2ggcHJvZHVjdHMgc2VydmVyLXNpZGUgdG8gcmVjb21wdXRlIHRvdGFscyDigJQgbmV2ZXIgdHJ1c3QgY2xpZW50IHByaWNlc1xuICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IGlkOiB7IGluOiBkYXRhLmxpbmVzLm1hcCgobCkgPT4gbC5wcm9kdWN0SWQpIH0gfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIC4uLlBST0RVQ1RfU0VMRUNUX0JBU0UsXG4gICAgICB2YXJpYW50czogdHJ1ZSxcbiAgICAgIGNhdGVnb3J5OiB7IHNlbGVjdDogQ0FURUdPUllfU0VMRUNUX0JBU0UgfSxcbiAgICAgIGltYWdlczogeyB0YWtlOiAxLCBvcmRlckJ5OiB7IHBvc2l0aW9uOiAnYXNjJyB9LCBzZWxlY3Q6IHsgaWQ6IHRydWUsIHVybDogdHJ1ZSwgYWx0VGV4dDogdHJ1ZSwgcG9zaXRpb246IHRydWUsIHByb2R1Y3RJZDogdHJ1ZSB9IH0sXG4gICAgfSxcbiAgfSlcblxuICBsZXQgc3VidG90YWwgPSAwXG4gIGNvbnN0IG9yZGVySXRlbXNEYXRhOiBhbnlbXSA9IFtdXG4gIGZvciAoY29uc3QgbGluZSBvZiBkYXRhLmxpbmVzKSB7XG4gICAgY29uc3QgcCA9IHByb2R1Y3RzLmZpbmQoKHApID0+IHAuaWQgPT09IGxpbmUucHJvZHVjdElkKVxuICAgIGlmICghcCkgY29udGludWVcbiAgICBjb25zdCB2YXJpYW50ID0gbGluZS52YXJpYW50SWQgPyBwLnZhcmlhbnRzLmZpbmQoKHYpID0+IHYuaWQgPT09IGxpbmUudmFyaWFudElkKSA6IHVuZGVmaW5lZFxuICAgIC8vIHN0b2NrIGNoZWNrXG4gICAgaWYgKHZhcmlhbnQpIHtcbiAgICAgIGlmICh2YXJpYW50LnN0b2NrIDwgbGluZS5xdWFudGl0eSkge1xuICAgICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgSW5zdWZmaWNpZW50IHN0b2NrIGZvciAke3AubmFtZX0gKCR7dmFyaWFudC5zaXplfSkuYCB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvdGFsU3RvY2sgPSBwLnZhcmlhbnRzLnJlZHVjZSgocywgdikgPT4gcyArIHYuc3RvY2ssIDApXG4gICAgICBpZiAodG90YWxTdG9jayA8IGxpbmUucXVhbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYEluc3VmZmljaWVudCBzdG9jayBmb3IgJHtwLm5hbWV9LmAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB1bml0UHJpY2UgPSB2YXJpYW50Py5wcmljZSA/PyBwLnNhbGVQcmljZSA/PyBwLnByaWNlXG4gICAgY29uc3QgdG90YWxQcmljZSA9IHVuaXRQcmljZSAqIGxpbmUucXVhbnRpdHlcbiAgICBzdWJ0b3RhbCArPSB0b3RhbFByaWNlXG4gICAgb3JkZXJJdGVtc0RhdGEucHVzaCh7XG4gICAgICBwcm9kdWN0SWQ6IHAuaWQsXG4gICAgICB2YXJpYW50SWQ6IHZhcmlhbnQ/LmlkLFxuICAgICAgcHJvZHVjdE5hbWU6IHAubmFtZSxcbiAgICAgIHByb2R1Y3RTbHVnOiBwLnNsdWcsXG4gICAgICBwcm9kdWN0SW1hZ2U6IHAuaW1hZ2VzWzBdPy51cmwsXG4gICAgICBzaXplOiBsaW5lLnNpemUgPz8gdmFyaWFudD8uc2l6ZSxcbiAgICAgIGNvbG9yOiB2YXJpYW50Py5jb2xvcixcbiAgICAgIHNrdTogdmFyaWFudD8uc2t1ID8/IHAuc2t1LFxuICAgICAgdW5pdFByaWNlLFxuICAgICAgcXVhbnRpdHk6IGxpbmUucXVhbnRpdHksXG4gICAgICB0b3RhbFByaWNlLFxuICAgIH0pXG4gIH1cblxuICBpZiAoIW9yZGVySXRlbXNEYXRhLmxlbmd0aCkge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdObyB2YWxpZCBpdGVtcyBpbiB5b3VyIGJhZy4nIH1cbiAgfVxuXG4gIC8vIEFwcGx5IGNvdXBvbiBpZiBwcm92aWRlZFxuICBsZXQgZGlzY291bnQgPSAwXG4gIGlmIChkYXRhLmNvdXBvbkNvZGUpIHtcbiAgICBjb25zdCBjb3Vwb24gPSBhd2FpdCBkYi5jb3Vwb24uZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGNvZGU6IGRhdGEuY291cG9uQ29kZS50b1VwcGVyQ2FzZSgpIH0gfSlcbiAgICBpZiAoY291cG9uICYmIGNvdXBvbi5hY3RpdmUgJiYgKCFjb3Vwb24uZW5kc0F0IHx8IGNvdXBvbi5lbmRzQXQgPiBuZXcgRGF0ZSgpKSkge1xuICAgICAgaWYgKGNvdXBvbi5taW5PcmRlciAmJiBzdWJ0b3RhbCA8IGNvdXBvbi5taW5PcmRlcikge1xuICAgICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgQ291cG9uIHJlcXVpcmVzIGEgbWluaW11bSBvcmRlciBvZiDigqYke2NvdXBvbi5taW5PcmRlci50b0xvY2FsZVN0cmluZygpfS5gIH1cbiAgICAgIH1cbiAgICAgIGlmIChjb3Vwb24udHlwZSA9PT0gJ1BFUkNFTlRBR0UnKSB7XG4gICAgICAgIGRpc2NvdW50ID0gKHN1YnRvdGFsICogY291cG9uLnZhbHVlKSAvIDEwMFxuICAgICAgICBpZiAoY291cG9uLm1heERpc2NvdW50KSBkaXNjb3VudCA9IE1hdGgubWluKGRpc2NvdW50LCBjb3Vwb24ubWF4RGlzY291bnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNjb3VudCA9IGNvdXBvbi52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIERlbGl2ZXJ5IGZlZVxuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGRiLmFkbWluU2V0dGluZ3MuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAnc2luZ2xldG9uJyB9IH0pXG4gIGNvbnN0IGRlbGl2ZXJ5RmVlID0gY2FsY3VsYXRlRGVsaXZlcnlGZWUoXG4gICAgc3VidG90YWwgLSBkaXNjb3VudCxcbiAgICBzZXR0aW5ncz8uZGVmYXVsdERlbGl2ZXJ5RmVlID8/IDI1MDAsXG4gICAgc2V0dGluZ3M/LmZyZWVEZWxpdmVyeVRocmVzaG9sZCA/PyA1MDAwMDAsXG4gIClcblxuICBjb25zdCB0b3RhbCA9IE1hdGgubWF4KDAsIHN1YnRvdGFsIC0gZGlzY291bnQgKyBkZWxpdmVyeUZlZSlcblxuICAvLyBDcmVhdGUgb3JkZXJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCBvcmRlck51bWJlciA9IGdlbmVyYXRlT3JkZXJOdW1iZXIoKVxuICBjb25zdCByZWZlcmVuY2UgPSBgJHtvcmRlck51bWJlcn0tJHtEYXRlLm5vdygpLnRvU3RyaW5nKDM2KX1gXG5cbiAgY29uc3Qgb3JkZXIgPSBhd2FpdCBkYi5vcmRlci5jcmVhdGUoe1xuICAgIGRhdGE6IHtcbiAgICAgIG9yZGVyTnVtYmVyLFxuICAgICAgdXNlcklkOiBzZXNzaW9uPy51c2VyPy5pZCxcbiAgICAgIGN1c3RvbWVyTmFtZTogZGF0YS5jdXN0b21lck5hbWUsXG4gICAgICBlbWFpbDogZGF0YS5lbWFpbC50b0xvd2VyQ2FzZSgpLFxuICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICB3aGF0c2FwcE51bWJlcjogZGF0YS53aGF0c2FwcE51bWJlcixcbiAgICAgIHN0YXRlOiBkYXRhLnN0YXRlLFxuICAgICAgY2l0eTogZGF0YS5jaXR5LFxuICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLFxuICAgICAgZGVsaXZlcnlJbnN0cnVjdGlvbnM6IGRhdGEuZGVsaXZlcnlJbnN0cnVjdGlvbnMsXG4gICAgICBzdWJ0b3RhbCxcbiAgICAgIGRlbGl2ZXJ5RmVlLFxuICAgICAgZGlzY291bnQsXG4gICAgICB0b3RhbCxcbiAgICAgIGNvdXBvbkNvZGU6IGRhdGEuY291cG9uQ29kZSxcbiAgICAgIHBheW1lbnRNZXRob2Q6IGRhdGEucGF5bWVudE1ldGhvZCxcbiAgICAgIHN0YXR1czogZGF0YS5wYXltZW50TWV0aG9kID09PSAnV0hBVFNBUFAnID8gJ1BFTkRJTkcnIDogJ1BFTkRJTkcnLFxuICAgICAgcGF5bWVudFN0YXR1czogJ1BFTkRJTkcnLFxuICAgICAgaXRlbXM6IHsgY3JlYXRlOiBvcmRlckl0ZW1zRGF0YSB9LFxuICAgICAgc3RhdHVzSGlzdG9yeToge1xuICAgICAgICBjcmVhdGU6IHsgc3RhdHVzOiAnUEVORElORycsIG5vdGU6ICdPcmRlciByZWNlaXZlZCcgfSxcbiAgICAgIH0sXG4gICAgICBwYXltZW50czogZGF0YS5wYXltZW50TWV0aG9kID09PSAnUEFZU1RBQ0snID8ge1xuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBwcm92aWRlcjogJ1BBWVNUQUNLJyxcbiAgICAgICAgICByZWZlcmVuY2UsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbCxcbiAgICAgICAgICBzdGF0dXM6ICdQRU5ESU5HJyxcbiAgICAgICAgfSxcbiAgICAgIH0gOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBpbmNsdWRlOiB7IGl0ZW1zOiB0cnVlIH0sXG4gIH0pXG5cbiAgLy8g4pSA4pSAIFRyYW5zYWN0aW9uYWwgZW1haWxzOiBjdXN0b21lciBjb25maXJtYXRpb24gKyBvd25lciBhbGVydCDilIDilIBcbiAgLy8gc2VuZEVtYWlsIG5ldmVyIHRocm93cyBhbmQgc2tpcHMgaW5zdGFudGx5IHdoZW4gUkVTRU5EX0FQSV9LRVkgaXMgbm90XG4gIC8vIGNvbmZpZ3VyZWQsIHNvIGNoZWNrb3V0IGNhbm5vdCBiZSBzbG93ZWQgb3IgYnJva2VuIGJ5IGVtYWlsLlxuICB0cnkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHNlbmRPcmRlckNvbmZpcm1hdGlvbihcbiAgICAgICAgb3JkZXIgYXMgdW5rbm93biBhcyBFbWFpbE9yZGVyLFxuICAgICAgICBvcmRlci5pdGVtcyBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXJJdGVtW10sXG4gICAgICAgIHNldHRpbmdzPy5zdXBwb3J0RW1haWwgPz8gdW5kZWZpbmVkLFxuICAgICAgKSxcbiAgICAgIG5vdGlmeUFkbWluTmV3T3JkZXIob3JkZXIgYXMgdW5rbm93biBhcyBFbWFpbE9yZGVyLCBvcmRlci5pdGVtcyBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXJJdGVtW10sIHNldHRpbmdzPy5zdXBwb3J0RW1haWwpLFxuICAgIF0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tlbWFpbF0gb3JkZXIgY29uZmlybWF0aW9uIGZsb3cgZXJyb3I6JywgZT8ubWVzc2FnZSlcbiAgfVxuXG4gIC8vIOKUgOKUgCBTTVMgbm90aWZpY2F0aW9uIHRvIHRoZSBzdG9yZSBvd25lciDilIDilIBcbiAgLy8gQmVzdC1lZmZvcnQg4oCUIG5ldmVyIGJsb2NrcyB0aGUgb3JkZXIuIFVzZXMgVGVybWlpIFNNUyBBUEkuXG4gIC8vIFRoZSBTTVMgaXMgc2VudCBvbmx5IHdoZW4gdGhlIG9yZGVyIG1lZXRzIHRoZSBjb25maXJtYXRpb24gY3JpdGVyaWFcbiAgLy8gKG9yZGVyIHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCDigJQgcGF5bWVudCBzdGF0dXMgaXMgaGFuZGxlZCBzZXBhcmF0ZWx5XG4gIC8vIGJ5IHRoZSBQYXlzdGFjayB3ZWJob29rIGZvciBvbmxpbmUgcGF5bWVudHMpLlxuICB0cnkge1xuICAgIGF3YWl0IG5vdGlmeU93bmVyTmV3T3JkZXIoXG4gICAgICB7XG4gICAgICAgIG9yZGVyTnVtYmVyOiBvcmRlci5vcmRlck51bWJlcixcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBvcmRlci5jdXN0b21lck5hbWUsXG4gICAgICAgIGN1c3RvbWVyUGhvbmU6IG9yZGVyLnBob25lLFxuICAgICAgICBpdGVtczogb3JkZXIuaXRlbXMubWFwKChpdDogYW55KSA9PiAoe1xuICAgICAgICAgIHByb2R1Y3ROYW1lOiBpdC5wcm9kdWN0TmFtZSxcbiAgICAgICAgICBxdWFudGl0eTogaXQucXVhbnRpdHksXG4gICAgICAgIH0pKSxcbiAgICAgICAgdG90YWw6IG9yZGVyLnRvdGFsLFxuICAgICAgICBwYXltZW50U3RhdHVzOiBvcmRlci5wYXltZW50U3RhdHVzLFxuICAgICAgICBwYXltZW50TWV0aG9kOiBvcmRlci5wYXltZW50TWV0aG9kLFxuICAgICAgfSxcbiAgICAgIHNldHRpbmdzPy5zdXBwb3J0UGhvbmUsXG4gICAgICBvcmRlci5pZCxcbiAgICApXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tzbXNdIG9yZGVyIG5vdGlmaWNhdGlvbiBlcnJvcjonLCBlPy5tZXNzYWdlKVxuICB9XG5cbiAgLy8gRm9yIFdoYXRzQXBwIG9yZGVycywgcmV0dXJuIHRoZSBvcmRlciBudW1iZXIgc28gdGhlIGNsaWVudCBjYW4gY29tcG9zZSBhXG4gIC8vIFdoYXRzQXBwIG1lc3NhZ2UuIE5vIHBheW1lbnQgaW5pdGlhbGl6YXRpb24gbmVlZGVkLlxuICBpZiAoZGF0YS5wYXltZW50TWV0aG9kID09PSAnV0hBVFNBUFAnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiB0cnVlLFxuICAgICAgb3JkZXJOdW1iZXI6IG9yZGVyLm9yZGVyTnVtYmVyLFxuICAgICAgcmVmZXJlbmNlLFxuICAgICAgdG90YWwsXG4gICAgfVxuICB9XG5cbiAgLy8gRm9yIFBheXN0YWNrOiBpbml0aWFsaXplIHRyYW5zYWN0aW9uXG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYCR7cHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnfS9jaGVja291dC92ZXJpZnk/b3JkZXI9JHtvcmRlci5vcmRlck51bWJlcn1gXG4gIGNvbnN0IGluaXQgPSBhd2FpdCBpbml0aWFsaXplUGF5c3RhY2tUcmFuc2FjdGlvbih7XG4gICAgZW1haWw6IGRhdGEuZW1haWwsXG4gICAgYW1vdW50OiB0b3RhbCxcbiAgICByZWZlcmVuY2UsXG4gICAgY2FsbGJhY2tfdXJsOiBjYWxsYmFja1VybCxcbiAgICBtZXRhZGF0YToge1xuICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkLFxuICAgICAgb3JkZXJfbnVtYmVyOiBvcmRlci5vcmRlck51bWJlcixcbiAgICAgIGN1c3RvbWVyX25hbWU6IGRhdGEuY3VzdG9tZXJOYW1lLFxuICAgICAgY3VzdG9tX2ZpZWxkczogW1xuICAgICAgICB7IGRpc3BsYXlfbmFtZTogJ09yZGVyIE51bWJlcicsIHZhcmlhYmxlX25hbWU6ICdvcmRlcl9udW1iZXInLCB2YWx1ZTogb3JkZXIub3JkZXJOdW1iZXIgfSxcbiAgICAgICAgeyBkaXNwbGF5X25hbWU6ICdJdGVtcycsIHZhcmlhYmxlX25hbWU6ICdpdGVtcycsIHZhbHVlOiBgJHtvcmRlckl0ZW1zRGF0YS5sZW5ndGh9IGl0ZW0ocylgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0pXG5cbiAgaWYgKCFpbml0LnN0YXR1cykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGluaXQubWVzc2FnZSB8fCAnQ291bGQgbm90IGluaXRpYWxpc2UgcGF5bWVudC4nIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgb3JkZXJOdW1iZXI6IG9yZGVyLm9yZGVyTnVtYmVyLFxuICAgIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCxcbiAgICByZWZlcmVuY2UsXG4gICAgdG90YWwsXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBQQVlNRU5UIFZFUklGSUNBVElPTiAoY2FsbGVkIGZyb20gL2NoZWNrb3V0L3ZlcmlmeSlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBWZXJpZnlSZXN1bHQgPVxuICB8IHsgb2s6IHRydWU7IG9yZGVyTnVtYmVyOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyB0b3RhbDogbnVtYmVyIH1cbiAgfCB7IG9rOiBmYWxzZTsgZXJyb3I6IHN0cmluZyB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlQYXltZW50KHJlZmVyZW5jZTogc3RyaW5nKTogUHJvbWlzZTxWZXJpZnlSZXN1bHQ+IHtcbiAgaWYgKCFyZWZlcmVuY2UpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNaXNzaW5nIHBheW1lbnQgcmVmZXJlbmNlLicgfVxuXG4gIGNvbnN0IHBheW1lbnQgPSBhd2FpdCBkYi5wYXltZW50LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHJlZmVyZW5jZSB9LFxuICAgIGluY2x1ZGU6IHsgb3JkZXI6IHsgaW5jbHVkZTogeyBpdGVtczogdHJ1ZSB9IH0gfSxcbiAgfSlcbiAgaWYgKCFwYXltZW50KSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGF5bWVudCBub3QgZm91bmQuJyB9XG5cbiAgaWYgKHBheW1lbnQudmVyaWZpZWQpIHtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgb3JkZXJOdW1iZXI6IHBheW1lbnQub3JkZXIub3JkZXJOdW1iZXIsIHN0YXR1czogcGF5bWVudC5vcmRlci5zdGF0dXMsIHRvdGFsOiBwYXltZW50Lm9yZGVyLnRvdGFsIH1cbiAgfVxuXG4gIGNvbnN0IHZlcmlmeVJlc3AgPSBhd2FpdCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uKHJlZmVyZW5jZSlcbiAgaWYgKCF2ZXJpZnlSZXNwIHx8ICF2ZXJpZnlSZXNwLnN0YXR1cykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdQYXltZW50IHZlcmlmaWNhdGlvbiBmYWlsZWQuJyB9XG4gIH1cblxuICBjb25zdCBpc01vY2sgPSBwcm9jZXNzLmVudi5QQVlTVEFDS19TRUNSRVRfS0VZID09PSAnc2tfdGVzdF94JyB8fCAhcHJvY2Vzcy5lbnYuUEFZU1RBQ0tfU0VDUkVUX0tFWVxuICBjb25zdCBwYWlkQW1vdW50ID0gdmVyaWZ5UmVzcC5kYXRhLmFtb3VudCAvIDEwMCAvLyBrb2JvIOKGkiBuYWlyYVxuXG4gIC8vIFZlcmlmeSBhbW91bnQgbWF0Y2hlcyAoc2tpcCBmb3IgbW9jaylcbiAgaWYgKCFpc01vY2sgJiYgTWF0aC5hYnMocGFpZEFtb3VudCAtIHBheW1lbnQuYW1vdW50KSA+IDEpIHtcbiAgICBhd2FpdCBkYi5wYXltZW50LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGF5bWVudC5pZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBzdGF0dXM6ICdGQUlMRUQnLFxuICAgICAgICByYXdSZXNwb25zZTogSlNPTi5zdHJpbmdpZnkodmVyaWZ5UmVzcCksXG4gICAgICB9LFxuICAgIH0pXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1BheW1lbnQgYW1vdW50IG1pc21hdGNoLicgfVxuICB9XG5cbiAgaWYgKHZlcmlmeVJlc3AuZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyAmJiAhaXNNb2NrKSB7XG4gICAgYXdhaXQgZGIucGF5bWVudC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHBheW1lbnQuaWQgfSxcbiAgICAgIGRhdGE6IHsgc3RhdHVzOiAnRkFJTEVEJywgcmF3UmVzcG9uc2U6IEpTT04uc3RyaW5naWZ5KHZlcmlmeVJlc3ApIH0sXG4gICAgfSlcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGF5bWVudCB3YXMgbm90IHN1Y2Nlc3NmdWwuJyB9XG4gIH1cblxuICAvLyBNYXJrIHBheW1lbnQgdmVyaWZpZWQg4oCUIFRISVMgaXMgdGhlIG9ubHkgcGxhY2UgYW4gb3JkZXIgYmVjb21lcyBwYWlkXG4gIGF3YWl0IGRiLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICBhd2FpdCB0eC5wYXltZW50LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGF5bWVudC5pZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBzdGF0dXM6ICdTVUNDRVNTJyxcbiAgICAgICAgdmVyaWZpZWQ6IHRydWUsXG4gICAgICAgIHBhaWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgcmF3UmVzcG9uc2U6IEpTT04uc3RyaW5naWZ5KHZlcmlmeVJlc3ApLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgYXdhaXQgdHgub3JkZXIudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXltZW50Lm9yZGVySWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3RhdHVzOiAnUEFJRCcsXG4gICAgICAgIHBheW1lbnRTdGF0dXM6ICdTVUNDRVNTJyxcbiAgICAgICAgc3RhdHVzSGlzdG9yeToge1xuICAgICAgICAgIGNyZWF0ZTogeyBzdGF0dXM6ICdQQUlEJywgbm90ZTogJ1BheW1lbnQgY29uZmlybWVkJyB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgLy8gRGVjcmVtZW50IHN0b2NrIGZvciBlYWNoIG9yZGVyIGl0ZW1cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcGF5bWVudC5vcmRlci5pdGVtcykge1xuICAgICAgaWYgKGl0ZW0udmFyaWFudElkKSB7XG4gICAgICAgIGF3YWl0IHR4LnByb2R1Y3RWYXJpYW50LnVwZGF0ZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGl0ZW0udmFyaWFudElkIH0sXG4gICAgICAgICAgZGF0YTogeyBzdG9jazogeyBkZWNyZW1lbnQ6IGl0ZW0ucXVhbnRpdHkgfSB9LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyDilIDilIAgUGF5bWVudCByZWNlaXB0IGVtYWlsIChndWFyZGVkOiBvbmx5IHJlYWNoZWQgd2hlbiBwYXltZW50IHdhcyBub3RcbiAgLy8gcHJldmlvdXNseSB2ZXJpZmllZCwgc28gZHVwbGljYXRlIHZlcmlmaWNhdGlvbnMgbmV2ZXIgZG91YmxlLXNlbmQpIOKUgOKUgFxuICB0cnkge1xuICAgIGNvbnN0IHJlY2VpcHRTZXR0aW5ncyA9IGF3YWl0IGRiLmFkbWluU2V0dGluZ3MuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAnc2luZ2xldG9uJyB9IH0pXG4gICAgYXdhaXQgc2VuZFBheW1lbnRSZWNlaXB0KFxuICAgICAgcGF5bWVudC5vcmRlciBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXIsXG4gICAgICBwYXltZW50Lm9yZGVyLml0ZW1zIGFzIHVua25vd24gYXMgRW1haWxPcmRlckl0ZW1bXSxcbiAgICAgIHsgcmVmZXJlbmNlLCBwYWlkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgIHJlY2VpcHRTZXR0aW5ncz8uc3VwcG9ydEVtYWlsID8/IHVuZGVmaW5lZCxcbiAgICApXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tlbWFpbF0gcmVjZWlwdCBmbG93IGVycm9yOicsIGU/Lm1lc3NhZ2UpXG4gIH1cblxuICByZXR1cm4geyBvazogdHJ1ZSwgb3JkZXJOdW1iZXI6IHBheW1lbnQub3JkZXIub3JkZXJOdW1iZXIsIHN0YXR1czogJ1BBSUQnLCB0b3RhbDogcGF5bWVudC5vcmRlci50b3RhbCB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVFJBQ0sgT1JERVIgKHB1YmxpYylcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJhY2tPcmRlcihvcmRlck51bWJlcjogc3RyaW5nKSB7XG4gIGlmICghb3JkZXJOdW1iZXIpIHJldHVybiBudWxsXG4gIGNvbnN0IG9yZGVyID0gYXdhaXQgZGIub3JkZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgb3JkZXJOdW1iZXI6IG9yZGVyTnVtYmVyLnRyaW0oKS50b1VwcGVyQ2FzZSgpIH0sXG4gICAgaW5jbHVkZToge1xuICAgICAgaXRlbXM6IHRydWUsXG4gICAgICBzdGF0dXNIaXN0b3J5OiB7IG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnYXNjJyB9IH0sXG4gICAgfSxcbiAgfSlcbiAgcmV0dXJuIG9yZGVyXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQURNSU46IFBST0RVQ1QgQ1JVRFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IHByb2R1Y3RTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIpLFxuICBzbHVnOiB6LnN0cmluZygpLm1pbigyKSxcbiAgZGVzY3JpcHRpb246IHouc3RyaW5nKCkubWluKDEwKSxcbiAgZmVhdHVyZXM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbWF0ZXJpYWw6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZml0OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGNhcmU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2t1OiB6LnN0cmluZygpLm1pbigyKSxcbiAgcHJpY2U6IHouY29lcmNlLm51bWJlcigpLm1pbigwKSxcbiAgc2FsZVByaWNlOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICBjb3N0UHJpY2U6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gIGNhdGVnb3J5SWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBicmFuZElkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgdGFnczogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBmZWF0dXJlZDogei5jb2VyY2UuYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIHB1Ymxpc2hlZDogei5jb2VyY2UuYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIC8vIEV4cGxpY2l0IFwiT3V0IG9mIFN0b2NrXCIgZmxhZyDigJQgaW5kZXBlbmRlbnQgb2YgdmFyaWFudCBzdG9jayBzdW1zXG4gIG91dE9mU3RvY2s6IHouY29lcmNlLmJvb2xlYW4oKS5vcHRpb25hbCgpLFxuICAvLyBPcHRpb25hbCBzdGF0dXMgb3ZlcnJpZGUg4oCUIHVzZWQgYnkgdGhlIFNlbmQtdG8tVHJhc2ggZmxvd1xuICBzdGF0dXM6IHouZW51bShbJ0FDVElWRScsICdEUkFGVCcsICdBUkNISVZFRCcsICdESVNDT05USU5VRUQnXSkub3B0aW9uYWwoKSxcbiAgLy8gUGh5c2ljYWxcbiAgd2VpZ2h0S2c6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gIGxlbmd0aENtOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICB3aWR0aENtOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICBoZWlnaHRDbTogei5jb2VyY2UubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgLy8gU2hpcHBpbmdcbiAgZnJlZVNoaXBwaW5nOiB6LmNvZXJjZS5ib29sZWFuKCkub3B0aW9uYWwoKSxcbiAgc2hpcHBpbmdDbGFzczogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAvLyBTRU9cbiAgc2VvVGl0bGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2VvRGVzY3JpcHRpb246IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2VvS2V5d29yZHM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgaW1hZ2VzOiB6LmFycmF5KHouc3RyaW5nKCkpLm1pbigxKSxcbiAgdmFyaWFudHM6IHouYXJyYXkoei5vYmplY3Qoe1xuICAgIGlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgc2l6ZTogei5zdHJpbmcoKSxcbiAgICBza3U6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBiYXJjb2RlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcHJpY2U6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gICAgc3RvY2s6IHouY29lcmNlLm51bWJlcigpLmludCgpLm1pbigwKSxcbiAgICBsb3dTdG9ja1RocmVzaG9sZDogei5jb2VyY2UubnVtYmVyKCkuaW50KCkubWluKDApLm9wdGlvbmFsKCksXG4gICAgaW1hZ2VVcmw6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICB3ZWlnaHRLZzogei5jb2VyY2UubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgfSkpLFxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluQ3JlYXRlUHJvZHVjdChpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAvLyBBdXRoICsgcGVybWlzc2lvbiBnYXRlXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbigncHJvZHVjdC5jcmVhdGUnKVxuXG4gIGNvbnN0IHBhcnNlZCA9IHByb2R1Y3RTY2hlbWEuc2FmZVBhcnNlKGlucHV0KVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgLy8gU3VyZmFjZSB0aGUgRlVMTCBsaXN0IG9mIHZhbGlkYXRpb24gZXJyb3JzIOKAlCBub3QganVzdCB0aGUgZmlyc3RcbiAgICBjb25zdCBpc3N1ZXMgPSBwYXJzZWQuZXJyb3IuaXNzdWVzLm1hcCgoaSkgPT4gYCR7aS5wYXRoLmpvaW4oJy4nKSB8fCAncm9vdCd9OiAke2kubWVzc2FnZX1gKS5qb2luKCcgwrcgJylcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgVmFsaWRhdGlvbiBmYWlsZWQ6ICR7aXNzdWVzfWAgfVxuICB9XG4gIGNvbnN0IGRhdGEgPSBwYXJzZWQuZGF0YVxuICB0cnkge1xuICAgIC8vIFByZS1jaGVjayBmb3IgU0tVIHVuaXF1ZW5lc3Mg4oCUIGZhaWwgd2l0aCBhIGNsZWFyIG1lc3NhZ2UgaW5zdGVhZCBvZiBhIFByaXNtYSBlcnJvclxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZGIucHJvZHVjdC5maW5kVW5pcXVlKHsgd2hlcmU6IHsgc2t1OiBkYXRhLnNrdSB9LCBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUgfSB9KVxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYEEgcHJvZHVjdCB3aXRoIFNLVSBcIiR7ZGF0YS5za3V9XCIgYWxyZWFkeSBleGlzdHMgKCR7ZXhpc3RpbmcubmFtZX0pLiBVc2UgYSBkaWZmZXJlbnQgU0tVLmAgfVxuICAgIH1cbiAgICBjb25zdCBleGlzdGluZ1NsdWcgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRVbmlxdWUoeyB3aGVyZTogeyBzbHVnOiBkYXRhLnNsdWcgfSwgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlIH0gfSlcbiAgICBpZiAoZXhpc3RpbmdTbHVnKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgQSBwcm9kdWN0IHdpdGggc2x1ZyBcIiR7ZGF0YS5zbHVnfVwiIGFscmVhZHkgZXhpc3RzICgke2V4aXN0aW5nU2x1Zy5uYW1lfSkuIENoYW5nZSB0aGUgc2x1Zy5gIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVkID0gYXdhaXQgZGIucHJvZHVjdC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIHNsdWc6IGRhdGEuc2x1ZyxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgIGZlYXR1cmVzOiBkYXRhLmZlYXR1cmVzLFxuICAgICAgICBtYXRlcmlhbDogZGF0YS5tYXRlcmlhbCxcbiAgICAgICAgZml0OiBkYXRhLmZpdCxcbiAgICAgICAgY2FyZTogZGF0YS5jYXJlLFxuICAgICAgICBza3U6IGRhdGEuc2t1LFxuICAgICAgICBwcmljZTogZGF0YS5wcmljZSxcbiAgICAgICAgc2FsZVByaWNlOiBkYXRhLnNhbGVQcmljZSxcbiAgICAgICAgY29zdFByaWNlOiBkYXRhLmNvc3RQcmljZSxcbiAgICAgICAgY2F0ZWdvcnlJZDogZGF0YS5jYXRlZ29yeUlkLFxuICAgICAgICBicmFuZElkOiBkYXRhLmJyYW5kSWQgfHwgbnVsbCxcbiAgICAgICAgdGFnczogZGF0YS50YWdzLFxuICAgICAgICBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCA/PyBmYWxzZSxcbiAgICAgICAgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCA/PyB0cnVlLFxuICAgICAgICBvdXRPZlN0b2NrOiBkYXRhLm91dE9mU3RvY2sgPz8gZmFsc2UsXG4gICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMgPz8gJ0FDVElWRScsXG4gICAgICAgIHdlaWdodEtnOiBkYXRhLndlaWdodEtnLFxuICAgICAgICBsZW5ndGhDbTogZGF0YS5sZW5ndGhDbSxcbiAgICAgICAgd2lkdGhDbTogZGF0YS53aWR0aENtLFxuICAgICAgICBoZWlnaHRDbTogZGF0YS5oZWlnaHRDbSxcbiAgICAgICAgZnJlZVNoaXBwaW5nOiBkYXRhLmZyZWVTaGlwcGluZyxcbiAgICAgICAgc2hpcHBpbmdDbGFzczogZGF0YS5zaGlwcGluZ0NsYXNzLFxuICAgICAgICBzZW9UaXRsZTogZGF0YS5zZW9UaXRsZSxcbiAgICAgICAgc2VvRGVzY3JpcHRpb246IGRhdGEuc2VvRGVzY3JpcHRpb24sXG4gICAgICAgIHNlb0tleXdvcmRzOiBkYXRhLnNlb0tleXdvcmRzLFxuICAgICAgICBpbWFnZXM6IHtcbiAgICAgICAgICBjcmVhdGU6IGRhdGEuaW1hZ2VzLm1hcCgodXJsLCBpKSA9PiAoeyB1cmwsIGFsdFRleHQ6IGRhdGEubmFtZSwgcG9zaXRpb246IGkgfSkpLFxuICAgICAgICB9LFxuICAgICAgICB2YXJpYW50czoge1xuICAgICAgICAgIGNyZWF0ZTogZGF0YS52YXJpYW50cy5tYXAoKHYpID0+ICh7XG4gICAgICAgICAgICBzaXplOiB2LnNpemUsXG4gICAgICAgICAgICBza3U6IHYuc2t1ID8/IGAke2RhdGEuc2t1fS0ke3Yuc2l6ZX1gLFxuICAgICAgICAgICAgYmFyY29kZTogdi5iYXJjb2RlLFxuICAgICAgICAgICAgcHJpY2U6IHYucHJpY2UsXG4gICAgICAgICAgICBzdG9jazogdi5zdG9jayxcbiAgICAgICAgICAgIGxvd1N0b2NrVGhyZXNob2xkOiB2Lmxvd1N0b2NrVGhyZXNob2xkID8/IDUsXG4gICAgICAgICAgICBpbWFnZVVybDogdi5pbWFnZVVybCxcbiAgICAgICAgICAgIHdlaWdodEtnOiB2LndlaWdodEtnLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7IGltYWdlczogdHJ1ZSwgdmFyaWFudHM6IHRydWUgfSxcbiAgICB9KVxuXG4gICAgLy8gQXVkaXQgbG9nXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3Byb2R1Y3QuY3JlYXRlJyxcbiAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgIGVudGl0eUlkOiBjcmVhdGVkLmlkLFxuICAgICAgYWZ0ZXI6IHsgbmFtZTogY3JlYXRlZC5uYW1lLCBzbHVnOiBjcmVhdGVkLnNsdWcsIHNrdTogY3JlYXRlZC5za3UsIHByaWNlOiBjcmVhdGVkLnByaWNlLCBzYWxlUHJpY2U6IGNyZWF0ZWQuc2FsZVByaWNlIH0sXG4gICAgICBkZXNjcmlwdGlvbjogYENyZWF0ZWQgcHJvZHVjdCBcIiR7Y3JlYXRlZC5uYW1lfVwiIChTS1UgJHtjcmVhdGVkLnNrdX0sIOKCpiR7Y3JlYXRlZC5wcmljZS50b0xvY2FsZVN0cmluZygpfSlgLFxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlLCBpZDogY3JlYXRlZC5pZCB9XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIC8vIFVud3JhcCBQcmlzbWEgZXJyb3JzIHRvIGJlIHVzZWZ1bCB0byB0aGUgYWRtaW5cbiAgICBsZXQgbXNnID0gZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IGNyZWF0ZSBwcm9kdWN0J1xuICAgIGlmIChlPy5jb2RlID09PSAnUDIwMDInKSB7XG4gICAgICBtc2cgPSBgVW5pcXVlIGNvbnN0cmFpbnQgZmFpbGVkIG9uICR7KGU/Lm1ldGE/LnRhcmdldCBhcyBzdHJpbmdbXSk/LmpvaW4oJywgJykgPz8gJ3Vua25vd24gZmllbGQnfS4gVGhpcyB2YWx1ZSBhbHJlYWR5IGV4aXN0cy5gXG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IG1zZyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluVXBkYXRlUHJvZHVjdChpZDogc3RyaW5nLCBpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAvLyBBdXRoICsgcGVybWlzc2lvbiBnYXRlXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbigncHJvZHVjdC51cGRhdGUnKVxuXG4gIGNvbnN0IHBhcnNlZCA9IHByb2R1Y3RTY2hlbWEuc2FmZVBhcnNlKGlucHV0KVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgY29uc3QgaXNzdWVzID0gcGFyc2VkLmVycm9yLmlzc3Vlcy5tYXAoKGkpID0+IGAke2kucGF0aC5qb2luKCcuJykgfHwgJ3Jvb3QnfTogJHtpLm1lc3NhZ2V9YCkuam9pbignIMK3ICcpXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYFZhbGlkYXRpb24gZmFpbGVkOiAke2lzc3Vlc31gIH1cbiAgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcbiAgdHJ5IHtcbiAgICAvLyBGZXRjaCBleGlzdGluZyBmb3IgYXVkaXQgZGlmZlxuICAgIGNvbnN0IGJlZm9yZSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgaW5jbHVkZTogeyBpbWFnZXM6IHRydWUsIHZhcmlhbnRzOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoIWJlZm9yZSkge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Byb2R1Y3Qgbm90IGZvdW5kJyB9XG4gICAgfVxuXG4gICAgLy8gUHJlLWNoZWNrIGZvciBTS1UgdW5pcXVlbmVzcyDigJQgbWFrZSBzdXJlIHdlJ3JlIG5vdCBjb2xsaWRpbmcgd2l0aCBhbm90aGVyIHByb2R1Y3RcbiAgICBpZiAoZGF0YS5za3UgIT09IGJlZm9yZS5za3UpIHtcbiAgICAgIGNvbnN0IHNrdUNvbGxpc2lvbiA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IHNrdTogZGF0YS5za3UgfSwgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlIH0gfSlcbiAgICAgIGlmIChza3VDb2xsaXNpb24gJiYgc2t1Q29sbGlzaW9uLmlkICE9PSBpZCkge1xuICAgICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgQSBkaWZmZXJlbnQgcHJvZHVjdCAoJHtza3VDb2xsaXNpb24ubmFtZX0pIGFscmVhZHkgdXNlcyBTS1UgXCIke2RhdGEuc2t1fVwiLmAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YS5zbHVnICE9PSBiZWZvcmUuc2x1Zykge1xuICAgICAgY29uc3Qgc2x1Z0NvbGxpc2lvbiA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IHNsdWc6IGRhdGEuc2x1ZyB9LCBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUgfSB9KVxuICAgICAgaWYgKHNsdWdDb2xsaXNpb24gJiYgc2x1Z0NvbGxpc2lvbi5pZCAhPT0gaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYEEgZGlmZmVyZW50IHByb2R1Y3QgKCR7c2x1Z0NvbGxpc2lvbi5uYW1lfSkgYWxyZWFkeSB1c2VzIHNsdWcgXCIke2RhdGEuc2x1Z31cIi5gIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBhd2FpdCB0eC5wcm9kdWN0LnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgc2x1ZzogZGF0YS5zbHVnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGZlYXR1cmVzOiBkYXRhLmZlYXR1cmVzLFxuICAgICAgICAgIG1hdGVyaWFsOiBkYXRhLm1hdGVyaWFsLFxuICAgICAgICAgIGZpdDogZGF0YS5maXQsXG4gICAgICAgICAgY2FyZTogZGF0YS5jYXJlLFxuICAgICAgICAgIHNrdTogZGF0YS5za3UsXG4gICAgICAgICAgcHJpY2U6IGRhdGEucHJpY2UsXG4gICAgICAgICAgc2FsZVByaWNlOiBkYXRhLnNhbGVQcmljZSxcbiAgICAgICAgICBjb3N0UHJpY2U6IGRhdGEuY29zdFByaWNlLFxuICAgICAgICAgIGNhdGVnb3J5SWQ6IGRhdGEuY2F0ZWdvcnlJZCxcbiAgICAgICAgICBicmFuZElkOiBkYXRhLmJyYW5kSWQgfHwgbnVsbCxcbiAgICAgICAgICB0YWdzOiBkYXRhLnRhZ3MsXG4gICAgICAgICAgZmVhdHVyZWQ6IGRhdGEuZmVhdHVyZWQgPz8gZmFsc2UsXG4gICAgICAgICAgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCA/PyB0cnVlLFxuICAgICAgICAgIG91dE9mU3RvY2s6IGRhdGEub3V0T2ZTdG9jayA/PyBmYWxzZSxcbiAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSBzdGF0dXMgaWYgZXhwbGljaXRseSBwcm92aWRlZCAoZS5nLiBTZW5kLXRvLVRyYXNoIGZsb3cpXG4gICAgICAgICAgLi4uKGRhdGEuc3RhdHVzID8geyBzdGF0dXM6IGRhdGEuc3RhdHVzIH0gOiB7fSksXG4gICAgICAgICAgd2VpZ2h0S2c6IGRhdGEud2VpZ2h0S2csXG4gICAgICAgICAgbGVuZ3RoQ206IGRhdGEubGVuZ3RoQ20sXG4gICAgICAgICAgd2lkdGhDbTogZGF0YS53aWR0aENtLFxuICAgICAgICAgIGhlaWdodENtOiBkYXRhLmhlaWdodENtLFxuICAgICAgICAgIGZyZWVTaGlwcGluZzogZGF0YS5mcmVlU2hpcHBpbmcsXG4gICAgICAgICAgc2hpcHBpbmdDbGFzczogZGF0YS5zaGlwcGluZ0NsYXNzLFxuICAgICAgICAgIHNlb1RpdGxlOiBkYXRhLnNlb1RpdGxlLFxuICAgICAgICAgIHNlb0Rlc2NyaXB0aW9uOiBkYXRhLnNlb0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHNlb0tleXdvcmRzOiBkYXRhLnNlb0tleXdvcmRzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC8vIFJlcGxhY2UgaW1hZ2VzXG4gICAgICBhd2FpdCB0eC5wcm9kdWN0SW1hZ2UuZGVsZXRlTWFueSh7IHdoZXJlOiB7IHByb2R1Y3RJZDogaWQgfSB9KVxuICAgICAgYXdhaXQgdHgucHJvZHVjdEltYWdlLmNyZWF0ZU1hbnkoe1xuICAgICAgICBkYXRhOiBkYXRhLmltYWdlcy5tYXAoKHVybCwgaSkgPT4gKHsgdXJsLCBhbHRUZXh0OiBkYXRhLm5hbWUsIHBvc2l0aW9uOiBpLCBwcm9kdWN0SWQ6IGlkIH0pKSxcbiAgICAgIH0pXG4gICAgICAvLyBSZXBsYWNlIHZhcmlhbnRzIChzaW1wbGUgYXBwcm9hY2gg4oCUIGNvdWxkIGJlIGltcHJvdmVkIGZvciBkaWZmaW5nKVxuICAgICAgYXdhaXQgdHgucHJvZHVjdFZhcmlhbnQuZGVsZXRlTWFueSh7IHdoZXJlOiB7IHByb2R1Y3RJZDogaWQgfSB9KVxuICAgICAgYXdhaXQgdHgucHJvZHVjdFZhcmlhbnQuY3JlYXRlTWFueSh7XG4gICAgICAgIGRhdGE6IGRhdGEudmFyaWFudHMubWFwKCh2KSA9PiAoe1xuICAgICAgICAgIHByb2R1Y3RJZDogaWQsXG4gICAgICAgICAgc2l6ZTogdi5zaXplLFxuICAgICAgICAgIHNrdTogdi5za3UgPz8gYCR7ZGF0YS5za3V9LSR7di5zaXplfWAsXG4gICAgICAgICAgYmFyY29kZTogdi5iYXJjb2RlLFxuICAgICAgICAgIHByaWNlOiB2LnByaWNlLFxuICAgICAgICAgIHN0b2NrOiB2LnN0b2NrLFxuICAgICAgICAgIGxvd1N0b2NrVGhyZXNob2xkOiB2Lmxvd1N0b2NrVGhyZXNob2xkID8/IDUsXG4gICAgICAgICAgaW1hZ2VVcmw6IHYuaW1hZ2VVcmwsXG4gICAgICAgICAgd2VpZ2h0S2c6IHYud2VpZ2h0S2csXG4gICAgICAgIH0pKSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIEF1ZGl0IGxvZ1xuICAgIGlmIChiZWZvcmUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmQ2hhbmdlZEZpZWxkcyhcbiAgICAgICAgeyBuYW1lOiBiZWZvcmUubmFtZSwgcHJpY2U6IGJlZm9yZS5wcmljZSwgc2FsZVByaWNlOiBiZWZvcmUuc2FsZVByaWNlLCBmZWF0dXJlZDogYmVmb3JlLmZlYXR1cmVkLCBwdWJsaXNoZWQ6IGJlZm9yZS5wdWJsaXNoZWQsIHNrdTogYmVmb3JlLnNrdSwgb3V0T2ZTdG9jazogYmVmb3JlLm91dE9mU3RvY2sgfSxcbiAgICAgICAgeyBuYW1lOiBkYXRhLm5hbWUsIHByaWNlOiBkYXRhLnByaWNlLCBzYWxlUHJpY2U6IGRhdGEuc2FsZVByaWNlLCBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCwgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCwgc2t1OiBkYXRhLnNrdSwgb3V0T2ZTdG9jazogZGF0YS5vdXRPZlN0b2NrIH0sXG4gICAgICApXG4gICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmtleXMoY2hhbmdlcykubGVuZ3RoID4gMFxuICAgICAgICA/IGBVcGRhdGVkIHByb2R1Y3QgXCIke2RhdGEubmFtZX1cIiDigJQgJHtkZXNjcmliZUNoYW5nZXMoY2hhbmdlcywgeyBuYW1lOiAnbmFtZScsIHByaWNlOiAncHJpY2UnLCBzYWxlUHJpY2U6ICdzYWxlUHJpY2UnLCBmZWF0dXJlZDogJ2ZlYXR1cmVkJywgcHVibGlzaGVkOiAncHVibGlzaGVkJywgc2t1OiAnU0tVJywgb3V0T2ZTdG9jazogJ291dE9mU3RvY2snIH0pfWBcbiAgICAgICAgOiBgVXBkYXRlZCBwcm9kdWN0IFwiJHtkYXRhLm5hbWV9XCIgKGltYWdlcy92YXJpYW50cyByZWZyZXNoZWQpYFxuICAgICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgICBhY3RvcklkOiB1c2VyLmlkLFxuICAgICAgICBhY3Rpb246ICdwcm9kdWN0LnVwZGF0ZScsXG4gICAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgICAgZW50aXR5SWQ6IGlkLFxuICAgICAgICBiZWZvcmU6IHsgbmFtZTogYmVmb3JlLm5hbWUsIHNrdTogYmVmb3JlLnNrdSwgcHJpY2U6IGJlZm9yZS5wcmljZSB9LFxuICAgICAgICBhZnRlcjogeyBuYW1lOiBkYXRhLm5hbWUsIHNrdTogZGF0YS5za3UsIHByaWNlOiBkYXRhLnByaWNlIH0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldmFsaWRhdGVQYXRoKGAvcHJvZHVjdC8ke2RhdGEuc2x1Z31gKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgbGV0IG1zZyA9IGU/Lm1lc3NhZ2UgPz8gJ0NvdWxkIG5vdCB1cGRhdGUgcHJvZHVjdCdcbiAgICBpZiAoZT8uY29kZSA9PT0gJ1AyMDAyJykge1xuICAgICAgbXNnID0gYFVuaXF1ZSBjb25zdHJhaW50IGZhaWxlZCBvbiAkeyhlPy5tZXRhPy50YXJnZXQgYXMgc3RyaW5nW10pPy5qb2luKCcsICcpID8/ICd1bmtub3duIGZpZWxkJ30uIFRoaXMgdmFsdWUgYWxyZWFkeSBleGlzdHMuYFxuICAgIH1cbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBtc2cgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkRlbGV0ZVByb2R1Y3QoaWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVN0YWZmV2l0aFBlcm1pc3Npb24oJ3Byb2R1Y3QuZGVsZXRlJylcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQgfSwgc2VsZWN0OiB7IG5hbWU6IHRydWUsIHNrdTogdHJ1ZSwgc2x1ZzogdHJ1ZSB9IH0pXG4gICAgaWYgKCFwcm9kdWN0KSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUHJvZHVjdCBub3QgZm91bmQnIH1cblxuICAgIGF3YWl0IGRiLnByb2R1Y3QuZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KVxuXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3Byb2R1Y3QuZGVsZXRlJyxcbiAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgIGVudGl0eUlkOiBpZCxcbiAgICAgIGJlZm9yZTogcHJvZHVjdCxcbiAgICAgIGRlc2NyaXB0aW9uOiBgRGVsZXRlZCBwcm9kdWN0IFwiJHtwcm9kdWN0Lm5hbWV9XCIgKFNLVSAke3Byb2R1Y3Quc2t1fSlgLFxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBRE1JTjogT1JERVIgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pblVwZGF0ZU9yZGVyU3RhdHVzKG9yZGVySWQ6IHN0cmluZywgc3RhdHVzOiBhbnksIG5vdGU/OiBzdHJpbmcsIHRyYWNraW5nTnVtYmVyPzogc3RyaW5nLCB0cmFja2luZ1VybD86IHN0cmluZykge1xuICAvLyBQZXJtaXNzaW9uOiBjYW5jZWwvcmVmdW5kIGhhdmUgc3RyaWN0ZXIgcmVxdWlyZW1lbnRzIHRoYW4gc3RhdHVzIHVwZGF0ZVxuICBjb25zdCBwZXJtQ29kZSA9IHN0YXR1cyA9PT0gJ0NBTkNFTExFRCcgfHwgc3RhdHVzID09PSAnUkVGVU5ERUQnIHx8IHN0YXR1cyA9PT0gJ1BBUlRJQUxMWV9SRUZVTkRFRCdcbiAgICA/ICdvcmRlci5yZWZ1bmQnXG4gICAgOiAnb3JkZXIudXBkYXRlX3N0YXR1cydcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVTdGFmZldpdGhQZXJtaXNzaW9uKHBlcm1Db2RlKVxuXG4gIHRyeSB7XG4gICAgY29uc3QgYmVmb3JlID0gYXdhaXQgZGIub3JkZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogb3JkZXJJZCB9LFxuICAgICAgc2VsZWN0OiB7IG9yZGVyTnVtYmVyOiB0cnVlLCBzdGF0dXM6IHRydWUsIHRyYWNraW5nTnVtYmVyOiB0cnVlLCBjdXN0b21lck5hbWU6IHRydWUgfSxcbiAgICB9KVxuICAgIGlmICghYmVmb3JlKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnT3JkZXIgbm90IGZvdW5kJyB9XG5cbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBhd2FpdCB0eC5vcmRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogb3JkZXJJZCB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgIC4uLih0cmFja2luZ051bWJlciAhPT0gdW5kZWZpbmVkID8geyB0cmFja2luZ051bWJlciB9IDoge30pLFxuICAgICAgICAgIC4uLih0cmFja2luZ1VybCAhPT0gdW5kZWZpbmVkID8geyB0cmFja2luZ1VybCB9IDoge30pLFxuICAgICAgICAgIC8vIFNldCB0aW1lc3RhbXBzIGZvciBzaGlwcGVkL2RlbGl2ZXJlZC9jYW5jZWxsZWRcbiAgICAgICAgICAuLi4oc3RhdHVzID09PSAnU0hJUFBFRCcgPyB7IHNoaXBwZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIC4uLihzdGF0dXMgPT09ICdERUxJVkVSRUQnID8geyBkZWxpdmVyZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIC4uLihzdGF0dXMgPT09ICdDQU5DRUxMRUQnID8geyBjYW5jZWxsZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIHN0YXR1c0hpc3Rvcnk6IHsgY3JlYXRlOiB7IHN0YXR1cywgbm90ZSB9IH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBhd2FpdCBhdWRpdExvZyh7XG4gICAgICBhY3RvcklkOiB1c2VyLmlkLFxuICAgICAgYWN0aW9uOiAnb3JkZXIudXBkYXRlX3N0YXR1cycsXG4gICAgICBlbnRpdHlUeXBlOiAnT3JkZXInLFxuICAgICAgZW50aXR5SWQ6IG9yZGVySWQsXG4gICAgICBiZWZvcmU6IHsgc3RhdHVzOiBiZWZvcmUuc3RhdHVzLCB0cmFja2luZ051bWJlcjogYmVmb3JlLnRyYWNraW5nTnVtYmVyIH0sXG4gICAgICBhZnRlcjogeyBzdGF0dXMsIHRyYWNraW5nTnVtYmVyLCBub3RlIH0sXG4gICAgICBkZXNjcmlwdGlvbjogYFVwZGF0ZWQgb3JkZXIgJHtiZWZvcmUub3JkZXJOdW1iZXJ9IHN0YXR1czogJHtiZWZvcmUuc3RhdHVzfSDihpIgJHtzdGF0dXN9JHtub3RlID8gYCAoJHtub3RlfSlgIDogJyd9YCxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9vcmRlcnMnKVxuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vb3JkZXJzLyR7b3JkZXJJZH1gKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBRE1JTjogU0VUVElOR1Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5VcGRhdGVTZXR0aW5ncyhpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVN0YWZmV2l0aFBlcm1pc3Npb24oJ3NldHRpbmdzLm1hbmFnZScpXG4gIHRyeSB7XG4gICAgY29uc3QgYmVmb3JlID0gYXdhaXQgZGIuYWRtaW5TZXR0aW5ncy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgICBhd2FpdCBkYi5hZG1pblNldHRpbmdzLnVwc2VydCh7XG4gICAgICB3aGVyZTogeyBpZDogJ3NpbmdsZXRvbicgfSxcbiAgICAgIHVwZGF0ZTogaW5wdXQsXG4gICAgICBjcmVhdGU6IHsgaWQ6ICdzaW5nbGV0b24nLCAuLi5pbnB1dCB9LFxuICAgIH0pXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3NldHRpbmdzLnVwZGF0ZScsXG4gICAgICBlbnRpdHlUeXBlOiAnQWRtaW5TZXR0aW5ncycsXG4gICAgICBlbnRpdHlJZDogJ3NpbmdsZXRvbicsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcjogaW5wdXQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZWQgc3RvcmUgc2V0dGluZ3MnLFxuICAgIH0pXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXR0aW5ncycpXG4gICAgcmV0dXJuIHsgb2s6IHRydWUgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5VcGRhdGVIb21lcGFnZUNvbnRlbnQoaW5wdXQ6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVTdGFmZldpdGhQZXJtaXNzaW9uKCdjbXMubWFuYWdlJylcbiAgdHJ5IHtcbiAgICBjb25zdCBiZWZvcmUgPSBhd2FpdCBkYi5ob21lcGFnZUNvbnRlbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAnc2luZ2xldG9uJyB9IH0pXG4gICAgYXdhaXQgZGIuaG9tZXBhZ2VDb250ZW50LnVwc2VydCh7XG4gICAgICB3aGVyZTogeyBpZDogJ3NpbmdsZXRvbicgfSxcbiAgICAgIHVwZGF0ZTogaW5wdXQsXG4gICAgICBjcmVhdGU6IHsgaWQ6ICdzaW5nbGV0b24nLCAuLi5pbnB1dCB9LFxuICAgIH0pXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ2Ntcy51cGRhdGUnLFxuICAgICAgZW50aXR5VHlwZTogJ0hvbWVwYWdlQ29udGVudCcsXG4gICAgICBlbnRpdHlJZDogJ3NpbmdsZXRvbicsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcjogaW5wdXQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZWQgaG9tZXBhZ2UgY29udGVudCcsXG4gICAgfSlcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpXG4gICAgcmV0dXJuIHsgb2s6IHRydWUgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlIH1cbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFVVEg6IFJFR0lTVEVSIC8gUkVTRVRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlU3RvcmVOb3RpZmljYXRpb24oaW5wdXQ6IHsgdHlwZTogJ05FV19DVVNUT01FUicgfCAnU1lTVEVNJzsgdGl0bGU6IHN0cmluZzsgYm9keT86IHN0cmluZzsgbGluaz86IHN0cmluZyB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RhZmYgPSBhd2FpdCBkYi51c2VyLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHJvbGU6IHsgbm90OiAnQ1VTVE9NRVInIH0sIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoIXN0YWZmLmxlbmd0aCkgcmV0dXJuXG4gICAgYXdhaXQgZGIubm90aWZpY2F0aW9uLmNyZWF0ZU1hbnkoe1xuICAgICAgZGF0YTogc3RhZmYubWFwKChzKSA9PiAoe1xuICAgICAgICByZWNpcGllbnRJZDogcy5pZCxcbiAgICAgICAgdHlwZTogaW5wdXQudHlwZSxcbiAgICAgICAgdGl0bGU6IGlucHV0LnRpdGxlLFxuICAgICAgICBib2R5OiBpbnB1dC5ib2R5LFxuICAgICAgICBsaW5rOiBpbnB1dC5saW5rLFxuICAgICAgfSkpLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbY3JlYXRlU3RvcmVOb3RpZmljYXRpb25dIGZhaWxlZDonLCBlKVxuICB9XG59XG5cblxuY29uc3QgcmVnaXN0ZXJTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIpLFxuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgpLFxuICBwYXNzd29yZDogei5zdHJpbmcoKS5taW4oNiksXG4gIHBob25lOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICAvLyBBYnVzZSB0aHJvdHRsZTogbWF4IDUgcmVnaXN0cmF0aW9ucyBwZXIgaG91ciBwZXIgSVAgKDFoIGxvY2tvdXQgYWZ0ZXIpLlxuICBjb25zdCBybCA9IHJhdGVMaW1pdChgcmVnaXN0ZXI6JHtjbGllbnRJcEZyb21IZWFkZXJzKGF3YWl0IGhlYWRlcnMoKSl9YCwge1xuICAgIGxpbWl0OiA1LFxuICAgIHdpbmRvd01zOiA2MCAqIDYwICogMTAwMCxcbiAgICBibG9ja01zOiA2MCAqIDYwICogMTAwMCxcbiAgfSlcbiAgaWYgKCFybC5vaykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdUb28gbWFueSBzaWduLXVwIGF0dGVtcHRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicgfVxuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gcmVnaXN0ZXJTY2hlbWEuc2FmZVBhcnNlKE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpKVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogcGFyc2VkLmVycm9yLmlzc3Vlc1swXT8ubWVzc2FnZSA/PyAnSW52YWxpZCBpbnB1dCcgfVxuICB9XG4gIGNvbnN0IHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkLCBwaG9uZSB9ID0gcGFyc2VkLmRhdGFcbiAgY29uc3QgYmNyeXB0ID0gYXdhaXQgaW1wb3J0KCdiY3J5cHRqcycpXG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZGIudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCkgfSB9KVxuICBpZiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnQW4gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWxyZWFkeSBleGlzdHMuJyB9XG4gIH1cbiAgY29uc3QgcGFzc3dvcmRIYXNoID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKVxuICBjb25zdCBjcmVhdGVkVXNlciA9IGF3YWl0IGRiLnVzZXIuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCksXG4gICAgICBwYXNzd29yZEhhc2gsXG4gICAgICBwaG9uZSxcbiAgICAgIHJvbGU6ICdDVVNUT01FUicsXG4gICAgfSxcbiAgfSlcbiAgYXdhaXQgY3JlYXRlU3RvcmVOb3RpZmljYXRpb24oe1xuICAgIHR5cGU6ICdORVdfQ1VTVE9NRVInLFxuICAgIHRpdGxlOiAnTmV3IGN1c3RvbWVyIHJlZ2lzdGVyZWQnLFxuICAgIGJvZHk6IGAke2NyZWF0ZWRVc2VyLm5hbWUgPz8gY3JlYXRlZFVzZXIuZW1haWx9IGNyZWF0ZWQgYSBuZXcgY3VzdG9tZXIgYWNjb3VudC5gLFxuICAgIGxpbms6IGAvYWRtaW4vY3VzdG9tZXJzLyR7Y3JlYXRlZFVzZXIuaWR9YCxcbiAgfSlcbiAgcmV0dXJuIHsgb2s6IHRydWUgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFDQ09VTlQ6IEFERFJFU1MgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IGFkZHJlc3NTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGZ1bGxOYW1lOiB6LnN0cmluZygpLm1pbigyKSxcbiAgcGhvbmU6IHouc3RyaW5nKCkubWluKDcpLFxuICBzdGF0ZTogei5zdHJpbmcoKS5taW4oMiksXG4gIGNpdHk6IHouc3RyaW5nKCkubWluKDIpLFxuICBhZGRyZXNzOiB6LnN0cmluZygpLm1pbig1KSxcbiAgbGFuZG1hcms6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgaXNEZWZhdWx0OiB6LmNvZXJjZS5ib29sZWFuKCkub3B0aW9uYWwoKSxcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQWRkcmVzcyhmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90IGF1dGhlbnRpY2F0ZWQnIH1cbiAgY29uc3QgcGFyc2VkID0gYWRkcmVzc1NjaGVtYS5zYWZlUGFyc2UoT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSkpXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcbiAgY29uc3QgaWQgPSBmb3JtRGF0YS5nZXQoJ2lkJykgYXMgc3RyaW5nIHwgbnVsbFxuICB0cnkge1xuICAgIGlmIChkYXRhLmlzRGVmYXVsdCkge1xuICAgICAgYXdhaXQgZGIuYWRkcmVzcy51cGRhdGVNYW55KHtcbiAgICAgICAgd2hlcmU6IHsgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgZGF0YTogeyBpc0RlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoaWQpIHtcbiAgICAgIGF3YWl0IGRiLmFkZHJlc3MudXBkYXRlKHsgd2hlcmU6IHsgaWQgfSwgZGF0YSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBkYi5hZGRyZXNzLmNyZWF0ZSh7IGRhdGE6IHsgLi4uZGF0YSwgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQgfSB9KVxuICAgIH1cbiAgICByZXZhbGlkYXRlUGF0aCgnL2FjY291bnQvYWRkcmVzc2VzJylcbiAgICByZXR1cm4geyBvazogdHJ1ZSB9XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGU/Lm1lc3NhZ2UgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKGlkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90IGF1dGhlbnRpY2F0ZWQnIH1cbiAgYXdhaXQgZGIuYWRkcmVzcy5kZWxldGVNYW55KHsgd2hlcmU6IHsgaWQsIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkIH0gfSlcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hY2NvdW50L2FkZHJlc3NlcycpXG4gIHJldHVybiB7IG9rOiB0cnVlIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBQ0NPVU5UOiBQUk9GSUxFIE1BTkFHRU1FTlRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBwcm9maWxlU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigyLCAnTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycycpLFxuICBwaG9uZTogei5zdHJpbmcoKS5taW4oNywgJ1Bob25lIG51bWJlciBtdXN0IGJlIGF0IGxlYXN0IDcgY2hhcmFjdGVycycpLFxuICB3aGF0c2FwcE51bWJlcjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGUoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKClcbiAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ05vdCBhdXRoZW50aWNhdGVkJyB9XG4gIGNvbnN0IHBhcnNlZCA9IHByb2ZpbGVTY2hlbWEuc2FmZVBhcnNlKE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpKVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogcGFyc2VkLmVycm9yLmlzc3Vlc1swXT8ubWVzc2FnZSA/PyAnSW52YWxpZCBpbnB1dCcgfVxuICB9XG4gIGNvbnN0IHsgbmFtZSwgcGhvbmUsIHdoYXRzYXBwTnVtYmVyIH0gPSBwYXJzZWQuZGF0YVxuICB0cnkge1xuICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcGhvbmUsXG4gICAgICAgIHdoYXRzYXBwTnVtYmVyOiB3aGF0c2FwcE51bWJlciB8fCBudWxsLFxuICAgICAgfSxcbiAgICB9KVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWNjb3VudCcpXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hY2NvdW50L3Byb2ZpbGUnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IHVwZGF0ZSBwcm9maWxlJyB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTRVJWSUNFUyDigJQgc2VydmljZSBlbnF1aXJ5IHN1Ym1pc3Npb24gKHB1YmxpYywgZ3Vlc3QtZnJpZW5kbHkpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3Qgc2VydmljZUVucXVpcnlTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIsICdQbGVhc2UgZW50ZXIgeW91ciBmdWxsIG5hbWUnKSxcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsJyksXG4gIHBob25lOiB6LnN0cmluZygpLm1pbig3LCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgcGhvbmUgbnVtYmVyJyksXG4gIHdoYXRzYXBwTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNlcnZpY2VTbHVnOiB6LnN0cmluZygpLm1pbigxLCAnUGxlYXNlIHNlbGVjdCBhIHNlcnZpY2UnKSxcbiAgc2VydmljZU5hbWU6IHouc3RyaW5nKCkubWluKDEpLFxuICBvY2Nhc2lvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBwcmVmZXJyZWREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHByZWZlcnJlZFRpbWU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbG9jYXRpb246IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYnVkZ2V0OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGNsb3RoaW5nU2l6ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBtZXNzYWdlOiB6LnN0cmluZygpLm1pbig1LCAnUGxlYXNlIHRlbGwgdXMgYSBiaXQgbW9yZSBhYm91dCB3aGF0IHlvdSBuZWVkJyksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U2VydmljZUVucXVpcnkoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHBhcnNlZCA9IHNlcnZpY2VFbnF1aXJ5U2NoZW1hLnNhZmVQYXJzZShPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKSlcbiAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ1BsZWFzZSBjaGVjayB0aGUgZm9ybSBhbmQgdHJ5IGFnYWluLicgfVxuICB9XG4gIGNvbnN0IGQgPSBwYXJzZWQuZGF0YVxuXG4gIC8vIE9wdGlvbmFsOiBsaW5rIHRvIGF1dGhlbnRpY2F0ZWQgdXNlciBpZiBsb2dnZWQgaW5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZCB8fCBudWxsXG5cbiAgLy8gR2VuZXJhdGUgZW5xdWlyeSBudW1iZXI6IFNWQy1ZWVlZLU5OTk5cbiAgY29uc3QgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxuICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLnNlcnZpY2VFbnF1aXJ5LmNvdW50KClcbiAgY29uc3QgZW5xdWlyeU51bWJlciA9IGBTVkMtJHt5ZWFyfS0ke1N0cmluZyhjb3VudCArIDEpLnBhZFN0YXJ0KDQsICcwJyl9YFxuXG4gIHRyeSB7XG4gICAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IGRiLnNlcnZpY2VFbnF1aXJ5LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGVucXVpcnlOdW1iZXIsXG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBkLm5hbWUsXG4gICAgICAgIGVtYWlsOiBkLmVtYWlsLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHBob25lOiBkLnBob25lLFxuICAgICAgICB3aGF0c2FwcE51bWJlcjogZC53aGF0c2FwcE51bWJlciB8fCBudWxsLFxuICAgICAgICBzZXJ2aWNlU2x1ZzogZC5zZXJ2aWNlU2x1ZyxcbiAgICAgICAgc2VydmljZU5hbWU6IGQuc2VydmljZU5hbWUsXG4gICAgICAgIG9jY2FzaW9uOiBkLm9jY2FzaW9uIHx8IG51bGwsXG4gICAgICAgIHByZWZlcnJlZERhdGU6IGQucHJlZmVycmVkRGF0ZSA/IG5ldyBEYXRlKGQucHJlZmVycmVkRGF0ZSkgOiBudWxsLFxuICAgICAgICBwcmVmZXJyZWRUaW1lOiBkLnByZWZlcnJlZFRpbWUgfHwgbnVsbCxcbiAgICAgICAgbG9jYXRpb246IGQubG9jYXRpb24gfHwgbnVsbCxcbiAgICAgICAgYnVkZ2V0OiBkLmJ1ZGdldCB8fCBudWxsLFxuICAgICAgICBjbG90aGluZ1NpemU6IGQuY2xvdGhpbmdTaXplIHx8IG51bGwsXG4gICAgICAgIG1lc3NhZ2U6IGQubWVzc2FnZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgICBhd2FpdCBjcmVhdGVTdG9yZU5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnU1lTVEVNJyxcbiAgICAgIHRpdGxlOiBgTmV3IHNlcnZpY2UgZW5xdWlyeSAke2NyZWF0ZWQuZW5xdWlyeU51bWJlcn1gLFxuICAgICAgYm9keTogYCR7Y3JlYXRlZC5jdXN0b21lck5hbWV9IHJlcXVlc3RlZCAke2NyZWF0ZWQuc2VydmljZU5hbWV9LmAsXG4gICAgICBsaW5rOiBgL2FkbWluL3NlcnZpY2VzL2VucXVpcmllcy8ke2NyZWF0ZWQuaWR9YCxcbiAgICB9KVxuXG4gICAgLy8g4pSA4pSAIEVtYWlsIGFsZXJ0IHRvIHRoZSBzdG9yZSBvd25lciDilIDilIBcbiAgICAvLyBCZXN0LWVmZm9ydCDigJQgbmV2ZXIgYmxvY2tzIHRoZSBlbnF1aXJ5IHN1Ym1pc3Npb24uXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIuYWRtaW5TZXR0aW5ncy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgICAgIGF3YWl0IG5vdGlmeUFkbWluU2VydmljZUVucXVpcnkoe1xuICAgICAgICBlbnF1aXJ5TnVtYmVyOiBjcmVhdGVkLmVucXVpcnlOdW1iZXIsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogY3JlYXRlZC5jdXN0b21lck5hbWUsXG4gICAgICAgIGVtYWlsOiBjcmVhdGVkLmVtYWlsLFxuICAgICAgICBwaG9uZTogY3JlYXRlZC5waG9uZSxcbiAgICAgICAgc2VydmljZVNsdWc6IGNyZWF0ZWQuc2VydmljZVNsdWcsXG4gICAgICAgIHNlcnZpY2VOYW1lOiBjcmVhdGVkLnNlcnZpY2VOYW1lLFxuICAgICAgICBtZXNzYWdlOiBjcmVhdGVkLm1lc3NhZ2UsXG4gICAgICAgIG9jY2FzaW9uOiBjcmVhdGVkLm9jY2FzaW9uLFxuICAgICAgICBwcmVmZXJyZWREYXRlOiBjcmVhdGVkLnByZWZlcnJlZERhdGU/LnRvSVNPU3RyaW5nKCkgPz8gbnVsbCxcbiAgICAgICAgbG9jYXRpb246IGNyZWF0ZWQubG9jYXRpb24sXG4gICAgICAgIGJ1ZGdldDogY3JlYXRlZC5idWRnZXQsXG4gICAgICB9LCBzZXR0aW5ncz8uc3VwcG9ydEVtYWlsKVxuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignW2VtYWlsXSBzZXJ2aWNlIGVucXVpcnkgbm90aWZpY2F0aW9uIGVycm9yOicsIGU/Lm1lc3NhZ2UpXG4gICAgfVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9lbnF1aXJpZXMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlLCBlbnF1aXJ5TnVtYmVyOiBjcmVhdGVkLmVucXVpcnlOdW1iZXIgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlID8/ICdDb3VsZCBub3Qgc3VibWl0IGVucXVpcnkuIFBsZWFzZSB0cnkgYWdhaW4uJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFJBK0VzQixrTUFBQSJ9
}),
"[project]/src/components/layout/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$05b916__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:05b916 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const FOOTER_LINKS = [
    {
        title: 'Shop',
        links: [
            {
                label: 'New Arrivals',
                href: '/shop?sort=newest'
            },
            {
                label: 'Clothing',
                href: '/shop?category=clothing'
            },
            {
                label: 'Bottoms',
                href: '/shop?category=bottoms'
            },
            {
                label: 'Footwear',
                href: '/shop?category=footwear'
            },
            {
                label: 'Accessories',
                href: '/shop?category=accessories'
            },
            {
                label: 'Fragrance & Grooming',
                href: '/shop?category=fragrance-grooming'
            }
        ]
    },
    {
        title: 'About',
        links: [
            {
                label: 'About Wardrobecare',
                href: '/about'
            },
            {
                label: 'FAQs',
                href: '/faq'
            },
            {
                label: 'Shipping',
                href: '/shipping'
            },
            {
                label: 'Returns',
                href: '/returns'
            },
            {
                label: 'Order Tracking',
                href: '/track-order'
            }
        ]
    },
    {
        title: 'Account',
        links: [
            {
                label: 'Sign In',
                href: '/account/login'
            },
            {
                label: 'Register',
                href: '/account/register'
            },
            {
                label: 'My Orders',
                href: '/account/orders'
            },
            {
                label: 'Wishlist',
                href: '/account/wishlist'
            },
            {
                label: 'Addresses',
                href: '/account/addresses'
            }
        ]
    }
];
function Footer() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    // Hide footer on admin
    if (pathname?.startsWith('/admin')) return null;
    const onSubscribe = async (e)=>{
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        const fd = new FormData();
        fd.set('email', email);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$05b916__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["subscribeToNewsletter"])(fd);
        setStatus(res.ok ? 'ok' : 'error');
        if (res.ok) setEmail('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-auto bg-[#121110] text-[#f7f6f3]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-editorial py-16 lg:py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "font-display text-2xl md:text-[1.7rem] leading-none tracking-[0.01em]",
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: "Wardrobecare"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-5 text-sm text-white/60 leading-relaxed max-w-sm",
                                    children: "Your personal shopper and stylist for distinguished men's fashion. Services first — curated pieces to match."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.instagram.com/wardrobecareng/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "mt-7 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                            className: "h-4 w-4",
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "link-underline",
                                            children: "@wardrobecareng"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-6 flex flex-col justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow text-white/45 mb-4",
                                    children: "The Wardrobecare List"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: onSubscribe,
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center border-b border-white/25 focus-within:border-white/70 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    required: true,
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    placeholder: "Email address",
                                                    className: "flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-white/35"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: status === 'loading',
                                                    className: "group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] py-3.5 pl-4 disabled:opacity-50 hover:text-white/70 transition-colors",
                                                    children: [
                                                        "Subscribe",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/footer.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        status === 'ok' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-xs text-white/60",
                                            children: "Welcome to the list."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-xs text-white/60",
                                            children: "Could not subscribe. Try again."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 py-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "eyebrow text-white/45 mb-5",
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/services",
                                                className: "text-sm text-white/80 hover:text-white link-underline",
                                                children: "All Services"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this),
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SERVICES"].slice(0, 5).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/services/${s.slug}`,
                                                    className: "text-sm text-white/80 hover:text-white link-underline",
                                                    children: s.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this)
                                            }, s.slug, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        FOOTER_LINKS.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "eyebrow text-white/45 mb-5",
                                        children: col.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/footer.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-3",
                                        children: col.links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: l.href,
                                                    className: "text-sm text-white/80 hover:text-white link-underline",
                                                    children: l.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this)
                                            }, l.label, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/footer.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, col.title, true, {
                                fileName: "[project]/src/components/layout/footer.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-8 border-t border-white/12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-white/45",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Wardrobecare Clothing. All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-6 text-xs text-white/45",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/privacy",
                                    className: "hover:text-white transition-colors",
                                    children: "Privacy"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/terms",
                                    className: "hover:text-white transition-colors",
                                    children: "Terms"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Lagos, Nigeria"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/footer.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/footer.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(Footer, "05IDrFVQtZ63rqzePZLOBiVgBzo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/product-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/wishlist-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/cart-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/ui-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function ProductCard({ product, className, priority, showQuickAdd = true }) {
    _s();
    const { toggle: toggleWishlist, has: hasWishlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])();
    const { add: addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    const setQuickView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "ProductCard.useUIStore[setQuickView]": (s)=>s.setQuickView
    }["ProductCard.useUIStore[setQuickView]"]);
    const setCartOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "ProductCard.useUIStore[setCartOpen]": (s)=>s.setCartOpen
    }["ProductCard.useUIStore[setCartOpen]"]);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.isAdmin === true;
    const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectivePrice"])(product.price, product.salePrice);
    const inWishlist = hasWishlist(product.id);
    const image = product.images[0]?.url;
    const hoverImage = product.images[1]?.url;
    const sizes = product.variants?.map((v)=>v.size) ?? [];
    // The "Sold Out" badge only respects the explicit admin-set outOfStock flag.
    // Variant stock still gates add-to-cart (see handleQuickAdd below), but we
    // never auto-flag a product as sold out just because all variants have
    // stock = 0 — the admin may simply not track inventory, in which case
    // stock defaults to 0 and the product should remain visible & purchasable.
    const inStock = product.outOfStock !== true;
    const handleQuickAdd = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!inStock) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Out of stock');
            return;
        }
        // If at least one variant has stock > 0, pick the first in-stock one.
        // If none has tracked stock, treat as "stock not tracked" and add anyway.
        const hasTrackedStock = product.variants?.some((v)=>v.stock > 0) ?? false;
        const firstInStock = hasTrackedStock ? product.variants?.find((v)=>v.stock > 0) : product.variants?.[0];
        addToCart({
            productId: product.id,
            variantId: undefined,
            size: firstInStock?.size ?? undefined,
            quantity: 1,
            name: product.name,
            slug: product.slug,
            price,
            originalPrice: product.salePrice && product.salePrice < product.price ? product.price : undefined,
            image
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Added to bag');
        setCartOpen(true);
    };
    const handleWishlist = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price,
            image
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    };
    const handleQuickView = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setQuickView(product.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('group relative', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/product/${product.slug}`,
            className: "block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[4/5] bg-muted overflow-hidden",
                    children: [
                        image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: image,
                            alt: product.images[0]?.altText ?? product.name,
                            fill: true,
                            sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
                            priority: priority,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]', !inStock && 'grayscale-[40%] opacity-90')
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        hoverImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: hoverImage,
                            alt: product.name,
                            fill: true,
                            sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
                            className: "object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this),
                        product.salePrice && product.salePrice < product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-3 left-3 bg-foreground text-background text-[9px] uppercase tracking-[0.15em] px-2 py-1 font-medium",
                            children: "Sale"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this),
                        !inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-foreground/95 text-background text-base md:text-lg font-bold uppercase tracking-[0.18em] px-5 py-2.5 shadow-lg",
                                children: "Sold Out"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-card.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/admin/products/${product.id}`,
                            onClick: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                            },
                            className: "absolute top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rust z-10",
                            "aria-label": "Edit product",
                            title: "Edit product (admin)",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                    className: "h-3 w-3",
                                    strokeWidth: 1.8
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this),
                                "Edit"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleWishlist,
                                    className: "bg-background/90 backdrop-blur-sm p-2 hover:bg-background transition-colors",
                                    "aria-label": "Toggle wishlist",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-3.5 w-3.5', inWishlist && 'fill-current'),
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-card.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleQuickView,
                                    className: "bg-background/90 backdrop-blur-sm p-2 hover:bg-background transition-colors",
                                    "aria-label": "Quick view",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        className: "h-3.5 w-3.5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-card.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this),
                        showQuickAdd && inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleQuickAdd,
                            className: "absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-[10px] uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                    className: "h-3.5 w-3.5",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this),
                                "Quick Add"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/product-card.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-3 pb-1",
                    children: [
                        product.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1",
                            children: product.category.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-2', !inStock && 'text-muted-foreground'),
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-baseline gap-2 mt-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm tabular-nums', !inStock && 'text-muted-foreground'),
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNGN"])(price)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                product.salePrice && product.salePrice < product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground line-through tabular-nums",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNGN"])(product.price)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/product-card.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        (()=>{
                            // Filter to non-empty sizes only (some variants may have no size)
                            const realSizes = (product.variants ?? []).map((v)=>({
                                    size: v.size?.trim(),
                                    stock: v.stock
                                })).filter((v)=>v.size && v.size.length > 0);
                            if (realSizes.length === 0) return null;
                            // Special case: single "ONE SIZE" — render as plain text
                            if (realSizes.length === 1 && realSizes[0].size?.toUpperCase() === 'ONE SIZE') {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-muted-foreground mt-2",
                                    children: "One Size"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 214,
                                    columnNumber: 17
                                }, this);
                            }
                            // If 6 or fewer sizes, show as chips with stock state
                            if (realSizes.length <= 6) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1 mt-2",
                                    children: realSizes.map((v, i)=>{
                                        const variantOos = v.stock <= 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5', 'border text-[10px] tabular-nums font-mono uppercase tracking-tight', variantOos ? 'border-border text-muted-foreground/40 line-through' : 'border-border text-foreground'),
                                            title: variantOos ? `${v.size} — out of stock` : `${v.size} — in stock`,
                                            children: v.size
                                        }, `${v.size}-${i}`, false, {
                                            fileName: "[project]/src/components/product/product-card.tsx",
                                            lineNumber: 227,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-card.tsx",
                                    lineNumber: 223,
                                    columnNumber: 17
                                }, this);
                            }
                            // More than 6 — show count to avoid overflow on small cards
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-muted-foreground mt-2",
                                children: [
                                    realSizes.length,
                                    " sizes available"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-card.tsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this);
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/product-card.tsx",
                    lineNumber: 184,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/product-card.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/product/product-card.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "kBbuI7E+HtIfd+MZp+Ss/ijEcvo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/product-gallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductGallery",
    ()=>ProductGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductGallery({ images, name }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [zoomOpen, setZoomOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prev = ()=>setActive((i)=>(i - 1 + images.length) % images.length);
    const next = ()=>setActive((i)=>(i + 1) % images.length);
    if (!images.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "aspect-[4/5] bg-muted"
        }, void 0, false, {
            fileName: "[project]/src/components/product/product-gallery.tsx",
            lineNumber: 22,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-[80px_1fr] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto hide-scroll",
                        children: images.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActive(i),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative w-16 h-20 lg:w-full lg:h-24 flex-shrink-0 overflow-hidden bg-muted border transition-colors', active === i ? 'border-foreground' : 'border-transparent hover:border-border'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: img.url,
                                    alt: img.altText ?? name,
                                    fill: true,
                                    sizes: "80px",
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-gallery.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-gallery.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "order-1 lg:order-2 relative aspect-[4/5] bg-muted overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: images[active].url,
                                alt: images[active].altText ?? name,
                                fill: true,
                                sizes: "(max-width: 1024px) 100vw, 60vw",
                                priority: true,
                                className: "object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setZoomOpen(true),
                                className: "absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors",
                                "aria-label": "Zoom image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                    className: "h-4 w-4",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-gallery.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: prev,
                                        className: "lg:hidden absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm",
                                        "aria-label": "Previous image",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "h-4 w-4",
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/product-gallery.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-gallery.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: next,
                                        className: "lg:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm",
                                        "aria-label": "Next image",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "h-4 w-4",
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/product-gallery.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-gallery.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-4 right-4 text-xs text-background bg-foreground/60 backdrop-blur-sm px-2.5 py-1 tabular-nums",
                                children: [
                                    active + 1,
                                    " / ",
                                    images.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-gallery.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-gallery.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            zoomOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-background flex items-center justify-center p-4",
                onClick: ()=>setZoomOpen(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setZoomOpen(false),
                        className: "absolute top-6 right-6 p-2 hover:bg-muted transition-colors",
                        "aria-label": "Close zoom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-6 w-6",
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-gallery.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-gallery.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-4xl aspect-[4/5]",
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: images[active].url,
                            alt: images[active].altText ?? name,
                            fill: true,
                            sizes: "100vw",
                            className: "object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-gallery.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-gallery.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    prev();
                                },
                                className: "absolute left-6 top-1/2 -translate-y-1/2 p-3 hover:bg-muted transition-colors",
                                "aria-label": "Previous",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "h-6 w-6",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-gallery.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    next();
                                },
                                className: "absolute right-6 top-1/2 -translate-y-1/2 p-3 hover:bg-muted transition-colors",
                                "aria-label": "Next",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "h-6 w-6",
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-gallery.tsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-gallery.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-gallery.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ProductGallery, "ebbD0eQcx+e4x0Nx/XY+/asZd6I=");
_c = ProductGallery;
var _c;
__turbopack_context__.k.register(_c, "ProductGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/order-colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Static colour-name → hex map for rendering colour swatches on order items.
 *
 * `OrderItem.color` is a free string set at checkout time (e.g. "Navy", "Olive",
 * "Sky Blue"). The DB does NOT store a hex code per variant, so we resolve the
 * swatch colour client-side via this map. Unrecognised names render as a
 * neutral grey chip so the layout never breaks.
 *
 * Keep names lowercase + trimmed when looking up. Add new entries as the
 * catalogue grows — this list intentionally covers the common menswear
 * colour vocabulary Wardrobecare already uses.
 */ __turbopack_context__.s([
    "COLOR_HEX",
    ()=>COLOR_HEX,
    "colorToCss",
    ()=>colorToCss,
    "isKnownColor",
    ()=>isKnownColor
]);
const COLOR_HEX = {
    // Neutrals
    black: '#1B1917',
    white: '#FFFFFF',
    cream: '#F7F3EA',
    ivory: '#F5F0E1',
    offwhite: '#F2F0EA',
    beige: '#E8DDC8',
    stone: '#C7BDA9',
    sand: '#D6C7A8',
    taupe: '#7E7367',
    grey: '#808080',
    gray: '#808080',
    charcoal: '#363332',
    slate: '#5B6770',
    ash: '#9BA0A4',
    // Blues
    navy: '#2B3A55',
    blue: '#3F6FB0',
    'sky blue': '#7FA8C9',
    skyblue: '#7FA8C9',
    'light blue': '#B6D2E8',
    'royal blue': '#324F94',
    indigo: '#3D4B8C',
    cobalt: '#2A5BAE',
    teal: '#2F8F8C',
    'teal blue': '#3A8A98',
    // Greens
    olive: '#5B6240',
    green: '#4F7A4C',
    'forest green': '#3B5A3F',
    emerald: '#3F8A5F',
    sage: '#6B7A6E',
    khaki: '#A39272',
    mint: '#9CCFB3',
    // Earth tones
    brown: '#6E4E33',
    'light brown': '#A37B5A',
    'dark brown': '#4A3727',
    tan: '#B89166',
    camel: '#B8895D',
    cognac: '#9A4F2F',
    rust: '#8C3B2E',
    burgundy: '#6E2733',
    maroon: '#5E2228',
    wine: '#6B2737',
    // Reds / pinks
    red: '#A8302A',
    'wine red': '#6E2733',
    rose: '#B76A78',
    pink: '#D8A6B0',
    coral: '#D97A6B',
    // Yellows / oranges
    yellow: '#E0B83D',
    mustard: '#C99527',
    gold: '#A8823D',
    orange: '#C7663B',
    amber: '#B07427',
    // Purples
    purple: '#5B4E80',
    violet: '#5C4B82',
    plum: '#5B3E58',
    lavender: '#A99BCB',
    // Multi / pattern
    multicolour: 'linear-gradient(45deg,#A8302A 0%,#E0B83D 35%,#3F6FB0 70%,#4F7A4C 100%)',
    multi: 'linear-gradient(45deg,#A8302A 0%,#E0B83D 35%,#3F6FB0 70%,#4F7A4C 100%)',
    pattern: 'repeating-linear-gradient(45deg,#1B1917 0 6px,#F7F3EA 6px 12px)',
    check: 'repeating-linear-gradient(45deg,#8A6A4A 0 6px,#F7F3EA 6px 12px)',
    stripe: 'repeating-linear-gradient(0deg,#1B1917 0 4px,#F7F3EA 4px 8px)',
    floral: 'linear-gradient(135deg,#9CCFB3 0%,#D8A6B0 50%,#E0B83D 100%)',
    paisley: 'linear-gradient(135deg,#2B3A55 0%,#8A6A4A 100%)',
    // Metallic
    silver: '#D5D5D2',
    gold2: '#C9A462',
    metallic: 'linear-gradient(135deg,#C9A462 0%,#E8DDC8 100%)'
};
function colorToCss(color) {
    if (!color) return '#9B9B9B';
    const key = color.trim().toLowerCase();
    if (COLOR_HEX[key]) return COLOR_HEX[key];
    // Try first word — handles "Navy Blue", "Dark Olive", etc.
    const first = key.split(/[\s/-]+/)[0];
    if (COLOR_HEX[first]) return COLOR_HEX[first];
    return '#9B9B9B';
}
function isKnownColor(color) {
    if (!color) return false;
    const key = color.trim().toLowerCase();
    if (COLOR_HEX[key]) return true;
    const first = key.split(/[\s/-]+/)[0];
    return !!COLOR_HEX[first];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/product-info.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductInfo",
    ()=>ProductInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/cart-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/wishlist-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stores/ui-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$order$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/order-colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
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
function ProductInfo({ product, settings, selectedColor, onColorChange, showColorSelector, distinctColors }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Compute initial size from product on first render — no effect needed
    // If a colour is selected, default to the first in-stock size within that colour
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ProductInfo.useState": ()=>{
            if (product.variants.length > 0) {
                const colourVariants = selectedColor ? product.variants.filter({
                    "ProductInfo.useState": (v)=>v.color === selectedColor
                }["ProductInfo.useState"]) : product.variants;
                const firstAvailable = colourVariants.find({
                    "ProductInfo.useState.firstAvailable": (v)=>v.stock > 0
                }["ProductInfo.useState.firstAvailable"]);
                return firstAvailable?.size ?? colourVariants[0]?.size ?? product.variants[0]?.size ?? null;
            }
            return null;
        }
    }["ProductInfo.useState"]);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showSizeGuide, setShowSizeGuide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])({
        "ProductInfo.useCartStore[addToCart]": (s)=>s.add
    }["ProductInfo.useCartStore[addToCart]"]);
    const toggleWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])({
        "ProductInfo.useWishlistStore[toggleWishlist]": (s)=>s.toggle
    }["ProductInfo.useWishlistStore[toggleWishlist]"]);
    const hasWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])({
        "ProductInfo.useWishlistStore[hasWishlist]": (s)=>s.has
    }["ProductInfo.useWishlistStore[hasWishlist]"]);
    const setCartOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])({
        "ProductInfo.useUIStore[setCartOpen]": (s)=>s.setCartOpen
    }["ProductInfo.useUIStore[setCartOpen]"]);
    // Filter variants by selected colour if the colour selector is active
    const colourFilteredVariants = showColorSelector && selectedColor ? product.variants.filter((v)=>v.color === selectedColor) : product.variants;
    const selectedVariant = colourFilteredVariants.find((v)=>v.size === selectedSize) ?? product.variants.find((v)=>v.size === selectedSize);
    const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectivePrice"])(product.price, product.salePrice);
    // Use variant price override if set, otherwise product price
    const effectiveVariantPrice = selectedVariant?.price ?? null;
    const displayPrice = effectiveVariantPrice !== null ? effectiveVariantPrice : price;
    const isOnSale = product.salePrice && product.salePrice < product.price;
    // Respect the explicit admin-set outOfStock flag; otherwise infer from variants
    const inStock = product.outOfStock !== true && (!product.variants.length || product.variants.some((v)=>v.stock > 0));
    const selectedInStock = product.outOfStock !== true && (selectedVariant ? selectedVariant.stock > 0 : inStock);
    const maxQuantity = selectedVariant?.stock ?? 99;
    const inWishlist = hasWishlist(product.id);
    // New arrival: product was created within the last 30 days OR is featured
    const isNewArrival = product.featured || product.createdAt && Date.now() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;
    function handleColorChange(color) {
        onColorChange(color);
        // Reset size to first available within the new colour
        const colourVariants = product.variants.filter((v)=>v.color === color);
        const firstAvailable = colourVariants.find((v)=>v.stock > 0);
        setSelectedSize(firstAvailable?.size ?? colourVariants[0]?.size ?? null);
    }
    const handleAddToCart = ()=>{
        if (product.variants.length > 0 && !selectedSize) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please select a size');
            return;
        }
        if (!selectedInStock) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Selected size is out of stock');
            return;
        }
        addToCart({
            productId: product.id,
            variantId: selectedVariant?.id ?? undefined,
            size: selectedSize ?? undefined,
            quantity,
            name: product.name,
            slug: product.slug,
            price: displayPrice,
            originalPrice: isOnSale ? product.price : undefined,
            image: product.images[0]?.url ?? undefined,
            sku: selectedVariant?.sku ?? product.sku
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Added to bag');
        setCartOpen(true);
    };
    const handleBuyNow = ()=>{
        if (product.variants.length > 0 && !selectedSize) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please select a size');
            return;
        }
        if (!selectedInStock) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Selected size is out of stock');
            return;
        }
        addToCart({
            productId: product.id,
            variantId: selectedVariant?.id ?? undefined,
            size: selectedSize ?? undefined,
            quantity,
            name: product.name,
            slug: product.slug,
            price: displayPrice,
            originalPrice: isOnSale ? product.price : undefined,
            image: product.images[0]?.url ?? undefined,
            sku: selectedVariant?.sku ?? product.sku
        });
        setTimeout(()=>{
            router.push('/checkout');
        }, 50);
    };
    const handleWhatsApp = ()=>{
        const phone = settings?.whatsappNumber || '2348000000000';
        const msg = `Hello Wardrobecare, I'd like to order:\n\n*${product.name}*\nColour: ${selectedColor ?? 'N/A'}\nSize: ${selectedSize ?? 'N/A'}\nQuantity: ${quantity}\nPrice: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNGN"])(displayPrice * quantity)}\nSKU: ${selectedVariant?.sku ?? product.sku}\n\nPlease confirm availability.`;
        window.open((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["whatsappLink"])(phone, msg), '_blank');
    };
    const handleWishlist = ()=>{
        toggleWishlist({
            productId: product.id,
            variantId: selectedVariant?.id ?? undefined,
            size: selectedSize ?? undefined,
            name: product.name,
            slug: product.slug,
            price: displayPrice,
            image: product.images[0]?.url ?? undefined
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lg:sticky lg:top-32 lg:self-start space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "hover:text-foreground",
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2",
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/shop",
                        className: "hover:text-foreground",
                        children: "Shop"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    product.category.parent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mx-2",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/shop?category=${product.category.parent.slug}`,
                                className: "hover:text-foreground",
                                children: product.category.parent.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-2",
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/shop?category=${product.category.slug}`,
                        className: "hover:text-foreground",
                        children: product.category.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    product.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
                        children: [
                            product.category.parent ? `${product.category.parent.name} · ` : '',
                            product.category.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this),
                    isNewArrival && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] uppercase tracking-[0.15em] bg-foreground text-background px-2 py-0.5",
                        children: "New"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em]",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    product.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-2",
                        children: [
                            "by ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/shop?brand=${product.brand.slug}`,
                                className: "hover:text-foreground underline underline-offset-4",
                                children: product.brand.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 222,
                                columnNumber: 16
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline gap-3 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl tabular-nums text-rust font-medium",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNGN"])(displayPrice)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            isOnSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base text-muted-foreground line-through tabular-nums",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNGN"])(product.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase tracking-[0.15em] bg-foreground text-background px-2 py-0.5",
                                        children: [
                                            "Save ",
                                            Math.round((1 - product.salePrice / product.price) * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground leading-relaxed",
                children: product.description
            }, void 0, false, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-xs",
                children: [
                    inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1.5 text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-1.5 w-1.5 rounded-full bg-green-600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            "In Stock"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]",
                        children: "Sold Out"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: [
                            "SKU: ",
                            selectedVariant?.sku ?? product.sku
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            showColorSelector && distinctColors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3",
                        children: [
                            "Colour ",
                            selectedColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground ml-1",
                                children: [
                                    "— ",
                                    selectedColor
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 264,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2.5",
                        children: distinctColors.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleColorChange(color),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('size-8 rounded-full border-2 transition-all', selectedColor === color ? 'border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background' : 'border-transparent ring-1 ring-border hover:ring-foreground/40'),
                                style: {
                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$order$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKnownColor"])(color) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$order$2d$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorToCss"])(color) : '#999'
                                },
                                title: color,
                                "aria-label": `Colour: ${color}`
                            }, color, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 268,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this),
            product.variants.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
                                children: [
                                    "Size ",
                                    selectedSize && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground ml-1",
                                        children: [
                                            "— ",
                                            selectedSize
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 291,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowSizeGuide(!showSizeGuide),
                                className: "text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground underline underline-offset-4",
                                children: "Size Guide"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: (showColorSelector && selectedColor ? colourFilteredVariants : product.variants).map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedSize(v.size),
                                disabled: v.stock <= 0,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('min-w-[3rem] px-4 py-2.5 text-sm border transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:line-through', selectedSize === v.size ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'),
                                children: v.size
                            }, v.id, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 303,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    showSizeGuide && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-4 bg-secondary/60 border border-border text-xs space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium uppercase tracking-[0.15em] text-[10px]",
                                children: "Size Guide"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 320,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Chest (inches): S — 36–38, M — 38–40, L — 40–42, XL — 42–44, XXL — 44–46"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 321,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Waist (inches): 30 — 30, 32 — 32, 34 — 34, 36 — 36, 38 — 38, 40 — 40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 322,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Shoes (EU): True to size. If between sizes, size up."
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 323,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 319,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 288,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3",
                        children: "Quantity"
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center border border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setQuantity(Math.max(1, quantity - 1)),
                                className: "px-4 py-2.5 hover:bg-muted transition-colors",
                                "aria-label": "Decrease quantity",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-6 text-sm tabular-nums",
                                children: quantity
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setQuantity(Math.min(maxQuantity, quantity + 1)),
                                className: "px-4 py-2.5 hover:bg-muted transition-colors",
                                "aria-label": "Increase quantity",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 346,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-amber-700 mt-2",
                        children: [
                            "Only ",
                            selectedVariant.stock,
                            " left in this size."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddToCart,
                                disabled: !inStock,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 py-4 text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2", inStock ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground cursor-not-allowed"),
                                children: inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                            className: "h-4 w-4",
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product/product-info.tsx",
                                            lineNumber: 369,
                                            columnNumber: 17
                                        }, this),
                                        "Add to Cart"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold tracking-[0.22em]",
                                    children: "Sold Out"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleWishlist,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-5 border text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center", inWishlist ? "border-foreground bg-foreground text-background" : "border-foreground hover:bg-foreground hover:text-background"),
                                "aria-label": inWishlist ? 'Remove from wishlist' : 'Add to wishlist',
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-4 w-4', inWishlist && 'fill-current'),
                                    strokeWidth: 1.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleBuyNow,
                                disabled: !inStock,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-3.5 border text-[11px] uppercase tracking-[0.2em] transition-colors", inStock ? "border-foreground hover:bg-foreground hover:text-background" : "border-muted text-muted-foreground cursor-not-allowed"),
                                children: "Buy Now"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleWhatsApp,
                                className: "flex items-center justify-center gap-2 py-3.5 border border-border text-[11px] uppercase tracking-[0.2em] hover:border-foreground transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "h-3.5 w-3.5",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this),
                                    "WhatsApp"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-6 border-t border-border space-y-3 text-xs text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                className: "h-4 w-4 mt-0.5 flex-shrink-0",
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-foreground",
                                        children: "Cash on Delivery"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Lagos 1hr–3 days · Other states up to 7 days. Complimentary over ₦500,000."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 416,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                className: "h-4 w-4 mt-0.5 flex-shrink-0",
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-foreground",
                                        children: "Secure Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Verified by Paystack. Server-side payment verification."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/product/product-info.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/product-info.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-6 border-t border-border space-y-4",
                children: [
                    product.features && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailRow, {
                        label: "Features",
                        value: product.features
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this),
                    product.material && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailRow, {
                        label: "Material",
                        value: product.material
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 436,
                        columnNumber: 11
                    }, this),
                    product.fit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailRow, {
                        label: "Fit",
                        value: product.fit
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this),
                    product.care && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailRow, {
                        label: "Care",
                        value: product.care
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-6 border-t border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-secondary/40 p-6 border border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3",
                            children: "Not sure of your size?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-info.tsx",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm leading-relaxed mb-4",
                            children: "Book a Wardrobe & Style Consultation and we'll help you decide — or add it to a Personal Shopping brief."
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/product-info.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/services/wardrobe-consultation",
                                    className: "flex-1 text-center py-3 text-[11px] uppercase tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90 transition-colors",
                                    children: "Book a Consultation"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 457,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/services/personal-shopping",
                                    className: "flex-1 text-center py-3 text-[11px] uppercase tracking-[0.2em] border border-foreground hover:bg-foreground hover:text-background transition-colors",
                                    children: "Personal Shopping"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/product-info.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/product-info.tsx",
                            lineNumber: 456,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/product-info.tsx",
                    lineNumber: 449,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product/product-info.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_s(ProductInfo, "KF3ib2ZPJG+5WLKqDaYb1ByRMps=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$cart$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$wishlist$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stores$2f$ui$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
_c = ProductInfo;
function DetailRow({ label, value }) {
    _s1();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-border/60 pb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: "flex items-center justify-between w-full text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] uppercase tracking-[0.18em] text-foreground",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-3.5 w-3.5 transition-transform', open && 'rotate-45'),
                        strokeWidth: 1.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/product-info.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 480,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground mt-2 leading-relaxed",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/product/product-info.tsx",
                lineNumber: 488,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product/product-info.tsx",
        lineNumber: 479,
        columnNumber: 5
    }, this);
}
_s1(DetailRow, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c1 = DetailRow;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductInfo");
__turbopack_context__.k.register(_c1, "DetailRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/product-detail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductDetail",
    ()=>ProductDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$product$2d$gallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/product-gallery.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$product$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/product-info.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ProductDetail({ product, settings }) {
    _s();
    // Extract distinct non-null colors from variants
    const distinctColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductDetail.useMemo[distinctColors]": ()=>{
            const colors = product.variants.map({
                "ProductDetail.useMemo[distinctColors].colors": (v)=>v.color
            }["ProductDetail.useMemo[distinctColors].colors"]).filter({
                "ProductDetail.useMemo[distinctColors].colors": (c)=>!!c && c.trim().length > 0
            }["ProductDetail.useMemo[distinctColors].colors"]);
            return [
                ...new Set(colors)
            ];
        }
    }["ProductDetail.useMemo[distinctColors]"], [
        product.variants
    ]);
    // Default to the first colour if variants have distinct colors
    const [selectedColor, setSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ProductDetail.useState": ()=>{
            return distinctColors.length > 0 ? distinctColors[0] : null;
        }
    }["ProductDetail.useState"]);
    // Compute gallery images for the selected colour:
    // If any variant with the selected colour has an imageUrl, prepend those
    // to the product's own images. Dedup by URL to avoid showing the same
    // image twice if the variant imageUrl is the same as the product image.
    const galleryImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductDetail.useMemo[galleryImages]": ()=>{
            if (!selectedColor) return product.images;
            const variantImages = product.variants.filter({
                "ProductDetail.useMemo[galleryImages].variantImages": (v)=>v.color === selectedColor && v.imageUrl
            }["ProductDetail.useMemo[galleryImages].variantImages"]).map({
                "ProductDetail.useMemo[galleryImages].variantImages": (v)=>({
                        url: v.imageUrl,
                        altText: `${product.name} — ${v.color ?? ''}`.trim()
                    })
            }["ProductDetail.useMemo[galleryImages].variantImages"]);
            if (variantImages.length === 0) return product.images;
            // Dedup: remove product images that have the same URL as a variant image
            const variantUrls = new Set(variantImages.map({
                "ProductDetail.useMemo[galleryImages]": (vi)=>vi.url
            }["ProductDetail.useMemo[galleryImages]"]));
            const dedupedProductImages = product.images.filter({
                "ProductDetail.useMemo[galleryImages].dedupedProductImages": (pi)=>!variantUrls.has(pi.url)
            }["ProductDetail.useMemo[galleryImages].dedupedProductImages"]);
            return [
                ...variantImages,
                ...dedupedProductImages
            ];
        }
    }["ProductDetail.useMemo[galleryImages]"], [
        selectedColor,
        product.images,
        product.variants,
        product.name
    ]);
    // Whether to show the colour selector at all (only when there are 2+ distinct colors)
    const showColorSelector = distinctColors.length >= 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid lg:grid-cols-2 gap-8 lg:gap-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$product$2d$gallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductGallery"], {
                images: galleryImages,
                name: product.name
            }, void 0, false, {
                fileName: "[project]/src/components/product/product-detail.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$product$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductInfo"], {
                product: product,
                settings: settings,
                selectedColor: selectedColor,
                onColorChange: setSelectedColor,
                showColorSelector: showColorSelector,
                distinctColors: distinctColors
            }, void 0, false, {
                fileName: "[project]/src/components/product/product-detail.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product/product-detail.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(ProductDetail, "j7VpsgJ4lFCj22rYXFbjN6fkPOA=");
_c = ProductDetail;
var _c;
__turbopack_context__.k.register(_c, "ProductDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1a242001._.js.map