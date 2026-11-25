type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Accessible accent for the eyebrow; must reach 4.5:1 on the page colour. */
  accent: string;
  /** Muted text colour for the lede. */
  muted: string;
};

// Long titles step down. A long single word (e.g. #TheRealGrowth) steps down
// further, so it never has to break mid-word in the narrower title column.
function size(title: string) {
  const longestWord = Math.max(...title.split(/\s+/).map(word => word.length));
  if (longestWord > 12) return 'text-[clamp(2rem,1.4rem+2.6vw,3.5rem)]';
  if (title.length > 14) return 'text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]';
  return 'text-[length:var(--type-title)]';
}

/**
 * Shared opening for every case study: label, title, one-sentence brief.
 * On wide screens it sits on the same four columns as the project summary: the title takes the first two,
 * the description the last two, so both edges line up with the visual and the summary below, and the
 * description's last line rests on the title's baseline. Justified, its lines meet that right edge too.
 */
export default function ProjectIntro({ eyebrow, title, lede, accent, muted }: Props) {
  return (
    <div className="mb-8 w-full md:mb-10 xl:grid xl:grid-cols-4 xl:items-end xl:gap-x-8 xl:[align-items:last_baseline]">
      <div className="xl:col-span-2">
        <p className="eyebrow" style={{ color: accent }}>{eyebrow}</p>
        <h1 className={`mt-4 font-display font-semibold leading-[0.95] tracking-[0.02em] [overflow-wrap:break-word] ${size(title)}`}>
          {title}
        </h1>
      </div>
      <div className="mt-6 xl:col-span-2 xl:mt-0">
        <p className="type-lead max-w-[42ch] xl:max-w-none xl:text-justify xl:hyphens-auto" style={{ color: muted }}>{lede}</p>
      </div>
    </div>
  );
}
