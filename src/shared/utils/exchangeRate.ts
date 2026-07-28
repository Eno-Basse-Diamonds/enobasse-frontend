import { logger } from "@/shared/utils/logger";

/**
 * Converts a monetary amount between currencies.
 *
 * @description Converts a monetary amount from one currency to another. Falls
 * back to a hardcoded rate if the API is unavailable.
 * 
 * @param amount - The amount to convert
 * @param from - Source currency code (e.g., "USD")
 * @param to - Target currency code (e.g., "NGN")
 * 
 * @returns The converted amount
 */
export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  if (from === to) return amount;

  try {
    const response = await fetch(`/api/exchange-rate?amount=${amount}&from=${from}&to=${to}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    return data.convertedAmount;
  } catch (error) {
    logger.error("Error converting currency:", error);
    const fallbackRate = 1540;
    if (from === "USD" && to === "NGN") {
      return Math.ceil(amount * fallbackRate);
    } else if (from === "NGN" && to === "USD") {
      return Math.ceil(amount / fallbackRate);
    }
    return amount;
  }
}

/**
 * Fetches the current USD-to-NGN rate.
 *
 * @description Fetches the current USD-to-NGN exchange rate. Falls back to
 * 1540 if the API request fails.
 * 
 * @returns The exchange rate as a number
 */
export async function getExchangeRate(): Promise<number> {
  try {
    const response = await fetch("/api/exchange-rate");
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    return data.exchangeRate;
  } catch (error) {
    logger.error("Error fetching exchange rate:", error);
    return 1540; // Fallback rate
  }
}
