'use client';

import Reveal from './Reveal';
import Image from 'next/image';

export default function Hero() {

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-10 md:pt-14 pb-12 md:pb-14 border-b-[0.5px] border-border-subtle">
      <div className="w-full px-5 md:px-12 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left column — text */}
        <div className="flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-light leading-[1.05] tracking-[-0.01em] mb-6">
              I design brands and<br />experiences people<br />
              <em className="italic text-brand-red">remember.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-smoke leading-[1.8]">
              Multidisciplinary designer Based in India, working globally.
            </p>
          </Reveal>
        </div>

        {/* Right column — image grid, stretches to match left column height */}
        <Reveal delay={0.3} className="h-full">
          <div className="grid grid-cols-2 grid-rows-[1.75fr_1fr] gap-2 md:gap-3 h-[280px] md:h-[320px] lg:h-full">
            <div
              className="row-span-2 rounded overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => scrollTo('work')}
            >
              <Image
                src="/brand_identity_hero_dark.jpg"
                alt="Brand Identity Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
              {/* Subtle dark gradient overlay to ensure text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative z-20">
                <div className="font-display text-2xl md:text-3xl font-light text-off-white leading-[1.1]">Brand<br />Identity</div>
              </div>
            </div>
            <div className="bg-[#E8E2D6] rounded overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer h-full" onClick={() => scrollTo('work')}>
              <Image
                src="/illustration_hero_v3.jpg"
                alt="Illustration Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
              {/* Subtle dark gradient overlay to ensure text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative z-20">
                <div className="font-display text-lg md:text-xl font-light text-off-white leading-[1.1]">Illustration</div>
              </div>
            </div>
            <div className="bg-[#111110] rounded overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => scrollTo('work')}>
              <Image
                src="/uiux_hero_v2.jpg"
                alt="UI/UX Thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
              {/* Subtle dark gradient overlay to ensure text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative z-20">
                <div className="font-display text-lg md:text-xl font-light text-off-white leading-[1.1]">UI/UX</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
