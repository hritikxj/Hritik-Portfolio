import Reveal from './Reveal';

export default function Hero() {

  return (
    <section className="pt-10 md:pt-14 pb-12 md:pb-14 border-b-[0.5px] border-border-subtle">
      <div className="w-full px-5 md:px-12 lg:px-10">
        {/* Left column — text */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <h1 className="font-display text-[clamp(2.25rem,10vw,3rem)] md:text-[clamp(3rem,7vw,3.75rem)] lg:text-[68px] font-light leading-[1.05] tracking-[-0.01em] mb-6">
              I design brands and{' '}
              <em className="block italic text-brand-red md:inline">experiences.</em>
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-sm text-smoke leading-[1.8]">
              Multidisciplinary designer based in India, working globally.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
