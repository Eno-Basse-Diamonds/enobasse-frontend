import { Product, ProductFilterOptions, ProductsResponse } from "@/modules/products/types";
import { api } from "@/shared/utils/api";

/**
 * Fetches paginated products.
 *
 * @description Fetches paginated products with optional filters.
 * @param options - Filter, pagination, and sort options
 * @returns Paginated products response
 */
export const getProducts = async (options?: ProductFilterOptions): Promise<ProductsResponse> => {
  // Strip out empty arrays so they aren't sent as noise to the backend
  const params = options
    ? Object.fromEntries(
        Object.entries(options).filter(
          ([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0),
        ),
      )
    : undefined;
  return api.get("/products", { params });
};

/**
 * Fetches a product by slug.
 *
 * @description Fetches a single product by its slug.
 * @param slug - The product slug
 * @param currency - The currency code for pricing
 * @returns The product
 */
export const getProduct = async (slug: string, currency: string): Promise<Product> => {
  return api.get(`/products/${slug}`, {
    params: { currency: currency },
    cache: false,
  });
};

/**
 * Fetches related products.
 *
 * @description Fetches related products for a given slug.
 * @param slug - The product slug
 * @param limit - Maximum number of related products
 * @param currency - The currency code for pricing
 * @returns Array of related products
 */
export const getRelatedProducts = async (
  slug: string,
  limit: number,
  currency: string,
): Promise<Product[]> => {
  return api.get(`/products/${slug}/related`, { params: { limit, currency } });
};

export interface AdminProductsFilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "createdAt" | "updatedAt" | "price";
  sortOrder?: "ASC" | "DESC";
  search?: string;
  collectionId?: string;
  currency?: string;
}

export interface AdminProductsResponse {
  products: Product[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Fetches products for admin.
 *
 * @description Fetches paginated products for the admin panel.
 * @param options - Admin filter, pagination, and sort options
 * @returns Paginated admin products response
 */
export const getProductsForAdmin = async (
  options?: AdminProductsFilterOptions,
): Promise<AdminProductsResponse> => {
  return api.get("/products", {
    params: { ...options, view: "admin" },
    cache: false,
  });
};

/**
 * Creates a product.
 *
 * @description Creates a new product.
 * @param productData - The complete product data with variants
 * @returns The created product
 */
export const createProduct = async (productData: {
  sku: string;
  name: string;
  category: string;
  collections: string[];
  slug: string;
  description: string;
  priceRange: { min: number; max: number; currency: string };
  images: Array<{ url: string; alt: string }>;
  gemstones?: Array<{ type: string; weightCarat?: string }>;
  metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
  variants: Array<{
    sku: string;
    title: string;
    price: number;
    currency: string;
    gemstones?: Array<{ type: string; weightCarat?: string }>;
    metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
    inventory: { quantity: number; inStock: boolean };
    images: Array<{ url: string; alt: string }>;
  }>;
  isCustomDesign?: boolean;
}): Promise<Product> => {
  return api.post("/products", productData);
};

/**
 * Updates a product.
 *
 * @description Updates an existing product.
 * @param id - The product ID
 * @param productData - The partial product data to update
 * @returns The updated product
 */
export const updateProduct = async (
  id: string,
  productData: Partial<{
    sku: string;
    name: string;
    category: string;
    collections: string[];
    slug: string;
    description: string;
    priceRange: { min: number; max: number; currency: string };
    images: Array<{ url: string; alt: string }>;
    gemstones?: Array<{ type: string; weightCarat?: string }>;
    metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
    variants: Array<{
      sku: string;
      title: string;
      price: number;
      currency: string;
      gemstones?: Array<{ type: string; weightCarat?: string }>;
      metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
      inventory: { quantity: number; inStock: boolean };
      images: Array<{ url: string; alt: string }>;
    }>;
    isCustomDesign?: boolean;
  }>,
): Promise<Product> => {
  return api.patch(`/products/${id}`, productData);
};

/**
 * Deletes a product.
 *
 * @description Deletes a product by its ID.
 * @param id - The product ID
 */
export const deleteProduct = async (id: string): Promise<void> => {
  return api.delete(`/products/${id}`);
};
