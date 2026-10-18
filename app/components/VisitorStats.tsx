'use client';

import { useEffect, useState } from 'react';
import {
  countVisitorOnce,
  startPresence,
  subscribeCounter,
  subscribeLiveCount,
} from '../firebase';

/**
 * Live site stats, read from Realtime Database:
 *   - visitors currently on the page (presence heartbeats)
 *   - unique visitors all time (one per browser)
 *   - APK downloads (raised by the download CTAs)
 *
 * The numbers are real writes, not estimates. Everything is loaded lazily
 * and is additive: if the SDK fails to load, the widget renders zeros rather
 * than blocking the page.
 */
export default function VisitorStats() {
  const [live, setLive] = useState(0);
  const [total, setTotal] = useState(0);
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    let stopPresence: (() => void) | undefined;
    let cancelled = false;

    const stopLive = subscribeLiveCount((count) => {
      if (!cancelled) setLive(count);
    });
    const stopTotal = subscribeCounter('totalVisitors', (value) => {
      if (!cancelled) setTotal(value);
    });
    const stopDownloads = subscribeCounter('downloads', (value) => {
      if (!cancelled) setDownloads(value);
    });

    void startPresence().then((stop) => {
      if (cancelled) stop();
      else stopPresence = stop;
    });
    countVisitorOnce();

    return () => {
      cancelled = true;
      stopLive();
      stopTotal();
      stopDownloads();
      stopPresence?.();
    };
  }, []);

  return (
    <div className="visitor-stats" aria-live="polite" aria-label="Live site statistics">
      <span className="visitor-stat visitor-stat-live">
        <span className="visitor-stat-dot" aria-hidden="true" />
        <strong>{live}</strong> online now
      </span>
      <span className="visitor-stat">
        <strong>{total}</strong> total visitors
      </span>
      <span className="visitor-stat">
        <strong>{downloads}</strong> downloads
      </span>
    </div>
  );
}
