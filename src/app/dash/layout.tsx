import type { Metadata } from "next";

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
    images: [{ url: "/dash/dash-slide-1.png", alt: "Dash brand identity" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/dash/dash-slide-1.png"] },
};

export default function DashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
