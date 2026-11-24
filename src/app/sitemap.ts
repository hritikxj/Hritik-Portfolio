import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

// Content revision dates, updated with page content rather than on every build.
const routes = [
  { path: '', updated: '2026-11-24' },
  { path: '/purr-pantry', updated: '2026-10-20' },
  { path: '/dove', updated: '2026-10-20' },
  { path: '/dash', updated: '2026-10-20' },
  { path: '/nothing', updated: '2026-10-20' },
  { path: '/social-media-creatives', updated: '2026-08-26' },
  ...caseStudies.map(study => ({ path: `/work/${study.slug}`, updated: '2026-11-24' })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://hritikjasnani.vercel.app${route.path}`,
    lastModified: route.updated,
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
