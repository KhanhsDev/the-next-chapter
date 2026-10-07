/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // GitHub Pages
  basePath: "/the-next-chapter",
  assetPrefix: "/the-next-chapter/",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

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
