import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import HireMeProvider from "@/components/HireMeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hritikjasnani.vercel.app"),
  title: {
    default: "Hritik Jasnani — Multidisciplinary Designer",
    template: "%s | Hritik Jasnani",
  },
  description: "Multidisciplinary designer based in India, working globally across brand identity, illustration, and digital experiences.",
  keywords: ["Hritik Jasnani", "brand identity", "graphic design", "illustration", "UI/UX design", "India"],
  authors: [{ name: "Hritik Jasnani" }],
  creator: "Hritik Jasnani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hritik Jasnani — Multidisciplinary Designer",
    description: "Brand identity, illustration, and digital experiences designed in India for clients worldwide.",
    url: "/",
    siteName: "Hritik Jasnani",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/portfolio-preview.png", width: 1440, height: 1050, alt: "Hritik Jasnani portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Jasnani — Multidisciplinary Designer",
    description: "Brand identity, illustration, and digital experiences designed in India for clients worldwide.",
    images: ["/portfolio-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable}`}
    >
      <body>
        <HireMeProvider>{children}</HireMeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
