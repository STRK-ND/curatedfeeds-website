'use client';

import { useEffect, useRef } from 'react';

/**
 * Motion layer — Vantage direction.
 *
 * 1. Signature move (crossfade): showcase image crossfades between 3 screenshots every 5.5 s
 * 2. Section entrances: [data-anim] sections fade in via IntersectionObserver,
 *    [data-anim-child] elements get a stagger. Content is visible with script off
 *    (the hiding selector is .js-scoped).
 * 3. FAQ rows are native <details>, no scripting.
 * 4. Feature toggles state their consequence via CSS [data-on] (kept markup wiring below).
 *
 * Reduced-motion fallback: images do not crossfade, sections show at once.
 */

const SHOWCASE_IMAGES = [
  '/screenshots/home-feed.webp',
  '/screenshots/swipe-gestures.webp',
];

export default function PageMotion() {
  const showcaseTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const showcaseIdx = useRef(0);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js');

    /* ── 2. Section entrances via IntersectionObserver ── */
    const ro = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add('inview');
            const children = el.querySelectorAll<HTMLElement>('[data-anim-child]');
            children.forEach((c, i) => {
              c.style.transitionDelay = isReduced ? '0ms' : `${i * 72}ms`;
            });
            ro.unobserve(el);
          }
        }
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => ro.observe(el));

    /* ── 1. Showcase crossfade ── */
    const img = document.getElementById('showcase-img') as HTMLImageElement | null;
    if (img && !isReduced) {
      showcaseTimer.current = setInterval(() => {
        showcaseIdx.current = (showcaseIdx.current + 1) % SHOWCASE_IMAGES.length;
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = SHOWCASE_IMAGES[showcaseIdx.current];
          img.style.opacity = '1';
        }, 500);
      }, 5500);
    }

    /* ── 4. Feature band toggles ── */
    const toggles = document.querySelectorAll<HTMLInputElement>('.toggle-input');
    toggles.forEach((input) => {
      const band = input.closest('.feature-band') as HTMLElement | null;
      if (!band) return;
      const update = () => {
        band.dataset.on = input.checked ? 'true' : 'false';
      };
      input.addEventListener('change', update);
    });

    return () => {
      ro.disconnect();
      if (showcaseTimer.current) clearInterval(showcaseTimer.current);
    };
  }, []);

  return null;
}
