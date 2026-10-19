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
  weight: ["300", "400"],
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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Hritik Jasnani — Multidisciplinary Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Jasnani — Multidisciplinary Designer",
    description: "Brand identity, illustration, and digital experiences designed in India for clients worldwide.",
    images: ["/opengraph-image"],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Person', '@id': 'https://hritikjasnani.vercel.app/#person', name: 'Hritik Jasnani', jobTitle: 'Multidisciplinary designer', url: 'https://hritikjasnani.vercel.app', sameAs: ['https://instagram.com/hritikjasnani'] },
            { '@type': 'WebSite', '@id': 'https://hritikjasnani.vercel.app/#website', name: 'Hritik Jasnani — Portfolio', url: 'https://hritikjasnani.vercel.app', author: { '@id': 'https://hritikjasnani.vercel.app/#person' } },
          ],
        }).replace(/</g, '\\u003c') }} />
        <HireMeProvider>{children}</HireMeProvider>
        {process.env.VERCEL === '1' && <SpeedInsights />}
      </body>
    </html>
  );
}
