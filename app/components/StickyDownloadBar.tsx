'use client';

import { useState, useSyncExternalStore } from 'react';
import { SITE, APK_MB } from '../lib/site';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): boolean {
  try {
    return sessionStorage.getItem('cf_hide_sticky_bar') === '1';
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return true; // Hidden on server to prevent hydration mismatch
}

export default function StickyDownloadBar() {
  const isStoredDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [locallyDismissed, setLocallyDismissed] = useState(false);

  if (isStoredDismissed || locallyDismissed) return null;

  const handleDismiss = () => {
    setLocallyDismissed(true);
    try {
      sessionStorage.setItem('cf_hide_sticky_bar', '1');
    } catch {
      // ignore
    }
  };

  return (
    <aside className="sticky-download-bar" aria-label="Download Curated Feeds App">
      <div className="sticky-download-content">
        <div className="sticky-download-info">
          <span className="sticky-download-title">Curated Feeds for Android</span>
          <span className="sticky-download-sub">Ad-free · Offline · {APK_MB} MB APK</span>
        </div>
        <div className="sticky-download-actions">
          <a
            href={SITE.app.apk}
            className="sticky-download-btn"
            aria-label={`Download Curated Feeds APK version ${SITE.app.version}`}
          >
            Get Free APK
          </a>
          <button
            type="button"
            className="sticky-download-close"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
          >
            &times;
          </button>
        </div>
      </div>
    </aside>
  );
}
