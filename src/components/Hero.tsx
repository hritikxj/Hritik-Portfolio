'use client';

import Reveal from './Reveal';

export default function Hero() {

  return (
    <section className="pt-10 md:pt-14 pb-12 md:pb-14 border-b-[0.5px] border-border-subtle">
      <div className="w-full px-5 md:px-12 lg:px-10 max-w-4xl">
        {/* Left column — text */}
        <div className="flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-light leading-[1.05] tracking-[-0.01em] mb-6">
              I design brands and<br />
              <em className="italic text-brand-red">experiences.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-smoke leading-[1.8]">
              Multidisciplinary designer Based in India, working globally.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
