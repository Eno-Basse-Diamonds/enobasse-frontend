import type { MetadataRoute } from "next";

/**
 * Generates the robots.txt configuration.
 *
 * @description Disallows admin, account, cart, checkout, and API routes from
 * being indexed. Points the sitemap to the production URL.
 *
 * @returns The robots metadata route configuration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/account",
        "/cart",
        "/checkout",
        "/orders",
        "/wishlist",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/password-reset-code",
        "/create-new-password",
        "/api/",
      ],
    },
    sitemap: "https://enobasse.com/sitemap.xml",
  };
}
