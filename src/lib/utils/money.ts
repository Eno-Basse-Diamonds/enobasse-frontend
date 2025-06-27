export function getCurrencySymbol(currencyAbbr: string) {
  const symbols = { USD: "$", EUR: "€", GBP: "£", NGN: "₦" };
  const normalizedAbbr = currencyAbbr?.toUpperCase();
  return (
    symbols[normalizedAbbr as keyof typeof symbols] || normalizedAbbr || ""
  );
}
