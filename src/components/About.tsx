export default function About() {
  const skills = [
    "Brand Identity Systems", "Visual Direction", "Editorial Illustration", 
    "UI/UX & Product Design", "Motion & Interaction", "AI-Assisted Workflows"
  ];

  return (
    <section id="about" className="scroll-mt-16 py-10 md:py-16 lg:py-20 border-y-[0.5px] border-border-subtle">
      <div className="w-full px-5 md:px-12 lg:px-10">
        <div className="flex justify-between items-baseline mb-12 pb-5 border-b-[0.5px] border-border-subtle">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink">About</h2>
        <span className="text-[11px] text-smoke tracking-[0.1em]">02 / About</span>
      </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div className="aspect-square lg:aspect-[4/3] bg-parchment rounded relative flex items-end p-5">
          <div className="bg-off-white px-4 py-2.5 rounded-sm text-xs text-ink">
            Hritik Jasnani · @hritikjasnani
          </div>
        </div>
        
        <div>
            <p className="font-display text-3xl md:text-4xl font-light leading-[1.3] mb-7">
            I think like an inventor.<br/>I design like a studio.
          </p>
          <p className="text-sm text-smoke leading-[1.9] mb-5">
            Communication Design student at Rishihood University — but I've been building things long before formal education. My instinct is always toward systems: how visual identities hold together, how a user feels before they think, how a brand earns trust before it speaks.
          </p>
          <p className="text-sm text-smoke leading-[1.9] mb-5">
            I work across brand identity, illustration, and UI/UX — not as separate skills, but as one language. My approach is grounded in editorial precision, a minimal philosophy inherited from Dieter Rams, and a personal obsession with how things are built.
          </p>
          <p className="text-sm text-smoke leading-[1.9] mb-5">
            Driven by a childhood ambition to become a scientist. I found design — a field where thinking and making are the same act.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-8 border-t-[0.5px] border-border-subtle">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-[13px] text-ink">
                <div className="w-1 h-1 bg-brand-red rounded-full shrink-0"></div>
                {skill}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
