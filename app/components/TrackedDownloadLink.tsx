'use client';

import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  platform?: string;
};

/**
 * Anchor that logs an `app_download` event on activation.
 *
 * A client island this small keeps the pages around it fully server-rendered,
 * so the whole HTML, JSON-LD included, ships in the first response.
 */
export function TrackedDownloadLink({
  href,
  children,
  className,
  ariaLabel,
  target,
  rel,
  platform = 'direct',
}: Props) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      onClick={() => {
        // Loaded lazily so the Firebase SDK never blocks initial render.
        void import('../firebase').then(({ logAppDownload }) => logAppDownload(platform));
      }}
    >
      {children}
    </a>
  );
}
