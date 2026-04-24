import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/financial-assistance",
        destination: "/:locale/pro-bono",
        permanent: true,
      },
      {
        source: "/:locale/register",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/register/:path*",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/account",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/forgot-password",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/admin/:path*",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/admin",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/dashboard/:path*",
        destination: "/:locale/apply",
        permanent: false,
      },
      {
        source: "/:locale/dashboard",
        destination: "/:locale/apply",
        permanent: false,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Other security options
  poweredByHeader: false, // Remove X-Powered-By header

  // Bundle optimization - auto tree-shake barrel imports,
  // inline critical CSS instead of shipping multiple render-blocking
  // stylesheet links.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
    inlineCss: true,
  },

  // Images configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
