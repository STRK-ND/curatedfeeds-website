import {
  LINE_FROM,
  queryAllRequired,
  queryRequired,
  type MotionContext,
  type MotionScene,
  type SplitTextInstance,
} from './context';
import { downloadScene } from './download';
import { faqScene } from './faq';
import { featuresScene } from './features';
import {
  footerScene,
  genericRevealScene,
  headingsScene,
  magneticScene,
  navScene,
  pageEntranceScene,
  pageH1Scene,
  refreshScene,
} from './chrome';
import { heroScene } from './hero';
import { offlineScene } from './offline';
import { screensScene } from './screens';
import { statementScene } from './statement';

/**
 * The motion layer, in document order.
 *
 * Each scene owns one section and declares the selector it animates. A page
 * without that selector is a page without that section, so the scene is
 * skipped; a selector that exists but has lost its inner markup warns in
 * development (see context.ts). The order is the order the tweens are built,
 * which matters because the generic heading reveal only touches headings that
 * no earlier scene split.
 */
export const SCENES: MotionScene[] = [
  pageEntranceScene,
  navScene,
  heroScene,
  statementScene,
  offlineScene,
  downloadScene,
  featuresScene,
  screensScene,
  faqScene,
  headingsScene,
  pageH1Scene,
  genericRevealScene,
  footerScene,
  magneticScene,
  refreshScene,
];

type Plugins = {
  gsap: MotionContext['gsap'];
  ScrollTrigger: MotionContext['ScrollTrigger'];
  SplitText: MotionContext['SplitText'];
};

/**
 * Run every scene under `documentElement`. Returns a cleanup that removes the
 * listeners and reverts every split, so a route change can rebuild from the
 * real DOM rather than from split spans.
 */
export function runMotion({ gsap, ScrollTrigger, SplitText }: Plugins, documentRoot: HTMLElement) {
  const splits: SplitTextInstance[] = [];
  const cleanups: Array<() => void> = [];
  const splitDone = new WeakSet<Element>();

  const splitLines = (el: Element | null): HTMLElement[] | null => {
    if (!el || splitDone.has(el)) return null;
    splitDone.add(el);
    const split = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'g-line' });
    splits.push(split);
    return split.lines as HTMLElement[];
  };

  const headingReveal = (
    heading: Element | null,
    trigger: Element | null,
    start = 'top 86%',
  ) => {
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

  const ctx: MotionContext = {
    gsap,
    ScrollTrigger,
    SplitText,
    splits,
    cleanups,
    splitLines,
    headingReveal,
    q: queryRequired,
    qa: queryAllRequired,
    ownedSections: SCENES.flatMap((scene) => (scene.owns ? [scene.owns] : [])),
  };

  // Drop the CSS-held hidden state; the tweens below own visibility now.
  // Interior pages have none of these annotations, and an unmatched gsap.set
  // logs a warning, so only touch the page when the hooks are present.
  if (documentRoot.querySelector('[data-anim]')) {
    gsap.set('[data-anim]', { autoAlpha: 1 });
  }
  if (documentRoot.querySelector('[data-anim-child]')) {
    gsap.set('[data-anim-child]', { autoAlpha: 1, y: 0 });
  }

  for (const scene of SCENES) {
    const root = scene.root ? documentRoot.querySelector<HTMLElement>(scene.root) : documentRoot;
    if (!root) continue;
    scene.run(ctx, root);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    splits.forEach((split) => split.revert());
  };
}
