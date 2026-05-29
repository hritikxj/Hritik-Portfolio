'use client';

import { useEffect, useRef, useState } from 'react';
import { IntroContext } from '@/context/IntroContext';

let isInitialHardLoad = true;

export default function IntroScene({ children }: { children: React.ReactNode }) {
  const spacerRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const introDoneRef = useRef(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoLoadedRef = useRef(false);
  const updateStateRef = useRef<((p: number) => void) | null>(null);
  const progressRef = useRef(0);
  const isSeekingRef = useRef(false);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    videoLoadedRef.current = videoLoaded;
    if (videoLoaded && updateStateRef.current) {
      updateStateRef.current(progressRef.current);
    }
  }, [videoLoaded]);

  const triggerAutoScrollRef = useRef<((targetY: number) => void) | null>(null);

  const handleScrollClick = () => {
    if (spacerRef.current) {
      const targetY = spacerRef.current.offsetHeight;
      if (triggerAutoScrollRef.current) {
        triggerAutoScrollRef.current(targetY);
      } else {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let handleMetadataLoaded: (() => void) | null = null;
    let handleSeeked: (() => void) | null = null;
    let blobUrl: string | null = null;
    let aborted = false;

    // Symmetrical Auto-scroll indicator flags
    let isAutoScrolling = false;

    // Check if seen before
    let wasSeenBefore = false;
    if (isInitialHardLoad) {
      isInitialHardLoad = false;
      try {
        const navigationEntries = performance.getEntriesByType('navigation');
        const isReloadTiming = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';
        const isReloadLegacy = window.performance && window.performance.navigation && window.performance.navigation.type === 1;
        const isReload = isReloadTiming || isReloadLegacy;
        
        if (isReload) {
          sessionStorage.removeItem('intro-seen');
        }
      } catch (e) {
        console.warn("Navigation performance API not available:", e);
      }
    }

    try {
      wasSeenBefore = !!sessionStorage.getItem('intro-seen');
    } catch (_) {}

    if (wasSeenBefore) {
      introDoneRef.current = true;
      setIntroComplete(true);
      setIsReturning(true);
      
      const spacer = spacerRef.current;
      const spacerHeight = spacer ? spacer.offsetHeight : window.innerHeight * 2;
      if (window.scrollY < spacerHeight) {
        window.scrollTo(0, spacerHeight);
        setTimeout(() => {
          if (window.scrollY < spacerHeight) {
            window.scrollTo(0, spacerHeight);
          }
        }, 50);
      }
      return;
    }

    const fetchVideo = async () => {
      if (videoRef.current) {
        videoRef.current.src = '/intro2-scrub.mp4';
      }

      try {
        const response = await fetch('/intro2-scrub.mp4');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        if (!response.body) {
          throw new Error('ReadableStream not supported');
        }
        
        const reader = response.body.getReader();
        const chunks: BlobPart[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (aborted) return;
          chunks.push(value);
        }
        
        if (aborted) return;
        const blob = new Blob(chunks, { type: 'video/mp4' });
        blobUrl = URL.createObjectURL(blob);
        
        if (videoRef.current && progressRef.current < 0.05) {
          const currentTime = videoRef.current.currentTime;
          videoRef.current.src = blobUrl;
          videoRef.current.currentTime = currentTime;
        }
      } catch (err) {
        console.warn("Failed to load video as blob, falling back to direct stream:", err);
      }
    };

    fetchVideo();

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
    let targetTime = 0;
    let lastSoughtTime = 0;
    let autoScrollTimeout: any = null;
    let targetScrollY = -1;

    let hasUserInteracted = false;
    const enableAutoScroll = () => {
      hasUserInteracted = true;
      window.removeEventListener('wheel', enableAutoScroll);
      window.removeEventListener('touchstart', enableAutoScroll);
      window.removeEventListener('keydown', enableAutoScroll);
    };
    window.addEventListener('wheel', enableAutoScroll, { passive: true });
    window.addEventListener('touchstart', enableAutoScroll, { passive: true });
    window.addEventListener('keydown', enableAutoScroll, { passive: true });

    // Block scrolling inputs during active transitions to prevent momentum fighting GSAP
    const preventScroll = (e: Event) => {
      if (isAutoScrolling) {
        e.preventDefault();
      }
    };
    const preventKeys = (e: KeyboardEvent) => {
      if (isAutoScrolling) {
        const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
        if (keys.includes(e.code)) {
          e.preventDefault();
        }
      }
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    let currentInterpolatedTime = 0;
    let scrubLoopActive = false;

    const markIntroDone = () => {
      if (introDoneRef.current) return;
      introDoneRef.current = true;
      try {
        sessionStorage.setItem('intro-seen', '1');
      } catch (e) {
        console.warn("sessionStorage write failed:", e);
      }
      setIntroComplete(true);
    };

    // For returning visitors: immediately show the landing while GSAP loads in the
    // background. The spacer is intentionally kept so ScrollTrigger can still
    // drive the scroll-back-to-intro experience.
    if (wasSeenBefore) {
      markIntroDone();
      const overlay = overlayRef.current;
      const landing = landingRef.current;
      const spacer  = spacerRef.current;
      if (overlay) {
        overlay.style.opacity       = '0';
        overlay.style.visibility    = 'hidden';
        overlay.style.pointerEvents = 'none';
        overlay.style.display       = 'none';
      }
      if (landing) {
        landing.style.opacity       = '1';
        landing.style.visibility    = 'visible';
        landing.style.pointerEvents = 'auto';
      }
      if (spacer) {
        window.scrollTo(0, spacer.offsetTop + spacer.offsetHeight);
      }
    }

    const init = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'ScrollTrigger');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js', 'ScrollToPlugin');
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
      const { gsap, ScrollTrigger, ScrollToPlugin } = window as any;
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      const video   = videoRef.current;
      const overlay = overlayRef.current;
      const landing = landingRef.current;
      const spacer  = spacerRef.current;

      if (!video || !overlay || !landing || !spacer) return;

      handleSeeked = () => {
        isSeekingRef.current = false;
      };
      video.addEventListener('seeked', handleSeeked);

      // Sync playback position as soon as metadata loaded to prevent frozen state
      handleMetadataLoaded = () => {
        if (st && st.progress !== undefined) {
          updateState(st.progress);
        }
      };
      video.addEventListener('loadedmetadata', handleMetadataLoaded);

      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      const MIN_SEEK_STEP = 0.03; // ~30fps equivalent time step to avoid decoder overhead

      const runScrubLoop = () => {
        if (!scrubLoopActive || !videoRef.current) return;

        const video = videoRef.current;
        const diff = targetTime - currentInterpolatedTime;

        // When close enough, seek to exact target time and stop the loop
        if (Math.abs(diff) < 0.001) {
          if (video.currentTime !== targetTime) {
            if (!isSeekingRef.current) {
              isSeekingRef.current = true;
              video.currentTime = targetTime;
              currentInterpolatedTime = targetTime;
              lastSoughtTime = targetTime;
              scrubLoopActive = false;
            } else {
              rafId = requestAnimationFrame(runScrubLoop);
            }
          } else {
            currentInterpolatedTime = targetTime;
            lastSoughtTime = targetTime;
            scrubLoopActive = false;
          }
          return;
        }

        currentInterpolatedTime += diff * 0.12;

        if (video.duration) {
          currentInterpolatedTime = Math.max(0, Math.min(video.duration, currentInterpolatedTime));
          
          // Only seek if the distance from the last sought time is greater than MIN_SEEK_STEP
          // and we are not already seeking. This reduces decoder seek load by 95%.
          if (!isSeekingRef.current && Math.abs(currentInterpolatedTime - lastSoughtTime) >= MIN_SEEK_STEP) {
            isSeekingRef.current = true;
            video.currentTime = currentInterpolatedTime;
            lastSoughtTime = currentInterpolatedTime;
          }
        }

        rafId = requestAnimationFrame(runScrubLoop);
      };

      const updateState = (p: number) => {
        progressRef.current = p;

        // ── Video scrub ─────────────────────────────────────────
        if (video.duration) {
          targetTime = p * video.duration;
          
          if (currentInterpolatedTime === 0 && p > 0) {
            currentInterpolatedTime = video.currentTime;
          }

          if (!scrubLoopActive) {
            scrubLoopActive = true;
            rafId = requestAnimationFrame(runScrubLoop);
          }
        }

        // ── Fade: overlay out, landing in ───────────────────────
        const fadeStart = 0.85;
        if (p >= fadeStart) {
          overlay.style.opacity       = '0';
          overlay.style.visibility    = 'hidden';
          overlay.style.pointerEvents = 'none';

          landing.style.opacity       = '1';
          landing.style.visibility    = 'visible';
          landing.style.pointerEvents = 'auto';

          // Fire introComplete early enough that Reveal animations overlap
          markIntroDone();
        } else {
          overlay.style.opacity       = '1';
          overlay.style.visibility    = 'visible';
          overlay.style.pointerEvents = 'auto';
          overlay.style.display       = 'block';

          landing.style.opacity       = '0';
          landing.style.visibility    = 'hidden';
          landing.style.pointerEvents = 'none';
        }

        // ── Fade text UI early ──────────────────────────────────
        const textEl = document.getElementById('intro-text-ui');
        if (textEl) {
          if (!videoLoadedRef.current) {
            textEl.style.opacity = '0';
          } else {
            if (p > 0.001) {
              textEl.classList.remove('intro-text-initial-fade', 'loaded');
            }
            textEl.style.opacity = String(Math.max(0, 1 - p / 0.15));
          }
        }
      };

      updateStateRef.current = updateState;

      // For returning visitors: jump scroll to the end of the spacer BEFORE
      // creating the ScrollTrigger so that ScrollTrigger initialises at progress=1
      // and calls updateState(1) immediately — no flash, correct visual state.
      // Scrolling back up from here will scrub the intro in reverse as intended.
      if (wasSeenBefore) {
        window.scrollTo(0, spacer.offsetTop + spacer.offsetHeight);
        setTimeout(() => {
          if (window.scrollY < spacer.offsetTop + spacer.offsetHeight) {
            window.scrollTo(0, spacer.offsetTop + spacer.offsetHeight);
          }
        }, 50);
      }

      const triggerAutoScroll = (targetY: number) => {
        if (isAutoScrolling && targetScrollY === targetY) return;

        isAutoScrolling = true;
        targetScrollY = targetY;

        gsap.to(window, {
          scrollTo: { y: targetY, autoKill: false },
          duration: 1.2, // Snappier transition timing
          ease: "power2.inOut",
          onComplete: () => {
            isAutoScrolling = false;
            targetScrollY = -1;
            if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
          },
          onInterrupt: () => {
            isAutoScrolling = false;
            targetScrollY = -1;
            if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
          }
        });

        if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
        autoScrollTimeout = setTimeout(() => {
          isAutoScrolling = false;
          targetScrollY = -1;
        }, 1500); // adjusted safety fallback
      };

      triggerAutoScrollRef.current = triggerAutoScroll;

      const setup = () => {
        // NO pin:true — GSAP only reads scroll, never touches the DOM structure.
        // The spacer div (200vh) creates all the scroll space we need.
        // The video overlay is position:fixed and handles its own visual placement.
        st = ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: 'bottom top', // when bottom of 200vh spacer scrolls past the top
          scrub: true,
          onUpdate: (self: { progress: number; direction: number }) => {
            updateState(self.progress);

            if (!hasUserInteracted || isAutoScrolling) return;

            const currentScroll = window.scrollY;
            const spacerHeight = spacer.offsetHeight;
            
            // Thresholds: 3% from top or 3% from bottom of spacer
            const downThreshold = spacerHeight * 0.03;
            const upThreshold = spacerHeight * 0.97;

            if (self.direction === 1 && currentScroll > downThreshold && currentScroll < upThreshold) {
              triggerAutoScroll(spacerHeight);
            } else if (self.direction === -1 && currentScroll < upThreshold && currentScroll > downThreshold) {
              triggerAutoScroll(0);
            }
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
          try {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: wasSeenBefore ? 'smooth' : 'auto' });
          } catch (e) {
            console.error("Invalid hash selector:", e);
          }
        }, wasSeenBefore ? 80 : 150);
      }
    };

    init();

    return () => {
      aborted = true;
      updateStateRef.current = null;
      // Safe cleanup — GSAP never touched the DOM structure so no removeChild conflicts
      try { if (st) st.kill(); } catch (_) { /* ignore */ }
      if (videoRef.current && handleSeeked) {
        videoRef.current.removeEventListener('seeked', handleSeeked);
      }
      if (videoRef.current && handleMetadataLoaded) {
        videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
      window.removeEventListener('wheel', enableAutoScroll);
      window.removeEventListener('touchstart', enableAutoScroll);
      window.removeEventListener('keydown', enableAutoScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <IntroContext.Provider value={introComplete}>
      {/* 200vh spacer — creates scroll room without GSAP pin manipulation */}
      <div ref={spacerRef} style={{ height: '200vh', width: '100%', pointerEvents: 'none' }} />

      {/* Fixed video overlay — always covers viewport, fades out at end */}
      {!isReturning && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            overflow: 'hidden',
            willChange: 'opacity, visibility',
            transition: 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className="object-contain md:object-cover"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              willChange: 'transform',
              transform: 'translateZ(0)',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease'
            }}
          />

          {/* Text UI — fades out as user starts scrolling */}
          <div
            id="intro-text-ui"
            className={`intro-text-initial-fade ${videoLoaded ? 'loaded' : ''}`}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(24px, 4vw, 56px)', pointerEvents: 'none' }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 'clamp(40px, 6.5vw, 100px)', fontWeight: 300, lineHeight: 1.0, color: '#fff', fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em', margin: '0 0 14px 0', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
                  Hritik Jasnani.
                </p>
                <p style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body), sans-serif', letterSpacing: '0.04em', margin: '8px 0 0 0' }}>
                  A designer who gives a damn.
                </p>
              </div>
              <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, marginTop: '8px' }}>
                Portfolio&nbsp;·&nbsp;2026
              </span>
            </div>

            {/* Scroll indicator */}
            <div
              onClick={handleScrollClick}
              className="flex flex-col items-center self-center md:self-start w-fit gap-3 cursor-pointer group"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="group-hover:text-white transition-colors duration-200" style={{ fontSize: '15px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-body), sans-serif', fontWeight: 600, marginRight: '-0.45em' }}>
                Scroll
              </span>
              <div style={{ width: '2.5px', height: '90px', background: 'rgba(255, 255, 255, 0.22)', position: 'relative', overflow: 'hidden', marginBottom: '2px' }}>
                <div className="intro-scroll-line" />
              </div>
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none" className="group-hover:text-white transition-colors duration-200" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Landing page — fades in when intro ends */}
      <div
        ref={landingRef}
        style={{
          opacity: isReturning ? 1 : 0,
          visibility: isReturning ? 'visible' : 'hidden',
          willChange: 'opacity, visibility',
          transition: 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
          pointerEvents: isReturning ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </IntroContext.Provider>
  );
}
