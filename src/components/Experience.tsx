import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';

type Role = {
  role: string;
  company: string;
  type: 'Freelance' | 'Full-time' | 'Internship';
  time: string;
  logo: string;
  /** A case study in this portfolio that came out of the role. */
  project?: string;
};

const roles: Role[] = [
  { role: 'Packaging Designer', company: 'BOOHZ', type: 'Freelance', time: 'Sep to Oct 2026', logo: 'boohz' },
  { role: 'Graphic Designer', company: 'SALT Media Agency', type: 'Freelance', time: 'Jul to Sep 2026', logo: 'salt' },
  { role: 'Brand & Packaging Designer', company: 'Clarity Labs', type: 'Freelance', time: 'May to Aug 2026', logo: 'clarity-labs', project: '/work/clarity-labs' },
  { role: 'Graphic Illustrator', company: 'Byraam Realty', type: 'Freelance', time: 'Jul 2026', logo: 'byraam', project: '/work/byraam-realty' },
  { role: 'Graphic Systems Designer', company: 'INNOSTAA', type: 'Freelance', time: 'Jan to Feb 2026', logo: 'innostaa' },
  { role: 'Brand Assistant', company: 'BlumeLife', type: 'Full-time', time: 'Jul to Oct 2025', logo: 'blumelife', project: '/social-media-creatives' },
  { role: 'Industrial Designer', company: 'Vidohum', type: 'Internship', time: 'Jun 2025', logo: 'vidohum' },
  { role: 'Community Edition Contributor', company: 'Nothing', type: 'Freelance', time: 'Apr 2025', logo: 'nothing', project: '/nothing' },
  { role: 'Sketch Artist', company: 'Instagram', type: 'Freelance', time: '2018 to 2023', logo: 'instagram' },
];

// logo · role · company · type · dates · action
const columns = 'lg:grid lg:grid-cols-[48px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,0.8fr)_128px] lg:items-center lg:gap-6';

function Row({ item }: { item: Role }) {
  const content = (
    <>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--color-border-subtle)] transition-transform duration-500 ease-out-soft group-hover:scale-105">
        <Image src={`/experience/${item.logo}.jpg`} alt="" fill sizes="44px" className="object-cover" />
      </span>

      <span className="min-w-0 flex-1 lg:contents">
        <span className="block font-display text-[19px] font-semibold leading-[1.2] text-ink lg:text-[21px]">{item.role}</span>
        <span className="mt-0.5 block text-[14px] text-smoke lg:mt-0 lg:text-ink">
          {item.company}
          <span className="lg:hidden"> · {item.type}</span>
        </span>
        <span className="hidden text-[13px] text-smoke lg:block">{item.type}</span>
        <span className="mt-0.5 block whitespace-nowrap text-[13px] tabular-nums text-smoke lg:mt-0">{item.time}</span>
        {item.project ? (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-ink/30 px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-off-white lg:mt-0 lg:justify-self-end">
            View project
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5">→</span>
          </span>
        ) : (
          <span aria-hidden="true" className="hidden lg:block" />
        )}
      </span>
    </>
  );

  const row = `group flex items-start gap-4 border-b-[0.5px] border-border-subtle px-1 py-5 no-underline lg:px-3 lg:py-4 ${columns}`;

  return item.project ? (
    <Link
      href={item.project}
      prefetch={false}
      className={`${row} rounded-sm transition-colors duration-300 hover:bg-off-white`}
      aria-label={`${item.role} at ${item.company}, ${item.time}, view project`}
    >
      {content}
    </Link>
  ) : (
    <div className={row}>{content}</div>
  );
}

export default function Experience() {
  return (
    <div className="mt-20 md:mt-24">
      <Reveal className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-smoke">Experience</p>
          <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[0.012em] text-ink">
            Where I’ve worked
          </h3>
        </div>
        <p className="max-w-[36ch] text-[14px] leading-[1.6] text-smoke">
          Brands, agencies and studios, from packaging and identity to product.
        </p>
      </Reveal>

      <Reveal>
        <div aria-hidden="true" className={`hidden lg:grid border-b-[0.5px] border-ink/25 px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke ${columns}`}>
          <span />
          <span>Role</span>
          <span>Company</span>
          <span>Type</span>
          <span>When</span>
          <span />
        </div>
        <ul className="list-none border-t-[0.5px] border-border-subtle lg:border-t-0">
          {roles.map(item => (
            <li key={`${item.company}-${item.role}`}>
              <Row item={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
