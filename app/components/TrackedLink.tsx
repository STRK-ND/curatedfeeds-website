'use client';

import type { ReactNode } from 'react';

type CommonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

/**
 * Anchor that fires a `cta_click` analytics event on activation.
 *
 * This tiny client island exists so the pages containing it stay fully
 * server-rendered: the whole homepage HTML, including the JSON-LD structured
 * data and the visible copy, ships in the first response, which is what
 * Googlebot needs in order to index and evaluate the content.
 */
export function TrackedLink({
  href,
  children,
  className,
  ariaLabel,
  target,
  rel,
  event,
  location,
}: CommonProps & { event: string; location: string }) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      onClick={() => {
        // Loaded lazily so the Firebase SDK never blocks initial render.
        void import('../firebase').then(({ logCTAClick }) => logCTAClick(event, location));
      }}
    >
      {children}
    </a>
  );
}

/** Anchor that fires an `app_download` analytics event on activation. */
export function TrackedDownloadLink({
  href,
  children,
  className,
  ariaLabel,
  target,
  rel,
  platform = 'direct',
}: CommonProps & { platform?: string }) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      onClick={() => {
        void import('../firebase').then(({ logAppDownload }) => logAppDownload(platform));
      }}
    >
      {children}
    </a>
  );
}
