'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The live thing: the queue as a deck you can actually swipe.
 *
 * Right keeps a card, left lets it go, and the next screen deals up under the
 * thumb. Pointer events for the phone, arrow keys for the keyboard, buttons for
 * everyone. Reduced motion swaps the card without flying it out.
 */

export type DeckCard = { src: string; alt: string };

const THRESHOLD = 72;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export default function QueueStage({ cards }: { cards: DeckCard[] }) {
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [committing, setCommitting] = useState<null | 'save' | 'done'>(null);
  const [announce, setAnnounce] = useState('');
  const pointer = useRef<number | null>(null);
  const startX = useRef(0);
  const reduced = useRef(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const commit = useCallback((dir: 'save' | 'done') => {
    setDragging(false);
    setAnnounce(dir === 'save' ? 'Kept. Next story dealt.' : 'Done. Next story dealt.');

    const deal = () => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setDx(0);
      setCommitting(null);
    };

    if (reduced.current) {
      deal();
      return;
    }

    if (timer.current) window.clearTimeout(timer.current);
    setCommitting(dir);
    setDx(dir === 'save' ? 480 : -480);
    timer.current = window.setTimeout(deal, 300);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (committing || e.button !== 0) return;
    pointer.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointer.current !== e.pointerId) return;
    setDx(e.clientX - startX.current);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointer.current !== e.pointerId) return;
    pointer.current = null;
    const d = e.clientX - startX.current;
    if (d > THRESHOLD) commit('save');
    else if (d < -THRESHOLD) commit('done');
    else {
      setDragging(false);
      setDx(0);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (committing) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      commit('save');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      commit('done');
    }
  };

  const stacked = order.slice(0, 2).map((idx, depth) => ({ idx, depth }));
  const flag: 'save' | 'done' | null = committing ?? (dx > 32 ? 'save' : dx < -32 ? 'done' : null);

  return (
    <div
      className="deck"
      role="group"
      aria-label="The queue as a deck: swipe right to keep a card, left to let it go"
      aria-describedby="deck-hint"
    >
      <div className="deck__stage">
        {stacked.reverse().map(({ idx, depth }) => {
          const card = cards[idx];
          const isTop = depth === 0;
          const transform = isTop
            ? `translate3d(${dx}px, 0, 0) rotate(${dx * 0.04}deg)`
            : `translate3d(0, 22px, -40px) scale(0.95)`;

          return (
            <div
              key={idx}
              className={cx(
                'deck__card',
                isTop && 'deck__card--top',
                isTop && dragging && 'deck__card--drag',
                isTop && committing && 'deck__card--gone'
              )}
              style={{ transform, zIndex: 10 - depth }}
              tabIndex={isTop ? 0 : -1}
              aria-hidden={isTop ? undefined : true}
              aria-label={
                isTop ? `${card.alt}. Right arrow keeps it, left arrow lets it go.` : undefined
              }
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              onKeyDown={isTop ? onKeyDown : undefined}
            >
              <img
                src={card.src}
                alt={isTop ? card.alt : ''}
                width={1080}
                height={1920}
                draggable={false}
                loading={depth === 0 ? 'eager' : 'lazy'}
              />
              {isTop && flag && (
                <span className={cx('deck__flag', `deck__flag--${flag}`)} aria-hidden="true">
                  {flag === 'save' ? 'Keep' : 'Done'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="deck__controls">
        <button
          type="button"
          className="deck__btn"
          onClick={() => commit('done')}
          disabled={Boolean(committing)}
        >
          Let it go
        </button>
        <button
          type="button"
          className="deck__btn deck__btn--keep"
          onClick={() => commit('save')}
          disabled={Boolean(committing)}
        >
          Keep it
        </button>
      </div>

      <p className="deck__hint" id="deck-hint">
        Drag the card, or use the buttons.
      </p>
      <span className="visually-hidden" role="status">
        {announce}
      </span>
    </div>
  );
}
