import {
  Product,
  ProductFilterOptions,
  ProductsResponse,
} from "@/lib/types/products";
import { api } from "@/lib/utils/api";

export const getProducts = async (
  options?: ProductFilterOptions
): Promise<ProductsResponse> => {
  return api.get("/products", { params: options });
};

export const getProduct = async (slug: string): Promise<Product> => {
  return api.get(`/products/${slug}`);
};

export const getRelatedProducts = async (
  slug: string,
  limit: number
): Promise<Product[]> => {
  return api.get(`/products/${slug}/related`, { params: { limit } });
};
