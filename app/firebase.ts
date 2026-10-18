import type { DataSnapshot, Database } from 'firebase/database';

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

/* ------------------------------------------------------------------ *
 * Live visitor counter (Realtime Database)
 *
 * Real data, no estimates: every open page registers a presence node and
 * heartbeats it, while `stats/totalVisitors` and `stats/downloads` are
 * raised with server-side transactions, so two simultaneous clicks raise
 * the count by two rather than clobbering each other.
 * ------------------------------------------------------------------ */

const PRESENCE_HEARTBEAT_MS = 20000;
const PRESENCE_TTL_MS = 90000;
const PRESENCE_SCAN_LIMIT = 500;
const SESSION_KEY = 'cf_visitor_session';
const VISITED_KEY = 'cf_visited';
type CounterName = 'totalVisitors' | 'downloads';

let databasePromise: Promise<Database | null> | null = null;

/** Resolve the Realtime Database instance on demand; never throws. */
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
      .catch(() => null); // A counter outage must never break the page.
  }

  return databasePromise;
}

/** Stable per-tab session id, created once and reused across heartbeats. */
export function getVisitorSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * Register this tab in the presence tree and heartbeat it. Returns a stop
 * function; `onDisconnect().remove()` also drops the node if the tab closes
 * without running the pagehide handler.
 */
export async function startPresence(): Promise<() => void> {
  const db = await getDatabaseLazy();
  if (!db) return () => undefined;

  const { ref, set, serverTimestamp, onDisconnect, remove } = await import('firebase/database');
  const presenceRef = ref(db, `presence/${getVisitorSessionId()}`);

  const beat = () => void set(presenceRef, { t: serverTimestamp() });
  beat();
  await onDisconnect(presenceRef).remove().catch(() => undefined);

  const heartbeat = window.setInterval(beat, PRESENCE_HEARTBEAT_MS);
  window.addEventListener(
    'pagehide',
    () => {
      window.clearInterval(heartbeat);
      void remove(presenceRef);
    },
    { once: true },
  );

  return () => {
    window.clearInterval(heartbeat);
    void remove(presenceRef);
  };
}

/** Live visitor count: presence nodes heartbeated within the TTL window. */
export function subscribeLiveCount(cb: (count: number) => void): () => void {
  const unsubscribers: Array<() => void> = [];

  void getDatabaseLazy().then(async (db) => {
    if (!db) return;
    const { ref, query, orderByChild, limitToLast, onValue, off } = await import('firebase/database');
    const liveQuery = query(ref(db, 'presence'), orderByChild('t'), limitToLast(PRESENCE_SCAN_LIMIT));

    const onLive = (snapshot: DataSnapshot) => {
      const cutoff = Date.now() - PRESENCE_TTL_MS;
      let live = 0;
      snapshot.forEach((child) => {
        const beatenAt = child.child('t').val();
        if (typeof beatenAt === 'number' && beatenAt >= cutoff) live += 1;
      });
      cb(live);
    };

    onValue(liveQuery, onLive);
    unsubscribers.push(() => off(liveQuery, 'value', onLive));
  });

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}

/** Subscribe to a stat (`totalVisitors` or `downloads`). */
export function subscribeCounter(
  counter: CounterName,
  cb: (value: number) => void,
): () => void {
  const unsubscribers: Array<() => void> = [];

  void getDatabaseLazy().then(async (db) => {
    if (!db) return;
    const { ref, onValue, off } = await import('firebase/database');
    const counterRef = ref(db, `stats/${counter}`);

    const onCounter = (snapshot: DataSnapshot) => {
      const value = snapshot.val();
      cb(typeof value === 'number' ? value : 0);
    };

    onValue(counterRef, onCounter);
    unsubscribers.push(() => off(counterRef, 'value', onCounter));
  });

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}

/**
 * Raise a counter through a transaction. `oncePerBrowser` keeps the total
 * visitor count unique per device instead of counting every page load.
 */
function incrementCounter(counter: CounterName, oncePerBrowser: boolean): void {
  if (oncePerBrowser) {
    if (localStorage.getItem(VISITED_KEY) === '1') return;
    localStorage.setItem(VISITED_KEY, '1');
  }

  void getDatabaseLazy().then(async (db) => {
    if (!db) return;
    const { ref, runTransaction } = await import('firebase/database');
    const counterRef = ref(db, `stats/${counter}`);
    await runTransaction(counterRef, (current: number | null) =>
      (typeof current === 'number' ? current : 0) + 1,
    ).catch(() => undefined);
  });
}

/** Raised by the download CTAs, alongside the GA4 `app_download` event. */
export function countDownload(): void {
  incrementCounter('downloads', false);
}

/** Raised once per browser, from the stats widget on first paint. */
export function countVisitorOnce(): void {
  incrementCounter('totalVisitors', true);
}
