export function getCurrencySymbol(currencyAbbr: string) {
  const symbols = { USD: "$", EUR: "€", GBP: "£", NGN: "₦" };
  const normalizedAbbr = currencyAbbr?.toUpperCase();
  return (
    symbols[normalizedAbbr as keyof typeof symbols] || normalizedAbbr || ""
  );
}

/**
 * Line total for a cart/checkout item. Amora (custom lettering) items price
 * via `amoraOptions.calculatedPrice` (letters + chain), not the flat base
 * variant price — using `productVariant.price * quantity` for those items
 * undercharges/overcharges relative to what's actually being ordered.
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
