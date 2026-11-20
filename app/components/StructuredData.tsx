import { jsonLd } from '../lib/seo';
import type { JSX } from 'react';

export type LdNode = Record<string, unknown>;

/** Emits one JSON-LD <script> per node. */
export function StructuredData({ data }: { data: LdNode | LdNode[] }): JSX.Element {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(node) }}
        />
      ))}
    </>
  );
}
