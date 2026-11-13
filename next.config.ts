import type { NextConfig } from "next";

/**
 * Custom domain deployment — https://alexhoule.com
 * Served by GitHub Pages at the domain root, so there is no basePath.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export -> emits plain HTML into `out/`, deployable to GitHub Pages
  // (which only serves static files, no Node server).
  output: "export",
  basePath: "",
};

export default nextConfig;
