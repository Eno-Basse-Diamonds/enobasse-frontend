/**
 * Returns the currency symbol for a given ISO currency abbreviation.
 *
 * @description Looks up the currency symbol from a known map of ISO codes.
 * Falls back to the uppercased abbreviation if the code is not recognised.
 *
 * @param currencyAbbr - ISO currency code (e.g., "USD", "NGN", "EUR", "GBP").
 * @returns The currency symbol, or the uppercased abbreviation if unknown.
 *
 * @example
 * getCurrencySymbol("USD") // "$"
 * getCurrencySymbol("NGN") // "₦"
 */
export function getCurrencySymbol(currencyAbbr: string) {
  const symbols = { USD: "$", EUR: "€", GBP: "£", NGN: "₦" };
  const normalizedAbbr = currencyAbbr?.toUpperCase();
  return symbols[normalizedAbbr as keyof typeof symbols] || normalizedAbbr || "";
}

/**
 * Calculates the line total for a cart or checkout item.
 *
 * @description Amora (custom lettering) items price via
 * `amoraOptions.calculatedPrice` (letters + chain), not the flat base variant
 * price — using `productVariant.price * quantity` for those items would
 * undercharge or overcharge relative to what's actually being ordered.
 *
 * @param item - The cart item with variant price, quantity, and optional Amora options.
 * @param item.productVariant.price - Base price of the product variant.
 * @param item.quantity - Number of units.
 * @param item.amoraOptions.calculatedPrice - Custom calculated price for Amora items.
 * @returns The line total.
 */
export function getItemLineTotal(item: {
  productVariant: { price: number };
  quantity: number;
  amoraOptions?: { calculatedPrice: number };
}): number {
  return item.amoraOptions
    ? item.amoraOptions.calculatedPrice
    : item.productVariant.price * item.quantity;
}
