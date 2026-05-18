'use client';

import { useEffect, useRef, useState } from 'react';
import { IntroContext } from '@/context/IntroContext';

export default function IntroScene({ children }: { children: React.ReactNode }) {
  const spacerRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const introDoneRef = useRef(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Loads a CDN script, resolving only when the window global is actually available.
    // The interval has a hard cap (250 × 20 ms = 5 s) so it cannot run forever.
    const loadScript = (src: string, globalName: string): Promise<void> =>
      new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any)[globalName]) { resolve(); return; }
        const onReady = () => {
          let attempts = 0;
          const interval = setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any)[globalName]) { clearInterval(interval); resolve(); return; }
            if (++attempts > 250) { clearInterval(interval); reject(new Error(`${globalName} did not load`)); }
          }, 20);
        };
        if (document.querySelector(`script[src="${src}"]`)) { onReady(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = onReady;
        s.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.head.appendChild(s);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any;
    let rafId = 0;
    let blurRafId = 0;
    let targetTime = 0;
    let lastProgress = 0;
    let currentBlur = 0;

    const markIntroDone = () => {
      if (introDoneRef.current) return;
      introDoneRef.current = true;
      sessionStorage.setItem('intro-seen', '1');
      setIntroComplete(true);
    };

    // Whether the user has already scrolled through the intro in this browser session
    const wasSeenBefore = !!sessionStorage.getItem('intro-seen');

    // For returning visitors: immediately show the landing while GSAP loads in the
    // background.  The spacer is intentionally kept so ScrollTrigger can still
    // drive the scroll-back-to-intro experience.
    if (wasSeenBefore) {
      markIntroDone();
      const overlay = overlayRef.current;
      const landing = landingRef.current;
      if (overlay) { overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }
      if (landing) { landing.style.opacity = '1'; landing.style.pointerEvents = 'auto'; }
    }

    const init = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'ScrollTrigger');
      } catch {
        // GSAP failed to load — last-resort fallback: collapse the spacer and
        // show the landing so the page is still usable.
        const overlay = overlayRef.current;
        const landing = landingRef.current;
        const spacer  = spacerRef.current;
        if (overlay) { overlay.style.display = 'none'; }
        if (landing) { landing.style.opacity = '1'; landing.style.pointerEvents = 'auto'; }
        if (spacer)  { spacer.style.display = 'none'; }
        markIntroDone();
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { gsap, ScrollTrigger } = window as any;
      gsap.registerPlugin(ScrollTrigger);

      const video   = videoRef.current;
      const overlay = overlayRef.current;
      const landing = landingRef.current;
      const spacer  = spacerRef.current;

      if (!video || !overlay || !landing || !spacer) return;

      // rAF-batched seek — only one DOM write per frame
      const seekFrame = () => {
        if (video.fastSeek) video.fastSeek(targetTime);
        else video.currentTime = targetTime;
        rafId = 0;
      };

      const updateState = (p: number) => {
        // ── Video scrub ─────────────────────────────────────────
        if (video.duration) {
          targetTime = p * video.duration;
          if (!rafId) rafId = requestAnimationFrame(seekFrame);
        }

        // ── Subtle motion blur on fast scroll ───────────────────
        const velocity = Math.abs(p - lastProgress);
        lastProgress = p;
        const targetBlur = Math.min(velocity * 120, 3);
        currentBlur = currentBlur * 0.6 + targetBlur * 0.4;
        video.style.filter = currentBlur > 0.05
          ? `blur(${currentBlur.toFixed(2)}px)` : 'none';
        if (blurRafId) cancelAnimationFrame(blurRafId);
        const decayBlur = () => {
          currentBlur *= 0.75;
          if (currentBlur > 0.05) {
            video.style.filter = `blur(${currentBlur.toFixed(2)}px)`;
            blurRafId = requestAnimationFrame(decayBlur);
          } else { video.style.filter = 'none'; currentBlur = 0; }
        };
        blurRafId = requestAnimationFrame(decayBlur);

        // ── Fade: overlay out, landing in ───────────────────────
        const fadeStart = 0.88;
        if (p >= fadeStart) {
          const t = (p - fadeStart) / (1 - fadeStart);
          const o = Math.max(0, 1 - t);
          overlay.style.opacity       = String(o);
          overlay.style.pointerEvents = t > 0.5 ? 'none' : 'auto';
          landing.style.opacity       = String(Math.min(1, t));
          landing.style.pointerEvents = t > 0.5 ? 'auto' : 'none';

          // Fire introComplete early enough that Reveal animations overlap
          // with the landing fade-in rather than playing on a blank screen.
          if (t >= 0.2) markIntroDone();
        } else {
          overlay.style.opacity       = '1';
          overlay.style.pointerEvents = 'auto';
          landing.style.opacity       = '0';
          landing.style.pointerEvents = 'none';
        }

        // ── Fade text UI early ──────────────────────────────────
        const textEl = document.getElementById('intro-text-ui');
        if (textEl) {
          textEl.style.opacity = String(Math.max(0, 1 - p / 0.15));
        }
      };

      // For returning visitors: jump scroll to the end of the spacer BEFORE
      // creating the ScrollTrigger so that ScrollTrigger initialises at progress=1
      // and calls updateState(1) immediately — no flash, correct visual state.
      // Scrolling back up from here will scrub the intro in reverse as intended.
      if (wasSeenBefore) {
        window.scrollTo(0, spacer.offsetTop + spacer.offsetHeight);
      }

      const setup = () => {
        // NO pin:true — GSAP only reads scroll, never touches the DOM structure.
        // The spacer div (400vh) creates all the scroll space we need.
        // The video overlay is position:fixed and handles its own visual placement.
        st = ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: 'bottom top', // when bottom of 400vh spacer scrolls past the top
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            updateState(self.progress);
          },
        });

        // Force initial state — covers both the fresh-visit (progress=0) and
        // the returning-visitor (progress=1) cases immediately after setup.
        if (st && st.progress !== undefined) {
          updateState(st.progress);
        }
      };

      setup();

      // Next.js App Router bug mitigation: manually scroll to hash if present.
      // For returning visitors the spacer-scroll above already positions us past
      // the intro; the hash scroll then moves to the right section.
      if (window.location.hash) {
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: wasSeenBefore ? 'smooth' : 'auto' });
        }, wasSeenBefore ? 80 : 150);
      }
    };

    init();

    return () => {
      // Safe cleanup — GSAP never touched the DOM structure so no removeChild conflicts
      try { if (st) st.kill(); } catch (_) { /* ignore */ }
      if (rafId) cancelAnimationFrame(rafId);
      if (blurRafId) cancelAnimationFrame(blurRafId);
    };
  }, []);

  return (
    <IntroContext.Provider value={introComplete}>
      {/* 400vh spacer — creates scroll room without GSAP pin manipulation */}
      <div ref={spacerRef} style={{ height: '400vh', width: '100%', pointerEvents: 'none' }} />

      {/* Fixed video overlay — always covers viewport, fades out at end */}
      <div
        ref={overlayRef}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', overflow: 'hidden', willChange: 'opacity' }}
      >
        <video
          ref={videoRef}
          src="/intro2-scrub.mp4"
          muted
          playsInline
          preload="auto"
          className="object-contain md:object-cover"
          style={{ width: '100%', height: '100%', display: 'block', willChange: 'transform', transform: 'translateZ(0)' }}
        />

        {/* Text UI — fades out as user starts scrolling */}
        <div
          id="intro-text-ui"
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(24px, 4vw, 56px)', pointerEvents: 'none', transition: 'opacity 0.3s ease' }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 'clamp(40px, 6.5vw, 100px)', fontWeight: 300, lineHeight: 1.0, color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', margin: '0 0 14px 0', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
                Hritik Jasnani.
              </p>
              <p style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', letterSpacing: '0.04em', margin: '8px 0 0 0' }}>
                A designer who gives a damn.
              </p>
            </div>
            <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif', fontWeight: 500, marginTop: '8px' }}>
              Portfolio&nbsp;·&nbsp;2026
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center self-center md:self-start w-fit gap-3">
            <span style={{ fontSize: '15px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-body), sans-serif', fontWeight: 600, marginRight: '-0.45em' }}>
              Scroll
            </span>
            <div style={{ width: '2.5px', height: '90px', background: 'rgba(255, 255, 255, 0.22)', position: 'relative', overflow: 'hidden', marginBottom: '2px' }}>
              <div className="intro-scroll-line" />
            </div>
            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Landing page — fades in when intro ends */}
      <div ref={landingRef} style={{ opacity: 0, willChange: 'opacity', pointerEvents: 'none' }}>
        {children}
      </div>
    </IntroContext.Provider>
  );
}
