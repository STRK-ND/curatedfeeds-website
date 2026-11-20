'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { runMotion } from '../lib/motion';

/**
 * Loads the motion layer and owns its lifecycle; the scenes themselves live
 * in app/lib/motion, one module per page section.
 *
 * All of it runs inside gsap.matchMedia('(prefers-reduced-motion: no-preference)'),
 * so a reader who asks for less motion gets the finished page with nothing
 * hidden at all. The pre-JS hidden state lives in globals.css behind `.js`; if
 * the GSAP chunk never arrives, a timer reveals the page so it can never stay
 * blank.
 */
export default function GsapMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let ready = false;

    const revealAll = () => {
      document.querySelectorAll('[data-anim]').forEach((el) => el.classList.add('inview'));
    };

    const safety = window.setTimeout(() => {
      if (!ready) revealAll();
    }, 3000);

    (async () => {
      // Nothing to animate: don't even ship the GSAP chunk.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ready = true;
        window.clearTimeout(safety);
        revealAll();
        return;
      }

      const [core, scrollTriggerMod, splitMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/SplitText'),
      ]);
      if (cancelled) return;
      ready = true;
      window.clearTimeout(safety);

      const { gsap } = core;
      const { ScrollTrigger } = scrollTriggerMod;
      const { SplitText } = splitMod;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        root.classList.add('gsap');
        const stop = runMotion({ gsap, ScrollTrigger, SplitText }, root);
        return () => {
          stop();
          root.classList.remove('gsap');
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        revealAll();
      });

      return () => mm.revert();
    })().catch(() => {
      revealAll();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
