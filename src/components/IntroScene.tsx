'use client';

import { useEffect, useRef } from 'react';

export default function IntroScene({ children }: { children: React.ReactNode }) {
  const spacerRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        document.head.appendChild(s);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any;
    let rafId = 0;
    let targetTime = 0;
    let lastProgress = 0;
    let currentBlur = 0;
    let blurRafId = 0;

    const init = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { gsap, ScrollTrigger } = window as any;
      gsap.registerPlugin(ScrollTrigger);

      const video   = videoRef.current!;
      const overlay = overlayRef.current!;
      const landing = landingRef.current!;
      const spacer  = spacerRef.current!;

      // rAF-batched seek — only one DOM write per frame regardless of scroll speed
      const seekFrame = () => {
        if (video.fastSeek) {
          video.fastSeek(targetTime);      // fastest possible seek
        } else {
          video.currentTime = targetTime;  // fallback
        }
        rafId = 0;
      };

      const setup = () => {
        st = ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: true,           // ← instant, no catch-up lag
          onUpdate: (self: { progress: number }) => {
            // ── Video scrub ──────────────────────────────────────────
            if (video.duration) {
              targetTime = self.progress * video.duration;
              if (!rafId) rafId = requestAnimationFrame(seekFrame);
            }

            // ── Subtle motion blur based on scroll velocity ──────────
            const velocity = Math.abs(self.progress - lastProgress);
            lastProgress = self.progress;
            const targetBlur = Math.min(velocity * 120, 3); // max 3px
            currentBlur = currentBlur * 0.6 + targetBlur * 0.4; // smooth interpolation
            video.style.filter = currentBlur > 0.05
              ? `blur(${currentBlur.toFixed(2)}px)`
              : 'none';

            // Decay blur to 0 when scrolling stops
            if (blurRafId) cancelAnimationFrame(blurRafId);
            const decayBlur = () => {
              currentBlur *= 0.75;
              if (currentBlur > 0.05) {
                video.style.filter = `blur(${currentBlur.toFixed(2)}px)`;
                blurRafId = requestAnimationFrame(decayBlur);
              } else {
                video.style.filter = 'none';
                currentBlur = 0;
              }
            };
            blurRafId = requestAnimationFrame(decayBlur);

            // ── Opacity fade (direct style — zero GSAP overhead) ─────
            const p = self.progress;
            const fadeStart = 0.88;
            if (p >= fadeStart) {
              const t = (p - fadeStart) / (1 - fadeStart);
              const o = Math.max(0, 1 - t);
              overlay.style.opacity         = String(o);
              overlay.style.pointerEvents   = t > 0.5 ? 'none' : 'auto';
              landing.style.opacity         = String(Math.min(1, t));
            } else {
              overlay.style.opacity       = '1';
              overlay.style.pointerEvents = 'auto';
              landing.style.opacity       = '0';
            }

            // ── Fade out text UI elements early ─────────────────────
            const textEl = document.getElementById('intro-text-ui');
            if (textEl) {
              const textFade = Math.max(0, 1 - p / 0.15); // fade out by 15% progress
              textEl.style.opacity = String(textFade);
            }
          },
        });
      };

      // Start setup after metadata (need duration) but also after enough data to seek
      const trySetup = () => {
        if (video.readyState >= 1) setup();
        else video.addEventListener('loadedmetadata', setup, { once: true });
      };
      trySetup();
    };

    init();

    return () => {
      if (st) st.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Scroll spacer — pinned by GSAP, creates 300% scroll room */}
      <div
        ref={spacerRef}
        style={{ height: '0px', width: '100%' }}
      />

      {/* Fixed video overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000',
          overflow: 'hidden',
          willChange: 'opacity',
        }}
      >
        <video
          ref={videoRef}
          src="/intro2-scrub.mp4"
          muted
          playsInline
          preload="auto"
          className="object-contain md:object-cover"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />

        {/* Text UI — fades out as user starts scrolling */}
        <div
          id="intro-text-ui"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(24px, 4vw, 56px)',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Top row: big name left, label right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Big name top-left */}
            <div>
              <p style={{
                fontSize: 'clamp(40px, 6.5vw, 100px)',
                fontWeight: 300,
                lineHeight: 1.0,
                color: '#fff',
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.02em',
                margin: '0 0 14px 0',
                textShadow: '0 2px 40px rgba(0,0,0,0.5)',
              }}>
                Hritik Jasnani.
              </p>
              <p style={{
                fontSize: 'clamp(18px, 2vw, 28px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'sans-serif',
                letterSpacing: '0.04em',
                margin: '8px 0 0 0',
              }}>
                A designer who gives a damn.
              </p>
            </div>

            {/* Label top-right */}
            <span style={{
              fontSize: 'clamp(16px, 2vw, 24px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'sans-serif',
              fontWeight: 500,
              marginTop: '8px',
            }}>
              Portfolio · 2026
            </span>
          </div>

          {/* Scroll indicator — bottom centre, bigger & more visible */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontSize: '16px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'sans-serif',
              fontWeight: 500,
            }}>
              Scroll
            </span>
            <div style={{
              width: '3px',
              height: '100px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
              animation: 'introLinePulse 1.8s ease-in-out infinite',
              borderRadius: '3px',
            }} />
            <style>{`
              @keyframes introLinePulse {
                0%, 100% { opacity: 0.4; transform: scaleY(0.85) translateY(-4px); }
                50% { opacity: 1; transform: scaleY(1) translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Landing page — fades in when intro ends */}
      <div ref={landingRef} style={{ opacity: 0, willChange: 'opacity' }}>
        {children}
      </div>
    </>
  );
}
