import Image from '@/components/PortfolioImage';
import ProjectNav from './ProjectNav';
import ProjectSummary from './ProjectSummary';
import AppVideo from './AppVideo';
import ProjectFooter from './ProjectFooter';
import AppBuildDetails from './AppBuildDetails';
import styles from './FinoCaseStudy.module.css';

const shortcuts = [
  { title: 'In the gallery', keys: [
    ['Space', 'Open the selected image'],
    ['⌘ ↑ / ⌘ ↓', 'Switch source folders'],
    ['⌘ ,', 'Open grid and filter options'],
    ['L', 'Favourite the selected image'],
    ['⌘ G', 'Search the selected image with Google Lens'],
  ] },
  { title: 'In image preview', keys: [
    ['← / →', 'Preview the previous or next image'],
    ['Z', 'Toggle between zoom and fit'],
    ['+ / −', 'Zoom in or out'],
    ['G', 'Search the open image with Google Lens'],
    ['Esc', 'Close the preview'],
  ] },
];

const comparison = [
  {
    title: 'Build a cross-project reference library',
    finder: 'Browse folders and drives using Icon or Gallery view.',
    fino: 'Add multiple source folders to one gallery, or jump directly to a single source. The originals stay in place.',
  },
  {
    title: 'Find an image by its palette',
    finder: 'Search using a filename, kind, tag, or other file information.',
    fino: 'Filter the gallery by a colour in the artwork when you remember a palette better than a filename.',
  },
  {
    title: 'Follow a visual lead',
    finder: 'Use Gallery view or Quick Look to inspect files as you browse.',
    fino: 'Open an image, zoom into a detail, and search for visual matches with Google Lens from the preview.',
  },
];

const media = '/case-studies/fino';

