'use client';

import { useState } from 'react';
import Reveal from './Reveal';

export default function Hero() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:hritikjasnani.design@gmail.com?subject=Design%20Project%20Inquiry&body=Hi%20Hritik,%0A%0AI%20came%20across%20your%20work%20and%20I%20am%20interested%20in%20collaborating%20with%20you%20on%20a%20design%20project.%0A%0AHere%20is%20a%20brief%20overview%20of%20what%20I%20am%20looking%20for:%0A%0AProject%20Type:%20%0ATimeline:%20%0ABudget:%20%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A%5BYour%20Name%5D";
    setShowToast(true);
    setCopied(false);
    setTimeout(() => setShowToast(false), 8000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hritikjasnani.design@gmail.com');
    setCopied(true);
  };

  return (
    <section className="min-h-[clamp(400px,80vh,800px)] pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20 border-b-[0.5px] border-border-subtle flex items-center">
      <div className="w-full px-5 md:px-12 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col items-start">
        <Reveal delay={0.1}>
          <div className="text-[11px] tracking-[0.12em] uppercase text-smoke mb-8 flex items-center gap-2.5">
            <span className="inline-block w-6 h-[0.5px] bg-brand-red"></span>
            Available for Projects
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-light leading-[1.05] tracking-[-0.01em] mb-8">
            I design brands and<br />experiences people<br />
            <em className="italic text-brand-red">remember.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-sm text-smoke max-w-[320px] leading-[1.8] mb-10">
            <span className="text-ink font-medium">Graphic Design · Branding · Illustration · UI/UX</span><br /><br />
            Multidisciplinary designer bridging editorial precision with conceptual depth. Based in India, working globally.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex gap-4 items-center">
            <button onClick={() => scrollTo('work')} className="bg-ink text-off-white px-8 py-3.5 font-body text-xs tracking-[0.08em] uppercase border-none cursor-pointer rounded-sm transition-colors duration-200 hover:bg-brand-red">
              View Work
            </button>
            <button onClick={handleHireMeClick} className="bg-transparent text-ink px-8 py-3.5 font-body text-xs tracking-[0.08em] uppercase border-[0.5px] border-border-subtle cursor-pointer rounded-sm transition-colors duration-200 hover:border-ink inline-block">
              Hire Me →
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="flex flex-wrap gap-10 md:gap-16 lg:gap-24 mt-8 pt-8 border-t-[0.5px] border-border-subtle w-full">
            <div>
              <span className="font-display text-3xl md:text-4xl font-light text-ink block">17K</span>
              <span className="text-[11px] text-smoke tracking-[0.06em]">Instagram Followers</span>
            </div>
            <div>
              <span className="font-display text-3xl md:text-4xl font-light text-ink block">4+</span>
              <span className="text-[11px] text-smoke tracking-[0.06em]">Years Designing</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="h-full">
        <div className="grid grid-cols-2 grid-rows-[1.75fr_1fr] gap-2 md:gap-3 h-[clamp(350px,50vh,500px)]">
          <div 
            className="row-span-2 rounded bg-cover bg-center overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            style={{ backgroundImage: "url('purpan.png')" }}
          >
            <div>
              <div className="font-display text-2xl md:text-3xl font-light text-off-white leading-[1.1]">Brand<br />Identity</div>
            </div>
          </div>
          <div className="bg-[#E8E2D6] rounded overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
            <span className="text-[10px] tracking-[0.1em] uppercase text-smoke bg-off-white px-2.5 py-1 rounded-sm">Illustration</span>
          </div>
          <div className="bg-brand-red rounded overflow-hidden relative flex items-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
            <span className="text-[10px] tracking-[0.1em] uppercase text-white/80 bg-black/20 px-2.5 py-1 rounded-sm">UI/UX</span>
          </div>
        </div>
      </Reveal>
      </div>
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-ink text-off-white px-6 py-4 rounded shadow-2xl flex items-center gap-4 text-xs font-body animate-in slide-in-from-bottom-5 fade-in duration-300">
          <span>
            Opening mail app... If nothing happened, 
            <button onClick={copyEmail} className="ml-2 underline text-brand-red hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 inline">
              {copied ? "Copied!" : "click here to copy email"}
            </button>
          </span>
          <button onClick={() => setShowToast(false)} className="ml-4 text-white/50 hover:text-white cursor-pointer bg-transparent border-none p-0 text-lg">✕</button>
        </div>
      )}
    </section>
  );
}
