import { Collection, CollectionFilterOptions, CollectionWithProducts } from "../types/collections";
import { api } from "../utils/api";

export const getCollections = async (): Promise<Collection[]> => {
  return api.get("/collections");
};

export const getCollectionWithProducts = async (
  slug: string,
  options?: CollectionFilterOptions
): Promise<CollectionWithProducts> => {
  return api.get(`/collections/${slug}`, { params: options });
};
