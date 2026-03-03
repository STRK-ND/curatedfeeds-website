/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler (experimental in Next.js 16)
  reactCompiler: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },

  // Performance optimizations
  compress: true,

  // Build output
  output: 'standalone',

  // Turbopack config
  turbopack: {},

  // Experimental features
  experimental: {
    // Optimize CSS
    optimizeCss: true,
    // Optimize package imports
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Headers for better performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;