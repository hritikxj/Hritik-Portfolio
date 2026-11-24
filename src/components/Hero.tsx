import Reveal from './Reveal';
import WorkRibbon from './WorkRibbon';

export default function Hero() {
  return (
    // The hero fills the first screen: the ribbon sits along the bottom edge and the
    // intro centres in the room above it. Short screens simply stack the two.
    <section aria-labelledby="hero-title" className="flex flex-col overflow-hidden border-b-[0.5px] border-border-subtle min-h-[calc(100svh-4rem)] pb-8 md:pb-10">
      <div className="hero-intro page-container flex flex-col items-center flex-1 justify-center pt-10 pb-10 text-center md:pt-14 md:pb-12">
        <Reveal>
          <h1
            id="hero-title"
            className="font-display font-semibold leading-[1.05] tracking-[0.01em] text-balance text-[clamp(2.125rem,8.4vw,2.75rem)] md:text-[clamp(2.75rem,4.4vw,3.75rem)] lg:whitespace-nowrap"
          >
            I design brands and{' '}
            <span className="text-smoke">experiences.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-[32rem] text-balance text-[15.5px] leading-[1.65] text-smoke md:text-[16.5px]">
            I’m Hritik, a multidisciplinary designer in India.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] text-off-white transition-colors duration-300 hover:bg-ink/80"
          >
            View selected work
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-[14px] text-ink transition-colors duration-300 hover:border-ink"
          >
            Get in touch
          </a>
        </Reveal>
      </div>

      {/* Not wrapped in Reveal: tiles fade in as they load, and the peek must show at once. */}
      <WorkRibbon />
    </section>
  );
}
