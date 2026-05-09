export default function Work() {
  const works = [
    { title: "Purr Pantry — Premium Cat Food Brand", category: "Branding", double: true, color: "#1A1A1A", thumbText: "Purr Pantry", textClass: "text-[clamp(32px,5vw,64px)] text-white/20" },
    { title: "Dove #TheRealGrowth", category: "Campaign", double: false, color: "#E8E2D6", thumbText: "Dove Campaign", textClass: "text-lg text-smoke" },
    { title: "Nothing Community Edition", category: "UI/UX", double: false, color: "#2C3E50", thumbText: "Nothing Widget", textClass: "text-lg text-white/30" },
    { title: "Noise Luna Zen — Smartwatch", category: "Product Design", double: false, color: "#C0392B", thumbText: "Noise Luna", textClass: "text-lg text-white/50" },
    { title: "Typehaus — Font Browser", category: "Product / Dev", double: false, color: "#F0EBE0", thumbText: "Typehaus", textClass: "text-lg text-smoke" },
    { title: "SYSLOG — Audio Experience", category: "Interactive", double: false, color: "#1A1A2E", thumbText: "SYSLOG", textClass: "text-[32px] text-white/20" }
  ];

  return (
    <>
      <section id="work" className="scroll-mt-16 px-[clamp(20px,4vw,40px)] py-[clamp(40px,8vw,80px)]">
        <div className="flex justify-between items-baseline mb-12 pb-5 border-b-[0.5px] border-border-subtle">
          <h2 className="font-display text-[clamp(32px,4vw,42px)] font-light text-ink">Selected Work</h2>
          <span className="text-[11px] text-smoke tracking-[0.1em]">01 / Work</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(12px,2vw,20px)]">
          {works.map((work, idx) => (
            <div key={idx} className={`cursor-pointer group ${work.double ? 'md:col-span-2' : ''}`}>
              <div 
                className={`rounded mb-3.5 overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.01] ${work.double ? 'aspect-video' : 'aspect-4/3'}`}
                style={{ background: work.color }}
              >
                <div className={`w-full h-full flex items-center justify-center font-display font-light ${work.textClass}`}>
                  {work.thumbText}
                </div>
                <div className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-85">
                  <span className="text-off-white text-xs tracking-[0.1em] uppercase">
                    {work.double ? 'View Case Study →' : 'View →'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-ink">{work.title}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase text-smoke">{work.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(30px,5vw,60px)] items-center px-[clamp(20px,4vw,40px)] py-[clamp(40px,8vw,80px)] bg-parchment">
        <div>
          <p className="text-[10px] tracking-[0.12em] uppercase text-smoke mb-5">Featured Case Study</p>
          <h2 className="font-display text-[clamp(36px,4vw,48px)] font-light leading-[1.1] mb-6">Purr Pantry<br/>Brand Identity</h2>
          <p className="text-sm text-smoke leading-[1.8] mb-8">
            A full brand identity system for a premium cat food brand — logo, color, packaging, social templates, and a 17-slide Behance case study, built end-to-end.
          </p>
          <div className="flex gap-2 flex-wrap mb-8">
            {['Strategy', 'Logo Design', 'Packaging', 'Social'].map(tag => (
              <span key={tag} className="text-[10px] tracking-[0.08em] uppercase px-3.5 py-1.5 border-[0.5px] border-border-subtle rounded-sm text-smoke">
                {tag}
              </span>
            ))}
          </div>
          <button className="bg-ink text-off-white px-8 py-3.5 font-body text-xs tracking-[0.08em] uppercase border-none cursor-pointer rounded-sm transition-colors duration-200 hover:bg-brand-red">
            Read Case Study →
          </button>
        </div>
        <div className="bg-ink rounded-md aspect-4/3 flex items-center justify-center">
          <span className="font-display text-[clamp(36px,5vw,48px)] font-light text-white/15">PP</span>
        </div>
      </div>
    </>
  );
}
