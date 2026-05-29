'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

const strategyPillars = [
  {
    num: "01",
    title: "Project Overview",
    subtitle: "Hygiene to Humanity",
    description: "A brand-led advocacy campaign aimed at dismantling the deep-seated stigma surrounding female body hair in India. Shifting the conversation from 'hygiene' to 'humanity,' the campaign validates natural growth as a symbol of health and personal choice rather than a grooming failure."
  },
  {
    num: "02",
    title: "The Social Issue",
    subtitle: "The Parlor-Didi Standard",
    description: "In India, female body hair is socially policed from puberty. The 'parlor-didi' culture enforces a standard of hairlessness, causing severe body anxiety and forcing women to prioritize painful hair removal over skin health and comfort, even in tropical climates."
  },
  {
    num: "03",
    title: "The Human Story",
    subtitle: "Riya's Journey",
    description: "Riya, a 19-year-old art student, wore full sleeves in 40°C heat after a comment about her underarms. Her body transitioned from a source of strength to a 'project' needing constant fixing. The campaign ends with her reclaiming her wardrobe through peer-to-peer validation."
  },
  {
    num: "04",
    title: "Brand Association",
    subtitle: "Why Dove Fits",
    description: "Dove's global 'Real Beauty' platform is built on challenging narrow beauty standards. Its core values of inclusivity, authenticity, and 'care' over 'perfection' make it the ideal parent brand. The nurturing, trusted tone of Dove balances the rebellious nature of the topic."
  },
  {
    num: "05",
    title: "The Campaign Idea",
    subtitle: "Hair is a Choice",
    description: "Dove acts as a mirror to reflect existing beauty and a supporter that validates choice—whether to shave or not to shave. Shifting the mindset from 'flaw' to 'choice' encourages Indian women to stop apologizing for biological realities."
  },
  {
    num: "06",
    title: "Target Audience",
    subtitle: "Gen Z & Millennials",
    description: "Urban and semi-urban Indian women aged 18–35 (college students facing peer pressure and working professionals tired of the 'pre-event' parlor rush). These are women starting to question traditional norms but still fearing social judgment."
  }
];

