'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import PortfolioImage from './PortfolioImage';

type Piece = {
  title: string;
  kind: string;
  src: string;
  href: string;
  /** Where to anchor the crop, so every tile can share one 4:3 shape. */
  focus?: string;
};

// Finished design work only. Every tile is the same 4:3 shape, and dark and light
// pieces alternate so the eye gets a steady rhythm instead of colour clumps.
const rows: Piece[][] = [
  [
    { title: 'Clarity Labs', kind: 'Packaging', src: '/case-studies/clarity-labs/cover.webp', href: '/work/clarity-labs' },
    { title: 'OG Kombucha', kind: 'Packaging', src: '/case-studies/og-kombucha/peach-cover.webp', href: '/work/og-kombucha' },
    { title: 'Fino', kind: 'macOS app', src: '/case-studies/fino/cover.webp', href: '/work/fino' },
    { title: 'Byraam Realty', kind: 'Illustration', src: '/case-studies/byraam-realty/detail.webp', href: '/work/byraam-realty' },
    { title: 'Nothing To-Do Widget', kind: 'UI design', src: '/nothing_thumb.jpg', href: '/nothing' },
    { title: 'Dash', kind: 'Brand guidelines', src: '/dash/dash-slide-1.png', href: '/dash', focus: '62% 50%' },
    { title: 'Ajji KaiRuchi', kind: 'Illustration', src: '/case-studies/ajji-kairuchi/cover.webp', href: '/work/ajji-kairuchi' },
    { title: 'Typehaus', kind: 'macOS app', src: '/case-studies/typehaus/cover.webp', href: '/work/typehaus' },
  ],
  [
    { title: 'Purr Pantry', kind: 'Brand identity', src: '/Purthumbnail.jpg', href: '/purr-pantry' },
    { title: 'Farebird', kind: 'Android app', src: '/case-studies/farebird/cover.webp', href: '/work/farebird' },
    { title: 'Social Media Creatives', kind: 'Campaigns', src: '/social_thumb.png', href: '/social-media-creatives' },
    { title: 'Clarity Labs', kind: 'Brand guidelines', src: '/case-studies/clarity-labs/brand-book.webp', href: '/work/clarity-labs', focus: '0% 50%' },
    { title: 'Dash', kind: 'Brand identity', src: '/case-studies/dash/delivery-cover.webp', href: '/dash' },
    { title: 'Purr Pantry', kind: 'Logo', src: '/purr/logo-1.png', href: '/purr-pantry' },
    { title: 'Seekh Saathi', kind: 'App design', src: '/case-studies/seekh-saathi/cover.webp', href: '/work/seekh-saathi' },
    { title: 'OG Kombucha', kind: 'Campaign still', src: '/case-studies/og-kombucha/peach-splash.webp', href: '/work/og-kombucha', focus: '50% 42%' },
  ],
];

// Pixels per second at rest, and how much page scrolling adds to it. Both rows
// drift the same way; the lower one a touch slower, for depth without conflict.
const BASE_SPEED = 19;
const SCROLL_BOOST = 0.35;
const ROW_SPEED = [1, 0.8];

function Tile({ piece, hidden }: { piece: Piece; hidden: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <li className="shrink-0">
      <Link
        href={piece.href}
        tabIndex={hidden ? -1 : undefined}
        className={`ribbon-tile group relative block aspect-[4/3] h-[var(--ribbon-h)] overflow-hidden rounded-[10px] bg-parchment`}
      >
        <PortfolioImage
          src={piece.src}
          alt={hidden ? '' : `${piece.title}, ${piece.kind}`}
          fill
          sizes="(min-width: 1024px) 360px, 240px"
          quality={75}
          loading="eager"
          fetchPriority="low"
          draggable={false}
          style={piece.focus ? { objectPosition: piece.focus } : undefined}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-[opacity,transform,filter] duration-[900ms] ease-out-soft group-hover:scale-[1.035] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <span className="ribbon-label pointer-events-none absolute bottom-2.5 left-2.5 rounded-full bg-off-white px-2.5 py-1 text-[11.5px] font-medium tracking-[0.02em] text-ink">
          {piece.title}
          <span className="text-smoke">{' · '}{piece.kind}</span>
        </span>
      </Link>
    </li>
  );
}

