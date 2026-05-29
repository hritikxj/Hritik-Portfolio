import Reveal from './Reveal';

export default function About() {

  return (
    <section id="about" className="scroll-mt-16 py-10 md:py-16 lg:py-20 border-y-[0.5px] border-border-subtle">
      <div className="w-full px-5 md:px-12 lg:px-10">
        <Reveal>
          <div className="flex justify-between items-baseline mb-12 pb-5 border-b-[0.5px] border-border-subtle">
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink">About</h2>
            <span className="text-[11px] text-smoke tracking-[0.1em]">02 / About</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <Reveal delay={0.2} className="h-full">
            <div
              className="aspect-square lg:aspect-[4/3] bg-parchment rounded relative flex items-end p-5 h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/me_thumb.jpg')" }}
            >
              <a
                href="https://instagram.com/hritikjasnani"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-off-white px-4 py-2.5 rounded-sm text-xs text-ink cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:bg-white no-underline inline-block"
              >
                Hritik Jasnani · @hritikjasnani
              </a>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="font-display text-3xl md:text-4xl font-light leading-[1.3] mb-7">
                I think like an inventor.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-smoke leading-[1.9] mb-5">
                Communication Design student, but I&apos;ve been building things long before formal education. My instinct is always toward systems: how visual identities hold together, how a user feels before they think.
              </p>
              <p className="text-sm text-smoke leading-[1.9] mb-5">
                I work across brand identity, illustration, and UI/UX, not as separate skills, but as one language.
              </p>
              <p className="text-sm text-smoke leading-[1.9] mb-5">
                Driven by a childhood ambition to become a scientist. I found design — a field where thinking and making are the same act.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
