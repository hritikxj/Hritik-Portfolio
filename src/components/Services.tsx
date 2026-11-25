import Reveal from './Reveal';

const services = [
  { name: 'Brand Identity', desc: 'Logo systems, visual identities and guidelines that hold together from the favicon to the shelf.', examples: 'Clarity Labs · Dash · Purr Pantry' },
  { name: 'Packaging', desc: 'Labels, pouches and cartons where illustration and hierarchy do the selling.', examples: 'OG Kombucha · Clarity Labs' },
  { name: 'Illustration', desc: 'A distinctive hand for editorial work, characters, covers and brand storytelling.', examples: 'Byraam Realty · Ghalib' },
  { name: 'UI/UX Design', desc: 'Flows and interfaces that remove friction, from research to high-fidelity prototypes.', examples: 'Nothing · Seekh Saathi' },
  { name: 'Design + Build', desc: 'I design apps and ship working builds with AI coding tools, in Swift, Kotlin and for the web.', examples: 'Fino · Farebird · Typehaus' },
  { name: 'Social & Campaigns', desc: 'Launch, retail and event creatives, plus campaign concepts with a point of view.', examples: 'Social Media Creatives · Dove' },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-16 py-16 md:py-24">
      <div className="page-container">
        <Reveal className="mb-10 border-b-[0.5px] border-border-subtle pb-6 md:mb-12">
          <p className="eyebrow text-smoke">03 · Services</p>
          <h2 id="services-title" className="section-title mt-3">What I do</h2>
        </Reveal>

        <Reveal as="ol" className="grid list-none grid-cols-1 gap-px overflow-hidden rounded-lg border-[0.5px] border-border-subtle bg-border-subtle md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.name}
              className="bg-off-white p-7 transition-colors duration-500 hover:bg-parchment/70 md:p-9"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-medium text-smoke tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">{service.name}</h3>
              </div>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.7] text-smoke">{service.desc}</p>
              <p className="mt-4 text-[12.5px] text-smoke">{service.examples}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
