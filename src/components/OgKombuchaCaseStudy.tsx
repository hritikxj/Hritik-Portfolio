import Image from '@/components/PortfolioImage';
import ProjectNav from './ProjectNav';
import ProjectSummary from './ProjectSummary';
import ProjectFooter from './ProjectFooter';
import styles from './OgKombuchaCaseStudy.module.css';

const media = '/case-studies/og-kombucha';

const studies = [
  {
    file: 'layout-study',
    title: 'Fit the label to the bottle',
    copy: 'I compared a separate neck label, one continuous wrap, and a dedicated panel above the wordmark. The raised panel gives the flavour illustration its own space.',
    alt: 'Three bottle drawings comparing separate labels, a continuous wrap, and a raised panel above the wordmark',
    width: 1500,
    height: 1056,
  },
  {
    file: 'colour-study',
    title: 'Find the right shade for Peach',
    copy: 'Bright coral, saturated apricot, and deep peach-red were tested on the same bottle so I could compare them with the cream front panel in place.',
    alt: 'Three Peach label mockups side by side in bright coral, saturated apricot, and deep peach-red',
    width: 1500,
    height: 1056,
  },
  {
    file: 'radial-study',
    title: 'Choose where the rays belong',
    copy: 'I tried the sunburst behind the wordmark and behind the butterfly to see where it would support the label’s hierarchy.',
    alt: 'Two Peach bottles comparing sunburst rays behind the wordmark and behind the butterfly',
    width: 1350,
    height: 1013,
  },
  {
    file: 'benefit-study',
    title: 'Set the supporting copy',
    copy: 'I compared bold type, a filled band, and a thin frame for the same line of product copy.',
    alt: 'Three Peach labels comparing bold type, a filled band, and an outlined frame',
    width: 1400,
    height: 1050,
  },
];

const flavours = [
  { file: 'peach', name: 'Peach', alt: 'Coral and cream Peach label with a butterfly on the raised panel' },
  { file: 'cranberry', name: 'Cranberry', alt: 'Burgundy and cream Cranberry label with a fox on the raised panel' },
  { file: 'lemon-ginger', name: 'Lemon & Ginger', alt: 'Yellow and cream Lemon and Ginger label with a stag on the raised panel' },
];

export default function OgKombuchaCaseStudy({ summary }: { summary: string }) {
  return (
    <div className={styles.tokens}>
    <ProjectNav adaptive />
    <main id="main-content" tabIndex={-1} className={`${styles.page} page-enter`}>

      <header className={styles.shell}>
        <div className={styles.intro}>
          <div>
            <p className={styles.kicker}>Packaging design</p>
            <h1>OG Kombucha</h1>
          </div>
          <p>{summary}</p>
        </div>
        <ProjectSummary link="/work/og-kombucha" className={styles.summary} />
        <figure>
          <Image className={styles.hero} src={`${media}/still-life.webp`} alt="Two Peach OG Kombucha bottles on stone blocks with peaches against a warm peach backdrop" width={1536} height={1024} sizes="(max-width: 1300px) 92vw, 1200px" loading="eager" fetchPriority="high" />
          <figcaption className={styles.caption}>Peach · Packaging mockup</figcaption>
        </figure>
      </header>

      <section className={`${styles.shell} ${styles.section}`} aria-labelledby="og-process">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Design process</p>
          <h2 id="og-process">How the label took shape</h2>
        </div>
        <div className={styles.studyGrid}>
          {studies.map(study => (
            <figure key={study.file} className={styles.study}>
              <div className={styles.studyMedia}>
                <Image src={`${media}/${study.file}.webp`} alt={study.alt} width={study.width} height={study.height} sizes="(max-width: 720px) 92vw, 570px" />
              </div>
              <figcaption>
                <h3>{study.title}</h3>
                <p>{study.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.range} aria-labelledby="og-range">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Illustrator artwork</p>
            <h2 id="og-range">One label system, three flavours</h2>
            <p>The raised panel changes character with each flavour. The cream panel, circular wordmark treatment, and information layout carry through the range.</p>
          </div>
          <div className={styles.flavours}>
            {flavours.map(flavour => (
              <figure key={flavour.file}>
                <Image src={`${media}/${flavour.file}-artwork.webp`} alt={flavour.alt} width={940} height={955} sizes="(max-width: 610px) 92vw, 380px" />
                <figcaption>{flavour.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section} ${styles.campaign}`} aria-labelledby="og-campaign">
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Campaign mockup</p>
          <h2 id="og-campaign">Peach in motion</h2>
          <p>A splash concept tests how the cream field and coral shoulder read against a more saturated backdrop.</p>
        </div>
        <Image src={`${media}/peach-splash.webp`} alt="Peach OG Kombucha bottle framed by peach slices and a splash of amber liquid" width={1020} height={1275} sizes="(max-width: 720px) 92vw, 610px" />
      </section>

    </main>
    <ProjectFooter current="/work/og-kombucha" />
    </div>
  );
}
