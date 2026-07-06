import type { MetadataRoute } from "next";

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
