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

export const getProduct = async (slug: string, currency: string,): Promise<Product> => {
  return api.get(`/products/${slug}`, { params: { currency: currency } });
};

export const getRelatedProducts = async (
  slug: string,
  limit: number,
  currency: string,
): Promise<Product[]> => {
  return api.get(`/products/${slug}/related`, { params: { limit, currency } });
};
