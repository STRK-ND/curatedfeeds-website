export type QA = { q: string; a: string };

/**
 * The site's one FAQ disclosure list. Pages pass the same array to this and
 * to faqPageLd()/qaPageLd(), so the visible answers and the structured data
 * cannot say different things.
 */
export default function FaqList({ items, openFirst = false }: { items: QA[]; openFirst?: boolean }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.q} className="faq-item" open={openFirst && i === 0}>
          <summary>{item.q}</summary>
          <div>
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
