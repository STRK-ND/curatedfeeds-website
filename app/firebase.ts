import type { Database } from 'firebase/database';

/**
 * Firebase Analytics, lazily driven.
 *
 * The Firebase SDK is loaded through dynamic import() inside the event
 * handlers, never at module scope. This keeps ~150KB of vendor JS out of the
 * initial HTML parse / hydration critical path, which is a Core Web Vitals
 * (LCP + TBT) win, and Google uses page experience signals for ranking.
 */

const firebaseConfig = {
  apiKey: 'AIzaSyAkR-_lsfVzHNaZyJWBxNOgaCk85PNXh_8',
  authDomain: 'curatedfeeds.firebaseapp.com',
  projectId: 'curatedfeeds',
  storageBucket: 'curatedfeeds.firebasestorage.app',
  messagingSenderId: '482183083527',
  appId: '1:482183083527:web:1e449fc3be4b043d22dca2',
  measurementId: 'G-31JZFV2ND0',
  databaseURL: 'https://curatedfeeds-default-rtdb.firebaseio.com',
};

type AnalyticsLike = { logEvent: (name: string, params?: Record<string, unknown>) => void };
let analyticsPromise: Promise<AnalyticsLike | null> | null = null;

/**
 * Resolve the Analytics instance on demand. Idempotent: the promise is cached,
 * so repeated events reuse a single SDK instance and a single network setup.
 */
function getAnalyticsLazy(): Promise<AnalyticsLike | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);

  if (!analyticsPromise) {
    analyticsPromise = Promise.all([
      import('firebase/app'),
      import('firebase/analytics'),
    ])
      .then(([appMod, analyticsMod]) => {
        const { initializeApp, getApps, getApp } = appMod;
        const { getAnalytics } = analyticsMod;
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        return getAnalytics(app) as unknown as AnalyticsLike;
      })
      .catch(() => null); // Analytics must never break a user interaction.
  }

  return analyticsPromise;
}

/** Fire-and-forget event log. Never throws, never blocks. */
export const logAnalyticsEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  void getAnalyticsLazy().then((analytics) => {
    if (!analytics) return;
    import('firebase/analytics')
      .then(({ logEvent }) => logEvent(analytics as never, eventName, params))
      .catch(() => undefined);
  });
};

export const logCTAClick = (buttonName: string, location: string): void => {
  logAnalyticsEvent('cta_click', { button_name: buttonName, location });
};

export const logAppDownload = (platform: string): void => {
  logAnalyticsEvent('app_download', { platform });
  void countDownload();
};

export const setUserType = (isReturning: boolean): void => {
  logAnalyticsEvent('set_user_type', { user_type: isReturning ? 'returning' : 'new' });
};

export const setPlatform = (): void => {
  logAnalyticsEvent('set_platform', { platform: 'web' });
};

export const logScrollDepth = (percent: number): void => {
  logAnalyticsEvent('scroll_depth', { percent });
};

export const logTimeOnPage = (seconds: number): void => {
  logAnalyticsEvent('time_on_page', { seconds });
};
/* ------------------------------------------------------------------ *
 * Download counter (Realtime Database)
 *
 * Raised by the download CTAs with a server-side transaction, so two
 * simultaneous clicks raise the count by two rather than clobbering each
 * other. Best-effort: a database outage never blocks a download.
 * ------------------------------------------------------------------ */

let databasePromise: Promise<Database | null> | null = null;

function getDatabaseLazy(): Promise<Database | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);

  if (!databasePromise) {
    databasePromise = Promise.all([import('firebase/app'), import('firebase/database')])
      .then(([appMod, databaseMod]) => {
        const { initializeApp, getApps, getApp } = appMod;
        const { getDatabase } = databaseMod;
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        return getDatabase(app);
      })
      .catch(() => null);
  }

  return databasePromise;
}

/** Raised by the download CTAs, alongside the GA4 `app_download` event. */
export function countDownload(): void {
  void getDatabaseLazy().then(async (db) => {
    if (!db) return;
    const { ref, runTransaction } = await import('firebase/database');
    await runTransaction(ref(db, 'stats/downloads'), (current: number | null) =>
      (typeof current === 'number' ? current : 0) + 1,
    ).catch(() => undefined);
  });
}
