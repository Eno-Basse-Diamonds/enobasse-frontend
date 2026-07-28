import { FilterOption, MetalName, Product } from "@/modules/products/types";

/**
 * Filter products by metal/gemstone and sort by the given criteria.
 *
 * @description Filters an array of products based on selected metal and
 * gemstone filters, then sorts the results by one of the supported sort
 * criteria (price, newest, in-store, custom-design).
 * @param options - The filter and sort options
 * @param options.products - The array of products to filter and sort
 * @param options.selectedFilters - The active metal and gemstone filters
 * @param options.sortBy - The sort key: "price-low-high", "price-high-low",
 *   "newest", "in-store", or "custom-design"
 * @returns The filtered and sorted product array
 */
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
    const metalFilters = selectedFilters.filter((f) => f.type === "metal").map((f) => f.name);
    const gemstoneFilters = selectedFilters.filter((f) => f.type === "gemstone").map((f) => f.name);

    filtered = filtered.filter((product) => {
      const productMetals = product.metals?.map((m) => m.type) || [];
      const productGemstones = product.gemstones?.map((g) => g.type) || [];

      const matchesMetals =
        metalFilters.length === 0 ||
        metalFilters.some((metal) => productMetals.includes(metal as MetalName));
      const matchesGemstones =
        gemstoneFilters.length === 0 ||
        gemstoneFilters.some((gemstone) => productGemstones.includes(gemstone));

      return matchesMetals && matchesGemstones;
    });
  }

  // Apply sorting
  switch (sortBy) {
    case "price-low-high":
      filtered.sort((a, b) => (a.priceRange?.min || 0) - (b.priceRange?.min || 0));
      break;
    case "price-high-low":
      filtered.sort((a, b) => (b.priceRange?.min || 0) - (a.priceRange?.min || 0));
      break;
    case "newest":
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "in-store":
      filtered.sort((a, b) => {
        // In store products (isCustomDesign == false) come first
        return Number(!!a.isCustomDesign) - Number(!!b.isCustomDesign);
      });
      break;
    case "custom-design":
      filtered.sort((a, b) => {
        // Custom design products (isCustomDesign == true) come first
        return Number(!!b.isCustomDesign) - Number(!!a.isCustomDesign);
      });
      break;
    default:
      break;
  }

  return filtered;
}