export default function DoveCampaignPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % strategyPillars.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + strategyPillars.length) % strategyPillars.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className={`min-h-screen bg-[#FDFCF9] text-[#0A2240] ${jost.className} selection:bg-[#C5A059] selection:text-white pb-20`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 lg:px-10 md:py-6 bg-[#FDFCF9]/95 backdrop-blur-sm border-b-[0.5px] border-[#E8E2D6]">
        <a href="/" onClick={handleBack} className="text-[#0A2240] hover:text-[#C5A059] transition-colors uppercase tracking-[0.2em] text-xs font-semibold no-underline">
          ← Back to Portfolio
        </a>
        <div className={`uppercase tracking-[0.3em] text-[10px] text-[#C5A059] ${jost.className} font-semibold`}>
          Brand Campaign
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-36 px-5 md:px-12 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className={`${cormorant.className} text-5xl md:text-7xl lg:text-[90px] font-light tracking-wide text-[#0A2240] mb-6 leading-none`}>
          Dove #TheRealGrowth
        </h1>
        <p className={`${cormorant.className} italic text-[#4B5E7D] text-lg md:text-xl lg:text-2xl max-w-3xl mb-16`}>
          Dismantling body hair stigma in India · Brand Campaign
        </p>
        
        <div className="w-full mb-32 rounded-2xl overflow-hidden shadow-xl border border-[#E8E2D6]/40">
          <Image 
            src="/dove/dove-slide-1.png" 
            alt="Dove Campaign Cover Slide" 
            width={1920}
            height={1080}
            className="w-full h-auto animate-fadeIn"
            priority
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10">
        
        {/* Specs Table */}
        <section className="mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 p-6 sm:p-8 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D6]/40 shadow-sm text-center sm:text-left">
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A059] block mb-1 font-semibold">Role</span>
              <span className="text-sm text-[#0A2240] font-medium font-sans">Brand Strategist</span>
            </div>
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A059] block mb-1 font-semibold">Platform</span>
              <span className="text-sm text-[#0A2240] font-medium font-sans">Digital & Print</span>
            </div>
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A059] block mb-1 font-semibold">Type</span>
              <span className="text-sm text-[#0A2240] font-medium flex items-center justify-center sm:justify-start gap-1.5 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                Academic Project
              </span>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E8E2D6] mb-24 max-w-7xl mx-auto" />

        {/* Section 01: Strategic Foundation (Split-screen interactive timeline and slide viewer) */}
        <section className="mb-32 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold">01 — Strategic Foundation</span>
            <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-[#0A2240] font-light leading-tight mb-4`}>
              Core Pillars
            </h2>
            <p className="text-sm text-[#4B5E7D] font-light max-w-2xl mx-auto">
              A structured breakdown of the insights, targets, and brand positioning that defined the campaign concept. Click any slide to expand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Mobile/Tablet Pill Selector */}
            <div className="flex lg:hidden overflow-x-auto pb-4 gap-2 scrollbar-none border-b border-[#E8E2D6]/30 mb-2 w-full select-none">
              {strategyPillars.map((pillar, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={pillar.num}
                    onClick={() => setActiveIndex(idx)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#0A2240] text-[#FAF7F0] shadow-sm' 
                        : 'bg-[#FAF7F0] text-[#4B5E7D] border border-[#E8E2D6]/40 hover:bg-[#E8E2D6]/20'
                    }`}
                  >
                    {pillar.num} · {pillar.title}
                  </button>
                );
              })}
            </div>

            {/* Desktop Timeline (Left Column) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col relative pl-6 border-l-[1px] border-[#E8E2D6]/60 select-none py-2">
              {strategyPillars.map((pillar, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={pillar.num}
                    className="relative pb-10 last:pb-0 cursor-pointer group"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    {/* Active Line indicator overlay */}
                    {isActive && (
                      <div className="absolute -left-[25px] top-0 bottom-0 w-[2px] bg-[#C5A059] transition-all duration-300" />
                    )}
                    
                    {/* Stepper Node dot */}
                    <div className={`absolute -left-[29px] top-[18px] w-2.5 h-2.5 rounded-full border border-[#FDFCF9] transition-all duration-300 ${
                      isActive ? 'bg-[#C5A059] scale-125' : 'bg-[#E8E2D6] group-hover:bg-[#C5A059]/60'
                    }`} />

                    <div className="pl-4 transition-all duration-300">
                      <div className="flex items-baseline gap-3">
                        <span className={`${cormorant.className} text-2xl md:text-3xl transition-all duration-300 ${isActive ? 'text-[#C5A059] font-medium' : 'text-[#4B5E7D]/50'}`}>
                          {pillar.num}
                        </span>
                        <h3 className={`${cormorant.className} text-3xl md:text-4xl transition-all duration-300 leading-tight ${
                          isActive ? 'text-[#0A2240] font-medium' : 'text-[#4B5E7D]/60 group-hover:text-[#0A2240]'
                        }`}>
                          {pillar.title}
                        </h3>
                      </div>
                      
                      {/* Subtitle */}
                      <span className={`text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 mt-1 block ${
                        isActive ? 'text-[#C5A059]' : 'text-[#4B5E7D]/40'
                      }`}>
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide & Info Viewer (Right Column) */}
            <div className="lg:col-span-8 lg:sticky lg:top-28 flex flex-col gap-4 w-full">
              {/* Slide Wrapper with aspect ratio */}
              <div 
                className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#E8E2D6]/40 cursor-zoom-in bg-white"
                onClick={() => setIsLightboxOpen(true)}
              >
                {/* Images with transition */}
                {strategyPillars.map((pillar, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={pillar.num}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive 
                          ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                          : 'opacity-0 scale-95 z-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={`/dove/dove-slide-${idx + 2}.png`}
                        alt={`Slide for ${pillar.title}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        priority={idx === 0}
                      />
                    </div>
                  );
                })}

                {/* Hover zoom overlay */}
                <div className="absolute inset-0 bg-[#0A2240]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-4 h-4 text-[#0A2240]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-wider text-[#0A2240] font-semibold">
                      Click to Expand Slide
                    </span>
                  </div>
                </div>
              </div>

              {/* Pagination Meta indicator */}
              <div className="flex items-center justify-between px-2 text-[9px] tracking-[0.15em] text-[#4B5E7D]/60 uppercase font-semibold select-none">
                <span>Campaign Insight Deck</span>
                <span>Pillar {strategyPillars[activeIndex].num} / 06</span>
              </div>
            </div>

          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E8E2D6] mb-24 max-w-7xl mx-auto" />

        {/* Section 02: Touchpoints & Digital Activation */}
        <section className="mb-32 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold">02 — Campaign Touchpoints</span>
            <h2 className={`${cormorant.className} text-4xl md:text-5xl text-[#0A2240] font-light leading-tight mb-4`}>
              Reaching the Target
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mt-6">
              <div className="p-6 bg-[#FAF7F0] border border-[#E8E2D6]/30 rounded-xl">
                <h3 className="text-xs tracking-[0.15em] uppercase text-[#C5A059] font-semibold mb-2">Digital Activation (Instagram)</h3>
                <p className="text-xs text-[#4B5E7D] leading-relaxed font-light">
                  Statics, organic Reels, and interactive AR filters designed to reach Gen Z and Millennial audiences directly in spaces where digital perfection pressure is highest.
                </p>
              </div>
              <div className="p-6 bg-[#FAF7F0] border border-[#E8E2D6]/30 rounded-xl">
                <h3 className="text-xs tracking-[0.15em] uppercase text-[#C5A059] font-semibold mb-2">D2C Activation (The Mirror Gift)</h3>
                <p className="text-xs text-[#4B5E7D] leading-relaxed font-light">
                  A unique peer-to-peer gifting system that distributes physical unfiltered mirrors, building an offline supportive community of sisters and friends.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-12">
            {/* Side-by-side feed and filter mockups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <Image 
                src="/dove/dove-slide-9.png" 
                alt="Social feed design" 
                width={1920}
                height={1126}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
              <Image 
                src="/dove/dove-slide-10.png" 
                alt="AR Filter details" 
                width={1920}
                height={1124}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E8E2D6] mb-24 max-w-7xl mx-auto" />

        {/* Section 03: Creative Deliverables & Posters (Card dimensions fixed) */}
        <section className="mb-32">
          <div className="max-w-7xl mx-auto mb-16 text-center">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold">03 — Creative Assets</span>
            <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-[#0A2240] font-light leading-tight mb-4`}>
              Visual Delivery
            </h2>
            <p className="text-sm text-[#4B5E7D] font-light max-w-2xl mx-auto">
              Print posters, mirror packaging templates, and hand-drawn line illustrations that celebrate natural growth across both professional and celebratory spaces.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            
            {/* Grid 1: Side-by-side vertical posters (Slide 11 & Slide 14) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
              <div className="flex flex-col gap-3">
                <Image 
                  src="/dove/dove-slide-11.png" 
                  alt="Unfiltered Normal Poster" 
                  width={960}
                  height={1200}
                  className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
                />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold pl-2">Print Poster Option A</span>
              </div>
              
              <div className="flex flex-col gap-3 mt-0 md:mt-12">
                <Image 
                  src="/dove/dove-slide-14.png" 
                  alt="Lehenga Story Poster" 
                  width={961}
                  height={1707}
                  className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
                />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold pl-2">Print Poster Option B</span>
              </div>
            </div>

            {/* Centered Campaign Illustrations (Slide 13) */}
            <div className="max-w-4xl mx-auto my-12 flex flex-col gap-3">
              <Image 
                src="/dove/dove-slide-13.png" 
                alt="Boardroom and Lehenga Illustrations" 
                width={1920}
                height={1937}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold pl-2">Campaign Illustrations</span>
            </div>

            {/* Grid 3: Slide 12 (Illustrations details) & Slide 15 (Mirror Card Mockup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
              <Image 
                src="/dove/dove-slide-12.png" 
                alt="Identity illustrations detail" 
                width={1920}
                height={1590}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
              <Image 
                src="/dove/dove-slide-15.png" 
                alt="D2C Mirror Card representation" 
                width={1920}
                height={1282}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
            </div>

            {/* Full-bleed Panoramic Banner (Slide 16) */}
            <div className="w-full my-8">
              <Image 
                src="/dove/dove-slide-16.png" 
                alt="Banner Campaign message" 
                width={1919}
                height={576}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
            </div>

            {/* Grid 4: Slide 17 & Slide 18 (Mirror details and packaging) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
              <Image 
                src="/dove/dove-slide-17.png" 
                alt="Unfiltered mirror details" 
                width={1920}
                height={1240}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
              <Image 
                src="/dove/dove-slide-18.png" 
                alt="Unfiltered packaging design" 
                width={1920}
                height={2158}
                className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
              />
            </div>
            
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#E8E2D6] mb-24 max-w-7xl mx-auto" />

        {/* Section 04: Outcome & Reflection */}
        <section className="mb-24 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#C5A059] mb-3 block font-semibold">04 — Outcomes</span>
            <h2 className={`${cormorant.className} text-4xl md:text-5xl text-[#0A2240] font-light leading-tight mb-4`}>
              Quiet Self-Acceptance
            </h2>
            <p className="text-sm text-[#4B5E7D] font-light max-w-2xl mx-auto mb-12">
              Challenging physical stigmas in India without aggressive confrontation, utilizing Dove's trusted brand tone to support personal choice and drive authenticity.
            </p>
          </div>
          
          <div className="w-full">
            <Image 
              src="/dove/dove-slide-19.png" 
              alt="Outcome slide" 
              width={1920}
              height={690}
              className="w-full h-auto rounded-xl border border-[#E8E2D6]/30 shadow-sm"
            />
          </div>
        </section>

      </main>

      <footer className="text-center mt-40 mb-12 px-5 md:px-12 lg:px-10">
        <p className="text-[11px] tracking-[0.3em] text-[#4B5E7D] uppercase">
          © {new Date().getFullYear()} Dove India · #TheRealGrowth · Academic Project
        </p>
      </footer>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 transition-all duration-300 animate-fadeIn select-none">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fadeIn {
              animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />

          {/* Close button top-right */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50 focus:outline-none cursor-pointer"
            aria-label="Close Lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow */}
          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + strategyPillars.length) % strategyPillars.length)}
            className="absolute left-6 text-white/50 hover:text-white transition-colors p-3 z-50 rounded-full hover:bg-white/5 focus:outline-none cursor-pointer"
            aria-label="Previous Slide"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide display block */}
          <div 
            className="relative w-[90vw] md:w-[80vw] max-w-6xl aspect-[16/9] flex items-center justify-center cursor-zoom-out"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
              }
            }}
          >
            {/* Current Slide Image */}
            <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden border border-white/10" onClick={() => setIsLightboxOpen(false)}>
              <Image
                src={`/dove/dove-slide-${activeIndex + 2}.png`}
                alt={`Strategic Pillar ${strategyPillars[activeIndex].num} - ${strategyPillars[activeIndex].title}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % strategyPillars.length)}
            className="absolute right-6 text-white/50 hover:text-white transition-colors p-3 z-50 rounded-full hover:bg-white/5 focus:outline-none cursor-pointer"
            aria-label="Next Slide"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Lightbox Meta & Nav Hint */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center text-white/80 max-w-xl px-4 select-text">
            <span className={`${cormorant.className} text-xl md:text-2xl font-light text-white`}>
              {strategyPillars[activeIndex].num} — {strategyPillars[activeIndex].title}
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A059] font-semibold mt-1">
              Use ← / → Arrow Keys · Esc to Close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
