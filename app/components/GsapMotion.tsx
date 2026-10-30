'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * The site's single motion layer.
 *
 * One GSAP context drives everything: the hero intro and its scroll parallax,
 * masked-line reveals on every heading, staggered section entrances, image
 * clip reveals, an animated FAQ, magnetic buttons and the page fade on route
 * change. All of it is registered inside
 * gsap.matchMedia('(prefers-reduced-motion: no-preference)'), so a reader who
 * asks for less motion gets the finished page with nothing hidden at all.
 *
 * The pre-JS hidden state lives in globals.css behind `.js`; if the GSAP chunk
 * never arrives, a timer reveals the page so it can never stay blank.
 */

const EASE = 'power3.out';
/* Lines start below the padded mask (see .g-line-mask in globals.css). */
const LINE_FROM = 135;

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
      const splits: SplitText[] = [];
      const splitDone = new WeakSet<Element>();

      const splitLines = (el: Element | null) => {
        if (!el || splitDone.has(el)) return null;
        splitDone.add(el);
        const split = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'g-line' });
        splits.push(split);
        return split.lines as HTMLElement[];
      };

      const headingReveal = (heading: Element | null, trigger: Element | null, start = 'top 86%') => {
        const lines = splitLines(heading);
        if (!lines) return null;
        return gsap.from(lines, {
          yPercent: LINE_FROM,
          duration: 1.05,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: trigger ?? heading, start, once: true },
        });
      };

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        root.classList.add('gsap');

        const cleanups: Array<() => void> = [];

        // Drop the CSS-held hidden state; the tweens below own visibility now.
        gsap.set('[data-anim]', { autoAlpha: 1 });
        gsap.set('[data-anim-child]', { autoAlpha: 1, y: 0 });

        /* ── Page entrance ─────────────────────────────────────── */
        const main = document.querySelector('main');
        if (main) gsap.from(main, { autoAlpha: 0, y: 12, duration: 0.55, ease: 'power1.out' });

        const navInner = document.querySelector('.nav__inner');
        if (navInner) {
          gsap.from(navInner, { y: -16, autoAlpha: 0, duration: 0.8, ease: EASE, delay: 0.15 });
        }
        const navLinks = document.querySelectorAll('.nav__links a, .nav__cta');
        if (navLinks.length) {
          gsap.from(navLinks, {
            y: -10,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: EASE,
            delay: 0.3,
          });
        }

        /* ── Hero: photograph, then the name, line by line ──────── */
        const hero = document.querySelector<HTMLElement>('.hero');
        if (hero) {
          const bg = hero.querySelector<HTMLElement>('.hero__bg img');
          const inner = hero.querySelector<HTMLElement>('.hero__inner');
          const eyebrow = hero.querySelector<HTMLElement>('.eyebrow');
          const h1 = hero.querySelector<HTMLElement>('h1');
          const sub = hero.querySelector<HTMLElement>('.hero__sub');
          const actions = hero.querySelectorAll<HTMLElement>('.hero__actions > *');
          const meta = hero.querySelectorAll<HTMLElement>('.hero__meta > span');
          const credit = hero.querySelector<HTMLElement>('.hero__credit');
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
        }

        /* ── Statement: the page's long breath ─────────────────── */
        const statement = document.querySelector<HTMLElement>('.statement__inner');
        if (statement) {
          const eyebrow = statement.querySelector<HTMLElement>('.eyebrow');
          const lead = statement.querySelector<HTMLElement>('.statement__lead');
          const text = statement.querySelector<HTMLElement>('.statement__text');

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
            // The paragraph lights up word by word as it is scrolled through.
            const split = new SplitText(text, { type: 'words' });
            splits.push(split);
            gsap.from(split.words, {
              opacity: 0.16,
              ease: 'none',
              stagger: 0.4,
              scrollTrigger: { trigger: text, start: 'top 82%', end: 'bottom 58%', scrub: 0.6 },
            });
          }
        }

        /* ── Offline: a real platform, parallaxed ──────────────── */
        const offline = document.querySelector<HTMLElement>('.offline__inner');
        if (offline) {
          headingReveal(offline.querySelector('h2'), offline, 'top 78%');
          gsap.from(offline.querySelectorAll<HTMLElement>('.offline__copy > *:not(h2)'), {
            y: 18,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: { trigger: offline, start: 'top 76%', once: true },
          });
          const phone = offline.querySelector<HTMLElement>('.offline__phone');
          if (phone) {
            gsap.from(phone, {
              y: 48,
              autoAlpha: 0,
              duration: 1.2,
              ease: EASE,
              scrollTrigger: { trigger: offline, start: 'top 78%', once: true },
            });
          }
          const phoneImg = offline.querySelector<HTMLElement>('.offline__phone img');
          if (phoneImg) {
            gsap.to(phoneImg, {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: { trigger: offline, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
          }
        }

        /* ── Download: the cream field ─────────────────────────── */
        const download = document.querySelector<HTMLElement>('.download__inner');
        if (download) {
          headingReveal(download.querySelector('h2'), download, 'top 78%');
          const eyebrow = download.querySelector<HTMLElement>('.eyebrow');
          const meta = download.querySelector<HTMLElement>('.download__meta');
          if (eyebrow) {
            gsap.from(eyebrow, {
              y: 14,
              autoAlpha: 0,
              duration: 0.7,
              ease: EASE,
              scrollTrigger: { trigger: download, start: 'top 80%', once: true },
            });
          }
          if (meta) {
            gsap.from(meta, {
              y: 18,
              autoAlpha: 0,
              duration: 0.85,
              ease: EASE,
              scrollTrigger: { trigger: download, start: 'top 74%', once: true },
            });
          }
          const panel = download.querySelector<HTMLElement>('.download__panel');
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
        }

        /* ── Feature rows: five, numbered, dealt ───────────────── */
        const featureGrid = document.querySelector<HTMLElement>('.features');
        if (featureGrid) {
          const items = featureGrid.querySelectorAll<HTMLElement>('.feature');
          gsap.from(items, {
            y: 26,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: { trigger: featureGrid, start: 'top 84%', once: true },
          });
          gsap.from(featureGrid.querySelectorAll<HTMLElement>('.features__n'), {
            x: -16,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: { trigger: featureGrid, start: 'top 84%', once: true },
          });
        }

        /* ── The deck deals itself in ──────────────────────────── */
        const live = document.querySelector<HTMLElement>('.screens__live');
        if (live) {
          gsap.from(live.querySelector('.deck__stage'), {
            y: 44,
            scale: 0.95,
            rotate: 1.5,
            autoAlpha: 0,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: live, start: 'top 82%', once: true },
          });
        }

        /* ── Screens labelled data reveals ─────────────────────── */
        document.querySelectorAll<HTMLElement>('.shot img, .offline__phone img').forEach((img) => {
          gsap.from(img, {
            clipPath: 'inset(0 0 100% 0)',
            scale: 1.05,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: img, start: 'top 90%', once: true },
          });
        });
        const screens = document.querySelector('.screens');
        if (screens) {
          gsap.to('.shot img', {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: { trigger: screens, start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
        }

        /* ── FAQ: the list, then the open/close ────────────────── */
        const faq = document.querySelector<HTMLElement>('.faq__grid');
        if (faq) {
          const head = faq.querySelector<HTMLElement>('.faq__head');
          const list = faq.querySelector<HTMLElement>('.faq__list');
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
          if (list) {
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
                    }
                  );
                }
              };
              summary.addEventListener('click', toggle);
              cleanups.push(() => summary.removeEventListener('click', toggle));
            });
          }
        }

        /* ── Every heading, once ───────────────────────────────── */
        document.querySelectorAll<HTMLElement>('main h2').forEach((heading) => {
          headingReveal(heading, heading, 'top 88%');
        });

        /* ── Interior page h1 ──────────────────────────────────── */
        const pageH1 = document.querySelector<HTMLElement>('main h1:not(#hero-title)');
        if (pageH1) headingReveal(pageH1, pageH1, 'top 92%');

        /* ── Generic section fallback ──────────────────────────── */
        document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
          if (el.closest('.hero, .statement, .offline, .download, .faq, .features, .screens')) return;
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

        /* ── Footer ────────────────────────────────────────────── */
        const footer = document.querySelector<HTMLElement>('.footer__inner');
        if (footer) {
          gsap.from(footer, {
            y: 26,
            autoAlpha: 0,
            duration: 1,
            ease: EASE,
            scrollTrigger: { trigger: footer, start: 'top 94%', once: true },
          });
        }

        /* ── Magnetic buttons (fine pointers only) ─────────────── */
        if (window.matchMedia('(pointer: fine)').matches) {
          document.querySelectorAll<HTMLElement>('.btn, .nav__cta, .cta-button').forEach((el) => {
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
        }

        /* Fonts and images move the fold; re-measure when they land. */
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
        const heroPhoto = document.querySelector<HTMLImageElement>('.hero__bg img');
        if (heroPhoto && !heroPhoto.complete) {
          heroPhoto.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
        }

        return () => {
          cleanups.forEach((fn) => fn());
          splits.forEach((split) => split.revert());
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
