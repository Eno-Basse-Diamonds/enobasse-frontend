export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (from === to) return amount;

  try {
    const response = await fetch(
      `/api/exchange-rate?amount=${amount}&from=${from}&to=${to}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    return data.convertedAmount;
  } catch (error) {
    console.error("Error converting currency:", error);
    const fallbackRate = 1540;
    if (from === "USD" && to === "NGN") {
      return Math.ceil(amount * fallbackRate);
    } else if (from === "NGN" && to === "USD") {
      return Math.ceil(amount / fallbackRate);
    }
    return amount;
  }
}

export async function getExchangeRate(): Promise<number> {
  try {
    const response = await fetch("/api/exchange-rate");
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    return data.exchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return 1540; // Fallback rate
  }
}
