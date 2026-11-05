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
"[project]/src/actions/data:f81b21 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscribeToNewsletter",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"403af27c1121273b215542c76f674ce5e88291604c":"subscribeToNewsletter"},"src/actions/store.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("403af27c1121273b215542c76f674ce5e88291604c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "subscribeToNewsletter");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc3RvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBnZW5lcmF0ZU9yZGVyTnVtYmVyLCBjYWxjdWxhdGVEZWxpdmVyeUZlZSB9IGZyb20gJ0AvbGliL2Zvcm1hdCdcbmltcG9ydCB7IGluaXRpYWxpemVQYXlzdGFja1RyYW5zYWN0aW9uLCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uIH0gZnJvbSAnQC9saWIvcGF5c3RhY2svc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gJ0AvbGliL3Nlc3Npb24nXG5pbXBvcnQgeyByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbiB9IGZyb20gJ0AvbGliL3Blcm1pc3Npb25zJ1xuaW1wb3J0IHsgYXVkaXRMb2csIGRpZmZDaGFuZ2VkRmllbGRzLCBkZXNjcmliZUNoYW5nZXMgfSBmcm9tICdAL2xpYi9hdWRpdCdcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJ1xuaW1wb3J0IHsgcmF0ZUxpbWl0LCBjbGllbnRJcEZyb21IZWFkZXJzIH0gZnJvbSAnQC9saWIvcmF0ZS1saW1pdCdcbmltcG9ydCB7XG4gIHNlbmRPcmRlckNvbmZpcm1hdGlvbixcbiAgc2VuZFBheW1lbnRSZWNlaXB0LFxuICBub3RpZnlBZG1pbk5ld09yZGVyLFxuICBub3RpZnlBZG1pblNlcnZpY2VFbnF1aXJ5LFxuICB0eXBlIEVtYWlsT3JkZXIsXG4gIHR5cGUgRW1haWxPcmRlckl0ZW0sXG59IGZyb20gJ0AvbGliL2VtYWlsJ1xuaW1wb3J0IHsgbm90aWZ5T3duZXJOZXdPcmRlciB9IGZyb20gJ0AvbGliL3NtcydcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDQVJUIOKAlCBzZXJ2ZXItc2lkZSBsaW5lIHBlcnNpc3RlbmNlICh1c2VkIGFmdGVyIHNlcnZlciB2ZXJpZmljYXRpb24pXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgQ2FydExpbmVJbnB1dCA9IHtcbiAgcHJvZHVjdElkOiBzdHJpbmdcbiAgdmFyaWFudElkPzogc3RyaW5nIHwgbnVsbFxuICBzaXplPzogc3RyaW5nIHwgbnVsbFxuICBxdWFudGl0eTogbnVtYmVyXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYXJ0TGluZXNXaXRoUHJvZHVjdHMobGluZXM6IENhcnRMaW5lSW5wdXRbXSkge1xuICBpZiAoIWxpbmVzLmxlbmd0aCkgcmV0dXJuIFtdXG4gIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgZGIucHJvZHVjdC5maW5kTWFueSh7XG4gICAgd2hlcmU6IHsgaWQ6IHsgaW46IGxpbmVzLm1hcCgobCkgPT4gbC5wcm9kdWN0SWQpIH0gfSxcbiAgICBpbmNsdWRlOiB7XG4gICAgICBpbWFnZXM6IHsgb3JkZXJCeTogeyBwb3NpdGlvbjogJ2FzYycgfSwgdGFrZTogMSB9LFxuICAgICAgdmFyaWFudHM6IHRydWUsXG4gICAgICBjYXRlZ29yeTogdHJ1ZSxcbiAgICB9LFxuICB9KVxuICByZXR1cm4gbGluZXNcbiAgICAubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCBwID0gcHJvZHVjdHMuZmluZCgocCkgPT4gcC5pZCA9PT0gbGluZS5wcm9kdWN0SWQpXG4gICAgICBpZiAoIXApIHJldHVybiBudWxsXG4gICAgICBjb25zdCB2YXJpYW50ID0gbGluZS52YXJpYW50SWQgPyBwLnZhcmlhbnRzLmZpbmQoKHYpID0+IHYuaWQgPT09IGxpbmUudmFyaWFudElkKSA6IHVuZGVmaW5lZFxuICAgICAgY29uc3QgcHJpY2UgPSB2YXJpYW50Py5wcmljZSA/PyBwLnNhbGVQcmljZSA/PyBwLnByaWNlXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5saW5lLFxuICAgICAgICBuYW1lOiBwLm5hbWUsXG4gICAgICAgIHNsdWc6IHAuc2x1ZyxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIG9yaWdpbmFsUHJpY2U6IHAuc2FsZVByaWNlICYmIHAuc2FsZVByaWNlIDwgcC5wcmljZSA/IHAucHJpY2UgOiB1bmRlZmluZWQsXG4gICAgICAgIGltYWdlOiBwLmltYWdlc1swXT8udXJsLFxuICAgICAgICBza3U6IHZhcmlhbnQ/LnNrdSA/PyBwLnNrdSxcbiAgICAgICAgaW5TdG9jazogdmFyaWFudCA/IHZhcmlhbnQuc3RvY2sgPiAwIDogcC52YXJpYW50cy5zb21lKCh2KSA9PiB2LnN0b2NrID4gMCksXG4gICAgICAgIG1heFF1YW50aXR5OiB2YXJpYW50Py5zdG9jayA/PyBNYXRoLm1heCguLi5wLnZhcmlhbnRzLm1hcCgodikgPT4gdi5zdG9jayksIDApLFxuICAgICAgICBjYXRlZ29yeUlkOiBwLmNhdGVnb3J5SWQsXG4gICAgICAgIGNhdGVnb3J5TmFtZTogcC5jYXRlZ29yeS5uYW1lLFxuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBhbnlbXVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE5FV1NMRVRURVJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBuZXdzbGV0dGVyU2NoZW1hID0gei5vYmplY3Qoe1xuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgpLFxuICBuYW1lOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3Vic2NyaWJlVG9OZXdzbGV0dGVyKGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICBjb25zdCBwYXJzZWQgPSBuZXdzbGV0dGVyU2NoZW1hLnNhZmVQYXJzZSh7XG4gICAgZW1haWw6IGZvcm1EYXRhLmdldCgnZW1haWwnKSxcbiAgICBuYW1lOiBmb3JtRGF0YS5nZXQoJ25hbWUnKSB8fCB1bmRlZmluZWQsXG4gIH0pXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwuJyB9XG4gIH1cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5uZXdzbGV0dGVyU3Vic2NyaWJlci51cHNlcnQoe1xuICAgICAgd2hlcmU6IHsgZW1haWw6IHBhcnNlZC5kYXRhLmVtYWlsLnRvTG93ZXJDYXNlKCkgfSxcbiAgICAgIHVwZGF0ZTogeyBhY3RpdmU6IHRydWUgfSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICBlbWFpbDogcGFyc2VkLmRhdGEuZW1haWwudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbmFtZTogcGFyc2VkLmRhdGEubmFtZSxcbiAgICAgICAgc291cmNlOiAnZm9vdGVyJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICByZXR1cm4geyBvazogdHJ1ZSB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnQ291bGQgbm90IHN1YnNjcmliZS4gVHJ5IGFnYWluLicgfVxuICB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ0hFQ0tPVVQg4oCUIHNlcnZlci1zaWRlIG9yZGVyIGNyZWF0aW9uIHdpdGggc2VydmVyLWNhbGN1bGF0ZWQgdG90YWxzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY2hlY2tvdXRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGN1c3RvbWVyTmFtZTogei5zdHJpbmcoKS5taW4oMiksXG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKCksXG4gIHBob25lOiB6LnN0cmluZygpLm1pbig3KSxcbiAgd2hhdHNhcHBOdW1iZXI6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc3RhdGU6IHouc3RyaW5nKCkubWluKDIpLFxuICBjaXR5OiB6LnN0cmluZygpLm1pbigyKSxcbiAgYWRkcmVzczogei5zdHJpbmcoKS5taW4oNSksXG4gIGRlbGl2ZXJ5SW5zdHJ1Y3Rpb25zOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGxpbmVzOiB6LmFycmF5KFxuICAgIHoub2JqZWN0KHtcbiAgICAgIHByb2R1Y3RJZDogei5zdHJpbmcoKSxcbiAgICAgIHZhcmlhbnRJZDogei5zdHJpbmcoKS5udWxsYWJsZSgpLm9wdGlvbmFsKCksXG4gICAgICBzaXplOiB6LnN0cmluZygpLm51bGxhYmxlKCkub3B0aW9uYWwoKSxcbiAgICAgIHF1YW50aXR5OiB6Lm51bWJlcigpLmludCgpLm1pbigxKS5tYXgoOTkpLFxuICAgIH0pLFxuICApLFxuICBjb3Vwb25Db2RlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHBheW1lbnRNZXRob2Q6IHouZW51bShbJ1BBWVNUQUNLJywgJ1dIQVRTQVBQJywgJ0JBTktfVFJBTlNGRVInXSkuZGVmYXVsdCgnUEFZU1RBQ0snKSxcbn0pXG5cbmV4cG9ydCB0eXBlIENoZWNrb3V0UmVzdWx0ID1cbiAgfCB7IG9rOiB0cnVlOyBvcmRlck51bWJlcjogc3RyaW5nOyBhdXRob3JpemF0aW9uVXJsPzogc3RyaW5nOyByZWZlcmVuY2U6IHN0cmluZzsgdG90YWw6IG51bWJlciB9XG4gIHwgeyBvazogZmFsc2U7IGVycm9yOiBzdHJpbmcgfVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhIHwgUmVjb3JkPHN0cmluZywgYW55Pik6IFByb21pc2U8Q2hlY2tvdXRSZXN1bHQ+IHtcbiAgLy8gQWNjZXB0IGVpdGhlciBGb3JtRGF0YSBvciBhIHBsYWluIG9iamVjdCAoY2FsbGVkIGZyb20gY2xpZW50KVxuICBjb25zdCBpbnB1dDogUmVjb3JkPHN0cmluZywgYW55PiA9XG4gICAgZm9ybURhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSA/IE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpIDogZm9ybURhdGFcbiAgLy8gbGluZXMgbWF5IGFycml2ZSBhcyBKU09OIHN0cmluZyBmcm9tIEZvcm1EYXRhXG4gIGlmICh0eXBlb2YgaW5wdXQubGluZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHsgaW5wdXQubGluZXMgPSBKU09OLnBhcnNlKGlucHV0LmxpbmVzKSB9IGNhdGNoIHsgaW5wdXQubGluZXMgPSBbXSB9XG4gIH1cbiAgLy8gQ29lcmNlIHF1YW50aXR5IHRvIG51bWJlclxuICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dC5saW5lcykpIHtcbiAgICBpbnB1dC5saW5lcyA9IGlucHV0LmxpbmVzLm1hcCgobDogYW55KSA9PiAoeyAuLi5sLCBxdWFudGl0eTogTnVtYmVyKGwucXVhbnRpdHkpIH0pKVxuICB9XG4gIGNvbnN0IHBhcnNlZCA9IGNoZWNrb3V0U2NoZW1hLnNhZmVQYXJzZShpbnB1dClcbiAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ0ludmFsaWQgY2hlY2tvdXQgZGF0YS4nIH1cbiAgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcblxuICBpZiAoIWRhdGEubGluZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1lvdXIgYmFnIGlzIGVtcHR5LicgfVxuICB9XG5cbiAgLy8gRmV0Y2ggcHJvZHVjdHMgc2VydmVyLXNpZGUgdG8gcmVjb21wdXRlIHRvdGFscyDigJQgbmV2ZXIgdHJ1c3QgY2xpZW50IHByaWNlc1xuICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IGlkOiB7IGluOiBkYXRhLmxpbmVzLm1hcCgobCkgPT4gbC5wcm9kdWN0SWQpIH0gfSxcbiAgICBpbmNsdWRlOiB7IHZhcmlhbnRzOiB0cnVlLCBjYXRlZ29yeTogdHJ1ZSwgaW1hZ2VzOiB7IHRha2U6IDEsIG9yZGVyQnk6IHsgcG9zaXRpb246ICdhc2MnIH0gfSB9LFxuICB9KVxuXG4gIGxldCBzdWJ0b3RhbCA9IDBcbiAgY29uc3Qgb3JkZXJJdGVtc0RhdGE6IGFueVtdID0gW11cbiAgZm9yIChjb25zdCBsaW5lIG9mIGRhdGEubGluZXMpIHtcbiAgICBjb25zdCBwID0gcHJvZHVjdHMuZmluZCgocCkgPT4gcC5pZCA9PT0gbGluZS5wcm9kdWN0SWQpXG4gICAgaWYgKCFwKSBjb250aW51ZVxuICAgIGNvbnN0IHZhcmlhbnQgPSBsaW5lLnZhcmlhbnRJZCA/IHAudmFyaWFudHMuZmluZCgodikgPT4gdi5pZCA9PT0gbGluZS52YXJpYW50SWQpIDogdW5kZWZpbmVkXG4gICAgLy8gc3RvY2sgY2hlY2tcbiAgICBpZiAodmFyaWFudCkge1xuICAgICAgaWYgKHZhcmlhbnQuc3RvY2sgPCBsaW5lLnF1YW50aXR5KSB7XG4gICAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGBJbnN1ZmZpY2llbnQgc3RvY2sgZm9yICR7cC5uYW1lfSAoJHt2YXJpYW50LnNpemV9KS5gIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG90YWxTdG9jayA9IHAudmFyaWFudHMucmVkdWNlKChzLCB2KSA9PiBzICsgdi5zdG9jaywgMClcbiAgICAgIGlmICh0b3RhbFN0b2NrIDwgbGluZS5xdWFudGl0eSkge1xuICAgICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgSW5zdWZmaWNpZW50IHN0b2NrIGZvciAke3AubmFtZX0uYCB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHVuaXRQcmljZSA9IHZhcmlhbnQ/LnByaWNlID8/IHAuc2FsZVByaWNlID8/IHAucHJpY2VcbiAgICBjb25zdCB0b3RhbFByaWNlID0gdW5pdFByaWNlICogbGluZS5xdWFudGl0eVxuICAgIHN1YnRvdGFsICs9IHRvdGFsUHJpY2VcbiAgICBvcmRlckl0ZW1zRGF0YS5wdXNoKHtcbiAgICAgIHByb2R1Y3RJZDogcC5pZCxcbiAgICAgIHZhcmlhbnRJZDogdmFyaWFudD8uaWQsXG4gICAgICBwcm9kdWN0TmFtZTogcC5uYW1lLFxuICAgICAgcHJvZHVjdFNsdWc6IHAuc2x1ZyxcbiAgICAgIHByb2R1Y3RJbWFnZTogcC5pbWFnZXNbMF0/LnVybCxcbiAgICAgIHNpemU6IGxpbmUuc2l6ZSA/PyB2YXJpYW50Py5zaXplLFxuICAgICAgY29sb3I6IHZhcmlhbnQ/LmNvbG9yLFxuICAgICAgc2t1OiB2YXJpYW50Py5za3UgPz8gcC5za3UsXG4gICAgICB1bml0UHJpY2UsXG4gICAgICBxdWFudGl0eTogbGluZS5xdWFudGl0eSxcbiAgICAgIHRvdGFsUHJpY2UsXG4gICAgfSlcbiAgfVxuXG4gIGlmICghb3JkZXJJdGVtc0RhdGEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ05vIHZhbGlkIGl0ZW1zIGluIHlvdXIgYmFnLicgfVxuICB9XG5cbiAgLy8gQXBwbHkgY291cG9uIGlmIHByb3ZpZGVkXG4gIGxldCBkaXNjb3VudCA9IDBcbiAgaWYgKGRhdGEuY291cG9uQ29kZSkge1xuICAgIGNvbnN0IGNvdXBvbiA9IGF3YWl0IGRiLmNvdXBvbi5maW5kVW5pcXVlKHsgd2hlcmU6IHsgY29kZTogZGF0YS5jb3Vwb25Db2RlLnRvVXBwZXJDYXNlKCkgfSB9KVxuICAgIGlmIChjb3Vwb24gJiYgY291cG9uLmFjdGl2ZSAmJiAoIWNvdXBvbi5lbmRzQXQgfHwgY291cG9uLmVuZHNBdCA+IG5ldyBEYXRlKCkpKSB7XG4gICAgICBpZiAoY291cG9uLm1pbk9yZGVyICYmIHN1YnRvdGFsIDwgY291cG9uLm1pbk9yZGVyKSB7XG4gICAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGBDb3Vwb24gcmVxdWlyZXMgYSBtaW5pbXVtIG9yZGVyIG9mIOKCpiR7Y291cG9uLm1pbk9yZGVyLnRvTG9jYWxlU3RyaW5nKCl9LmAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvdXBvbi50eXBlID09PSAnUEVSQ0VOVEFHRScpIHtcbiAgICAgICAgZGlzY291bnQgPSAoc3VidG90YWwgKiBjb3Vwb24udmFsdWUpIC8gMTAwXG4gICAgICAgIGlmIChjb3Vwb24ubWF4RGlzY291bnQpIGRpc2NvdW50ID0gTWF0aC5taW4oZGlzY291bnQsIGNvdXBvbi5tYXhEaXNjb3VudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc2NvdW50ID0gY291cG9uLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gRGVsaXZlcnkgZmVlXG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIuYWRtaW5TZXR0aW5ncy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgY29uc3QgZGVsaXZlcnlGZWUgPSBjYWxjdWxhdGVEZWxpdmVyeUZlZShcbiAgICBzdWJ0b3RhbCAtIGRpc2NvdW50LFxuICAgIHNldHRpbmdzPy5kZWZhdWx0RGVsaXZlcnlGZWUgPz8gMjUwMCxcbiAgICBzZXR0aW5ncz8uZnJlZURlbGl2ZXJ5VGhyZXNob2xkID8/IDUwMDAwMCxcbiAgKVxuXG4gIGNvbnN0IHRvdGFsID0gTWF0aC5tYXgoMCwgc3VidG90YWwgLSBkaXNjb3VudCArIGRlbGl2ZXJ5RmVlKVxuXG4gIC8vIENyZWF0ZSBvcmRlclxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbigpXG4gIGNvbnN0IG9yZGVyTnVtYmVyID0gZ2VuZXJhdGVPcmRlck51bWJlcigpXG4gIGNvbnN0IHJlZmVyZW5jZSA9IGAke29yZGVyTnVtYmVyfS0ke0RhdGUubm93KCkudG9TdHJpbmcoMzYpfWBcblxuICBjb25zdCBvcmRlciA9IGF3YWl0IGRiLm9yZGVyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgb3JkZXJOdW1iZXIsXG4gICAgICB1c2VySWQ6IHNlc3Npb24/LnVzZXI/LmlkLFxuICAgICAgY3VzdG9tZXJOYW1lOiBkYXRhLmN1c3RvbWVyTmFtZSxcbiAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLnRvTG93ZXJDYXNlKCksXG4gICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgIHdoYXRzYXBwTnVtYmVyOiBkYXRhLndoYXRzYXBwTnVtYmVyLFxuICAgICAgc3RhdGU6IGRhdGEuc3RhdGUsXG4gICAgICBjaXR5OiBkYXRhLmNpdHksXG4gICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MsXG4gICAgICBkZWxpdmVyeUluc3RydWN0aW9uczogZGF0YS5kZWxpdmVyeUluc3RydWN0aW9ucyxcbiAgICAgIHN1YnRvdGFsLFxuICAgICAgZGVsaXZlcnlGZWUsXG4gICAgICBkaXNjb3VudCxcbiAgICAgIHRvdGFsLFxuICAgICAgY291cG9uQ29kZTogZGF0YS5jb3Vwb25Db2RlLFxuICAgICAgcGF5bWVudE1ldGhvZDogZGF0YS5wYXltZW50TWV0aG9kLFxuICAgICAgc3RhdHVzOiBkYXRhLnBheW1lbnRNZXRob2QgPT09ICdXSEFUU0FQUCcgPyAnUEVORElORycgOiAnUEVORElORycsXG4gICAgICBwYXltZW50U3RhdHVzOiAnUEVORElORycsXG4gICAgICBpdGVtczogeyBjcmVhdGU6IG9yZGVySXRlbXNEYXRhIH0sXG4gICAgICBzdGF0dXNIaXN0b3J5OiB7XG4gICAgICAgIGNyZWF0ZTogeyBzdGF0dXM6ICdQRU5ESU5HJywgbm90ZTogJ09yZGVyIHJlY2VpdmVkJyB9LFxuICAgICAgfSxcbiAgICAgIHBheW1lbnRzOiBkYXRhLnBheW1lbnRNZXRob2QgPT09ICdQQVlTVEFDSycgPyB7XG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIHByb3ZpZGVyOiAnUEFZU1RBQ0snLFxuICAgICAgICAgIHJlZmVyZW5jZSxcbiAgICAgICAgICBhbW91bnQ6IHRvdGFsLFxuICAgICAgICAgIHN0YXR1czogJ1BFTkRJTkcnLFxuICAgICAgICB9LFxuICAgICAgfSA6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIGluY2x1ZGU6IHsgaXRlbXM6IHRydWUgfSxcbiAgfSlcblxuICAvLyDilIDilIAgVHJhbnNhY3Rpb25hbCBlbWFpbHM6IGN1c3RvbWVyIGNvbmZpcm1hdGlvbiArIG93bmVyIGFsZXJ0IOKUgOKUgFxuICAvLyBzZW5kRW1haWwgbmV2ZXIgdGhyb3dzIGFuZCBza2lwcyBpbnN0YW50bHkgd2hlbiBSRVNFTkRfQVBJX0tFWSBpcyBub3RcbiAgLy8gY29uZmlndXJlZCwgc28gY2hlY2tvdXQgY2Fubm90IGJlIHNsb3dlZCBvciBicm9rZW4gYnkgZW1haWwuXG4gIHRyeSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgc2VuZE9yZGVyQ29uZmlybWF0aW9uKFxuICAgICAgICBvcmRlciBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXIsXG4gICAgICAgIG9yZGVyLml0ZW1zIGFzIHVua25vd24gYXMgRW1haWxPcmRlckl0ZW1bXSxcbiAgICAgICAgc2V0dGluZ3M/LnN1cHBvcnRFbWFpbCA/PyB1bmRlZmluZWQsXG4gICAgICApLFxuICAgICAgbm90aWZ5QWRtaW5OZXdPcmRlcihvcmRlciBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXIsIG9yZGVyLml0ZW1zIGFzIHVua25vd24gYXMgRW1haWxPcmRlckl0ZW1bXSwgc2V0dGluZ3M/LnN1cHBvcnRFbWFpbCksXG4gICAgXSlcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignW2VtYWlsXSBvcmRlciBjb25maXJtYXRpb24gZmxvdyBlcnJvcjonLCBlPy5tZXNzYWdlKVxuICB9XG5cbiAgLy8g4pSA4pSAIFNNUyBub3RpZmljYXRpb24gdG8gdGhlIHN0b3JlIG93bmVyIOKUgOKUgFxuICAvLyBCZXN0LWVmZm9ydCDigJQgbmV2ZXIgYmxvY2tzIHRoZSBvcmRlci4gVXNlcyBUZXJtaWkgU01TIEFQSS5cbiAgLy8gVGhlIFNNUyBpcyBzZW50IG9ubHkgd2hlbiB0aGUgb3JkZXIgbWVldHMgdGhlIGNvbmZpcm1hdGlvbiBjcml0ZXJpYVxuICAvLyAob3JkZXIgd2FzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIOKAlCBwYXltZW50IHN0YXR1cyBpcyBoYW5kbGVkIHNlcGFyYXRlbHlcbiAgLy8gYnkgdGhlIFBheXN0YWNrIHdlYmhvb2sgZm9yIG9ubGluZSBwYXltZW50cykuXG4gIHRyeSB7XG4gICAgYXdhaXQgbm90aWZ5T3duZXJOZXdPcmRlcihcbiAgICAgIHtcbiAgICAgICAgb3JkZXJOdW1iZXI6IG9yZGVyLm9yZGVyTnVtYmVyLFxuICAgICAgICBjdXN0b21lck5hbWU6IG9yZGVyLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgY3VzdG9tZXJQaG9uZTogb3JkZXIucGhvbmUsXG4gICAgICAgIGl0ZW1zOiBvcmRlci5pdGVtcy5tYXAoKGl0OiBhbnkpID0+ICh7XG4gICAgICAgICAgcHJvZHVjdE5hbWU6IGl0LnByb2R1Y3ROYW1lLFxuICAgICAgICAgIHF1YW50aXR5OiBpdC5xdWFudGl0eSxcbiAgICAgICAgfSkpLFxuICAgICAgICB0b3RhbDogb3JkZXIudG90YWwsXG4gICAgICAgIHBheW1lbnRTdGF0dXM6IG9yZGVyLnBheW1lbnRTdGF0dXMsXG4gICAgICAgIHBheW1lbnRNZXRob2Q6IG9yZGVyLnBheW1lbnRNZXRob2QsXG4gICAgICB9LFxuICAgICAgc2V0dGluZ3M/LnN1cHBvcnRQaG9uZSxcbiAgICApXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tzbXNdIG9yZGVyIG5vdGlmaWNhdGlvbiBlcnJvcjonLCBlPy5tZXNzYWdlKVxuICB9XG5cbiAgLy8gRm9yIFdoYXRzQXBwIG9yZGVycywgcmV0dXJuIHRoZSBvcmRlciBudW1iZXIgc28gdGhlIGNsaWVudCBjYW4gY29tcG9zZSBhXG4gIC8vIFdoYXRzQXBwIG1lc3NhZ2UuIE5vIHBheW1lbnQgaW5pdGlhbGl6YXRpb24gbmVlZGVkLlxuICBpZiAoZGF0YS5wYXltZW50TWV0aG9kID09PSAnV0hBVFNBUFAnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiB0cnVlLFxuICAgICAgb3JkZXJOdW1iZXI6IG9yZGVyLm9yZGVyTnVtYmVyLFxuICAgICAgcmVmZXJlbmNlLFxuICAgICAgdG90YWwsXG4gICAgfVxuICB9XG5cbiAgLy8gRm9yIFBheXN0YWNrOiBpbml0aWFsaXplIHRyYW5zYWN0aW9uXG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYCR7cHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnfS9jaGVja291dC92ZXJpZnk/b3JkZXI9JHtvcmRlci5vcmRlck51bWJlcn1gXG4gIGNvbnN0IGluaXQgPSBhd2FpdCBpbml0aWFsaXplUGF5c3RhY2tUcmFuc2FjdGlvbih7XG4gICAgZW1haWw6IGRhdGEuZW1haWwsXG4gICAgYW1vdW50OiB0b3RhbCxcbiAgICByZWZlcmVuY2UsXG4gICAgY2FsbGJhY2tfdXJsOiBjYWxsYmFja1VybCxcbiAgICBtZXRhZGF0YToge1xuICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkLFxuICAgICAgb3JkZXJfbnVtYmVyOiBvcmRlci5vcmRlck51bWJlcixcbiAgICAgIGN1c3RvbWVyX25hbWU6IGRhdGEuY3VzdG9tZXJOYW1lLFxuICAgICAgY3VzdG9tX2ZpZWxkczogW1xuICAgICAgICB7IGRpc3BsYXlfbmFtZTogJ09yZGVyIE51bWJlcicsIHZhcmlhYmxlX25hbWU6ICdvcmRlcl9udW1iZXInLCB2YWx1ZTogb3JkZXIub3JkZXJOdW1iZXIgfSxcbiAgICAgICAgeyBkaXNwbGF5X25hbWU6ICdJdGVtcycsIHZhcmlhYmxlX25hbWU6ICdpdGVtcycsIHZhbHVlOiBgJHtvcmRlckl0ZW1zRGF0YS5sZW5ndGh9IGl0ZW0ocylgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0pXG5cbiAgaWYgKCFpbml0LnN0YXR1cykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGluaXQubWVzc2FnZSB8fCAnQ291bGQgbm90IGluaXRpYWxpc2UgcGF5bWVudC4nIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgb3JkZXJOdW1iZXI6IG9yZGVyLm9yZGVyTnVtYmVyLFxuICAgIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCxcbiAgICByZWZlcmVuY2UsXG4gICAgdG90YWwsXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBQQVlNRU5UIFZFUklGSUNBVElPTiAoY2FsbGVkIGZyb20gL2NoZWNrb3V0L3ZlcmlmeSlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBWZXJpZnlSZXN1bHQgPVxuICB8IHsgb2s6IHRydWU7IG9yZGVyTnVtYmVyOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyB0b3RhbDogbnVtYmVyIH1cbiAgfCB7IG9rOiBmYWxzZTsgZXJyb3I6IHN0cmluZyB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlQYXltZW50KHJlZmVyZW5jZTogc3RyaW5nKTogUHJvbWlzZTxWZXJpZnlSZXN1bHQ+IHtcbiAgaWYgKCFyZWZlcmVuY2UpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNaXNzaW5nIHBheW1lbnQgcmVmZXJlbmNlLicgfVxuXG4gIGNvbnN0IHBheW1lbnQgPSBhd2FpdCBkYi5wYXltZW50LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHJlZmVyZW5jZSB9LFxuICAgIGluY2x1ZGU6IHsgb3JkZXI6IHsgaW5jbHVkZTogeyBpdGVtczogdHJ1ZSB9IH0gfSxcbiAgfSlcbiAgaWYgKCFwYXltZW50KSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGF5bWVudCBub3QgZm91bmQuJyB9XG5cbiAgaWYgKHBheW1lbnQudmVyaWZpZWQpIHtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgb3JkZXJOdW1iZXI6IHBheW1lbnQub3JkZXIub3JkZXJOdW1iZXIsIHN0YXR1czogcGF5bWVudC5vcmRlci5zdGF0dXMsIHRvdGFsOiBwYXltZW50Lm9yZGVyLnRvdGFsIH1cbiAgfVxuXG4gIGNvbnN0IHZlcmlmeVJlc3AgPSBhd2FpdCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uKHJlZmVyZW5jZSlcbiAgaWYgKCF2ZXJpZnlSZXNwIHx8ICF2ZXJpZnlSZXNwLnN0YXR1cykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdQYXltZW50IHZlcmlmaWNhdGlvbiBmYWlsZWQuJyB9XG4gIH1cblxuICBjb25zdCBpc01vY2sgPSBwcm9jZXNzLmVudi5QQVlTVEFDS19TRUNSRVRfS0VZID09PSAnc2tfdGVzdF94JyB8fCAhcHJvY2Vzcy5lbnYuUEFZU1RBQ0tfU0VDUkVUX0tFWVxuICBjb25zdCBwYWlkQW1vdW50ID0gdmVyaWZ5UmVzcC5kYXRhLmFtb3VudCAvIDEwMCAvLyBrb2JvIOKGkiBuYWlyYVxuXG4gIC8vIFZlcmlmeSBhbW91bnQgbWF0Y2hlcyAoc2tpcCBmb3IgbW9jaylcbiAgaWYgKCFpc01vY2sgJiYgTWF0aC5hYnMocGFpZEFtb3VudCAtIHBheW1lbnQuYW1vdW50KSA+IDEpIHtcbiAgICBhd2FpdCBkYi5wYXltZW50LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGF5bWVudC5pZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBzdGF0dXM6ICdGQUlMRUQnLFxuICAgICAgICByYXdSZXNwb25zZTogSlNPTi5zdHJpbmdpZnkodmVyaWZ5UmVzcCksXG4gICAgICB9LFxuICAgIH0pXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1BheW1lbnQgYW1vdW50IG1pc21hdGNoLicgfVxuICB9XG5cbiAgaWYgKHZlcmlmeVJlc3AuZGF0YS5zdGF0dXMgIT09ICdzdWNjZXNzJyAmJiAhaXNNb2NrKSB7XG4gICAgYXdhaXQgZGIucGF5bWVudC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHBheW1lbnQuaWQgfSxcbiAgICAgIGRhdGE6IHsgc3RhdHVzOiAnRkFJTEVEJywgcmF3UmVzcG9uc2U6IEpTT04uc3RyaW5naWZ5KHZlcmlmeVJlc3ApIH0sXG4gICAgfSlcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGF5bWVudCB3YXMgbm90IHN1Y2Nlc3NmdWwuJyB9XG4gIH1cblxuICAvLyBNYXJrIHBheW1lbnQgdmVyaWZpZWQg4oCUIFRISVMgaXMgdGhlIG9ubHkgcGxhY2UgYW4gb3JkZXIgYmVjb21lcyBwYWlkXG4gIGF3YWl0IGRiLiR0cmFuc2FjdGlvbihhc3luYyAodHgpID0+IHtcbiAgICBhd2FpdCB0eC5wYXltZW50LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGF5bWVudC5pZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBzdGF0dXM6ICdTVUNDRVNTJyxcbiAgICAgICAgdmVyaWZpZWQ6IHRydWUsXG4gICAgICAgIHBhaWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgcmF3UmVzcG9uc2U6IEpTT04uc3RyaW5naWZ5KHZlcmlmeVJlc3ApLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgYXdhaXQgdHgub3JkZXIudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXltZW50Lm9yZGVySWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3RhdHVzOiAnUEFJRCcsXG4gICAgICAgIHBheW1lbnRTdGF0dXM6ICdTVUNDRVNTJyxcbiAgICAgICAgc3RhdHVzSGlzdG9yeToge1xuICAgICAgICAgIGNyZWF0ZTogeyBzdGF0dXM6ICdQQUlEJywgbm90ZTogJ1BheW1lbnQgY29uZmlybWVkJyB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgLy8gRGVjcmVtZW50IHN0b2NrIGZvciBlYWNoIG9yZGVyIGl0ZW1cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcGF5bWVudC5vcmRlci5pdGVtcykge1xuICAgICAgaWYgKGl0ZW0udmFyaWFudElkKSB7XG4gICAgICAgIGF3YWl0IHR4LnByb2R1Y3RWYXJpYW50LnVwZGF0ZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGl0ZW0udmFyaWFudElkIH0sXG4gICAgICAgICAgZGF0YTogeyBzdG9jazogeyBkZWNyZW1lbnQ6IGl0ZW0ucXVhbnRpdHkgfSB9LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyDilIDilIAgUGF5bWVudCByZWNlaXB0IGVtYWlsIChndWFyZGVkOiBvbmx5IHJlYWNoZWQgd2hlbiBwYXltZW50IHdhcyBub3RcbiAgLy8gcHJldmlvdXNseSB2ZXJpZmllZCwgc28gZHVwbGljYXRlIHZlcmlmaWNhdGlvbnMgbmV2ZXIgZG91YmxlLXNlbmQpIOKUgOKUgFxuICB0cnkge1xuICAgIGNvbnN0IHJlY2VpcHRTZXR0aW5ncyA9IGF3YWl0IGRiLmFkbWluU2V0dGluZ3MuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAnc2luZ2xldG9uJyB9IH0pXG4gICAgYXdhaXQgc2VuZFBheW1lbnRSZWNlaXB0KFxuICAgICAgcGF5bWVudC5vcmRlciBhcyB1bmtub3duIGFzIEVtYWlsT3JkZXIsXG4gICAgICBwYXltZW50Lm9yZGVyLml0ZW1zIGFzIHVua25vd24gYXMgRW1haWxPcmRlckl0ZW1bXSxcbiAgICAgIHsgcmVmZXJlbmNlLCBwYWlkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgIHJlY2VpcHRTZXR0aW5ncz8uc3VwcG9ydEVtYWlsID8/IHVuZGVmaW5lZCxcbiAgICApXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tlbWFpbF0gcmVjZWlwdCBmbG93IGVycm9yOicsIGU/Lm1lc3NhZ2UpXG4gIH1cblxuICByZXR1cm4geyBvazogdHJ1ZSwgb3JkZXJOdW1iZXI6IHBheW1lbnQub3JkZXIub3JkZXJOdW1iZXIsIHN0YXR1czogJ1BBSUQnLCB0b3RhbDogcGF5bWVudC5vcmRlci50b3RhbCB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVFJBQ0sgT1JERVIgKHB1YmxpYylcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJhY2tPcmRlcihvcmRlck51bWJlcjogc3RyaW5nKSB7XG4gIGlmICghb3JkZXJOdW1iZXIpIHJldHVybiBudWxsXG4gIGNvbnN0IG9yZGVyID0gYXdhaXQgZGIub3JkZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgb3JkZXJOdW1iZXI6IG9yZGVyTnVtYmVyLnRyaW0oKS50b1VwcGVyQ2FzZSgpIH0sXG4gICAgaW5jbHVkZToge1xuICAgICAgaXRlbXM6IHRydWUsXG4gICAgICBzdGF0dXNIaXN0b3J5OiB7IG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnYXNjJyB9IH0sXG4gICAgfSxcbiAgfSlcbiAgcmV0dXJuIG9yZGVyXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQURNSU46IFBST0RVQ1QgQ1JVRFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IHByb2R1Y3RTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIpLFxuICBzbHVnOiB6LnN0cmluZygpLm1pbigyKSxcbiAgZGVzY3JpcHRpb246IHouc3RyaW5nKCkubWluKDEwKSxcbiAgZmVhdHVyZXM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbWF0ZXJpYWw6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZml0OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGNhcmU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2t1OiB6LnN0cmluZygpLm1pbigyKSxcbiAgcHJpY2U6IHouY29lcmNlLm51bWJlcigpLm1pbigwKSxcbiAgc2FsZVByaWNlOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICBjb3N0UHJpY2U6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gIGNhdGVnb3J5SWQ6IHouc3RyaW5nKCkubWluKDEpLFxuICBicmFuZElkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgdGFnczogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBmZWF0dXJlZDogei5jb2VyY2UuYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIHB1Ymxpc2hlZDogei5jb2VyY2UuYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIC8vIEV4cGxpY2l0IFwiT3V0IG9mIFN0b2NrXCIgZmxhZyDigJQgaW5kZXBlbmRlbnQgb2YgdmFyaWFudCBzdG9jayBzdW1zXG4gIG91dE9mU3RvY2s6IHouY29lcmNlLmJvb2xlYW4oKS5vcHRpb25hbCgpLFxuICAvLyBPcHRpb25hbCBzdGF0dXMgb3ZlcnJpZGUg4oCUIHVzZWQgYnkgdGhlIFNlbmQtdG8tVHJhc2ggZmxvd1xuICBzdGF0dXM6IHouZW51bShbJ0FDVElWRScsICdEUkFGVCcsICdBUkNISVZFRCcsICdESVNDT05USU5VRUQnXSkub3B0aW9uYWwoKSxcbiAgLy8gUGh5c2ljYWxcbiAgd2VpZ2h0S2c6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gIGxlbmd0aENtOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICB3aWR0aENtOiB6LmNvZXJjZS5udW1iZXIoKS5vcHRpb25hbCgpLFxuICBoZWlnaHRDbTogei5jb2VyY2UubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgLy8gU2hpcHBpbmdcbiAgZnJlZVNoaXBwaW5nOiB6LmNvZXJjZS5ib29sZWFuKCkub3B0aW9uYWwoKSxcbiAgc2hpcHBpbmdDbGFzczogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAvLyBTRU9cbiAgc2VvVGl0bGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2VvRGVzY3JpcHRpb246IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2VvS2V5d29yZHM6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgaW1hZ2VzOiB6LmFycmF5KHouc3RyaW5nKCkpLm1pbigxKSxcbiAgdmFyaWFudHM6IHouYXJyYXkoei5vYmplY3Qoe1xuICAgIGlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgc2l6ZTogei5zdHJpbmcoKSxcbiAgICBza3U6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICBiYXJjb2RlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgcHJpY2U6IHouY29lcmNlLm51bWJlcigpLm9wdGlvbmFsKCksXG4gICAgc3RvY2s6IHouY29lcmNlLm51bWJlcigpLmludCgpLm1pbigwKSxcbiAgICBsb3dTdG9ja1RocmVzaG9sZDogei5jb2VyY2UubnVtYmVyKCkuaW50KCkubWluKDApLm9wdGlvbmFsKCksXG4gICAgaW1hZ2VVcmw6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICB3ZWlnaHRLZzogei5jb2VyY2UubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgfSkpLFxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluQ3JlYXRlUHJvZHVjdChpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAvLyBBdXRoICsgcGVybWlzc2lvbiBnYXRlXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbigncHJvZHVjdC5jcmVhdGUnKVxuXG4gIGNvbnN0IHBhcnNlZCA9IHByb2R1Y3RTY2hlbWEuc2FmZVBhcnNlKGlucHV0KVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgLy8gU3VyZmFjZSB0aGUgRlVMTCBsaXN0IG9mIHZhbGlkYXRpb24gZXJyb3JzIOKAlCBub3QganVzdCB0aGUgZmlyc3RcbiAgICBjb25zdCBpc3N1ZXMgPSBwYXJzZWQuZXJyb3IuaXNzdWVzLm1hcCgoaSkgPT4gYCR7aS5wYXRoLmpvaW4oJy4nKSB8fCAncm9vdCd9OiAke2kubWVzc2FnZX1gKS5qb2luKCcgwrcgJylcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgVmFsaWRhdGlvbiBmYWlsZWQ6ICR7aXNzdWVzfWAgfVxuICB9XG4gIGNvbnN0IGRhdGEgPSBwYXJzZWQuZGF0YVxuICB0cnkge1xuICAgIC8vIFByZS1jaGVjayBmb3IgU0tVIHVuaXF1ZW5lc3Mg4oCUIGZhaWwgd2l0aCBhIGNsZWFyIG1lc3NhZ2UgaW5zdGVhZCBvZiBhIFByaXNtYSBlcnJvclxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZGIucHJvZHVjdC5maW5kVW5pcXVlKHsgd2hlcmU6IHsgc2t1OiBkYXRhLnNrdSB9LCBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUgfSB9KVxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYEEgcHJvZHVjdCB3aXRoIFNLVSBcIiR7ZGF0YS5za3V9XCIgYWxyZWFkeSBleGlzdHMgKCR7ZXhpc3RpbmcubmFtZX0pLiBVc2UgYSBkaWZmZXJlbnQgU0tVLmAgfVxuICAgIH1cbiAgICBjb25zdCBleGlzdGluZ1NsdWcgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRVbmlxdWUoeyB3aGVyZTogeyBzbHVnOiBkYXRhLnNsdWcgfSwgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlIH0gfSlcbiAgICBpZiAoZXhpc3RpbmdTbHVnKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgQSBwcm9kdWN0IHdpdGggc2x1ZyBcIiR7ZGF0YS5zbHVnfVwiIGFscmVhZHkgZXhpc3RzICgke2V4aXN0aW5nU2x1Zy5uYW1lfSkuIENoYW5nZSB0aGUgc2x1Zy5gIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVkID0gYXdhaXQgZGIucHJvZHVjdC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIHNsdWc6IGRhdGEuc2x1ZyxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgIGZlYXR1cmVzOiBkYXRhLmZlYXR1cmVzLFxuICAgICAgICBtYXRlcmlhbDogZGF0YS5tYXRlcmlhbCxcbiAgICAgICAgZml0OiBkYXRhLmZpdCxcbiAgICAgICAgY2FyZTogZGF0YS5jYXJlLFxuICAgICAgICBza3U6IGRhdGEuc2t1LFxuICAgICAgICBwcmljZTogZGF0YS5wcmljZSxcbiAgICAgICAgc2FsZVByaWNlOiBkYXRhLnNhbGVQcmljZSxcbiAgICAgICAgY29zdFByaWNlOiBkYXRhLmNvc3RQcmljZSxcbiAgICAgICAgY2F0ZWdvcnlJZDogZGF0YS5jYXRlZ29yeUlkLFxuICAgICAgICBicmFuZElkOiBkYXRhLmJyYW5kSWQgfHwgbnVsbCxcbiAgICAgICAgdGFnczogZGF0YS50YWdzLFxuICAgICAgICBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCA/PyBmYWxzZSxcbiAgICAgICAgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCA/PyB0cnVlLFxuICAgICAgICBvdXRPZlN0b2NrOiBkYXRhLm91dE9mU3RvY2sgPz8gZmFsc2UsXG4gICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMgPz8gJ0FDVElWRScsXG4gICAgICAgIHdlaWdodEtnOiBkYXRhLndlaWdodEtnLFxuICAgICAgICBsZW5ndGhDbTogZGF0YS5sZW5ndGhDbSxcbiAgICAgICAgd2lkdGhDbTogZGF0YS53aWR0aENtLFxuICAgICAgICBoZWlnaHRDbTogZGF0YS5oZWlnaHRDbSxcbiAgICAgICAgZnJlZVNoaXBwaW5nOiBkYXRhLmZyZWVTaGlwcGluZyxcbiAgICAgICAgc2hpcHBpbmdDbGFzczogZGF0YS5zaGlwcGluZ0NsYXNzLFxuICAgICAgICBzZW9UaXRsZTogZGF0YS5zZW9UaXRsZSxcbiAgICAgICAgc2VvRGVzY3JpcHRpb246IGRhdGEuc2VvRGVzY3JpcHRpb24sXG4gICAgICAgIHNlb0tleXdvcmRzOiBkYXRhLnNlb0tleXdvcmRzLFxuICAgICAgICBpbWFnZXM6IHtcbiAgICAgICAgICBjcmVhdGU6IGRhdGEuaW1hZ2VzLm1hcCgodXJsLCBpKSA9PiAoeyB1cmwsIGFsdFRleHQ6IGRhdGEubmFtZSwgcG9zaXRpb246IGkgfSkpLFxuICAgICAgICB9LFxuICAgICAgICB2YXJpYW50czoge1xuICAgICAgICAgIGNyZWF0ZTogZGF0YS52YXJpYW50cy5tYXAoKHYpID0+ICh7XG4gICAgICAgICAgICBzaXplOiB2LnNpemUsXG4gICAgICAgICAgICBza3U6IHYuc2t1ID8/IGAke2RhdGEuc2t1fS0ke3Yuc2l6ZX1gLFxuICAgICAgICAgICAgYmFyY29kZTogdi5iYXJjb2RlLFxuICAgICAgICAgICAgcHJpY2U6IHYucHJpY2UsXG4gICAgICAgICAgICBzdG9jazogdi5zdG9jayxcbiAgICAgICAgICAgIGxvd1N0b2NrVGhyZXNob2xkOiB2Lmxvd1N0b2NrVGhyZXNob2xkID8/IDUsXG4gICAgICAgICAgICBpbWFnZVVybDogdi5pbWFnZVVybCxcbiAgICAgICAgICAgIHdlaWdodEtnOiB2LndlaWdodEtnLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7IGltYWdlczogdHJ1ZSwgdmFyaWFudHM6IHRydWUgfSxcbiAgICB9KVxuXG4gICAgLy8gQXVkaXQgbG9nXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3Byb2R1Y3QuY3JlYXRlJyxcbiAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgIGVudGl0eUlkOiBjcmVhdGVkLmlkLFxuICAgICAgYWZ0ZXI6IHsgbmFtZTogY3JlYXRlZC5uYW1lLCBzbHVnOiBjcmVhdGVkLnNsdWcsIHNrdTogY3JlYXRlZC5za3UsIHByaWNlOiBjcmVhdGVkLnByaWNlLCBzYWxlUHJpY2U6IGNyZWF0ZWQuc2FsZVByaWNlIH0sXG4gICAgICBkZXNjcmlwdGlvbjogYENyZWF0ZWQgcHJvZHVjdCBcIiR7Y3JlYXRlZC5uYW1lfVwiIChTS1UgJHtjcmVhdGVkLnNrdX0sIOKCpiR7Y3JlYXRlZC5wcmljZS50b0xvY2FsZVN0cmluZygpfSlgLFxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlLCBpZDogY3JlYXRlZC5pZCB9XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIC8vIFVud3JhcCBQcmlzbWEgZXJyb3JzIHRvIGJlIHVzZWZ1bCB0byB0aGUgYWRtaW5cbiAgICBsZXQgbXNnID0gZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IGNyZWF0ZSBwcm9kdWN0J1xuICAgIGlmIChlPy5jb2RlID09PSAnUDIwMDInKSB7XG4gICAgICBtc2cgPSBgVW5pcXVlIGNvbnN0cmFpbnQgZmFpbGVkIG9uICR7KGU/Lm1ldGE/LnRhcmdldCBhcyBzdHJpbmdbXSk/LmpvaW4oJywgJykgPz8gJ3Vua25vd24gZmllbGQnfS4gVGhpcyB2YWx1ZSBhbHJlYWR5IGV4aXN0cy5gXG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IG1zZyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluVXBkYXRlUHJvZHVjdChpZDogc3RyaW5nLCBpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAvLyBBdXRoICsgcGVybWlzc2lvbiBnYXRlXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlU3RhZmZXaXRoUGVybWlzc2lvbigncHJvZHVjdC51cGRhdGUnKVxuXG4gIGNvbnN0IHBhcnNlZCA9IHByb2R1Y3RTY2hlbWEuc2FmZVBhcnNlKGlucHV0KVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgY29uc3QgaXNzdWVzID0gcGFyc2VkLmVycm9yLmlzc3Vlcy5tYXAoKGkpID0+IGAke2kucGF0aC5qb2luKCcuJykgfHwgJ3Jvb3QnfTogJHtpLm1lc3NhZ2V9YCkuam9pbignIMK3ICcpXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYFZhbGlkYXRpb24gZmFpbGVkOiAke2lzc3Vlc31gIH1cbiAgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcbiAgdHJ5IHtcbiAgICAvLyBGZXRjaCBleGlzdGluZyBmb3IgYXVkaXQgZGlmZlxuICAgIGNvbnN0IGJlZm9yZSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgaW5jbHVkZTogeyBpbWFnZXM6IHRydWUsIHZhcmlhbnRzOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoIWJlZm9yZSkge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Byb2R1Y3Qgbm90IGZvdW5kJyB9XG4gICAgfVxuXG4gICAgLy8gUHJlLWNoZWNrIGZvciBTS1UgdW5pcXVlbmVzcyDigJQgbWFrZSBzdXJlIHdlJ3JlIG5vdCBjb2xsaWRpbmcgd2l0aCBhbm90aGVyIHByb2R1Y3RcbiAgICBpZiAoZGF0YS5za3UgIT09IGJlZm9yZS5za3UpIHtcbiAgICAgIGNvbnN0IHNrdUNvbGxpc2lvbiA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IHNrdTogZGF0YS5za3UgfSwgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlIH0gfSlcbiAgICAgIGlmIChza3VDb2xsaXNpb24gJiYgc2t1Q29sbGlzaW9uLmlkICE9PSBpZCkge1xuICAgICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBgQSBkaWZmZXJlbnQgcHJvZHVjdCAoJHtza3VDb2xsaXNpb24ubmFtZX0pIGFscmVhZHkgdXNlcyBTS1UgXCIke2RhdGEuc2t1fVwiLmAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YS5zbHVnICE9PSBiZWZvcmUuc2x1Zykge1xuICAgICAgY29uc3Qgc2x1Z0NvbGxpc2lvbiA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IHNsdWc6IGRhdGEuc2x1ZyB9LCBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUgfSB9KVxuICAgICAgaWYgKHNsdWdDb2xsaXNpb24gJiYgc2x1Z0NvbGxpc2lvbi5pZCAhPT0gaWQpIHtcbiAgICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogYEEgZGlmZmVyZW50IHByb2R1Y3QgKCR7c2x1Z0NvbGxpc2lvbi5uYW1lfSkgYWxyZWFkeSB1c2VzIHNsdWcgXCIke2RhdGEuc2x1Z31cIi5gIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBhd2FpdCB0eC5wcm9kdWN0LnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgc2x1ZzogZGF0YS5zbHVnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGZlYXR1cmVzOiBkYXRhLmZlYXR1cmVzLFxuICAgICAgICAgIG1hdGVyaWFsOiBkYXRhLm1hdGVyaWFsLFxuICAgICAgICAgIGZpdDogZGF0YS5maXQsXG4gICAgICAgICAgY2FyZTogZGF0YS5jYXJlLFxuICAgICAgICAgIHNrdTogZGF0YS5za3UsXG4gICAgICAgICAgcHJpY2U6IGRhdGEucHJpY2UsXG4gICAgICAgICAgc2FsZVByaWNlOiBkYXRhLnNhbGVQcmljZSxcbiAgICAgICAgICBjb3N0UHJpY2U6IGRhdGEuY29zdFByaWNlLFxuICAgICAgICAgIGNhdGVnb3J5SWQ6IGRhdGEuY2F0ZWdvcnlJZCxcbiAgICAgICAgICBicmFuZElkOiBkYXRhLmJyYW5kSWQgfHwgbnVsbCxcbiAgICAgICAgICB0YWdzOiBkYXRhLnRhZ3MsXG4gICAgICAgICAgZmVhdHVyZWQ6IGRhdGEuZmVhdHVyZWQgPz8gZmFsc2UsXG4gICAgICAgICAgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCA/PyB0cnVlLFxuICAgICAgICAgIG91dE9mU3RvY2s6IGRhdGEub3V0T2ZTdG9jayA/PyBmYWxzZSxcbiAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSBzdGF0dXMgaWYgZXhwbGljaXRseSBwcm92aWRlZCAoZS5nLiBTZW5kLXRvLVRyYXNoIGZsb3cpXG4gICAgICAgICAgLi4uKGRhdGEuc3RhdHVzID8geyBzdGF0dXM6IGRhdGEuc3RhdHVzIH0gOiB7fSksXG4gICAgICAgICAgd2VpZ2h0S2c6IGRhdGEud2VpZ2h0S2csXG4gICAgICAgICAgbGVuZ3RoQ206IGRhdGEubGVuZ3RoQ20sXG4gICAgICAgICAgd2lkdGhDbTogZGF0YS53aWR0aENtLFxuICAgICAgICAgIGhlaWdodENtOiBkYXRhLmhlaWdodENtLFxuICAgICAgICAgIGZyZWVTaGlwcGluZzogZGF0YS5mcmVlU2hpcHBpbmcsXG4gICAgICAgICAgc2hpcHBpbmdDbGFzczogZGF0YS5zaGlwcGluZ0NsYXNzLFxuICAgICAgICAgIHNlb1RpdGxlOiBkYXRhLnNlb1RpdGxlLFxuICAgICAgICAgIHNlb0Rlc2NyaXB0aW9uOiBkYXRhLnNlb0Rlc2NyaXB0aW9uLFxuICAgICAgICAgIHNlb0tleXdvcmRzOiBkYXRhLnNlb0tleXdvcmRzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC8vIFJlcGxhY2UgaW1hZ2VzXG4gICAgICBhd2FpdCB0eC5wcm9kdWN0SW1hZ2UuZGVsZXRlTWFueSh7IHdoZXJlOiB7IHByb2R1Y3RJZDogaWQgfSB9KVxuICAgICAgYXdhaXQgdHgucHJvZHVjdEltYWdlLmNyZWF0ZU1hbnkoe1xuICAgICAgICBkYXRhOiBkYXRhLmltYWdlcy5tYXAoKHVybCwgaSkgPT4gKHsgdXJsLCBhbHRUZXh0OiBkYXRhLm5hbWUsIHBvc2l0aW9uOiBpLCBwcm9kdWN0SWQ6IGlkIH0pKSxcbiAgICAgIH0pXG4gICAgICAvLyBSZXBsYWNlIHZhcmlhbnRzIChzaW1wbGUgYXBwcm9hY2gg4oCUIGNvdWxkIGJlIGltcHJvdmVkIGZvciBkaWZmaW5nKVxuICAgICAgYXdhaXQgdHgucHJvZHVjdFZhcmlhbnQuZGVsZXRlTWFueSh7IHdoZXJlOiB7IHByb2R1Y3RJZDogaWQgfSB9KVxuICAgICAgYXdhaXQgdHgucHJvZHVjdFZhcmlhbnQuY3JlYXRlTWFueSh7XG4gICAgICAgIGRhdGE6IGRhdGEudmFyaWFudHMubWFwKCh2KSA9PiAoe1xuICAgICAgICAgIHByb2R1Y3RJZDogaWQsXG4gICAgICAgICAgc2l6ZTogdi5zaXplLFxuICAgICAgICAgIHNrdTogdi5za3UgPz8gYCR7ZGF0YS5za3V9LSR7di5zaXplfWAsXG4gICAgICAgICAgYmFyY29kZTogdi5iYXJjb2RlLFxuICAgICAgICAgIHByaWNlOiB2LnByaWNlLFxuICAgICAgICAgIHN0b2NrOiB2LnN0b2NrLFxuICAgICAgICAgIGxvd1N0b2NrVGhyZXNob2xkOiB2Lmxvd1N0b2NrVGhyZXNob2xkID8/IDUsXG4gICAgICAgICAgaW1hZ2VVcmw6IHYuaW1hZ2VVcmwsXG4gICAgICAgICAgd2VpZ2h0S2c6IHYud2VpZ2h0S2csXG4gICAgICAgIH0pKSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIEF1ZGl0IGxvZ1xuICAgIGlmIChiZWZvcmUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmQ2hhbmdlZEZpZWxkcyhcbiAgICAgICAgeyBuYW1lOiBiZWZvcmUubmFtZSwgcHJpY2U6IGJlZm9yZS5wcmljZSwgc2FsZVByaWNlOiBiZWZvcmUuc2FsZVByaWNlLCBmZWF0dXJlZDogYmVmb3JlLmZlYXR1cmVkLCBwdWJsaXNoZWQ6IGJlZm9yZS5wdWJsaXNoZWQsIHNrdTogYmVmb3JlLnNrdSwgb3V0T2ZTdG9jazogYmVmb3JlLm91dE9mU3RvY2sgfSxcbiAgICAgICAgeyBuYW1lOiBkYXRhLm5hbWUsIHByaWNlOiBkYXRhLnByaWNlLCBzYWxlUHJpY2U6IGRhdGEuc2FsZVByaWNlLCBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCwgcHVibGlzaGVkOiBkYXRhLnB1Ymxpc2hlZCwgc2t1OiBkYXRhLnNrdSwgb3V0T2ZTdG9jazogZGF0YS5vdXRPZlN0b2NrIH0sXG4gICAgICApXG4gICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmtleXMoY2hhbmdlcykubGVuZ3RoID4gMFxuICAgICAgICA/IGBVcGRhdGVkIHByb2R1Y3QgXCIke2RhdGEubmFtZX1cIiDigJQgJHtkZXNjcmliZUNoYW5nZXMoY2hhbmdlcywgeyBuYW1lOiAnbmFtZScsIHByaWNlOiAncHJpY2UnLCBzYWxlUHJpY2U6ICdzYWxlUHJpY2UnLCBmZWF0dXJlZDogJ2ZlYXR1cmVkJywgcHVibGlzaGVkOiAncHVibGlzaGVkJywgc2t1OiAnU0tVJywgb3V0T2ZTdG9jazogJ291dE9mU3RvY2snIH0pfWBcbiAgICAgICAgOiBgVXBkYXRlZCBwcm9kdWN0IFwiJHtkYXRhLm5hbWV9XCIgKGltYWdlcy92YXJpYW50cyByZWZyZXNoZWQpYFxuICAgICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgICBhY3RvcklkOiB1c2VyLmlkLFxuICAgICAgICBhY3Rpb246ICdwcm9kdWN0LnVwZGF0ZScsXG4gICAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgICAgZW50aXR5SWQ6IGlkLFxuICAgICAgICBiZWZvcmU6IHsgbmFtZTogYmVmb3JlLm5hbWUsIHNrdTogYmVmb3JlLnNrdSwgcHJpY2U6IGJlZm9yZS5wcmljZSB9LFxuICAgICAgICBhZnRlcjogeyBuYW1lOiBkYXRhLm5hbWUsIHNrdTogZGF0YS5za3UsIHByaWNlOiBkYXRhLnByaWNlIH0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldmFsaWRhdGVQYXRoKGAvcHJvZHVjdC8ke2RhdGEuc2x1Z31gKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgbGV0IG1zZyA9IGU/Lm1lc3NhZ2UgPz8gJ0NvdWxkIG5vdCB1cGRhdGUgcHJvZHVjdCdcbiAgICBpZiAoZT8uY29kZSA9PT0gJ1AyMDAyJykge1xuICAgICAgbXNnID0gYFVuaXF1ZSBjb25zdHJhaW50IGZhaWxlZCBvbiAkeyhlPy5tZXRhPy50YXJnZXQgYXMgc3RyaW5nW10pPy5qb2luKCcsICcpID8/ICd1bmtub3duIGZpZWxkJ30uIFRoaXMgdmFsdWUgYWxyZWFkeSBleGlzdHMuYFxuICAgIH1cbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBtc2cgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkRlbGV0ZVByb2R1Y3QoaWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVN0YWZmV2l0aFBlcm1pc3Npb24oJ3Byb2R1Y3QuZGVsZXRlJylcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQgfSwgc2VsZWN0OiB7IG5hbWU6IHRydWUsIHNrdTogdHJ1ZSwgc2x1ZzogdHJ1ZSB9IH0pXG4gICAgaWYgKCFwcm9kdWN0KSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUHJvZHVjdCBub3QgZm91bmQnIH1cblxuICAgIGF3YWl0IGRiLnByb2R1Y3QuZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KVxuXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3Byb2R1Y3QuZGVsZXRlJyxcbiAgICAgIGVudGl0eVR5cGU6ICdQcm9kdWN0JyxcbiAgICAgIGVudGl0eUlkOiBpZCxcbiAgICAgIGJlZm9yZTogcHJvZHVjdCxcbiAgICAgIGRlc2NyaXB0aW9uOiBgRGVsZXRlZCBwcm9kdWN0IFwiJHtwcm9kdWN0Lm5hbWV9XCIgKFNLVSAke3Byb2R1Y3Quc2t1fSlgLFxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aCgnL3Nob3AnKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vcHJvZHVjdHMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBRE1JTjogT1JERVIgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pblVwZGF0ZU9yZGVyU3RhdHVzKG9yZGVySWQ6IHN0cmluZywgc3RhdHVzOiBhbnksIG5vdGU/OiBzdHJpbmcsIHRyYWNraW5nTnVtYmVyPzogc3RyaW5nLCB0cmFja2luZ1VybD86IHN0cmluZykge1xuICAvLyBQZXJtaXNzaW9uOiBjYW5jZWwvcmVmdW5kIGhhdmUgc3RyaWN0ZXIgcmVxdWlyZW1lbnRzIHRoYW4gc3RhdHVzIHVwZGF0ZVxuICBjb25zdCBwZXJtQ29kZSA9IHN0YXR1cyA9PT0gJ0NBTkNFTExFRCcgfHwgc3RhdHVzID09PSAnUkVGVU5ERUQnIHx8IHN0YXR1cyA9PT0gJ1BBUlRJQUxMWV9SRUZVTkRFRCdcbiAgICA/ICdvcmRlci5yZWZ1bmQnXG4gICAgOiAnb3JkZXIudXBkYXRlX3N0YXR1cydcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVTdGFmZldpdGhQZXJtaXNzaW9uKHBlcm1Db2RlKVxuXG4gIHRyeSB7XG4gICAgY29uc3QgYmVmb3JlID0gYXdhaXQgZGIub3JkZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogb3JkZXJJZCB9LFxuICAgICAgc2VsZWN0OiB7IG9yZGVyTnVtYmVyOiB0cnVlLCBzdGF0dXM6IHRydWUsIHRyYWNraW5nTnVtYmVyOiB0cnVlLCBjdXN0b21lck5hbWU6IHRydWUgfSxcbiAgICB9KVxuICAgIGlmICghYmVmb3JlKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnT3JkZXIgbm90IGZvdW5kJyB9XG5cbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBhd2FpdCB0eC5vcmRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogb3JkZXJJZCB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgIC4uLih0cmFja2luZ051bWJlciAhPT0gdW5kZWZpbmVkID8geyB0cmFja2luZ051bWJlciB9IDoge30pLFxuICAgICAgICAgIC4uLih0cmFja2luZ1VybCAhPT0gdW5kZWZpbmVkID8geyB0cmFja2luZ1VybCB9IDoge30pLFxuICAgICAgICAgIC8vIFNldCB0aW1lc3RhbXBzIGZvciBzaGlwcGVkL2RlbGl2ZXJlZC9jYW5jZWxsZWRcbiAgICAgICAgICAuLi4oc3RhdHVzID09PSAnU0hJUFBFRCcgPyB7IHNoaXBwZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIC4uLihzdGF0dXMgPT09ICdERUxJVkVSRUQnID8geyBkZWxpdmVyZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIC4uLihzdGF0dXMgPT09ICdDQU5DRUxMRUQnID8geyBjYW5jZWxsZWRBdDogbmV3IERhdGUoKSB9IDoge30pLFxuICAgICAgICAgIHN0YXR1c0hpc3Rvcnk6IHsgY3JlYXRlOiB7IHN0YXR1cywgbm90ZSB9IH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBhd2FpdCBhdWRpdExvZyh7XG4gICAgICBhY3RvcklkOiB1c2VyLmlkLFxuICAgICAgYWN0aW9uOiAnb3JkZXIudXBkYXRlX3N0YXR1cycsXG4gICAgICBlbnRpdHlUeXBlOiAnT3JkZXInLFxuICAgICAgZW50aXR5SWQ6IG9yZGVySWQsXG4gICAgICBiZWZvcmU6IHsgc3RhdHVzOiBiZWZvcmUuc3RhdHVzLCB0cmFja2luZ051bWJlcjogYmVmb3JlLnRyYWNraW5nTnVtYmVyIH0sXG4gICAgICBhZnRlcjogeyBzdGF0dXMsIHRyYWNraW5nTnVtYmVyLCBub3RlIH0sXG4gICAgICBkZXNjcmlwdGlvbjogYFVwZGF0ZWQgb3JkZXIgJHtiZWZvcmUub3JkZXJOdW1iZXJ9IHN0YXR1czogJHtiZWZvcmUuc3RhdHVzfSDihpIgJHtzdGF0dXN9JHtub3RlID8gYCAoJHtub3RlfSlgIDogJyd9YCxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9vcmRlcnMnKVxuICAgIHJldmFsaWRhdGVQYXRoKGAvYWRtaW4vb3JkZXJzLyR7b3JkZXJJZH1gKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBRE1JTjogU0VUVElOR1Ncbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5VcGRhdGVTZXR0aW5ncyhpbnB1dDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICBjb25zdCB1c2VyID0gYXdhaXQgcmVxdWlyZVN0YWZmV2l0aFBlcm1pc3Npb24oJ3NldHRpbmdzLm1hbmFnZScpXG4gIHRyeSB7XG4gICAgY29uc3QgYmVmb3JlID0gYXdhaXQgZGIuYWRtaW5TZXR0aW5ncy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgICBhd2FpdCBkYi5hZG1pblNldHRpbmdzLnVwc2VydCh7XG4gICAgICB3aGVyZTogeyBpZDogJ3NpbmdsZXRvbicgfSxcbiAgICAgIHVwZGF0ZTogaW5wdXQsXG4gICAgICBjcmVhdGU6IHsgaWQ6ICdzaW5nbGV0b24nLCAuLi5pbnB1dCB9LFxuICAgIH0pXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ3NldHRpbmdzLnVwZGF0ZScsXG4gICAgICBlbnRpdHlUeXBlOiAnQWRtaW5TZXR0aW5ncycsXG4gICAgICBlbnRpdHlJZDogJ3NpbmdsZXRvbicsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcjogaW5wdXQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZWQgc3RvcmUgc2V0dGluZ3MnLFxuICAgIH0pXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXR0aW5ncycpXG4gICAgcmV0dXJuIHsgb2s6IHRydWUgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5VcGRhdGVIb21lcGFnZUNvbnRlbnQoaW5wdXQ6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHJlcXVpcmVTdGFmZldpdGhQZXJtaXNzaW9uKCdjbXMubWFuYWdlJylcbiAgdHJ5IHtcbiAgICBjb25zdCBiZWZvcmUgPSBhd2FpdCBkYi5ob21lcGFnZUNvbnRlbnQuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiAnc2luZ2xldG9uJyB9IH0pXG4gICAgYXdhaXQgZGIuaG9tZXBhZ2VDb250ZW50LnVwc2VydCh7XG4gICAgICB3aGVyZTogeyBpZDogJ3NpbmdsZXRvbicgfSxcbiAgICAgIHVwZGF0ZTogaW5wdXQsXG4gICAgICBjcmVhdGU6IHsgaWQ6ICdzaW5nbGV0b24nLCAuLi5pbnB1dCB9LFxuICAgIH0pXG4gICAgYXdhaXQgYXVkaXRMb2coe1xuICAgICAgYWN0b3JJZDogdXNlci5pZCxcbiAgICAgIGFjdGlvbjogJ2Ntcy51cGRhdGUnLFxuICAgICAgZW50aXR5VHlwZTogJ0hvbWVwYWdlQ29udGVudCcsXG4gICAgICBlbnRpdHlJZDogJ3NpbmdsZXRvbicsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcjogaW5wdXQsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VwZGF0ZWQgaG9tZXBhZ2UgY29udGVudCcsXG4gICAgfSlcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpXG4gICAgcmV0dXJuIHsgb2s6IHRydWUgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlIH1cbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFVVEg6IFJFR0lTVEVSIC8gUkVTRVRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlU3RvcmVOb3RpZmljYXRpb24oaW5wdXQ6IHsgdHlwZTogJ05FV19DVVNUT01FUicgfCAnU1lTVEVNJzsgdGl0bGU6IHN0cmluZzsgYm9keT86IHN0cmluZzsgbGluaz86IHN0cmluZyB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RhZmYgPSBhd2FpdCBkYi51c2VyLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IHJvbGU6IHsgbm90OiAnQ1VTVE9NRVInIH0sIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoIXN0YWZmLmxlbmd0aCkgcmV0dXJuXG4gICAgYXdhaXQgZGIubm90aWZpY2F0aW9uLmNyZWF0ZU1hbnkoe1xuICAgICAgZGF0YTogc3RhZmYubWFwKChzKSA9PiAoe1xuICAgICAgICByZWNpcGllbnRJZDogcy5pZCxcbiAgICAgICAgdHlwZTogaW5wdXQudHlwZSxcbiAgICAgICAgdGl0bGU6IGlucHV0LnRpdGxlLFxuICAgICAgICBib2R5OiBpbnB1dC5ib2R5LFxuICAgICAgICBsaW5rOiBpbnB1dC5saW5rLFxuICAgICAgfSkpLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbY3JlYXRlU3RvcmVOb3RpZmljYXRpb25dIGZhaWxlZDonLCBlKVxuICB9XG59XG5cblxuY29uc3QgcmVnaXN0ZXJTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIpLFxuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgpLFxuICBwYXNzd29yZDogei5zdHJpbmcoKS5taW4oNiksXG4gIHBob25lOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICAvLyBBYnVzZSB0aHJvdHRsZTogbWF4IDUgcmVnaXN0cmF0aW9ucyBwZXIgaG91ciBwZXIgSVAgKDFoIGxvY2tvdXQgYWZ0ZXIpLlxuICBjb25zdCBybCA9IHJhdGVMaW1pdChgcmVnaXN0ZXI6JHtjbGllbnRJcEZyb21IZWFkZXJzKGF3YWl0IGhlYWRlcnMoKSl9YCwge1xuICAgIGxpbWl0OiA1LFxuICAgIHdpbmRvd01zOiA2MCAqIDYwICogMTAwMCxcbiAgICBibG9ja01zOiA2MCAqIDYwICogMTAwMCxcbiAgfSlcbiAgaWYgKCFybC5vaykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdUb28gbWFueSBzaWduLXVwIGF0dGVtcHRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicgfVxuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gcmVnaXN0ZXJTY2hlbWEuc2FmZVBhcnNlKE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpKVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogcGFyc2VkLmVycm9yLmlzc3Vlc1swXT8ubWVzc2FnZSA/PyAnSW52YWxpZCBpbnB1dCcgfVxuICB9XG4gIGNvbnN0IHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkLCBwaG9uZSB9ID0gcGFyc2VkLmRhdGFcbiAgY29uc3QgYmNyeXB0ID0gYXdhaXQgaW1wb3J0KCdiY3J5cHRqcycpXG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZGIudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCkgfSB9KVxuICBpZiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnQW4gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWxyZWFkeSBleGlzdHMuJyB9XG4gIH1cbiAgY29uc3QgcGFzc3dvcmRIYXNoID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKVxuICBjb25zdCBjcmVhdGVkVXNlciA9IGF3YWl0IGRiLnVzZXIuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCksXG4gICAgICBwYXNzd29yZEhhc2gsXG4gICAgICBwaG9uZSxcbiAgICAgIHJvbGU6ICdDVVNUT01FUicsXG4gICAgfSxcbiAgfSlcbiAgYXdhaXQgY3JlYXRlU3RvcmVOb3RpZmljYXRpb24oe1xuICAgIHR5cGU6ICdORVdfQ1VTVE9NRVInLFxuICAgIHRpdGxlOiAnTmV3IGN1c3RvbWVyIHJlZ2lzdGVyZWQnLFxuICAgIGJvZHk6IGAke2NyZWF0ZWRVc2VyLm5hbWUgPz8gY3JlYXRlZFVzZXIuZW1haWx9IGNyZWF0ZWQgYSBuZXcgY3VzdG9tZXIgYWNjb3VudC5gLFxuICAgIGxpbms6IGAvYWRtaW4vY3VzdG9tZXJzLyR7Y3JlYXRlZFVzZXIuaWR9YCxcbiAgfSlcbiAgcmV0dXJuIHsgb2s6IHRydWUgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFDQ09VTlQ6IEFERFJFU1MgTUFOQUdFTUVOVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IGFkZHJlc3NTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGZ1bGxOYW1lOiB6LnN0cmluZygpLm1pbigyKSxcbiAgcGhvbmU6IHouc3RyaW5nKCkubWluKDcpLFxuICBzdGF0ZTogei5zdHJpbmcoKS5taW4oMiksXG4gIGNpdHk6IHouc3RyaW5nKCkubWluKDIpLFxuICBhZGRyZXNzOiB6LnN0cmluZygpLm1pbig1KSxcbiAgbGFuZG1hcms6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgaXNEZWZhdWx0OiB6LmNvZXJjZS5ib29sZWFuKCkub3B0aW9uYWwoKSxcbn0pXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQWRkcmVzcyhmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90IGF1dGhlbnRpY2F0ZWQnIH1cbiAgY29uc3QgcGFyc2VkID0gYWRkcmVzc1NjaGVtYS5zYWZlUGFyc2UoT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSkpXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgfVxuICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGFcbiAgY29uc3QgaWQgPSBmb3JtRGF0YS5nZXQoJ2lkJykgYXMgc3RyaW5nIHwgbnVsbFxuICB0cnkge1xuICAgIGlmIChkYXRhLmlzRGVmYXVsdCkge1xuICAgICAgYXdhaXQgZGIuYWRkcmVzcy51cGRhdGVNYW55KHtcbiAgICAgICAgd2hlcmU6IHsgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgICAgZGF0YTogeyBpc0RlZmF1bHQ6IGZhbHNlIH0sXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoaWQpIHtcbiAgICAgIGF3YWl0IGRiLmFkZHJlc3MudXBkYXRlKHsgd2hlcmU6IHsgaWQgfSwgZGF0YSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBkYi5hZGRyZXNzLmNyZWF0ZSh7IGRhdGE6IHsgLi4uZGF0YSwgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQgfSB9KVxuICAgIH1cbiAgICByZXZhbGlkYXRlUGF0aCgnL2FjY291bnQvYWRkcmVzc2VzJylcbiAgICByZXR1cm4geyBvazogdHJ1ZSB9XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGU/Lm1lc3NhZ2UgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBZGRyZXNzKGlkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90IGF1dGhlbnRpY2F0ZWQnIH1cbiAgYXdhaXQgZGIuYWRkcmVzcy5kZWxldGVNYW55KHsgd2hlcmU6IHsgaWQsIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkIH0gfSlcbiAgcmV2YWxpZGF0ZVBhdGgoJy9hY2NvdW50L2FkZHJlc3NlcycpXG4gIHJldHVybiB7IG9rOiB0cnVlIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBBQ0NPVU5UOiBQUk9GSUxFIE1BTkFHRU1FTlRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBwcm9maWxlU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigyLCAnTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycycpLFxuICBwaG9uZTogei5zdHJpbmcoKS5taW4oNywgJ1Bob25lIG51bWJlciBtdXN0IGJlIGF0IGxlYXN0IDcgY2hhcmFjdGVycycpLFxuICB3aGF0c2FwcE51bWJlcjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGUoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKClcbiAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ05vdCBhdXRoZW50aWNhdGVkJyB9XG4gIGNvbnN0IHBhcnNlZCA9IHByb2ZpbGVTY2hlbWEuc2FmZVBhcnNlKE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpKVxuICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogcGFyc2VkLmVycm9yLmlzc3Vlc1swXT8ubWVzc2FnZSA/PyAnSW52YWxpZCBpbnB1dCcgfVxuICB9XG4gIGNvbnN0IHsgbmFtZSwgcGhvbmUsIHdoYXRzYXBwTnVtYmVyIH0gPSBwYXJzZWQuZGF0YVxuICB0cnkge1xuICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcGhvbmUsXG4gICAgICAgIHdoYXRzYXBwTnVtYmVyOiB3aGF0c2FwcE51bWJlciB8fCBudWxsLFxuICAgICAgfSxcbiAgICB9KVxuICAgIHJldmFsaWRhdGVQYXRoKCcvYWNjb3VudCcpXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hY2NvdW50L3Byb2ZpbGUnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlIH1cbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IHVwZGF0ZSBwcm9maWxlJyB9XG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTRVJWSUNFUyDigJQgc2VydmljZSBlbnF1aXJ5IHN1Ym1pc3Npb24gKHB1YmxpYywgZ3Vlc3QtZnJpZW5kbHkpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3Qgc2VydmljZUVucXVpcnlTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIsICdQbGVhc2UgZW50ZXIgeW91ciBmdWxsIG5hbWUnKSxcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsJyksXG4gIHBob25lOiB6LnN0cmluZygpLm1pbig3LCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgcGhvbmUgbnVtYmVyJyksXG4gIHdoYXRzYXBwTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNlcnZpY2VTbHVnOiB6LnN0cmluZygpLm1pbigxLCAnUGxlYXNlIHNlbGVjdCBhIHNlcnZpY2UnKSxcbiAgc2VydmljZU5hbWU6IHouc3RyaW5nKCkubWluKDEpLFxuICBvY2Nhc2lvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBwcmVmZXJyZWREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHByZWZlcnJlZFRpbWU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbG9jYXRpb246IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYnVkZ2V0OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGNsb3RoaW5nU2l6ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBtZXNzYWdlOiB6LnN0cmluZygpLm1pbig1LCAnUGxlYXNlIHRlbGwgdXMgYSBiaXQgbW9yZSBhYm91dCB3aGF0IHlvdSBuZWVkJyksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U2VydmljZUVucXVpcnkoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHBhcnNlZCA9IHNlcnZpY2VFbnF1aXJ5U2NoZW1hLnNhZmVQYXJzZShPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKSlcbiAgaWYgKCFwYXJzZWQuc3VjY2Vzcykge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ1BsZWFzZSBjaGVjayB0aGUgZm9ybSBhbmQgdHJ5IGFnYWluLicgfVxuICB9XG4gIGNvbnN0IGQgPSBwYXJzZWQuZGF0YVxuXG4gIC8vIE9wdGlvbmFsOiBsaW5rIHRvIGF1dGhlbnRpY2F0ZWQgdXNlciBpZiBsb2dnZWQgaW5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZCB8fCBudWxsXG5cbiAgLy8gR2VuZXJhdGUgZW5xdWlyeSBudW1iZXI6IFNWQy1ZWVlZLU5OTk5cbiAgY29uc3QgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxuICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLnNlcnZpY2VFbnF1aXJ5LmNvdW50KClcbiAgY29uc3QgZW5xdWlyeU51bWJlciA9IGBTVkMtJHt5ZWFyfS0ke1N0cmluZyhjb3VudCArIDEpLnBhZFN0YXJ0KDQsICcwJyl9YFxuXG4gIHRyeSB7XG4gICAgY29uc3QgY3JlYXRlZCA9IGF3YWl0IGRiLnNlcnZpY2VFbnF1aXJ5LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGVucXVpcnlOdW1iZXIsXG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBkLm5hbWUsXG4gICAgICAgIGVtYWlsOiBkLmVtYWlsLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHBob25lOiBkLnBob25lLFxuICAgICAgICB3aGF0c2FwcE51bWJlcjogZC53aGF0c2FwcE51bWJlciB8fCBudWxsLFxuICAgICAgICBzZXJ2aWNlU2x1ZzogZC5zZXJ2aWNlU2x1ZyxcbiAgICAgICAgc2VydmljZU5hbWU6IGQuc2VydmljZU5hbWUsXG4gICAgICAgIG9jY2FzaW9uOiBkLm9jY2FzaW9uIHx8IG51bGwsXG4gICAgICAgIHByZWZlcnJlZERhdGU6IGQucHJlZmVycmVkRGF0ZSA/IG5ldyBEYXRlKGQucHJlZmVycmVkRGF0ZSkgOiBudWxsLFxuICAgICAgICBwcmVmZXJyZWRUaW1lOiBkLnByZWZlcnJlZFRpbWUgfHwgbnVsbCxcbiAgICAgICAgbG9jYXRpb246IGQubG9jYXRpb24gfHwgbnVsbCxcbiAgICAgICAgYnVkZ2V0OiBkLmJ1ZGdldCB8fCBudWxsLFxuICAgICAgICBjbG90aGluZ1NpemU6IGQuY2xvdGhpbmdTaXplIHx8IG51bGwsXG4gICAgICAgIG1lc3NhZ2U6IGQubWVzc2FnZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgICBhd2FpdCBjcmVhdGVTdG9yZU5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnU1lTVEVNJyxcbiAgICAgIHRpdGxlOiBgTmV3IHNlcnZpY2UgZW5xdWlyeSAke2NyZWF0ZWQuZW5xdWlyeU51bWJlcn1gLFxuICAgICAgYm9keTogYCR7Y3JlYXRlZC5jdXN0b21lck5hbWV9IHJlcXVlc3RlZCAke2NyZWF0ZWQuc2VydmljZU5hbWV9LmAsXG4gICAgICBsaW5rOiBgL2FkbWluL3NlcnZpY2VzL2VucXVpcmllcy8ke2NyZWF0ZWQuaWR9YCxcbiAgICB9KVxuXG4gICAgLy8g4pSA4pSAIEVtYWlsIGFsZXJ0IHRvIHRoZSBzdG9yZSBvd25lciDilIDilIBcbiAgICAvLyBCZXN0LWVmZm9ydCDigJQgbmV2ZXIgYmxvY2tzIHRoZSBlbnF1aXJ5IHN1Ym1pc3Npb24uXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIuYWRtaW5TZXR0aW5ncy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgICAgIGF3YWl0IG5vdGlmeUFkbWluU2VydmljZUVucXVpcnkoe1xuICAgICAgICBlbnF1aXJ5TnVtYmVyOiBjcmVhdGVkLmVucXVpcnlOdW1iZXIsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogY3JlYXRlZC5jdXN0b21lck5hbWUsXG4gICAgICAgIGVtYWlsOiBjcmVhdGVkLmVtYWlsLFxuICAgICAgICBwaG9uZTogY3JlYXRlZC5waG9uZSxcbiAgICAgICAgc2VydmljZVNsdWc6IGNyZWF0ZWQuc2VydmljZVNsdWcsXG4gICAgICAgIHNlcnZpY2VOYW1lOiBjcmVhdGVkLnNlcnZpY2VOYW1lLFxuICAgICAgICBtZXNzYWdlOiBjcmVhdGVkLm1lc3NhZ2UsXG4gICAgICAgIG9jY2FzaW9uOiBjcmVhdGVkLm9jY2FzaW9uLFxuICAgICAgICBwcmVmZXJyZWREYXRlOiBjcmVhdGVkLnByZWZlcnJlZERhdGU/LnRvSVNPU3RyaW5nKCkgPz8gbnVsbCxcbiAgICAgICAgbG9jYXRpb246IGNyZWF0ZWQubG9jYXRpb24sXG4gICAgICAgIGJ1ZGdldDogY3JlYXRlZC5idWRnZXQsXG4gICAgICB9LCBzZXR0aW5ncz8uc3VwcG9ydEVtYWlsKVxuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignW2VtYWlsXSBzZXJ2aWNlIGVucXVpcnkgbm90aWZpY2F0aW9uIGVycm9yOicsIGU/Lm1lc3NhZ2UpXG4gICAgfVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9lbnF1aXJpZXMnKVxuICAgIHJldHVybiB7IG9rOiB0cnVlLCBlbnF1aXJ5TnVtYmVyOiBjcmVhdGVkLmVucXVpcnlOdW1iZXIgfVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlID8/ICdDb3VsZCBub3Qgc3VibWl0IGVucXVpcnkuIFBsZWFzZSB0cnkgYWdhaW4uJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOFJBMkVzQixrTUFBQSJ9
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$f81b21__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:f81b21 [app-client] (ecmascript) <text/javascript>");
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$f81b21__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["subscribeToNewsletter"])(fd);
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
"[project]/src/actions/data:eebf2d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPersonalShoppingRequest",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40855af19e402ceef187c4ed0c1d7fbfecf669dbfb":"createPersonalShoppingRequest"},"src/actions/personal-shopping-customer.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40855af19e402ceef187c4ed0c1d7fbfecf669dbfb", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createPersonalShoppingRequest");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQZXJzb25hbCBTaG9wcGluZyDigJQgY3VzdG9tZXItZmFjaW5nIHNlcnZlciBhY3Rpb25zLlxuICogVGhlIHN5bmMgYGNoZWNrQnJpZWZHdWFyZGAgaGVscGVyIGxpdmVzIGluIHNyYy9saWIvcHMtYnJpZWYtZ3VhcmQudHMuXG4gKi9cblxuJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSAnQC9saWIvc2Vzc2lvbidcbmltcG9ydCB7XG4gIGluaXRpYWxpemVQYXlzdGFja1RyYW5zYWN0aW9uLFxuICB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uLFxufSBmcm9tICdAL2xpYi9wYXlzdGFjay9zZXJ2ZXInXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJ1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENvbnN0YW50c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBTbG90IHRpbWVzIG9mZmVyZWQgZm9yIGluLXBlcnNvbiBmaXR0aW5ncyAoTW9u4oCTU2F0KS4gKi9cbmNvbnN0IFBTX1NMT1RfVElNRVMgPSBbJzk6MDAgQU0nLCAnMTE6MzAgQU0nLCAnMjowMCBQTScsICc0OjMwIFBNJ10gYXMgY29uc3RcblxuY29uc3QgUFNfU0VSVklDRV9OQU1FID0gJ1BlcnNvbmFsIFNob3BwaW5nJ1xuY29uc3QgUFNfSE9MRF9TRUNPTkRTID0gMTAgKiA2MCAvLyAxMC1taW51dGUgc2xvdCBob2xkXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogV3JpdGUgYSBQU0V2ZW50IHJvdy4gQmVzdC1lZmZvcnQg4oCUIGZhaWx1cmVzIGFyZSBzd2FsbG93ZWQgc28gdGhlXG4gKiBjdXN0b21lciBmbG93IG5ldmVyIGFib3J0cyBqdXN0IGJlY2F1c2UgdGhlIGF1ZGl0IHRyYWlsIGNvdWxkbid0IGJlXG4gKiB3cml0dGVuIChtaXJyb3JzIGB3cml0ZVBTRXZlbnRgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gd3JpdGVQU0V2ZW50KFxuICByZXF1ZXN0SWQ6IHN0cmluZyxcbiAgb3B0czogeyBhY3RvclR5cGU/OiBzdHJpbmc7IG5vdGU/OiBzdHJpbmcgfCBudWxsOyBhY3RvcklkPzogc3RyaW5nIHwgbnVsbCB9ID0ge30sXG4pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU0V2ZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHJlcXVlc3RJZCxcbiAgICAgICAgYWN0b3JJZDogb3B0cy5hY3RvcklkID8/IG51bGwsXG4gICAgICAgIGFjdG9yVHlwZTogb3B0cy5hY3RvclR5cGUgPz8gJ0NVU1RPTUVSJyxcbiAgICAgICAgbm90ZTogb3B0cy5ub3RlID8/IG51bGwsXG4gICAgICB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW3BlcnNvbmFsLXNob3BwaW5nLWN1c3RvbWVyXSB3cml0ZVBTRXZlbnQgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBuZXh0IFBTIHJlZiBvZmYgdGhlICpoaWdoZXN0KiBleGlzdGluZyBzdWZmaXguIFNhbWVcbiAqIGFwcHJvYWNoIGFzIGBuZXh0Qm9va2luZ051bWJlcmAgaW4gY29uc3VsdGF0aW9ucy50cyDigJQgdXNpbmdcbiAqIGNvdW50KCkrMSB3b3VsZCBjb2xsaWRlIGFmdGVyIHJvd3MgYXJlIGRlbGV0ZWQgKGNvdW50IGdvZXMgZG93bixcbiAqIG5leHQgbnVtYmVyIGNsYXNoZXMgd2l0aCBhbiBleGlzdGluZyBvbmUpLiBXYWxraW5nIHRoZSBtYXggc3VmZml4XG4gKiBrZWVwcyB0aGUgc2VxdWVuY2UgbW9ub3RvbmljLlxuICpcbiAqIEZhbGxzIGJhY2sgdG8gMSBpZiBubyBXQy1QUy0qIHJlcXVlc3RzIGV4aXN0IHlldC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbmV4dFBTUmVmKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGxhc3QgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7IHJlZjogeyBzdGFydHNXaXRoOiAnV0MtUFMtJyB9IH0sXG4gICAgb3JkZXJCeTogeyByZWY6ICdkZXNjJyB9LFxuICAgIHNlbGVjdDogeyByZWY6IHRydWUgfSxcbiAgfSlcbiAgbGV0IG5leHQgPSAxXG4gIGlmIChsYXN0KSB7XG4gICAgY29uc3QgbSA9IGxhc3QucmVmLm1hdGNoKC9eV0MtUFMtKFxcZCspJC8pXG4gICAgaWYgKG0pIG5leHQgPSBwYXJzZUludChtWzFdLCAxMCkgKyAxXG4gIH1cbiAgcmV0dXJuIGBXQy1QUy0ke1N0cmluZyhuZXh0KS5wYWRTdGFydCg0LCAnMCcpfWBcbn1cblxuLyoqIE5vcm1hbGlzZSBhIGRhdGUgc3RyaW5nIGBZWVlZLU1NLUREYCBpbnRvIGEgVVRDIG1pZG5pZ2h0IERhdGVUaW1lLiAqL1xuZnVuY3Rpb24gZGF0ZU9ubHkoczogc3RyaW5nKTogRGF0ZSB7XG4gIGNvbnN0IFt5LCBtLCBkXSA9IHMuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKVxuICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeSwgbSAtIDEsIGQsIDAsIDAsIDApKVxufVxuXG4vKiogRm9ybWF0IGEgRGF0ZSBiYWNrIGludG8gYSBgWVlZWS1NTS1ERGAgc3RyaW5nIChVVEMsIG5vIHRpbWUgc2hpZnQpLiAqL1xuZnVuY3Rpb24geW1kKGQ6IERhdGUpOiBzdHJpbmcge1xuICByZXR1cm4gZC50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxufVxuXG4vKiogRXNjYXBlIGEgc3RyaW5nIHNvIGl0IGNhbiBiZSBzYWZlbHkgZW1iZWRkZWQgaW4gYSBSZWdFeHAuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG59XG5cbi8qKiBEZS1kdXBsaWNhdGUgYW4gYXJyYXkgd2hpbGUgcHJlc2VydmluZyBvcmRlci4gKi9cbmZ1bmN0aW9uIGRlZHVwZTxUPih4czogVFtdKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh4cykpXG59XG5cbi8qKlxuICogUmVzb2x2ZSB0aGUgc291cmNpbmcgZmVlIGZvciBhIGdpdmVuIHRpZXIgZnJvbSB0aGUgUFNTZXJ2aWNlU2V0dGluZ1xuICogc2luZ2xldG9uLiBGYWxscyBiYWNrIHRvIHRoZSBzY2hlbWEgZGVmYXVsdHMgKDQ1LDAwMCAvIDUwLDAwMCkgd2hlblxuICogdGhlIHJvdyBkb2Vzbid0IGV4aXN0IHlldCAobWlycm9ycyBjb21wdXRlRml0dGluZ1RvdGFsIGluIHRoZVxuICogYWRtaW4gd29ya2Zsb3cpLlxuICovXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlU291cmNpbmdGZWUoXG4gIHRpZXI6ICdERUxJVkVSRUQnIHwgJ0lOX1BFUlNPTl9GSVRUSU5HJyxcbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIucFNTZXJ2aWNlU2V0dGluZy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgaWYgKCFzZXR0aW5ncykge1xuICAgIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnID8gNTAwMDAgOiA0NTAwMFxuICB9XG4gIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnXG4gICAgPyBzZXR0aW5ncy5pblBlcnNvbkZpdHRpbmdGZWVcbiAgICA6IHNldHRpbmdzLmRlbGl2ZXJlZEZlZVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIGEgcHJvbW8gY29kZSBhbmQgcmV0dXJuIHRoZSBkaXNjb3VudCArIGZpbmFsIGZlZS5cbiAqIFJldHVybnMgbnVsbCB3aGVuIHRoZSBjb2RlIGlzIGludmFsaWQgKGluYWN0aXZlLCBleHBpcmVkLCBvciB1bmtub3duKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVQU1Byb21vQ29kZShcbiAgY29kZTogc3RyaW5nLFxuKTogUHJvbWlzZTx7IGNvZGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB2YWx1ZTogbnVtYmVyOyBsYWJlbDogc3RyaW5nIH0gfCBudWxsPiB7XG4gIGNvbnN0IHVwcGVyID0gY29kZS50cmltKCkudG9VcHBlckNhc2UoKVxuICBpZiAoIXVwcGVyKSByZXR1cm4gbnVsbFxuICBjb25zdCByb3cgPSBhd2FpdCBkYi5wU1Byb21vQ29kZS5maW5kVW5pcXVlKHsgd2hlcmU6IHsgY29kZTogdXBwZXIgfSB9KVxuICBpZiAoIXJvdykgcmV0dXJuIG51bGxcbiAgaWYgKCFyb3cuYWN0aXZlKSByZXR1cm4gbnVsbFxuICBpZiAocm93LmV4cGlyZXNBdCAmJiByb3cuZXhwaXJlc0F0LmdldFRpbWUoKSA8IERhdGUubm93KCkpIHJldHVybiBudWxsXG4gIC8vIE5vIGV4cGxpY2l0IG1heFVzZXMgY29sdW1uIG9uIHRoZSBzY2hlbWEg4oCUIHRoZSBhZG1pbiBkaXNhYmxlcyBjb2Rlc1xuICAvLyBvbmNlIHRoZXkndmUgYmVlbiB1c2VkIGVub3VnaCwgc28gdGltZXNVc2VkIGFsb25lIGlzbid0IGEgaGFyZCBsaW1pdC5cbiAgcmV0dXJuIHsgY29kZTogcm93LmNvZGUsIHR5cGU6IHJvdy50eXBlLCB2YWx1ZTogcm93LnZhbHVlLCBsYWJlbDogcm93LmNvZGUgfVxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIGRpc2NvdW50IGFtb3VudCBhbmQgdGhlIGZpbmFsIGZlZSBnaXZlbiBhIHByb21vIGNvZGUgcm93XG4gKiBhbmQgdGhlIGxpc3QgZmVlLiBNaXJyb3JzIHRoZSBzZW1hbnRpY3MgdXNlZCBpblxuICogcGVyc29uYWwtc2hvcHBpbmctd29ya2Zsb3cudHM6XG4gKiAgIC0gUEVSQ0VOVDogZGlzY291bnQgPSBsaXN0RmVlICogdmFsdWUgLyAxMDAgICh2YWx1ZSAx4oCTMTAwKVxuICogICAtIEZJWEVEOiAgIGRpc2NvdW50ID0gdmFsdWUgICAgICAgICAgICAgICAgICAobmFpcmEgYW1vdW50IG9mZilcbiAqICAgLSBGUkVFOiAgICBkaXNjb3VudCA9IGxpc3RGZWUgICAgICAgICAgICAgICAgKGZ1bGwgc291cmNpbmcgZmVlIHdhaXZlZClcbiAqXG4gKiBUaGUgZGlzY291bnQgaXMgY2xhbXBlZCBzbyB0aGUgZmluYWwgZmVlIG5ldmVyIGdvZXMgYmVsb3cgemVyby5cbiAqL1xuZnVuY3Rpb24gYXBwbHlQcm9tb0Rpc2NvdW50KFxuICBsaXN0RmVlOiBudW1iZXIsXG4gIHByb21vOiB7IHR5cGU6IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9LFxuKTogeyBkaXNjb3VudEFtb3VudDogbnVtYmVyOyBmaW5hbEZlZTogbnVtYmVyOyBkaXNjb3VudExhYmVsOiBzdHJpbmcgfSB7XG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgaWYgKHByb21vLnR5cGUgPT09ICdQRVJDRU5UJykge1xuICAgIGNvbnN0IHBjdCA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5yb3VuZCgobGlzdEZlZSAqIHBjdCkgLyAxMDApXG4gIH0gZWxzZSBpZiAocHJvbW8udHlwZSA9PT0gJ0ZJWEVEJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4obGlzdEZlZSwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICB9IGVsc2UgaWYgKHByb21vLnR5cGUgPT09ICdGUkVFJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gbGlzdEZlZVxuICB9XG4gIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4oZGlzY291bnRBbW91bnQsIGxpc3RGZWUpXG4gIGNvbnN0IGZpbmFsRmVlID0gbGlzdEZlZSAtIGRpc2NvdW50QW1vdW50XG4gIGNvbnN0IGRpc2NvdW50TGFiZWwgPSBwcm9tby50eXBlID09PSAnRlJFRSdcbiAgICA/IGBQcm9tbyAke3Byb21vLmxhYmVsfTogZnJlZSBzb3VyY2luZ2BcbiAgICA6IHByb21vLnR5cGUgPT09ICdQRVJDRU5UJ1xuICAgICAgPyBgUHJvbW8gJHtwcm9tby5sYWJlbH06ICR7cHJvbW8udmFsdWV9JSBvZmYgc291cmNpbmcgZmVlYFxuICAgICAgOiBgUHJvbW8gJHtwcm9tby5sYWJlbH06IOKCpiR7cHJvbW8udmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0gb2ZmIHNvdXJjaW5nIGZlZWBcbiAgcmV0dXJuIHsgZGlzY291bnRBbW91bnQsIGZpbmFsRmVlLCBkaXNjb3VudExhYmVsIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAyLiBnZXRQU0F2YWlsYWJsZVNsb3RzIOKAlCBJbi1QZXJzb24gZml0dGluZyBzbG90c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUmV0dXJuIHRoZSBhdmFpbGFibGUgSW4tUGVyc29uIGZpdHRpbmcgc2xvdHMgZm9yIHRoZSBuZXh0IE4gZGF5c1xuICogc3RhcnRpbmcgYXQgYGZyb21gIChZWVlZLU1NLUREKS4gU3VuZGF5cyBhcmUgc2tpcHBlZCAoc2Vzc2lvbnMgcnVuXG4gKiBNb25kYXkgdG8gU2F0dXJkYXkpLiBUaGUgZm91ciBkYWlseSBzbG90IHRpbWVzIGFyZSA5OjAwIEFNLFxuICogMTE6MzAgQU0sIDI6MDAgUE0gYW5kIDQ6MzAgUE0g4oCUIHNhbWUgZ3JpZCBhcyBXYXJkcm9iZSBDb25zdWx0YXRpb25zLlxuICpcbiAqIEEgc2xvdCBpcyBleGNsdWRlZCBpZiBlaXRoZXI6XG4gKiAgIC0gYSBgUFNTbG90YCByb3cgZXhpc3RzIGZvciB0aGF0IGRhdGUrc3RhcnQgd2l0aCBhbiBhY3RpdmUgaG9sZFxuICogICAgIChoZWxkVW50aWwgSVMgTlVMTCBtZWFucyBib29rZWQ7IGhlbGRVbnRpbCA+IG5vdyBtZWFucyBoZWxkXG4gKiAgICAgZHVyaW5nIGNoZWNrb3V0OyBoZWxkVW50aWwgPCBub3cgbWVhbnMgdGhlIGhvbGQgZXhwaXJlZCBhbmQgdGhlXG4gKiAgICAgc2xvdCBpcyBmcmVlIGFnYWluKSwgT1JcbiAqICAgLSBhIGBQZXJzb25hbFNob3BwaW5nUmVxdWVzdGAgZXhpc3RzIHdpdGggdGllcj1JTl9QRVJTT05fRklUVElORyxcbiAqICAgICBzdGF0dXMgbm90IENBTkNFTExFRC9ET05FLCBmaXR0aW5nRGF0ZSBtYXRjaGluZyB0aGUgZGF5IGFuZFxuICogICAgIGZpdHRpbmdUaW1lIG1hdGNoaW5nIHRoZSBzbG90LlxuICpcbiAqIGBtb2RlYCBpcyB0aGUgdGllciB0aGUgY3VzdG9tZXIgaGFzIHBpY2tlZC4gV2hlbiB0aGUgY3VzdG9tZXIgaXMgb25cbiAqIHRoZSBERUxJVkVSRUQgdGllciB0aGVyZSBhcmUgbm8gZml0dGluZyBzbG90cyDigJQgcmV0dXJuIFtdIHNvIHRoZVxuICogd2l6YXJkIGNhbiBza2lwIHRoZSBzbG90IHBpY2tlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBTQXZhaWxhYmxlU2xvdHMoaW5wdXQ6IHtcbiAgZnJvbTogc3RyaW5nXG4gIGRheXM6IG51bWJlclxuICBtb2RlOiBzdHJpbmdcbn0pIHtcbiAgaWYgKCFpbnB1dD8uZnJvbSB8fCAhL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoaW5wdXQuZnJvbSkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZiAoaW5wdXQubW9kZSAhPT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykgcmV0dXJuIFtdXG5cbiAgY29uc3QgZGF5cyA9IE1hdGgubWF4KDEsIE1hdGgubWluKDYwLCBOdW1iZXIoaW5wdXQuZGF5cykgfHwgMTQpKVxuICBjb25zdCBzdGFydCA9IGRhdGVPbmx5KGlucHV0LmZyb20pXG4gIC8vIEJ1aWxkIHRoZSBkYXkgbGlzdCDigJQgaW5jbHVzaXZlIG9mIGBmcm9tYCwgZXhjbHVzaXZlIG9mIGBmcm9tICsgZGF5c2AuXG4gIGNvbnN0IGRheUxpc3Q6IERhdGVbXSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF5czsgaSsrKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIGkgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxuICAgIGlmIChkLmdldFVUQ0RheSgpID09PSAwKSBjb250aW51ZSAvLyBza2lwIFN1bmRheXNcbiAgICBkYXlMaXN0LnB1c2goZClcbiAgfVxuICBpZiAoIWRheUxpc3QubGVuZ3RoKSByZXR1cm4gW11cblxuICBjb25zdCByYW5nZVN0YXJ0ID0gZGF5TGlzdFswXVxuICBjb25zdCByYW5nZUVuZCA9IG5ldyBEYXRlKFxuICAgIGRheUxpc3RbZGF5TGlzdC5sZW5ndGggLSAxXS5nZXRUaW1lKCkgKyAyNCAqIDYwICogNjAgKiAxMDAwLFxuICApXG5cbiAgLy8gQWN0aXZlIFBTU2xvdHMg4oCUIGhlbGQgb3IgYWxyZWFkeSBib29rZWQuXG4gIGNvbnN0IGhlbGRTbG90cyA9IGF3YWl0IGRiLnBTU2xvdC5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIGRhdGU6IHsgZ3RlOiByYW5nZVN0YXJ0LCBsdDogcmFuZ2VFbmQgfSxcbiAgICAgIE9SOiBbeyBoZWxkVW50aWw6IG51bGwgfSwgeyBoZWxkVW50aWw6IHsgZ3Q6IG5ldyBEYXRlKCkgfSB9XSxcbiAgICB9LFxuICAgIHNlbGVjdDogeyBkYXRlOiB0cnVlLCBzdGFydDogdHJ1ZSB9LFxuICB9KVxuXG4gIC8vIEFjdGl2ZSBQUyByZXF1ZXN0cyAodGllcj1JTl9QRVJTT05fRklUVElORywgbm90IENBTkNFTExFRC9ET05FKS5cbiAgY29uc3QgYm9va2VkID0gYXdhaXQgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgc3RhdHVzOiB7IG5vdEluOiBbJ0NBTkNFTExFRCcsICdET05FJ10gfSxcbiAgICAgIGZpdHRpbmdEYXRlOiB7IGd0ZTogcmFuZ2VTdGFydCwgbHQ6IHJhbmdlRW5kIH0sXG4gICAgfSxcbiAgICBzZWxlY3Q6IHsgZml0dGluZ0RhdGU6IHRydWUsIGZpdHRpbmdUaW1lOiB0cnVlIH0sXG4gIH0pXG5cbiAgY29uc3QgdGFrZW4gPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGNvbnN0IHMgb2YgaGVsZFNsb3RzKSB7XG4gICAgdGFrZW4uYWRkKGAke3ltZChzLmRhdGUpfXwke3Muc3RhcnR9YClcbiAgfVxuICBmb3IgKGNvbnN0IGIgb2YgYm9va2VkKSB7XG4gICAgaWYgKGIuZml0dGluZ0RhdGUgJiYgYi5maXR0aW5nVGltZSkge1xuICAgICAgdGFrZW4uYWRkKGAke3ltZChiLmZpdHRpbmdEYXRlKX18JHtiLmZpdHRpbmdUaW1lfWApXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb3V0OiB7IGRhdGU6IHN0cmluZzsgdGltZTogc3RyaW5nOyBmdWxsTGFiZWw6IHN0cmluZyB9W10gPSBbXVxuICBmb3IgKGNvbnN0IGQgb2YgZGF5TGlzdCkge1xuICAgIGNvbnN0IGRzID0geW1kKGQpXG4gICAgZm9yIChjb25zdCB0aW1lIG9mIFBTX1NMT1RfVElNRVMpIHtcbiAgICAgIGlmICh0YWtlbi5oYXMoYCR7ZHN9fCR7dGltZX1gKSkgY29udGludWVcbiAgICAgIG91dC5wdXNoKHtcbiAgICAgICAgZGF0ZTogZHMsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZ1bGxMYWJlbDogYCR7ZHN9IMK3ICR7dGltZX1gLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDMuIGNyZWF0ZVBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY3JlYXRlU2NoZW1hID0gei5vYmplY3Qoe1xuICBjdXN0b21lck5hbWU6IHouc3RyaW5nKCkubWluKDIsICdQbGVhc2UgZW50ZXIgeW91ciBmdWxsIG5hbWUuJyksXG4gIGN1c3RvbWVyUGhvbmU6IHouc3RyaW5nKCkubWluKDcsICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXIuJyksXG4gIGNvbnRhY3RWaWE6IHouZW51bShbJ0NhbGwnLCAnV2hhdHNBcHAnLCAnRW1haWwnXSksXG4gIHNob3BwaW5nRm9yOiB6LnN0cmluZygpLm1pbigxLCAnUGxlYXNlIHRlbGwgdXMgd2hvIHRoaXMgaXMgZm9yLicpLFxuICB0aWVyOiB6LmVudW0oWydERUxJVkVSRUQnLCAnSU5fUEVSU09OX0ZJVFRJTkcnXSksXG4gIHJldmlld01ldGhvZDogei5lbnVtKFsnT05MSU5FJywgJ1dIQVRTQVBQJywgJ09OU0lURSddKS5kZWZhdWx0KCdPTkxJTkUnKSxcbiAgYXJlYTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBpc0xhZ29zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KHRydWUpLFxuICBicmllZjogei5zdHJpbmcoKS5taW4oNSwgJ1RlbGwgdXMgYSBiaXQgbW9yZSBhYm91dCB3aGF0IHlvdSBuZWVkLicpLFxuICBjYXRlZ29yaWVzOiB6LnN0cmluZygpLm1pbigxLCAnUGljayBhdCBsZWFzdCBvbmUgY2F0ZWdvcnkuJyksXG4gIGNvbG91cnM6IHouc3RyaW5nKCkubWluKDEsICdQaWNrIGF0IGxlYXN0IG9uZSBjb2xvdXIuJyksXG4gIGJ1ZGdldDogei5zdHJpbmcoKS5taW4oMSwgJ1BpY2sgYSBidWRnZXQgYmFuZC4nKSxcbiAgbmVlZGVkQnk6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYnJhbmRUZXJtczogei5hcnJheSh6LnN0cmluZygpKS5vcHRpb25hbCgpLFxuICBicmFuZENob2ljZTogei5lbnVtKFsnQ09OVElOVUVEX0FDSycsICdXQUlUTElTVCddKS5vcHRpb25hbCgpLFxuICBmaXREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksIC8vIFlZWVktTU0tRERcbiAgZml0VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLCAvLyBcIjk6MDAgQU1cIlxuICBwcm9tb0NvZGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgLy8gT3B0aW9uYWwgc3RydWN0dXJlZCBicmllZiBmaWVsZHMgKGZvcndhcmQtY29tcGF0IHdpdGggYSByaWNoZXJcbiAgLy8gd2l6YXJkKS4gU3RvcmVkIG9uIFBTQnJpZWY7IGRlZmF1bHRzIHRvIG51bGwgd2hlbiBub3QgcHJvdmlkZWQuXG4gIGZpdDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBzdHlsZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBvY2Nhc2lvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBidWRnZXRCYW5kOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVyc29uYWxTaG9wcGluZ1JlcXVlc3QoXG4gIGlucHV0OiB6LmluZmVyPHR5cGVvZiBjcmVhdGVTY2hlbWE+LFxuKSB7XG4gIGNvbnN0IHBhcnNlZCA9IGNyZWF0ZVNjaGVtYS5zYWZlUGFyc2UoaW5wdXQpXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ1BsZWFzZSBjaGVjayB0aGUgZm9ybSBhbmQgdHJ5IGFnYWluLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGNvbnN0IGQgPSBwYXJzZWQuZGF0YVxuXG4gIC8vIEZvciB0aGUgaW4tcGVyc29uIGZpdHRpbmcgdGllciB0aGUgY3VzdG9tZXIgbXVzdCBwaWNrIGEgc2xvdC5cbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykge1xuICAgIGlmICghZC5maXREYXRlIHx8ICEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkLmZpdERhdGUpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIGRhdGUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGlmICghZC5maXRUaW1lIHx8ICFkLmZpdFRpbWUudHJpbSgpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIHRpbWUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGNvbnN0IHNsb3REYXRlT2JqID0gZGF0ZU9ubHkoZC5maXREYXRlKVxuICAgIGlmIChzbG90RGF0ZU9iai5nZXRVVENEYXkoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZpdHRpbmdzIHJ1biBNb25kYXkgdG8gU2F0dXJkYXkuIFBsZWFzZSBwaWNrIGFub3RoZXIgZGF0ZS4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgICBpZiAoIVBTX1NMT1RfVElNRVMuaW5jbHVkZXMoZC5maXRUaW1lIGFzICh0eXBlb2YgUFNfU0xPVF9USU1FUylbbnVtYmVyXSkpIHtcbiAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdQbGVhc2UgcGljayBvbmUgb2YgdGhlIGxpc3RlZCB0aW1lcy4nIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyBWYWxpZGF0ZSB0aGUgcHJvbW8gY29kZSAoaWYgc3VwcGxpZWQpIGJlZm9yZSB3ZSB0b3VjaCB0aGUgREIuIFdlXG4gIC8vIHJlLXJlc29sdmUgdGhlIGRpc2NvdW50IEFGVEVSIHdlIGtub3cgdGhlIGxpc3QgZmVlLlxuICBsZXQgcHJvbW86IHsgY29kZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsXG4gIGlmIChkLnByb21vQ29kZSAmJiBkLnByb21vQ29kZS50cmltKCkpIHtcbiAgICBwcm9tbyA9IGF3YWl0IHZhbGlkYXRlUFNQcm9tb0NvZGUoZC5wcm9tb0NvZGUpXG4gICAgaWYgKCFwcm9tbykge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1RoYXQgcHJvbW8gY29kZSBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuXG4gIC8vIE9wdGlvbmFsOiBsaW5rIHRvIGF1dGhlbnRpY2F0ZWQgdXNlciAoc28gdGhlIHJlcXVlc3Qgc2hvd3MgdXAgb25cbiAgLy8gdGhlIGN1c3RvbWVyJ3MgYWNjb3VudCBwYWdlIGlmIHRoZXkncmUgc2lnbmVkIGluKS5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZCB8fCBudWxsXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBsaXN0IGZlZSBmcm9tIFBTU2VydmljZVNldHRpbmcgKG9yIHNjaGVtYSBkZWZhdWx0KS5cbiAgY29uc3QgbGlzdEZlZSA9IGF3YWl0IHJlc29sdmVTb3VyY2luZ0ZlZShkLnRpZXIpXG4gIGxldCBzb3VyY2luZ0ZlZVBhaWQgPSBsaXN0RmVlXG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgbGV0IGRpc2NvdW50TGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsXG4gIGlmIChwcm9tbykge1xuICAgIGNvbnN0IGFwcGxpZWQgPSBhcHBseVByb21vRGlzY291bnQobGlzdEZlZSwgcHJvbW8pXG4gICAgc291cmNpbmdGZWVQYWlkID0gYXBwbGllZC5maW5hbEZlZVxuICAgIGRpc2NvdW50QW1vdW50ID0gYXBwbGllZC5kaXNjb3VudEFtb3VudFxuICAgIGRpc2NvdW50TGFiZWwgPSBhcHBsaWVkLmRpc2NvdW50TGFiZWxcbiAgfVxuXG4gIC8vIOKUgOKUgCBTbG90IGNsYXNoIGNoZWNrIChJTl9QRVJTT05fRklUVElORyBvbmx5KSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgLy8gUmUtY2hlY2sgdGhlIHNsb3QgaXMgc3RpbGwgZnJlZSByaWdodCBiZWZvcmUgY3JlYXRpbmcgdGhlIHJlcXVlc3QuXG4gIC8vIFRoZSBjdXN0b21lciBtYXkgaGF2ZSBsaW5nZXJlZCBvbiB0aGUgd2l6YXJkIGJldHdlZW4gZmV0Y2hpbmcgdGhlXG4gIC8vIGF2YWlsYWJsZSBzbG90cyBhbmQgc3VibWl0dGluZy5cbiAgbGV0IHNsb3REYXRlT2JqOiBEYXRlIHwgbnVsbCA9IG51bGxcbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJyAmJiBkLmZpdERhdGUgJiYgZC5maXRUaW1lKSB7XG4gICAgc2xvdERhdGVPYmogPSBkYXRlT25seShkLmZpdERhdGUpXG4gICAgY29uc3QgZGF5U3RhcnQgPSBzbG90RGF0ZU9ialxuICAgIGNvbnN0IGRheUVuZCA9IG5ldyBEYXRlKHNsb3REYXRlT2JqLmdldFRpbWUoKSArIDI0ICogNjAgKiA2MCAqIDEwMDApXG5cbiAgICAvLyBBY3RpdmUgUFNTbG90IGF0IHRoaXMgZXhhY3QgZGF0ZStzdGFydC5cbiAgICBjb25zdCBoZWxkQ2xhc2ggPSBhd2FpdCBkYi5wU1Nsb3QuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGRhdGU6IHsgZ3RlOiBkYXlTdGFydCwgbHQ6IGRheUVuZCB9LFxuICAgICAgICBzdGFydDogZC5maXRUaW1lLFxuICAgICAgICBPUjogW3sgaGVsZFVudGlsOiBudWxsIH0sIHsgaGVsZFVudGlsOiB7IGd0OiBuZXcgRGF0ZSgpIH0gfV0sXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoaGVsZENsYXNoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIGVycm9yOiBgVGhhdCBzbG90IHdhcyBqdXN0IHRha2VuLiBQbGVhc2UgcGljayBhbm90aGVyIHRpbWUgb24gJHtkLmZpdERhdGV9LmAsXG4gICAgICB9IGFzIGNvbnN0XG4gICAgfVxuXG4gICAgLy8gRXhpc3RpbmcgcGFpZC9hY3RpdmUgUFMgcmVxdWVzdCBhdCB0aGlzIGV4YWN0IGRhdGUrdGltZS5cbiAgICBjb25zdCByZXFDbGFzaCA9IGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgICBzdGF0dXM6IHsgbm90SW46IFsnQ0FOQ0VMTEVEJywgJ0RPTkUnXSB9LFxuICAgICAgICBmaXR0aW5nRGF0ZTogeyBndGU6IGRheVN0YXJ0LCBsdDogZGF5RW5kIH0sXG4gICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWUsXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAocmVxQ2xhc2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGBUaGF0IHNsb3Qgd2FzIGp1c3QgdGFrZW4uIFBsZWFzZSBwaWNrIGFub3RoZXIgdGltZSBvbiAke2QuZml0RGF0ZX0uYCxcbiAgICAgIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ3JlYXRlIHRoZSByZXF1ZXN0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAvLyBSZXRyeSBsb29wOiBpZiB0d28gY3VzdG9tZXJzIHN1Ym1pdCBhdCB0aGUgc2FtZSB0aW1lLCBib3RoIGNvdWxkXG4gIC8vIGNvbXB1dGUgdGhlIHNhbWUgV0MtUFMtIyMjIyBvZmYgdGhlIGN1cnJlbnQgbWF4IHN1ZmZpeCBhbmQgb25lXG4gIC8vIHdvdWxkIGZhaWwgb24gdGhlIHVuaXF1ZSBjb25zdHJhaW50LiBXZSByZXRyeSB1cCB0byAzIHRpbWVzIHdpdGggYVxuICAvLyBmcmVzaCBudW1iZXIgZWFjaCB0aW1lIChtaXJyb3JzIGNvbnN1bHRhdGlvbnMudHMpLlxuICBsZXQgYXR0ZW1wdHMgPSAwXG4gIGxldCBjcmVhdGVkOiB7IGlkOiBzdHJpbmc7IHJlZjogc3RyaW5nIH0gfCBudWxsID0gbnVsbFxuICB3aGlsZSAoYXR0ZW1wdHMgPCAzKSB7XG4gICAgYXR0ZW1wdHMrK1xuICAgIGNvbnN0IHJlZiA9IGF3YWl0IG5leHRQU1JlZigpXG4gICAgdHJ5IHtcbiAgICAgIGNyZWF0ZWQgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVmLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjdXN0b21lck5hbWU6IGQuY3VzdG9tZXJOYW1lLnRyaW0oKSxcbiAgICAgICAgICBjdXN0b21lclBob25lOiBkLmN1c3RvbWVyUGhvbmUudHJpbSgpLFxuICAgICAgICAgIGNvbnRhY3RWaWE6IGQuY29udGFjdFZpYSxcbiAgICAgICAgICBzaG9wcGluZ0ZvcjogZC5zaG9wcGluZ0Zvci50cmltKCksXG4gICAgICAgICAgdGllcjogZC50aWVyLFxuICAgICAgICAgIHJldmlld01ldGhvZDogZC5yZXZpZXdNZXRob2QsXG4gICAgICAgICAgYXJlYTogZC5hcmVhPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgICBpc0xhZ29zOiBkLmlzTGFnb3MsXG4gICAgICAgICAgYnJpZWY6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgICAgIGNhdGVnb3JpZXM6IGQuY2F0ZWdvcmllcy50cmltKCksXG4gICAgICAgICAgY29sb3VyczogZC5jb2xvdXJzLnRyaW0oKSxcbiAgICAgICAgICBidWRnZXQ6IGQuYnVkZ2V0LnRyaW0oKSxcbiAgICAgICAgICBuZWVkZWRCeTogZC5uZWVkZWRCeT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgYnJhbmRNZW50aW9uZWQ6XG4gICAgICAgICAgICBkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aFxuICAgICAgICAgICAgICA/IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICBicmFuZEFja25vd2xlZGdlZDogZC5icmFuZENob2ljZSA/PyBudWxsLFxuICAgICAgICAgIHNvdXJjaW5nRmVlUGFpZCxcbiAgICAgICAgICBkaXNjb3VudEFtb3VudCxcbiAgICAgICAgICBkaXNjb3VudExhYmVsLFxuICAgICAgICAgIHN0YXR1czogJ05FVycsXG4gICAgICAgICAgLy8gUGVyc2lzdCB0aGUgcGlja2VkIGZpdHRpbmcgc2xvdCBvbiB0aGUgcmVxdWVzdCBzb1xuICAgICAgICAgIC8vIGdldFBTQXZhaWxhYmxlU2xvdHMgc2VlcyBpdCBldmVuIGJlZm9yZSB0aGUgUFNTbG90IHJvdyBpc1xuICAgICAgICAgIC8vIGNyZWF0ZWQgKGFuZCBhZnRlciB0aGUgMTAtbWludXRlIGhvbGQgZXhwaXJlcykuXG4gICAgICAgICAgZml0dGluZ0RhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlZjogdHJ1ZSB9LFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBjb25zdCBtc2cgPSAoZT8ubWVzc2FnZSA/PyAnJykgYXMgc3RyaW5nXG4gICAgICBpZiAoXG4gICAgICAgIG1zZy5pbmNsdWRlcygndW5pcXVlJykgfHxcbiAgICAgICAgbXNnLmluY2x1ZGVzKCdVbmlxdWUnKSB8fFxuICAgICAgICBtc2cuaW5jbHVkZXMoJ1VOSVFVRScpIHx8XG4gICAgICAgIG1zZy5pbmNsdWRlcygnUDIwMDInKVxuICAgICAgKSB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDUwICogYXR0ZW1wdHMpKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogbXNnIHx8ICdDb3VsZCBub3QgY3JlYXRlIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuICBpZiAoIWNyZWF0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdXZSBjb3VsZCBub3QgcmVzZXJ2ZSB5b3VyIHJlcXVlc3QganVzdCBub3cuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCByZXF1ZXN0SWQgPSBjcmVhdGVkLmlkXG4gIGNvbnN0IHJlZiA9IGNyZWF0ZWQucmVmXG5cbiAgLy8g4pSA4pSAIFBTQnJpZWYg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIC8vIEFsd2F5cyBjcmVhdGUgYSBQU0JyaWVmIHJvdyDigJQgdGhlIGZyZWUtdGV4dCBicmllZiBsaXZlcyBvbiB0aGVcbiAgLy8gcmVxdWVzdCAoY29sdW1uIGBicmllZmApIGFuZCBvbiBQU0JyaWVmIChjb2x1bW4gYG5vdGVzYCkgc28gdGhlXG4gIC8vIHNob3J0bGlzdCBidWlsZGVyIGNhbiByZWFkIHRoZSBzdHJ1Y3R1cmVkIGZvcm0gc2VwYXJhdGVseSBmcm9tIHRoZVxuICAvLyBmbGF0IHJlcXVlc3Qgcm93LlxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBTQnJpZWYuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICBmaXQ6IGQuZml0Py50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgc3R5bGU6IGQuc3R5bGU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICBvY2Nhc2lvbjogZC5vY2Nhc2lvbj8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIGJ1ZGdldEJhbmQ6IGQuYnVkZ2V0QmFuZD8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIHNpemVzOiBkLnNpemVzPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgbm90ZXM6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNCcmllZiBjcmVhdGUgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gICAgLy8gTm9uLWZhdGFsIOKAlCB0aGUgcmVxdWVzdCByb3cgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aC5cbiAgfVxuXG4gIC8vIOKUgOKUgCBQU0JyaWVmRmxhZyAoaWYgYnJhbmQvZXhhY3QvbGluayB3YXMgZGV0ZWN0ZWQgJiBjdXN0b21lciBhY2snZCkg4pSA4pSAXG4gIGlmIChkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aCAmJiBkLmJyYW5kQ2hvaWNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTQnJpZWZGbGFnLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgICAgdGVybXM6IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpLFxuICAgICAgICAgIGN1c3RvbWVyQ2hvaWNlOiBkLmJyYW5kQ2hvaWNlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIFBTQnJpZWZGbGFnIGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIFBTU2xvdCAoSU5fUEVSU09OX0ZJVFRJTkcgb25seSkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGlmIChkLnRpZXIgPT09ICdJTl9QRVJTT05fRklUVElORycgJiYgc2xvdERhdGVPYmogJiYgZC5maXRUaW1lKSB7XG4gICAgY29uc3QgaG9sZFVudGlsID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIFBTX0hPTERfU0VDT05EUyAqIDEwMDApXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTU2xvdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgIGRhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIHN0YXJ0OiBkLmZpdFRpbWUudHJpbSgpLFxuICAgICAgICAgIGFyZWE6IGQuYXJlYT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgaGVsZFVudGlsOiBob2xkVW50aWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNTbG90IGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgICAvLyBOb24tZmF0YWwg4oCUIHRoZSByZXF1ZXN0J3MgZml0dGluZ0RhdGUvZml0dGluZ1RpbWUgc3RpbGwgZ2F0ZSB0aGVcbiAgICAgIC8vIHNsb3QgZnJvbSBiZWluZyBib29rZWQgYnkgYW5vdGhlciBjdXN0b21lci5cbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgUHJvbW8gY29kZSB1c2FnZSBidW1wIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBpZiAocHJvbW8pIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGIucFNQcm9tb0NvZGUudXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgY29kZTogcHJvbW8uY29kZSB9LFxuICAgICAgICBkYXRhOiB7IHRpbWVzVXNlZDogeyBpbmNyZW1lbnQ6IDEgfSB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIHByb21vIHRpbWVzVXNlZCBpbmNyZW1lbnQgZmFpbGVkOicsXG4gICAgICAgIChlIGFzIEVycm9yKS5tZXNzYWdlLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGF3YWl0IHdyaXRlUFNFdmVudChyZXF1ZXN0SWQsIHtcbiAgICBhY3RvclR5cGU6IHVzZXJJZCA/ICdDVVNUT01FUicgOiAnU1lTVEVNJyxcbiAgICBhY3RvcklkOiB1c2VySWQsXG4gICAgbm90ZTogYENyZWF0ZWQgJHtyZWZ9ICgke2QudGllcn0ke3Byb21vID8gYCwgJHtkaXNjb3VudExhYmVsfWAgOiAnJ30pYCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIHJlZiwgcmVxdWVzdElkIH0gYXMgY29uc3Rcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA0LiBpbml0aWFsaXplUFNQYXltZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSBzb3VyY2luZyBmZWUuIE1pcnJvcnNcbiAqIGBpbml0aWFsaXplQ29uc3VsdGF0aW9uUGF5bWVudGAgaW4gY29uc3VsdGF0aW9ucy50czpcbiAqICAgLSBsb29rIHVwIHRoZSByZXF1ZXN0IGJ5IGlkXG4gKiAgIC0gb25seSBhbGxvdyBwYXltZW50IHdoaWxlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIE5FVyAobm90IHlldFxuICogICAgIGFjY2VwdGVkIGJ5IHN0YWZmKVxuICogICAtIHN5bnRoZXNpemUgYSBwbGFjZWhvbGRlciBQYXlzdGFjayBlbWFpbCAodGhlIGN1c3RvbWVyJ3MgcmVhbFxuICogICAgIGNvbnRhY3QgY2hhbm5lbCBpcyB0aGUgcGhvbmUpXG4gKiAgIC0gcmV0dXJuIHRoZSBhdXRob3JpemF0aW9uX3VybCB0aGUgd2l6YXJkIHJlZGlyZWN0cyB0b1xuICpcbiAqIFRoZSBQYXlzdGFjayByZWZlcmVuY2UgaXMgYDxyZWY+LTxyYW5kb20+YCDigJQgdGhlIHdlYmhvb2sgbWF0Y2hlcyB0aGVcbiAqIGBXQy1QUy1gIHByZWZpeCB0byByb3V0ZSBjaGFyZ2Uuc3VjY2VzcyBiYWNrIHRvIHRoZSBQUyBoYW5kbGVyLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZVBTUGF5bWVudChyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzb3VyY2luZ0ZlZVBhaWQ6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfSxcbiAgfSlcbiAgaWYgKCFyZXEpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdSZXF1ZXN0IG5vdCBmb3VuZC4nIH0gYXMgY29uc3RcbiAgaWYgKHJlcS5zdGF0dXMgIT09ICdORVcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhd2FpdGluZyBwYXltZW50LicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGlmIChyZXEuc291cmNpbmdGZWVQYWlkIDw9IDApIHtcbiAgICAvLyBQcm9tbyBjb2RlIGJyb3VnaHQgdGhlIHNvdXJjaW5nIGZlZSB0byB6ZXJvIOKAlCBub3RoaW5nIHRvIGNoYXJnZS5cbiAgICAvLyBTdGFtcCBwYWlkQXQgc28gdGhlIHN0YWZmIHNlZSB0aGUgcmVxdWVzdCBhcyByZWFkeSB0byBhY2NlcHQuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEuaWQgfSxcbiAgICAgICAgZGF0YTogeyBwYWlkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCB7fVxuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBub3RlOiBgU291cmNpbmcgZmVlIHdhaXZlZCDigJQgbWFya2VkIHBhaWQgYXV0b21hdGljYWxseSBmb3IgJHtyZXEucmVmfWAsXG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IHRydWUsXG4gICAgICByZWZlcmVuY2U6IG51bGwsXG4gICAgICBhdXRob3JpemF0aW9uVXJsOiBudWxsLFxuICAgICAgYW1vdW50OiAwLFxuICAgICAgZmVlV2FpdmVkOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIFBheXN0YWNrIHJlZmVyZW5jZTogV0MtUFMtIyMjIy08cmFuZG9tPiDigJQgdW5pcXVlLCBhbmQgb3VyIHdlYmhvb2tcbiAgLy8gY2FuIG1hdGNoIHRoZSBwcmVmaXggYFdDLVBTLWAgdG8gcm91dGUgdG8gdGhlIFBTIGhhbmRsZXIuXG4gIGNvbnN0IHJlZmVyZW5jZSA9IGAke3JlcS5yZWZ9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWBcblxuICAvLyBQZXJzaXN0IHRoZSByZWZlcmVuY2Ugc28gdGhlIHdlYmhvb2sgKyB2ZXJpZnkgY2FuIGZpbmQgdGhlIHJvdy5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5pZCB9LFxuICAgICAgZGF0YTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGU/Lm1lc3NhZ2UgPz8gJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYCR7c2l0ZVVybH0vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcvY29uZmlybWVkYFxuICBjb25zdCBpbml0ID0gYXdhaXQgaW5pdGlhbGl6ZVBheXN0YWNrVHJhbnNhY3Rpb24oe1xuICAgIGVtYWlsOiBgJHtyZXEucmVmLnRvTG93ZXJDYXNlKCl9QHdhcmRyb2JlY2FyZS5ib29raW5nYCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgY3VzdG9tZXJfbmFtZTogcmVxLmN1c3RvbWVyTmFtZSxcbiAgICAgIGN1c3RvbWVyX3Bob25lOiByZXEuY3VzdG9tZXJQaG9uZSxcbiAgICAgIGN1c3RvbV9maWVsZHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1JlcXVlc3QnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdyZXF1ZXN0X3JlZicsXG4gICAgICAgICAgdmFsdWU6IHJlcS5yZWYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdTZXJ2aWNlJyxcbiAgICAgICAgICB2YXJpYWJsZV9uYW1lOiAnc2VydmljZScsXG4gICAgICAgICAgdmFsdWU6IFBTX1NFUlZJQ0VfTkFNRSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NvdXJjaW5nIGZlZScsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3NvdXJjaW5nX2ZlZScsXG4gICAgICAgICAgdmFsdWU6IGDigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuXG4gIGlmICghaW5pdC5zdGF0dXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGluaXQubWVzc2FnZSB8fCAnQ291bGQgbm90IGluaXRpYWxpc2UgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgcmVmZXJlbmNlLFxuICAgIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgZmVlV2FpdmVkOiBmYWxzZSxcbiAgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDUuIGNvbmZpcm1QU1BheW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFZlcmlmeSBhIFBheXN0YWNrIHRyYW5zYWN0aW9uIGZvciBhIFBTIHNvdXJjaW5nLWZlZSBwYXltZW50IGFuZCBtYXJrXG4gKiB0aGUgcmVxdWVzdCBwYWlkLiBNaXJyb3JzIGBjb25maXJtQ29uc3VsdGF0aW9uUGF5bWVudGA6XG4gKiAgIC0gbG9vayB1cCB0aGUgcmVxdWVzdCBieSBwYXltZW50UmVmZXJlbmNlXG4gKiAgIC0gaWRlbXBvdGVudCDigJQgaWYgdGhlIHJlcXVlc3QgaXMgYWxyZWFkeSBwYWlkIChwYWlkQXQgc2V0KSwgcmV0dXJuIG9rXG4gKiAgIC0gdmVyaWZ5IHdpdGggUGF5c3RhY2tcbiAqICAgLSBzdGFtcCBwYWlkQXRcbiAqICAgLSBzdGF0dXMgU1RBWVMgTkVXIChzdGFmZiBzdGlsbCBuZWVkIHRvIGFjY2VwdCB0aGUgcmVxdWVzdCDigJRcbiAqICAgICBgYWRtaW5BY2NlcHRQU1JlcXVlc3RgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzIGdhdGVzIG9uXG4gKiAgICAgc3RhdHVzPT09J05FVycpXG4gKiAgIC0gd3JpdGUgYSBQU0V2ZW50IHNvIHRoZSBhdWRpdCB0cmFpbCBzaG93cyB0aGUgcGF5bWVudFxuICpcbiAqIEJvdGggdGhlIGNsaWVudCB2ZXJpZnkgKHRoaXMgZnVuY3Rpb24pIGFuZCB0aGUgd2ViaG9vayBhcmVcbiAqIGlkZW1wb3RlbnQg4oCUIHdoaWNoZXZlciBsYW5kcyBmaXJzdCB3aW5zLCB0aGUgc2Vjb25kIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maXJtUFNQYXltZW50KHJlZmVyZW5jZTogc3RyaW5nKSB7XG4gIGlmICghcmVmZXJlbmNlKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBwYXltZW50IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVmOiB0cnVlLFxuICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgcGFpZEF0OiB0cnVlLFxuICAgICAgc291cmNpbmdGZWVQYWlkOiB0cnVlLFxuICAgICAgdXNlcklkOiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kIGZvciB0aGF0IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIElkZW1wb3RlbnQg4oCUIGFscmVhZHkgcGFpZC4gKFdlIGtlZXAgc3RhdHVzIGFzIE5FVywgc28gYSByZS12ZXJpZnlcbiAgLy8gYWZ0ZXIgdGhlIHdlYmhvb2sgaGFzIGxhbmRlZCBpcyBhIG5vLW9wIHJhdGhlciB0aGFuIGFuIGVycm9yLilcbiAgaWYgKHJlcS5wYWlkQXQpIHtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgcmVmOiByZXEucmVmLCBhbHJlYWR5UGFpZDogdHJ1ZSB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBWZXJpZnkgd2l0aCBQYXlzdGFja1xuICBjb25zdCB2ZXJpZnkgPSBhd2FpdCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uKHJlZmVyZW5jZSlcbiAgaWYgKCF2ZXJpZnkgfHwgIXZlcmlmeS5zdGF0dXMgfHwgdmVyaWZ5LmRhdGEuc3RhdHVzICE9PSAnc3VjY2VzcycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQYXltZW50IGNvdWxkIG5vdCBiZSB2ZXJpZmllZC4gSWYgeW91IHdlcmUgY2hhcmdlZCwgcGxlYXNlIGNvbnRhY3QgdXMuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBsZXQgZGlkVXBkYXRlID0gZmFsc2VcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBjb25zdCBmcmVzaCA9IGF3YWl0IHR4LnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIHNlbGVjdDogeyBwYWlkQXQ6IHRydWUgfSxcbiAgICAgIH0pXG4gICAgICBpZiAoIWZyZXNoKSByZXR1cm5cbiAgICAgIGlmIChmcmVzaC5wYWlkQXQpIHJldHVybiAvLyByYWNlZCB3aXRoIHRoZSB3ZWJob29rXG4gICAgICBhd2FpdCB0eC5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIGRhdGE6IHsgcGFpZEF0OiBuZXcgRGF0ZSgpIH0sXG4gICAgICB9KVxuICAgICAgZGlkVXBkYXRlID0gdHJ1ZVxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IG1hcmsgcmVxdWVzdCBhcyBwYWlkLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgaWYgKGRpZFVwZGF0ZSkge1xuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBhY3RvcklkOiByZXEudXNlcklkLFxuICAgICAgbm90ZTogYFNvdXJjaW5nIGZlZSBwYWlkIGZvciAke3JlcS5yZWZ9ICjigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX0pIOKAlCBhd2FpdGluZyBzdGFmZiBhY2NlcHRhbmNlYCxcbiAgICB9KVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCByZWY6IHJlcS5yZWYgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDYuIGdldFNob3J0bGlzdEJ5VG9rZW5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFB1YmxpYyBsb29rdXAgdXNlZCBieSB0aGUgb25saW5lIHNob3J0bGlzdCByZXZpZXcgcGFnZVxuICogKC9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9zaG9ydGxpc3QvW3Rva2VuXSkuIFJldHVybnM6XG4gKiAgIC0gdGhlIHNob3J0bGlzdCAoaWQsIHNlbnRBdCwgY2hhbm5lbCwgaG9sZFVudGlsKVxuICogICAtIHRoZSBpdGVtcyAob25lIHJvdyBwZXIgUFNTaG9ydGxpc3RJdGVtKVxuICogICAtIHJlcXVlc3QgaW5mbyAoY3VzdG9tZXJOYW1lLCBicmllZiwgYnVkZ2V0LCByZWYsIHRpZXIpXG4gKlxuICogUmV0dXJucyBudWxsIGlmOlxuICogICAtIHRoZSB0b2tlbiBkb2Vzbid0IG1hdGNoIGEgc2hvcnRsaXN0LCBPUlxuICogICAtIHRoZSBzaG9ydGxpc3QgaGFzIG5vdCBiZWVuIHNlbnQgeWV0IChzZW50QXQgaXMgbnVsbCkg4oCUIHRoZSBwYWdlXG4gKiAgICAgc2hvdWxkbid0IGJlIHJlYWNoYWJsZSBiZWZvcmUgdGhlIHN0eWxpc3Qgc2VuZHMgdGhlIGxpbmsuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTaG9ydGxpc3RCeVRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgaWYgKCF0b2tlbiB8fCAhdG9rZW4udHJpbSgpKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVxdWVzdElkOiB0cnVlLFxuICAgICAgdG9rZW46IHRydWUsXG4gICAgICBzZW50QXQ6IHRydWUsXG4gICAgICBjaGFubmVsOiB0cnVlLFxuICAgICAgaG9sZFVudGlsOiB0cnVlLFxuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0KSByZXR1cm4gbnVsbFxuICBpZiAoIXNob3J0bGlzdC5zZW50QXQpIHJldHVybiBudWxsIC8vIG5vdCB5ZXQgc2VudCB0byB0aGUgY3VzdG9tZXJcblxuICBjb25zdCBbaXRlbXMsIHJlcXVlc3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGRiLnBTU2hvcnRsaXN0SXRlbS5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBzaG9ydGxpc3RJZDogc2hvcnRsaXN0LmlkIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2FzYycgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgY2F0ZWdvcnk6IHRydWUsXG4gICAgICAgIHNpemU6IHRydWUsXG4gICAgICAgIHByaWNlOiB0cnVlLFxuICAgICAgICBzb3VyY2U6IHRydWUsXG4gICAgICAgIHN0eWxpc3ROb3RlOiB0cnVlLFxuICAgICAgICBkZWNpc2lvbjogdHJ1ZSxcbiAgICAgICAgYWx0Tm90ZTogdHJ1ZSxcbiAgICAgICAgZGVjaWRlZEJ5OiB0cnVlLFxuICAgICAgICBkZWNpZGVkQXQ6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2hvcnRsaXN0LnJlcXVlc3RJZCB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIHJlZjogdHJ1ZSxcbiAgICAgICAgY3VzdG9tZXJOYW1lOiB0cnVlLFxuICAgICAgICBicmllZjogdHJ1ZSxcbiAgICAgICAgYnVkZ2V0OiB0cnVlLFxuICAgICAgICB0aWVyOiB0cnVlLFxuICAgICAgICByZXZpZXdNZXRob2Q6IHRydWUsXG4gICAgICAgIGFyZWE6IHRydWUsXG4gICAgICAgIGlzTGFnb3M6IHRydWUsXG4gICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0pXG4gIGlmICghcmVxdWVzdCkgcmV0dXJuIG51bGxcblxuICByZXR1cm4ge1xuICAgIHNob3J0bGlzdDoge1xuICAgICAgaWQ6IHNob3J0bGlzdC5pZCxcbiAgICAgIHRva2VuOiBzaG9ydGxpc3QudG9rZW4sXG4gICAgICBjaGFubmVsOiBzaG9ydGxpc3QuY2hhbm5lbCxcbiAgICAgIHNlbnRBdDogc2hvcnRsaXN0LnNlbnRBdC50b0lTT1N0cmluZygpLFxuICAgICAgaG9sZFVudGlsOiBzaG9ydGxpc3QuaG9sZFVudGlsID8gc2hvcnRsaXN0LmhvbGRVbnRpbC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICB9LFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHJlZjogcmVxdWVzdC5yZWYsXG4gICAgICBjdXN0b21lck5hbWU6IHJlcXVlc3QuY3VzdG9tZXJOYW1lLFxuICAgICAgYnJpZWY6IHJlcXVlc3QuYnJpZWYsXG4gICAgICBidWRnZXQ6IHJlcXVlc3QuYnVkZ2V0LFxuICAgICAgdGllcjogcmVxdWVzdC50aWVyLFxuICAgICAgcmV2aWV3TWV0aG9kOiByZXF1ZXN0LnJldmlld01ldGhvZCxcbiAgICAgIGFyZWE6IHJlcXVlc3QuYXJlYSxcbiAgICAgIGlzTGFnb3M6IHJlcXVlc3QuaXNMYWdvcyxcbiAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgfSxcbiAgICBpdGVtczogaXRlbXMubWFwKChpKSA9PiAoe1xuICAgICAgLi4uaSxcbiAgICAgIGRlY2lkZWRBdDogaS5kZWNpZGVkQXQgPyBpLmRlY2lkZWRBdC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICAgIGNyZWF0ZWRBdDogaS5jcmVhdGVkQXQudG9JU09TdHJpbmcoKSxcbiAgICB9KSksXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA3LiBzdWJtaXRJdGVtRGVjaXNpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBkZWNpc2lvblZhbHVlcyA9IFsnS0VFUCcsICdTS0lQJywgJ1dBTlRTX0RJRkZFUkVOVCddIGFzIGNvbnN0XG5cbi8qKlxuICogUmVjb3JkIHRoZSBjdXN0b21lcidzIGRlY2lzaW9uIG9uIGEgc2luZ2xlIHNob3J0bGlzdCBpdGVtLiBDYWxsZWRcbiAqIGZyb20gdGhlIG9ubGluZSByZXZpZXcgcGFnZSB3aGVuIHRoZSBjdXN0b21lciB0YXBzIEtlZXAgLyBTa2lwIC9cbiAqIFwiV2FudCBzb21ldGhpbmcgZGlmZmVyZW50XCIgb24gZWFjaCByb3cuXG4gKlxuICogVGhlIGN1c3RvbWVyIG1heSBmbGlwIGEgZGVjaXNpb24gYmFjayBhbmQgZm9ydGggZnJlZWx5IHdoaWxlIHRoZVxuICogc2hvcnRsaXN0IGlzIHN0aWxsIG9wZW4uIGBkZWNpZGVkQnk9Q1VTVE9NRVJgIGlzIHN0YW1wZWQgc28gdGhlXG4gKiBzdHlsaXN0IGNhbiBkaXN0aW5ndWlzaCBjdXN0b21lci1zZXQgZGVjaXNpb25zIGZyb20gc3RhZmYgb3ZlcnJpZGVzXG4gKiAodGhlIGFkbWluIHdvcmtmbG93IHJlY29yZHMgU1RBRkYgdmlhIGBhZG1pblJlY29yZEl0ZW1EZWNpc2lvbmApLlxuICpcbiAqIEZvciBgV0FOVFNfRElGRkVSRU5UYCB0aGUgY3VzdG9tZXIgY2FuIGFkZCBhIGZyZWUtdGV4dCBgYWx0Tm90ZWBcbiAqIHNheWluZyB3aGF0IHRoZXkgd2FudCBpbnN0ZWFkICh0aGUgZmllbGQgaXMgY2xlYXJlZCBpZiB0aGUgY3VzdG9tZXJcbiAqIGxhdGVyIGZsaXBzIHRvIEtFRVAvU0tJUCDigJQgc2FtZSBiZWhhdmlvdXIgYXMgdGhlIGFkbWluIHNpZGUpLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0SXRlbURlY2lzaW9uKFxuICB0b2tlbjogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgZGVjaXNpb246IHN0cmluZyxcbiAgYWx0Tm90ZT86IHN0cmluZyxcbikge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFpdGVtSWQpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNaXNzaW5nIGl0ZW0gaWQuJyB9IGFzIGNvbnN0XG4gIGlmICghZGVjaXNpb25WYWx1ZXMuaW5jbHVkZXMoZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXSkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBkZWNpc2lvbi4nIH0gYXMgY29uc3RcbiAgfVxuICBjb25zdCBkZWNpc2lvblZhbHVlID0gZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtID0gYXdhaXQgZGIucFNTaG9ydGxpc3RJdGVtLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHNob3J0bGlzdElkOiB0cnVlLCBuYW1lOiB0cnVlLCBkZWNpc2lvbjogdHJ1ZSB9LFxuICB9KVxuICBpZiAoIWl0ZW0gfHwgaXRlbS5zaG9ydGxpc3RJZCAhPT0gc2hvcnRsaXN0LmlkKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ0l0ZW0gbm90IGZvdW5kIGluIHRoaXMgc2hvcnRsaXN0LicgfSBhcyBjb25zdFxuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0udXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGVjaXNpb246IGRlY2lzaW9uVmFsdWUsXG4gICAgICAgIGFsdE5vdGU6XG4gICAgICAgICAgZGVjaXNpb25WYWx1ZSA9PT0gJ1dBTlRTX0RJRkZFUkVOVCdcbiAgICAgICAgICAgID8gKGFsdE5vdGU/LnRyaW0oKSB8fCBudWxsKVxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICBkZWNpZGVkQnk6ICdDVVNUT01FUicsXG4gICAgICAgIGRlY2lkZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlPy5tZXNzYWdlID8/ICdDb3VsZCBub3QgcmVjb3JkIHlvdXIgZGVjaXNpb24uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBub3RlID1cbiAgICBgQ3VzdG9tZXIgZGVjaXNpb24gb24gXCIke2l0ZW0ubmFtZX1cIjogJHtkZWNpc2lvblZhbHVlfWAgK1xuICAgIChkZWNpc2lvblZhbHVlID09PSAnV0FOVFNfRElGRkVSRU5UJyAmJiBhbHROb3RlPy50cmltKClcbiAgICAgID8gYCDigJQgd2FudHM6ICR7YWx0Tm90ZS50cmltKCl9YFxuICAgICAgOiAnJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHNob3J0bGlzdC5yZXF1ZXN0SWQsIHsgYWN0b3JUeXBlOiAnQ1VTVE9NRVInLCBub3RlIH0pXG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCBkZWNpc2lvbjogZGVjaXNpb25WYWx1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOC4gcmVxdWVzdE1vcmVJdGVtc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogQ3VzdG9tZXIgc2F5cyBcIm5vbmUgb2YgdGhlc2Ugc3VpdCBtZVwiIC8gXCJJIHdhbnQgc29tZXRoaW5nIGRpZmZlcmVudFwiLlxuICogV3JpdGVzIGEgUFNFdmVudCBvbiB0aGUgdW5kZXJseWluZyByZXF1ZXN0IHNvIHRoZSBzdHlsaXN0IGlzXG4gKiBub3RpZmllZCB0byByZS1zb3VyY2UuIFRoZSBzaG9ydGxpc3Qgc3RheXMgb3BlbiDigJQgdGhlIGN1c3RvbWVyIGNhblxuICogc3RpbGwgdGFwIEtFRVAvU0tJUCBvbiB0aGUgZXhpc3RpbmcgaXRlbXMgYWZ0ZXIgdGhpcyBpcyBzdWJtaXR0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0TW9yZUl0ZW1zKHRva2VuOiBzdHJpbmcsIG5vdGU6IHN0cmluZykge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFub3RlIHx8IG5vdGUudHJpbSgpLmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQbGVhc2UgdGVsbCB1cyBhIGJpdCBtb3JlIGFib3V0IHdoYXQgeW91IHdhbnQgaW5zdGVhZC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBhd2FpdCB3cml0ZVBTRXZlbnQoc2hvcnRsaXN0LnJlcXVlc3RJZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgcmVxdWVzdGVkIG1vcmUgaXRlbXM6ICR7bm90ZS50cmltKCkuc2xpY2UoMCwgNTAwKX1gLFxuICB9KVxuXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcnKVxuICByZXR1cm4geyBvazogdHJ1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOS4gcGF5Rm9ySXRlbXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEZvciB0aGUgb25saW5lIHJldmlldyBmbG93OiB0aGUgY3VzdG9tZXIgaGFzIGZpbmlzaGVkIG1hcmtpbmdcbiAqIGl0ZW1zIEtFRVAgLyBTS0lQIC8gV0FOVFNfRElGRkVSRU5ULCBhbmQgbm93IHdhbnRzIHRvIHBheSBmb3IgdGhlXG4gKiBpdGVtcyB0aGV5J3JlIGtlZXBpbmcuIFRoaXM6XG4gKiAgIC0gc3VtcyB0aGUgcHJpY2VzIG9mIGV2ZXJ5IFBTU2hvcnRsaXN0SXRlbSB3aXRoIGRlY2lzaW9uPUtFRVBcbiAqICAgICBvbiB0aGUgcmVxdWVzdCdzIHNob3J0bGlzdFxuICogICAtIGFkZHMgdGhlIGRlbGl2ZXJ5IGZlZSAoZGVsaXZlcnlGZWVRdW90ZWQsIHNldCBieSBzdGFmZiwgZmFsbGluZ1xuICogICAgIGJhY2sgdG8gZGVsaXZlcnlGZWVab25lKVxuICogICAtIGluaXRpYWxpc2VzIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSB0b3RhbFxuICogICAtIHNldHMgcmVxdWVzdC5wYXltZW50TWV0aG9kID0gXCJsaW5rXCJcbiAqICAgLSB3cml0ZXMgYSBQU0V2ZW50XG4gKlxuICogUmV0dXJucyB0aGUgYXV0aG9yaXphdGlvbl91cmwgdGhlIGN1c3RvbWVyIGlzIHJlZGlyZWN0ZWQgdG8uIFRoZVxuICogYWN0dWFsIFwibWFyayBwYWlkXCIgaGFwcGVucyB2aWEgdGhlIFBheXN0YWNrIHdlYmhvb2sgKG9yIGEgc2VwYXJhdGVcbiAqIGNvbmZpcm0gc3RlcCkg4oCUIHRoaXMgYWN0aW9uIGp1c3Qga2lja3Mgb2ZmIHRoZSBwYXltZW50LlxuICpcbiAqIElmIHRoZSBjdXN0b21lciBoYXMga2VwdCB6ZXJvIGl0ZW1zLCB3ZSByZWZ1c2UgdG8gY2hhcmdlIOKAlCB0aGVyZSdzXG4gKiBub3RoaW5nIHRvIHBheSBmb3IuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXlGb3JJdGVtcyhyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgICBkZWxpdmVyeUZlZVF1b3RlZDogdHJ1ZSxcbiAgICAgIGRlbGl2ZXJ5RmVlWm9uZTogdHJ1ZSxcbiAgICB9LFxuICB9KVxuICBpZiAoIXJlcSkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kLicgfSBhcyBjb25zdFxuICBpZiAocmVxLnN0YXR1cyA9PT0gJ0NBTkNFTExFRCcgfHwgcmVxLnN0YXR1cyA9PT0gJ0RPTkUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhY2NlcHRpbmcgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHJlcXVlc3RJZCB9LFxuICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnTm8gc2hvcnRsaXN0IGhhcyBiZWVuIHNlbnQgZm9yIHRoaXMgcmVxdWVzdCB5ZXQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBrZXB0SXRlbXMgPSBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0uZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IHNob3J0bGlzdElkOiBzaG9ydGxpc3QuaWQsIGRlY2lzaW9uOiAnS0VFUCcgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIHByaWNlOiB0cnVlIH0sXG4gIH0pXG4gIGlmICgha2VwdEl0ZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogJ1BpY2sgYXQgbGVhc3Qgb25lIGl0ZW0gdG8ga2VlcCBiZWZvcmUgcGF5aW5nLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgY29uc3QgaXRlbXNTdWJ0b3RhbCA9IGtlcHRJdGVtcy5yZWR1Y2UoKHMsIGkpID0+IHMgKyBpLnByaWNlLCAwKVxuICBjb25zdCBkZWxpdmVyeUZlZSA9IHJlcS5kZWxpdmVyeUZlZVF1b3RlZCA/PyByZXEuZGVsaXZlcnlGZWVab25lID8/IDBcbiAgY29uc3QgdG90YWwgPSBpdGVtc1N1YnRvdGFsICsgZGVsaXZlcnlGZWVcbiAgaWYgKHRvdGFsIDw9IDApIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90aGluZyB0byBjaGFyZ2UuJyB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBEaXN0aW5jdCBwcmVmaXggc28gdGhlIHdlYmhvb2sgY2FuIHJvdXRlIGNoYXJnZS5zdWNjZXNzIHRvIHRoZVxuICAvLyBpdGVtcy1wYXltZW50IGhhbmRsZXIgKHNlcGFyYXRlIGZyb20gdGhlIHNvdXJjaW5nLWZlZSBwYXltZW50KS5cbiAgY29uc3QgcmVmZXJlbmNlID0gYCR7cmVxLnJlZn0tSVRFTVMtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YFxuXG4gIGNvbnN0IHNpdGVVcmwgPSBwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkwgPz8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgY29uc3QgY2FsbGJhY2tVcmwgPSBgJHtzaXRlVXJsfS9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9jb25maXJtZWRgXG4gIGNvbnN0IGluaXQgPSBhd2FpdCBpbml0aWFsaXplUGF5c3RhY2tUcmFuc2FjdGlvbih7XG4gICAgZW1haWw6IGAke3JlcS5yZWYudG9Mb3dlckNhc2UoKX1Ad2FyZHJvYmVjYXJlLmJvb2tpbmdgLFxuICAgIGFtb3VudDogdG90YWwsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgcGF5bWVudF9raW5kOiAnSVRFTVMnLFxuICAgICAgaXRlbXNfc3VidG90YWw6IGl0ZW1zU3VidG90YWwsXG4gICAgICBkZWxpdmVyeV9mZWU6IGRlbGl2ZXJ5RmVlLFxuICAgICAgY3VzdG9tX2ZpZWxkczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnUmVxdWVzdCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3JlcXVlc3RfcmVmJyxcbiAgICAgICAgICB2YWx1ZTogcmVxLnJlZixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NlcnZpY2UnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdzZXJ2aWNlJyxcbiAgICAgICAgICB2YWx1ZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnSXRlbXMnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdpdGVtc190b3RhbCcsXG4gICAgICAgICAgdmFsdWU6IGDigqYke2l0ZW1zU3VidG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnRGVsaXZlcnknLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdkZWxpdmVyeV9mZWUnLFxuICAgICAgICAgIHZhbHVlOiBg4oKmJHtkZWxpdmVyeUZlZS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdUb3RhbCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3RvdGFsJyxcbiAgICAgICAgICB2YWx1ZTogYOKCpiR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuICBpZiAoIWluaXQuc3RhdHVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBpbml0Lm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICBkYXRhOiB7IHBheW1lbnRNZXRob2Q6ICdsaW5rJyB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IHN0YXJ0IHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtTmFtZXMgPSBrZXB0SXRlbXMubWFwKChpKSA9PiBpLm5hbWUpLmpvaW4oJywgJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHJlcS5pZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgaW5pdGlhdGVkIGl0ZW1zIHBheW1lbnQgZm9yICR7cmVxLnJlZn06ICR7a2VwdEl0ZW1zLmxlbmd0aH0gaXRlbShzKSBbJHtpdGVtTmFtZXMuc2xpY2UoMCwgMjAwKX1dIMK3IGl0ZW1zIOKCpiR7aXRlbXNTdWJ0b3RhbC50b0xvY2FsZVN0cmluZygpfSArIGRlbGl2ZXJ5IOKCpiR7ZGVsaXZlcnlGZWUudG9Mb2NhbGVTdHJpbmcoKX0gPSDigqYke3RvdGFsLnRvTG9jYWxlU3RyaW5nKCl9YCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCwgcmVmZXJlbmNlLCB0b3RhbCB9IGFzIGNvbnN0XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJUQXNTc0IsME1BQUEifQ==
}),
"[project]/src/actions/data:5f9ccb [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initializePSPayment",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40b303c9c1c20dacd6abe126c92f6ad0f3d9d661a6":"initializePSPayment"},"src/actions/personal-shopping-customer.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40b303c9c1c20dacd6abe126c92f6ad0f3d9d661a6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "initializePSPayment");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQZXJzb25hbCBTaG9wcGluZyDigJQgY3VzdG9tZXItZmFjaW5nIHNlcnZlciBhY3Rpb25zLlxuICogVGhlIHN5bmMgYGNoZWNrQnJpZWZHdWFyZGAgaGVscGVyIGxpdmVzIGluIHNyYy9saWIvcHMtYnJpZWYtZ3VhcmQudHMuXG4gKi9cblxuJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSAnQC9saWIvc2Vzc2lvbidcbmltcG9ydCB7XG4gIGluaXRpYWxpemVQYXlzdGFja1RyYW5zYWN0aW9uLFxuICB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uLFxufSBmcm9tICdAL2xpYi9wYXlzdGFjay9zZXJ2ZXInXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJ1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENvbnN0YW50c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBTbG90IHRpbWVzIG9mZmVyZWQgZm9yIGluLXBlcnNvbiBmaXR0aW5ncyAoTW9u4oCTU2F0KS4gKi9cbmNvbnN0IFBTX1NMT1RfVElNRVMgPSBbJzk6MDAgQU0nLCAnMTE6MzAgQU0nLCAnMjowMCBQTScsICc0OjMwIFBNJ10gYXMgY29uc3RcblxuY29uc3QgUFNfU0VSVklDRV9OQU1FID0gJ1BlcnNvbmFsIFNob3BwaW5nJ1xuY29uc3QgUFNfSE9MRF9TRUNPTkRTID0gMTAgKiA2MCAvLyAxMC1taW51dGUgc2xvdCBob2xkXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogV3JpdGUgYSBQU0V2ZW50IHJvdy4gQmVzdC1lZmZvcnQg4oCUIGZhaWx1cmVzIGFyZSBzd2FsbG93ZWQgc28gdGhlXG4gKiBjdXN0b21lciBmbG93IG5ldmVyIGFib3J0cyBqdXN0IGJlY2F1c2UgdGhlIGF1ZGl0IHRyYWlsIGNvdWxkbid0IGJlXG4gKiB3cml0dGVuIChtaXJyb3JzIGB3cml0ZVBTRXZlbnRgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gd3JpdGVQU0V2ZW50KFxuICByZXF1ZXN0SWQ6IHN0cmluZyxcbiAgb3B0czogeyBhY3RvclR5cGU/OiBzdHJpbmc7IG5vdGU/OiBzdHJpbmcgfCBudWxsOyBhY3RvcklkPzogc3RyaW5nIHwgbnVsbCB9ID0ge30sXG4pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU0V2ZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHJlcXVlc3RJZCxcbiAgICAgICAgYWN0b3JJZDogb3B0cy5hY3RvcklkID8/IG51bGwsXG4gICAgICAgIGFjdG9yVHlwZTogb3B0cy5hY3RvclR5cGUgPz8gJ0NVU1RPTUVSJyxcbiAgICAgICAgbm90ZTogb3B0cy5ub3RlID8/IG51bGwsXG4gICAgICB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW3BlcnNvbmFsLXNob3BwaW5nLWN1c3RvbWVyXSB3cml0ZVBTRXZlbnQgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBuZXh0IFBTIHJlZiBvZmYgdGhlICpoaWdoZXN0KiBleGlzdGluZyBzdWZmaXguIFNhbWVcbiAqIGFwcHJvYWNoIGFzIGBuZXh0Qm9va2luZ051bWJlcmAgaW4gY29uc3VsdGF0aW9ucy50cyDigJQgdXNpbmdcbiAqIGNvdW50KCkrMSB3b3VsZCBjb2xsaWRlIGFmdGVyIHJvd3MgYXJlIGRlbGV0ZWQgKGNvdW50IGdvZXMgZG93bixcbiAqIG5leHQgbnVtYmVyIGNsYXNoZXMgd2l0aCBhbiBleGlzdGluZyBvbmUpLiBXYWxraW5nIHRoZSBtYXggc3VmZml4XG4gKiBrZWVwcyB0aGUgc2VxdWVuY2UgbW9ub3RvbmljLlxuICpcbiAqIEZhbGxzIGJhY2sgdG8gMSBpZiBubyBXQy1QUy0qIHJlcXVlc3RzIGV4aXN0IHlldC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbmV4dFBTUmVmKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGxhc3QgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7IHJlZjogeyBzdGFydHNXaXRoOiAnV0MtUFMtJyB9IH0sXG4gICAgb3JkZXJCeTogeyByZWY6ICdkZXNjJyB9LFxuICAgIHNlbGVjdDogeyByZWY6IHRydWUgfSxcbiAgfSlcbiAgbGV0IG5leHQgPSAxXG4gIGlmIChsYXN0KSB7XG4gICAgY29uc3QgbSA9IGxhc3QucmVmLm1hdGNoKC9eV0MtUFMtKFxcZCspJC8pXG4gICAgaWYgKG0pIG5leHQgPSBwYXJzZUludChtWzFdLCAxMCkgKyAxXG4gIH1cbiAgcmV0dXJuIGBXQy1QUy0ke1N0cmluZyhuZXh0KS5wYWRTdGFydCg0LCAnMCcpfWBcbn1cblxuLyoqIE5vcm1hbGlzZSBhIGRhdGUgc3RyaW5nIGBZWVlZLU1NLUREYCBpbnRvIGEgVVRDIG1pZG5pZ2h0IERhdGVUaW1lLiAqL1xuZnVuY3Rpb24gZGF0ZU9ubHkoczogc3RyaW5nKTogRGF0ZSB7XG4gIGNvbnN0IFt5LCBtLCBkXSA9IHMuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKVxuICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeSwgbSAtIDEsIGQsIDAsIDAsIDApKVxufVxuXG4vKiogRm9ybWF0IGEgRGF0ZSBiYWNrIGludG8gYSBgWVlZWS1NTS1ERGAgc3RyaW5nIChVVEMsIG5vIHRpbWUgc2hpZnQpLiAqL1xuZnVuY3Rpb24geW1kKGQ6IERhdGUpOiBzdHJpbmcge1xuICByZXR1cm4gZC50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxufVxuXG4vKiogRXNjYXBlIGEgc3RyaW5nIHNvIGl0IGNhbiBiZSBzYWZlbHkgZW1iZWRkZWQgaW4gYSBSZWdFeHAuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG59XG5cbi8qKiBEZS1kdXBsaWNhdGUgYW4gYXJyYXkgd2hpbGUgcHJlc2VydmluZyBvcmRlci4gKi9cbmZ1bmN0aW9uIGRlZHVwZTxUPih4czogVFtdKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh4cykpXG59XG5cbi8qKlxuICogUmVzb2x2ZSB0aGUgc291cmNpbmcgZmVlIGZvciBhIGdpdmVuIHRpZXIgZnJvbSB0aGUgUFNTZXJ2aWNlU2V0dGluZ1xuICogc2luZ2xldG9uLiBGYWxscyBiYWNrIHRvIHRoZSBzY2hlbWEgZGVmYXVsdHMgKDQ1LDAwMCAvIDUwLDAwMCkgd2hlblxuICogdGhlIHJvdyBkb2Vzbid0IGV4aXN0IHlldCAobWlycm9ycyBjb21wdXRlRml0dGluZ1RvdGFsIGluIHRoZVxuICogYWRtaW4gd29ya2Zsb3cpLlxuICovXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlU291cmNpbmdGZWUoXG4gIHRpZXI6ICdERUxJVkVSRUQnIHwgJ0lOX1BFUlNPTl9GSVRUSU5HJyxcbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIucFNTZXJ2aWNlU2V0dGluZy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgaWYgKCFzZXR0aW5ncykge1xuICAgIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnID8gNTAwMDAgOiA0NTAwMFxuICB9XG4gIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnXG4gICAgPyBzZXR0aW5ncy5pblBlcnNvbkZpdHRpbmdGZWVcbiAgICA6IHNldHRpbmdzLmRlbGl2ZXJlZEZlZVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIGEgcHJvbW8gY29kZSBhbmQgcmV0dXJuIHRoZSBkaXNjb3VudCArIGZpbmFsIGZlZS5cbiAqIFJldHVybnMgbnVsbCB3aGVuIHRoZSBjb2RlIGlzIGludmFsaWQgKGluYWN0aXZlLCBleHBpcmVkLCBvciB1bmtub3duKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVQU1Byb21vQ29kZShcbiAgY29kZTogc3RyaW5nLFxuKTogUHJvbWlzZTx7IGNvZGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB2YWx1ZTogbnVtYmVyOyBsYWJlbDogc3RyaW5nIH0gfCBudWxsPiB7XG4gIGNvbnN0IHVwcGVyID0gY29kZS50cmltKCkudG9VcHBlckNhc2UoKVxuICBpZiAoIXVwcGVyKSByZXR1cm4gbnVsbFxuICBjb25zdCByb3cgPSBhd2FpdCBkYi5wU1Byb21vQ29kZS5maW5kVW5pcXVlKHsgd2hlcmU6IHsgY29kZTogdXBwZXIgfSB9KVxuICBpZiAoIXJvdykgcmV0dXJuIG51bGxcbiAgaWYgKCFyb3cuYWN0aXZlKSByZXR1cm4gbnVsbFxuICBpZiAocm93LmV4cGlyZXNBdCAmJiByb3cuZXhwaXJlc0F0LmdldFRpbWUoKSA8IERhdGUubm93KCkpIHJldHVybiBudWxsXG4gIC8vIE5vIGV4cGxpY2l0IG1heFVzZXMgY29sdW1uIG9uIHRoZSBzY2hlbWEg4oCUIHRoZSBhZG1pbiBkaXNhYmxlcyBjb2Rlc1xuICAvLyBvbmNlIHRoZXkndmUgYmVlbiB1c2VkIGVub3VnaCwgc28gdGltZXNVc2VkIGFsb25lIGlzbid0IGEgaGFyZCBsaW1pdC5cbiAgcmV0dXJuIHsgY29kZTogcm93LmNvZGUsIHR5cGU6IHJvdy50eXBlLCB2YWx1ZTogcm93LnZhbHVlLCBsYWJlbDogcm93LmNvZGUgfVxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIGRpc2NvdW50IGFtb3VudCBhbmQgdGhlIGZpbmFsIGZlZSBnaXZlbiBhIHByb21vIGNvZGUgcm93XG4gKiBhbmQgdGhlIGxpc3QgZmVlLiBNaXJyb3JzIHRoZSBzZW1hbnRpY3MgdXNlZCBpblxuICogcGVyc29uYWwtc2hvcHBpbmctd29ya2Zsb3cudHM6XG4gKiAgIC0gUEVSQ0VOVDogZGlzY291bnQgPSBsaXN0RmVlICogdmFsdWUgLyAxMDAgICh2YWx1ZSAx4oCTMTAwKVxuICogICAtIEZJWEVEOiAgIGRpc2NvdW50ID0gdmFsdWUgICAgICAgICAgICAgICAgICAobmFpcmEgYW1vdW50IG9mZilcbiAqICAgLSBGUkVFOiAgICBkaXNjb3VudCA9IGxpc3RGZWUgICAgICAgICAgICAgICAgKGZ1bGwgc291cmNpbmcgZmVlIHdhaXZlZClcbiAqXG4gKiBUaGUgZGlzY291bnQgaXMgY2xhbXBlZCBzbyB0aGUgZmluYWwgZmVlIG5ldmVyIGdvZXMgYmVsb3cgemVyby5cbiAqL1xuZnVuY3Rpb24gYXBwbHlQcm9tb0Rpc2NvdW50KFxuICBsaXN0RmVlOiBudW1iZXIsXG4gIHByb21vOiB7IHR5cGU6IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9LFxuKTogeyBkaXNjb3VudEFtb3VudDogbnVtYmVyOyBmaW5hbEZlZTogbnVtYmVyOyBkaXNjb3VudExhYmVsOiBzdHJpbmcgfSB7XG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgaWYgKHByb21vLnR5cGUgPT09ICdQRVJDRU5UJykge1xuICAgIGNvbnN0IHBjdCA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5yb3VuZCgobGlzdEZlZSAqIHBjdCkgLyAxMDApXG4gIH0gZWxzZSBpZiAocHJvbW8udHlwZSA9PT0gJ0ZJWEVEJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4obGlzdEZlZSwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICB9IGVsc2UgaWYgKHByb21vLnR5cGUgPT09ICdGUkVFJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gbGlzdEZlZVxuICB9XG4gIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4oZGlzY291bnRBbW91bnQsIGxpc3RGZWUpXG4gIGNvbnN0IGZpbmFsRmVlID0gbGlzdEZlZSAtIGRpc2NvdW50QW1vdW50XG4gIGNvbnN0IGRpc2NvdW50TGFiZWwgPSBwcm9tby50eXBlID09PSAnRlJFRSdcbiAgICA/IGBQcm9tbyAke3Byb21vLmxhYmVsfTogZnJlZSBzb3VyY2luZ2BcbiAgICA6IHByb21vLnR5cGUgPT09ICdQRVJDRU5UJ1xuICAgICAgPyBgUHJvbW8gJHtwcm9tby5sYWJlbH06ICR7cHJvbW8udmFsdWV9JSBvZmYgc291cmNpbmcgZmVlYFxuICAgICAgOiBgUHJvbW8gJHtwcm9tby5sYWJlbH06IOKCpiR7cHJvbW8udmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0gb2ZmIHNvdXJjaW5nIGZlZWBcbiAgcmV0dXJuIHsgZGlzY291bnRBbW91bnQsIGZpbmFsRmVlLCBkaXNjb3VudExhYmVsIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAyLiBnZXRQU0F2YWlsYWJsZVNsb3RzIOKAlCBJbi1QZXJzb24gZml0dGluZyBzbG90c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUmV0dXJuIHRoZSBhdmFpbGFibGUgSW4tUGVyc29uIGZpdHRpbmcgc2xvdHMgZm9yIHRoZSBuZXh0IE4gZGF5c1xuICogc3RhcnRpbmcgYXQgYGZyb21gIChZWVlZLU1NLUREKS4gU3VuZGF5cyBhcmUgc2tpcHBlZCAoc2Vzc2lvbnMgcnVuXG4gKiBNb25kYXkgdG8gU2F0dXJkYXkpLiBUaGUgZm91ciBkYWlseSBzbG90IHRpbWVzIGFyZSA5OjAwIEFNLFxuICogMTE6MzAgQU0sIDI6MDAgUE0gYW5kIDQ6MzAgUE0g4oCUIHNhbWUgZ3JpZCBhcyBXYXJkcm9iZSBDb25zdWx0YXRpb25zLlxuICpcbiAqIEEgc2xvdCBpcyBleGNsdWRlZCBpZiBlaXRoZXI6XG4gKiAgIC0gYSBgUFNTbG90YCByb3cgZXhpc3RzIGZvciB0aGF0IGRhdGUrc3RhcnQgd2l0aCBhbiBhY3RpdmUgaG9sZFxuICogICAgIChoZWxkVW50aWwgSVMgTlVMTCBtZWFucyBib29rZWQ7IGhlbGRVbnRpbCA+IG5vdyBtZWFucyBoZWxkXG4gKiAgICAgZHVyaW5nIGNoZWNrb3V0OyBoZWxkVW50aWwgPCBub3cgbWVhbnMgdGhlIGhvbGQgZXhwaXJlZCBhbmQgdGhlXG4gKiAgICAgc2xvdCBpcyBmcmVlIGFnYWluKSwgT1JcbiAqICAgLSBhIGBQZXJzb25hbFNob3BwaW5nUmVxdWVzdGAgZXhpc3RzIHdpdGggdGllcj1JTl9QRVJTT05fRklUVElORyxcbiAqICAgICBzdGF0dXMgbm90IENBTkNFTExFRC9ET05FLCBmaXR0aW5nRGF0ZSBtYXRjaGluZyB0aGUgZGF5IGFuZFxuICogICAgIGZpdHRpbmdUaW1lIG1hdGNoaW5nIHRoZSBzbG90LlxuICpcbiAqIGBtb2RlYCBpcyB0aGUgdGllciB0aGUgY3VzdG9tZXIgaGFzIHBpY2tlZC4gV2hlbiB0aGUgY3VzdG9tZXIgaXMgb25cbiAqIHRoZSBERUxJVkVSRUQgdGllciB0aGVyZSBhcmUgbm8gZml0dGluZyBzbG90cyDigJQgcmV0dXJuIFtdIHNvIHRoZVxuICogd2l6YXJkIGNhbiBza2lwIHRoZSBzbG90IHBpY2tlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBTQXZhaWxhYmxlU2xvdHMoaW5wdXQ6IHtcbiAgZnJvbTogc3RyaW5nXG4gIGRheXM6IG51bWJlclxuICBtb2RlOiBzdHJpbmdcbn0pIHtcbiAgaWYgKCFpbnB1dD8uZnJvbSB8fCAhL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoaW5wdXQuZnJvbSkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZiAoaW5wdXQubW9kZSAhPT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykgcmV0dXJuIFtdXG5cbiAgY29uc3QgZGF5cyA9IE1hdGgubWF4KDEsIE1hdGgubWluKDYwLCBOdW1iZXIoaW5wdXQuZGF5cykgfHwgMTQpKVxuICBjb25zdCBzdGFydCA9IGRhdGVPbmx5KGlucHV0LmZyb20pXG4gIC8vIEJ1aWxkIHRoZSBkYXkgbGlzdCDigJQgaW5jbHVzaXZlIG9mIGBmcm9tYCwgZXhjbHVzaXZlIG9mIGBmcm9tICsgZGF5c2AuXG4gIGNvbnN0IGRheUxpc3Q6IERhdGVbXSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF5czsgaSsrKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIGkgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxuICAgIGlmIChkLmdldFVUQ0RheSgpID09PSAwKSBjb250aW51ZSAvLyBza2lwIFN1bmRheXNcbiAgICBkYXlMaXN0LnB1c2goZClcbiAgfVxuICBpZiAoIWRheUxpc3QubGVuZ3RoKSByZXR1cm4gW11cblxuICBjb25zdCByYW5nZVN0YXJ0ID0gZGF5TGlzdFswXVxuICBjb25zdCByYW5nZUVuZCA9IG5ldyBEYXRlKFxuICAgIGRheUxpc3RbZGF5TGlzdC5sZW5ndGggLSAxXS5nZXRUaW1lKCkgKyAyNCAqIDYwICogNjAgKiAxMDAwLFxuICApXG5cbiAgLy8gQWN0aXZlIFBTU2xvdHMg4oCUIGhlbGQgb3IgYWxyZWFkeSBib29rZWQuXG4gIGNvbnN0IGhlbGRTbG90cyA9IGF3YWl0IGRiLnBTU2xvdC5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIGRhdGU6IHsgZ3RlOiByYW5nZVN0YXJ0LCBsdDogcmFuZ2VFbmQgfSxcbiAgICAgIE9SOiBbeyBoZWxkVW50aWw6IG51bGwgfSwgeyBoZWxkVW50aWw6IHsgZ3Q6IG5ldyBEYXRlKCkgfSB9XSxcbiAgICB9LFxuICAgIHNlbGVjdDogeyBkYXRlOiB0cnVlLCBzdGFydDogdHJ1ZSB9LFxuICB9KVxuXG4gIC8vIEFjdGl2ZSBQUyByZXF1ZXN0cyAodGllcj1JTl9QRVJTT05fRklUVElORywgbm90IENBTkNFTExFRC9ET05FKS5cbiAgY29uc3QgYm9va2VkID0gYXdhaXQgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgc3RhdHVzOiB7IG5vdEluOiBbJ0NBTkNFTExFRCcsICdET05FJ10gfSxcbiAgICAgIGZpdHRpbmdEYXRlOiB7IGd0ZTogcmFuZ2VTdGFydCwgbHQ6IHJhbmdlRW5kIH0sXG4gICAgfSxcbiAgICBzZWxlY3Q6IHsgZml0dGluZ0RhdGU6IHRydWUsIGZpdHRpbmdUaW1lOiB0cnVlIH0sXG4gIH0pXG5cbiAgY29uc3QgdGFrZW4gPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGNvbnN0IHMgb2YgaGVsZFNsb3RzKSB7XG4gICAgdGFrZW4uYWRkKGAke3ltZChzLmRhdGUpfXwke3Muc3RhcnR9YClcbiAgfVxuICBmb3IgKGNvbnN0IGIgb2YgYm9va2VkKSB7XG4gICAgaWYgKGIuZml0dGluZ0RhdGUgJiYgYi5maXR0aW5nVGltZSkge1xuICAgICAgdGFrZW4uYWRkKGAke3ltZChiLmZpdHRpbmdEYXRlKX18JHtiLmZpdHRpbmdUaW1lfWApXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb3V0OiB7IGRhdGU6IHN0cmluZzsgdGltZTogc3RyaW5nOyBmdWxsTGFiZWw6IHN0cmluZyB9W10gPSBbXVxuICBmb3IgKGNvbnN0IGQgb2YgZGF5TGlzdCkge1xuICAgIGNvbnN0IGRzID0geW1kKGQpXG4gICAgZm9yIChjb25zdCB0aW1lIG9mIFBTX1NMT1RfVElNRVMpIHtcbiAgICAgIGlmICh0YWtlbi5oYXMoYCR7ZHN9fCR7dGltZX1gKSkgY29udGludWVcbiAgICAgIG91dC5wdXNoKHtcbiAgICAgICAgZGF0ZTogZHMsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZ1bGxMYWJlbDogYCR7ZHN9IMK3ICR7dGltZX1gLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDMuIGNyZWF0ZVBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY3JlYXRlU2NoZW1hID0gei5vYmplY3Qoe1xuICBjdXN0b21lck5hbWU6IHouc3RyaW5nKCkubWluKDIsICdQbGVhc2UgZW50ZXIgeW91ciBmdWxsIG5hbWUuJyksXG4gIGN1c3RvbWVyUGhvbmU6IHouc3RyaW5nKCkubWluKDcsICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXIuJyksXG4gIGNvbnRhY3RWaWE6IHouZW51bShbJ0NhbGwnLCAnV2hhdHNBcHAnLCAnRW1haWwnXSksXG4gIHNob3BwaW5nRm9yOiB6LnN0cmluZygpLm1pbigxLCAnUGxlYXNlIHRlbGwgdXMgd2hvIHRoaXMgaXMgZm9yLicpLFxuICB0aWVyOiB6LmVudW0oWydERUxJVkVSRUQnLCAnSU5fUEVSU09OX0ZJVFRJTkcnXSksXG4gIHJldmlld01ldGhvZDogei5lbnVtKFsnT05MSU5FJywgJ1dIQVRTQVBQJywgJ09OU0lURSddKS5kZWZhdWx0KCdPTkxJTkUnKSxcbiAgYXJlYTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBpc0xhZ29zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KHRydWUpLFxuICBicmllZjogei5zdHJpbmcoKS5taW4oNSwgJ1RlbGwgdXMgYSBiaXQgbW9yZSBhYm91dCB3aGF0IHlvdSBuZWVkLicpLFxuICBjYXRlZ29yaWVzOiB6LnN0cmluZygpLm1pbigxLCAnUGljayBhdCBsZWFzdCBvbmUgY2F0ZWdvcnkuJyksXG4gIGNvbG91cnM6IHouc3RyaW5nKCkubWluKDEsICdQaWNrIGF0IGxlYXN0IG9uZSBjb2xvdXIuJyksXG4gIGJ1ZGdldDogei5zdHJpbmcoKS5taW4oMSwgJ1BpY2sgYSBidWRnZXQgYmFuZC4nKSxcbiAgbmVlZGVkQnk6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYnJhbmRUZXJtczogei5hcnJheSh6LnN0cmluZygpKS5vcHRpb25hbCgpLFxuICBicmFuZENob2ljZTogei5lbnVtKFsnQ09OVElOVUVEX0FDSycsICdXQUlUTElTVCddKS5vcHRpb25hbCgpLFxuICBmaXREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksIC8vIFlZWVktTU0tRERcbiAgZml0VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLCAvLyBcIjk6MDAgQU1cIlxuICBwcm9tb0NvZGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgLy8gT3B0aW9uYWwgc3RydWN0dXJlZCBicmllZiBmaWVsZHMgKGZvcndhcmQtY29tcGF0IHdpdGggYSByaWNoZXJcbiAgLy8gd2l6YXJkKS4gU3RvcmVkIG9uIFBTQnJpZWY7IGRlZmF1bHRzIHRvIG51bGwgd2hlbiBub3QgcHJvdmlkZWQuXG4gIGZpdDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBzdHlsZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBvY2Nhc2lvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBidWRnZXRCYW5kOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVyc29uYWxTaG9wcGluZ1JlcXVlc3QoXG4gIGlucHV0OiB6LmluZmVyPHR5cGVvZiBjcmVhdGVTY2hlbWE+LFxuKSB7XG4gIGNvbnN0IHBhcnNlZCA9IGNyZWF0ZVNjaGVtYS5zYWZlUGFyc2UoaW5wdXQpXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ1BsZWFzZSBjaGVjayB0aGUgZm9ybSBhbmQgdHJ5IGFnYWluLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGNvbnN0IGQgPSBwYXJzZWQuZGF0YVxuXG4gIC8vIEZvciB0aGUgaW4tcGVyc29uIGZpdHRpbmcgdGllciB0aGUgY3VzdG9tZXIgbXVzdCBwaWNrIGEgc2xvdC5cbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykge1xuICAgIGlmICghZC5maXREYXRlIHx8ICEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkLmZpdERhdGUpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIGRhdGUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGlmICghZC5maXRUaW1lIHx8ICFkLmZpdFRpbWUudHJpbSgpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIHRpbWUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGNvbnN0IHNsb3REYXRlT2JqID0gZGF0ZU9ubHkoZC5maXREYXRlKVxuICAgIGlmIChzbG90RGF0ZU9iai5nZXRVVENEYXkoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZpdHRpbmdzIHJ1biBNb25kYXkgdG8gU2F0dXJkYXkuIFBsZWFzZSBwaWNrIGFub3RoZXIgZGF0ZS4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgICBpZiAoIVBTX1NMT1RfVElNRVMuaW5jbHVkZXMoZC5maXRUaW1lIGFzICh0eXBlb2YgUFNfU0xPVF9USU1FUylbbnVtYmVyXSkpIHtcbiAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdQbGVhc2UgcGljayBvbmUgb2YgdGhlIGxpc3RlZCB0aW1lcy4nIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyBWYWxpZGF0ZSB0aGUgcHJvbW8gY29kZSAoaWYgc3VwcGxpZWQpIGJlZm9yZSB3ZSB0b3VjaCB0aGUgREIuIFdlXG4gIC8vIHJlLXJlc29sdmUgdGhlIGRpc2NvdW50IEFGVEVSIHdlIGtub3cgdGhlIGxpc3QgZmVlLlxuICBsZXQgcHJvbW86IHsgY29kZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsXG4gIGlmIChkLnByb21vQ29kZSAmJiBkLnByb21vQ29kZS50cmltKCkpIHtcbiAgICBwcm9tbyA9IGF3YWl0IHZhbGlkYXRlUFNQcm9tb0NvZGUoZC5wcm9tb0NvZGUpXG4gICAgaWYgKCFwcm9tbykge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1RoYXQgcHJvbW8gY29kZSBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuXG4gIC8vIE9wdGlvbmFsOiBsaW5rIHRvIGF1dGhlbnRpY2F0ZWQgdXNlciAoc28gdGhlIHJlcXVlc3Qgc2hvd3MgdXAgb25cbiAgLy8gdGhlIGN1c3RvbWVyJ3MgYWNjb3VudCBwYWdlIGlmIHRoZXkncmUgc2lnbmVkIGluKS5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZCB8fCBudWxsXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBsaXN0IGZlZSBmcm9tIFBTU2VydmljZVNldHRpbmcgKG9yIHNjaGVtYSBkZWZhdWx0KS5cbiAgY29uc3QgbGlzdEZlZSA9IGF3YWl0IHJlc29sdmVTb3VyY2luZ0ZlZShkLnRpZXIpXG4gIGxldCBzb3VyY2luZ0ZlZVBhaWQgPSBsaXN0RmVlXG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgbGV0IGRpc2NvdW50TGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsXG4gIGlmIChwcm9tbykge1xuICAgIGNvbnN0IGFwcGxpZWQgPSBhcHBseVByb21vRGlzY291bnQobGlzdEZlZSwgcHJvbW8pXG4gICAgc291cmNpbmdGZWVQYWlkID0gYXBwbGllZC5maW5hbEZlZVxuICAgIGRpc2NvdW50QW1vdW50ID0gYXBwbGllZC5kaXNjb3VudEFtb3VudFxuICAgIGRpc2NvdW50TGFiZWwgPSBhcHBsaWVkLmRpc2NvdW50TGFiZWxcbiAgfVxuXG4gIC8vIOKUgOKUgCBTbG90IGNsYXNoIGNoZWNrIChJTl9QRVJTT05fRklUVElORyBvbmx5KSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgLy8gUmUtY2hlY2sgdGhlIHNsb3QgaXMgc3RpbGwgZnJlZSByaWdodCBiZWZvcmUgY3JlYXRpbmcgdGhlIHJlcXVlc3QuXG4gIC8vIFRoZSBjdXN0b21lciBtYXkgaGF2ZSBsaW5nZXJlZCBvbiB0aGUgd2l6YXJkIGJldHdlZW4gZmV0Y2hpbmcgdGhlXG4gIC8vIGF2YWlsYWJsZSBzbG90cyBhbmQgc3VibWl0dGluZy5cbiAgbGV0IHNsb3REYXRlT2JqOiBEYXRlIHwgbnVsbCA9IG51bGxcbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJyAmJiBkLmZpdERhdGUgJiYgZC5maXRUaW1lKSB7XG4gICAgc2xvdERhdGVPYmogPSBkYXRlT25seShkLmZpdERhdGUpXG4gICAgY29uc3QgZGF5U3RhcnQgPSBzbG90RGF0ZU9ialxuICAgIGNvbnN0IGRheUVuZCA9IG5ldyBEYXRlKHNsb3REYXRlT2JqLmdldFRpbWUoKSArIDI0ICogNjAgKiA2MCAqIDEwMDApXG5cbiAgICAvLyBBY3RpdmUgUFNTbG90IGF0IHRoaXMgZXhhY3QgZGF0ZStzdGFydC5cbiAgICBjb25zdCBoZWxkQ2xhc2ggPSBhd2FpdCBkYi5wU1Nsb3QuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGRhdGU6IHsgZ3RlOiBkYXlTdGFydCwgbHQ6IGRheUVuZCB9LFxuICAgICAgICBzdGFydDogZC5maXRUaW1lLFxuICAgICAgICBPUjogW3sgaGVsZFVudGlsOiBudWxsIH0sIHsgaGVsZFVudGlsOiB7IGd0OiBuZXcgRGF0ZSgpIH0gfV0sXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoaGVsZENsYXNoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIGVycm9yOiBgVGhhdCBzbG90IHdhcyBqdXN0IHRha2VuLiBQbGVhc2UgcGljayBhbm90aGVyIHRpbWUgb24gJHtkLmZpdERhdGV9LmAsXG4gICAgICB9IGFzIGNvbnN0XG4gICAgfVxuXG4gICAgLy8gRXhpc3RpbmcgcGFpZC9hY3RpdmUgUFMgcmVxdWVzdCBhdCB0aGlzIGV4YWN0IGRhdGUrdGltZS5cbiAgICBjb25zdCByZXFDbGFzaCA9IGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgICBzdGF0dXM6IHsgbm90SW46IFsnQ0FOQ0VMTEVEJywgJ0RPTkUnXSB9LFxuICAgICAgICBmaXR0aW5nRGF0ZTogeyBndGU6IGRheVN0YXJ0LCBsdDogZGF5RW5kIH0sXG4gICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWUsXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAocmVxQ2xhc2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGBUaGF0IHNsb3Qgd2FzIGp1c3QgdGFrZW4uIFBsZWFzZSBwaWNrIGFub3RoZXIgdGltZSBvbiAke2QuZml0RGF0ZX0uYCxcbiAgICAgIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ3JlYXRlIHRoZSByZXF1ZXN0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAvLyBSZXRyeSBsb29wOiBpZiB0d28gY3VzdG9tZXJzIHN1Ym1pdCBhdCB0aGUgc2FtZSB0aW1lLCBib3RoIGNvdWxkXG4gIC8vIGNvbXB1dGUgdGhlIHNhbWUgV0MtUFMtIyMjIyBvZmYgdGhlIGN1cnJlbnQgbWF4IHN1ZmZpeCBhbmQgb25lXG4gIC8vIHdvdWxkIGZhaWwgb24gdGhlIHVuaXF1ZSBjb25zdHJhaW50LiBXZSByZXRyeSB1cCB0byAzIHRpbWVzIHdpdGggYVxuICAvLyBmcmVzaCBudW1iZXIgZWFjaCB0aW1lIChtaXJyb3JzIGNvbnN1bHRhdGlvbnMudHMpLlxuICBsZXQgYXR0ZW1wdHMgPSAwXG4gIGxldCBjcmVhdGVkOiB7IGlkOiBzdHJpbmc7IHJlZjogc3RyaW5nIH0gfCBudWxsID0gbnVsbFxuICB3aGlsZSAoYXR0ZW1wdHMgPCAzKSB7XG4gICAgYXR0ZW1wdHMrK1xuICAgIGNvbnN0IHJlZiA9IGF3YWl0IG5leHRQU1JlZigpXG4gICAgdHJ5IHtcbiAgICAgIGNyZWF0ZWQgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVmLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjdXN0b21lck5hbWU6IGQuY3VzdG9tZXJOYW1lLnRyaW0oKSxcbiAgICAgICAgICBjdXN0b21lclBob25lOiBkLmN1c3RvbWVyUGhvbmUudHJpbSgpLFxuICAgICAgICAgIGNvbnRhY3RWaWE6IGQuY29udGFjdFZpYSxcbiAgICAgICAgICBzaG9wcGluZ0ZvcjogZC5zaG9wcGluZ0Zvci50cmltKCksXG4gICAgICAgICAgdGllcjogZC50aWVyLFxuICAgICAgICAgIHJldmlld01ldGhvZDogZC5yZXZpZXdNZXRob2QsXG4gICAgICAgICAgYXJlYTogZC5hcmVhPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgICBpc0xhZ29zOiBkLmlzTGFnb3MsXG4gICAgICAgICAgYnJpZWY6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgICAgIGNhdGVnb3JpZXM6IGQuY2F0ZWdvcmllcy50cmltKCksXG4gICAgICAgICAgY29sb3VyczogZC5jb2xvdXJzLnRyaW0oKSxcbiAgICAgICAgICBidWRnZXQ6IGQuYnVkZ2V0LnRyaW0oKSxcbiAgICAgICAgICBuZWVkZWRCeTogZC5uZWVkZWRCeT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgYnJhbmRNZW50aW9uZWQ6XG4gICAgICAgICAgICBkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aFxuICAgICAgICAgICAgICA/IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICBicmFuZEFja25vd2xlZGdlZDogZC5icmFuZENob2ljZSA/PyBudWxsLFxuICAgICAgICAgIHNvdXJjaW5nRmVlUGFpZCxcbiAgICAgICAgICBkaXNjb3VudEFtb3VudCxcbiAgICAgICAgICBkaXNjb3VudExhYmVsLFxuICAgICAgICAgIHN0YXR1czogJ05FVycsXG4gICAgICAgICAgLy8gUGVyc2lzdCB0aGUgcGlja2VkIGZpdHRpbmcgc2xvdCBvbiB0aGUgcmVxdWVzdCBzb1xuICAgICAgICAgIC8vIGdldFBTQXZhaWxhYmxlU2xvdHMgc2VlcyBpdCBldmVuIGJlZm9yZSB0aGUgUFNTbG90IHJvdyBpc1xuICAgICAgICAgIC8vIGNyZWF0ZWQgKGFuZCBhZnRlciB0aGUgMTAtbWludXRlIGhvbGQgZXhwaXJlcykuXG4gICAgICAgICAgZml0dGluZ0RhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlZjogdHJ1ZSB9LFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBjb25zdCBtc2cgPSAoZT8ubWVzc2FnZSA/PyAnJykgYXMgc3RyaW5nXG4gICAgICBpZiAoXG4gICAgICAgIG1zZy5pbmNsdWRlcygndW5pcXVlJykgfHxcbiAgICAgICAgbXNnLmluY2x1ZGVzKCdVbmlxdWUnKSB8fFxuICAgICAgICBtc2cuaW5jbHVkZXMoJ1VOSVFVRScpIHx8XG4gICAgICAgIG1zZy5pbmNsdWRlcygnUDIwMDInKVxuICAgICAgKSB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDUwICogYXR0ZW1wdHMpKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogbXNnIHx8ICdDb3VsZCBub3QgY3JlYXRlIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuICBpZiAoIWNyZWF0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdXZSBjb3VsZCBub3QgcmVzZXJ2ZSB5b3VyIHJlcXVlc3QganVzdCBub3cuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCByZXF1ZXN0SWQgPSBjcmVhdGVkLmlkXG4gIGNvbnN0IHJlZiA9IGNyZWF0ZWQucmVmXG5cbiAgLy8g4pSA4pSAIFBTQnJpZWYg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIC8vIEFsd2F5cyBjcmVhdGUgYSBQU0JyaWVmIHJvdyDigJQgdGhlIGZyZWUtdGV4dCBicmllZiBsaXZlcyBvbiB0aGVcbiAgLy8gcmVxdWVzdCAoY29sdW1uIGBicmllZmApIGFuZCBvbiBQU0JyaWVmIChjb2x1bW4gYG5vdGVzYCkgc28gdGhlXG4gIC8vIHNob3J0bGlzdCBidWlsZGVyIGNhbiByZWFkIHRoZSBzdHJ1Y3R1cmVkIGZvcm0gc2VwYXJhdGVseSBmcm9tIHRoZVxuICAvLyBmbGF0IHJlcXVlc3Qgcm93LlxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBTQnJpZWYuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICBmaXQ6IGQuZml0Py50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgc3R5bGU6IGQuc3R5bGU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICBvY2Nhc2lvbjogZC5vY2Nhc2lvbj8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIGJ1ZGdldEJhbmQ6IGQuYnVkZ2V0QmFuZD8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIHNpemVzOiBkLnNpemVzPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgbm90ZXM6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNCcmllZiBjcmVhdGUgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gICAgLy8gTm9uLWZhdGFsIOKAlCB0aGUgcmVxdWVzdCByb3cgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aC5cbiAgfVxuXG4gIC8vIOKUgOKUgCBQU0JyaWVmRmxhZyAoaWYgYnJhbmQvZXhhY3QvbGluayB3YXMgZGV0ZWN0ZWQgJiBjdXN0b21lciBhY2snZCkg4pSA4pSAXG4gIGlmIChkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aCAmJiBkLmJyYW5kQ2hvaWNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTQnJpZWZGbGFnLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgICAgdGVybXM6IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpLFxuICAgICAgICAgIGN1c3RvbWVyQ2hvaWNlOiBkLmJyYW5kQ2hvaWNlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIFBTQnJpZWZGbGFnIGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIFBTU2xvdCAoSU5fUEVSU09OX0ZJVFRJTkcgb25seSkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGlmIChkLnRpZXIgPT09ICdJTl9QRVJTT05fRklUVElORycgJiYgc2xvdERhdGVPYmogJiYgZC5maXRUaW1lKSB7XG4gICAgY29uc3QgaG9sZFVudGlsID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIFBTX0hPTERfU0VDT05EUyAqIDEwMDApXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTU2xvdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgIGRhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIHN0YXJ0OiBkLmZpdFRpbWUudHJpbSgpLFxuICAgICAgICAgIGFyZWE6IGQuYXJlYT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgaGVsZFVudGlsOiBob2xkVW50aWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNTbG90IGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgICAvLyBOb24tZmF0YWwg4oCUIHRoZSByZXF1ZXN0J3MgZml0dGluZ0RhdGUvZml0dGluZ1RpbWUgc3RpbGwgZ2F0ZSB0aGVcbiAgICAgIC8vIHNsb3QgZnJvbSBiZWluZyBib29rZWQgYnkgYW5vdGhlciBjdXN0b21lci5cbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgUHJvbW8gY29kZSB1c2FnZSBidW1wIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBpZiAocHJvbW8pIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGIucFNQcm9tb0NvZGUudXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgY29kZTogcHJvbW8uY29kZSB9LFxuICAgICAgICBkYXRhOiB7IHRpbWVzVXNlZDogeyBpbmNyZW1lbnQ6IDEgfSB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIHByb21vIHRpbWVzVXNlZCBpbmNyZW1lbnQgZmFpbGVkOicsXG4gICAgICAgIChlIGFzIEVycm9yKS5tZXNzYWdlLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGF3YWl0IHdyaXRlUFNFdmVudChyZXF1ZXN0SWQsIHtcbiAgICBhY3RvclR5cGU6IHVzZXJJZCA/ICdDVVNUT01FUicgOiAnU1lTVEVNJyxcbiAgICBhY3RvcklkOiB1c2VySWQsXG4gICAgbm90ZTogYENyZWF0ZWQgJHtyZWZ9ICgke2QudGllcn0ke3Byb21vID8gYCwgJHtkaXNjb3VudExhYmVsfWAgOiAnJ30pYCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIHJlZiwgcmVxdWVzdElkIH0gYXMgY29uc3Rcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA0LiBpbml0aWFsaXplUFNQYXltZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSBzb3VyY2luZyBmZWUuIE1pcnJvcnNcbiAqIGBpbml0aWFsaXplQ29uc3VsdGF0aW9uUGF5bWVudGAgaW4gY29uc3VsdGF0aW9ucy50czpcbiAqICAgLSBsb29rIHVwIHRoZSByZXF1ZXN0IGJ5IGlkXG4gKiAgIC0gb25seSBhbGxvdyBwYXltZW50IHdoaWxlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIE5FVyAobm90IHlldFxuICogICAgIGFjY2VwdGVkIGJ5IHN0YWZmKVxuICogICAtIHN5bnRoZXNpemUgYSBwbGFjZWhvbGRlciBQYXlzdGFjayBlbWFpbCAodGhlIGN1c3RvbWVyJ3MgcmVhbFxuICogICAgIGNvbnRhY3QgY2hhbm5lbCBpcyB0aGUgcGhvbmUpXG4gKiAgIC0gcmV0dXJuIHRoZSBhdXRob3JpemF0aW9uX3VybCB0aGUgd2l6YXJkIHJlZGlyZWN0cyB0b1xuICpcbiAqIFRoZSBQYXlzdGFjayByZWZlcmVuY2UgaXMgYDxyZWY+LTxyYW5kb20+YCDigJQgdGhlIHdlYmhvb2sgbWF0Y2hlcyB0aGVcbiAqIGBXQy1QUy1gIHByZWZpeCB0byByb3V0ZSBjaGFyZ2Uuc3VjY2VzcyBiYWNrIHRvIHRoZSBQUyBoYW5kbGVyLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZVBTUGF5bWVudChyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzb3VyY2luZ0ZlZVBhaWQ6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfSxcbiAgfSlcbiAgaWYgKCFyZXEpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdSZXF1ZXN0IG5vdCBmb3VuZC4nIH0gYXMgY29uc3RcbiAgaWYgKHJlcS5zdGF0dXMgIT09ICdORVcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhd2FpdGluZyBwYXltZW50LicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGlmIChyZXEuc291cmNpbmdGZWVQYWlkIDw9IDApIHtcbiAgICAvLyBQcm9tbyBjb2RlIGJyb3VnaHQgdGhlIHNvdXJjaW5nIGZlZSB0byB6ZXJvIOKAlCBub3RoaW5nIHRvIGNoYXJnZS5cbiAgICAvLyBTdGFtcCBwYWlkQXQgc28gdGhlIHN0YWZmIHNlZSB0aGUgcmVxdWVzdCBhcyByZWFkeSB0byBhY2NlcHQuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEuaWQgfSxcbiAgICAgICAgZGF0YTogeyBwYWlkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCB7fVxuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBub3RlOiBgU291cmNpbmcgZmVlIHdhaXZlZCDigJQgbWFya2VkIHBhaWQgYXV0b21hdGljYWxseSBmb3IgJHtyZXEucmVmfWAsXG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IHRydWUsXG4gICAgICByZWZlcmVuY2U6IG51bGwsXG4gICAgICBhdXRob3JpemF0aW9uVXJsOiBudWxsLFxuICAgICAgYW1vdW50OiAwLFxuICAgICAgZmVlV2FpdmVkOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIFBheXN0YWNrIHJlZmVyZW5jZTogV0MtUFMtIyMjIy08cmFuZG9tPiDigJQgdW5pcXVlLCBhbmQgb3VyIHdlYmhvb2tcbiAgLy8gY2FuIG1hdGNoIHRoZSBwcmVmaXggYFdDLVBTLWAgdG8gcm91dGUgdG8gdGhlIFBTIGhhbmRsZXIuXG4gIGNvbnN0IHJlZmVyZW5jZSA9IGAke3JlcS5yZWZ9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWBcblxuICAvLyBQZXJzaXN0IHRoZSByZWZlcmVuY2Ugc28gdGhlIHdlYmhvb2sgKyB2ZXJpZnkgY2FuIGZpbmQgdGhlIHJvdy5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5pZCB9LFxuICAgICAgZGF0YTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGU/Lm1lc3NhZ2UgPz8gJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYCR7c2l0ZVVybH0vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcvY29uZmlybWVkYFxuICBjb25zdCBpbml0ID0gYXdhaXQgaW5pdGlhbGl6ZVBheXN0YWNrVHJhbnNhY3Rpb24oe1xuICAgIGVtYWlsOiBgJHtyZXEucmVmLnRvTG93ZXJDYXNlKCl9QHdhcmRyb2JlY2FyZS5ib29raW5nYCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgY3VzdG9tZXJfbmFtZTogcmVxLmN1c3RvbWVyTmFtZSxcbiAgICAgIGN1c3RvbWVyX3Bob25lOiByZXEuY3VzdG9tZXJQaG9uZSxcbiAgICAgIGN1c3RvbV9maWVsZHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1JlcXVlc3QnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdyZXF1ZXN0X3JlZicsXG4gICAgICAgICAgdmFsdWU6IHJlcS5yZWYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdTZXJ2aWNlJyxcbiAgICAgICAgICB2YXJpYWJsZV9uYW1lOiAnc2VydmljZScsXG4gICAgICAgICAgdmFsdWU6IFBTX1NFUlZJQ0VfTkFNRSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NvdXJjaW5nIGZlZScsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3NvdXJjaW5nX2ZlZScsXG4gICAgICAgICAgdmFsdWU6IGDigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuXG4gIGlmICghaW5pdC5zdGF0dXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGluaXQubWVzc2FnZSB8fCAnQ291bGQgbm90IGluaXRpYWxpc2UgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgcmVmZXJlbmNlLFxuICAgIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgZmVlV2FpdmVkOiBmYWxzZSxcbiAgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDUuIGNvbmZpcm1QU1BheW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFZlcmlmeSBhIFBheXN0YWNrIHRyYW5zYWN0aW9uIGZvciBhIFBTIHNvdXJjaW5nLWZlZSBwYXltZW50IGFuZCBtYXJrXG4gKiB0aGUgcmVxdWVzdCBwYWlkLiBNaXJyb3JzIGBjb25maXJtQ29uc3VsdGF0aW9uUGF5bWVudGA6XG4gKiAgIC0gbG9vayB1cCB0aGUgcmVxdWVzdCBieSBwYXltZW50UmVmZXJlbmNlXG4gKiAgIC0gaWRlbXBvdGVudCDigJQgaWYgdGhlIHJlcXVlc3QgaXMgYWxyZWFkeSBwYWlkIChwYWlkQXQgc2V0KSwgcmV0dXJuIG9rXG4gKiAgIC0gdmVyaWZ5IHdpdGggUGF5c3RhY2tcbiAqICAgLSBzdGFtcCBwYWlkQXRcbiAqICAgLSBzdGF0dXMgU1RBWVMgTkVXIChzdGFmZiBzdGlsbCBuZWVkIHRvIGFjY2VwdCB0aGUgcmVxdWVzdCDigJRcbiAqICAgICBgYWRtaW5BY2NlcHRQU1JlcXVlc3RgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzIGdhdGVzIG9uXG4gKiAgICAgc3RhdHVzPT09J05FVycpXG4gKiAgIC0gd3JpdGUgYSBQU0V2ZW50IHNvIHRoZSBhdWRpdCB0cmFpbCBzaG93cyB0aGUgcGF5bWVudFxuICpcbiAqIEJvdGggdGhlIGNsaWVudCB2ZXJpZnkgKHRoaXMgZnVuY3Rpb24pIGFuZCB0aGUgd2ViaG9vayBhcmVcbiAqIGlkZW1wb3RlbnQg4oCUIHdoaWNoZXZlciBsYW5kcyBmaXJzdCB3aW5zLCB0aGUgc2Vjb25kIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maXJtUFNQYXltZW50KHJlZmVyZW5jZTogc3RyaW5nKSB7XG4gIGlmICghcmVmZXJlbmNlKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBwYXltZW50IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVmOiB0cnVlLFxuICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgcGFpZEF0OiB0cnVlLFxuICAgICAgc291cmNpbmdGZWVQYWlkOiB0cnVlLFxuICAgICAgdXNlcklkOiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kIGZvciB0aGF0IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIElkZW1wb3RlbnQg4oCUIGFscmVhZHkgcGFpZC4gKFdlIGtlZXAgc3RhdHVzIGFzIE5FVywgc28gYSByZS12ZXJpZnlcbiAgLy8gYWZ0ZXIgdGhlIHdlYmhvb2sgaGFzIGxhbmRlZCBpcyBhIG5vLW9wIHJhdGhlciB0aGFuIGFuIGVycm9yLilcbiAgaWYgKHJlcS5wYWlkQXQpIHtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgcmVmOiByZXEucmVmLCBhbHJlYWR5UGFpZDogdHJ1ZSB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBWZXJpZnkgd2l0aCBQYXlzdGFja1xuICBjb25zdCB2ZXJpZnkgPSBhd2FpdCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uKHJlZmVyZW5jZSlcbiAgaWYgKCF2ZXJpZnkgfHwgIXZlcmlmeS5zdGF0dXMgfHwgdmVyaWZ5LmRhdGEuc3RhdHVzICE9PSAnc3VjY2VzcycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQYXltZW50IGNvdWxkIG5vdCBiZSB2ZXJpZmllZC4gSWYgeW91IHdlcmUgY2hhcmdlZCwgcGxlYXNlIGNvbnRhY3QgdXMuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBsZXQgZGlkVXBkYXRlID0gZmFsc2VcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBjb25zdCBmcmVzaCA9IGF3YWl0IHR4LnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIHNlbGVjdDogeyBwYWlkQXQ6IHRydWUgfSxcbiAgICAgIH0pXG4gICAgICBpZiAoIWZyZXNoKSByZXR1cm5cbiAgICAgIGlmIChmcmVzaC5wYWlkQXQpIHJldHVybiAvLyByYWNlZCB3aXRoIHRoZSB3ZWJob29rXG4gICAgICBhd2FpdCB0eC5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIGRhdGE6IHsgcGFpZEF0OiBuZXcgRGF0ZSgpIH0sXG4gICAgICB9KVxuICAgICAgZGlkVXBkYXRlID0gdHJ1ZVxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IG1hcmsgcmVxdWVzdCBhcyBwYWlkLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgaWYgKGRpZFVwZGF0ZSkge1xuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBhY3RvcklkOiByZXEudXNlcklkLFxuICAgICAgbm90ZTogYFNvdXJjaW5nIGZlZSBwYWlkIGZvciAke3JlcS5yZWZ9ICjigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX0pIOKAlCBhd2FpdGluZyBzdGFmZiBhY2NlcHRhbmNlYCxcbiAgICB9KVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCByZWY6IHJlcS5yZWYgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDYuIGdldFNob3J0bGlzdEJ5VG9rZW5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFB1YmxpYyBsb29rdXAgdXNlZCBieSB0aGUgb25saW5lIHNob3J0bGlzdCByZXZpZXcgcGFnZVxuICogKC9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9zaG9ydGxpc3QvW3Rva2VuXSkuIFJldHVybnM6XG4gKiAgIC0gdGhlIHNob3J0bGlzdCAoaWQsIHNlbnRBdCwgY2hhbm5lbCwgaG9sZFVudGlsKVxuICogICAtIHRoZSBpdGVtcyAob25lIHJvdyBwZXIgUFNTaG9ydGxpc3RJdGVtKVxuICogICAtIHJlcXVlc3QgaW5mbyAoY3VzdG9tZXJOYW1lLCBicmllZiwgYnVkZ2V0LCByZWYsIHRpZXIpXG4gKlxuICogUmV0dXJucyBudWxsIGlmOlxuICogICAtIHRoZSB0b2tlbiBkb2Vzbid0IG1hdGNoIGEgc2hvcnRsaXN0LCBPUlxuICogICAtIHRoZSBzaG9ydGxpc3QgaGFzIG5vdCBiZWVuIHNlbnQgeWV0IChzZW50QXQgaXMgbnVsbCkg4oCUIHRoZSBwYWdlXG4gKiAgICAgc2hvdWxkbid0IGJlIHJlYWNoYWJsZSBiZWZvcmUgdGhlIHN0eWxpc3Qgc2VuZHMgdGhlIGxpbmsuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTaG9ydGxpc3RCeVRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgaWYgKCF0b2tlbiB8fCAhdG9rZW4udHJpbSgpKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVxdWVzdElkOiB0cnVlLFxuICAgICAgdG9rZW46IHRydWUsXG4gICAgICBzZW50QXQ6IHRydWUsXG4gICAgICBjaGFubmVsOiB0cnVlLFxuICAgICAgaG9sZFVudGlsOiB0cnVlLFxuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0KSByZXR1cm4gbnVsbFxuICBpZiAoIXNob3J0bGlzdC5zZW50QXQpIHJldHVybiBudWxsIC8vIG5vdCB5ZXQgc2VudCB0byB0aGUgY3VzdG9tZXJcblxuICBjb25zdCBbaXRlbXMsIHJlcXVlc3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGRiLnBTU2hvcnRsaXN0SXRlbS5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBzaG9ydGxpc3RJZDogc2hvcnRsaXN0LmlkIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2FzYycgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgY2F0ZWdvcnk6IHRydWUsXG4gICAgICAgIHNpemU6IHRydWUsXG4gICAgICAgIHByaWNlOiB0cnVlLFxuICAgICAgICBzb3VyY2U6IHRydWUsXG4gICAgICAgIHN0eWxpc3ROb3RlOiB0cnVlLFxuICAgICAgICBkZWNpc2lvbjogdHJ1ZSxcbiAgICAgICAgYWx0Tm90ZTogdHJ1ZSxcbiAgICAgICAgZGVjaWRlZEJ5OiB0cnVlLFxuICAgICAgICBkZWNpZGVkQXQ6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2hvcnRsaXN0LnJlcXVlc3RJZCB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIHJlZjogdHJ1ZSxcbiAgICAgICAgY3VzdG9tZXJOYW1lOiB0cnVlLFxuICAgICAgICBicmllZjogdHJ1ZSxcbiAgICAgICAgYnVkZ2V0OiB0cnVlLFxuICAgICAgICB0aWVyOiB0cnVlLFxuICAgICAgICByZXZpZXdNZXRob2Q6IHRydWUsXG4gICAgICAgIGFyZWE6IHRydWUsXG4gICAgICAgIGlzTGFnb3M6IHRydWUsXG4gICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0pXG4gIGlmICghcmVxdWVzdCkgcmV0dXJuIG51bGxcblxuICByZXR1cm4ge1xuICAgIHNob3J0bGlzdDoge1xuICAgICAgaWQ6IHNob3J0bGlzdC5pZCxcbiAgICAgIHRva2VuOiBzaG9ydGxpc3QudG9rZW4sXG4gICAgICBjaGFubmVsOiBzaG9ydGxpc3QuY2hhbm5lbCxcbiAgICAgIHNlbnRBdDogc2hvcnRsaXN0LnNlbnRBdC50b0lTT1N0cmluZygpLFxuICAgICAgaG9sZFVudGlsOiBzaG9ydGxpc3QuaG9sZFVudGlsID8gc2hvcnRsaXN0LmhvbGRVbnRpbC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICB9LFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHJlZjogcmVxdWVzdC5yZWYsXG4gICAgICBjdXN0b21lck5hbWU6IHJlcXVlc3QuY3VzdG9tZXJOYW1lLFxuICAgICAgYnJpZWY6IHJlcXVlc3QuYnJpZWYsXG4gICAgICBidWRnZXQ6IHJlcXVlc3QuYnVkZ2V0LFxuICAgICAgdGllcjogcmVxdWVzdC50aWVyLFxuICAgICAgcmV2aWV3TWV0aG9kOiByZXF1ZXN0LnJldmlld01ldGhvZCxcbiAgICAgIGFyZWE6IHJlcXVlc3QuYXJlYSxcbiAgICAgIGlzTGFnb3M6IHJlcXVlc3QuaXNMYWdvcyxcbiAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgfSxcbiAgICBpdGVtczogaXRlbXMubWFwKChpKSA9PiAoe1xuICAgICAgLi4uaSxcbiAgICAgIGRlY2lkZWRBdDogaS5kZWNpZGVkQXQgPyBpLmRlY2lkZWRBdC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICAgIGNyZWF0ZWRBdDogaS5jcmVhdGVkQXQudG9JU09TdHJpbmcoKSxcbiAgICB9KSksXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA3LiBzdWJtaXRJdGVtRGVjaXNpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBkZWNpc2lvblZhbHVlcyA9IFsnS0VFUCcsICdTS0lQJywgJ1dBTlRTX0RJRkZFUkVOVCddIGFzIGNvbnN0XG5cbi8qKlxuICogUmVjb3JkIHRoZSBjdXN0b21lcidzIGRlY2lzaW9uIG9uIGEgc2luZ2xlIHNob3J0bGlzdCBpdGVtLiBDYWxsZWRcbiAqIGZyb20gdGhlIG9ubGluZSByZXZpZXcgcGFnZSB3aGVuIHRoZSBjdXN0b21lciB0YXBzIEtlZXAgLyBTa2lwIC9cbiAqIFwiV2FudCBzb21ldGhpbmcgZGlmZmVyZW50XCIgb24gZWFjaCByb3cuXG4gKlxuICogVGhlIGN1c3RvbWVyIG1heSBmbGlwIGEgZGVjaXNpb24gYmFjayBhbmQgZm9ydGggZnJlZWx5IHdoaWxlIHRoZVxuICogc2hvcnRsaXN0IGlzIHN0aWxsIG9wZW4uIGBkZWNpZGVkQnk9Q1VTVE9NRVJgIGlzIHN0YW1wZWQgc28gdGhlXG4gKiBzdHlsaXN0IGNhbiBkaXN0aW5ndWlzaCBjdXN0b21lci1zZXQgZGVjaXNpb25zIGZyb20gc3RhZmYgb3ZlcnJpZGVzXG4gKiAodGhlIGFkbWluIHdvcmtmbG93IHJlY29yZHMgU1RBRkYgdmlhIGBhZG1pblJlY29yZEl0ZW1EZWNpc2lvbmApLlxuICpcbiAqIEZvciBgV0FOVFNfRElGRkVSRU5UYCB0aGUgY3VzdG9tZXIgY2FuIGFkZCBhIGZyZWUtdGV4dCBgYWx0Tm90ZWBcbiAqIHNheWluZyB3aGF0IHRoZXkgd2FudCBpbnN0ZWFkICh0aGUgZmllbGQgaXMgY2xlYXJlZCBpZiB0aGUgY3VzdG9tZXJcbiAqIGxhdGVyIGZsaXBzIHRvIEtFRVAvU0tJUCDigJQgc2FtZSBiZWhhdmlvdXIgYXMgdGhlIGFkbWluIHNpZGUpLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0SXRlbURlY2lzaW9uKFxuICB0b2tlbjogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgZGVjaXNpb246IHN0cmluZyxcbiAgYWx0Tm90ZT86IHN0cmluZyxcbikge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFpdGVtSWQpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNaXNzaW5nIGl0ZW0gaWQuJyB9IGFzIGNvbnN0XG4gIGlmICghZGVjaXNpb25WYWx1ZXMuaW5jbHVkZXMoZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXSkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBkZWNpc2lvbi4nIH0gYXMgY29uc3RcbiAgfVxuICBjb25zdCBkZWNpc2lvblZhbHVlID0gZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtID0gYXdhaXQgZGIucFNTaG9ydGxpc3RJdGVtLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHNob3J0bGlzdElkOiB0cnVlLCBuYW1lOiB0cnVlLCBkZWNpc2lvbjogdHJ1ZSB9LFxuICB9KVxuICBpZiAoIWl0ZW0gfHwgaXRlbS5zaG9ydGxpc3RJZCAhPT0gc2hvcnRsaXN0LmlkKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ0l0ZW0gbm90IGZvdW5kIGluIHRoaXMgc2hvcnRsaXN0LicgfSBhcyBjb25zdFxuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0udXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGVjaXNpb246IGRlY2lzaW9uVmFsdWUsXG4gICAgICAgIGFsdE5vdGU6XG4gICAgICAgICAgZGVjaXNpb25WYWx1ZSA9PT0gJ1dBTlRTX0RJRkZFUkVOVCdcbiAgICAgICAgICAgID8gKGFsdE5vdGU/LnRyaW0oKSB8fCBudWxsKVxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICBkZWNpZGVkQnk6ICdDVVNUT01FUicsXG4gICAgICAgIGRlY2lkZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlPy5tZXNzYWdlID8/ICdDb3VsZCBub3QgcmVjb3JkIHlvdXIgZGVjaXNpb24uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBub3RlID1cbiAgICBgQ3VzdG9tZXIgZGVjaXNpb24gb24gXCIke2l0ZW0ubmFtZX1cIjogJHtkZWNpc2lvblZhbHVlfWAgK1xuICAgIChkZWNpc2lvblZhbHVlID09PSAnV0FOVFNfRElGRkVSRU5UJyAmJiBhbHROb3RlPy50cmltKClcbiAgICAgID8gYCDigJQgd2FudHM6ICR7YWx0Tm90ZS50cmltKCl9YFxuICAgICAgOiAnJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHNob3J0bGlzdC5yZXF1ZXN0SWQsIHsgYWN0b3JUeXBlOiAnQ1VTVE9NRVInLCBub3RlIH0pXG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCBkZWNpc2lvbjogZGVjaXNpb25WYWx1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOC4gcmVxdWVzdE1vcmVJdGVtc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogQ3VzdG9tZXIgc2F5cyBcIm5vbmUgb2YgdGhlc2Ugc3VpdCBtZVwiIC8gXCJJIHdhbnQgc29tZXRoaW5nIGRpZmZlcmVudFwiLlxuICogV3JpdGVzIGEgUFNFdmVudCBvbiB0aGUgdW5kZXJseWluZyByZXF1ZXN0IHNvIHRoZSBzdHlsaXN0IGlzXG4gKiBub3RpZmllZCB0byByZS1zb3VyY2UuIFRoZSBzaG9ydGxpc3Qgc3RheXMgb3BlbiDigJQgdGhlIGN1c3RvbWVyIGNhblxuICogc3RpbGwgdGFwIEtFRVAvU0tJUCBvbiB0aGUgZXhpc3RpbmcgaXRlbXMgYWZ0ZXIgdGhpcyBpcyBzdWJtaXR0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0TW9yZUl0ZW1zKHRva2VuOiBzdHJpbmcsIG5vdGU6IHN0cmluZykge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFub3RlIHx8IG5vdGUudHJpbSgpLmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQbGVhc2UgdGVsbCB1cyBhIGJpdCBtb3JlIGFib3V0IHdoYXQgeW91IHdhbnQgaW5zdGVhZC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBhd2FpdCB3cml0ZVBTRXZlbnQoc2hvcnRsaXN0LnJlcXVlc3RJZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgcmVxdWVzdGVkIG1vcmUgaXRlbXM6ICR7bm90ZS50cmltKCkuc2xpY2UoMCwgNTAwKX1gLFxuICB9KVxuXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcnKVxuICByZXR1cm4geyBvazogdHJ1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOS4gcGF5Rm9ySXRlbXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEZvciB0aGUgb25saW5lIHJldmlldyBmbG93OiB0aGUgY3VzdG9tZXIgaGFzIGZpbmlzaGVkIG1hcmtpbmdcbiAqIGl0ZW1zIEtFRVAgLyBTS0lQIC8gV0FOVFNfRElGRkVSRU5ULCBhbmQgbm93IHdhbnRzIHRvIHBheSBmb3IgdGhlXG4gKiBpdGVtcyB0aGV5J3JlIGtlZXBpbmcuIFRoaXM6XG4gKiAgIC0gc3VtcyB0aGUgcHJpY2VzIG9mIGV2ZXJ5IFBTU2hvcnRsaXN0SXRlbSB3aXRoIGRlY2lzaW9uPUtFRVBcbiAqICAgICBvbiB0aGUgcmVxdWVzdCdzIHNob3J0bGlzdFxuICogICAtIGFkZHMgdGhlIGRlbGl2ZXJ5IGZlZSAoZGVsaXZlcnlGZWVRdW90ZWQsIHNldCBieSBzdGFmZiwgZmFsbGluZ1xuICogICAgIGJhY2sgdG8gZGVsaXZlcnlGZWVab25lKVxuICogICAtIGluaXRpYWxpc2VzIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSB0b3RhbFxuICogICAtIHNldHMgcmVxdWVzdC5wYXltZW50TWV0aG9kID0gXCJsaW5rXCJcbiAqICAgLSB3cml0ZXMgYSBQU0V2ZW50XG4gKlxuICogUmV0dXJucyB0aGUgYXV0aG9yaXphdGlvbl91cmwgdGhlIGN1c3RvbWVyIGlzIHJlZGlyZWN0ZWQgdG8uIFRoZVxuICogYWN0dWFsIFwibWFyayBwYWlkXCIgaGFwcGVucyB2aWEgdGhlIFBheXN0YWNrIHdlYmhvb2sgKG9yIGEgc2VwYXJhdGVcbiAqIGNvbmZpcm0gc3RlcCkg4oCUIHRoaXMgYWN0aW9uIGp1c3Qga2lja3Mgb2ZmIHRoZSBwYXltZW50LlxuICpcbiAqIElmIHRoZSBjdXN0b21lciBoYXMga2VwdCB6ZXJvIGl0ZW1zLCB3ZSByZWZ1c2UgdG8gY2hhcmdlIOKAlCB0aGVyZSdzXG4gKiBub3RoaW5nIHRvIHBheSBmb3IuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXlGb3JJdGVtcyhyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgICBkZWxpdmVyeUZlZVF1b3RlZDogdHJ1ZSxcbiAgICAgIGRlbGl2ZXJ5RmVlWm9uZTogdHJ1ZSxcbiAgICB9LFxuICB9KVxuICBpZiAoIXJlcSkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kLicgfSBhcyBjb25zdFxuICBpZiAocmVxLnN0YXR1cyA9PT0gJ0NBTkNFTExFRCcgfHwgcmVxLnN0YXR1cyA9PT0gJ0RPTkUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhY2NlcHRpbmcgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHJlcXVlc3RJZCB9LFxuICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnTm8gc2hvcnRsaXN0IGhhcyBiZWVuIHNlbnQgZm9yIHRoaXMgcmVxdWVzdCB5ZXQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBrZXB0SXRlbXMgPSBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0uZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IHNob3J0bGlzdElkOiBzaG9ydGxpc3QuaWQsIGRlY2lzaW9uOiAnS0VFUCcgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIHByaWNlOiB0cnVlIH0sXG4gIH0pXG4gIGlmICgha2VwdEl0ZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogJ1BpY2sgYXQgbGVhc3Qgb25lIGl0ZW0gdG8ga2VlcCBiZWZvcmUgcGF5aW5nLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgY29uc3QgaXRlbXNTdWJ0b3RhbCA9IGtlcHRJdGVtcy5yZWR1Y2UoKHMsIGkpID0+IHMgKyBpLnByaWNlLCAwKVxuICBjb25zdCBkZWxpdmVyeUZlZSA9IHJlcS5kZWxpdmVyeUZlZVF1b3RlZCA/PyByZXEuZGVsaXZlcnlGZWVab25lID8/IDBcbiAgY29uc3QgdG90YWwgPSBpdGVtc1N1YnRvdGFsICsgZGVsaXZlcnlGZWVcbiAgaWYgKHRvdGFsIDw9IDApIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90aGluZyB0byBjaGFyZ2UuJyB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBEaXN0aW5jdCBwcmVmaXggc28gdGhlIHdlYmhvb2sgY2FuIHJvdXRlIGNoYXJnZS5zdWNjZXNzIHRvIHRoZVxuICAvLyBpdGVtcy1wYXltZW50IGhhbmRsZXIgKHNlcGFyYXRlIGZyb20gdGhlIHNvdXJjaW5nLWZlZSBwYXltZW50KS5cbiAgY29uc3QgcmVmZXJlbmNlID0gYCR7cmVxLnJlZn0tSVRFTVMtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YFxuXG4gIGNvbnN0IHNpdGVVcmwgPSBwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkwgPz8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgY29uc3QgY2FsbGJhY2tVcmwgPSBgJHtzaXRlVXJsfS9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9jb25maXJtZWRgXG4gIGNvbnN0IGluaXQgPSBhd2FpdCBpbml0aWFsaXplUGF5c3RhY2tUcmFuc2FjdGlvbih7XG4gICAgZW1haWw6IGAke3JlcS5yZWYudG9Mb3dlckNhc2UoKX1Ad2FyZHJvYmVjYXJlLmJvb2tpbmdgLFxuICAgIGFtb3VudDogdG90YWwsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgcGF5bWVudF9raW5kOiAnSVRFTVMnLFxuICAgICAgaXRlbXNfc3VidG90YWw6IGl0ZW1zU3VidG90YWwsXG4gICAgICBkZWxpdmVyeV9mZWU6IGRlbGl2ZXJ5RmVlLFxuICAgICAgY3VzdG9tX2ZpZWxkczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnUmVxdWVzdCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3JlcXVlc3RfcmVmJyxcbiAgICAgICAgICB2YWx1ZTogcmVxLnJlZixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NlcnZpY2UnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdzZXJ2aWNlJyxcbiAgICAgICAgICB2YWx1ZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnSXRlbXMnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdpdGVtc190b3RhbCcsXG4gICAgICAgICAgdmFsdWU6IGDigqYke2l0ZW1zU3VidG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnRGVsaXZlcnknLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdkZWxpdmVyeV9mZWUnLFxuICAgICAgICAgIHZhbHVlOiBg4oKmJHtkZWxpdmVyeUZlZS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdUb3RhbCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3RvdGFsJyxcbiAgICAgICAgICB2YWx1ZTogYOKCpiR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuICBpZiAoIWluaXQuc3RhdHVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBpbml0Lm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICBkYXRhOiB7IHBheW1lbnRNZXRob2Q6ICdsaW5rJyB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IHN0YXJ0IHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtTmFtZXMgPSBrZXB0SXRlbXMubWFwKChpKSA9PiBpLm5hbWUpLmpvaW4oJywgJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHJlcS5pZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgaW5pdGlhdGVkIGl0ZW1zIHBheW1lbnQgZm9yICR7cmVxLnJlZn06ICR7a2VwdEl0ZW1zLmxlbmd0aH0gaXRlbShzKSBbJHtpdGVtTmFtZXMuc2xpY2UoMCwgMjAwKX1dIMK3IGl0ZW1zIOKCpiR7aXRlbXNTdWJ0b3RhbC50b0xvY2FsZVN0cmluZygpfSArIGRlbGl2ZXJ5IOKCpiR7ZGVsaXZlcnlGZWUudG9Mb2NhbGVTdHJpbmcoKX0gPSDigqYke3RvdGFsLnRvTG9jYWxlU3RyaW5nKCl9YCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCwgcmVmZXJlbmNlLCB0b3RhbCB9IGFzIGNvbnN0XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlUQWtrQnNCLGdNQUFBIn0=
}),
"[project]/src/actions/data:be7192 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPSAvailableSlots",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"404bfe2cfd34458f235b463e2d7bcf694188e768c7":"getPSAvailableSlots"},"src/actions/personal-shopping-customer.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("404bfe2cfd34458f235b463e2d7bcf694188e768c7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getPSAvailableSlots");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQZXJzb25hbCBTaG9wcGluZyDigJQgY3VzdG9tZXItZmFjaW5nIHNlcnZlciBhY3Rpb25zLlxuICogVGhlIHN5bmMgYGNoZWNrQnJpZWZHdWFyZGAgaGVscGVyIGxpdmVzIGluIHNyYy9saWIvcHMtYnJpZWYtZ3VhcmQudHMuXG4gKi9cblxuJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IGRiIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSAnQC9saWIvc2Vzc2lvbidcbmltcG9ydCB7XG4gIGluaXRpYWxpemVQYXlzdGFja1RyYW5zYWN0aW9uLFxuICB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uLFxufSBmcm9tICdAL2xpYi9wYXlzdGFjay9zZXJ2ZXInXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJ1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJ1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENvbnN0YW50c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBTbG90IHRpbWVzIG9mZmVyZWQgZm9yIGluLXBlcnNvbiBmaXR0aW5ncyAoTW9u4oCTU2F0KS4gKi9cbmNvbnN0IFBTX1NMT1RfVElNRVMgPSBbJzk6MDAgQU0nLCAnMTE6MzAgQU0nLCAnMjowMCBQTScsICc0OjMwIFBNJ10gYXMgY29uc3RcblxuY29uc3QgUFNfU0VSVklDRV9OQU1FID0gJ1BlcnNvbmFsIFNob3BwaW5nJ1xuY29uc3QgUFNfSE9MRF9TRUNPTkRTID0gMTAgKiA2MCAvLyAxMC1taW51dGUgc2xvdCBob2xkXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogV3JpdGUgYSBQU0V2ZW50IHJvdy4gQmVzdC1lZmZvcnQg4oCUIGZhaWx1cmVzIGFyZSBzd2FsbG93ZWQgc28gdGhlXG4gKiBjdXN0b21lciBmbG93IG5ldmVyIGFib3J0cyBqdXN0IGJlY2F1c2UgdGhlIGF1ZGl0IHRyYWlsIGNvdWxkbid0IGJlXG4gKiB3cml0dGVuIChtaXJyb3JzIGB3cml0ZVBTRXZlbnRgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gd3JpdGVQU0V2ZW50KFxuICByZXF1ZXN0SWQ6IHN0cmluZyxcbiAgb3B0czogeyBhY3RvclR5cGU/OiBzdHJpbmc7IG5vdGU/OiBzdHJpbmcgfCBudWxsOyBhY3RvcklkPzogc3RyaW5nIHwgbnVsbCB9ID0ge30sXG4pIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU0V2ZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHJlcXVlc3RJZCxcbiAgICAgICAgYWN0b3JJZDogb3B0cy5hY3RvcklkID8/IG51bGwsXG4gICAgICAgIGFjdG9yVHlwZTogb3B0cy5hY3RvclR5cGUgPz8gJ0NVU1RPTUVSJyxcbiAgICAgICAgbm90ZTogb3B0cy5ub3RlID8/IG51bGwsXG4gICAgICB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnW3BlcnNvbmFsLXNob3BwaW5nLWN1c3RvbWVyXSB3cml0ZVBTRXZlbnQgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBuZXh0IFBTIHJlZiBvZmYgdGhlICpoaWdoZXN0KiBleGlzdGluZyBzdWZmaXguIFNhbWVcbiAqIGFwcHJvYWNoIGFzIGBuZXh0Qm9va2luZ051bWJlcmAgaW4gY29uc3VsdGF0aW9ucy50cyDigJQgdXNpbmdcbiAqIGNvdW50KCkrMSB3b3VsZCBjb2xsaWRlIGFmdGVyIHJvd3MgYXJlIGRlbGV0ZWQgKGNvdW50IGdvZXMgZG93bixcbiAqIG5leHQgbnVtYmVyIGNsYXNoZXMgd2l0aCBhbiBleGlzdGluZyBvbmUpLiBXYWxraW5nIHRoZSBtYXggc3VmZml4XG4gKiBrZWVwcyB0aGUgc2VxdWVuY2UgbW9ub3RvbmljLlxuICpcbiAqIEZhbGxzIGJhY2sgdG8gMSBpZiBubyBXQy1QUy0qIHJlcXVlc3RzIGV4aXN0IHlldC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbmV4dFBTUmVmKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGxhc3QgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7IHJlZjogeyBzdGFydHNXaXRoOiAnV0MtUFMtJyB9IH0sXG4gICAgb3JkZXJCeTogeyByZWY6ICdkZXNjJyB9LFxuICAgIHNlbGVjdDogeyByZWY6IHRydWUgfSxcbiAgfSlcbiAgbGV0IG5leHQgPSAxXG4gIGlmIChsYXN0KSB7XG4gICAgY29uc3QgbSA9IGxhc3QucmVmLm1hdGNoKC9eV0MtUFMtKFxcZCspJC8pXG4gICAgaWYgKG0pIG5leHQgPSBwYXJzZUludChtWzFdLCAxMCkgKyAxXG4gIH1cbiAgcmV0dXJuIGBXQy1QUy0ke1N0cmluZyhuZXh0KS5wYWRTdGFydCg0LCAnMCcpfWBcbn1cblxuLyoqIE5vcm1hbGlzZSBhIGRhdGUgc3RyaW5nIGBZWVlZLU1NLUREYCBpbnRvIGEgVVRDIG1pZG5pZ2h0IERhdGVUaW1lLiAqL1xuZnVuY3Rpb24gZGF0ZU9ubHkoczogc3RyaW5nKTogRGF0ZSB7XG4gIGNvbnN0IFt5LCBtLCBkXSA9IHMuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKVxuICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeSwgbSAtIDEsIGQsIDAsIDAsIDApKVxufVxuXG4vKiogRm9ybWF0IGEgRGF0ZSBiYWNrIGludG8gYSBgWVlZWS1NTS1ERGAgc3RyaW5nIChVVEMsIG5vIHRpbWUgc2hpZnQpLiAqL1xuZnVuY3Rpb24geW1kKGQ6IERhdGUpOiBzdHJpbmcge1xuICByZXR1cm4gZC50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKVxufVxuXG4vKiogRXNjYXBlIGEgc3RyaW5nIHNvIGl0IGNhbiBiZSBzYWZlbHkgZW1iZWRkZWQgaW4gYSBSZWdFeHAuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG59XG5cbi8qKiBEZS1kdXBsaWNhdGUgYW4gYXJyYXkgd2hpbGUgcHJlc2VydmluZyBvcmRlci4gKi9cbmZ1bmN0aW9uIGRlZHVwZTxUPih4czogVFtdKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh4cykpXG59XG5cbi8qKlxuICogUmVzb2x2ZSB0aGUgc291cmNpbmcgZmVlIGZvciBhIGdpdmVuIHRpZXIgZnJvbSB0aGUgUFNTZXJ2aWNlU2V0dGluZ1xuICogc2luZ2xldG9uLiBGYWxscyBiYWNrIHRvIHRoZSBzY2hlbWEgZGVmYXVsdHMgKDQ1LDAwMCAvIDUwLDAwMCkgd2hlblxuICogdGhlIHJvdyBkb2Vzbid0IGV4aXN0IHlldCAobWlycm9ycyBjb21wdXRlRml0dGluZ1RvdGFsIGluIHRoZVxuICogYWRtaW4gd29ya2Zsb3cpLlxuICovXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlU291cmNpbmdGZWUoXG4gIHRpZXI6ICdERUxJVkVSRUQnIHwgJ0lOX1BFUlNPTl9GSVRUSU5HJyxcbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIucFNTZXJ2aWNlU2V0dGluZy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6ICdzaW5nbGV0b24nIH0gfSlcbiAgaWYgKCFzZXR0aW5ncykge1xuICAgIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnID8gNTAwMDAgOiA0NTAwMFxuICB9XG4gIHJldHVybiB0aWVyID09PSAnSU5fUEVSU09OX0ZJVFRJTkcnXG4gICAgPyBzZXR0aW5ncy5pblBlcnNvbkZpdHRpbmdGZWVcbiAgICA6IHNldHRpbmdzLmRlbGl2ZXJlZEZlZVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIGEgcHJvbW8gY29kZSBhbmQgcmV0dXJuIHRoZSBkaXNjb3VudCArIGZpbmFsIGZlZS5cbiAqIFJldHVybnMgbnVsbCB3aGVuIHRoZSBjb2RlIGlzIGludmFsaWQgKGluYWN0aXZlLCBleHBpcmVkLCBvciB1bmtub3duKS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVQU1Byb21vQ29kZShcbiAgY29kZTogc3RyaW5nLFxuKTogUHJvbWlzZTx7IGNvZGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB2YWx1ZTogbnVtYmVyOyBsYWJlbDogc3RyaW5nIH0gfCBudWxsPiB7XG4gIGNvbnN0IHVwcGVyID0gY29kZS50cmltKCkudG9VcHBlckNhc2UoKVxuICBpZiAoIXVwcGVyKSByZXR1cm4gbnVsbFxuICBjb25zdCByb3cgPSBhd2FpdCBkYi5wU1Byb21vQ29kZS5maW5kVW5pcXVlKHsgd2hlcmU6IHsgY29kZTogdXBwZXIgfSB9KVxuICBpZiAoIXJvdykgcmV0dXJuIG51bGxcbiAgaWYgKCFyb3cuYWN0aXZlKSByZXR1cm4gbnVsbFxuICBpZiAocm93LmV4cGlyZXNBdCAmJiByb3cuZXhwaXJlc0F0LmdldFRpbWUoKSA8IERhdGUubm93KCkpIHJldHVybiBudWxsXG4gIC8vIE5vIGV4cGxpY2l0IG1heFVzZXMgY29sdW1uIG9uIHRoZSBzY2hlbWEg4oCUIHRoZSBhZG1pbiBkaXNhYmxlcyBjb2Rlc1xuICAvLyBvbmNlIHRoZXkndmUgYmVlbiB1c2VkIGVub3VnaCwgc28gdGltZXNVc2VkIGFsb25lIGlzbid0IGEgaGFyZCBsaW1pdC5cbiAgcmV0dXJuIHsgY29kZTogcm93LmNvZGUsIHR5cGU6IHJvdy50eXBlLCB2YWx1ZTogcm93LnZhbHVlLCBsYWJlbDogcm93LmNvZGUgfVxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIGRpc2NvdW50IGFtb3VudCBhbmQgdGhlIGZpbmFsIGZlZSBnaXZlbiBhIHByb21vIGNvZGUgcm93XG4gKiBhbmQgdGhlIGxpc3QgZmVlLiBNaXJyb3JzIHRoZSBzZW1hbnRpY3MgdXNlZCBpblxuICogcGVyc29uYWwtc2hvcHBpbmctd29ya2Zsb3cudHM6XG4gKiAgIC0gUEVSQ0VOVDogZGlzY291bnQgPSBsaXN0RmVlICogdmFsdWUgLyAxMDAgICh2YWx1ZSAx4oCTMTAwKVxuICogICAtIEZJWEVEOiAgIGRpc2NvdW50ID0gdmFsdWUgICAgICAgICAgICAgICAgICAobmFpcmEgYW1vdW50IG9mZilcbiAqICAgLSBGUkVFOiAgICBkaXNjb3VudCA9IGxpc3RGZWUgICAgICAgICAgICAgICAgKGZ1bGwgc291cmNpbmcgZmVlIHdhaXZlZClcbiAqXG4gKiBUaGUgZGlzY291bnQgaXMgY2xhbXBlZCBzbyB0aGUgZmluYWwgZmVlIG5ldmVyIGdvZXMgYmVsb3cgemVyby5cbiAqL1xuZnVuY3Rpb24gYXBwbHlQcm9tb0Rpc2NvdW50KFxuICBsaXN0RmVlOiBudW1iZXIsXG4gIHByb21vOiB7IHR5cGU6IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9LFxuKTogeyBkaXNjb3VudEFtb3VudDogbnVtYmVyOyBmaW5hbEZlZTogbnVtYmVyOyBkaXNjb3VudExhYmVsOiBzdHJpbmcgfSB7XG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgaWYgKHByb21vLnR5cGUgPT09ICdQRVJDRU5UJykge1xuICAgIGNvbnN0IHBjdCA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5yb3VuZCgobGlzdEZlZSAqIHBjdCkgLyAxMDApXG4gIH0gZWxzZSBpZiAocHJvbW8udHlwZSA9PT0gJ0ZJWEVEJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4obGlzdEZlZSwgTWF0aC5tYXgoMCwgcHJvbW8udmFsdWUpKVxuICB9IGVsc2UgaWYgKHByb21vLnR5cGUgPT09ICdGUkVFJykge1xuICAgIGRpc2NvdW50QW1vdW50ID0gbGlzdEZlZVxuICB9XG4gIGRpc2NvdW50QW1vdW50ID0gTWF0aC5taW4oZGlzY291bnRBbW91bnQsIGxpc3RGZWUpXG4gIGNvbnN0IGZpbmFsRmVlID0gbGlzdEZlZSAtIGRpc2NvdW50QW1vdW50XG4gIGNvbnN0IGRpc2NvdW50TGFiZWwgPSBwcm9tby50eXBlID09PSAnRlJFRSdcbiAgICA/IGBQcm9tbyAke3Byb21vLmxhYmVsfTogZnJlZSBzb3VyY2luZ2BcbiAgICA6IHByb21vLnR5cGUgPT09ICdQRVJDRU5UJ1xuICAgICAgPyBgUHJvbW8gJHtwcm9tby5sYWJlbH06ICR7cHJvbW8udmFsdWV9JSBvZmYgc291cmNpbmcgZmVlYFxuICAgICAgOiBgUHJvbW8gJHtwcm9tby5sYWJlbH06IOKCpiR7cHJvbW8udmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0gb2ZmIHNvdXJjaW5nIGZlZWBcbiAgcmV0dXJuIHsgZGlzY291bnRBbW91bnQsIGZpbmFsRmVlLCBkaXNjb3VudExhYmVsIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAyLiBnZXRQU0F2YWlsYWJsZVNsb3RzIOKAlCBJbi1QZXJzb24gZml0dGluZyBzbG90c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUmV0dXJuIHRoZSBhdmFpbGFibGUgSW4tUGVyc29uIGZpdHRpbmcgc2xvdHMgZm9yIHRoZSBuZXh0IE4gZGF5c1xuICogc3RhcnRpbmcgYXQgYGZyb21gIChZWVlZLU1NLUREKS4gU3VuZGF5cyBhcmUgc2tpcHBlZCAoc2Vzc2lvbnMgcnVuXG4gKiBNb25kYXkgdG8gU2F0dXJkYXkpLiBUaGUgZm91ciBkYWlseSBzbG90IHRpbWVzIGFyZSA5OjAwIEFNLFxuICogMTE6MzAgQU0sIDI6MDAgUE0gYW5kIDQ6MzAgUE0g4oCUIHNhbWUgZ3JpZCBhcyBXYXJkcm9iZSBDb25zdWx0YXRpb25zLlxuICpcbiAqIEEgc2xvdCBpcyBleGNsdWRlZCBpZiBlaXRoZXI6XG4gKiAgIC0gYSBgUFNTbG90YCByb3cgZXhpc3RzIGZvciB0aGF0IGRhdGUrc3RhcnQgd2l0aCBhbiBhY3RpdmUgaG9sZFxuICogICAgIChoZWxkVW50aWwgSVMgTlVMTCBtZWFucyBib29rZWQ7IGhlbGRVbnRpbCA+IG5vdyBtZWFucyBoZWxkXG4gKiAgICAgZHVyaW5nIGNoZWNrb3V0OyBoZWxkVW50aWwgPCBub3cgbWVhbnMgdGhlIGhvbGQgZXhwaXJlZCBhbmQgdGhlXG4gKiAgICAgc2xvdCBpcyBmcmVlIGFnYWluKSwgT1JcbiAqICAgLSBhIGBQZXJzb25hbFNob3BwaW5nUmVxdWVzdGAgZXhpc3RzIHdpdGggdGllcj1JTl9QRVJTT05fRklUVElORyxcbiAqICAgICBzdGF0dXMgbm90IENBTkNFTExFRC9ET05FLCBmaXR0aW5nRGF0ZSBtYXRjaGluZyB0aGUgZGF5IGFuZFxuICogICAgIGZpdHRpbmdUaW1lIG1hdGNoaW5nIHRoZSBzbG90LlxuICpcbiAqIGBtb2RlYCBpcyB0aGUgdGllciB0aGUgY3VzdG9tZXIgaGFzIHBpY2tlZC4gV2hlbiB0aGUgY3VzdG9tZXIgaXMgb25cbiAqIHRoZSBERUxJVkVSRUQgdGllciB0aGVyZSBhcmUgbm8gZml0dGluZyBzbG90cyDigJQgcmV0dXJuIFtdIHNvIHRoZVxuICogd2l6YXJkIGNhbiBza2lwIHRoZSBzbG90IHBpY2tlci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBTQXZhaWxhYmxlU2xvdHMoaW5wdXQ6IHtcbiAgZnJvbTogc3RyaW5nXG4gIGRheXM6IG51bWJlclxuICBtb2RlOiBzdHJpbmdcbn0pIHtcbiAgaWYgKCFpbnB1dD8uZnJvbSB8fCAhL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoaW5wdXQuZnJvbSkpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZiAoaW5wdXQubW9kZSAhPT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykgcmV0dXJuIFtdXG5cbiAgY29uc3QgZGF5cyA9IE1hdGgubWF4KDEsIE1hdGgubWluKDYwLCBOdW1iZXIoaW5wdXQuZGF5cykgfHwgMTQpKVxuICBjb25zdCBzdGFydCA9IGRhdGVPbmx5KGlucHV0LmZyb20pXG4gIC8vIEJ1aWxkIHRoZSBkYXkgbGlzdCDigJQgaW5jbHVzaXZlIG9mIGBmcm9tYCwgZXhjbHVzaXZlIG9mIGBmcm9tICsgZGF5c2AuXG4gIGNvbnN0IGRheUxpc3Q6IERhdGVbXSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF5czsgaSsrKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIGkgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxuICAgIGlmIChkLmdldFVUQ0RheSgpID09PSAwKSBjb250aW51ZSAvLyBza2lwIFN1bmRheXNcbiAgICBkYXlMaXN0LnB1c2goZClcbiAgfVxuICBpZiAoIWRheUxpc3QubGVuZ3RoKSByZXR1cm4gW11cblxuICBjb25zdCByYW5nZVN0YXJ0ID0gZGF5TGlzdFswXVxuICBjb25zdCByYW5nZUVuZCA9IG5ldyBEYXRlKFxuICAgIGRheUxpc3RbZGF5TGlzdC5sZW5ndGggLSAxXS5nZXRUaW1lKCkgKyAyNCAqIDYwICogNjAgKiAxMDAwLFxuICApXG5cbiAgLy8gQWN0aXZlIFBTU2xvdHMg4oCUIGhlbGQgb3IgYWxyZWFkeSBib29rZWQuXG4gIGNvbnN0IGhlbGRTbG90cyA9IGF3YWl0IGRiLnBTU2xvdC5maW5kTWFueSh7XG4gICAgd2hlcmU6IHtcbiAgICAgIGRhdGU6IHsgZ3RlOiByYW5nZVN0YXJ0LCBsdDogcmFuZ2VFbmQgfSxcbiAgICAgIE9SOiBbeyBoZWxkVW50aWw6IG51bGwgfSwgeyBoZWxkVW50aWw6IHsgZ3Q6IG5ldyBEYXRlKCkgfSB9XSxcbiAgICB9LFxuICAgIHNlbGVjdDogeyBkYXRlOiB0cnVlLCBzdGFydDogdHJ1ZSB9LFxuICB9KVxuXG4gIC8vIEFjdGl2ZSBQUyByZXF1ZXN0cyAodGllcj1JTl9QRVJTT05fRklUVElORywgbm90IENBTkNFTExFRC9ET05FKS5cbiAgY29uc3QgYm9va2VkID0gYXdhaXQgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7XG4gICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgc3RhdHVzOiB7IG5vdEluOiBbJ0NBTkNFTExFRCcsICdET05FJ10gfSxcbiAgICAgIGZpdHRpbmdEYXRlOiB7IGd0ZTogcmFuZ2VTdGFydCwgbHQ6IHJhbmdlRW5kIH0sXG4gICAgfSxcbiAgICBzZWxlY3Q6IHsgZml0dGluZ0RhdGU6IHRydWUsIGZpdHRpbmdUaW1lOiB0cnVlIH0sXG4gIH0pXG5cbiAgY29uc3QgdGFrZW4gPSBuZXcgU2V0PHN0cmluZz4oKVxuICBmb3IgKGNvbnN0IHMgb2YgaGVsZFNsb3RzKSB7XG4gICAgdGFrZW4uYWRkKGAke3ltZChzLmRhdGUpfXwke3Muc3RhcnR9YClcbiAgfVxuICBmb3IgKGNvbnN0IGIgb2YgYm9va2VkKSB7XG4gICAgaWYgKGIuZml0dGluZ0RhdGUgJiYgYi5maXR0aW5nVGltZSkge1xuICAgICAgdGFrZW4uYWRkKGAke3ltZChiLmZpdHRpbmdEYXRlKX18JHtiLmZpdHRpbmdUaW1lfWApXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb3V0OiB7IGRhdGU6IHN0cmluZzsgdGltZTogc3RyaW5nOyBmdWxsTGFiZWw6IHN0cmluZyB9W10gPSBbXVxuICBmb3IgKGNvbnN0IGQgb2YgZGF5TGlzdCkge1xuICAgIGNvbnN0IGRzID0geW1kKGQpXG4gICAgZm9yIChjb25zdCB0aW1lIG9mIFBTX1NMT1RfVElNRVMpIHtcbiAgICAgIGlmICh0YWtlbi5oYXMoYCR7ZHN9fCR7dGltZX1gKSkgY29udGludWVcbiAgICAgIG91dC5wdXNoKHtcbiAgICAgICAgZGF0ZTogZHMsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZ1bGxMYWJlbDogYCR7ZHN9IMK3ICR7dGltZX1gLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDMuIGNyZWF0ZVBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY3JlYXRlU2NoZW1hID0gei5vYmplY3Qoe1xuICBjdXN0b21lck5hbWU6IHouc3RyaW5nKCkubWluKDIsICdQbGVhc2UgZW50ZXIgeW91ciBmdWxsIG5hbWUuJyksXG4gIGN1c3RvbWVyUGhvbmU6IHouc3RyaW5nKCkubWluKDcsICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXIuJyksXG4gIGNvbnRhY3RWaWE6IHouZW51bShbJ0NhbGwnLCAnV2hhdHNBcHAnLCAnRW1haWwnXSksXG4gIHNob3BwaW5nRm9yOiB6LnN0cmluZygpLm1pbigxLCAnUGxlYXNlIHRlbGwgdXMgd2hvIHRoaXMgaXMgZm9yLicpLFxuICB0aWVyOiB6LmVudW0oWydERUxJVkVSRUQnLCAnSU5fUEVSU09OX0ZJVFRJTkcnXSksXG4gIHJldmlld01ldGhvZDogei5lbnVtKFsnT05MSU5FJywgJ1dIQVRTQVBQJywgJ09OU0lURSddKS5kZWZhdWx0KCdPTkxJTkUnKSxcbiAgYXJlYTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBpc0xhZ29zOiB6LmJvb2xlYW4oKS5kZWZhdWx0KHRydWUpLFxuICBicmllZjogei5zdHJpbmcoKS5taW4oNSwgJ1RlbGwgdXMgYSBiaXQgbW9yZSBhYm91dCB3aGF0IHlvdSBuZWVkLicpLFxuICBjYXRlZ29yaWVzOiB6LnN0cmluZygpLm1pbigxLCAnUGljayBhdCBsZWFzdCBvbmUgY2F0ZWdvcnkuJyksXG4gIGNvbG91cnM6IHouc3RyaW5nKCkubWluKDEsICdQaWNrIGF0IGxlYXN0IG9uZSBjb2xvdXIuJyksXG4gIGJ1ZGdldDogei5zdHJpbmcoKS5taW4oMSwgJ1BpY2sgYSBidWRnZXQgYmFuZC4nKSxcbiAgbmVlZGVkQnk6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgYnJhbmRUZXJtczogei5hcnJheSh6LnN0cmluZygpKS5vcHRpb25hbCgpLFxuICBicmFuZENob2ljZTogei5lbnVtKFsnQ09OVElOVUVEX0FDSycsICdXQUlUTElTVCddKS5vcHRpb25hbCgpLFxuICBmaXREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksIC8vIFlZWVktTU0tRERcbiAgZml0VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLCAvLyBcIjk6MDAgQU1cIlxuICBwcm9tb0NvZGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgLy8gT3B0aW9uYWwgc3RydWN0dXJlZCBicmllZiBmaWVsZHMgKGZvcndhcmQtY29tcGF0IHdpdGggYSByaWNoZXJcbiAgLy8gd2l6YXJkKS4gU3RvcmVkIG9uIFBTQnJpZWY7IGRlZmF1bHRzIHRvIG51bGwgd2hlbiBub3QgcHJvdmlkZWQuXG4gIGZpdDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBzdHlsZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBvY2Nhc2lvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBidWRnZXRCYW5kOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNpemVzOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVyc29uYWxTaG9wcGluZ1JlcXVlc3QoXG4gIGlucHV0OiB6LmluZmVyPHR5cGVvZiBjcmVhdGVTY2hlbWE+LFxuKSB7XG4gIGNvbnN0IHBhcnNlZCA9IGNyZWF0ZVNjaGVtYS5zYWZlUGFyc2UoaW5wdXQpXG4gIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IHBhcnNlZC5lcnJvci5pc3N1ZXNbMF0/Lm1lc3NhZ2UgPz8gJ1BsZWFzZSBjaGVjayB0aGUgZm9ybSBhbmQgdHJ5IGFnYWluLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGNvbnN0IGQgPSBwYXJzZWQuZGF0YVxuXG4gIC8vIEZvciB0aGUgaW4tcGVyc29uIGZpdHRpbmcgdGllciB0aGUgY3VzdG9tZXIgbXVzdCBwaWNrIGEgc2xvdC5cbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJykge1xuICAgIGlmICghZC5maXREYXRlIHx8ICEvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkLmZpdERhdGUpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIGRhdGUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGlmICghZC5maXRUaW1lIHx8ICFkLmZpdFRpbWUudHJpbSgpKSB7XG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnUGxlYXNlIHBpY2sgYSBmaXR0aW5nIHRpbWUuJyB9IGFzIGNvbnN0XG4gICAgfVxuICAgIGNvbnN0IHNsb3REYXRlT2JqID0gZGF0ZU9ubHkoZC5maXREYXRlKVxuICAgIGlmIChzbG90RGF0ZU9iai5nZXRVVENEYXkoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ0ZpdHRpbmdzIHJ1biBNb25kYXkgdG8gU2F0dXJkYXkuIFBsZWFzZSBwaWNrIGFub3RoZXIgZGF0ZS4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgICBpZiAoIVBTX1NMT1RfVElNRVMuaW5jbHVkZXMoZC5maXRUaW1lIGFzICh0eXBlb2YgUFNfU0xPVF9USU1FUylbbnVtYmVyXSkpIHtcbiAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdQbGVhc2UgcGljayBvbmUgb2YgdGhlIGxpc3RlZCB0aW1lcy4nIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyBWYWxpZGF0ZSB0aGUgcHJvbW8gY29kZSAoaWYgc3VwcGxpZWQpIGJlZm9yZSB3ZSB0b3VjaCB0aGUgREIuIFdlXG4gIC8vIHJlLXJlc29sdmUgdGhlIGRpc2NvdW50IEFGVEVSIHdlIGtub3cgdGhlIGxpc3QgZmVlLlxuICBsZXQgcHJvbW86IHsgY29kZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsXG4gIGlmIChkLnByb21vQ29kZSAmJiBkLnByb21vQ29kZS50cmltKCkpIHtcbiAgICBwcm9tbyA9IGF3YWl0IHZhbGlkYXRlUFNQcm9tb0NvZGUoZC5wcm9tb0NvZGUpXG4gICAgaWYgKCFwcm9tbykge1xuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1RoYXQgcHJvbW8gY29kZSBpcyBpbnZhbGlkIG9yIGhhcyBleHBpcmVkLicgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuXG4gIC8vIE9wdGlvbmFsOiBsaW5rIHRvIGF1dGhlbnRpY2F0ZWQgdXNlciAoc28gdGhlIHJlcXVlc3Qgc2hvd3MgdXAgb25cbiAgLy8gdGhlIGN1c3RvbWVyJ3MgYWNjb3VudCBwYWdlIGlmIHRoZXkncmUgc2lnbmVkIGluKS5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBjb25zdCB1c2VySWQgPSBzZXNzaW9uPy51c2VyPy5pZCB8fCBudWxsXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBsaXN0IGZlZSBmcm9tIFBTU2VydmljZVNldHRpbmcgKG9yIHNjaGVtYSBkZWZhdWx0KS5cbiAgY29uc3QgbGlzdEZlZSA9IGF3YWl0IHJlc29sdmVTb3VyY2luZ0ZlZShkLnRpZXIpXG4gIGxldCBzb3VyY2luZ0ZlZVBhaWQgPSBsaXN0RmVlXG4gIGxldCBkaXNjb3VudEFtb3VudCA9IDBcbiAgbGV0IGRpc2NvdW50TGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsXG4gIGlmIChwcm9tbykge1xuICAgIGNvbnN0IGFwcGxpZWQgPSBhcHBseVByb21vRGlzY291bnQobGlzdEZlZSwgcHJvbW8pXG4gICAgc291cmNpbmdGZWVQYWlkID0gYXBwbGllZC5maW5hbEZlZVxuICAgIGRpc2NvdW50QW1vdW50ID0gYXBwbGllZC5kaXNjb3VudEFtb3VudFxuICAgIGRpc2NvdW50TGFiZWwgPSBhcHBsaWVkLmRpc2NvdW50TGFiZWxcbiAgfVxuXG4gIC8vIOKUgOKUgCBTbG90IGNsYXNoIGNoZWNrIChJTl9QRVJTT05fRklUVElORyBvbmx5KSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgLy8gUmUtY2hlY2sgdGhlIHNsb3QgaXMgc3RpbGwgZnJlZSByaWdodCBiZWZvcmUgY3JlYXRpbmcgdGhlIHJlcXVlc3QuXG4gIC8vIFRoZSBjdXN0b21lciBtYXkgaGF2ZSBsaW5nZXJlZCBvbiB0aGUgd2l6YXJkIGJldHdlZW4gZmV0Y2hpbmcgdGhlXG4gIC8vIGF2YWlsYWJsZSBzbG90cyBhbmQgc3VibWl0dGluZy5cbiAgbGV0IHNsb3REYXRlT2JqOiBEYXRlIHwgbnVsbCA9IG51bGxcbiAgaWYgKGQudGllciA9PT0gJ0lOX1BFUlNPTl9GSVRUSU5HJyAmJiBkLmZpdERhdGUgJiYgZC5maXRUaW1lKSB7XG4gICAgc2xvdERhdGVPYmogPSBkYXRlT25seShkLmZpdERhdGUpXG4gICAgY29uc3QgZGF5U3RhcnQgPSBzbG90RGF0ZU9ialxuICAgIGNvbnN0IGRheUVuZCA9IG5ldyBEYXRlKHNsb3REYXRlT2JqLmdldFRpbWUoKSArIDI0ICogNjAgKiA2MCAqIDEwMDApXG5cbiAgICAvLyBBY3RpdmUgUFNTbG90IGF0IHRoaXMgZXhhY3QgZGF0ZStzdGFydC5cbiAgICBjb25zdCBoZWxkQ2xhc2ggPSBhd2FpdCBkYi5wU1Nsb3QuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGRhdGU6IHsgZ3RlOiBkYXlTdGFydCwgbHQ6IGRheUVuZCB9LFxuICAgICAgICBzdGFydDogZC5maXRUaW1lLFxuICAgICAgICBPUjogW3sgaGVsZFVudGlsOiBudWxsIH0sIHsgaGVsZFVudGlsOiB7IGd0OiBuZXcgRGF0ZSgpIH0gfV0sXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAoaGVsZENsYXNoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIGVycm9yOiBgVGhhdCBzbG90IHdhcyBqdXN0IHRha2VuLiBQbGVhc2UgcGljayBhbm90aGVyIHRpbWUgb24gJHtkLmZpdERhdGV9LmAsXG4gICAgICB9IGFzIGNvbnN0XG4gICAgfVxuXG4gICAgLy8gRXhpc3RpbmcgcGFpZC9hY3RpdmUgUFMgcmVxdWVzdCBhdCB0aGlzIGV4YWN0IGRhdGUrdGltZS5cbiAgICBjb25zdCByZXFDbGFzaCA9IGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB0aWVyOiAnSU5fUEVSU09OX0ZJVFRJTkcnLFxuICAgICAgICBzdGF0dXM6IHsgbm90SW46IFsnQ0FOQ0VMTEVEJywgJ0RPTkUnXSB9LFxuICAgICAgICBmaXR0aW5nRGF0ZTogeyBndGU6IGRheVN0YXJ0LCBsdDogZGF5RW5kIH0sXG4gICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWUsXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH0sXG4gICAgfSlcbiAgICBpZiAocmVxQ2xhc2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGBUaGF0IHNsb3Qgd2FzIGp1c3QgdGFrZW4uIFBsZWFzZSBwaWNrIGFub3RoZXIgdGltZSBvbiAke2QuZml0RGF0ZX0uYCxcbiAgICAgIH0gYXMgY29uc3RcbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgQ3JlYXRlIHRoZSByZXF1ZXN0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICAvLyBSZXRyeSBsb29wOiBpZiB0d28gY3VzdG9tZXJzIHN1Ym1pdCBhdCB0aGUgc2FtZSB0aW1lLCBib3RoIGNvdWxkXG4gIC8vIGNvbXB1dGUgdGhlIHNhbWUgV0MtUFMtIyMjIyBvZmYgdGhlIGN1cnJlbnQgbWF4IHN1ZmZpeCBhbmQgb25lXG4gIC8vIHdvdWxkIGZhaWwgb24gdGhlIHVuaXF1ZSBjb25zdHJhaW50LiBXZSByZXRyeSB1cCB0byAzIHRpbWVzIHdpdGggYVxuICAvLyBmcmVzaCBudW1iZXIgZWFjaCB0aW1lIChtaXJyb3JzIGNvbnN1bHRhdGlvbnMudHMpLlxuICBsZXQgYXR0ZW1wdHMgPSAwXG4gIGxldCBjcmVhdGVkOiB7IGlkOiBzdHJpbmc7IHJlZjogc3RyaW5nIH0gfCBudWxsID0gbnVsbFxuICB3aGlsZSAoYXR0ZW1wdHMgPCAzKSB7XG4gICAgYXR0ZW1wdHMrK1xuICAgIGNvbnN0IHJlZiA9IGF3YWl0IG5leHRQU1JlZigpXG4gICAgdHJ5IHtcbiAgICAgIGNyZWF0ZWQgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVmLFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBjdXN0b21lck5hbWU6IGQuY3VzdG9tZXJOYW1lLnRyaW0oKSxcbiAgICAgICAgICBjdXN0b21lclBob25lOiBkLmN1c3RvbWVyUGhvbmUudHJpbSgpLFxuICAgICAgICAgIGNvbnRhY3RWaWE6IGQuY29udGFjdFZpYSxcbiAgICAgICAgICBzaG9wcGluZ0ZvcjogZC5zaG9wcGluZ0Zvci50cmltKCksXG4gICAgICAgICAgdGllcjogZC50aWVyLFxuICAgICAgICAgIHJldmlld01ldGhvZDogZC5yZXZpZXdNZXRob2QsXG4gICAgICAgICAgYXJlYTogZC5hcmVhPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgICBpc0xhZ29zOiBkLmlzTGFnb3MsXG4gICAgICAgICAgYnJpZWY6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgICAgIGNhdGVnb3JpZXM6IGQuY2F0ZWdvcmllcy50cmltKCksXG4gICAgICAgICAgY29sb3VyczogZC5jb2xvdXJzLnRyaW0oKSxcbiAgICAgICAgICBidWRnZXQ6IGQuYnVkZ2V0LnRyaW0oKSxcbiAgICAgICAgICBuZWVkZWRCeTogZC5uZWVkZWRCeT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgYnJhbmRNZW50aW9uZWQ6XG4gICAgICAgICAgICBkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aFxuICAgICAgICAgICAgICA/IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpXG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICBicmFuZEFja25vd2xlZGdlZDogZC5icmFuZENob2ljZSA/PyBudWxsLFxuICAgICAgICAgIHNvdXJjaW5nRmVlUGFpZCxcbiAgICAgICAgICBkaXNjb3VudEFtb3VudCxcbiAgICAgICAgICBkaXNjb3VudExhYmVsLFxuICAgICAgICAgIHN0YXR1czogJ05FVycsXG4gICAgICAgICAgLy8gUGVyc2lzdCB0aGUgcGlja2VkIGZpdHRpbmcgc2xvdCBvbiB0aGUgcmVxdWVzdCBzb1xuICAgICAgICAgIC8vIGdldFBTQXZhaWxhYmxlU2xvdHMgc2VlcyBpdCBldmVuIGJlZm9yZSB0aGUgUFNTbG90IHJvdyBpc1xuICAgICAgICAgIC8vIGNyZWF0ZWQgKGFuZCBhZnRlciB0aGUgMTAtbWludXRlIGhvbGQgZXhwaXJlcykuXG4gICAgICAgICAgZml0dGluZ0RhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIGZpdHRpbmdUaW1lOiBkLmZpdFRpbWU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlZjogdHJ1ZSB9LFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICBjb25zdCBtc2cgPSAoZT8ubWVzc2FnZSA/PyAnJykgYXMgc3RyaW5nXG4gICAgICBpZiAoXG4gICAgICAgIG1zZy5pbmNsdWRlcygndW5pcXVlJykgfHxcbiAgICAgICAgbXNnLmluY2x1ZGVzKCdVbmlxdWUnKSB8fFxuICAgICAgICBtc2cuaW5jbHVkZXMoJ1VOSVFVRScpIHx8XG4gICAgICAgIG1zZy5pbmNsdWRlcygnUDIwMDInKVxuICAgICAgKSB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIDUwICogYXR0ZW1wdHMpKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogbXNnIHx8ICdDb3VsZCBub3QgY3JlYXRlIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSBhcyBjb25zdFxuICAgIH1cbiAgfVxuICBpZiAoIWNyZWF0ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdXZSBjb3VsZCBub3QgcmVzZXJ2ZSB5b3VyIHJlcXVlc3QganVzdCBub3cuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCByZXF1ZXN0SWQgPSBjcmVhdGVkLmlkXG4gIGNvbnN0IHJlZiA9IGNyZWF0ZWQucmVmXG5cbiAgLy8g4pSA4pSAIFBTQnJpZWYg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIC8vIEFsd2F5cyBjcmVhdGUgYSBQU0JyaWVmIHJvdyDigJQgdGhlIGZyZWUtdGV4dCBicmllZiBsaXZlcyBvbiB0aGVcbiAgLy8gcmVxdWVzdCAoY29sdW1uIGBicmllZmApIGFuZCBvbiBQU0JyaWVmIChjb2x1bW4gYG5vdGVzYCkgc28gdGhlXG4gIC8vIHNob3J0bGlzdCBidWlsZGVyIGNhbiByZWFkIHRoZSBzdHJ1Y3R1cmVkIGZvcm0gc2VwYXJhdGVseSBmcm9tIHRoZVxuICAvLyBmbGF0IHJlcXVlc3Qgcm93LlxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBTQnJpZWYuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICBmaXQ6IGQuZml0Py50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgc3R5bGU6IGQuc3R5bGU/LnRyaW0oKSB8fCBudWxsLFxuICAgICAgICBvY2Nhc2lvbjogZC5vY2Nhc2lvbj8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIGJ1ZGdldEJhbmQ6IGQuYnVkZ2V0QmFuZD8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgIHNpemVzOiBkLnNpemVzPy50cmltKCkgfHwgbnVsbCxcbiAgICAgICAgbm90ZXM6IGQuYnJpZWYudHJpbSgpLFxuICAgICAgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNCcmllZiBjcmVhdGUgZmFpbGVkOicsXG4gICAgICAoZSBhcyBFcnJvcikubWVzc2FnZSxcbiAgICApXG4gICAgLy8gTm9uLWZhdGFsIOKAlCB0aGUgcmVxdWVzdCByb3cgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aC5cbiAgfVxuXG4gIC8vIOKUgOKUgCBQU0JyaWVmRmxhZyAoaWYgYnJhbmQvZXhhY3QvbGluayB3YXMgZGV0ZWN0ZWQgJiBjdXN0b21lciBhY2snZCkg4pSA4pSAXG4gIGlmIChkLmJyYW5kVGVybXMgJiYgZC5icmFuZFRlcm1zLmxlbmd0aCAmJiBkLmJyYW5kQ2hvaWNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTQnJpZWZGbGFnLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgICAgdGVybXM6IGQuYnJhbmRUZXJtcy5qb2luKCcsICcpLFxuICAgICAgICAgIGN1c3RvbWVyQ2hvaWNlOiBkLmJyYW5kQ2hvaWNlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIFBTQnJpZWZGbGFnIGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8g4pSA4pSAIFBTU2xvdCAoSU5fUEVSU09OX0ZJVFRJTkcgb25seSkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gIGlmIChkLnRpZXIgPT09ICdJTl9QRVJTT05fRklUVElORycgJiYgc2xvdERhdGVPYmogJiYgZC5maXRUaW1lKSB7XG4gICAgY29uc3QgaG9sZFVudGlsID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIFBTX0hPTERfU0VDT05EUyAqIDEwMDApXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBTU2xvdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgIGRhdGU6IHNsb3REYXRlT2JqLFxuICAgICAgICAgIHN0YXJ0OiBkLmZpdFRpbWUudHJpbSgpLFxuICAgICAgICAgIGFyZWE6IGQuYXJlYT8udHJpbSgpIHx8IG51bGwsXG4gICAgICAgICAgaGVsZFVudGlsOiBob2xkVW50aWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1twZXJzb25hbC1zaG9wcGluZy1jdXN0b21lcl0gUFNTbG90IGNyZWF0ZSBmYWlsZWQ6JyxcbiAgICAgICAgKGUgYXMgRXJyb3IpLm1lc3NhZ2UsXG4gICAgICApXG4gICAgICAvLyBOb24tZmF0YWwg4oCUIHRoZSByZXF1ZXN0J3MgZml0dGluZ0RhdGUvZml0dGluZ1RpbWUgc3RpbGwgZ2F0ZSB0aGVcbiAgICAgIC8vIHNsb3QgZnJvbSBiZWluZyBib29rZWQgYnkgYW5vdGhlciBjdXN0b21lci5cbiAgICB9XG4gIH1cblxuICAvLyDilIDilIAgUHJvbW8gY29kZSB1c2FnZSBidW1wIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuICBpZiAocHJvbW8pIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGIucFNQcm9tb0NvZGUudXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgY29kZTogcHJvbW8uY29kZSB9LFxuICAgICAgICBkYXRhOiB7IHRpbWVzVXNlZDogeyBpbmNyZW1lbnQ6IDEgfSB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcGVyc29uYWwtc2hvcHBpbmctY3VzdG9tZXJdIHByb21vIHRpbWVzVXNlZCBpbmNyZW1lbnQgZmFpbGVkOicsXG4gICAgICAgIChlIGFzIEVycm9yKS5tZXNzYWdlLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGF3YWl0IHdyaXRlUFNFdmVudChyZXF1ZXN0SWQsIHtcbiAgICBhY3RvclR5cGU6IHVzZXJJZCA/ICdDVVNUT01FUicgOiAnU1lTVEVNJyxcbiAgICBhY3RvcklkOiB1c2VySWQsXG4gICAgbm90ZTogYENyZWF0ZWQgJHtyZWZ9ICgke2QudGllcn0ke3Byb21vID8gYCwgJHtkaXNjb3VudExhYmVsfWAgOiAnJ30pYCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIHJlZiwgcmVxdWVzdElkIH0gYXMgY29uc3Rcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA0LiBpbml0aWFsaXplUFNQYXltZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSBzb3VyY2luZyBmZWUuIE1pcnJvcnNcbiAqIGBpbml0aWFsaXplQ29uc3VsdGF0aW9uUGF5bWVudGAgaW4gY29uc3VsdGF0aW9ucy50czpcbiAqICAgLSBsb29rIHVwIHRoZSByZXF1ZXN0IGJ5IGlkXG4gKiAgIC0gb25seSBhbGxvdyBwYXltZW50IHdoaWxlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIE5FVyAobm90IHlldFxuICogICAgIGFjY2VwdGVkIGJ5IHN0YWZmKVxuICogICAtIHN5bnRoZXNpemUgYSBwbGFjZWhvbGRlciBQYXlzdGFjayBlbWFpbCAodGhlIGN1c3RvbWVyJ3MgcmVhbFxuICogICAgIGNvbnRhY3QgY2hhbm5lbCBpcyB0aGUgcGhvbmUpXG4gKiAgIC0gcmV0dXJuIHRoZSBhdXRob3JpemF0aW9uX3VybCB0aGUgd2l6YXJkIHJlZGlyZWN0cyB0b1xuICpcbiAqIFRoZSBQYXlzdGFjayByZWZlcmVuY2UgaXMgYDxyZWY+LTxyYW5kb20+YCDigJQgdGhlIHdlYmhvb2sgbWF0Y2hlcyB0aGVcbiAqIGBXQy1QUy1gIHByZWZpeCB0byByb3V0ZSBjaGFyZ2Uuc3VjY2VzcyBiYWNrIHRvIHRoZSBQUyBoYW5kbGVyLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZVBTUGF5bWVudChyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzb3VyY2luZ0ZlZVBhaWQ6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfSxcbiAgfSlcbiAgaWYgKCFyZXEpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdSZXF1ZXN0IG5vdCBmb3VuZC4nIH0gYXMgY29uc3RcbiAgaWYgKHJlcS5zdGF0dXMgIT09ICdORVcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhd2FpdGluZyBwYXltZW50LicsXG4gICAgfSBhcyBjb25zdFxuICB9XG4gIGlmIChyZXEuc291cmNpbmdGZWVQYWlkIDw9IDApIHtcbiAgICAvLyBQcm9tbyBjb2RlIGJyb3VnaHQgdGhlIHNvdXJjaW5nIGZlZSB0byB6ZXJvIOKAlCBub3RoaW5nIHRvIGNoYXJnZS5cbiAgICAvLyBTdGFtcCBwYWlkQXQgc28gdGhlIHN0YWZmIHNlZSB0aGUgcmVxdWVzdCBhcyByZWFkeSB0byBhY2NlcHQuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEuaWQgfSxcbiAgICAgICAgZGF0YTogeyBwYWlkQXQ6IG5ldyBEYXRlKCkgfSxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCB7fVxuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBub3RlOiBgU291cmNpbmcgZmVlIHdhaXZlZCDigJQgbWFya2VkIHBhaWQgYXV0b21hdGljYWxseSBmb3IgJHtyZXEucmVmfWAsXG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IHRydWUsXG4gICAgICByZWZlcmVuY2U6IG51bGwsXG4gICAgICBhdXRob3JpemF0aW9uVXJsOiBudWxsLFxuICAgICAgYW1vdW50OiAwLFxuICAgICAgZmVlV2FpdmVkOiB0cnVlLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIFBheXN0YWNrIHJlZmVyZW5jZTogV0MtUFMtIyMjIy08cmFuZG9tPiDigJQgdW5pcXVlLCBhbmQgb3VyIHdlYmhvb2tcbiAgLy8gY2FuIG1hdGNoIHRoZSBwcmVmaXggYFdDLVBTLWAgdG8gcm91dGUgdG8gdGhlIFBTIGhhbmRsZXIuXG4gIGNvbnN0IHJlZmVyZW5jZSA9IGAke3JlcS5yZWZ9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWBcblxuICAvLyBQZXJzaXN0IHRoZSByZWZlcmVuY2Ugc28gdGhlIHdlYmhvb2sgKyB2ZXJpZnkgY2FuIGZpbmQgdGhlIHJvdy5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5pZCB9LFxuICAgICAgZGF0YTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGU/Lm1lc3NhZ2UgPz8gJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBzaXRlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMID8/ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYCR7c2l0ZVVybH0vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcvY29uZmlybWVkYFxuICBjb25zdCBpbml0ID0gYXdhaXQgaW5pdGlhbGl6ZVBheXN0YWNrVHJhbnNhY3Rpb24oe1xuICAgIGVtYWlsOiBgJHtyZXEucmVmLnRvTG93ZXJDYXNlKCl9QHdhcmRyb2JlY2FyZS5ib29raW5nYCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgY3VzdG9tZXJfbmFtZTogcmVxLmN1c3RvbWVyTmFtZSxcbiAgICAgIGN1c3RvbWVyX3Bob25lOiByZXEuY3VzdG9tZXJQaG9uZSxcbiAgICAgIGN1c3RvbV9maWVsZHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1JlcXVlc3QnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdyZXF1ZXN0X3JlZicsXG4gICAgICAgICAgdmFsdWU6IHJlcS5yZWYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdTZXJ2aWNlJyxcbiAgICAgICAgICB2YXJpYWJsZV9uYW1lOiAnc2VydmljZScsXG4gICAgICAgICAgdmFsdWU6IFBTX1NFUlZJQ0VfTkFNRSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NvdXJjaW5nIGZlZScsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3NvdXJjaW5nX2ZlZScsXG4gICAgICAgICAgdmFsdWU6IGDigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuXG4gIGlmICghaW5pdC5zdGF0dXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IGluaXQubWVzc2FnZSB8fCAnQ291bGQgbm90IGluaXRpYWxpc2UgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2s6IHRydWUsXG4gICAgcmVmZXJlbmNlLFxuICAgIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCxcbiAgICBhbW91bnQ6IHJlcS5zb3VyY2luZ0ZlZVBhaWQsXG4gICAgZmVlV2FpdmVkOiBmYWxzZSxcbiAgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDUuIGNvbmZpcm1QU1BheW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFZlcmlmeSBhIFBheXN0YWNrIHRyYW5zYWN0aW9uIGZvciBhIFBTIHNvdXJjaW5nLWZlZSBwYXltZW50IGFuZCBtYXJrXG4gKiB0aGUgcmVxdWVzdCBwYWlkLiBNaXJyb3JzIGBjb25maXJtQ29uc3VsdGF0aW9uUGF5bWVudGA6XG4gKiAgIC0gbG9vayB1cCB0aGUgcmVxdWVzdCBieSBwYXltZW50UmVmZXJlbmNlXG4gKiAgIC0gaWRlbXBvdGVudCDigJQgaWYgdGhlIHJlcXVlc3QgaXMgYWxyZWFkeSBwYWlkIChwYWlkQXQgc2V0KSwgcmV0dXJuIG9rXG4gKiAgIC0gdmVyaWZ5IHdpdGggUGF5c3RhY2tcbiAqICAgLSBzdGFtcCBwYWlkQXRcbiAqICAgLSBzdGF0dXMgU1RBWVMgTkVXIChzdGFmZiBzdGlsbCBuZWVkIHRvIGFjY2VwdCB0aGUgcmVxdWVzdCDigJRcbiAqICAgICBgYWRtaW5BY2NlcHRQU1JlcXVlc3RgIGluIHBlcnNvbmFsLXNob3BwaW5nLXdvcmtmbG93LnRzIGdhdGVzIG9uXG4gKiAgICAgc3RhdHVzPT09J05FVycpXG4gKiAgIC0gd3JpdGUgYSBQU0V2ZW50IHNvIHRoZSBhdWRpdCB0cmFpbCBzaG93cyB0aGUgcGF5bWVudFxuICpcbiAqIEJvdGggdGhlIGNsaWVudCB2ZXJpZnkgKHRoaXMgZnVuY3Rpb24pIGFuZCB0aGUgd2ViaG9vayBhcmVcbiAqIGlkZW1wb3RlbnQg4oCUIHdoaWNoZXZlciBsYW5kcyBmaXJzdCB3aW5zLCB0aGUgc2Vjb25kIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25maXJtUFNQYXltZW50KHJlZmVyZW5jZTogc3RyaW5nKSB7XG4gIGlmICghcmVmZXJlbmNlKSByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBwYXltZW50IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBwYXltZW50UmVmZXJlbmNlOiByZWZlcmVuY2UgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVmOiB0cnVlLFxuICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgcGFpZEF0OiB0cnVlLFxuICAgICAgc291cmNpbmdGZWVQYWlkOiB0cnVlLFxuICAgICAgdXNlcklkOiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kIGZvciB0aGF0IHJlZmVyZW5jZS4nIH0gYXMgY29uc3RcbiAgfVxuXG4gIC8vIElkZW1wb3RlbnQg4oCUIGFscmVhZHkgcGFpZC4gKFdlIGtlZXAgc3RhdHVzIGFzIE5FVywgc28gYSByZS12ZXJpZnlcbiAgLy8gYWZ0ZXIgdGhlIHdlYmhvb2sgaGFzIGxhbmRlZCBpcyBhIG5vLW9wIHJhdGhlciB0aGFuIGFuIGVycm9yLilcbiAgaWYgKHJlcS5wYWlkQXQpIHtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgcmVmOiByZXEucmVmLCBhbHJlYWR5UGFpZDogdHJ1ZSB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBWZXJpZnkgd2l0aCBQYXlzdGFja1xuICBjb25zdCB2ZXJpZnkgPSBhd2FpdCB2ZXJpZnlQYXlzdGFja1RyYW5zYWN0aW9uKHJlZmVyZW5jZSlcbiAgaWYgKCF2ZXJpZnkgfHwgIXZlcmlmeS5zdGF0dXMgfHwgdmVyaWZ5LmRhdGEuc3RhdHVzICE9PSAnc3VjY2VzcycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQYXltZW50IGNvdWxkIG5vdCBiZSB2ZXJpZmllZC4gSWYgeW91IHdlcmUgY2hhcmdlZCwgcGxlYXNlIGNvbnRhY3QgdXMuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBsZXQgZGlkVXBkYXRlID0gZmFsc2VcbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi4kdHJhbnNhY3Rpb24oYXN5bmMgKHR4KSA9PiB7XG4gICAgICBjb25zdCBmcmVzaCA9IGF3YWl0IHR4LnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIHNlbGVjdDogeyBwYWlkQXQ6IHRydWUgfSxcbiAgICAgIH0pXG4gICAgICBpZiAoIWZyZXNoKSByZXR1cm5cbiAgICAgIGlmIChmcmVzaC5wYWlkQXQpIHJldHVybiAvLyByYWNlZCB3aXRoIHRoZSB3ZWJob29rXG4gICAgICBhd2FpdCB0eC5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICAgIGRhdGE6IHsgcGFpZEF0OiBuZXcgRGF0ZSgpIH0sXG4gICAgICB9KVxuICAgICAgZGlkVXBkYXRlID0gdHJ1ZVxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IG1hcmsgcmVxdWVzdCBhcyBwYWlkLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgaWYgKGRpZFVwZGF0ZSkge1xuICAgIGF3YWl0IHdyaXRlUFNFdmVudChyZXEuaWQsIHtcbiAgICAgIGFjdG9yVHlwZTogJ1NZU1RFTScsXG4gICAgICBhY3RvcklkOiByZXEudXNlcklkLFxuICAgICAgbm90ZTogYFNvdXJjaW5nIGZlZSBwYWlkIGZvciAke3JlcS5yZWZ9ICjigqYke3JlcS5zb3VyY2luZ0ZlZVBhaWQudG9Mb2NhbGVTdHJpbmcoKX0pIOKAlCBhd2FpdGluZyBzdGFmZiBhY2NlcHRhbmNlYCxcbiAgICB9KVxuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCByZWY6IHJlcS5yZWYgfSBhcyBjb25zdFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIDYuIGdldFNob3J0bGlzdEJ5VG9rZW5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFB1YmxpYyBsb29rdXAgdXNlZCBieSB0aGUgb25saW5lIHNob3J0bGlzdCByZXZpZXcgcGFnZVxuICogKC9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9zaG9ydGxpc3QvW3Rva2VuXSkuIFJldHVybnM6XG4gKiAgIC0gdGhlIHNob3J0bGlzdCAoaWQsIHNlbnRBdCwgY2hhbm5lbCwgaG9sZFVudGlsKVxuICogICAtIHRoZSBpdGVtcyAob25lIHJvdyBwZXIgUFNTaG9ydGxpc3RJdGVtKVxuICogICAtIHJlcXVlc3QgaW5mbyAoY3VzdG9tZXJOYW1lLCBicmllZiwgYnVkZ2V0LCByZWYsIHRpZXIpXG4gKlxuICogUmV0dXJucyBudWxsIGlmOlxuICogICAtIHRoZSB0b2tlbiBkb2Vzbid0IG1hdGNoIGEgc2hvcnRsaXN0LCBPUlxuICogICAtIHRoZSBzaG9ydGxpc3QgaGFzIG5vdCBiZWVuIHNlbnQgeWV0IChzZW50QXQgaXMgbnVsbCkg4oCUIHRoZSBwYWdlXG4gKiAgICAgc2hvdWxkbid0IGJlIHJlYWNoYWJsZSBiZWZvcmUgdGhlIHN0eWxpc3Qgc2VuZHMgdGhlIGxpbmsuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTaG9ydGxpc3RCeVRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgaWYgKCF0b2tlbiB8fCAhdG9rZW4udHJpbSgpKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGlkOiB0cnVlLFxuICAgICAgcmVxdWVzdElkOiB0cnVlLFxuICAgICAgdG9rZW46IHRydWUsXG4gICAgICBzZW50QXQ6IHRydWUsXG4gICAgICBjaGFubmVsOiB0cnVlLFxuICAgICAgaG9sZFVudGlsOiB0cnVlLFxuICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0KSByZXR1cm4gbnVsbFxuICBpZiAoIXNob3J0bGlzdC5zZW50QXQpIHJldHVybiBudWxsIC8vIG5vdCB5ZXQgc2VudCB0byB0aGUgY3VzdG9tZXJcblxuICBjb25zdCBbaXRlbXMsIHJlcXVlc3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGRiLnBTU2hvcnRsaXN0SXRlbS5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBzaG9ydGxpc3RJZDogc2hvcnRsaXN0LmlkIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2FzYycgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgY2F0ZWdvcnk6IHRydWUsXG4gICAgICAgIHNpemU6IHRydWUsXG4gICAgICAgIHByaWNlOiB0cnVlLFxuICAgICAgICBzb3VyY2U6IHRydWUsXG4gICAgICAgIHN0eWxpc3ROb3RlOiB0cnVlLFxuICAgICAgICBkZWNpc2lvbjogdHJ1ZSxcbiAgICAgICAgYWx0Tm90ZTogdHJ1ZSxcbiAgICAgICAgZGVjaWRlZEJ5OiB0cnVlLFxuICAgICAgICBkZWNpZGVkQXQ6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZGIucGVyc29uYWxTaG9wcGluZ1JlcXVlc3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2hvcnRsaXN0LnJlcXVlc3RJZCB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIHJlZjogdHJ1ZSxcbiAgICAgICAgY3VzdG9tZXJOYW1lOiB0cnVlLFxuICAgICAgICBicmllZjogdHJ1ZSxcbiAgICAgICAgYnVkZ2V0OiB0cnVlLFxuICAgICAgICB0aWVyOiB0cnVlLFxuICAgICAgICByZXZpZXdNZXRob2Q6IHRydWUsXG4gICAgICAgIGFyZWE6IHRydWUsXG4gICAgICAgIGlzTGFnb3M6IHRydWUsXG4gICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0pXG4gIGlmICghcmVxdWVzdCkgcmV0dXJuIG51bGxcblxuICByZXR1cm4ge1xuICAgIHNob3J0bGlzdDoge1xuICAgICAgaWQ6IHNob3J0bGlzdC5pZCxcbiAgICAgIHRva2VuOiBzaG9ydGxpc3QudG9rZW4sXG4gICAgICBjaGFubmVsOiBzaG9ydGxpc3QuY2hhbm5lbCxcbiAgICAgIHNlbnRBdDogc2hvcnRsaXN0LnNlbnRBdC50b0lTT1N0cmluZygpLFxuICAgICAgaG9sZFVudGlsOiBzaG9ydGxpc3QuaG9sZFVudGlsID8gc2hvcnRsaXN0LmhvbGRVbnRpbC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICB9LFxuICAgIHJlcXVlc3Q6IHtcbiAgICAgIHJlZjogcmVxdWVzdC5yZWYsXG4gICAgICBjdXN0b21lck5hbWU6IHJlcXVlc3QuY3VzdG9tZXJOYW1lLFxuICAgICAgYnJpZWY6IHJlcXVlc3QuYnJpZWYsXG4gICAgICBidWRnZXQ6IHJlcXVlc3QuYnVkZ2V0LFxuICAgICAgdGllcjogcmVxdWVzdC50aWVyLFxuICAgICAgcmV2aWV3TWV0aG9kOiByZXF1ZXN0LnJldmlld01ldGhvZCxcbiAgICAgIGFyZWE6IHJlcXVlc3QuYXJlYSxcbiAgICAgIGlzTGFnb3M6IHJlcXVlc3QuaXNMYWdvcyxcbiAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgfSxcbiAgICBpdGVtczogaXRlbXMubWFwKChpKSA9PiAoe1xuICAgICAgLi4uaSxcbiAgICAgIGRlY2lkZWRBdDogaS5kZWNpZGVkQXQgPyBpLmRlY2lkZWRBdC50b0lTT1N0cmluZygpIDogbnVsbCxcbiAgICAgIGNyZWF0ZWRBdDogaS5jcmVhdGVkQXQudG9JU09TdHJpbmcoKSxcbiAgICB9KSksXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA3LiBzdWJtaXRJdGVtRGVjaXNpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBkZWNpc2lvblZhbHVlcyA9IFsnS0VFUCcsICdTS0lQJywgJ1dBTlRTX0RJRkZFUkVOVCddIGFzIGNvbnN0XG5cbi8qKlxuICogUmVjb3JkIHRoZSBjdXN0b21lcidzIGRlY2lzaW9uIG9uIGEgc2luZ2xlIHNob3J0bGlzdCBpdGVtLiBDYWxsZWRcbiAqIGZyb20gdGhlIG9ubGluZSByZXZpZXcgcGFnZSB3aGVuIHRoZSBjdXN0b21lciB0YXBzIEtlZXAgLyBTa2lwIC9cbiAqIFwiV2FudCBzb21ldGhpbmcgZGlmZmVyZW50XCIgb24gZWFjaCByb3cuXG4gKlxuICogVGhlIGN1c3RvbWVyIG1heSBmbGlwIGEgZGVjaXNpb24gYmFjayBhbmQgZm9ydGggZnJlZWx5IHdoaWxlIHRoZVxuICogc2hvcnRsaXN0IGlzIHN0aWxsIG9wZW4uIGBkZWNpZGVkQnk9Q1VTVE9NRVJgIGlzIHN0YW1wZWQgc28gdGhlXG4gKiBzdHlsaXN0IGNhbiBkaXN0aW5ndWlzaCBjdXN0b21lci1zZXQgZGVjaXNpb25zIGZyb20gc3RhZmYgb3ZlcnJpZGVzXG4gKiAodGhlIGFkbWluIHdvcmtmbG93IHJlY29yZHMgU1RBRkYgdmlhIGBhZG1pblJlY29yZEl0ZW1EZWNpc2lvbmApLlxuICpcbiAqIEZvciBgV0FOVFNfRElGRkVSRU5UYCB0aGUgY3VzdG9tZXIgY2FuIGFkZCBhIGZyZWUtdGV4dCBgYWx0Tm90ZWBcbiAqIHNheWluZyB3aGF0IHRoZXkgd2FudCBpbnN0ZWFkICh0aGUgZmllbGQgaXMgY2xlYXJlZCBpZiB0aGUgY3VzdG9tZXJcbiAqIGxhdGVyIGZsaXBzIHRvIEtFRVAvU0tJUCDigJQgc2FtZSBiZWhhdmlvdXIgYXMgdGhlIGFkbWluIHNpZGUpLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0SXRlbURlY2lzaW9uKFxuICB0b2tlbjogc3RyaW5nLFxuICBpdGVtSWQ6IHN0cmluZyxcbiAgZGVjaXNpb246IHN0cmluZyxcbiAgYWx0Tm90ZT86IHN0cmluZyxcbikge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFpdGVtSWQpIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6ICdNaXNzaW5nIGl0ZW0gaWQuJyB9IGFzIGNvbnN0XG4gIGlmICghZGVjaXNpb25WYWx1ZXMuaW5jbHVkZXMoZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXSkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBkZWNpc2lvbi4nIH0gYXMgY29uc3RcbiAgfVxuICBjb25zdCBkZWNpc2lvblZhbHVlID0gZGVjaXNpb24gYXMgKHR5cGVvZiBkZWNpc2lvblZhbHVlcylbbnVtYmVyXVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtID0gYXdhaXQgZGIucFNTaG9ydGxpc3RJdGVtLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHNob3J0bGlzdElkOiB0cnVlLCBuYW1lOiB0cnVlLCBkZWNpc2lvbjogdHJ1ZSB9LFxuICB9KVxuICBpZiAoIWl0ZW0gfHwgaXRlbS5zaG9ydGxpc3RJZCAhPT0gc2hvcnRsaXN0LmlkKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ0l0ZW0gbm90IGZvdW5kIGluIHRoaXMgc2hvcnRsaXN0LicgfSBhcyBjb25zdFxuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0udXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBpdGVtSWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGVjaXNpb246IGRlY2lzaW9uVmFsdWUsXG4gICAgICAgIGFsdE5vdGU6XG4gICAgICAgICAgZGVjaXNpb25WYWx1ZSA9PT0gJ1dBTlRTX0RJRkZFUkVOVCdcbiAgICAgICAgICAgID8gKGFsdE5vdGU/LnRyaW0oKSB8fCBudWxsKVxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICBkZWNpZGVkQnk6ICdDVVNUT01FUicsXG4gICAgICAgIGRlY2lkZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBlPy5tZXNzYWdlID8/ICdDb3VsZCBub3QgcmVjb3JkIHlvdXIgZGVjaXNpb24uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBub3RlID1cbiAgICBgQ3VzdG9tZXIgZGVjaXNpb24gb24gXCIke2l0ZW0ubmFtZX1cIjogJHtkZWNpc2lvblZhbHVlfWAgK1xuICAgIChkZWNpc2lvblZhbHVlID09PSAnV0FOVFNfRElGRkVSRU5UJyAmJiBhbHROb3RlPy50cmltKClcbiAgICAgID8gYCDigJQgd2FudHM6ICR7YWx0Tm90ZS50cmltKCl9YFxuICAgICAgOiAnJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHNob3J0bGlzdC5yZXF1ZXN0SWQsIHsgYWN0b3JUeXBlOiAnQ1VTVE9NRVInLCBub3RlIH0pXG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZycpXG4gIHJldHVybiB7IG9rOiB0cnVlLCBkZWNpc2lvbjogZGVjaXNpb25WYWx1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOC4gcmVxdWVzdE1vcmVJdGVtc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogQ3VzdG9tZXIgc2F5cyBcIm5vbmUgb2YgdGhlc2Ugc3VpdCBtZVwiIC8gXCJJIHdhbnQgc29tZXRoaW5nIGRpZmZlcmVudFwiLlxuICogV3JpdGVzIGEgUFNFdmVudCBvbiB0aGUgdW5kZXJseWluZyByZXF1ZXN0IHNvIHRoZSBzdHlsaXN0IGlzXG4gKiBub3RpZmllZCB0byByZS1zb3VyY2UuIFRoZSBzaG9ydGxpc3Qgc3RheXMgb3BlbiDigJQgdGhlIGN1c3RvbWVyIGNhblxuICogc3RpbGwgdGFwIEtFRVAvU0tJUCBvbiB0aGUgZXhpc3RpbmcgaXRlbXMgYWZ0ZXIgdGhpcyBpcyBzdWJtaXR0ZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0TW9yZUl0ZW1zKHRva2VuOiBzdHJpbmcsIG5vdGU6IHN0cmluZykge1xuICBpZiAoIXRva2VuIHx8ICF0b2tlbi50cmltKCkpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBzaG9ydGxpc3QgdG9rZW4uJyB9IGFzIGNvbnN0XG4gIH1cbiAgaWYgKCFub3RlIHx8IG5vdGUudHJpbSgpLmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdQbGVhc2UgdGVsbCB1cyBhIGJpdCBtb3JlIGFib3V0IHdoYXQgeW91IHdhbnQgaW5zdGVhZC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHRva2VuOiB0b2tlbi50cmltKCkgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHJlcXVlc3RJZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1Nob3J0bGlzdCBub3QgZm91bmQuJyB9IGFzIGNvbnN0XG4gIH1cblxuICBhd2FpdCB3cml0ZVBTRXZlbnQoc2hvcnRsaXN0LnJlcXVlc3RJZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgcmVxdWVzdGVkIG1vcmUgaXRlbXM6ICR7bm90ZS50cmltKCkuc2xpY2UoMCwgNTAwKX1gLFxuICB9KVxuXG4gIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4vc2VydmljZXMvcGVyc29uYWwtc2hvcHBpbmcnKVxuICByZXR1cm4geyBvazogdHJ1ZSB9IGFzIGNvbnN0XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gOS4gcGF5Rm9ySXRlbXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEZvciB0aGUgb25saW5lIHJldmlldyBmbG93OiB0aGUgY3VzdG9tZXIgaGFzIGZpbmlzaGVkIG1hcmtpbmdcbiAqIGl0ZW1zIEtFRVAgLyBTS0lQIC8gV0FOVFNfRElGRkVSRU5ULCBhbmQgbm93IHdhbnRzIHRvIHBheSBmb3IgdGhlXG4gKiBpdGVtcyB0aGV5J3JlIGtlZXBpbmcuIFRoaXM6XG4gKiAgIC0gc3VtcyB0aGUgcHJpY2VzIG9mIGV2ZXJ5IFBTU2hvcnRsaXN0SXRlbSB3aXRoIGRlY2lzaW9uPUtFRVBcbiAqICAgICBvbiB0aGUgcmVxdWVzdCdzIHNob3J0bGlzdFxuICogICAtIGFkZHMgdGhlIGRlbGl2ZXJ5IGZlZSAoZGVsaXZlcnlGZWVRdW90ZWQsIHNldCBieSBzdGFmZiwgZmFsbGluZ1xuICogICAgIGJhY2sgdG8gZGVsaXZlcnlGZWVab25lKVxuICogICAtIGluaXRpYWxpc2VzIGEgUGF5c3RhY2sgdHJhbnNhY3Rpb24gZm9yIHRoZSB0b3RhbFxuICogICAtIHNldHMgcmVxdWVzdC5wYXltZW50TWV0aG9kID0gXCJsaW5rXCJcbiAqICAgLSB3cml0ZXMgYSBQU0V2ZW50XG4gKlxuICogUmV0dXJucyB0aGUgYXV0aG9yaXphdGlvbl91cmwgdGhlIGN1c3RvbWVyIGlzIHJlZGlyZWN0ZWQgdG8uIFRoZVxuICogYWN0dWFsIFwibWFyayBwYWlkXCIgaGFwcGVucyB2aWEgdGhlIFBheXN0YWNrIHdlYmhvb2sgKG9yIGEgc2VwYXJhdGVcbiAqIGNvbmZpcm0gc3RlcCkg4oCUIHRoaXMgYWN0aW9uIGp1c3Qga2lja3Mgb2ZmIHRoZSBwYXltZW50LlxuICpcbiAqIElmIHRoZSBjdXN0b21lciBoYXMga2VwdCB6ZXJvIGl0ZW1zLCB3ZSByZWZ1c2UgdG8gY2hhcmdlIOKAlCB0aGVyZSdzXG4gKiBub3RoaW5nIHRvIHBheSBmb3IuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYXlGb3JJdGVtcyhyZXF1ZXN0SWQ6IHN0cmluZykge1xuICBpZiAoIXJlcXVlc3RJZCkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgcmVxdWVzdCBpZC4nIH0gYXMgY29uc3RcblxuICBjb25zdCByZXEgPSBhd2FpdCBkYi5wZXJzb25hbFNob3BwaW5nUmVxdWVzdC5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZDogcmVxdWVzdElkIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICBpZDogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyTmFtZTogdHJ1ZSxcbiAgICAgIGN1c3RvbWVyUGhvbmU6IHRydWUsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgICBkZWxpdmVyeUZlZVF1b3RlZDogdHJ1ZSxcbiAgICAgIGRlbGl2ZXJ5RmVlWm9uZTogdHJ1ZSxcbiAgICB9LFxuICB9KVxuICBpZiAoIXJlcSkgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogJ1JlcXVlc3Qgbm90IGZvdW5kLicgfSBhcyBjb25zdFxuICBpZiAocmVxLnN0YXR1cyA9PT0gJ0NBTkNFTExFRCcgfHwgcmVxLnN0YXR1cyA9PT0gJ0RPTkUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnVGhpcyByZXF1ZXN0IGlzIG5vIGxvbmdlciBhY2NlcHRpbmcgcGF5bWVudC4nLFxuICAgIH0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IHNob3J0bGlzdCA9IGF3YWl0IGRiLnBTU2hvcnRsaXN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IHJlcXVlc3RJZCB9LFxuICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgc2VudEF0OiB0cnVlIH0sXG4gIH0pXG4gIGlmICghc2hvcnRsaXN0IHx8ICFzaG9ydGxpc3Quc2VudEF0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiAnTm8gc2hvcnRsaXN0IGhhcyBiZWVuIHNlbnQgZm9yIHRoaXMgcmVxdWVzdCB5ZXQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBrZXB0SXRlbXMgPSBhd2FpdCBkYi5wU1Nob3J0bGlzdEl0ZW0uZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IHNob3J0bGlzdElkOiBzaG9ydGxpc3QuaWQsIGRlY2lzaW9uOiAnS0VFUCcgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIHByaWNlOiB0cnVlIH0sXG4gIH0pXG4gIGlmICgha2VwdEl0ZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogJ1BpY2sgYXQgbGVhc3Qgb25lIGl0ZW0gdG8ga2VlcCBiZWZvcmUgcGF5aW5nLicsXG4gICAgfSBhcyBjb25zdFxuICB9XG5cbiAgY29uc3QgaXRlbXNTdWJ0b3RhbCA9IGtlcHRJdGVtcy5yZWR1Y2UoKHMsIGkpID0+IHMgKyBpLnByaWNlLCAwKVxuICBjb25zdCBkZWxpdmVyeUZlZSA9IHJlcS5kZWxpdmVyeUZlZVF1b3RlZCA/PyByZXEuZGVsaXZlcnlGZWVab25lID8/IDBcbiAgY29uc3QgdG90YWwgPSBpdGVtc1N1YnRvdGFsICsgZGVsaXZlcnlGZWVcbiAgaWYgKHRvdGFsIDw9IDApIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiAnTm90aGluZyB0byBjaGFyZ2UuJyB9IGFzIGNvbnN0XG4gIH1cblxuICAvLyBEaXN0aW5jdCBwcmVmaXggc28gdGhlIHdlYmhvb2sgY2FuIHJvdXRlIGNoYXJnZS5zdWNjZXNzIHRvIHRoZVxuICAvLyBpdGVtcy1wYXltZW50IGhhbmRsZXIgKHNlcGFyYXRlIGZyb20gdGhlIHNvdXJjaW5nLWZlZSBwYXltZW50KS5cbiAgY29uc3QgcmVmZXJlbmNlID0gYCR7cmVxLnJlZn0tSVRFTVMtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YFxuXG4gIGNvbnN0IHNpdGVVcmwgPSBwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkwgPz8gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCdcbiAgY29uc3QgY2FsbGJhY2tVcmwgPSBgJHtzaXRlVXJsfS9zZXJ2aWNlcy9wZXJzb25hbC1zaG9wcGluZy9jb25maXJtZWRgXG4gIGNvbnN0IGluaXQgPSBhd2FpdCBpbml0aWFsaXplUGF5c3RhY2tUcmFuc2FjdGlvbih7XG4gICAgZW1haWw6IGAke3JlcS5yZWYudG9Mb3dlckNhc2UoKX1Ad2FyZHJvYmVjYXJlLmJvb2tpbmdgLFxuICAgIGFtb3VudDogdG90YWwsXG4gICAgcmVmZXJlbmNlLFxuICAgIGNhbGxiYWNrX3VybDogY2FsbGJhY2tVcmwsXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHJlcXVlc3RfcmVmOiByZXEucmVmLFxuICAgICAgc2VydmljZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgcGF5bWVudF9raW5kOiAnSVRFTVMnLFxuICAgICAgaXRlbXNfc3VidG90YWw6IGl0ZW1zU3VidG90YWwsXG4gICAgICBkZWxpdmVyeV9mZWU6IGRlbGl2ZXJ5RmVlLFxuICAgICAgY3VzdG9tX2ZpZWxkczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnUmVxdWVzdCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3JlcXVlc3RfcmVmJyxcbiAgICAgICAgICB2YWx1ZTogcmVxLnJlZixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXlfbmFtZTogJ1NlcnZpY2UnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdzZXJ2aWNlJyxcbiAgICAgICAgICB2YWx1ZTogUFNfU0VSVklDRV9OQU1FLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnSXRlbXMnLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdpdGVtc190b3RhbCcsXG4gICAgICAgICAgdmFsdWU6IGDigqYke2l0ZW1zU3VidG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheV9uYW1lOiAnRGVsaXZlcnknLFxuICAgICAgICAgIHZhcmlhYmxlX25hbWU6ICdkZWxpdmVyeV9mZWUnLFxuICAgICAgICAgIHZhbHVlOiBg4oKmJHtkZWxpdmVyeUZlZS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5X25hbWU6ICdUb3RhbCcsXG4gICAgICAgICAgdmFyaWFibGVfbmFtZTogJ3RvdGFsJyxcbiAgICAgICAgICB2YWx1ZTogYOKCpiR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KVxuICBpZiAoIWluaXQuc3RhdHVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBpbml0Lm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBpbml0aWFsaXNlIHBheW1lbnQuJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGRiLnBlcnNvbmFsU2hvcHBpbmdSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcmVxLmlkIH0sXG4gICAgICBkYXRhOiB7IHBheW1lbnRNZXRob2Q6ICdsaW5rJyB9LFxuICAgIH0pXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogZT8ubWVzc2FnZSA/PyAnQ291bGQgbm90IHN0YXJ0IHBheW1lbnQuIFBsZWFzZSB0cnkgYWdhaW4uJyxcbiAgICB9IGFzIGNvbnN0XG4gIH1cblxuICBjb25zdCBpdGVtTmFtZXMgPSBrZXB0SXRlbXMubWFwKChpKSA9PiBpLm5hbWUpLmpvaW4oJywgJylcbiAgYXdhaXQgd3JpdGVQU0V2ZW50KHJlcS5pZCwge1xuICAgIGFjdG9yVHlwZTogJ0NVU1RPTUVSJyxcbiAgICBub3RlOiBgQ3VzdG9tZXIgaW5pdGlhdGVkIGl0ZW1zIHBheW1lbnQgZm9yICR7cmVxLnJlZn06ICR7a2VwdEl0ZW1zLmxlbmd0aH0gaXRlbShzKSBbJHtpdGVtTmFtZXMuc2xpY2UoMCwgMjAwKX1dIMK3IGl0ZW1zIOKCpiR7aXRlbXNTdWJ0b3RhbC50b0xvY2FsZVN0cmluZygpfSArIGRlbGl2ZXJ5IOKCpiR7ZGVsaXZlcnlGZWUudG9Mb2NhbGVTdHJpbmcoKX0gPSDigqYke3RvdGFsLnRvTG9jYWxlU3RyaW5nKCl9YCxcbiAgfSlcblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3NlcnZpY2VzL3BlcnNvbmFsLXNob3BwaW5nJylcbiAgcmV0dXJuIHsgb2s6IHRydWUsIGF1dGhvcml6YXRpb25Vcmw6IGluaXQuZGF0YS5hdXRob3JpemF0aW9uX3VybCwgcmVmZXJlbmNlLCB0b3RhbCB9IGFzIGNvbnN0XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImlUQWdNc0IsZ01BQUEifQ==
}),
"[project]/src/lib/ps-brief-guard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Brief guard — detects brand names, exact-item cues, links, and
 * inspiration phrases in a customer's free-text brief.
 *
 * This is a SYNC utility (not a server action) so the booking wizard
 * can import and call it directly from a Client Component without
 * an extra round-trip.
 */ __turbopack_context__.s([
    "checkBriefGuard",
    ()=>checkBriefGuard
]);
const BRAND_NAMES = [
    'Gucci',
    'Nike',
    'Prada',
    'Louis Vuitton',
    'LV',
    'Zara',
    'H&M',
    'Adidas',
    'Puma',
    'Balenciaga',
    'Versace',
    'Dolce & Gabbana',
    'D&G',
    'Tom Ford',
    'Ralph Lauren',
    'Lacoste',
    'Hugo Boss',
    'Boss',
    'Armani',
    'Burberry',
    'Givenchy',
    'Valentino',
    'Off-White',
    'Stone Island',
    'Moncler',
    'Canada Goose',
    'Fendi',
    'Celine',
    'Chanel',
    'Dior',
    'Saint Laurent',
    'YSL',
    'Bottega Veneta',
    'Kenzo',
    'Comme des Garcons',
    'CDG',
    'Supreme',
    'Stüssy',
    'Carhartt',
    'A-Cold-Wall',
    'Rhude',
    'Amiri',
    'Heron Preston',
    'Kith'
];
const EXACT_CUES = [
    'exact same',
    'this exact',
    'exactly this',
    'the one in',
    'link to',
    'url'
];
const LINK_CUES = [
    'http://',
    'https://',
    'www.'
];
const INSPIRATION_CUES = [
    'inspired by',
    'like the',
    'similar to',
    'vibe of'
];
/** Escape a string so it can be safely embedded in a RegExp. */ function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** De-duplicate an array while preserving order. */ function dedupe(xs) {
    return Array.from(new Set(xs));
}
function checkBriefGuard(briefText) {
    const text = (briefText ?? '').toLowerCase();
    if (!text.trim()) {
        return {
            flagged: false,
            terms: [],
            type: null
        };
    }
    const original = briefText ?? '';
    // ── Brand mentions ──────────────────────────────────────────────
    const matchedBrands = [];
    for (const b of BRAND_NAMES){
        if (/[ .&\-]/.test(b)) {
            if (text.includes(b.toLowerCase())) matchedBrands.push(b);
            continue;
        }
        const re = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(b.toLowerCase())}(?:[^a-z0-9]|$)`, 'i');
        if (re.test(text)) matchedBrands.push(b);
    }
    // ── Links ────────────────────────────────────────────────────────
    const matchedLinks = [];
    for (const cue of LINK_CUES){
        if (text.includes(cue)) matchedLinks.push(cue);
    }
    const urls = original.match(/https?:\/\/\S+/gi) || [];
    for (const u of urls)matchedLinks.push(u);
    // ── Exact-item cues ──────────────────────────────────────────────
    const matchedExact = [];
    for (const cue of EXACT_CUES){
        if (text.includes(cue)) matchedExact.push(cue);
    }
    // ── Inspiration cues (soft notes) ────────────────────────────────
    const matchedInspiration = [];
    for (const cue of INSPIRATION_CUES){
        if (text.includes(cue)) matchedInspiration.push(cue);
    }
    // Priority: LINK > EXACT > BRAND > INSPIRATION.
    if (matchedLinks.length) {
        return {
            flagged: true,
            terms: dedupe(matchedLinks),
            type: 'LINK'
        };
    }
    if (matchedExact.length) {
        return {
            flagged: true,
            terms: dedupe(matchedExact),
            type: 'EXACT'
        };
    }
    if (matchedBrands.length) {
        return {
            flagged: true,
            terms: dedupe(matchedBrands),
            type: 'BRAND'
        };
    }
    if (matchedInspiration.length) {
        return {
            flagged: false,
            terms: dedupe(matchedInspiration),
            type: 'INSPIRATION'
        };
    }
    return {
        flagged: false,
        terms: [],
        type: null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/services/personal-shopping/book/booking-wizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingWizard",
    ()=>BookingWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Personal Shopping booking wizard — paid version.
 *
 * 4-step flow matching the consultation wizard pattern:
 *   1. Your details (name, phone, contact method)
 *   2. The brief (what you need, categories, colours, budget, sizes, fit, occasion)
 *      — includes the brand/exact-item guard: if the brief text mentions
 *        brands or exact items, the customer sees a warning and must
 *        acknowledge to continue or join the waitlist
 *   3. Service preference (Delivered or In-Person Fitting; if In-Person,
 *      pick a date+time slot which gets held for 10 minutes)
 *   4. Confirm & pay (review summary, pay the sourcing fee via Paystack)
 *
 * On the last step the wizard calls `createPersonalShoppingRequest` to
 * create the request + hold the slot (if In-Person), then
 * `initializePSPayment` to start the Paystack flow.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$eebf2d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:eebf2d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$5f9ccb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:5f9ccb [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$be7192__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:be7192 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ps$2d$brief$2d$guard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ps-brief-guard.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const EMPTY = {
    customerName: '',
    customerPhone: '',
    contactVia: 'WhatsApp',
    shoppingFor: 'Myself',
    brief: '',
    categories: [],
    colours: [],
    budget: '',
    sizes: '',
    fit: '',
    occasion: '',
    tier: 'DELIVERED',
    reviewMethod: 'ONLINE',
    area: '',
    isLagos: true,
    neededBy: '',
    fitDate: '',
    fitTime: '',
    brandTerms: [],
    brandChoice: '',
    promoCode: ''
};
const STEPS = [
    {
        num: '01',
        label: 'Your Details'
    },
    {
        num: '02',
        label: 'The Brief'
    },
    {
        num: '03',
        label: 'Service Preference'
    },
    {
        num: '04',
        label: 'Confirm & Pay'
    }
];
const CATEGORIES = [
    'Shirts / Tops',
    'Trousers',
    'Suiting',
    'Footwear',
    'Accessories',
    'Fragrance & Grooming',
    'Traditional Wear'
];
const COLOURS = [
    'Navy',
    'Black',
    'White',
    'Grey',
    'Olive / Sage',
    'Earth tones',
    'Red',
    'Blue',
    'Green',
    'Brown',
    'Cream'
];
const BUDGETS = [
    'Under ₦100,000',
    '₦100,000 to ₦250,000',
    '₦250,000 to ₦500,000',
    'Above ₦500,000'
];
const FITS = [
    'Slim',
    'Regular',
    'Relaxed',
    'Not sure'
];
const OCCASIONS = [
    'Work',
    'Events',
    'Everyday',
    'Wedding',
    'Church',
    'Travel',
    'Traditional'
];
const SLOT_TIMES = [
    '9:00 AM',
    '11:30 AM',
    '2:00 PM',
    '4:30 PM'
];
const inputCls = 'w-full h-12 px-4 text-sm bg-transparent border border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground/60';
function BookingWizard() {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slots, setSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [briefGuard, setBriefGuard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [heldUntil, setHeldUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const set = (patch)=>setData((d)=>({
                ...d,
                ...patch
            }));
    // Brief guard: check as user types
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingWizard.useEffect": ()=>{
            if (step !== 1) return;
            if (data.brief.trim().length < 10) {
                // Use a microtask to avoid synchronous setState in effect
                queueMicrotask({
                    "BookingWizard.useEffect": ()=>{
                        setBriefGuard(null);
                        setData({
                            "BookingWizard.useEffect": (d)=>({
                                    ...d,
                                    brandTerms: []
                                })
                        }["BookingWizard.useEffect"]);
                    }
                }["BookingWizard.useEffect"]);
                return;
            }
            const guard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ps$2d$brief$2d$guard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkBriefGuard"])(data.brief);
            queueMicrotask({
                "BookingWizard.useEffect": ()=>{
                    setBriefGuard(guard);
                    if (guard.flagged && guard.type !== 'INSPIRATION') {
                        setData({
                            "BookingWizard.useEffect": (d)=>({
                                    ...d,
                                    brandTerms: guard.terms
                                })
                        }["BookingWizard.useEffect"]);
                    } else {
                        setData({
                            "BookingWizard.useEffect": (d)=>({
                                    ...d,
                                    brandTerms: []
                                })
                        }["BookingWizard.useEffect"]);
                    }
                }
            }["BookingWizard.useEffect"]);
        }
    }["BookingWizard.useEffect"], [
        data.brief,
        step
    ]);
    // Fetch available slots when entering step 3 with In-Person selected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingWizard.useEffect": ()=>{
            if (step !== 2 || data.tier !== 'IN_PERSON_FITTING') return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$be7192__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPSAvailableSlots"])({
                from: new Date().toISOString().slice(0, 10),
                days: 14,
                mode: 'IN_PERSON_FITTING'
            }).then(setSlots).catch({
                "BookingWizard.useEffect": ()=>setSlots([])
            }["BookingWizard.useEffect"]);
        }
    }["BookingWizard.useEffect"], [
        step,
        data.tier
    ]);
    // Hold countdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingWizard.useEffect": ()=>{
            if (step !== 3 || !heldUntil) return;
            const interval = setInterval({
                "BookingWizard.useEffect.interval": ()=>{
                    const left = Math.floor((heldUntil - Date.now()) / 1000);
                    if (left <= 0) {
                        clearInterval(interval);
                        setHeldUntil(null);
                        setStep(2);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Your slot hold expired. Please pick a new time.');
                    }
                }
            }["BookingWizard.useEffect.interval"], 1000);
            return ({
                "BookingWizard.useEffect": ()=>clearInterval(interval)
            })["BookingWizard.useEffect"];
        }
    }["BookingWizard.useEffect"], [
        step,
        heldUntil
    ]);
    const validateStep = (s)=>{
        const e = {};
        if (s === 0) {
            if (data.customerName.trim().length < 2) e.customerName = 'Please enter your name';
            if (data.customerPhone.replace(/\D/g, '').length < 10) e.customerPhone = 'Please enter a valid phone number';
        }
        if (s === 1) {
            if (data.brief.trim().length < 10) e.brief = 'Please tell us what you need';
            if (data.categories.length === 0) e.categories = 'Pick at least one category';
        }
        if (s === 2) {
            if (data.tier === 'DELIVERED' && data.area.trim().length < 2) e.area = 'Please enter your area';
            if (data.tier === 'IN_PERSON_FITTING') {
                if (!data.fitDate) e.fitDate = 'Please pick a date';
                if (!data.fitTime) e.fitTime = 'Please pick a time';
            }
            if (data.tier === 'IN_PERSON_FITTING' && data.brandTerms.length > 0 && data.brandChoice !== 'CONTINUED_ACK') {
                e.brandChoice = 'Please acknowledge the brand note to continue';
            }
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    const next = async ()=>{
        if (!validateStep(step)) return;
        // When moving from step 2 → step 3 (Service Preference), if In-Person
        // is selected and we have a brand flag, make sure the customer acknowledged
        if (step === 1 && briefGuard?.flagged && briefGuard.type !== 'INSPIRATION' && data.brandChoice !== 'CONTINUED_ACK') {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please acknowledge the brand note before continuing.');
            return;
        }
        setStep((s)=>Math.min(s + 1, 3));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const back = ()=>{
        setErrors({});
        setStep((s)=>Math.max(s - 1, 0));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const pay = async ()=>{
        setSubmitting(true);
        try {
            // 1. Create the request (holds the slot if In-Person)
            const create = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$eebf2d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createPersonalShoppingRequest"])({
                customerName: data.customerName.trim(),
                customerPhone: data.customerPhone.trim(),
                contactVia: data.contactVia,
                shoppingFor: data.shoppingFor,
                tier: data.tier,
                reviewMethod: data.reviewMethod,
                area: data.tier === 'DELIVERED' ? data.area : undefined,
                isLagos: data.isLagos,
                brief: data.brief.trim(),
                categories: data.categories.join(', '),
                colours: data.colours.join(', '),
                budget: data.budget,
                neededBy: data.neededBy || undefined,
                brandTerms: data.brandTerms.length > 0 ? data.brandTerms : undefined,
                brandChoice: data.brandChoice || undefined,
                fitDate: data.tier === 'IN_PERSON_FITTING' ? data.fitDate : undefined,
                fitTime: data.tier === 'IN_PERSON_FITTING' ? data.fitTime : undefined,
                promoCode: data.promoCode || undefined
            });
            if (!create.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(create.error, {
                    duration: 8000
                });
                setSubmitting(false);
                return;
            }
            // 2. Initialize Paystack payment
            const init = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$5f9ccb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["initializePSPayment"])(create.requestId);
            if (!init.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(init.error, {
                    duration: 8000
                });
                setSubmitting(false);
                return;
            }
            // If fee is 0 (free promo code), init returns a mock URL that
            // redirects to the confirmed page
            if (init.authorizationUrl) {
                window.location.href = init.authorizationUrl;
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(e?.message ?? 'Could not start payment. Please try again.', {
                duration: 8000
            });
            setSubmitting(false);
        }
    };
    // ─── Render ─────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 px-6 md:px-10 pt-8",
                "aria-hidden": true,
                children: STEPS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `h-[3px] flex-1 transition-colors duration-500 ${i < step ? 'bg-camel' : i === step ? 'bg-rust' : 'bg-border'}`
                    }, s.num, false, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "flex flex-wrap gap-x-6 gap-y-2 px-6 md:px-10 pt-6 pb-5 border-b border-border text-[12px] uppercase tracking-[0.14em]",
                children: STEPS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: `tabular-nums pb-3 relative ${i === step ? 'text-foreground font-bold' : i < step ? 'text-muted-foreground' : 'text-muted-foreground/60'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono mr-1.5",
                                children: s.num
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            s.label,
                            i === step && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-0 right-0 -bottom-[1px] h-[2px] bg-rust"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 264,
                                columnNumber: 28
                            }, this)
                        ]
                    }, s.num, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 md:px-10 py-10",
                children: [
                    step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2",
                                children: "Your details"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-8",
                                children: "So we can confirm your request and reach you with the shortlist."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid sm:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: [
                                                            "Full name ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-foreground ml-1",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 121
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: inputCls,
                                                        value: data.customerName,
                                                        onChange: (e)=>set({
                                                                customerName: e.target.value
                                                            }),
                                                        placeholder: "e.g. Ngozi Okoro",
                                                        autoComplete: "name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 19
                                                    }, this),
                                                    errors.customerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-700 mt-1.5",
                                                        children: errors.customerName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 43
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 278,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: [
                                                            "Phone number ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-foreground ml-1",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 124
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: inputCls,
                                                        value: data.customerPhone,
                                                        onChange: (e)=>set({
                                                                customerPhone: e.target.value
                                                            }),
                                                        placeholder: "e.g. 0803 123 4567",
                                                        inputMode: "tel",
                                                        autoComplete: "tel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 19
                                                    }, this),
                                                    errors.customerPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-700 mt-1.5",
                                                        children: errors.customerPhone
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Shopping for"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: inputCls,
                                                value: data.shoppingFor,
                                                onChange: (e)=>set({
                                                        shoppingFor: e.target.value
                                                    }),
                                                placeholder: "Myself, or e.g. Femi (Husband)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Preferred contact method"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    'Call',
                                                    'WhatsApp',
                                                    'Email'
                                                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>set({
                                                                contactVia: m
                                                            }),
                                                        className: `px-5 py-3 text-sm border transition-colors ${data.contactVia === m ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`,
                                                        children: m
                                                    }, m, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2",
                                children: "The brief"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-8",
                                children: "Tell us what you need. The more detail you give, the better the shortlist."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: [
                                                    "What are you looking for? ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground ml-1",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 135
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                className: `${inputCls} min-h-[100px] resize-y py-3`,
                                                value: data.brief,
                                                onChange: (e)=>set({
                                                        brief: e.target.value
                                                    }),
                                                placeholder: "e.g. Slim fit office wear. Shirt L, waist 34. Needs to work for boardroom and travel."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 316,
                                                columnNumber: 17
                                            }, this),
                                            errors.brief && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-700 mt-1.5",
                                                children: errors.brief
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 319,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this),
                                    briefGuard?.flagged && briefGuard.type !== 'INSPIRATION' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-amber-50 border border-camel px-5 py-4 text-sm leading-relaxed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    className: "h-5 w-5 flex-shrink-0 mt-0.5 text-camel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium text-foreground mb-2",
                                                            children: [
                                                                briefGuard.type === 'BRAND' && 'You mentioned specific brands or exact items.',
                                                                briefGuard.type === 'EXACT' && 'You asked for an exact item match.',
                                                                briefGuard.type === 'LINK' && 'You included a link.'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-muted-foreground mb-3",
                                                            children: [
                                                                "Personal Shopping matches by style, colour, fit and category — not by brand. If you need a specific brand or exact item, that is ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Premium Sourcing"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 335,
                                                                    columnNumber: 77
                                                                }, this),
                                                                "(coming soon). You can continue and we will match the look, or join the waitlist for Premium Sourcing."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground mb-2",
                                                            children: [
                                                                "Detected: ",
                                                                briefGuard.terms.join(', ')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>set({
                                                                            brandChoice: 'CONTINUED_ACK'
                                                                        }),
                                                                    className: `px-4 py-2 text-xs border transition-colors ${data.brandChoice === 'CONTINUED_ACK' ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`,
                                                                    children: "Continue with Personal Shopping"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>set({
                                                                            brandChoice: 'WAITLIST'
                                                                        }),
                                                                    className: `px-4 py-2 text-xs border transition-colors ${data.brandChoice === 'WAITLIST' ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-secondary'}`,
                                                                    children: "Join the Premium Sourcing waitlist"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 23
                                                        }, this),
                                                        errors.brandChoice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-red-700 mt-2",
                                                            children: errors.brandChoice
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 46
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                            lineNumber: 325,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 324,
                                        columnNumber: 17
                                    }, this),
                                    briefGuard?.flagged && briefGuard.type === 'INSPIRATION' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-secondary/40 border-l-4 border-camel px-4 py-3 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Note:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, this),
                                            " We match by style and vibe, not by brand. Tell us more about the look and we will find something similar."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 357,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: [
                                                    "Categories ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground ml-1",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 120
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 364,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: CATEGORIES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>set({
                                                                categories: data.categories.includes(c) ? data.categories.filter((x)=>x !== c) : [
                                                                    ...data.categories,
                                                                    c
                                                                ]
                                                            }),
                                                        className: `px-4 py-2 text-sm border transition-colors ${data.categories.includes(c) ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`,
                                                        children: c
                                                    }, c, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this),
                                            errors.categories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-700 mt-1.5",
                                                children: errors.categories
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 374,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Colours"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: COLOURS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>set({
                                                                colours: data.colours.includes(c) ? data.colours.filter((x)=>x !== c) : [
                                                                    ...data.colours,
                                                                    c
                                                                ]
                                                            }),
                                                        className: `px-4 py-2 text-sm border transition-colors ${data.colours.includes(c) ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`,
                                                        children: c
                                                    }, c, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid sm:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: "Budget range"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: `${inputCls} h-12`,
                                                        value: data.budget,
                                                        onChange: (e)=>set({
                                                                budget: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Select a range"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 21
                                                            }, this),
                                                            BUDGETS.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    children: b
                                                                }, b, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 395,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: "Sizes (top / bottom / shoe)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: inputCls,
                                                        value: data.sizes,
                                                        onChange: (e)=>set({
                                                                sizes: e.target.value
                                                            }),
                                                        placeholder: "e.g. L / 34 / 43"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid sm:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: "Fit preference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: `${inputCls} h-12`,
                                                        value: data.fit,
                                                        onChange: (e)=>set({
                                                                fit: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Select fit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 21
                                                            }, this),
                                                            FITS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    children: f
                                                                }, f, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 409,
                                                                    columnNumber: 38
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 407,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 405,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: "Main occasion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: `${inputCls} h-12`,
                                                        value: data.occasion,
                                                        onChange: (e)=>set({
                                                                occasion: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Select occasion"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 21
                                                            }, this),
                                                            OCCASIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    children: o
                                                                }, o, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 416,
                                                                    columnNumber: 43
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 414,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 404,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this),
                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2",
                                children: "Service preference"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-8",
                                children: "Choose how you want to receive your shortlist."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 428,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Delivered or In-Person Fitting"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 431,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: [
                                                    {
                                                        value: 'DELIVERED',
                                                        label: 'Delivered',
                                                        desc: '₦45,000'
                                                    },
                                                    {
                                                        value: 'IN_PERSON_FITTING',
                                                        label: 'In-Person Fitting',
                                                        desc: '₦50,000 (60 min included)'
                                                    }
                                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>set({
                                                                tier: t.value
                                                            }),
                                                        className: `text-left p-4 border-1.5 transition-colors ${data.tier === t.value ? 'border-rust bg-rust/5' : 'border-border hover:border-foreground'}`,
                                                        style: {
                                                            borderWidth: '1.5px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold",
                                                                children: t.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: t.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, t.value, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "How do you want to review the shortlist?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: `${inputCls} h-12`,
                                                value: data.reviewMethod,
                                                onChange: (e)=>set({
                                                        reviewMethod: e.target.value
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ONLINE",
                                                        children: "Online — you get a link to a page with photos and prices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "WHATSAPP",
                                                        children: "WhatsApp — stylist sends the list as a message"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 19
                                                    }, this),
                                                    data.tier === 'IN_PERSON_FITTING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ONSITE",
                                                        children: "On-site at the fitting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 57
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, this),
                                    data.tier === 'DELIVERED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid sm:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                            children: [
                                                                "Area ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-foreground ml-1",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 460,
                                                                    columnNumber: 120
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 460,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: inputCls,
                                                            value: data.area,
                                                            onChange: (e)=>set({
                                                                    area: e.target.value
                                                                }),
                                                            placeholder: "e.g. Lekki Phase 1, Ikeja GRA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 461,
                                                            columnNumber: 23
                                                        }, this),
                                                        errors.area && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-red-700 mt-1.5",
                                                            children: errors.area
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 39
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                            children: "Is this in Lagos?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: `${inputCls} h-12`,
                                                            value: data.isLagos ? '1' : '0',
                                                            onChange: (e)=>set({
                                                                    isLagos: e.target.value === '1'
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "1",
                                                                    children: "Yes, Lagos"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "0",
                                                                    children: "No, outside Lagos"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                    lineNumber: 468,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                            lineNumber: 466,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 464,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                            lineNumber: 458,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false),
                                    data.tier === 'IN_PERSON_FITTING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: [
                                                            "Pick a fitting date ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-foreground ml-1",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 133
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 21
                                                    }, this),
                                                    slots.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: "Loading available slots…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 overflow-x-auto pb-2",
                                                        children: Array.from(new Set(slots.map((s)=>s.date))).map((date)=>{
                                                            const d = new Date(date);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                disabled: d.getDay() === 0,
                                                                onClick: ()=>set({
                                                                        fitDate: date,
                                                                        fitTime: ''
                                                                    }),
                                                                className: `flex-shrink-0 w-[68px] py-3 border text-center ${data.fitDate === date ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-[11px] uppercase",
                                                                        children: d.toLocaleString('en', {
                                                                            weekday: 'short'
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-xl font-display mt-1",
                                                                        children: d.getDate()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-[11px] uppercase",
                                                                        children: d.toLocaleString('en', {
                                                                            month: 'short'
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, date, true, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 23
                                                    }, this),
                                                    errors.fitDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-700 mt-1.5",
                                                        children: errors.fitDate
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 40
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 477,
                                                columnNumber: 19
                                            }, this),
                                            data.fitDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                        children: "Available times"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: slots.filter((s)=>s.date === data.fitDate).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>set({
                                                                        fitTime: s.time
                                                                    }),
                                                                className: `min-w-[120px] py-3 px-4 border text-sm text-center ${data.fitTime === s.time ? 'bg-olive text-white border-olive' : 'border-foreground hover:bg-foreground hover:text-background'}`,
                                                                children: s.time
                                                            }, s.time, false, {
                                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 23
                                                    }, this),
                                                    errors.fitTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-700 mt-1.5",
                                                        children: errors.fitTime
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 42
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 500,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Needed by (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 518,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                className: inputCls,
                                                value: data.neededBy,
                                                min: new Date().toISOString().slice(0, 10),
                                                onChange: (e)=>set({
                                                        neededBy: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 519,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 517,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2",
                                                children: "Promo code (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: inputCls,
                                                value: data.promoCode,
                                                onChange: (e)=>set({
                                                        promoCode: e.target.value.toUpperCase()
                                                    }),
                                                placeholder: "e.g. WELCOME10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 426,
                        columnNumber: 11
                    }, this),
                    step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-2xl md:text-3xl tracking-[-0.01em] mb-2",
                                children: "Confirm and pay"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-6",
                                children: "Pay the sourcing fee to start. Items are paid only when you approve them."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "border-t border-border",
                                children: [
                                    [
                                        [
                                            'Service',
                                            'Personal Shopping'
                                        ],
                                        [
                                            'For',
                                            data.shoppingFor
                                        ],
                                        [
                                            'Type',
                                            data.tier === 'DELIVERED' ? 'Delivered' : 'In-Person Fitting'
                                        ],
                                        [
                                            'Brief',
                                            data.brief.slice(0, 120) + (data.brief.length > 120 ? '…' : '')
                                        ],
                                        [
                                            'Categories',
                                            data.categories.join(', ')
                                        ],
                                        [
                                            'Colours',
                                            data.colours.join(', ') || '—'
                                        ],
                                        [
                                            'Budget',
                                            data.budget || '—'
                                        ],
                                        data.tier === 'DELIVERED' ? [
                                            'Area',
                                            data.area
                                        ] : [
                                            'Fitting',
                                            `${data.fitDate}, ${data.fitTime}`
                                        ],
                                        [
                                            'Contact',
                                            `${data.customerPhone} · ${data.contactVia}`
                                        ]
                                    ].map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 border-b border-border/60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: "text-sm text-foreground",
                                                    children: value
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                            lineNumber: 547,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-5 border-b-2 border-foreground bg-secondary/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[11px] uppercase tracking-[0.18em] text-foreground pt-0.5 font-semibold",
                                                children: "Sourcing fee due now"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "font-mono text-2xl text-rust font-bold tabular-nums",
                                                children: [
                                                    "₦",
                                                    data.tier === 'DELIVERED' ? '45,000' : '50,000'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                                lineNumber: 554,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                        lineNumber: 552,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 bg-secondary/40 border-l-4 border-camel px-5 py-4 text-sm leading-relaxed",
                                style: {
                                    borderLeftWidth: '3px'
                                },
                                children: [
                                    "The sourcing fee covers finding and shortlisting your items. You only pay for the items you choose to keep. ",
                                    data.tier === 'IN_PERSON_FITTING' && 'Extra fitting time beyond 60 minutes is ₦5,000 per started 30 minutes.'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 md:px-10 py-6 border-t border-border bg-secondary/40",
                children: [
                    step > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: back,
                        disabled: submitting,
                        className: "inline-flex items-center gap-2 border border-border px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:border-foreground transition-colors disabled:opacity-50",
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 574,
                        columnNumber: 13
                    }, this),
                    step < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: next,
                        className: "group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors",
                        children: [
                            "Continue ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                lineNumber: 578,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 576,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: pay,
                        disabled: submitting,
                        className: "inline-flex items-center gap-3 bg-rust text-rust-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-rust/90 transition-colors disabled:opacity-60",
                        children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                    lineNumber: 583,
                                    columnNumber: 29
                                }, this),
                                " Starting payment…"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Pay sourcing fee & book ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                                    lineNumber: 583,
                                    columnNumber: 123
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                        lineNumber: 581,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/services/personal-shopping/book/booking-wizard.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
_s(BookingWizard, "1avwfr14726TYm/+3Dk1UhfuPvc=");
_c = BookingWizard;
var _c;
__turbopack_context__.k.register(_c, "BookingWizard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_88056b57._.js.map