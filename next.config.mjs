/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  cacheComponents: false,
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
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
