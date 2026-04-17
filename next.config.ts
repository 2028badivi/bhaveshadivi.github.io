import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.cdn-luma.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  // Deploys at the root of `bhaveshadivi.github.io`.
  basePath: undefined,
  allowedDevOrigins: ["127.0.2.2", "localhost:3000"],
};

export default nextConfig;
