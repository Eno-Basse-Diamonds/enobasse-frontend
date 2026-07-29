import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

const buildId =
  process.env.NEXT_PUBLIC_BUILD_ID ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.VERCEL_DEPLOYMENT_ID ||
  `local-${Date.now()}`;

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  allowedDevOrigins: ["10.58.84.197"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  async headers() {
    return [
      {
        // Documents must be revalidated so a navigation/reload receives the
        // newest build manifest. API routes and static files manage their own
        // caching separately.
        source: "/((?!api(?:/|$)|_next(?:/|$)|.*\\.[^/]+$).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy category pages → collections
      {
        source: "/product-category/accessories",
        destination: "/collections",
        permanent: true,
      },
      {
        source: "/product-category/rings",
        destination: "/collections/rings",
        permanent: true,
      },
      {
        source: "/product/wedding-band",
        destination: "/collections/rings",
        permanent: true,
      },
      {
        source: "/product/diamond-ring-14/",
        destination: "/collections/rings",
        permanent: true,
      },
      {
        source: "/product/ruby-earring/",
        destination: "/collections/earrings",
        permanent: true,
      },
      {
        source: "/product/ruby-and-heart-ring/",
        destination: "/collections/earrings",
        permanent: true,
      },
      {
        source: "/product/gold-bracelet/",
        destination: "/collections/bracelets",
        permanent: true,
      },
      {
        source: "/product/gold-bead-bangle/",
        destination: "/collections/bracelets",
        permanent: true,
      },
      {
        source: "/product/amora-single-collection/",
        destination: "/collections/amora-collection",
        permanent: true,
      },
      {
        source: "/product/white-gold-bracelet-5/",
        destination: "/collections/bracelets",
        permanent: true,
      },
      {
        source: "/product/diamond-earring-9/",
        destination: "/collections/earrings",
        permanent: true,
      },
      {
        source: "/product/white-gold-bracelet/",
        destination: "/collections/bracelets",
        permanent: true,
      },
      {
        source: "/product/diamond-cross-earring/",
        destination: "/collections/earrings",
        permanent: true,
      },
      {
        source: "/product/square-and-pear-cut-diamond-bangle/",
        destination: "/collections/bracelets",
        permanent: true,
      },
      {
        source: "/collections/bangles",
        destination: "/collections/bracelets",
        permanent: true,
      },

      // Legacy tag and shop pages → products or collections
      {
        source: "/product-tag/necklaces",
        destination: "/collections/necklaces",
        permanent: true,
      },
      {
        source: "/product-tag/diamond-earring",
        destination: "/collections/earrings",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/products",
        permanent: true,
      },

      // Legacy pages with no direct equivalent — redirect to closest match or homepage
      {
        source: "/about-us-3",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/sample-page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/author/admin",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
