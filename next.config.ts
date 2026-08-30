import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // Enable React Strict Mode for better dev warnings
  reactStrictMode: true,
  // Optimize images and allow remote patterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Enable experimental image optimization (Next 13+)
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  // Custom security headers via async headers function
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" },
        ],
      },
    ];
  },
  // Enable SWC minification for faster builds

};

export default nextConfig;
