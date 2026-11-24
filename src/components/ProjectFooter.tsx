import Link from 'next/link';
import Image from '@/components/PortfolioImage';
import { nextProject } from '@/content/projects';
import HireButton from './HireButton';

/** Shared ending for every case study: the next project and a contact path. */
export default function ProjectFooter({ current }: { current: string }) {
  const next = nextProject(current);

  return (
    <footer className="border-t-[0.5px] border-white/10 bg-band font-body text-band-fg">
      <div className="page-container pt-16 pb-8 md:pt-24">
        <p className="eyebrow text-band-muted">Next project</p>
        <Link
          href={next.link}
          prefetch={false}
          className="group mt-6 grid items-center gap-6 border-b-[0.5px] border-white/15 pb-12 no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-12 md:pb-16"
        >
          <div>
            <p className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[0.95] tracking-[0.01em] transition-colors duration-500 group-hover:text-band-soft">
              {next.title}
              <span aria-hidden="true" className="ml-3 inline-block text-[0.5em] transition-transform duration-500 ease-out-soft group-hover:translate-x-2">→</span>
            </p>
            <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-band-soft">{next.blurb}</p>
            <p className="eyebrow mt-4 text-[11px] text-band-muted">{next.discipline}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
            <Image
              src={next.image}
              alt=""
              fill
              className="object-cover transition-transform duration-[1.1s] ease-out-soft motion-safe:group-hover:scale-[1.04]"
              sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[22ch] font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[0.012em]">
            Have a project in mind? <span className="text-band-muted">Let’s talk.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <HireButton className="cursor-pointer rounded-full bg-band-fg px-6 py-3.5 text-[14px] font-medium text-band transition-colors duration-300 hover:bg-white">
              Start a project →
            </HireButton>
            <Link href="/" className="rounded-full border border-white/25 px-6 py-3.5 text-[14px] text-band-fg no-underline transition-colors duration-300 hover:border-white">
              All work
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t-[0.5px] border-white/15 pt-6 text-[12.5px] text-band-muted sm:flex-row">
          <span className="font-display text-[16px] font-semibold text-band-soft">Hritik Jasnani</span>
          <span>© 2026 · Brand, illustration &amp; product design</span>
        </div>
      </div>
    </footer>
  );
}
