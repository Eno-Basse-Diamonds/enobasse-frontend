import { useQuery } from "@tanstack/react-query";
import {
  getCollections,
  getCollectionWithProducts,
} from "@/lib/api/collections";
import {
  Collection,
  CollectionWithProducts,
  CollectionFilterOptions,
} from "@/lib/types/collections";

export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
}

export function useCollection(
  slug: string,
  options?: CollectionFilterOptions,
  enabled: boolean = true
) {
  return useQuery<CollectionWithProducts>({
    queryKey: ["collection", slug, options],
    queryFn: () => getCollectionWithProducts(slug, options),
    enabled: enabled,
  });
}
