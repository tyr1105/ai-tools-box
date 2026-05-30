import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-tools-box",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
