# Curated Feeds Landing Page

A stunning Next.js 16+ landing page for the Curated Feeds RSS Reader app, featuring a dark elegant design with indigo-purple gradient theme, smooth animations, and full responsiveness.

## 🚀 Tech Stack

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Agentation** - Development tooling for agentation.dev deployment

## ✨ Features

- 🎨 Dark elegant design with indigo-purple gradient theme
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
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── .agentation/           # Agentation configuration
├── .mcp.json             # MCP server configuration
├── .mcpignore            # MCP ignore patterns
├── .gitignore            # Git ignore patterns
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment config
```

## 🎨 Design System

The landing page uses a custom design system built on Tailwind CSS:

### Colors
- **Background**: `#0d0e1a` (deep navy)
- **Gradient**: Indigo to purple (`#1a1b4d` → `#2d2f73` → `#4a3b5c`)
- **Accent**: `#ff6b9d` (pink/coral)
- **Surface**: `rgba(255, 255, 255, 0.03)` (subtle transparency)

### Typography
- **Display**: Geist Sans (600 weight)
- **Body**: Geist Sans (400-600 weight)
- **Mono**: Geist Mono

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
