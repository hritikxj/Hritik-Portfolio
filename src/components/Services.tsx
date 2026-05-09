export default function Services() {
  const services = [
    { num: "01", name: "Brand Identity", desc: "Logo systems, visual identities, and brand guidelines that earn recognition — not just attention." },
    { num: "02", name: "Graphic Design", desc: "Posters, packaging, campaigns — visual output built with editorial precision and conceptual intent." },
    { num: "03", name: "Illustration", desc: "Custom illustration with a distinctive hand — for editorial, product, or brand storytelling." },
    { num: "04", name: "UI/UX Design", desc: "Interface design that reduces friction and converts — from flows to high-fidelity Figma prototypes." },
    { num: "05", name: "Presentation Design", desc: "Pitch decks and case studies designed to persuade, not just inform — for clients and investors." },
    { num: "06", name: "AI-Assisted Workflows", desc: "Faster delivery and smarter iteration using AI tools — without sacrificing the craft." }
  ];

  return (
    <section id="services" className="scroll-mt-16 px-[clamp(20px,4vw,40px)] py-[clamp(40px,8vw,80px)]">
      <div className="flex justify-between items-baseline mb-12 pb-5 border-b-[0.5px] border-border-subtle">
        <h2 className="font-display text-[clamp(32px,4vw,42px)] font-light text-ink">What I Do</h2>
        <span className="text-[11px] text-smoke tracking-[0.1em]">03 / Services</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.5px] bg-border-subtle border-[0.5px] border-border-subtle rounded overflow-hidden">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className="p-[clamp(24px,3vw,36px)] px-[clamp(20px,2.5vw,28px)] transition-colors duration-200 hover:bg-parchment bg-off-white"
          >
            <div className="font-display text-[clamp(32px,4vw,40px)] font-light text-black/5 mb-4">{service.num}</div>
            <div className="text-sm font-medium text-ink mb-2.5">{service.name}</div>
            <div className="text-xs text-smoke leading-[1.7]">{service.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
