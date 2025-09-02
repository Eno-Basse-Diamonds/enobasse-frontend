import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/webp"],
    qualities: [75, 100],
  },
  async redirects() {
    return [
      // CATEGORY PAGES (Old) to COLLECTIONS (New)
      {
        source: '/product-category/accessories',
        destination: '/collections',
        permanent: true,
      },
      {
        source: '/product-category/rings',
        destination: '/collections/rings',
        permanent: true,
      },
      {
        source: '/product/wedding-band',
        destination: '/collections/rings',
        permanent: true,
      },
      {
        source: '/product/diamond-ring-14/',
        destination: '/collections/rings',
        permanent: true,
      },
      {
        source: '/product/ruby-earring/',
        destination: '/collections/earrings',
        permanent: true,
      },
      {
        source: '/product/ruby-and-heart-ring/',
        destination: '/collections/earrings',
        permanent: true,
      },
      {
        source: '/product/gold-bracelet/',
        destination: '/collections/bracelets',
        permanent: true,
      },
      {
        source: '/product/gold-bead-bangle/',
        destination: '/collections/bangles',
        permanent: true,
      },
      {
        source: '/product/amora-single-collection/',
        destination: '/collections/amora-collection',
        permanent: true,
      },
      {
        source: '/product/white-gold-bracelet-5/',
        destination: '/collections/bracelets',
        permanent: true,
      },
      {
        source: '/product/diamond-earring-9/',
        destination: '/collections/earrings',
        permanent: true,
      },
      {
        source: '/product/white-gold-bracelet/',
        destination: '/collections/bracelets',
        permanent: true,
      },
      {
        source: '/product/diamond-cross-earring/',
        destination: '/collections/earrings',
        permanent: true,
      },
      {
        source: '/product/square-and-pear-cut-diamond-bangle/',
        destination: '/collections/bangles',
        permanent: true,
      },

      // OLD TAGS & SHOP PAGES
      {
        source: '/product-tag/necklaces',
        destination: '/collections/necklaces',
        permanent: true,
      },
      {
        source: '/product-tag/diamond-earring',
        destination: '/collections/earrings',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/products',
        permanent: true,
      },

      // OLD PAGES (No Direct Equivalent - Redirect to Homepage or Closest Page)
      {
        source: '/about-us-3',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/sample-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author/admin',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
