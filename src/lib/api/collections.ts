import {
  collections,
  collectionsWithProducts,
  Collection,
} from "../data/collections";

export const getCollections = (): Collection[] => {
  return collections;
};

export const getCollectionWithProducts = (slug: string): Collection | null => {
  const collection = collectionsWithProducts.find((c) => c.slug === slug);
  return collection || null;
};
