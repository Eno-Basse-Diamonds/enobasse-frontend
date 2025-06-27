import { MetalName, FilterOption, Product } from "@/lib/types/products";

export function filterAndSortProducts({
  products,
  selectedFilters,
  sortBy,
}: {
  products: Product[];
  selectedFilters: FilterOption[];
  sortBy: string;
}) {
  if (!products) return [];
  let filtered = [...products];

  // Apply metal and gemstone filters
  if (selectedFilters.length > 0) {
    const metalFilters = selectedFilters
      .filter((f) => f.type === "metal")
      .map((f) => f.name);
    const gemstoneFilters = selectedFilters
      .filter((f) => f.type === "gemstone")
      .map((f) => f.name);

    filtered = filtered.filter((product) => {
      const productMetals = product.metals?.map((m) => m.type) || [];
      const productGemstones = product.gemstones?.map((g) => g.type) || [];

      const matchesMetals =
        metalFilters.length === 0 ||
        metalFilters.some((metal) =>
          productMetals.includes(metal as MetalName)
        );
      const matchesGemstones =
        gemstoneFilters.length === 0 ||
        gemstoneFilters.some((gemstone) => productGemstones.includes(gemstone));

      return matchesMetals && matchesGemstones;
    });
  }

  // Apply sorting
  switch (sortBy) {
    case "price-low-high":
      filtered.sort(
        (a, b) => (a.priceRange?.min || 0) - (b.priceRange?.min || 0)
      );
      break;
    case "price-high-low":
      filtered.sort(
        (a, b) => (b.priceRange?.min || 0) - (a.priceRange?.min || 0)
      );
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      break;
  }

  return filtered;
}
