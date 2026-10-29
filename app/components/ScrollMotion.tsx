'use client';

import { useEffect } from 'react';

/**
 * One motion layer: sections fade in once, their children stagger.
 * The hidden state lives behind `prefers-reduced-motion: no-preference`, and
 * the `.js` class is set before paint, so nothing flashes and nothing is
 * hidden from a reader who has asked for less motion.
 */
export default function ScrollMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'));

    if (reduced) {
      sections.forEach((el) => el.classList.add('inview'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('inview');
          el.querySelectorAll<HTMLElement>('[data-anim-child]').forEach((child, i) => {
            child.style.transitionDelay = `${i * 64}ms`;
          });
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
