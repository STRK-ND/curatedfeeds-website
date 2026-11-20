import { EASE, type MotionScene } from './context';

/** Offline section: the copy enters, the phone rises, its screenshot is revealed and drifts. */
export const offlineScene: MotionScene = {
  name: 'offline',
  root: '.offline__inner',
  owns: '.offline',
  run({ gsap, headingReveal, q }, offline) {
    headingReveal(q(offline, 'h2'), offline, 'top 78%');
    gsap.from(offline.querySelectorAll<HTMLElement>('.offline__copy > *:not(h2)'), {
      y: 18,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.07,
      ease: EASE,
      scrollTrigger: { trigger: offline, start: 'top 76%', once: true },
    });

    const phone = q(offline, '.offline__phone');
    if (phone) {
      gsap.from(phone, {
        y: 48,
        autoAlpha: 0,
        duration: 1.2,
        ease: EASE,
        scrollTrigger: { trigger: offline, start: 'top 78%', once: true },
      });
    }

    const phoneImg = q(offline, '.offline__phone img');
    if (phoneImg) {
      gsap.from(phoneImg, {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.05,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: phoneImg, start: 'top 90%', once: true },
      });
      gsap.to(phoneImg, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: offline, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }
  },
};
