import type { Metadata } from "next";

const title = "Nothing Community Edition — UI/UX";
const description = "A minimalist to-do widget concept designed for the Nothing Community Edition software showcase.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nothing" },
  openGraph: {
    title,
    description,
    url: "/nothing",
    images: [{ url: "/nothing/nothing-hero.png", alt: "Nothing Community Edition interface concept" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/nothing/nothing-hero.png"] },
};

export default function NothingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
