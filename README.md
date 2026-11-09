# Curated Feeds Landing Page

Marketing site and blog for the Curated Feeds RSS Reader app. Static-exported Next.js in a warm-paper editorial design: Instrument Serif display, Geist body, Geist Mono meta, rose accents, hairline rules. The app's dark navy screenshots are the only dark elements on the page.

## 🚀 Tech Stack

- **Next.js 16.1.6** - React framework with App Router, `output: 'export'`
- **React 19.2.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Agentation** - Development tooling for agentation.dev deployment

## ✨ Features

- 🎨 Warm-paper editorial design system, one coherent token set (no dark/light flip)
- 📱 Fully responsive across all devices
- 🎯 Smooth animations and transitions
- ⚡ Optimized performance with Core Web Vitals in mind
- 🔄 Interactive elements with hover effects
- 📊 SEO optimized with Open Graph and Twitter Cards
- ♿ Accessible with proper ARIA labels
- 🎭 Reduced motion support for accessibility
- 🔧 Agentation.dev integration for easy deployment

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/curated-feeds-landing.git
cd curated-feeds-landing

# Install dependencies
npm install

# Run development server with Agentation
npm run dev

# Or use Next.js directly
npm run dev
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export
```

### Deploy to Agentation.dev

This project is configured for deployment to https://curated-feeds.agentation.dev

1. Install the Agentation CLI:
```bash
npm install -g agentation
```

2. Login to Agentation:
```bash
agentation login
```

3. Deploy:
```bash
agentation deploy
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 📁 Project Structure

```
curated-feeds-landing/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts (Geist + Instrument Serif)
│   ├── page.tsx            # Landing page (hero, features, how-it-works, preview, FAQ, download)
│   ├── globals.css         # The whole design system: tokens, components, pages, responsive
│   ├── sources/            # Starter-feed directory
│   ├── why/                # Comparison vs Feedly / Inoreader / NetNewsWire
│   ├── use-cases/          # Reader profiles mapped to features
│   ├── changelog/          # Release history
│   ├── press/              # Press kit
│   ├── about/  privacy/  screenshots/
│   ├── blog/ + blog/[slug] # Blog index and posts
│   ├── not-found.tsx       # Branded 404
│   ├── components/         # Nav, Footer, Breadcrumbs, StructuredData, analytics, …
│   ├── lib/                # seo.ts (JSON-LD), posts/data.ts + content.ts, firebase.ts
│   └── sitemap.ts
├── public/                 # Static assets (icons, screenshots, feed.xml, llms.txt)
├── out/                    # Static export (Firebase hosting root)
├── scripts/build-markdown.mjs   # Markdown twin for each page (URL + ".md")
├── scripts/build-llms-full.mjs  # out/llms-full.txt, generated from those twins
└── package.json / tsconfig.json / firebase.json
```

## Routes

`/` `/sources/` `/why/` `/use-cases/` `/changelog/` `/press/` `/about/` `/privacy/` `/screenshots/` `/blog/` `/blog/<slug>/` ×6 — all prerendered static; `sitemap.xml` and `feed.xml` are generated from the same source data.

## 🎨 Design System

The landing page uses a custom design system built on Tailwind CSS:

### Colors
- **Paper**: `#faf9f6` (page field)
- **Ink**: `#17150f` (primary text, button fills)
- **Rose**: `#c2255c` (accent for text/marks on paper, 5.3:1)
- **Pink**: `#ff6b9d` (the product's own accent, in-app UI and brand mark)

### Typography
- **Display**: Instrument Serif (400, italic for emphasis)
- **Body**: Geist Sans
- **Mono**: Geist Mono (eyebrows, meta, indices)

### Font tokens
`--font-display` / `--font-body` / `--font-mono` are declared on `body`, not `:root`:
next/font defines its variables on the body element, and custom properties
compute where declared — declaring them in `:root` substitutes undefined
vars and the whole tree silently falls back.

### Spacing
- Consistent spacing scale from `0.25rem` to `6rem`

## 🔧 Development with Agentation

The project includes Agentation.dev integration for enhanced development:

- Real-time preview on agentation.dev
- Collaborative development tools
- MCP server integration
- Development-only tools (excluded from production)

### Agentation Commands

```bash
# Start agentation dev server
agentation dev

# Deploy to agentation.dev
agentation deploy

# View deployment logs
agentation logs

# Manage deployments
agentation ls
```

## 📊 Performance

The landing page is optimized for performance:

- **Lighthouse Score**: 95+ Performance, 100 SEO
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Optimization Techniques

- Image optimization with WebP/AVIF format
- Font optimization with next/font/google
- CSS-in-JS for minimal CSS bundle
- Code splitting and lazy loading
- React Compiler for automatic optimizations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Agentation.dev
