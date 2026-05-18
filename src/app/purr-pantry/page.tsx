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
  weight: ['300', '400', '500'],
  display: 'swap',
});

function PurrLogo({ className, color1, color2, strokeWidth = 18 }: { className?: string, color1: string, color2: string, strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 408 408" className={className} style={{ overflow: 'visible' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M191.448 151.416C191.442 151.393 191.436 151.373 191.429 151.352C182.374 141.338 169.332 134.999 154.806 134.838C154.616 134.835 154.428 134.834 154.239 134.834C143.491 134.834 133.534 138.217 125.372 143.977C122.853 145.754 120.505 147.758 118.358 149.959" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M83.17 117.991C67.3706 130.563 57.2437 149.957 57.2437 171.719C57.2437 202.015 76.876 227.726 104.112 236.825C110.949 239.109 118.267 240.347 125.873 240.347C135.256 240.347 144.199 238.464 152.345 235.054C165.139 229.701 175.967 220.584 183.443 209.087" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M193.301 153.543C193.274 153.509 193.245 153.473 193.216 153.438C192.639 152.726 192.043 152.031 191.429 151.352C182.374 141.338 169.332 134.999 154.806 134.838C154.616 134.835 154.428 134.834 154.239 134.834C143.491 134.834 133.534 138.217 125.372 143.977C122.853 145.754 120.505 147.758 118.359 149.959C109.543 158.994 104.112 171.344 104.112 184.963" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M104.112 184.963V290.01" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M239.875 179.169V175.21V117.991L263.634 141.75L263.99 142.105" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M154.806 134.838C154.616 134.835 154.428 134.834 154.239 134.834" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M193.216 153.438C200.272 161.066 204.952 171.023 205.927 182.291C207.1 211.176 213.734 227.463 239.876 236.408" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M239.875 290.01V236.408" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M263.99 142.105C271.574 137.49 280.478 134.834 290.003 134.834C290.191 134.834 290.38 134.834 290.57 134.838C299.848 134.942 308.521 137.563 315.935 142.055" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M340.132 176.56V117.858L315.935 142.055" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M301.948 232.235C324.285 223.614 340.131 201.937 340.131 176.56" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M239.875 236.407C263.305 243.514 284.413 240.104 301.949 232.236" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
      <path d="M301.949 232.237L301.948 232.235" stroke={color1} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"/>
    </svg>
  );
}

