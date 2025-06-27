import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/api/products";
import { Product, ProductFilterOptions } from "@/lib/types/products";

export function useProducts(options?: ProductFilterOptions) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getProducts(options),
  });
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    enabled: !!slug,
  });
}

export function useRelatedProducts(slug: string, limit = 4) {
  return useQuery<Product[]>({
    queryKey: ["relatedProducts", slug],
    queryFn: () => getRelatedProducts(slug, limit),
    enabled: !!slug,
  });
}
