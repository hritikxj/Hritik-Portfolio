'use client';

import { useEffect, useRef, useState } from 'react';
import { IntroContext } from '@/context/IntroContext';

let isInitialHardLoad = true;

export default function IntroScene({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const introDoneRef = useRef(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoLoadedRef = useRef(false);
  const updateStateRef = useRef<((p: number) => void) | null>(null);
  const progressRef = useRef(0);
  const isSeekingRef = useRef(false);

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
    const videoEl = videoRef.current;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let handleMetadataLoaded: (() => void) | null = null;
    let handleSeeked: (() => void) | null = null;
    let blobUrl: string | null = null;
    let aborted = false;

    // Check if seen before
    let wasSeenBefore = false;
    let savedScrollY: number | null = null;
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
    } catch { /* ignore */ }

    // First-time visitor initialization
    if (!wasSeenBefore) {
      const landing = landingRef.current;
      if (landing) {
        landing.style.opacity = '0';
        landing.style.visibility = 'hidden';
        landing.style.pointerEvents = 'none';
      }
    }

    // Returning visitor optimization
    if (wasSeenBefore) {
      introDoneRef.current = true;
      setIntroComplete(true);

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }

      // Collapse the spacer completely so the page behaves like a normal site
      const spacer = spacerRef.current;
      const overlay = overlayRef.current;
      const landing = landingRef.current;

      if (spacer) {
        spacer.style.height = '0px';
      }
      if (overlay) {
        overlay.style.display = 'none';
      }
      if (landing) {
        landing.style.opacity = '1';
        landing.style.visibility = 'visible';
        landing.style.pointerEvents = 'auto';
      }

      // Restore scroll position adjusted by the collapsed spacer (2 * window.innerHeight)
      try {
        const saved = sessionStorage.getItem('portfolio-scroll-y');
        if (saved) {
          savedScrollY = parseInt(saved, 10);
          sessionStorage.removeItem('portfolio-scroll-y');
        }
      } catch { /* ignore */ }

      if (savedScrollY !== null && !isNaN(savedScrollY)) {
        const estimatedSpacerHeight = window.innerHeight * 2;
        const adjustedScrollY = Math.max(0, savedScrollY - estimatedSpacerHeight);
        window.scrollTo(0, adjustedScrollY);
        setTimeout(() => {
          window.scrollTo(0, adjustedScrollY);
        }, 20);
        setTimeout(() => {
          window.scrollTo(0, adjustedScrollY);
        }, 80);
      } else {
        window.scrollTo(0, 0);
      }

      // Returning visitors skip the rest of the GSAP setup and video fetch completely!
      return;
    }

    // First-time visitors: fetch video and set up ScrollTrigger
    const fetchVideo = async () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const videoSrc = isMobile ? '/intro2-scrub-mobile.mp4' : '/intro2-scrub.mp4';

      try {
        const response = await fetch(videoSrc);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const contentLength = response.headers.get('content-length');
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

        if (!response.body) {
          throw new Error('ReadableStream not supported');
        }

        const reader = response.body.getReader();
        const chunks: BlobPart[] = [];
        let loadedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (aborted) return;
          chunks.push(value);
          loadedBytes += value.length;

          if (totalBytes > 0) {
            const percent = Math.round((loadedBytes / totalBytes) * 100);
            setLoadingProgress(percent);
          }
        }

        if (aborted) return;
        const blob = new Blob(chunks, { type: 'video/mp4' });
        blobUrl = URL.createObjectURL(blob);

        if (videoRef.current) {
          videoRef.current.src = blobUrl;
          videoRef.current.load();
        }
      } catch (err) {
        console.warn("Failed to load video as blob, falling back to direct stream:", err);
        if (videoRef.current) {
          videoRef.current.src = videoSrc;
          videoRef.current.load();
        }
      }
    };

    fetchVideo();

    const loadScript = (src: string, globalName: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if ((window as any)[globalName]) { resolve(); return; }
        const onReady = () => {
          let attempts = 0;
          const interval = setInterval(() => {
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
    let currentInterpolatedTime = 0;
    let scrubLoopActive = false;

    let autoScrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let targetScrollY = -1;
    let isAutoScrolling = false;

    let isUserScrollingActive = false;
    let userScrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleUserScrollActivity = (e?: Event) => {
      if (e && e.type === 'keydown') {
        const ke = e as KeyboardEvent;
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
        if (!scrollKeys.includes(ke.code)) return;
      }
      isUserScrollingActive = true;
      if (userScrollTimeout) clearTimeout(userScrollTimeout);
      userScrollTimeout = setTimeout(() => {
        isUserScrollingActive = false;
      }, 150);
    };

    window.addEventListener('wheel', handleUserScrollActivity, { passive: true });
    window.addEventListener('touchstart', handleUserScrollActivity, { passive: true });
    window.addEventListener('touchmove', handleUserScrollActivity, { passive: true });
    window.addEventListener('keydown', handleUserScrollActivity, { passive: true });

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

    const init = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'ScrollTrigger');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js', 'ScrollToPlugin');
      } catch {
        // GSAP failed to load — fallback
        const overlay = overlayRef.current;
        const landing = landingRef.current;
        const spacer = spacerRef.current;
        if (overlay) { overlay.style.display = 'none'; }
        if (landing) { landing.style.opacity = '1'; landing.style.pointerEvents = 'auto'; }
        if (spacer) { spacer.style.display = 'none'; }
        markIntroDone();
        return;
      }

      const { gsap, ScrollTrigger, ScrollToPlugin } = window as any;
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      const video = videoRef.current;
      const overlay = overlayRef.current;
      const landing = landingRef.current;
      const spacer = spacerRef.current;

      if (!video || !overlay || !landing || !spacer) return;

      handleSeeked = () => {
        isSeekingRef.current = false;
      };
      video.addEventListener('seeked', handleSeeked);

      handleMetadataLoaded = () => {
        if (st && st.progress !== undefined) {
          updateState(st.progress);
        }
      };
      video.addEventListener('loadedmetadata', handleMetadataLoaded);

      const MIN_SEEK_STEP = 0.03;

      const runScrubLoop = () => {
        if (!scrubLoopActive || !videoRef.current) return;

        const video = videoRef.current;
        const diff = targetTime - currentInterpolatedTime;

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

        const fadeStart = 0.85;
        const fadeEnd = 0.98;

        if (p <= fadeStart) {
          overlay.style.opacity = '1';
          overlay.style.visibility = 'visible';
          overlay.style.pointerEvents = 'auto';

          landing.style.opacity = '0';
          landing.style.visibility = 'hidden';
          landing.style.pointerEvents = 'none';
        } else if (p >= fadeEnd) {
          overlay.style.opacity = '0';
          overlay.style.visibility = 'hidden';
          overlay.style.pointerEvents = 'none';

          landing.style.opacity = '1';
          landing.style.visibility = 'visible';
          landing.style.pointerEvents = 'auto';

          markIntroDone();
        } else {
          const t = (p - fadeStart) / (fadeEnd - fadeStart);
          const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          overlay.style.opacity = String(1 - easedT);
          overlay.style.visibility = 'visible';
          overlay.style.pointerEvents = easedT < 0.5 ? 'auto' : 'none';

          landing.style.opacity = String(easedT);
          landing.style.visibility = 'visible';
          landing.style.pointerEvents = easedT >= 0.5 ? 'auto' : 'none';
        }

        const textEl = document.getElementById('intro-text-ui');
        if (textEl) {
          if (!videoLoadedRef.current) {
            textEl.style.opacity = '1';
          } else {
            if (p > 0.001) {
              textEl.classList.remove('intro-text-initial-fade', 'loaded');
            }
            textEl.style.opacity = String(Math.max(0, 1 - p / 0.15));
          }
        }
      };

      updateStateRef.current = updateState;

      const triggerAutoScroll = (targetY: number) => {
        if (isAutoScrolling && targetScrollY === targetY) return;

        isAutoScrolling = true;
        targetScrollY = targetY;

        gsap.to(window, {
          scrollTo: { y: targetY, autoKill: false },
          duration: 1.2,
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
        }, 1500);
      };

      triggerAutoScrollRef.current = triggerAutoScroll;

      const setup = () => {
        st = ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self: { progress: number; direction: number }) => {
            updateState(self.progress);

            if (!isUserScrollingActive || isAutoScrolling) return;

            const currentScroll = window.scrollY;
            const spacerHeight = spacer.offsetHeight;

            const downThreshold = spacerHeight * 0.03;
            const upThreshold = spacerHeight * 0.97;

            if (self.direction === 1 && currentScroll > downThreshold && currentScroll < upThreshold) {
              triggerAutoScroll(spacerHeight);
            } else if (self.direction === -1 && currentScroll > downThreshold && currentScroll < upThreshold) {
              triggerAutoScroll(0);
            }
          },
        });

        if (st && st.progress !== undefined) {
          updateState(st.progress);
        }
      };

      setup();

      if (window.location.hash) {
        setTimeout(() => {
          try {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: 'auto' });
          } catch (e) {
            console.error("Invalid hash selector:", e);
          }
        }, 150);
      }
    };

    init();

    return () => {
      aborted = true;
      updateStateRef.current = null;
      try { if (st) st.kill(); } catch { /* ignore */ }
      if (videoEl && handleSeeked) {
        videoEl.removeEventListener('seeked', handleSeeked);
      }
      if (videoEl && handleMetadataLoaded) {
        videoEl.removeEventListener('loadedmetadata', handleMetadataLoaded);
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (autoScrollTimeout) clearTimeout(autoScrollTimeout);
      window.removeEventListener('wheel', handleUserScrollActivity);
      window.removeEventListener('touchstart', handleUserScrollActivity);
      window.removeEventListener('touchmove', handleUserScrollActivity);
      window.removeEventListener('keydown', handleUserScrollActivity);
      if (userScrollTimeout) clearTimeout(userScrollTimeout);
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
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000',
          overflow: 'hidden',
          willChange: 'opacity, visibility',
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

          {/* Scroll / Loading indicator */}
          {!videoLoaded ? (
            <div className="flex flex-col items-center md:items-start self-center md:self-start w-fit gap-3 select-none">
              <span style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-body), sans-serif', fontWeight: 600 }}>
                Loading {loadingProgress}%
              </span>
              <div style={{ width: '120px', height: '1.5px', background: 'rgba(255, 255, 255, 0.12)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${loadingProgress}%`, background: '#fff', transition: 'width 0.1s ease' }} />
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Landing page — fades in when intro ends */}
      <div
        ref={landingRef}
        className="landing-initial-state"
        style={{
          willChange: 'opacity, visibility',
        }}
      >
        {children}
      </div>
    </IntroContext.Provider>
  );
}
