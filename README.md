# Curated Feeds landing page

Marketing site and blog for the Curated Feeds RSS reader app. It is a static-exported Next.js site: ink ground, cream text, one gold accent, Instrument Serif display and Inter Tight body.

## Tech stack

- Next.js 16.1.6 with the App Router and `output: 'export'`
- React 19.2.3
- TypeScript
- Tailwind CSS 4 through PostCSS. The design system itself is hand-written CSS in `app/`.
- Agentation for development tooling

## Features

- One token set in `app/tokens.css`, with no dark/light flip
- One gutter and section-gap scale, from `clamp()` values, across every page
- GSAP motion in `app/lib/motion`, one scene per page section, with reduced-motion support
- JSON-LD for the app, FAQ, breadcrumbs and articles, built in `app/lib/seo.ts`
- A Markdown twin for every page, written by `scripts/build-markdown.mjs`
- `feed.xml`, `manifest.webmanifest` and `sitemap.xml` generated from `app/lib/site.ts` and `app/lib/posts/data.ts`

## Installation

```bash
git clone https://github.com/yourusername/curated-feeds-landing.git
cd curated-feeds-landing
npm install
npm run dev
```

`npm run dev:agentation` starts the dev server with Agentation attached.

## Build and deploy

```bash
npm run build
```

`build` runs `next build`, then writes the Markdown twins and `out/llms-full.txt`. The static export lands in `out/`.

### Deploy to Agentation.dev

This project is configured for https://curated-feeds.agentation.dev.

```bash
npm install -g agentation
agentation login
agentation deploy
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Project structure

```
curated-feeds-landing/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts: Inter Tight and Instrument Serif
│   ├── page.tsx            # Landing page (hero, features, how-it-works, preview, FAQ, download)
│   ├── globals.css         # The design system: tokens, components, pages, responsive
│   ├── sources/            # Starter-feed directory
│   ├── why/                # Comparison against Feedly, Inoreader and NetNewsWire
│   ├── use-cases/          # Reader profiles mapped to features
│   ├── changelog/          # Release history
│   ├── press/              # Press kit
│   ├── about/  privacy/  screenshots/
│   ├── blog/ + blog/[slug] # Blog index and posts
│   ├── not-found.tsx       # Branded 404
│   ├── components/         # PageShell, Nav, Footer, FaqList, analytics
│   ├── lib/                # site.ts (URL + page metadata), nav.ts, seo.ts (JSON-LD), posts/, motion/
│   ├── feed.xml/           # RSS feed, generated from POSTS
│   ├── manifest.webmanifest/  # PWA manifest, generated from site.ts
│   └── sitemap.ts
├── public/                 # Static assets (icons, screenshots, llms.txt)
├── out/                    # Static export (Firebase hosting root)
├── scripts/build-markdown.mjs   # A Markdown twin for each page, at the page URL plus .md
├── scripts/build-llms-full.mjs  # out/llms-full.txt, generated from those twins
└── package.json / tsconfig.json / firebase.json
```

## Routes

Every route below is prerendered. `sitemap.xml` and `feed.xml` come from the same data.

```
/
/sources/
/why/  /why/feedly/  /why/inoreader/
/use-cases/
/changelog/
/press/
/about/  /privacy/  /screenshots/
/tools/find-feed/
/blog/
/blog/<slug>/   six posts
```

## Design system

### Colours

- Ink `#0b0a09`: page ground
- Cream `#f4ece0`: body text
- Gold `#d9a566`: the single accent
- Rose `#ff6b9d`: the product mark

### Type

- Display: Instrument Serif, 400, italic for emphasis
- Body: Inter Tight
- Labels and meta: uppercase Inter Tight with letter spacing

`next/font` self-hosts both families and sets `--font-serif-web` and `--font-sans-web` on `<html>`. `app/tokens.css` reads those variables and keeps the plain family names as fallbacks.

### Spacing

From `--space-3xs`, 2px, to `--space-4xl`, 144px. Three section gaps and one container width sit on top.

## Development with Agentation

Agentation adds a live preview at agentation.dev, a browser overlay for annotations, and an MCP server. It is loaded only when `NODE_ENV` is `development`.

```bash
npm run dev:agentation   # dev server with Agentation
agentation deploy        # publish a preview
agentation logs          # deployment logs
agentation ls            # list deployments
```

## Performance

What the build does today:

- Static HTML for every route, with no server render at request time
- Fonts self-hosted through `next/font`, so no request goes to fonts.googleapis.com
- A responsive WebP hero at four widths, with the JPEG as the fallback
- GSAP and the Firebase SDK loaded with dynamic `import()`, off the critical path
- React Compiler enabled in `next.config.ts`

Run Lighthouse against the deployed site for current numbers.

## Browser support

Current Chrome, Firefox, Safari and Edge. The layout uses CSS grid, `clamp()` and `svh` units.

## Licence

The written content on the site is published under CC BY 4.0, as stated on `/about/`. The Curated Feeds name and logo stay trademarks of the project.

## Contributing

Open an issue or a pull request.
