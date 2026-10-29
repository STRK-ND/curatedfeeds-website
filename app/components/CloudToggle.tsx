'use client';

/** Pause / resume the FeedCloud sweep via the shared `feedcloud:toggle` event. */
export default function CloudToggle({ label = 'Pause the sweep' }: { label?: string }) {
  return (
    <button
      type="button"
      className="btn btn--line hero__pause"
      onClick={() => window.dispatchEvent(new Event('feedcloud:toggle'))}
    >
      {label}
    </button>
  );
}
