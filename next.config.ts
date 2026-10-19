import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const groups = [
      ['apple', 6], ['blumelife', 3], ['dotnews', 4],
      ['malabar', 3], ['thru', 3], ['vivora', 6],
    ] as const;
    return [
      { source: '/intro2-scrub.mp4', destination: '/intro-desktop.mp4' },
      ...groups.flatMap(([name, count]) => Array.from({ length: count }, (_, index) => ({
        source: `/social/${name}_${index + 1}.png`,
        destination: `/social/${name}_${index + 1}.webp`,
      }))),
    ];
  },
  images: {
    deviceSizes: [320, 384, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    minimumCacheTTL: 86400,
    qualities: [65, 75],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; media-src 'self' blob:; connect-src 'self' https://vitals.vercel-insights.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'" },
        ],
      },
      {
        source: '/:path*\\.(mp4|webp|jpg|png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
