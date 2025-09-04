import {
  Product,
  ProductFilterOptions,
  ProductsResponse,
} from "@/lib/types/products";
import { api } from "@/lib/utils/api";

export const getProducts = async (
  options?: ProductFilterOptions,
): Promise<ProductsResponse> => {
  return api.get("/products", { params: options });
};

export const getProduct = async (
  slug: string,
  currency: string,
): Promise<Product> => {
  return api.get(`/products/${slug}`, { params: { currency: currency } });
};

export const getRelatedProducts = async (
  slug: string,
  limit: number,
  currency: string,
): Promise<Product[]> => {
  return api.get(`/products/${slug}/related`, { params: { limit, currency } });
};

// Admin endpoints
export interface AdminProductsFilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "createdAt" | "updatedAt" | "category" | "price";
  sortOrder?: "ASC" | "DESC";
  search?: string;
  category?: string;
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

export const getProductsForAdmin = async (
  options?: AdminProductsFilterOptions,
): Promise<AdminProductsResponse> => {
  return api.get("/products", { params: options, cache: false });
};

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
  customDesignDetails: string;
}): Promise<Product> => {
  return api.post("/products", productData);
};

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
    customDesignDetails: string;
  }>,
): Promise<Product> => {
  return api.patch(`/products/${id}`, productData);
};

export const deleteProduct = async (id: string): Promise<void> => {
  return api.delete(`/products/${id}`);
};
