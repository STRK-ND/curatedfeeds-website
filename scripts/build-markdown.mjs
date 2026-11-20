#!/usr/bin/env node
/**
 * Generate Markdown versions of every exported page.
 *
 * Runs after `next build`, over the static export in `out/`. Each page's
 * <main> element is converted to Markdown and written next to the page's
 * directory, so the URL of the Markdown file mirrors the page URL:
 *
 *   out/index.html           -> out/index.md            (/)
 *   out/about/index.html     -> out/about.md            (/about/)
 *   out/blog/slug/index.html -> out/blog/slug.md        (/blog/slug/)
 *
 * The Markdown is derived from the rendered HTML rather than written by hand,
 * so it cannot drift from what the page actually says. Only <main> is
 * converted: nav and footer are chrome that repeats on every page.
 *
 * The .md sibling of a page is what the agentic-readiness checks look for
 * when they ask whether a Markdown version of the page is reachable.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const OUT_DIR = path.resolve('out');

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
});

/** Icon-only SVGs carry no words; drop them rather than emit empty images. */
turndown.addRule('stripSvg', {
  filter: ['svg'],
  replacement: () => '',
});

/** <details> is an interactive disclosure in HTML. As plain Markdown a bold
 *  question followed by its answer reads the same and loses no content. */
turndown.addRule('faqDisclosure', {
  filter: ['summary'],
  replacement: (content) => `\n\n**${content.trim()}**\n`,
});

/** A heading whose text is split across child spans ("Your feeds," +
 *  "curated.") reads as two separate headings in Markdown. Join the parts
 *  back into one line, with a space where the CSS put a line break.
 *
 * The one child that keeps its markup is an <a>: a heading that links
 *  somewhere (a card title on the blog index) must not lose its href, so a
 *  link child is re-turndowned instead of flattened to text. */
turndown.addRule('joinSplitHeadings', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: (content, node) => {
    const level = node.nodeName.toLowerCase();
    // JSX drops the whitespace between sibling elements, so the spans arrive
    // with no separator at all ("Your feeds,curated."). Rebuild the heading
    // from the child nodes, one space apart.
    const elements = [];
    for (const child of node.childNodes) {
      if (child.nodeType === 3) elements.push(child.nodeValue);
      else if (child.nodeType === 1) {
        // Keep links as links: turndown the child so its href survives.
        if (child.nodeName === 'A') elements.push(turndown.turndown(child.outerHTML).trim());
        else elements.push(child.textContent);
      }
    }
    const text = (elements.length ? elements.join(' ') : content)
      .replace(/\s*\n+\s*/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return text ? `\n\n${'#'.repeat(Number(level.slice(1)))} ${text}\n\n` : '';
  },
});

/** Adjacent inline elements (a date, a read time, a tag list) have no
 *  separator in the HTML, so their text runs together in Markdown. Put each
 *  on its own line, which is how the page renders them visually. */
const INLINE_META = [
  'hero__actions', 'hero__meta', 'blog-row-meta', 'blog-post-meta',
  'blog-cta-actions', 'footer__links', 'download__panel',
];

turndown.addRule('separateInlineMeta', {
  filter: (node) => node.nodeName === 'DIV' && INLINE_META.includes(node.getAttribute('class') || ''),
  replacement: (content, node) => {
    const parts = [];
    // Turndown parses with domino, whose nodes expose childNodes, not the
    // DOM's children shorthand.
    for (const child of node.childNodes) {
      if (child.nodeType !== 1) continue;
      const text = turndown.turndown(child.outerHTML).trim();
      if (text) parts.push(text);
    }
    return parts.length ? `\n\n${parts.join('\n\n')}\n\n` : '';
  },
});

/** "Back to Blog" is navigation chrome, not part of the article. */
turndown.addRule('stripBackLink', {
  filter: (node) => node.getAttribute?.('class') === 'blog-post-meta-top',
  replacement: () => '',
});

/** Collect every exported HTML file, skipping the error pages. */
async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '_next' || entry.name === '.firebase') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await htmlFiles(full)));
    } else if (entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

/** The exported page body, without the nav/footer chrome. */
function extractMain(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return match ? match[1] : '';
}

/** Sibling path for a page: index.html -> index.md, about/index.html -> about.md. */
function markdownPathFor(htmlPath) {
  const rel = path.relative(OUT_DIR, htmlPath);
  const withoutExt = rel.replace(/\.html$/, '').replace(/[\\/]index$/, '');
  return path.join(OUT_DIR, `${withoutExt}.md`);
}

/** The page title, used only when the body has no H1 of its own. */
function titleFor(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : 'Curated Feeds';
}

/** The text of the body's first H1, if it has one. The page's <title> is the
 *  better heading source than a hand-prefixed line, because Next's title
 *  template appends "| Curated Feeds" to a title that already ends in it. */
function firstHeading(bodyHtml) {
  const match = bodyHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  const text = match[1]
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text || null;
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error('build-markdown: out/ not found. Run `next build` first.');
    process.exit(1);
  }

  const files = await htmlFiles(OUT_DIR);
  let written = 0;

  for (const file of files) {
    const html = await readFile(file, 'utf8');

    // The 404 page must stay a 404 and must stay noindex; it is not a page
    // anyone should be able to fetch a Markdown twin of.
    if (/rel="canonical"[^>]*404/.test(html) || /noindex/.test(html)) continue;

    const body = extractMain(html)
      .replace(/<script\b[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '');

    if (!body.trim()) continue;

    let markdown = turndown
      .turndown(body)
      // Collapse the blank-line runs that block-level conversions leave behind.
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!markdown) continue;

    // A page whose body has an H1 of its own keeps it. Otherwise the document
    // needs one H1 to be a valid Markdown page, and the page's own H1 text is
    // a better heading than the <title> (Next's title template appends the
    // site name, so the title reads "Title | Curated Feeds | Curated Feeds").
    const heading = firstHeading(body);
    if (!heading) {
      markdown = `# ${titleFor(html)}\n\n${markdown}`;
    }

    await writeFile(markdownPathFor(file), `${markdown}\n`, 'utf8');
    written += 1;
  }

  console.log(`build-markdown: wrote ${written} Markdown files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
