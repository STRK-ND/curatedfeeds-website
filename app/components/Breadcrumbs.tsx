import Link from 'next/link';

export type Crumb = { name: string; url: string };

/**
 * Visible breadcrumb trail for inner pages.
 * The machine-readable BreadcrumbList is emitted separately via breadcrumbLd()
 * in each page's StructuredData, this component is the human-facing UI.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '1rem 1.5rem 0' }}>
      <ol
        style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          margin: 0,
          padding: 0,
          fontSize: '0.85rem',
          color: 'var(--color-text-tertiary, #99a)',
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.url} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              {isLast ? (
                <span aria-current="page" style={{ color: 'var(--color-text-secondary, #ccd)' }}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.url}>{item.name}</Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
