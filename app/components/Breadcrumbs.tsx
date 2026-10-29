import Link from 'next/link';

export type Crumb = { name: string; url: string };

/**
 * Visible breadcrumb trail for inner pages.
 * The machine-readable BreadcrumbList is emitted separately via breadcrumbLd()
 * in each page's StructuredData, this component is the human-facing UI.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.url}>
              {isLast ? (
                <span aria-current="page">{item.name}</span>
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
