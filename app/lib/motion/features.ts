import { EASE, type MotionScene } from './context';

/** Five feature rows, staggered in, with their numbers dealt from the left. */
export const featuresScene: MotionScene = {
  name: 'features',
  root: '.features',
  owns: '.features',
  run({ gsap, qa }, features) {
    gsap.from(qa(features, '.feature'), {
      y: 26,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: EASE,
      scrollTrigger: { trigger: features, start: 'top 84%', once: true },
    });
    gsap.from(qa(features, '.features__n'), {
      x: -16,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: EASE,
      scrollTrigger: { trigger: features, start: 'top 84%', once: true },
    });
  },
};
