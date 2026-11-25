

import Image from '@/components/PortfolioImage';
import ProjectNav from '@/components/ProjectNav';
import ProjectFooter from '@/components/ProjectFooter';
import ProjectIntro from '@/components/ProjectIntro';
import ProjectSummary from '@/components/ProjectSummary';

interface SectionProps {
  title: string;
  images: { src: string; alt: string; aspect: string }[];
  columns?: string;
}

function CreativeSection({ title, images, columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" }: SectionProps) {
  const mobileColumns = Number(columns.match(/(?:^|\s)grid-cols-(\d)/)?.[1] ?? 1);
  const smallColumns = Number(columns.match(/sm:grid-cols-(\d)/)?.[1] ?? mobileColumns);
  const desktopColumns = Number(columns.match(/md:grid-cols-(\d)/)?.[1] ?? smallColumns);
  const sizes = `(max-width: 639px) calc((100vw - ${40 + (mobileColumns - 1) * 24}px) / ${mobileColumns}), (max-width: 767px) calc((100vw - ${40 + (smallColumns - 1) * 24}px) / ${smallColumns}), (max-width: 1279px) calc((100vw - ${96 + (desktopColumns - 1) * 32}px) / ${desktopColumns}), ${Math.ceil((1200 - (desktopColumns - 1) * 32) / desktopColumns)}px`;
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className={`type-h2 text-ink`}>
          {title}
        </h2>
      </div>

      <div className={`grid ${columns} gap-6 md:gap-8`}>
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-border-subtle bg-parchment relative ${img.aspect}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={sizes}
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
  const appleImages = [
    { src: "/social/apple_1.webp", alt: "Apple Social Creative 1", aspect: "aspect-[4/5]" },
    { src: "/social/apple_2.webp", alt: "Apple Social Creative 2", aspect: "aspect-[4/5]" },
    { src: "/social/apple_3.webp", alt: "Apple Social Creative 3", aspect: "aspect-[4/5]" },
    { src: "/social/apple_4.webp", alt: "Apple Social Creative 4", aspect: "aspect-[4/5]" },
    { src: "/social/apple_5.webp", alt: "Apple Social Creative 5", aspect: "aspect-[4/5]" },
    { src: "/social/apple_6.webp", alt: "Apple Social Creative 6", aspect: "aspect-[4/5]" },
  ];

  const dotNewsImages = [
    { src: "/social/dotnews_1.webp", alt: "Dot News Slide 1", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_2.webp", alt: "Dot News Slide 2", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_3.webp", alt: "Dot News Slide 3", aspect: "aspect-[4/5]" },
    { src: "/social/dotnews_4.webp", alt: "Dot News Slide 4", aspect: "aspect-[4/5]" },
  ];

  const thruImages = [
    { src: "/social/thru_1.webp", alt: "Thru Post 1", aspect: "aspect-[4/5]" },
    { src: "/social/thru_2.webp", alt: "Thru Post 2", aspect: "aspect-[4/5]" },
    { src: "/social/thru_3.webp", alt: "Thru Post 3", aspect: "aspect-[4/5]" },
  ];

  const malabarImages = [
    { src: "/social/malabar_1.webp", alt: "Malabar Post 1", aspect: "aspect-[4/5]" },
    { src: "/social/malabar_2.webp", alt: "Malabar Post 2", aspect: "aspect-[4/5]" },
    { src: "/social/malabar_3.webp", alt: "Malabar Post 3", aspect: "aspect-[4/5]" },
  ];

  const blumelifeImages = [
    { src: "/social/blumelife_1.webp", alt: "Blumelife Ad 1", aspect: "aspect-square" },
    { src: "/social/blumelife_2.webp", alt: "Blumelife Ad 2", aspect: "aspect-square" },
    { src: "/social/blumelife_3.webp", alt: "Blumelife Ad 3", aspect: "aspect-square" },
  ];

  const vivoraImages = [
    { src: "/social/vivora_1.webp", alt: "Vivora Event Poster 1", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_2.webp", alt: "Vivora Event Poster 2", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_3.webp", alt: "Vivora Event Poster 3", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_4.webp", alt: "Vivora Event Poster 4", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_5.webp", alt: "Vivora Event Poster 5", aspect: "aspect-[4/5]" },
    { src: "/social/vivora_6.webp", alt: "Vivora Event Poster 6", aspect: "aspect-[4/5]" },
  ];

  return (
    <div className={`min-h-screen bg-off-white text-ink font-body `}>
      <ProjectNav />

      {/* Hero Section */}
      <header id="main-content" tabIndex={-1} className="page-container page-enter pt-8 md:pt-10 pb-4 flex flex-col items-start text-left">
        <ProjectIntro
          eyebrow="Social · Campaigns"
          title="Social Media Creatives"
          lede="Social creatives across six brand sets, covering product launches, retail offers and event posters."
          accent="var(--color-smoke)"
          muted="var(--color-smoke)"
        />
        <ProjectSummary link="/social-media-creatives" className="mb-10 md:mb-14" />
      </header>

      <main className="page-container">
        

        {/* 01 // Apple */}
        <CreativeSection
          title="Apple Social Media Creatives"
          images={appleImages}
          columns="grid-cols-2 md:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-border-subtle my-10 max-w-7xl mx-auto" />

        {/* 02 // Dot News */}
        <CreativeSection
          title="Carousels For Dot News"
          images={dotNewsImages}
          columns="grid-cols-2 md:grid-cols-4"
        />

        <hr className="border-t-[0.5px] border-border-subtle my-10 max-w-7xl mx-auto" />

        {/* 03 // Thru */}
        <CreativeSection
          title="Carousels For Thru"
          images={thruImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-border-subtle my-10 max-w-7xl mx-auto" />

        {/* 04 // Malabar */}
        <CreativeSection
          title="Static Posts For Malabar"
          images={malabarImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-border-subtle my-10 max-w-7xl mx-auto" />

        {/* 05 // Blumelife */}
        <CreativeSection
          title="Static Meta Ads For Blumelife"
          images={blumelifeImages}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <hr className="border-t-[0.5px] border-border-subtle my-10 max-w-7xl mx-auto" />

        {/* 06 // Vivora Events */}
        <CreativeSection
          title="Posters For Vivora Events"
          images={vivoraImages}
          columns="grid-cols-2 md:grid-cols-3"
        />

      </main>

      <ProjectFooter current="/social-media-creatives" />
    </div>
  );
}
