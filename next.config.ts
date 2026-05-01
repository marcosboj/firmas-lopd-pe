import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/firmas-lopd-pe',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
