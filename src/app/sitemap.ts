import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api/products";
import { getCollections } from "@/lib/api/collections";
import { getPublishedBlogPosts } from "@/lib/api/blog-posts";
import { logger } from "@/lib/utils/logger";

const BASE_URL = "https://enobasse.com";

export const revalidate = 3600;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/collections", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/faqs", changeFrequency: "yearly", priority: 0.5 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/custom-design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ring-resizing", changeFrequency: "yearly", priority: 0.6 },
  { path: "/maintenance-repairs", changeFrequency: "yearly", priority: 0.6 },
  { path: "/size-guide", changeFrequency: "yearly", priority: 0.5 },
  { path: "/creative-studio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  {
    path: "/shipping-and-return-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

async function getAllProducts() {
  const pageSize = 100;
  const first = await getProducts({ page: 1, pageSize });
  const products = [...first.products];

  const totalPages = first.meta?.totalPages ?? 1;
  for (let page = 2; page <= totalPages; page++) {
    const next = await getProducts({ page, pageSize });
    products.push(...next.products);
  }

  return products;
}

async function getAllPublishedBlogPosts() {
  const perPage = 100;
  const first = await getPublishedBlogPosts(1, perPage);
  const posts = [...first.posts];

  const totalPages = first.totalPages ?? 1;
  for (let page = 2; page <= totalPages; page++) {
    const next = await getPublishedBlogPosts(page, perPage);
    posts.push(...next.posts);
  }

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [productEntries, collectionEntries, blogEntries] = await Promise.all([
    getAllProducts()
      .then((products) =>
        products.map(
          (product): MetadataRoute.Sitemap[number] => ({
            url: `${BASE_URL}/products/${product.slug}`,
            lastModified: product.createdAt
              ? new Date(product.createdAt)
              : undefined,
            changeFrequency: "weekly",
            priority: 0.8,
          }),
        ),
      )
      .catch((error) => {
        logger.error("sitemap: failed to fetch products", error);
        return [];
      }),
    getCollections()
      .then((collections) =>
        collections
          .filter((collection) => collection.published)
          .map(
            (collection): MetadataRoute.Sitemap[number] => ({
              url: `${BASE_URL}/collections/${collection.slug}`,
              changeFrequency: "weekly",
              priority: 0.8,
            }),
          ),
      )
      .catch((error) => {
        logger.error("sitemap: failed to fetch collections", error);
        return [];
      }),
    getAllPublishedBlogPosts()
      .then((posts) =>
        posts.map(
          (post): MetadataRoute.Sitemap[number] => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.updatedAt || post.createdAt,
            changeFrequency: "monthly",
            priority: 0.6,
          }),
        ),
      )
      .catch((error) => {
        logger.error("sitemap: failed to fetch blog posts", error);
        return [];
      }),
  ]);

  return [
    ...staticEntries,
    ...productEntries,
    ...collectionEntries,
    ...blogEntries,
  ];
}
