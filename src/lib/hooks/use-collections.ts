import { useQuery } from "@tanstack/react-query";
import {
  getCollections,
  getCollectionWithProducts,
} from "@/lib/api/collections";
import { Collection, CollectionWithProducts } from "@/lib/types/collections";

export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
}

export function useCollection(slug: string) {
  return useQuery<CollectionWithProducts>({
    queryKey: ["collection", slug],
    queryFn: () => getCollectionWithProducts(slug),
  });
}
