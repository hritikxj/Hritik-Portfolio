'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type Props = {
  /** File stem in /public/videos, e.g. "fino" for fino-light.mp4 and fino-dark.mp4. */
  name: string;
  label: string;
  className?: string;
};

const THEMES = ['light', 'dark'] as const;

const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (onChange: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

/**
 * A short, silent product loop, recorded from the real app. Each video is rendered twice, on the light and the
 * dark stage colour, so it sits flush in either theme; CSS shows the matching one.
 * Nothing downloads until the video is near the screen, only the visible copy plays,
 * and visitors who prefer reduced motion get the still poster with a play button.
 */
export default function AppVideo({ name, label, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videos = useRef<Partial<Record<(typeof THEMES)[number], HTMLVideoElement | null>>>({});
  const reduce = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => false);
  // The visitor's own choice wins; until they make one, reduced motion means paused.
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? reduce;
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    rootRef.current?.dispatchEvent(new Event('app-video-toggle'));
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let inView = false;

    const current = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    const sync = () => {
      const active = current();
      for (const theme of THEMES) {
        const video = videos.current[theme];
        if (!video) continue;
        if (theme === active && inView && !pausedRef.current) {
          if (video.preload === 'none') { video.preload = 'auto'; video.load(); }
          video.play().catch(() => { /* Autoplay refused: the poster stays. */ });
        } else {
          video.pause();
        }
      }
    };

    const seen = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { rootMargin: '200px 0px' });
    seen.observe(root);
    const themeWatch = new MutationObserver(sync);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    root.addEventListener('app-video-toggle', sync);
    return () => { seen.disconnect(); themeWatch.disconnect(); root.removeEventListener('app-video-toggle', sync); };
  }, []);

  const toggle = () => setChoice(!paused);

  return (
    <div ref={rootRef} className={`app-video group relative overflow-hidden rounded-lg ${className}`}>
      {THEMES.map(theme => (
        <video
          key={theme}
          ref={element => { videos.current[theme] = element; }}
          className={`app-video-${theme} block aspect-[16/10] w-full`}
          poster={`/videos/${name}-${theme}.webp`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        >
          {/* HEVC is sharper at the same size; browsers without it take the H.264 copy. */}
          <source src={`/videos/${name}-${theme}.hevc.mp4`} type='video/mp4; codecs="hvc1.1.6.L123.B0"' />
          <source src={`/videos/${name}-${theme}.mp4`} type="video/mp4" />
        </video>
      ))}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={paused}
        aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        className="absolute right-3 bottom-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-off-white text-ink shadow-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 data-[paused=true]:opacity-100"
        data-paused={paused}
      >
        {paused ? (
          <svg viewBox="0 0 10 10" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M2 1l7 4-7 4z" /></svg>
        ) : (
          <span aria-hidden="true" className="flex gap-[3px]"><span className="h-3 w-[3px] rounded-[1px] bg-current" /><span className="h-3 w-[3px] rounded-[1px] bg-current" /></span>
        )}
      </button>
    </div>
  );
}
