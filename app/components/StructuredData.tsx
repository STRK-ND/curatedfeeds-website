import { jsonLd } from '../lib/seo';
import type { JSX } from 'react';

export type LdNode = Record<string, unknown> | null | undefined;

/**
 * Emits JSON-LD <script> blocks into the document.
 *
 * `null`/`undefined` nodes are dropped so a schema builder can bail out
 * (e.g. `howToLd()` with no steps) without the call site needing a guard.
 */
export function StructuredData({ data }: { data: LdNode | LdNode[] }): JSX.Element {
  const payload = (Array.isArray(data) ? data : [data]).filter(
    (node): node is Record<string, unknown> => node !== null && node !== undefined,
  );

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
