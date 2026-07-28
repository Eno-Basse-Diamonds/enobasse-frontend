import { useRouter } from "next/navigation";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AdminCollectionsFilterOptions,
  AdminCollectionsResponse,
  createCollection,
  deleteCollection,
  getCollectionWithProducts,
  getCollections,
  getCollectionsForAdmin,
  updateCollection,
} from "@/modules/collections/api";
import {
  Collection,
  CollectionFilterOptions,
  CollectionWithProducts,
} from "@/modules/collections/types";

/**
 * Fetches all collections.
 *
 * @description React Query hook to fetch all collections.
 * @returns Query result with collections
 */
export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
}

/**
 * Fetches a collection with products.
 *
 * @description React Query hook to fetch a single collection with products.
 * @param slug - The collection slug
 * @param options - Optional filter options
 * @param enabled - Whether the query is enabled (default true)
 * @returns Query result with collection and products
 */
export function useCollection(
  slug: string,
  options?: CollectionFilterOptions,
  enabled: boolean = true,
) {
  return useQuery<CollectionWithProducts>({
    queryKey: ["collection", slug, options],
    queryFn: () => getCollectionWithProducts(slug, options),
    enabled: enabled,
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetches collections for admin.
 *
 * @description React Query hook to fetch paginated collections for the admin
 * panel.
 * @param options - Admin filter options
 * @returns Query result with paginated admin collections
 */
export function useAdminCollections(options?: AdminCollectionsFilterOptions) {
  return useQuery<AdminCollectionsResponse>({
    queryKey: ["adminCollections", options],
    queryFn: () => getCollectionsForAdmin(options),
  });
}

/**
 * Creates a collection.
 *
 * @description React Query mutation hook to create a new collection.
 * @returns Mutation result for collection creation
 */
export function useCreateCollection() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Collection, Error, Parameters<typeof createCollection>[0]>({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCollections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.push("/admin/collections");
    },
  });
}

/**
 * Updates a collection.
 *
 * @description React Query mutation hook to update an existing collection.
 * @returns Mutation result for collection update
 */
export function useUpdateCollection() {
  const queryClient = useQueryClient();

  return useMutation<
    Collection,
    Error,
    { id: string; data: Parameters<typeof updateCollection>[1] }
  >({
    mutationFn: ({ id, data }) => updateCollection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCollections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

/**
 * Deletes a collection.
 *
 * @description React Query mutation hook to delete a collection.
 * @returns Mutation result for collection deletion
 */
export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCollections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}
