/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  // GitHub Pages cần static export
  trailingSlash: true,
  cacheComponents: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