export default function PurrPantryPage() {
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
    <div className={`min-h-screen bg-[#FAF6EE] text-[#1A1208] ${jost.className} selection:bg-[#C4611A] selection:text-white pb-20`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-12 lg:px-10 md:py-6 bg-[#FAF6EE]/90 backdrop-blur-sm border-b-[0.5px] border-[#D4C4AA]">
        <a href="/" onClick={handleBack} className="text-[#1A1208] hover:text-[#C4611A] transition-colors uppercase tracking-[0.2em] text-xs font-medium">
          ← Back to Portfolio
        </a>
        <div className={`uppercase tracking-[0.3em] text-[10px] text-[#C4611A] ${jost.className}`}>
          Brand Identity
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 px-5 md:px-12 lg:px-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className={`${cormorant.className} text-6xl md:text-8xl lg:text-[110px] font-light tracking-wide text-[#1A1208] mb-6 leading-none`}>
          Purr Pantry
        </h1>
        <p className={`${cormorant.className} italic text-[#8A7660] text-xl md:text-2xl max-w-3xl mb-16`}>
          Logo · Colour · Typography
        </p>
        
        <div className="w-full mb-32 rounded-xl overflow-hidden shadow-2xl bg-[#F5EAD7]">
          <Image 
            src="/purr/starting-page.jpg" 
            alt="Purr Pantry Starting Page" 
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-12 lg:px-10">
        
        {/* Brand Context */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4611A] mb-3">00 — The Brief</p>
              <h2 className={`${cormorant.className} text-3xl md:text-4xl text-[#1A1208]`}>Project Context</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`${cormorant.className} text-2xl md:text-[28px] leading-[1.5] text-[#2E1A0E] mb-6`}>
                Purr Pantry blends culinary craft with veterinary science. The brand needed an identity balancing scientific credibility with the warmth of a home-cooked meal.
              </p>
              <p className={`${cormorant.className} text-xl md:text-[22px] leading-[1.6] text-[#8A7660] italic`}>
                Inspired by its Pacific Northwest roots, the design appeals to modern pet owners who value transparency, avoiding the sterile feel of clinical pet food.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#D4C4AA] mb-24" />

        {/* Concept Exploration */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/4 shrink-0">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4611A] mb-3">01 — The Concept</p>
              <h2 className={`${cormorant.className} text-3xl md:text-4xl text-[#1A1208]`}>Process & Exploration</h2>
            </div>
            <div className="w-full md:w-3/4">
              <p className={`${cormorant.className} text-xl md:text-2xl leading-[1.6] text-[#2E1A0E] mb-12`}>
                Every strong identity begins on paper. The creative process focused on elegantly combining the dual 'P's of Purr Pantry. I aimed to craft a clever shape that rewards a second glance, avoiding any overt cartoonishness.
              </p>
              
              <div className="group w-full aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl bg-[#F5EAD7]">
                <Image
                  src="/purr/sketches.jpg"
                  alt="Purr Pantry Process Sketches"
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#D4C4AA] mb-24" />

        {/* Logo Variations */}
        <section className="mb-32">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4611A] mb-3">02 — Mark & Logo</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-[#1A1208]`}>Logo Variations</h2>
            </div>
            <p className={`${cormorant.className} italic text-[#8A7660] text-lg md:text-xl leading-relaxed max-w-xl`}>
              The primary brand mark adapts to different backgrounds within our palette system, ensuring high contrast and legibility while maintaining the premium aesthetic.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Featured Logo */}
            <div className="w-full bg-[#C4611A] rounded-3xl flex items-center justify-center py-24 px-10 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#a34f13] to-[#C4611A] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="absolute top-8 left-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">Primary Application</p>
              </div>

              <PurrLogo 
                className="w-64 md:w-96 lg:w-[480px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105" 
                color1="#FFF8F0" 
                color2="#F5EAD7" 
              />
            </div>
            
            {/* Secondary Logos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1A1208] rounded-3xl flex flex-col items-center justify-center p-16 relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500">
                <div className="absolute top-6 left-6">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#F5EAD7]/30">Accent / Active</p>
                </div>
                <PurrLogo 
                  className="w-32 md:w-40 h-auto transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" 
                  color1="#F5EAD7" 
                  color2="#C4611A" 
                />
              </div>
              
              <div className="bg-[#FAF6EE] border-[0.5px] border-[#D4C4AA] rounded-3xl flex flex-col items-center justify-center p-16 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500">
                <div className="absolute top-6 left-6">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#1A1208]/30">Print / Light</p>
                </div>
                <PurrLogo 
                  className="w-32 md:w-40 h-auto transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" 
                  color1="#1A1208" 
                  color2="#C4611A" 
                />
              </div>

              <div className="bg-[#F5EAD7] rounded-3xl flex flex-col items-center justify-center p-16 relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500">
                <div className="absolute top-6 left-6">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#2E1A0E]/30">Structural / Core</p>
                </div>
                <PurrLogo 
                  className="w-32 md:w-40 h-auto transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" 
                  color1="#2E1A0E" 
                  color2="#C4611A" 
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#D4C4AA] mb-24" />

        {/* Colour Palette */}
        <section className="mb-32">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4611A] mb-3">03 — Colour</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-[#1A1208]`}>The Palette</h2>
            </div>
            <p className={`${cormorant.className} italic text-[#8A7660] text-lg md:text-xl leading-relaxed max-w-xl`}>
              Built from the warmth of the Pacific Northwest coast — amber firelight, espresso dark, parchment paper, sage coastal green. Every colour has a job. None are decorative.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-10">
            {/* Swatch 1 */}
            <div className="bg-[#2E1A0E] aspect-square p-5 flex flex-col justify-between text-[#F5EAD7] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">Primary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Espresso</div>
                <div className="text-xs font-mono opacity-60">#2E1A0E</div>
              </div>
            </div>
            {/* Swatch 2 */}
            <div className="bg-[#1A1208] aspect-square p-5 flex flex-col justify-between text-[#F5EAD7] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">Primary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Deep Ink</div>
                <div className="text-xs font-mono opacity-60">#1A1208</div>
              </div>
            </div>
            {/* Swatch 3 */}
            <div className="bg-[#C4611A] aspect-square p-5 flex flex-col justify-between text-[#FFF8F0] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Accent</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Amber</div>
                <div className="text-xs font-mono opacity-90">#C4611A</div>
              </div>
            </div>
            {/* Swatch 4 */}
            <div className="bg-[#F5EAD7] aspect-square p-5 flex flex-col justify-between text-[#2E1A0E] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Primary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Parchment</div>
                <div className="text-xs font-mono opacity-70">#F5EAD7</div>
              </div>
            </div>
            {/* Swatch 5 */}
            <div className="bg-[#FAF6EE] aspect-square p-5 flex flex-col justify-between text-[#2E1A0E] border-[0.5px] border-[#D4C4AA] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Background</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Warm Cream</div>
                <div className="text-xs font-mono opacity-70">#FAF6EE</div>
              </div>
            </div>
            {/* Secondary Swatches */}
            <div className="bg-[#7A8C6E] aspect-square p-5 flex flex-col justify-between text-white rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Secondary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Herb Sage</div>
                <div className="text-xs font-mono opacity-70">#7A8C6E</div>
              </div>
            </div>
            <div className="bg-[#E8956B] aspect-square p-5 flex flex-col justify-between text-white rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Secondary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Amber Light</div>
                <div className="text-xs font-mono opacity-70">#E8956B</div>
              </div>
            </div>
            <div className="bg-[#5C3D28] aspect-square p-5 flex flex-col justify-between text-[#F5EAD7] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">Secondary</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Dark Roast</div>
                <div className="text-xs font-mono opacity-60">#5C3D28</div>
              </div>
            </div>
            <div className="bg-[#D4C4AA] aspect-square p-5 flex flex-col justify-between text-[#2E1A0E] rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">UI</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Warm Rule</div>
                <div className="text-xs font-mono opacity-70">#D4C4AA</div>
              </div>
            </div>
            <div className="bg-[#8A7660] aspect-square p-5 flex flex-col justify-between text-white rounded-xl group transition-transform hover:-translate-y-2 hover:shadow-lg cursor-default">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">UI</span>
              <div>
                <div className="text-sm font-medium tracking-wide">Warm Muted</div>
                <div className="text-xs font-mono opacity-70">#8A7660</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border-[0.5px] border-[#D4C4AA] rounded-xl hover:shadow-md transition-shadow">
              <p className="text-[10px] tracking-[0.3em] text-[#C4611A] uppercase mb-4 font-medium">Dominant</p>
              <p className={`${cormorant.className} italic text-[#1A1208] text-xl leading-[1.6]`}>Parchment and Cream together form 70% of every surface. This is the brand's breathing room — warm, tactile, quiet.</p>
            </div>
            <div className="bg-white p-8 border-[0.5px] border-[#D4C4AA] rounded-xl hover:shadow-md transition-shadow">
              <p className="text-[10px] tracking-[0.3em] text-[#C4611A] uppercase mb-4 font-medium">Structural</p>
              <p className={`${cormorant.className} italic text-[#1A1208] text-xl leading-[1.6]`}>Espresso and Deep Ink carry all type and mark applications. Never use pure black — always the warm dark browns.</p>
            </div>
            <div className="bg-white p-8 border-[0.5px] border-[#D4C4AA] rounded-xl hover:shadow-md transition-shadow">
              <p className="text-[10px] tracking-[0.3em] text-[#C4611A] uppercase mb-4 font-medium">Accent</p>
              <p className={`${cormorant.className} italic text-[#1A1208] text-xl leading-[1.6]`}>Amber is used sparingly and with intention — the cat elements in the mark, key words in headlines, active UI states. Never as a background.</p>
            </div>
          </div>
        </section>

        <hr className="border-t-[0.5px] border-[#D4C4AA] mb-24" />

        {/* Typography */}
        <section className="mb-24">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#C4611A] mb-3">04 — Typography</p>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-[#1A1208]`}>Type System</h2>
            </div>
            <p className={`${cormorant.className} italic text-[#8A7660] text-lg md:text-xl leading-relaxed max-w-xl`}>
              Two typefaces. One rule: Cormorant Garamond carries warmth and authority. Jost carries clarity and precision. They never fight — they take turns.
            </p>
          </div>

          <div className="bg-[#FFFCF7] border-[0.5px] border-[#D4C4AA] rounded-2xl overflow-hidden shadow-sm">
            {[
              { role: 'Display', spec: 'Cormorant Garamond\nLight 300\n48–72px\nTracking: -0.5px', sample: 'Real food.\nReal care.', isCormorant: true, classes: 'text-6xl md:text-7xl font-light leading-none tracking-[-0.5px]' },
              { role: 'Headline', spec: 'Cormorant Garamond\nRegular 400\n24–36px\nTracking: 0', sample: 'Pacific halibut, caught off\nthe Oregon coast.', isCormorant: true, classes: 'text-3xl md:text-4xl font-normal leading-[1.2]' },
              { role: 'Subheading', spec: 'Cormorant Garamond\nItalic 400\n18–22px\nTracking: 0', sample: 'Formulated by Nadia Okafor,\nveterinary nutritionist.', isCormorant: true, classes: 'text-xl md:text-2xl font-normal italic leading-[1.4]' },
              { role: 'Label / UI', spec: 'Jost\nMedium 500\n10–12px\nTracking: +3px · Uppercase', sample: 'SMALL-BATCH · PORTLAND, OR · EST. 2021', isCormorant: false, classes: 'text-[13px] font-medium tracking-[0.3em] uppercase' },
              { role: 'Body Copy', spec: 'Jost\nLight 300\n13–15px\nLine height: 1.8', sample: 'We spent 18 months developing these recipes in a certified commercial kitchen. Every protein is sourced from Pacific Northwest farms we visit ourselves. Not "premium fish." Wild coho salmon from the Columbia River.', isCormorant: false, classes: 'text-base font-light leading-[1.8] max-w-[500px]' }
            ].map((type, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row items-baseline gap-6 lg:gap-16 p-8 md:p-12 border-b-[0.5px] border-[#D4C4AA] last:border-0 hover:bg-white transition-colors">
                <div className="w-full lg:w-64 shrink-0">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#C4611A] mb-3 font-medium">{type.role}</p>
                  <p className="text-xs text-[#8A7660] whitespace-pre-line leading-relaxed">{type.spec}</p>
                </div>
                <div className={`${type.isCormorant ? cormorant.className : jost.className} ${type.classes} whitespace-pre-line text-[#1A1208]`}>
                  {type.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      
      <footer className="text-center mt-40 mb-12 px-5 md:px-12 lg:px-10">
        <p className="text-[11px] tracking-[0.3em] text-[#8A7660] uppercase">
          © {new Date().getFullYear()} Purr Pantry · Brand Identity
        </p>
      </footer>
    </div>
  );
}