export default function FinoCaseStudy({ summary, stack }: { summary: string; stack?: readonly string[] }) {
  return (
    <div className={styles.tokens}>
    <ProjectNav adaptive />
    <main id="main-content" tabIndex={-1} className={`${styles.page} page-enter`}>
      <div className={styles.hero}>

        <header className={styles.shell}>
          <div className={styles.intro}>
            <div>
              <p className={styles.eyebrow}>Product design &amp; development · macOS</p>
              <h1>Fino</h1>
            </div>
            <div>
              <p className={styles.lede}>{summary}</p>
            </div>
          </div>
          <figure className={styles.heroFigure}>
            <AppVideo name="fino" label="Fino in use: browsing a gallery, filtering by colour and previewing a painting" />
          </figure>
          <ProjectSummary link="/work/fino" className={styles.summary} />
          {stack && <AppBuildDetails stack={stack} />}

          <nav className={styles.jump} aria-label="On this page">
            <a href="#fino-gallery">Gallery</a>
            <a href="#fino-preview">Preview &amp; Lens</a>
            <a href="#fino-shortcuts">Shortcuts</a>
            <a href="#fino-finder">Fino and Finder</a>
          </nav>
        </header>
      </div>

      <section className={`${styles.shell} ${styles.section}`} id="fino-gallery" aria-labelledby="fino-gallery-title">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.eyebrow}>The gallery</p>
            <h2 id="fino-gallery-title">Find the image you remember.</h2>
          </div>
          <p>I built Fino for the moment you can picture a reference but can’t recall where you saved it. It brings files from selected folders and drives into a single image-first gallery.</p>
        </div>
        <div className={styles.featureGrid}>
          <figure className={styles.feature}>
            <div className={`${styles.featureStage} ${styles.folderStage}`}>
              <Image src={`${media}/folder-control.webp`} alt="Fino’s top-left toolbar showing the selected Van Gogh folder and its image count" width={1080} height={614} sizes="(max-width: 760px) 90vw, 540px" />
            </div>
            <figcaption>
              <h3>Switch folders from the toolbar</h3>
              <p>Click the folder name to choose a source or view all your added folders together. Press <kbd>⌘ ↑</kbd> or <kbd>⌘ ↓</kbd> to step through sources from the keyboard.</p>
            </figcaption>
          </figure>
          <figure className={styles.feature}>
            <div className={`${styles.featureStage} ${styles.filterStage}`}>
              <Image src={`${media}/filter-panel.webp`} alt="Fino’s open grid options showing thumbnail size, colour swatches, sorting, and file-type filters" width={1080} height={614} sizes="(max-width: 760px) 90vw, 540px" />
            </div>
            <figcaption>
              <h3>Filter by colour or file type</h3>
              <p>Open the top-right grid controls to narrow a collection by colour or file type. Adjust thumbnail size and choose square crops or original proportions while you browse.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.previewSection} id="fino-preview" aria-labelledby="fino-preview-title">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>Image preview</p>
              <h2 id="fino-preview-title">Get closer to a reference.</h2>
            </div>
            <p>Press <kbd>Space</kbd> to open an image, then use the arrow keys to move between references. Press <kbd>Z</kbd> to zoom in on details or fit the image back into the window.</p>
          </div>
          <figure className={styles.previewFigure}>
            <Image className={styles.window} src={`${media}/image-preview.webp`} alt="A Van Gogh painting of a young woman in a wheat field open in Fino’s full image preview" width={1440} height={923} sizes="(max-width: 740px) 92vw, 1050px" />
            <figcaption>Young Peasant Girl in a Straw Hat Sitting in Front of a Wheatfield · Vincent van Gogh</figcaption>
          </figure>
          <div className={styles.lens}>
            <div className={styles.lensCopy}>
              <p className={styles.eyebrow}>Google Lens</p>
              <h3>Follow the image back to the web.</h3>
              <p>Press <kbd>G</kbd> with an image open or <kbd>⌘ G</kbd> with a gallery image selected. Google Lens opens inside Fino, where you can look for visual matches and pages that use the image.</p>
              <p>Close Lens to return to your reference. The search needs an internet connection and sends the selected image to Google.</p>
              <a className={styles.source} href="https://support.google.com/websearch/answer/1325808">How Google Lens works <span aria-hidden="true">↗</span></a>
            </div>
            <figure className={styles.lensFigure}>
              <Image className={styles.window} src={`${media}/lens-search.webp`} alt="Google Lens open inside Fino with the wheat field painting selected for visual search" width={1160} height={799} sizes="(max-width: 760px) 90vw, 570px" />
            </figure>
          </div>
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section}`} id="fino-shortcuts" aria-labelledby="fino-shortcuts-title">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.eyebrow}>Keyboard shortcuts</p>
            <h2 id="fino-shortcuts-title">Stay with the work.</h2>
          </div>
          <p>Move through folders, compare images, and save a favourite without losing your place in the gallery.</p>
        </div>
        <div className={styles.shortcutGrid}>
          {shortcuts.map(group => (
            <div className={styles.shortcutGroup} key={group.title}>
              <h3>{group.title}</h3>
              <dl>
                {group.keys.map(([keys, action]) => (
                  <div key={keys}><dt>{action}</dt><dd><kbd>{keys}</kbd></dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.finder} id="fino-finder" aria-labelledby="fino-finder-title">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>Fino and Finder</p>
              <h2 id="fino-finder-title">Built around visual references.</h2>
            </div>
            <p>Finder handles everyday file management. Fino gives artists, designers, and photographers a dedicated place to gather, scan, and investigate images across projects.</p>
          </div>
          <div className={styles.comparison}>
            {comparison.map(row => (
              <div className={styles.compareRow} key={row.title}>
                <h3>{row.title}</h3>
                <dl><div><dt>Finder</dt><dd>{row.finder}</dd></div><div><dt>Fino</dt><dd>{row.fino}</dd></div></dl>
              </div>
            ))}
          </div>
          <a className={styles.source} href="https://support.apple.com/en-gb/guide/mac-help/mchldaafb302/mac">Apple’s guide to Finder views <span aria-hidden="true">↗</span></a>
        </div>
      </section>

    </main>
    <ProjectFooter current="/work/fino" />
    </div>
  );
}
