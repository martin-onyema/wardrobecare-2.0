const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

const newSubs = [
  // CLOTHING
  { parent: 'clothing', slug: 'suits', name: 'Suits', order: 1 },
  { parent: 'clothing', slug: 'blazers', name: 'Blazers', order: 2 },
  { parent: 'clothing', slug: 'jackets', name: 'Jackets', order: 3 },
  { parent: 'clothing', slug: 'tuxedo-dinner-jacket', name: 'Tuxedo / Dinner Jacket', order: 4 },
  { parent: 'clothing', slug: 'waistcoat-vest', name: 'Waistcoat & Vest', order: 5 },
  { parent: 'clothing', slug: 'dress-shirts', name: 'Dress Shirts', order: 6 },
  { parent: 'clothing', slug: 'casual-shirts', name: 'Casual Shirts', order: 7 },
  { parent: 'clothing', slug: 'polo-shirts', name: 'Polo Shirts', order: 8 },
  { parent: 'clothing', slug: 't-shirts', name: 'T-Shirts', order: 9 },
  { parent: 'clothing', slug: 'long-sleeve-sweatshirts', name: 'Long Sleeve / Sweatshirts', order: 10 },
  { parent: 'clothing', slug: 'sweaters-cardigan', name: 'Sweaters / Cardigan', order: 11 },
  { parent: 'clothing', slug: 'hoodies-sweatshirts', name: 'Hoodies', order: 12 },
  // BOTTOMS
  { parent: 'bottoms', slug: 'formal-trousers', name: 'Formal Trousers', order: 1 },
  { parent: 'bottoms', slug: 'chinos', name: 'Chinos Trousers', order: 2 },
  { parent: 'bottoms', slug: 'casual-trousers', name: 'Casual Trousers', order: 3 },
  { parent: 'bottoms', slug: 'jeans', name: 'Jeans Trousers', order: 4 },
  { parent: 'bottoms', slug: 'joggers', name: 'Joggers', order: 5 },
  { parent: 'bottoms', slug: 'shorts', name: 'Shorts', order: 6 },
  // FOOTWEAR
  { parent: 'footwear', slug: 'dress-shoes', name: 'Dress Shoes', order: 1 },
  { parent: 'footwear', slug: 'casual-shoes', name: 'Casual Shoes', order: 2 },
  { parent: 'footwear', slug: 'exotic-shoes', name: 'Exotic Shoes', order: 3 },
  { parent: 'footwear', slug: 'loafers', name: 'Loafers', order: 4 },
  { parent: 'footwear', slug: 'sneakers', name: 'Sneakers', order: 5 },
  { parent: 'footwear', slug: 'slippers', name: 'Slippers', order: 6 },
  { parent: 'footwear', slug: 'slide', name: 'Slide', order: 7 },
  // ACCESSORIES
  { parent: 'accessories', slug: 'belts', name: 'Belts', order: 1 },
  { parent: 'accessories', slug: 'wallets-purses', name: 'Wallets', order: 2 },
  { parent: 'accessories', slug: 'ties', name: 'Ties', order: 3 },
  { parent: 'accessories', slug: 'pocket-squares', name: 'Pocket Squares', order: 4 },
  { parent: 'accessories', slug: 'suspenders', name: 'Suspenders', order: 5 },
  { parent: 'accessories', slug: 'cufflinks', name: 'Cufflinks', order: 6 },
  { parent: 'accessories', slug: 'wrist-watches', name: 'Wrist Watches', order: 7 },
  { parent: 'accessories', slug: 'caps-hats', name: 'Caps & Hats', order: 8 },
  { parent: 'accessories', slug: 'sunglasses-frames', name: 'Sunglasses & Frames', order: 9 },
  { parent: 'accessories', slug: 'socks', name: 'Socks', order: 10 },
  // ESSENTIALS
  { parent: 'essentials', slug: 'boxers-shorts', name: 'Boxers Shorts', order: 1 },
  { parent: 'essentials', slug: 'boxers-brief', name: 'Boxers Brief', order: 2 },
  { parent: 'essentials', slug: 'underwear-tshirts', name: 'Underwear T-Shirts', order: 3 },
  { parent: 'essentials', slug: 'singlets', name: 'Singlets', order: 4 },
  { parent: 'essentials', slug: 'grooming-kits', name: 'Grooming Kits', order: 5 },
  // FRAGRANCE
  { parent: 'fragrance-grooming', slug: 'mens-fragrance', name: 'Men', order: 1 },
  { parent: 'fragrance-grooming', slug: 'womens-fragrance', name: 'Women', order: 2 },
  { parent: 'fragrance-grooming', slug: 'unisex-fragrance', name: 'Unisex', order: 3 },
  { parent: 'fragrance-grooming', slug: 'body-care', name: 'Body Care', order: 4 },
  { parent: 'fragrance-grooming', slug: 'home-fragrance', name: 'Home Fragrance', order: 5 },
];

async function main() {
  let created = 0, updated = 0;
  for (const sub of newSubs) {
    const parent = await p.category.findUnique({ where: { slug: sub.parent } });
    if (!parent) { console.log('⚠ Parent not found:', sub.parent); continue; }
    const existing = await p.category.findUnique({ where: { slug: sub.slug } });
    if (existing) {
      await p.category.update({ where: { slug: sub.slug }, data: { name: sub.name, order: sub.order, parentId: parent.id } });
      updated++;
    } else {
      await p.category.create({ data: { slug: sub.slug, name: sub.name, order: sub.order, parentId: parent.id } });
      created++;
    }
  }
  console.log('✅ Created:', created, '| Updated:', updated);
  // Show final
  const parents = await p.category.findMany({ where: { parentId: null }, orderBy: { name: 'asc' } });
  for (const parent of parents) {
    const subs = await p.category.findMany({ where: { parentId: parent.id }, select: { slug: true, name: true, order: true }, orderBy: { order: 'asc' } });
    console.log('\n' + parent.name + ':');
    subs.forEach(s => console.log('  [' + s.order + '] ' + s.slug + ' → ' + s.name));
  }
}
main().catch(e => console.error('❌', e.message)).finally(() => p.$disconnect());
