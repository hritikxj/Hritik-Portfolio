'use client';

import Link from 'next/link';
import { useWorkCategory, workCategories } from '@/hooks/useWorkCategory';
import { orderedProjects, selectedLinks, type Project } from '@/content/projects';
import Image from '@/components/PortfolioImage';

type Category = (typeof workCategories)[number];

function ProjectCard({ project, index, category }: {
  project: Project;
  index: number;
  category: Category;
}) {
  return (
    <Link
      href={project.link}
      prefetch={false}
      data-reveal=""
      style={{ '--reveal-delay': `${(index % 3) * 70}ms` } as React.CSSProperties}
      onClick={() => {
        try {
          // Scroll position is saved by ScrollMemory for every outgoing link.
          sessionStorage.setItem('portfolio-category', category);
        } catch { /* Navigation still works when storage is disabled. */ }
      }}
      className={`group block min-w-0 rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-parchment">
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover transition-transform duration-[1.1s] ease-out-soft motion-safe:group-hover:scale-[1.035]"
          sizes='(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc((100vw - 120px) / 3), 420px'
          loading={index < 2 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
        {project.built && (
          <span className="absolute left-3 top-3 rounded-full bg-off-white/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur-sm">
            Designed &amp; built
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[22px] font-semibold md:text-[19px] lg:text-[22px] leading-[1.15] text-ink">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-smoke">{project.blurb}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-subtle text-ink transition-all duration-500 ease-out-soft group-hover:border-ink group-hover:bg-ink group-hover:text-off-white"
        >
          <span className="transition-transform duration-500 ease-out-soft group-hover:-rotate-45">→</span>
        </span>
      </div>
      <p className="eyebrow mt-3 text-[11px] text-smoke">{project.discipline}</p>
    </Link>
  );
}

type Artwork = { src: string; alt: string; width: number; height: number; className: string; sizes: string };
type Group = { caption: string; detail: string; items: Artwork[]; /** Case study for this piece, if it has one. */ link?: string };

const art = (src: string, alt: string, width: number, height: number, className: string, sizes: string): Artwork =>
  ({ src: `/Illustration section/${src}`, alt, width, height, className, sizes });

const half = '(max-width: 767px) calc(100vw - 40px), 50vw';
const third = '(max-width: 767px) calc(100vw - 40px), 33vw';
const quarter = '(max-width: 767px) calc(50vw - 26px), 25vw';

const illustrationGroups: Group[] = [
  {
    caption: 'Byraam Realty',
    detail: 'Commissioned city panorama · Bengaluru',
    link: '/work/byraam-realty',
    items: [
      { src: '/case-studies/byraam-realty/panorama.webp', alt: 'Illustrated Bengaluru panorama with a glasshouse, temple, roadside café and flower stall', width: 1600, height: 800, className: 'col-span-2 md:col-span-12', sizes: '(max-width: 767px) calc(100vw - 40px), (max-width: 1360px) calc(100vw - 112px), 1248px' },
    ],
  },
  {
    caption: 'Cricket comic strip',
    detail: 'Sequential comic · final strip and process',
    items: [
      art('1.jpg', 'Cricket comic strip: a ball breaks a window and the neighbours react', 1410, 1000, 'col-span-2 md:col-span-6', half),
      art('1 process.jpg', 'Comic process: storyboards, line layouts and colour blocking', 1410, 1000, 'col-span-2 md:col-span-6', half),
    ],
  },
  {
    caption: 'Banaras & Samurai',
    detail: 'Editorial and character illustration',
    items: [
      art('2 banaras illustration.jpg', 'Editorial illustration of a ghat scene in Banaras', 710, 1000, 'col-span-2 md:col-span-6', half),
      art('3 samurai.jpg', 'Character illustration of a samurai in red and white', 710, 1000, 'col-span-2 md:col-span-6', half),
    ],
  },
  {
    caption: 'Love Secrets of Ghalib',
    detail: 'Book cover · line art, lettering and print mockups',
    items: [
      art('4 galib book cover illustration.jpg', 'Line-art illustration for the Ghalib poetry cover', 710, 1000, 'col-span-2 md:col-span-4', third),
      art('4 galib book cover .jpg', 'Final Love Secrets of Ghalib cover with custom lettering', 710, 1000, 'col-span-2 md:col-span-4', third),
      art('4 mockup 1.jpg', 'Printed Ghalib book cover mockup', 750, 1000, 'col-span-2 md:col-span-4', third),
    ],
  },
  {
    caption: 'Ajji KaiRuchi',
    detail: 'Character illustration',
    link: '/work/ajji-kairuchi',
    items: [
      art('5 ajji kairuchi brand illustration for their packaging.jpg', 'Ajji hugging her granddaughter, and Ajji at a wooden pestle and mortar, illustrated for Ajji KaiRuchi', 1200, 1000, 'col-span-2 md:col-span-12', '(max-width: 767px) calc(100vw - 40px), 100vw'),
    ],
  },
  {
    caption: 'Caricature for Vaibhav Kumaresh',
    detail: 'Hand-drawn portrait, presented in person',
    items: [
      art('6 caricature illustration for Vaibhav Kumaresh.jpg', 'Caricature of animation director Vaibhav Kumaresh', 710, 1000, 'col-span-2 md:col-span-4', third),
      art('6 Picture with Vaibhav Kumaresh.jpg', 'Hritik presenting the framed caricature to Vaibhav Kumaresh', 1500, 1000, 'col-span-2 md:col-span-8', '(max-width: 767px) calc(100vw - 40px), 66vw'),
    ],
  },
  {
    caption: 'Immortal Coffee',
    detail: 'Mascot illustration, signage and packaging',
    items: [
      art('7 illustration for immortal coffee.jpg', 'Line-art bull mascot sketch for Immortal Coffee', 750, 1000, 'col-span-1 md:col-span-3', quarter),
      art('7 illustration for immortal coffee 2.jpg', 'Red neon sign of the Immortal Coffee mascot', 750, 1000, 'col-span-1 md:col-span-3', quarter),
      art('7 illustration for immortal coffee mockup 1.jpg', 'Matte-black Immortal Coffee bag with gold details', 750, 1000, 'col-span-1 md:col-span-3', quarter),
      art('7 illustration for immortal coffee mockup 2.jpg', 'Close-up of gold foil on the Immortal Coffee bag', 750, 1000, 'col-span-1 md:col-span-3', quarter),
    ],
  },
];

function IllustrationGallery() {
  return (
    <div className="space-y-16 md:space-y-20">
      {illustrationGroups.map((group, index) => {
        const artwork = (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            {group.items.map(item => (
              <div key={item.src} className={`overflow-hidden rounded-lg bg-parchment ${item.className}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className={`block h-auto w-full ${group.link ? 'transition-transform duration-[1.1s] ease-out-soft motion-safe:group-hover:scale-[1.02]' : ''}`}
                  sizes={item.sizes}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        );
        const caption = (
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-[0.5px] border-border-subtle pt-3">
            <span className="font-display text-[20px] font-semibold leading-tight text-ink">{group.caption}</span>
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-smoke">
              {group.detail}
              {group.link && (
                <span className="inline-flex items-center gap-1.5 font-medium text-ink underline-offset-4 group-hover:underline">
                  View case study <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">→</span>
                </span>
              )}
            </span>
          </figcaption>
        );
        return (
          <figure key={group.caption} data-reveal="">
            {group.link ? (
              <Link
                href={group.link}
                prefetch={false}
                className="group block rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                aria-label={`${group.caption}: view case study`}
              >
                {artwork}
                {caption}
              </Link>
            ) : (
              <>
                {artwork}
                {caption}
              </>
            )}
          </figure>
        );
      })}
    </div>
  );
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useWorkCategory();
  // The heading names what the grid is showing.
  const headings: Record<typeof activeCategory, string> = {
    Selected: 'Selected work',
    Branding: 'Branding work',
    'UI/UX': 'UI/UX work',
    Illustrations: 'Illustrations',
  };

  const visible = activeCategory === 'Selected'
    ? orderedProjects.filter(project => (selectedLinks as readonly string[]).includes(project.link))
    : orderedProjects.filter(project => project.section === activeCategory);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 py-16 md:py-24">
      <div className="page-container">
        <div data-reveal="" className="mb-10 flex flex-col gap-6 border-b-[0.5px] border-border-subtle pb-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-smoke">01 · Work</p>
            <h2 id="work-title" className="section-title mt-3">{headings[activeCategory]}</h2>
          </div>

          <div
            role="group"
            aria-label="Filter work by category"
            className="grid w-full grid-cols-4 gap-1 rounded-full border border-border-subtle bg-parchment/60 p-1 md:flex md:w-fit"
          >
            {workCategories.map(category => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-1 py-2.5 text-[11px] min-[360px]:text-[12px] font-medium transition-colors duration-300 sm:px-5 sm:text-[13px] ${isActive ? 'bg-ink text-off-white' : 'text-smoke hover:text-ink'}`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Illustrations is one continuous gallery: pieces with a case study link to
            it, so there is no lone card followed by an empty row. */}
        {activeCategory === 'Illustrations' ? (
          <div key={activeCategory}>
            <IllustrationGallery />
          </div>
        ) : (
          <div key={activeCategory} className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.link}
                project={project}
                index={index}
                category={activeCategory}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
