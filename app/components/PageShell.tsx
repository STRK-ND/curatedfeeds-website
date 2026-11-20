import type { ReactNode } from 'react';
import type { Crumb } from '../lib/seo';
import { breadcrumbLd } from '../lib/seo';
import Nav from './Nav';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { StructuredData, type LdNode } from './StructuredData';

type Props = {
  /** The visible trail. The matching BreadcrumbList JSON-LD is emitted here too. */
  crumbs?: Crumb[];
  /** Page-specific schema nodes. */
  data?: LdNode | LdNode[];
  mainClass?: string;
  navOverlay?: boolean;
  children: ReactNode;
};

/**
 * The chrome every page shares: nav, breadcrumbs, `<main id="main">`, footer,
 * and the structured data block. A page supplies its own sections as children.
 */
export default function PageShell({
  crumbs,
  data = [],
  mainClass,
  navOverlay = false,
  children,
}: Props) {
  const nodes = [
    ...(crumbs ? [breadcrumbLd(crumbs)] : []),
    ...(Array.isArray(data) ? data : [data]),
  ];

  return (
    <>
      <StructuredData data={nodes} />
      <Nav overlay={navOverlay} />
      {crumbs && <Breadcrumbs items={crumbs} />}
      <main id="main" className={mainClass}>
        {children}
      </main>
      <Footer />
    </>
  );
}
