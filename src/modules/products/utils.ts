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
        // In store products come first
        return Number(isProductCustomDesign(a)) - Number(isProductCustomDesign(b));
      });
      break;
    case "custom-design":
      filtered.sort((a, b) => {
        // Custom design products come first
        return Number(isProductCustomDesign(b)) - Number(isProductCustomDesign(a));
      });
      break;
    default:
      break;
  }

  return filtered;
}

/**
 * Helper to determine if a product is a custom design product.
 * Checks boolean flag or category name.
 *
 * @param product - Product object
 * @returns boolean indicating if product is a custom design
 */
export function isProductCustomDesign(product: {
  isCustomDesign?: boolean;
  priceRange?: { min: number };
  category?: string;
}): boolean {
  if (!product) return false;
  return (
    Boolean(product.isCustomDesign) ||
    product.priceRange?.min === 0 ||
    Boolean(product.category?.toLowerCase().includes("custom"))
  );
}

/**
 * Helper to determine if a product is a custom design product that is quote-only (price is 0 or null).
 * Custom design products with a price of zero cannot be added to cart and require requesting a quote.
 *
 * @param product - Product object or parameters
 * @param price - Optional variant price override
 * @returns boolean indicating if product is quote-only
 */
export function isQuoteOnlyProduct(
  product: {
    isCustomDesign?: boolean;
    category?: string;
    priceRange?: { min: number };
  },
  price?: number | null,
): boolean {
  if (!product) return false;
  const isCustom = isProductCustomDesign(product);
  if (!isCustom) return false;
  const effectivePrice = price !== undefined ? price : product.priceRange?.min;
  return effectivePrice === 0 || effectivePrice == null;
}
