import type { ReactNode } from 'react';
import Link from 'next/link';

type Action = { label: string; href: string };

/** A link that stays a client-side route only when it points at this site. */
function CtaLink({ action, primary }: { action: Action; primary: boolean }) {
  const className = primary ? 'cta-button primary' : 'cta-button secondary';
  if (action.href.startsWith('http')) {
    return (
      <a href={action.href} className={className}>
        {action.label}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

/** The closing band used at the bottom of the content pages. */
export default function CtaBand({
  title,
  children,
  primary,
  secondary,
}: {
  title: string;
  children: ReactNode;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section className="blog-cta">
      <h2>{title}</h2>
      <p>{children}</p>
      <div className="blog-cta-actions">
        <CtaLink action={primary} primary />
        {secondary && <CtaLink action={secondary} primary={false} />}
      </div>
    </section>
  );
}
