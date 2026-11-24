import type { Metadata } from 'next';
import Image from '@/components/PortfolioImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppBuildDetails from '@/components/AppBuildDetails';
import ClarityGuidelines from '@/components/ClarityGuidelines';
import FinoCaseStudy from '@/components/FinoCaseStudy';
import OgKombuchaCaseStudy from '@/components/OgKombuchaCaseStudy';
import ProjectStructuredData from '@/components/ProjectStructuredData';
import { caseStudies } from '@/content/case-studies';
import styles from './study.module.css';

type Props = { params: Promise<{ project: string }> };

function findStudy(project: string) {
  return caseStudies.find(study => study.slug === project) ?? notFound();
}

function asset(slug: string, file: string) {
  return `/case-studies/${slug}/${file}`;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(study => ({ project: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = findStudy((await params).project);
  const title = `${study.title} — ${study.discipline}`;
  const description = study.summary;
  const url = `/work/${study.slug}`;
  const cover = asset(study.slug, study.cover ?? 'cover.webp');
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: cover, width: 900, height: 675, alt: `${study.title} project preview` }] },
    twitter: { card: 'summary_large_image', title, description, images: [cover] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = findStudy((await params).project);
  if (study.slug === 'fino' || study.slug === 'og-kombucha') {
    return (
      <>
        <ProjectStructuredData title={study.title} description={study.summary} path={`/work/${study.slug}`} />
        {study.slug === 'fino'
          ? <FinoCaseStudy summary={study.summary} stack={study.stack} />
          : <OgKombuchaCaseStudy summary={study.summary} />}
      </>
    );
  }

  const style = styles[study.theme];
  const heroImages = study.companion ? [study.hero, study.companion] : [study.hero];
  const phoneMockup = study.theme === 'pine' || study.theme === 'mobile';

  return (
    <>
      <ProjectStructuredData title={study.title} description={study.summary} path={`/work/${study.slug}`} />
      <main id="main-content" className={`${styles.page} ${style}`} tabIndex={-1}>
        <nav className={styles.nav} aria-label="Portfolio">
          <Link href="/">Back to portfolio</Link>
          <span>Hritik Jasnani</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.intro}>
            <p className={styles.discipline}>{study.discipline}</p>
            <h1>{study.title}</h1>
            <p className={styles.summary}>{study.summary}</p>
            <p className={styles.format}>{study.format}</p>
            {study.stack && <AppBuildDetails stack={study.stack} />}
          </div>
          <div className={styles.stage}>
            {heroImages.map((image, index) => (
              <Image
                key={image.file}
                src={asset(study.slug, image.file)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={study.hero.width > study.hero.height ? '(max-width: 960px) 90vw, 1200px' : '(max-width: 720px) 43vw, 420px'}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            ))}
          </div>
        </header>
        <div className={styles.body}>
          <p className={styles.contribution}>{study.contribution}</p>
          {study.slug === 'clarity-labs' && <ClarityGuidelines />}
          {study.features.length > 0 && (
            <div className={styles.features}>
              {study.features.map(({ title, copy, artwork }) => (
                <figure className={styles.feature} key={title}>
                  <div className={styles.figureMedia}>
                    <Image
                      src={asset(study.slug, artwork.file)}
                      alt={artwork.alt}
                      width={artwork.width}
                      height={artwork.height}
                      sizes={phoneMockup ? '(max-width: 720px) 67vw, 240px' : '(max-width: 800px) 90vw, 660px'}
                    />
                  </div>
                  <figcaption>
                    <h2>{title}</h2>
                    <p>{copy}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {study.note && <p className={styles.note}>{study.note}</p>}
          <nav className={styles.related} aria-label="More portfolio work">
            <h2>More work</h2>
            {caseStudies.filter(other => other.slug !== study.slug).map(other => (
              <Link prefetch={false} href={`/work/${other.slug}`} key={other.slug}>{other.title}</Link>
            ))}
            <Link href="/?category=selected#work">View selected work</Link>
          </nav>
        </div>
      </main>
    </>
  );
}
