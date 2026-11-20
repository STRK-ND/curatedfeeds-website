import { EASE, type MotionScene } from './context';

/** The homepage FAQ: head reveals, list staggers in, and each answer opens with height. */
export const faqScene: MotionScene = {
  name: 'faq',
  root: '.faq__grid',
  owns: '.faq',
  run({ gsap, headingReveal, q, cleanups }, faq) {
    const head = q(faq, '.faq__head');
    const list = q(faq, '.faq__list');

    if (head) {
      const h2 = head.querySelector('h2');
      headingReveal(h2, head, 'top 84%');
      const rest = Array.from(head.children).filter((child) => child !== h2);
      if (rest.length) {
        gsap.from(rest, {
          y: 16,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: EASE,
          scrollTrigger: { trigger: head, start: 'top 84%', once: true },
        });
      }
    }

    if (!list) return;
    gsap.from(list.querySelectorAll('details'), {
      y: 16,
      autoAlpha: 0,
      duration: 0.65,
      stagger: 0.05,
      ease: EASE,
      scrollTrigger: { trigger: list, start: 'top 86%', once: true },
    });

    list.querySelectorAll<HTMLDetailsElement>('details').forEach((detail) => {
      const answer = detail.querySelector<HTMLElement>('p');
      const summary = detail.querySelector('summary');
      if (!answer || !summary) return;
      const toggle = (event: Event) => {
        event.preventDefault();
        if (detail.open) {
          gsap.to(answer, {
            height: 0,
            autoAlpha: 0,
            duration: 0.32,
            ease: 'power2.inOut',
            onComplete: () => {
              detail.open = false;
              gsap.set(answer, { clearProps: 'height,opacity,visibility' });
            },
          });
        } else {
          detail.open = true;
          gsap.fromTo(
            answer,
            { height: 0, autoAlpha: 0 },
            {
              height: 'auto',
              autoAlpha: 1,
              duration: 0.45,
              ease: 'power2.out',
              onComplete: () => gsap.set(answer, { clearProps: 'height,opacity,visibility' }),
            },
          );
        }
      };
      summary.addEventListener('click', toggle);
      cleanups.push(() => summary.removeEventListener('click', toggle));
    });
  },
};
