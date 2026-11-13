import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo (Alex-Houle/newSite) from a sub-path:
 * https://alex-houle.github.io/newSite/
 * The basePath is prepended to every asset and Link href automatically.
 */
const repoName = "newSite";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export -> emits plain HTML into `out/`, deployable to GitHub Pages
  // (which only serves static files, no Node server).
  output: "export",
  basePath: `/${repoName}`,
};

export default nextConfig;
