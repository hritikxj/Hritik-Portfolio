'use client';

import Reveal from './Reveal';
import Link from 'next/link';

export default function Work() {
  const works = [
    { title: "Purr Pantry — Premium Cat Food Brand", category: "Branding", double: false, color: "#1A1A1A", thumbText: "Purr Pantry", textClass: "text-[clamp(32px,5vw,64px)] text-white/20", image: "/Purthumbnail.jpg", link: "/purr-pantry" },
    { title: "Dove #TheRealGrowth", category: "Campaign", double: false, color: "#E8E2D6", thumbText: "Dove Campaign", textClass: "text-lg text-smoke", image: "/dove_thumb.jpg", link: "/dove" },
    { title: "Nothing Community Edition", category: "UI/UX", double: false, color: "#2C3E50", thumbText: "Nothing Widget", textClass: "text-lg text-white/30", image: "/nothing_thumb.jpg", link: "/nothing" },
  ];

  return (
    <>
      <section id="work" className="scroll-mt-16 py-10 md:py-16 lg:py-20">
        <div className="w-full px-5 md:px-12 lg:px-10">
          <Reveal>
            <div className="flex justify-between items-baseline mb-12 pb-5 border-b-[0.5px] border-border-subtle">
              <h2 className="font-display text-4xl md:text-5xl font-light text-ink">Selected Work</h2>
              <span className="text-[11px] text-smoke tracking-[0.1em]">01 / Work</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {works.map((work, idx) => {
            const CardContent = (
              <>
                <div 
                  className={`rounded mb-3.5 overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.01] ${work.double ? 'aspect-video' : 'aspect-4/3'}`}
                  style={{ background: work.image ? `url('${work.image}') center/cover no-repeat` : work.color }}
                >
                  {!work.image && (
                    <div className={`w-full h-full flex items-center justify-center font-display font-light ${work.textClass}`}>
                      {work.thumbText}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-85">
                    <span className="text-off-white text-xs tracking-[0.1em] uppercase">
                      {work.link ? (work.double ? 'View Case Study →' : 'View →') : 'Coming Soon'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-ink">{work.title}</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-smoke">{work.category}</span>
                </div>
              </>
            );

            return (
              <Reveal key={idx} delay={idx * 0.1} className={work.double ? 'md:col-span-2' : ''}>
                {work.link ? (
                  <Link
                    href={work.link}
                    onClick={() => {
                      try {
                        sessionStorage.setItem('portfolio-scroll-y', window.scrollY.toString());
                      } catch (e) {
                        console.warn(e);
                      }
                    }}
                    className="block cursor-pointer group h-full no-underline"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <div className="group h-full">
                    {CardContent}
                  </div>
                )}
              </Reveal>
            );
          })}
          </div>
        </div>
      </section>
    </>
  );
}
