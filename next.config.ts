import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.lemonsqueezy.com',
      'images.squarespace-cdn.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.lemonsqueezy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