export default function WorkRibbon() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLUListElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tracks = trackRefs.current.filter((track): track is HTMLUListElement => Boolean(track));
    // Each track holds its set twice, so wrapping by half its width is seamless.
    const loops = tracks.map(track => track.scrollWidth / 2);
    // Start the lower row half a loop along, so the same project never stacks.
    const offsets = tracks.map((_, index) => (index % 2 ? -loops[index] * 0.5 : 0));
    const resize = new ResizeObserver(() => {
      tracks.forEach((track, index) => {
        loops[index] = track.scrollWidth / 2;
      });
    });
    tracks.forEach(track => resize.observe(track));

    let speed = 1;
    let target = 1;
    let boost = 0;
    let lastScroll = window.scrollY;
    let last = 0;
    let frame = 0;
    let visible = false;

    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(Math.abs(y - lastScroll) * SCROLL_BOOST, 18);
      lastScroll = y;
    };
    const hoverIn = () => { target = 0.15; };
    const hoverOut = () => { target = 1; };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const goal = pausedRef.current ? 0 : target;
      // Ease toward the goal speed so starts and stops never jolt.
      speed += (goal - speed) * Math.min(1, dt * 4);
      // Settle exactly, so a paused ribbon is truly still.
      if (Math.abs(goal - speed) < 0.01) speed = goal;
      boost *= Math.pow(0.04, dt);
      if (boost < 0.01) boost = 0;
      const step = (BASE_SPEED * speed + (pausedRef.current ? 0 : boost * 30)) * dt;
      if (step) tracks.forEach((track, index) => {
        const loop = loops[index];
        if (!loop) return;
        let offset = offsets[index] - step * (ROW_SPEED[index] ?? 1);
        if (offset <= -loop) offset += loop;
        if (offset > 0) offset -= loop;
        offsets[index] = offset;
        track.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;
      });
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only animate while the ribbon is on screen.
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    seen.observe(root);

    const onVisibility = () => {
      if (document.hidden) stop(); else if (visible) start();
    };

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      root.addEventListener('pointerenter', hoverIn);
      root.addEventListener('pointerleave', hoverOut);
    }
    root.addEventListener('focusin', hoverIn);
    root.addEventListener('focusout', hoverOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      seen.disconnect();
      resize.disconnect();
      root.removeEventListener('pointerenter', hoverIn);
      root.removeEventListener('pointerleave', hoverOut);
      root.removeEventListener('focusin', hoverIn);
      root.removeEventListener('focusout', hoverOut);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="work-ribbon">
      <div ref={rootRef} className="ribbon-mask grid gap-3.5 md:gap-5" aria-label="A glimpse of selected work" role="region">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="ribbon-row">
            <ul
              ref={element => { trackRefs.current[rowIndex] = element; }}
              className="ribbon-track flex w-max list-none gap-3.5 md:gap-5"
            >
              {[false, true].map(hidden => row.map(piece => (
                <Tile key={`${hidden}-${piece.src}`} piece={piece} hidden={hidden} />
              )))}
            </ul>
          </div>
        ))}
      </div>

      <div className="page-container mt-5 flex items-center justify-between gap-4 text-[12.5px] text-smoke">
        <p className="tracking-[0.02em]">
          <span className="sm:hidden">Brand, packaging, illustration, apps</span>
          <span className="hidden sm:inline">Brand identity, packaging, illustration, UI and apps I build</span>
        </p>
        <button
          type="button"
          onClick={() => setPaused(value => !value)}
          aria-pressed={paused}
          className="ribbon-toggle inline-flex shrink-0 items-center gap-2 rounded-full border-[0.5px] border-border-subtle px-3 py-1.5 text-ink transition-colors duration-300 hover:border-ink"
        >
          <span aria-hidden="true" className="flex h-2.5 w-2.5 items-center justify-center gap-[2px]">
            {paused ? (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-current"><path d="M2 1l7 4-7 4z" /></svg>
            ) : (
              <>
                <span className="h-2.5 w-[2.5px] rounded-[1px] bg-current" />
                <span className="h-2.5 w-[2.5px] rounded-[1px] bg-current" />
              </>
            )}
          </span>
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
