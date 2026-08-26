import type { Metadata } from "next";

const title = "Social Media Creatives";
const description = "A curated collection of campaign, content, and social-media design across consumer brands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/social-media-creatives" },
  openGraph: {
    title,
    description,
    url: "/social-media-creatives",
    images: [{ url: "/social_thumb.png", alt: "Social media design collection" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/social_thumb.png"] },
};

export default function SocialMediaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
