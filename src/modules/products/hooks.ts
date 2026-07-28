import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  AdminProductsFilterOptions,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsForAdmin,
  getRelatedProducts,
  updateProduct,
} from "@/modules/products/api";
import { Product, ProductFilterOptions } from "@/modules/products/types";

/**
 * Searches and filters products.
 *
 * @description React Query hook to search/filter products.
 * @param options - Filter and pagination options
 * @param enabled - Whether the query is enabled (default true)
 * @returns Query result with products
 */
export function useProductsSearch(options?: ProductFilterOptions, enabled: boolean = true) {
  return useQuery({
    queryKey: ["productSearch", options],
    queryFn: () => getProducts(options),
    enabled: enabled && options !== undefined,
  });
}

/**
 * Infinite product search.
 *
 * @description React Query infinite query hook for paginated product search.
 * @param options - Filter and pagination options
 * @param enabled - Whether the query is enabled (default true)
 * @returns Infinite query result with product pages
 */
export function useInfiniteProductsSearch(options?: ProductFilterOptions, enabled: boolean = true) {
  return useInfiniteQuery({
    queryKey: ["productSearchInfinite", options],
    queryFn: ({ pageParam }) => getProducts({ ...options, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    enabled: enabled && options !== undefined,
  });
}

/**
 * Fetches products with keepPreviousData.
 *
 * @description React Query hook to fetch products with keepPreviousData.
 * @param options - Filter and pagination options
 * @param enabled - Whether the query is enabled (default true)
 * @returns Query result with products
 */
export function useProducts(options?: ProductFilterOptions, enabled: boolean = true) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getProducts(options),
    enabled: enabled && options !== undefined,
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetches a product by slug.
 *
 * @description React Query hook to fetch a single product by slug.
 * @param slug - The product slug
 * @param currency - The currency code
 * @param enabled - Whether the query is enabled (default true)
 * @returns Query result with product
 */
export function useProduct(slug: string, currency: string, enabled: boolean = true) {
  return useQuery<Product>({
    queryKey: ["product", slug, currency],
    queryFn: () => getProduct(slug, currency),
    enabled: enabled,
  });
}

/**
 * Fetches related products.
 *
 * @description React Query hook to fetch related products.
 * @param slug - The product slug
 * @param limit - Maximum number of related products (default 4)
 * @param currency - The currency code
 * @param enabled - Whether the query is enabled (default true)
 * @returns Query result with related products
 */
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

/**
 * Fetches products for admin.
 *
 * @description React Query hook to fetch products for the admin panel.
 * @param options - Admin filter options
 * @returns Query result with admin products
 */
export function useAdminProducts(options?: AdminProductsFilterOptions) {
  return useQuery({
    queryKey: ["adminProducts", options],
    queryFn: () => getProductsForAdmin(options),
  });
}

/**
 * Creates a product.
 *
 * @description React Query mutation hook to create a new product.
 * @returns Mutation result for product creation
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}

/**
 * Updates a product.
 *
 * @description React Query mutation hook to update a product.
 * @returns Mutation result for product update
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}

/**
 * Deletes a product.
 *
 * @description React Query mutation hook to delete a product.
 * @returns Mutation result for product deletion
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
  });
}
