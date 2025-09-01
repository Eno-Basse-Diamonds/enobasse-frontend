import { Collection, CollectionFilterOptions, CollectionWithProducts } from "../types/collections";
import { api } from "../utils/api";

export interface AdminCollectionsResponse {
  collections: Collection[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AdminCollectionsFilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'productCount';
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  published?: boolean;
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

// Admin endpoints
export const getCollectionsForAdmin = async (options?: AdminCollectionsFilterOptions): Promise<AdminCollectionsResponse> => {
  return api.get("/collections/admin", { params: options });
};

export const createCollection = async (collectionData: {
  name: string;
  slug: string;
  description: string;
  published: boolean;
  image: { url: string; alt: string };
}): Promise<Collection> => {
  return api.post("/collections", collectionData);
};

export const updateCollection = async (
  id: string,
  collectionData: Partial<{
    name: string;
    slug: string;
    description: string;
    published: boolean;
    image: { url: string; alt: string };
  }>
): Promise<Collection> => {
  return api.patch(`/collections/${id}`, collectionData);
};

export const deleteCollection = async (id: string): Promise<void> => {
  return api.delete(`/collections/${id}`);
};
