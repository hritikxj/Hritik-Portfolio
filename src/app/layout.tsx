import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HireMeProvider from "@/components/HireMeProvider";
import RevealObserver from "@/components/RevealObserver";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Switzer by Indian Type Foundry (Fontshare, ITF Free Font License), self-hosted.
// One family for the whole site: headings and text.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../fonts/switzer-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer-700.woff2", weight: "700", style: "normal" },
  ],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

// Runs before first paint: applies a saved light/dark choice and enables
// reveal motion only when JavaScript is available.
// Applies a saved dark choice before paint, and tints the browser toolbar to match.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);if(t==='dark'){var f=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#131413')};f();document.addEventListener('DOMContentLoaded',f)}}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: "#F5F6F3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hritikjasnani.vercel.app"),
  title: {
    default: "Hritik Jasnani, Multidisciplinary Designer",
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
    title: "Hritik Jasnani, Multidisciplinary Designer",
    description: "Brand identity, illustration, and digital experiences designed in India for clients worldwide.",
    url: "/",
    siteName: "Hritik Jasnani",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Hritik Jasnani, Multidisciplinary Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Jasnani, Multidisciplinary Designer",
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
      className={switzer.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Person', '@id': 'https://hritikjasnani.vercel.app/#person', name: 'Hritik Jasnani', jobTitle: 'Multidisciplinary designer', url: 'https://hritikjasnani.vercel.app', sameAs: ['https://instagram.com/hritikjasnani', 'https://www.linkedin.com/in/hritikjasnani/'], alumniOf: { '@type': 'CollegeOrUniversity', name: 'Rishihood University' }, knowsAbout: ['Brand identity', 'Illustration', 'UI/UX design', 'Packaging design', 'App development'] },
            { '@type': 'WebSite', '@id': 'https://hritikjasnani.vercel.app/#website', name: 'Hritik Jasnani, Portfolio', url: 'https://hritikjasnani.vercel.app', author: { '@id': 'https://hritikjasnani.vercel.app/#person' } },
          ],
        }).replace(/</g, '\\u003c') }} />
        <HireMeProvider>{children}</HireMeProvider>
        <RevealObserver />
        {process.env.VERCEL === '1' && <SpeedInsights />}
      </body>
    </html>
  );
}
