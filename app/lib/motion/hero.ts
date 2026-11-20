import { LINE_FROM, type MotionScene } from './context';

/** The landing hero: photograph, then the name, line by line, then a slow parallax. */
export const heroScene: MotionScene = {
  name: 'hero',
  root: '.hero',
  owns: '.hero',
  run({ gsap, splitLines, q, qa }, hero) {
    const bg = q(hero, '.hero__bg img');
    const inner = q(hero, '.hero__inner');
    const eyebrow = q(hero, '.eyebrow');
    const h1 = q(hero, 'h1');
    const sub = q(hero, '.hero__sub');
    const actions = qa(hero, '.hero__actions > *');
    const meta = qa(hero, '.hero__meta > span');
    const credit = q(hero, '.hero__credit');
    const lines = splitLines(h1);

    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } });
    if (bg) tl.from(bg, { scale: 1.14, autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0);
    if (eyebrow) tl.from(eyebrow, { y: 16, autoAlpha: 0, duration: 0.7 }, 0.25);
    if (lines) tl.from(lines, { yPercent: LINE_FROM, duration: 1.15, stagger: 0.09 }, 0.32);
    if (sub) tl.from(sub, { y: 22, autoAlpha: 0, duration: 0.9 }, 0.6);
    if (actions.length) tl.from(actions, { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.7);
    if (meta.length) tl.from(meta, { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 0.85);
    if (credit) tl.from(credit, { autoAlpha: 0, duration: 0.8 }, 1.05);

    if (bg) {
      gsap.to(bg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(bg, {
        scale: 1.04,
        duration: 32,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });
    }
    if (inner) {
      gsap.to(inner, {
        yPercent: -7,
        autoAlpha: 0.4,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  },
};
