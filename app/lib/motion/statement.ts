import { EASE, type MotionScene } from './context';

/** The long statement: eyebrow, masked lead line, then a word-by-word light-up. */
export const statementScene: MotionScene = {
  name: 'statement',
  root: '.statement__inner',
  owns: '.statement',
  run({ gsap, SplitText, splits, headingReveal, q }, statement) {
    const eyebrow = q(statement, '.eyebrow');
    const lead = q(statement, '.statement__lead');
    const text = q(statement, '.statement__text');

    if (eyebrow) {
      gsap.from(eyebrow, {
        y: 12,
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: statement, start: 'top 84%', once: true },
      });
    }
    headingReveal(lead, statement, 'top 80%');
    if (text) {
      const split = new SplitText(text, { type: 'words' });
      splits.push(split);
      gsap.from(split.words, {
        opacity: 0.16,
        ease: 'none',
        stagger: 0.4,
        scrollTrigger: { trigger: text, start: 'top 82%', end: 'bottom 58%', scrub: 0.6 },
      });
    }
  },
};
