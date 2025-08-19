import { useQuery } from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getRelatedProducts,
} from "@/lib/api/products";
import { Product, ProductFilterOptions } from "@/lib/types/products";

export function useProductsSearch(
  options?: ProductFilterOptions,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["productSearch", options],
    queryFn: () => getProducts(options),
    enabled: enabled && options !== undefined,
  });
}

export function useProducts(
  options?: ProductFilterOptions,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getProducts(options),
    enabled: enabled && options !== undefined,
  });
}

export function useProduct(
  slug: string,
  currency: string,
  enabled: boolean = true
) {
  return useQuery<Product>({
    queryKey: ["product", slug, currency],
    queryFn: () => getProduct(slug, currency),
    enabled: enabled,
  });
}

export function useRelatedProducts(
  slug: string,
  limit = 4,
  currency: string,
  enabled: boolean = true
) {
  return useQuery<Product[]>({
    queryKey: ["relatedProducts", slug, currency],
    queryFn: () => getRelatedProducts(slug, limit, currency),
    enabled: enabled,
  });
}
