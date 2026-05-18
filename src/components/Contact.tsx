'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const MAILTO = "mailto:hritikjasnani.design@gmail.com?subject=Design%20Project%20Inquiry&body=Hi%20Hritik,%0A%0AI%20came%20across%20your%20work%20and%20I%20am%20interested%20in%20collaborating%20with%20you%20on%20a%20design%20project.%0A%0AHere%20is%20a%20brief%20overview%20of%20what%20I%20am%20looking%20for:%0A%0AProject%20Type:%20%0ATimeline:%20%0ABudget:%20%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A%5BYour%20Name%5D";

export default function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);


  const handleHireMeClick = () => {
    window.location.href = MAILTO;
    setShowToast(true);
    setCopied(false);
    setTimeout(() => setShowToast(false), 8000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hritikjasnani.design@gmail.com');
    setCopied(true);
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="scroll-mt-16 bg-ink">
        <div className="w-full px-5 md:px-12 lg:px-10 pt-16 md:pt-24 pb-0">

          {/* Headline */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl lg:text-[76px] font-light leading-[1.05] text-off-white mb-5 max-w-3xl">
              Let&apos;s build something<br/>worth remembering.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[13px] text-white/40 leading-[1.8] max-w-sm mb-10">
              I work with a small number of clients at a time — which means your project gets full attention.
            </p>
          </Reveal>

          {/* Primary CTA Button */}
          <Reveal delay={0.3}>
            <button
              onClick={handleHireMeClick}
              className="group inline-flex items-center gap-3 bg-off-white text-ink px-8 py-4 rounded-sm font-body text-sm tracking-[0.08em] uppercase cursor-pointer border-none transition-all duration-200 hover:bg-brand-red hover:text-off-white mb-16"
            >
              Start a Project
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </Reveal>

          {/* Contact Links Row */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row border-t-[0.5px] border-white/10">
              <button
                onClick={handleHireMeClick}
                className="flex-1 flex justify-between items-center py-5 sm:pr-12 border-b-[0.5px] sm:border-b-0 sm:border-r-[0.5px] border-white/10 cursor-pointer hover:pl-2 transition-all duration-200 group bg-transparent text-left"
              >
                <span className="text-[11px] tracking-[0.12em] uppercase text-white/40">Email</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white/70 group-hover:text-off-white transition-colors">hritikjasnani.design@gmail.com</span>
                  <span className="text-white/30 group-hover:text-off-white transition-colors text-base">↗</span>
                </div>
              </button>
              <a
                href="https://instagram.com/hritikjasnani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-between items-center py-5 sm:pl-12 cursor-pointer hover:pl-[3.5rem] transition-all duration-200 group no-underline"
              >
                <span className="text-[11px] tracking-[0.12em] uppercase text-white/40">Instagram</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white/70 group-hover:text-off-white transition-colors">@hritikjasnani</span>
                  <span className="text-white/30 group-hover:text-off-white transition-colors text-base">↗</span>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Smart Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-off-white text-ink px-6 py-4 rounded-sm shadow-2xl flex items-center gap-6 text-xs font-body min-w-[320px] max-w-[480px]">
          <div className="flex-1">
            <p className="font-medium text-ink mb-1">Opening mail app…</p>
            <p className="text-smoke">
              Nothing happened?{' '}
              <button onClick={copyEmail} className="underline text-brand-red hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0 inline font-medium">
                {copied ? '✓ Email copied!' : 'Copy email address'}
              </button>
            </p>
          </div>
          <button onClick={() => setShowToast(false)} className="text-smoke hover:text-ink cursor-pointer bg-transparent border-none p-0 text-lg shrink-0 transition-colors">✕</button>
        </div>
      )}
    </>
  );
}
