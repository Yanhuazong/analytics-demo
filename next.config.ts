import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo-name>/, not from the
// domain root, so the built app needs its basePath/assetPrefix set to
// match — otherwise every asset (CSS, JS, images) 404s once deployed.
// The deploy workflow (.github/workflows/deploy.yml) sets GITHUB_REPOSITORY
// automatically; locally (npm run dev / npm run build) this is skipped, so
// dev keeps working at the domain root.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let basePath = "";
let assetPrefix = "";

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  // Skip this if your repo IS named <username>.github.io — that one
  // deploys at the domain root and needs no basePath at all.
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix,
};

export default nextConfig;
