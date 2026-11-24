import Reveal from './Reveal';
import Experience from './Experience';
import Image from '@/components/PortfolioImage';
import NextImage from 'next/image';

const stats = [
  { value: '16.9K+', label: 'Instagram community for my art and process' },
  { value: '100+', label: 'Commissioned portraits and concept sketches' },
  { value: '4.9M', label: 'Views on a single original reel' },
  { value: '8+', label: 'Apps designed and built from scratch to working' },
];

// Grouped loosely: design, image & motion, 3D, then building.
const tools = [
  { name: 'Figma', icon: 'figma' },
  { name: 'Framer', icon: 'framer' },
  { name: 'Illustrator', icon: 'illustrator' },
  { name: 'Photoshop', icon: 'photoshop' },
  { name: 'InDesign', icon: 'indesign' },
  { name: 'Procreate', icon: 'procreate' },
  { name: 'Premiere Pro', icon: 'premiere' },
  { name: 'Fusion 360', icon: 'fusion' },
  { name: 'Rhino 3D', icon: 'rhino' },
  { name: 'Plasticity', icon: 'plasticity' },
  { name: 'ZBrush', icon: 'zbrush' },
  { name: 'Blender', icon: 'blender' },
  { name: 'Antigravity', icon: 'antigravity' },
  { name: 'Claude Code', icon: 'claude' },
  { name: 'Codex', icon: 'codex' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-y-[0.5px] border-border-subtle bg-parchment/50 py-16 md:py-24">
      <div className="page-container">
        <Reveal className="mb-10 border-b-[0.5px] border-border-subtle pb-6 md:mb-14">
          <p className="eyebrow text-smoke">02 · About</p>
          <h2 id="about-title" className="section-title mt-3">A designer who builds</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-parchment sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/me_thumb.jpg"
                alt="Hritik Jasnani presenting at a podium"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) calc(100vw - 80px), 520px"
              />
              <a
                href="https://instagram.com/hritikjasnani"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 rounded-full bg-off-white/95 px-4 py-2 text-[13px] text-ink no-underline backdrop-blur-sm transition-colors duration-300 hover:bg-ink hover:text-off-white"
              >
                @hritikjasnani ↗
              </a>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-medium leading-[1.2] tracking-[0.012em] text-ink">
                I think like an inventor, <span className="text-smoke">systems first,</span> then the details that make people feel something.
              </p>
            </Reveal>
            <Reveal delay={80} className="mt-8 grid gap-5 text-[16px] leading-[1.75] text-smoke md:grid-cols-2 md:gap-8">
              <p>
                I’m a Communication Design student at Rishihood University (B.Des, 2024–28). As a kid I wanted to be a scientist; I found design instead, a field where thinking and making are the same act.
              </p>
              <p>
                I work across brand identity, illustration and UI/UX as one language. Lately I design apps and build working versions with AI coding tools, so ideas get tested in the hand, not just in Figma.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-10 grid grid-cols-2 border-t-[0.5px] border-border-subtle sm:grid-cols-4">
                {stats.map(stat => (
                  <div key={stat.value} className="border-b-[0.5px] border-border-subtle py-5 pr-4 sm:border-b-0">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-[36px] font-semibold leading-none tracking-[0.012em] text-ink">{stat.value}</dd>
                    <dd className="mt-2 text-[13px] leading-[1.45] text-smoke">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <h3 className="eyebrow text-ink">Tools</h3>
              <ul className="mt-4 flex flex-wrap gap-2 list-none">
                {tools.map(tool => (
                  <li
                    key={tool.name}
                    className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-ink/15 bg-off-white py-1 pl-1.5 pr-3.5 text-[13px] text-ink transition-colors duration-300 hover:border-ink/35"
                  >
                    <NextImage src={`/tools/${tool.icon}.webp`} alt="" width={24} height={24} unoptimized className="h-6 w-6" />
                    {tool.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Experience />
      </div>
    </section>
  );
}
