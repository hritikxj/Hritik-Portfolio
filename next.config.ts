import type { NextConfig } from "next";
import imageSizes from "./src/lib/portfolio-image-sizes.json";

const nextConfig: NextConfig = {
  async rewrites() {
    const groups = [
      ['apple', 6], ['blumelife', 3], ['dotnews', 4],
      ['malabar', 3], ['thru', 3], ['vivora', 6],
    ] as const;
    return [
      ...groups.flatMap(([name, count]) => Array.from({ length: count }, (_, index) => ({
        source: `/social/${name}_${index + 1}.png`,
        destination: `/social/${name}_${index + 1}.webp`,
      }))),
    ];
  },
  images: {
    deviceSizes: imageSizes.deviceSizes,
    imageSizes: [16, 32, 48, 64, 96, 128, ...imageSizes.imageSizes],
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
        source: '/:path*\\.(webp|jpg|png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/portfolio-images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
