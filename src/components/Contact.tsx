'use client';

import Reveal from './Reveal';
import { useHireMe } from './HireMeProvider';

export default function Contact() {
  const { handleHireMeClick } = useHireMe();

  return (
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
  );
}
