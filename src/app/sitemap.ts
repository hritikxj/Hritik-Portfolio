import type { MetadataRoute } from "next";

const routes = ["", "/purr-pantry", "/dove", "/dash", "/nothing", "/social-media-creatives"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://hritikjasnani.vercel.app${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
