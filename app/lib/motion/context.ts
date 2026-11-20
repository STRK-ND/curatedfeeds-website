/**
 * Shared types and lookups for the motion layer.
 *
 * A scene declares the element it animates (`root`). When that element is
 * absent the page simply has no such section, so the scene is skipped. Every
 * lookup *inside* a scene goes through queryRequired/queryAllRequired, which
 * warn in development when markup the animation depends on has moved or been
 * renamed, so a markup change fails loudly instead of silently killing motion.
 */

export const EASE = 'power3.out';

/** Lines start below the padded mask (see .g-line-mask in globals.css). */
export const LINE_FROM = 135;

export type SplitTextInstance = import('gsap/SplitText').SplitText;

export type MotionContext = {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  SplitText: typeof import('gsap/SplitText').SplitText;
  splits: SplitTextInstance[];
  cleanups: Array<() => void>;
  splitLines: (el: Element | null) => HTMLElement[] | null;
  headingReveal: (heading: Element | null, trigger: Element | null, start?: string) => void;
  /** querySelector for markup a scene depends on; warns when it is missing. */
  q: <T extends Element = HTMLElement>(root: ParentNode, selector: string) => T | null;
  /** querySelectorAll for markup a scene depends on; warns when nothing matches. */
  qa: <T extends Element = HTMLElement>(root: ParentNode, selector: string) => T[];
  /** Section wrappers owned by their own scene, skipped by the generic reveal. */
  ownedSections: string[];
};

export type MotionScene = {
  name: string;
  /** Element that must exist for this scene to run. Omit for page-wide scenes. */
  root?: string;
  /** The section wrapper this scene owns, so the generic reveal does not double-animate it. */
  owns?: string;
  run: (ctx: MotionContext, root: HTMLElement) => void;
};

const isDev = process.env.NODE_ENV !== 'production';

function describe(root: ParentNode): string {
  if (root instanceof Element) {
    return root.className ? `.${String(root.className).split(' ')[0]}` : root.tagName.toLowerCase();
  }
  return 'document';
}

export function queryRequired<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T | null {
  const el = root.querySelector<T>(selector);
  if (!el && isDev) {
    console.warn(`[motion] "${selector}" not found in ${describe(root)}; did the markup change?`);
  }
  return el;
}

export function queryAllRequired<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  const els = Array.from(root.querySelectorAll<T>(selector));
  if (!els.length && isDev) {
    console.warn(`[motion] "${selector}" matched nothing in ${describe(root)}; did the markup change?`);
  }
  return els;
}
