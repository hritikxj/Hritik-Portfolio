'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cormorant_Garamond, Jost } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

interface SectionProps {
  title: string;
  images: { src: string; alt: string; aspect: string }[];
  columns?: string;
}

function CreativeSection({ title, images, columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" }: SectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className={`${cormorant.className} text-3xl md:text-4xl text-[#1A1A1A] font-light leading-tight`}>
          {title}
        </h2>
      </div>

      <div className={`grid ${columns} gap-6 md:gap-8`}>
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#E5E0D5]/60 bg-white relative ${img.aspect}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SocialMediaCreativesPage() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const appleImages = [
    { src: "/social/apple_1.png", alt: "Apple Social Creative 1", aspect: "aspect-[4/5]" },
    { src: "/social/apple_2.png", alt: "Apple Social Creative 2", aspect: "aspect-[4/5]" },
    { src: "/social/apple_3.png", alt: "Apple Social Creative 3", aspect: "aspect-[4/5]" },
    { src: "/social/apple_4.png", alt: "Apple Social Creative 4", aspect: "aspect-[4/5]" },
    { src: "/social/apple_5.png", alt: "Apple Social Creative 5", aspect: "aspect-[4/5]" },
    { src: "/social/apple_6.png", alt: "Apple Social Creative 6", aspect: "aspect-[4/5]" },
  ];

  const dotNewsImages = [
    { src: "/social/dotnews_1.png", alt: "Dot News Slide 1", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_2.png", alt: "Dot News Slide 2", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_3.png", alt: "Dot News Slide 3", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_4.png", alt: "Dot News Slide 4", aspect: "aspect-[4/5]" },
  ];

  const thruImages = [
    { src: "/social/thru_1.png", alt: "Thru Post 1", aspect: "aspect-[4/5]" },
    { src: "/social/thru_2.png", alt: "Thru Post 2", aspect: "aspect-[4/5]" },
    { src: "/social/thru_3.png", alt: "Thru Post 3", aspect: "aspect-[4/5]" },
  ];

  const malabarImages = [
    { src: "/social/malabar_1.png", alt: "Malabar Post 1", aspect: "aspect-[4/5]" },
    { src: "/social/malabar_2.png", alt: "Malabar Post 2", aspect: "aspect-[4/5]" },
    { src: "/social/malabar_3.png", alt: "Malabar Post 3", aspect: "aspect-[4/5]" },
  ];

  const blumelifeImages = [
    { src: "/social/blumelife_1.png", alt: "Blumelife Ad 1", aspect: "aspect-square" },
    { src: "/social/blumelife_2.png", alt: "Blumelife Ad 2", aspect: "aspect-square" },
    { src: "/social/blumelife_3.png", alt: "Blumelife Ad 3", aspect: "aspect-square" },
  ];

  const vivoraImages = [
    { src: "/social/vivora_1.png", alt: "Vivora Event Poster 1", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_2.png", alt: "Vivora Event Poster 2", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_3.png", alt: "Vivora Event Poster 3", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_4.png", alt: "Vivora Event Poster 4", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_5.png", alt: "Vivora Event Poster 5", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_6.png", alt: "Vivora Event Poster 6", aspect: "aspect-[4/5]" },
  ];

  return (
    <div className={`min-h-screen bg-[#FAF9F5] text-[#1A1A1A] ${jost.className} selection:bg-black selection:text-white pb-20`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 lg:px-10 md:py-6 bg-[#FAF9F5]/90 backdrop-blur-sm border-b-[0.5px] border-[#E5E0D5]">
        <Link href="/" onClick={handleBack} className="text-[#1A1A1A] hover:text-smoke transition-colors uppercase tracking-[0.2em] text-xs font-medium no-underline">
          ← Back to Portfolio
        </Link>
        <div className="uppercase tracking-[0.3em] text-[10px] text-smoke font-semibold">
          Social Media Creatives
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-36 px-5 md:px-12 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className={`${cormorant.className} text-5xl md:text-7xl lg:text-[90px] font-light tracking-tight text-[#1A1A1A] mb-6 leading-none`}>
          Social Media Creatives
        </h1>
        <p className={`${cormorant.className} italic text-[#666666] text-xl md:text-2xl max-w-3xl mb-16`}>
          A curated showcase of branding, campaign design, and marketing creatives.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10">
        

        {/* 01 // Apple */}
        <CreativeSection
          title="Apple Social Media Creatives"
          images={appleImages}
          columns="grid-cols-2 md:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* 02 // Dot News */}
        <CreativeSection
          title="Carousels For Dot News"
          images={dotNewsImages}
          columns="grid-cols-2 md:grid-cols-4"
        />

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* 03 // Thru */}
        <CreativeSection
          title="Carousels For Thru"
          images={thruImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* 04 // Malabar */}
        <CreativeSection
          title="Static Posts For Malabar"
          images={malabarImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* 05 // Blumelife */}
        <CreativeSection
          title="Static Meta Ads For Blumelife"
          images={blumelifeImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-[#E5E0D5] my-10 max-w-7xl mx-auto" />

        {/* 06 // Vivora Events */}
        <CreativeSection
          title="Posters For Vivora Events"
          images={vivoraImages}
          columns="grid-cols-2 md:grid-cols-3"
        />

      </main>

      <footer className="text-center mt-40 mb-12 px-5 md:px-12 lg:px-10">
        <p className="text-[11px] tracking-[0.3em] text-[#666666] uppercase">
          © {new Date().getFullYear()} Hritik Jasnani · Social Media Creatives
        </p>
      </footer>
    </div>
  );
}
