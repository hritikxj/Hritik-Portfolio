import type { Metadata } from 'next';
import Image from '@/components/PortfolioImage';
import ProjectNav from '@/components/ProjectNav';
import ProjectFooter from '@/components/ProjectFooter';
import ProjectIntro from '@/components/ProjectIntro';
import ProjectSummary from '@/components/ProjectSummary';
import AppVideo from '@/components/AppVideo';
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
  const title = `${study.title}, ${study.discipline}`;
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
      <ProjectNav />
      <main id="main-content" className={`${styles.page} ${style} page-enter`} tabIndex={-1}>
        <header className={styles.hero}>
          <ProjectIntro
            eyebrow={study.discipline}
            title={study.title}
            lede={study.summary}
            accent="var(--accent)"
            muted="var(--color-smoke)"
          />
          {study.video ? <AppVideo name={study.video.name} label={study.video.label} /> : (
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
          )}
          <ProjectSummary link={`/work/${study.slug}`} className="mt-10 md:mt-14" />
          {study.stack && <div className={styles.build}><AppBuildDetails stack={study.stack} /></div>}
        </header>
        <div className={styles.body}>
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
        </div>
      </main>
      <ProjectFooter current={`/work/${study.slug}`} />
    </>
  );
}
