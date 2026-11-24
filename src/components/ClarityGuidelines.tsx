import Image from 'next/image';
import styles from './ClarityGuidelines.module.css';

const asset = '/case-studies/clarity-labs';
const pdf = `${asset}/brand-guidelines.pdf`;
const pages = [
  'Cover',
  'Wordmark',
  'Logo clear space',
  'Colour palette',
  'Primary typeface · DM Sans',
  'Secondary typeface · Archivo Black',
  'Approved logo variations',
  'Monochrome logo',
  'Icon set',
  'Brand pattern',
  'Browser favicon',
  'Logomark pins',
  'Wordmark pins',
  'Apparel',
  'SWITCH bottle mockups',
  'SWITCH bottle in context',
];

export default function ClarityGuidelines() {
  return (
    <section className={styles.section} aria-labelledby="clarity-guidelines">
      <header className={styles.header}>
        <div>
          <h2 id="clarity-guidelines">Complete brand guidelines</h2>
          <p>All {pages.length} pages, from logo construction and typography to the identity on packaging.</p>
        </div>
        <a href={pdf}>Read the full PDF <span aria-hidden="true">↗</span> <small>15 MB</small></a>
      </header>
      <ol className={styles.pages}>
        {pages.map((title, index) => {
          const page = index + 1;
          const number = String(page).padStart(2, '0');

          return (
            <li key={title}>
              <a href={`${pdf}#page=${page}`}>
                <Image
                  src={`${asset}/guidelines/page-${number}.webp`}
                  alt=""
                  width={1280}
                  height={720}
                  sizes="(max-width: 680px) 92vw, (max-width: 1500px) 45vw, 670px"
                />
                <span><span className={styles.number}>Page {number}</span>{title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
