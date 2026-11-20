import { EASE, type MotionScene } from './context';

/** The screens section: the deck deals itself in, the shots are revealed, then drift. */
export const screensScene: MotionScene = {
  name: 'screens',
  root: '.screens',
  owns: '.screens',
  run({ gsap, q, qa }, screens) {
    const live = q(screens, '.screens__live');
    if (live) {
      const stage = q(live, '.deck__stage');
      if (stage) {
        gsap.from(stage, {
          y: 44,
          scale: 0.95,
          rotate: 1.5,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: live, start: 'top 82%', once: true },
        });
      }
    }

    const shots = qa(screens, '.shot img');
    shots.forEach((img) => {
      gsap.from(img, {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.05,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: img, start: 'top 90%', once: true },
      });
    });
    if (shots.length) {
      gsap.to(shots, {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: screens, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }
  },
};
