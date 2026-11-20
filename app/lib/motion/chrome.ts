import { EASE, type MotionScene } from './context';

/** Page-wide entrance: the main column fades in, then the nav settles. */
export const pageEntranceScene: MotionScene = {
  name: 'page-entrance',
  root: 'main',
  run({ gsap }, main) {
    gsap.from(main, { autoAlpha: 0, y: 12, duration: 0.55, ease: 'power1.out' });
  },
};

export const navScene: MotionScene = {
  name: 'nav',
  root: '.nav',
  run({ gsap, q, qa }, nav) {
    const inner = q(nav, '.nav__inner');
    if (inner) {
      gsap.from(inner, { y: -16, autoAlpha: 0, duration: 0.8, ease: EASE, delay: 0.15 });
    }
    const links = qa(nav, '.nav__links a, .nav__cta');
    if (links.length) {
      gsap.from(links, {
        y: -10,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: EASE,
        delay: 0.3,
      });
    }
  },
};

/** Any heading on a page that did not already get a scene-specific reveal. */
export const headingsScene: MotionScene = {
  name: 'headings',
  root: 'main',
  run({ headingReveal }, main) {
    main.querySelectorAll<HTMLElement>('h2').forEach((heading) => {
      headingReveal(heading, heading, 'top 88%');
    });
  },
};

export const pageH1Scene: MotionScene = {
  name: 'page-h1',
  root: 'main',
  run({ headingReveal }, main) {
    const pageH1 = main.querySelector<HTMLElement>('h1:not(#hero-title)');
    if (pageH1) headingReveal(pageH1, pageH1, 'top 92%');
  },
};

/** Staggered entrance for any annotated block that no section scene owns. */
export const genericRevealScene: MotionScene = {
  name: 'generic-reveal',
  root: 'main',
  run({ gsap, ownedSections }, main) {
    const owned = ownedSections.join(', ');
    main.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
      if (owned && el.closest(owned)) return;
      const kids = el.querySelectorAll<HTMLElement>('[data-anim-child]');
      const targets = kids.length ? Array.from(kids) : [el];
      gsap.from(targets, {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    });
  },
};

export const footerScene: MotionScene = {
  name: 'footer',
  root: '.footer__inner',
  run({ gsap }, footer) {
    gsap.from(footer, {
      y: 26,
      autoAlpha: 0,
      duration: 1,
      ease: EASE,
      scrollTrigger: { trigger: footer, start: 'top 94%', once: true },
    });
  },
};

/** Buttons follow a fine pointer slightly; touch devices get no listener at all. */
export const magneticScene: MotionScene = {
  name: 'magnetic-buttons',
  run({ gsap, cleanups }, doc) {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    doc.querySelectorAll<HTMLElement>('.btn, .nav__cta, .cta-button').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo(gsap.utils.clamp(-8, 8, (event.clientX - rect.left - rect.width / 2) * 0.16));
        yTo(gsap.utils.clamp(-6, 6, (event.clientY - rect.top - rect.height / 2) * 0.24));
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        gsap.set(el, { x: 0, y: 0 });
      });
    });
  },
};

/** Fonts and images move the fold; re-measure the scroll triggers when they land. */
export const refreshScene: MotionScene = {
  name: 'refresh',
  run({ ScrollTrigger }) {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    // Homepage only; other pages are expected to have no hero photograph.
    const heroPhoto = document.querySelector<HTMLImageElement>('.hero__bg img');
    if (heroPhoto && !heroPhoto.complete) {
      heroPhoto.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    }
  },
};
