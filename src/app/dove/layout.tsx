import type { Metadata } from "next";

const title = "Dove #TheRealGrowth — Brand Campaign";
const description = "A campaign concept challenging body-hair stigma in India through choice, care, and authentic representation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dove" },
  openGraph: {
    title,
    description,
    url: "/dove",
    images: [{ url: "/dove_thumb.jpg", alt: "Dove #TheRealGrowth campaign" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/dove_thumb.jpg"] },
};

export default function DoveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
