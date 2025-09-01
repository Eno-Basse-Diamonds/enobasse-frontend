import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Collection,
  CollectionWithProducts,
  CollectionFilterOptions,
} from "@/lib/types/collections";
import {
  AdminCollectionsFilterOptions,
  AdminCollectionsResponse,
  getCollections,
  getCollectionsForAdmin,
  getCollectionWithProducts,
  createCollection,
  updateCollection,
  deleteCollection,
} from "@/lib/api/collections";

export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
}

export function useCollection(
  slug: string,
  options?: CollectionFilterOptions,
  enabled: boolean = true,
) {
  return useQuery<CollectionWithProducts>({
    queryKey: ["collection", slug, options],
    queryFn: () => getCollectionWithProducts(slug, options),
    enabled: enabled,
  });
}

export function useAdminCollections(options?: AdminCollectionsFilterOptions) {
  return useQuery<AdminCollectionsResponse>({
    queryKey: ["adminCollections", options],
    queryFn: () => getCollectionsForAdmin(options),
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Collection, Error, Parameters<typeof createCollection>[0]>(
    {
      mutationFn: createCollection,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["adminCollections"] });
        queryClient.invalidateQueries({ queryKey: ["collections"] });
        router.push("/admin/collections");
      },
    },
  );
}

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
