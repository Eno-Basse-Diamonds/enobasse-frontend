import { api } from "@/shared/utils/api";

import { Collection, CollectionFilterOptions, CollectionWithProducts } from "./types";

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
  sortBy?: "name" | "createdAt" | "updatedAt" | "productCount";
  sortOrder?: "ASC" | "DESC";
  search?: string;
  published?: boolean;
}

/**
 * Fetches all collections.
 *
 * @description Fetches all collections.
 * @returns The list of collections
 */
export const getCollections = async (): Promise<Collection[]> => {
  return api.get("/collections");
};

/**
 * Fetches a collection with products.
 *
 * @description Fetches a single collection with its products.
 * @param slug - The collection slug
 * @param options - Optional filter options
 * @returns The collection with products
 */
export const getCollectionWithProducts = async (
  slug: string,
  options?: CollectionFilterOptions,
): Promise<CollectionWithProducts> => {
  return api.get(`/collections/${slug}`, { params: options });
};

/**
 * Fetches collections for admin.
 *
 * @description Fetches paginated collections for the admin panel.
 * @param options - Admin filter, pagination, and sort options
 * @returns Paginated collections response
 */
export const getCollectionsForAdmin = async (
  options?: AdminCollectionsFilterOptions,
): Promise<AdminCollectionsResponse> => {
  return api.get("/collections/admin", { params: options, cache: false });
};

/**
 * Creates a collection.
 *
 * @description Creates a new collection.
 * @param collectionData - The collection data
 * @param collectionData.name - The collection name
 * @param collectionData.slug - The collection slug
 * @param collectionData.description - The collection description
 * @param collectionData.published - Whether the collection is published
 * @param collectionData.image - The collection image
 * @returns The created collection
 */
export const createCollection = async (collectionData: {
  name: string;
  slug: string;
  description: string;
  published: boolean;
  image: { url: string; alt: string };
}): Promise<Collection> => {
  return api.post("/collections", collectionData);
};

/**
 * Updates a collection.
 *
 * @description Updates an existing collection.
 * @param id - The collection ID
 * @param collectionData - The partial collection data to update
 * @returns The updated collection
 */
export const updateCollection = async (
  id: string,
  collectionData: Partial<{
    name: string;
    slug: string;
    description: string;
    published: boolean;
    image: { url: string; alt: string };
  }>,
): Promise<Collection> => {
  return api.patch(`/collections/${id}`, collectionData);
};

/**
 * Deletes a collection.
 *
 * @description Deletes a collection by its ID.
 * @param id - The collection ID
 */
export const deleteCollection = async (id: string): Promise<void> => {
  return api.delete(`/collections/${id}`);
};
