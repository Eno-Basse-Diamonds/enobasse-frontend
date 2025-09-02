import { useQuery } from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getRelatedProducts,
} from "@/lib/api/products";
import { Product, ProductFilterOptions } from "@/lib/types/products";

export function useProductsSearch(
  options?: ProductFilterOptions,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["productSearch", options],
    queryFn: () => getProducts(options),
    enabled: enabled && options !== undefined,
  });
}

export function useProducts(
  options?: ProductFilterOptions,
  enabled: boolean = true,
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
  enabled: boolean = true,
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
  enabled: boolean = true,
) {
  return useQuery<Product[]>({
    queryKey: ["relatedProducts", slug, currency],
    queryFn: () => getRelatedProducts(slug, limit, currency),
    enabled: enabled,
  });
}

// Admin hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductsForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  AdminProductsFilterOptions,
} from "@/lib/api/products";

export function useAdminProducts(options?: AdminProductsFilterOptions) {
  return useQuery({
    queryKey: ["adminProducts", options],
    queryFn: () => getProductsForAdmin(options),
    staleTime: 30_000,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}
