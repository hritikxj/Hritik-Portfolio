import type { Metadata } from "next";

const title = "Purr Pantry — Brand Identity";
const description = "A premium cat-food identity balancing veterinary credibility with the warmth of a home-cooked meal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/purr-pantry" },
  openGraph: {
    title,
    description,
    url: "/purr-pantry",
    images: [{ url: "/Purthumbnail.jpg", alt: "Purr Pantry brand identity" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/Purthumbnail.jpg"] },
};

export default function PurrPantryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
