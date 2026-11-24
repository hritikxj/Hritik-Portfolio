import type { Metadata } from "next";
import ProjectStructuredData from "@/components/ProjectStructuredData";

const title = "Dash — Brand Identity";
const description = "A fast, energetic identity system for an ultra-fast electronics delivery service.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dash" },
  openGraph: {
    title,
    description,
    url: "/dash",
    images: [{ url: "/case-studies/dash/delivery-cover.webp", alt: "Hands passing a black delivery box with the Dash wordmark" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/case-studies/dash/delivery-cover.webp"] },
};

export default function DashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><ProjectStructuredData title={title} description={description} path="/dash" />{children}</>;
}
