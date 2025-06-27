import { Collection, CollectionWithProducts } from "../types/collections";
import { api } from "../utils/api";

interface CollectionFilterOptions {
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  minPrice?: number;
  maxPrice?: number;
  metals?: string[];
  gemstones?: string[];
}

export const getCollections = async (): Promise<Collection[]> => {
  return api.get("/collections");
};

export const getCollectionWithProducts = async (
  slug: string,
  options?: CollectionFilterOptions
): Promise<CollectionWithProducts> => {
  return api.get(`/collections/${slug}`, { params: options });
};
