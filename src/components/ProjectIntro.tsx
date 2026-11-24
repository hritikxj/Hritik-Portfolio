type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  meta?: string;
  /** Accessible accent for the eyebrow; must reach 4.5:1 on the page colour. */
  accent: string;
  /** Muted text colour for the lede and meta line. */
  muted: string;
};

/** Shared opening for every case study: label, title, one-sentence brief. */
export default function ProjectIntro({ eyebrow, title, lede, meta, accent, muted }: Props) {
  return (
    <div className="mb-10 w-full md:mb-14 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:gap-12">
      <div>
        <p className="eyebrow" style={{ color: accent }}>{eyebrow}</p>
        <h1 className={`mt-4 font-display font-semibold leading-[0.95] tracking-[0.01em] [overflow-wrap:break-word] ${title.length > 14 ? 'text-[clamp(2.4rem,6.6vw,5.25rem)]' : 'text-[clamp(2.9rem,8vw,6.5rem)]'}`}>
          {title}
        </h1>
      </div>
      <div className="mt-6 md:mt-0 md:pb-2">
        <p className="max-w-[36ch] text-[17px] leading-[1.6] md:text-[19px]" style={{ color: muted }}>{lede}</p>
        {meta && <p className="mt-3 text-[15px]" style={{ color: muted }}>{meta}</p>}
      </div>
    </div>
  );
}
