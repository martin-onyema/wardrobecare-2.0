import type { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt — generated via Next.js MetadataRoute.
 *
 * Per-user-agent rules preserved from the original static public/robots.txt,
 * plus the sitemap reference and the additional /cart, /track-order,
 * /gift-card/checkout, and booking-flow disallows that the SEO Manager
 * requires.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/account', '/api', '/cart', '/checkout', '/track-order', '/gift-card/checkout'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/account', '/api', '/cart', '/checkout', '/track-order', '/gift-card/checkout'],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/admin', '/account', '/api', '/cart', '/checkout', '/track-order', '/gift-card/checkout'],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/admin', '/account', '/api', '/cart', '/checkout', '/track-order', '/gift-card/checkout'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/account',
          '/api',
          '/cart',
          '/checkout',
          '/track-order',
          '/gift-card/checkout',
          // Booking flows — never crawled
          '/*/book',
        ],
      },
    ],
    sitemap: 'https://wardrobecare.com.ng/sitemap.xml',
  }
}
