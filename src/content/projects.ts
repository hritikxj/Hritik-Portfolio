import { caseStudies } from './case-studies';

export type ProjectSection = 'Branding' | 'UI/UX' | 'Illustrations';

export type Project = {
  title: string;
  discipline: string;
  blurb: string;
  section: ProjectSection;
  image: string;
  link: string;
  /** Designed and built as a working app. */
  built?: boolean;
};

const blurbs: Record<string, string> = {
  'clarity-labs': 'Brand guidelines and SWITCH supplement packaging.',
  'og-kombucha': 'A label system for three kombucha flavours.',
  fino: 'A macOS reference browser for creative people.',
  farebird: 'An Android app that watches bus fares for you.',
  typehaus: 'A macOS font browser for comparing type in context.',
  fileshuttle: 'Copy or move files between two phones over USB.',
  'digital-buddy': 'An on-device AI companion for Android.',
  'seekh-saathi': 'Quick reading and maths checks for classroom teachers.',
  'ajji-kairuchi': 'Character illustration for a chakli packaging series.',
  'byraam-realty': 'An illustrated panorama of everyday Bengaluru.',
};

const legacy: Project[] = [
  {
    title: 'Purr Pantry',
    discipline: 'Brand identity',
    blurb: 'A warm, premium identity for a cat-food brand.',
    section: 'Branding',
    image: '/Purthumbnail.jpg',
    link: '/purr-pantry',
  },
  {
    title: 'Dove #TheRealGrowth',
    discipline: 'Campaign concept',
    blurb: 'An academic campaign against body-hair stigma in India.',
    section: 'Branding',
    image: '/dove_thumb.jpg',
    link: '/dove',
  },
  {
    title: 'Dash',
    discipline: 'Brand identity · Guidelines',
    blurb: 'Identity and guidelines for 10-minute electronics delivery.',
    section: 'Branding',
    image: '/case-studies/dash/delivery-cover.webp',
    link: '/dash',
  },
  {
    title: 'Social Media Creatives',
    discipline: 'Social · Campaigns',
    blurb: 'Launch, retail and event creatives across six brands.',
    section: 'Branding',
    image: '/social_thumb.png',
    link: '/social-media-creatives',
  },
  {
    title: 'Nothing To-Do Widget',
    discipline: 'UI design · Nothing OS',
    blurb: 'A featured submission for Nothing Community Edition.',
    section: 'UI/UX',
    image: '/nothing_thumb.jpg',
    link: '/nothing',
  },
];

export const projects: readonly Project[] = [
  ...caseStudies.map(study => ({
    title: study.title,
    discipline: study.discipline,
    blurb: blurbs[study.slug] ?? study.summary,
    section: study.category,
    image: `/case-studies/${study.slug}/${study.cover ?? 'cover.webp'}`,
    link: `/work/${study.slug}`,
    built: Boolean(study.stack),
  })),
  ...legacy,
];

/** Curated order for the default “Selected” view; also drives next-project links. */
export const selectedLinks = [
  '/work/clarity-labs', '/work/fino', '/social-media-creatives',
  '/work/og-kombucha', '/work/farebird', '/dash',
  '/nothing', '/work/typehaus', '/purr-pantry',
] as const;

export const orderedProjects: readonly Project[] = [
  ...selectedLinks.flatMap(link => projects.filter(project => project.link === link)),
  ...projects.filter(project => !(selectedLinks as readonly string[]).includes(project.link)),
];

export function nextProject(link: string): Project {
  const index = orderedProjects.findIndex(project => project.link === link);
  return orderedProjects[(index + 1) % orderedProjects.length];
}
