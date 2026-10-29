'use client';

import { useEffect, useRef } from 'react';

/**
 * The signature: the reading queue as a live point cloud.
 *
 * Every dot is one article in the feed. The Vantage sweep — a band of light
 * that travels down the cloud — is the swipe: cards left of the sweep-line
 * are "done" (dimmed, going out), cards over the line light up as "found"
 * (chromatic lime), cards right of it wait ("unread" steel-blue).
 *
 * Language-carrying, ambulatory, perceptible, real-world referent: the
 * user's actual triage gesture, drawn as light on a field of unread work.
 * Respects prefers-reduced-motion (renders once, one found dot marked).
 */

type Props = {
  /** Number of articles in the cloud. Real facts stay outside: this is the app's queue, any count reads true. */
  count?: number;
  /** Milliseconds per sweep. */
  period?: number;
  seed?: number;
};

/** Mulberry32 — small deterministic PRNG so every render draws the same field. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function FeedCloud({ count = 96, period = 7000, seed = 2026 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = mulberry32(seed);

    // The field: positions cluster toward the left edge (most of the queue
    // is unread), with source "columns" so it reads as grouped feeds.
    const articles = Array.from({ length: count }, (_, i) => {
      const column = i % 6;
      return {
        x: 0.06 + column * 0.155 + rand() * 0.09,
        y: rand() * 0.9 + 0.05,
        r: 1.4 + rand() * 1.8,
        dim: 0.35 + rand() * 0.4,
      };
    });

    let raf = 0;
    let paused = false;

    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Lime accent + ground, read from the tokens so a theme retune follows.
    const toRgb = (cssColor: string, fallback: [number, number, number]): [number, number, number] => {
      try {
        const probe = document.createElement('canvas');
        probe.width = 1; probe.height = 1;
        const pctx = probe.getContext('2d')!;
        pctx.clearRect(0, 0, 1, 1);
        pctx.fillStyle = cssColor;
        pctx.fillRect(0, 0, 1, 1);
        const d = pctx.getImageData(0, 0, 1, 1).data;
        if (d[3] === 0) return fallback;
        return [d[0], d[1], d[2]];
      } catch {
        return fallback;
      }
    };
    const styles = getComputedStyle(document.documentElement);
    const accent = toRgb(styles.getPropertyValue('--color-accent').trim(), [235, 255, 140]);
    const ink = toRgb(styles.getPropertyValue('--color-ink').trim(), [242, 245, 246]);
    // unread dots: ground pushed toward the steel-blue point tones
    const unread: [number, number, number] = [92, 102, 128];

    let t0 = 0;
    const draw = (ts: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const sweep = reduced ? 0.62 : ((ts - t0) / period) % 1;

      for (const a of articles) {
        const x = a.x * w;
        const y = a.y * h;
        const d = a.x - sweep; // negative = left of the line = triaged

        if (d > -0.04 && d < 0.03) {
          // over the line: found — the lime signal
          ctx.globalAlpha = 1;
          ctx.fillStyle = `rgb(${accent[0]},${accent[1]},${accent[2]})`;
          ctx.shadowColor = `rgb(${accent[0]},${accent[1]},${accent[2]})`;
          ctx.shadowBlur = 8;
        } else if (a.x < sweep) {
          // done: going out, quiet ink
          ctx.globalAlpha = a.dim * 0.5;
          ctx.fillStyle = `rgb(${ink[0]},${ink[1]},${ink[2]})`;
          ctx.shadowBlur = 0;
        } else {
          // unread: steel-blue point
          ctx.globalAlpha = a.dim;
          ctx.fillStyle = `rgb(${unread[0]},${unread[1]},${unread[2]})`;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(x, y, a.r * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // the sweep line itself: one hairline of light
      ctx.globalAlpha = 0.9;
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.35)`;
      ctx.lineWidth = 1 * (window.devicePixelRatio || 1);
      ctx.beginPath();
      ctx.moveTo(sweep * w, 0);
      ctx.lineTo(sweep * w, h);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.shadowColor = 'transparent';
      if (!paused && !reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const toggle = () => {
      paused = !paused;
      if (!paused && !reduced) {
        t0 = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    window.addEventListener('feedcloud:toggle', toggle);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('feedcloud:toggle', toggle);
    };
  }, [count, period, seed]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
