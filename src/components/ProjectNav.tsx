import Link from 'next/link';
import HireButton from './HireButton';
import ThemeToggle from './ThemeToggle';

type Props = {
  /**
   * A fixed page colour for case studies that present a project's own palette.
   * Leave it out on pages that follow the visitor's light/dark theme.
   */
  background?: string;
  tone?: 'light' | 'dark';
};

export default function ProjectNav({ background, tone = 'light' }: Props) {
  const themed = !background;
  const dark = tone === 'dark';
  const style = themed
    ? { background: 'color-mix(in srgb, var(--color-off-white) 86%, transparent)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-ink)' }
    : {
        background: `color-mix(in srgb, ${background} 86%, transparent)`,
        borderColor: dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,26,26,0.12)',
        color: dark ? '#F5F6F3' : '#1A1A1A',
      };
  const button = themed
    ? 'bg-ink text-off-white hover:bg-ink/80'
    : dark ? 'bg-[#F5F6F3] text-[#1A1A1A] hover:bg-white' : 'bg-[#1A1A1A] text-[#F5F6F3] hover:bg-[#1A1A1A]/80';

  return (
    <header className="sticky top-0 z-50 border-b-[0.5px] backdrop-blur-md" style={style}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-ink focus:text-off-white focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to content
      </a>
      <nav aria-label="Project" className="page-container grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 font-body">
        <Link href="/" className="group inline-flex items-center gap-2 justify-self-start text-[13px] no-underline opacity-80 transition-opacity duration-300 hover:opacity-100">
          <span aria-hidden="true" className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">←</span>
          <span>Back to portfolio</span>
        </Link>
        <Link href="/" className="hidden font-display text-[17px] font-semibold leading-none no-underline sm:block" aria-label="Hritik Jasnani, home">
          Hritik Jasnani
        </Link>
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          {/* Pages in a project's own palette stay in that palette, so they get no switch. */}
          {themed && <ThemeToggle />}
          <HireButton className={`cursor-pointer rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${button}`}>
            Hire Me
          </HireButton>
        </div>
      </nav>
    </header>
  );
}
