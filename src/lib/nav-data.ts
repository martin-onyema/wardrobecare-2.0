/**
 * Shared navigation data for the desktop navbar and mobile menu.
 *
 * Any nav item that carries a `mega` array automatically renders a
 * Services-style dropdown panel (desktop) — see components/layout/navbar.tsx.
 * The mobile menu renders one accordion per `mega` item.
 *
 * Category slugs mirror the Prisma Category tree (parent categories include
 * their children when filtering, so `/shop?category=clothing` shows every
 * subcategory product).
 *
 * Top-level retail items link to their dedicated category hub pages
 * (/<slug>) — editorial landings that organise each sub-menu into its own
 * section (see lib/category-hubs.ts) — while the mega-menu links deep into
 * /shop?category=<slug> for the full filtered grids.
 */

export type MegaLink = { label: string; href: string; emphasized?: boolean }
export type MegaGroup = { label: string; links: MegaLink[] }
export type MegaFooter = { text: string; cta: string; href: string }
export type NavItem = {
  label: string
  href: string
  mega?: MegaGroup[]
  megaFooter?: MegaFooter
  /** Panel edge alignment — use `right` for nav items near the right viewport edge. */
  panelAlign?: 'left' | 'right'
}

/** Clothing + Bottoms + Essentials merged into a single mega-menu, grouped like the desktop navbar. */
export const CLOTHING_MEGA: MegaGroup[] = [
  {
    label: 'Formal Wear',
    links: [
      { label: 'Shop All Clothing', href: '/clothing', emphasized: true },
      { label: 'Suits', href: '/shop?category=suits' },
      { label: 'Blazers', href: '/shop?category=blazers' },
      { label: 'Tuxedo / Dinner Jacket', href: '/shop?category=tuxedo-dinner-jacket' },
      { label: 'Waistcoat & Vest', href: '/shop?category=waistcoat-vest' },
    ],
  },
  {
    label: 'Shirts',
    links: [
      { label: 'Dress Shirts', href: '/shop?category=dress-shirts' },
      { label: 'Casual Shirts', href: '/shop?category=casual-shirts' },
      { label: 'Polo Shirts', href: '/shop?category=polo-shirts' },
      { label: 'T-Shirts', href: '/shop?category=t-shirts' },
    ],
  },
  {
    label: 'Layers',
    links: [
      { label: 'Jackets', href: '/shop?category=jackets' },
      { label: 'Long Sleeve / Sweatshirts', href: '/shop?category=long-sleeve-sweatshirts' },
      { label: 'Sweaters / Cardigan', href: '/shop?category=sweaters-cardigan' },
      { label: 'Hoodies', href: '/shop?category=hoodies-sweatshirts' },
    ],
  },
  {
    label: 'Bottoms',
    links: [
      { label: 'Formal Trousers', href: '/shop?category=formal-trousers' },
      { label: 'Chinos Trousers', href: '/shop?category=chinos' },
      { label: 'Casual Trousers', href: '/shop?category=casual-trousers' },
      { label: 'Jeans Trousers', href: '/shop?category=jeans' },
      { label: 'Joggers', href: '/shop?category=joggers' },
      { label: 'Shorts', href: '/shop?category=shorts' },
    ],
  },
  {
    label: 'Essentials',
    links: [
      { label: 'Boxers Shorts', href: '/shop?category=boxers-shorts' },
      { label: 'Boxers Brief', href: '/shop?category=boxers-brief' },
      { label: 'Underwear T-Shirts', href: '/shop?category=underwear-tshirts' },
      { label: 'Singlets', href: '/shop?category=singlets' },
      { label: 'Grooming Kits', href: '/shop?category=grooming-kits' },
    ],
  },
]

/** Footwear section — one dropdown group. */
export const FOOTWEAR_MEGA: MegaGroup[] = [
  {
    label: 'Shop Footwear',
    links: [
      { label: 'Shop All Footwear', href: '/shop?category=footwear', emphasized: true },
      { label: 'Casual Shoes', href: '/shop?category=casual-shoes' },
      { label: 'Dress Shoes', href: '/shop?category=dress-shoes' },
      { label: 'Exotic Shoes', href: '/shop?category=exotic-shoes' },
      { label: 'Loafers', href: '/shop?category=loafers' },
    ],
  },
]

/** Accessories section — one dropdown group. */
export const ACCESSORIES_MEGA: MegaGroup[] = [
  {
    label: 'Shop Accessories',
    links: [
      { label: 'Shop All Accessories', href: '/shop?category=accessories', emphasized: true },
      { label: 'Belts', href: '/shop?category=belts' },
      { label: 'Caps & Hats', href: '/shop?category=caps-hats' },
      { label: 'Pocket Squares', href: '/shop?category=pocket-squares' },
      { label: 'Socks', href: '/shop?category=socks' },
      { label: 'Sunglasses', href: '/shop?category=sunglasses' },
      { label: 'Ties', href: '/shop?category=ties' },
      { label: 'Wallets & Purses', href: '/shop?category=wallets-purses' },
    ],
  },
]

/** Fragrance & Grooming section — one dropdown group. */
export const FRAGRANCE_MEGA: MegaGroup[] = [
  {
    label: 'Shop Fragrance & Grooming',
    links: [
      {
        label: 'Shop All Fragrance & Grooming',
        href: '/shop?category=fragrance-grooming',
        emphasized: true,
      },
      { label: "Men's Fragrance", href: '/shop?category=mens-fragrance' },
      { label: "Men's Grooming", href: '/shop?category=mens-grooming' },
      { label: "Women's Fragrance", href: '/shop?category=womens-fragrance' },
    ],
  },
]

/** Desktop navbar — items with `mega` render a dropdown automatically. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  {
    label: 'Clothing',
    href: '/clothing',
    mega: CLOTHING_MEGA,
    megaFooter: {
      text: 'Fresh pieces land every week.',
      cta: 'View New Arrivals',
      href: '/shop?sort=newest',
    },
  },
  { label: 'Footwear', href: '/footwear', mega: FOOTWEAR_MEGA },
  {
    label: 'Accessories',
    href: '/accessories',
    mega: ACCESSORIES_MEGA,
    panelAlign: 'right',
  },
  {
    label: 'Fragrance & Grooming',
    href: '/fragrance-grooming',
    mega: FRAGRANCE_MEGA,
    panelAlign: 'right',
  },
  // NOTE: "Digital Closet" intentionally has no top-level desktop nav item —
  // the lg row physically cannot fit a 7th link without pushing the action
  // icons off-screen (verified at 1280px). It is featured inside the Services
  // dropdown panel instead, plus the mobile menu and footer.
]
