'use client';

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
  weight: ['300', '400', '500'],
  display: 'swap',
});

export default function NothingCommunityEditionPage() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div 
      className={`min-h-screen bg-[#111110] text-[#FAFAF8] ${jost.className} selection:bg-[#C0392B] selection:text-white pb-20 relative overflow-hidden`}
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient Glyphs-Inspired Glows */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[1200px] right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(192,57,43,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[2800px] left-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 lg:px-10 md:py-6 bg-[#111110]/95 backdrop-blur-sm border-b-[0.5px] border-white/10">
        <a href="/" onClick={handleBack} className="text-[#FAFAF8] hover:text-[#C0392B] transition-colors uppercase tracking-[0.2em] text-xs font-medium no-underline">
          ← Back to Portfolio
        </a>
        <div className={`uppercase tracking-[0.3em] text-[10px] text-[#C0392B] ${jost.className} font-medium`}>
          UI/UX Design
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 px-5 md:px-12 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <h1 className={`${cormorant.className} text-6xl md:text-8xl lg:text-[110px] font-light tracking-wide text-white mb-6 leading-none`}>
          NOTHING
        </h1>
        <p className={`${cormorant.className} italic text-[#9E9C98] text-xl md:text-2xl max-w-3xl mb-16`}>
          Community Edition · To-Do Widget · 2025
        </p>
        
        <div className="w-full mb-32 rounded-2xl overflow-hidden shadow-2xl bg-[#161615]/50 border border-white/5">
          <Image 
            src="/nothing/nothing-hero.png" 
            alt="Nothing Community Edition Hero" 
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-12 lg:px-10">
        
        {/* Project Context */}
        <section className="mb-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C0392B] mb-3 font-medium">01 — The Brief</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl text-white font-light`}>Project Context</h2>
            </div>
            <div className="w-full lg:w-3/4">
              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#161615]/80 backdrop-blur-md border border-white/5 mb-12 shadow-lg">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#C0392B] block mb-1 font-mono">Role</span>
                  <span className="text-sm text-white font-medium">UI/UX Designer</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#C0392B] block mb-1 font-mono">Timeline</span>
                  <span className="text-sm text-white font-medium">April 2025</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#C0392B] block mb-1 font-mono">Platform</span>
                  <span className="text-sm text-white font-medium">Nothing OS</span>
                </div>
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#C0392B] block mb-1 font-mono">Status</span>
                  <span className="text-sm text-[#C0392B] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] animate-pulse"></span>
                    Featured Sub
                  </span>
                </div>
              </div>

              <p className={`${cormorant.className} text-3xl md:text-[34px] leading-[1.3] text-white font-light mb-6`}>
                Ambient utility meeting physical minimalism.
              </p>
              <p className={`${jost.className} text-sm text-[#9E9C98] leading-[1.9] mb-6 font-light`}>
                A minimalist to-do widget designed for the Nothing Community Edition, utilizing dot-based progress tracking to align with Nothing's transparent and understated hardware aesthetic. The interface balances core utility with geometric simplicity.
              </p>
              <p className={`${cormorant.className} italic text-white/60 text-lg md:text-xl leading-relaxed`}>
                Selected as a featured submission in the official Software showcase category, April 2025.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-white/10 mb-24" />

        {/* Design System & Visual Grid */}
        <section className="mb-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C0392B] mb-3 font-medium">02 — The Grid</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl text-white font-light`}>Process & Layout</h2>
            </div>
            <div className="w-full lg:w-3/4">
              <p className={`${cormorant.className} text-xl md:text-2xl leading-[1.6] text-white/80 mb-12`}>
                Strict grid constraints and dot-matrix typography scaling ensure the widget UI integrates with the device's default operating system layout.
              </p>
              
              <div className="group w-full rounded-2xl overflow-hidden shadow-xl bg-[#161615]/50 border border-white/5">
                <Image
                  src="/nothing/nothing-details-1.png"
                  alt="Nothing Design System Grid"
                  width={1920}
                  height={1080}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-white/10 mb-24" />

        {/* Interface States */}
        <section className="mb-32 relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C0392B] mb-3 font-medium">03 — The Interface</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-white font-light`}>Widget States</h2>
            </div>
            <p className={`${cormorant.className} italic text-[#9E9C98] text-lg md:text-xl leading-relaxed max-w-xl`}>
              Glanceable layouts optimized for low-emission ambient lockscreens, focusing on task completion rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group rounded-2xl overflow-hidden shadow-md bg-[#161615]/50 border border-white/5">
              <Image
                src="/nothing/nothing-details-2.png"
                alt="Widget state list view"
                width={1920}
                height={1080}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <div className="group rounded-2xl overflow-hidden shadow-md bg-[#161615]/50 border border-white/5">
              <Image
                src="/nothing/nothing-details-3.png"
                alt="Widget state details"
                width={1920}
                height={1080}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-white/10 mb-24" />

        {/* Integration and Device Mockups */}
        <section className="mb-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-12">
            <div className="w-full lg:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C0392B] mb-3 font-medium">04 — Physicality</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl text-white font-light`}>Hardware Integration</h2>
            </div>
            <div className="w-full lg:w-3/4">
              <p className={`${cormorant.className} text-xl md:text-2xl leading-[1.6] text-white/80`}>
                Testing system legibility in context. The digital interface mirrors the physical dot-pattern architecture of Nothing Phone's glyphs, bridging interface logic with industrial product design.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="group rounded-2xl overflow-hidden shadow-lg bg-[#161615]/50 border border-white/5">
              <Image
                src="/nothing/nothing-details-4.png"
                alt="Device mock representation"
                width={1920}
                height={1149}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <div className="group rounded-2xl overflow-hidden shadow-lg bg-[#161615]/50 border border-white/5">
              <Image
                src="/nothing/nothing-details-5.png"
                alt="Nothing glyph context mockup"
                width={1586}
                height={700}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-white/10 mb-24" />

        {/* Design Tokens palette */}
        <section className="mb-24 relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C0392B] mb-3 font-medium">05 — System Tokens</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-white font-light`}>Aesthetic Rules</h2>
            </div>
            <p className={`${cormorant.className} italic text-[#9E9C98] text-lg md:text-xl leading-relaxed max-w-xl`}>
              Design tokens optimized for high-contrast dark environments, establishing a clear visual hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              { name: "Pure Black", hex: "#000000", bg: "bg-[#000000]", text: "text-white", role: "Stark Contrast", desc: "Maximum contrast canvas for ambient displays." },
              { name: "Nothing Ink", hex: "#111110", bg: "bg-[#111110]", text: "text-[#FAFAF8]", role: "Base Canvas", desc: "The primary background context, soft and low-emission." },
              { name: "Glyph Red", hex: "#C0392B", bg: "bg-[#C0392B]", text: "text-white", role: "Indicator Accent", desc: "High-priority accent for active and completed states." },
              { name: "Mid Grey", hex: "#888888", bg: "bg-[#888888]", text: "text-black", role: "Secondary Label", desc: "Secondary typography and grid alignment rules." },
              { name: "Off-White", hex: "#FAFAF8", bg: "bg-[#FAFAF8]", text: "text-[#111110]", role: "Primary Text", desc: "High-readability contrast for primary system text." }
            ].map((swatch, idx) => (
              <div key={idx} className="bg-[#161615] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[220px] shadow-md hover:border-white/10 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#C0392B] uppercase font-bold">{swatch.role}</span>
                  <div className={`w-6 h-6 rounded-full ${swatch.bg} border border-white/10`} />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold tracking-wide mb-0.5">{swatch.name}</div>
                  <div className="text-xs font-mono text-[#9E9C98] mb-3">{swatch.hex}</div>
                  <p className="text-[11px] text-[#9E9C98] leading-[1.5] font-light">{swatch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="text-center mt-40 mb-12 px-5 md:px-12 lg:px-10 relative z-10">
        <p className="text-[11px] tracking-[0.3em] text-[#9E9C98] uppercase">
          © {new Date().getFullYear()} Nothing Community Edition · UI/UX Design
        </p>
      </footer>
    </div>
  );
}
