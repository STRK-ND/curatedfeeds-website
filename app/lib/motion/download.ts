import { EASE, type MotionScene } from './context';

/** The closing cream field: heading, eyebrow, meta and the download panel. */
export const downloadScene: MotionScene = {
  name: 'download',
  root: '.download__inner',
  owns: '.download',
  run({ gsap, headingReveal, q }, download) {
    headingReveal(q(download, 'h2'), download, 'top 78%');

    const eyebrow = q(download, '.eyebrow');
    if (eyebrow) {
      gsap.from(eyebrow, {
        y: 14,
        autoAlpha: 0,
        duration: 0.7,
        ease: EASE,
        scrollTrigger: { trigger: download, start: 'top 80%', once: true },
      });
    }

    const meta = q(download, '.download__meta');
    if (meta) {
      gsap.from(meta, {
        y: 18,
        autoAlpha: 0,
        duration: 0.85,
        ease: EASE,
        scrollTrigger: { trigger: download, start: 'top 74%', once: true },
      });
    }

    const panel = q(download, '.download__panel');
    if (panel) {
      gsap.from(panel.children, {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: EASE,
        scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
      });
    }
  },
};
