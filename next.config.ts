import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-*.space-z.ai",
    "*.space-z.ai",
    "*.fcapp.run",
    "localhost",
    "localhost:3000",
  ],
  serverActions: {
    allowedOrigins: [
      "preview-*.space-z.ai",
      "*.space-z.ai",
      "*.fcapp.run",
      "localhost:3000",
    ],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "z-ai-cloud.oss-cn-hangzhou.aliyuncs.com" },
      { protocol: "https", hostname: "z-cdn.chatglm.cn" },
      { protocol: "https", hostname: "dpvkzrtxnoccprryerds.supabase.co" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/style-consultation",
        destination: "/services/wardrobe-consultation",
        permanent: true,
      },
      {
        source: "/services/style-wardrobe-consultation",
        destination: "/services/wardrobe-consultation",
        permanent: true,
      },
      {
        source: "/services/distinguished-sourcing",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
