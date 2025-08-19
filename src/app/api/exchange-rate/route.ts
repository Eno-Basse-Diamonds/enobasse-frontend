import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { rate: number; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000;
const FALLBACK_NGN_RATE = 1540;

interface ExchangeRateApiResponse {
  conversion_rates: Record<string, number>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get("amount");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!amount || !from || !to) {
      const rate = await getCachedExchangeRate();

      const response = NextResponse.json({
        exchangeRate: rate,
        lastUpdated: new Date().toISOString(),
        currencyPair: "USD/NGN",
      });

      response.headers.set(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=7200"
      );

      return response;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const fromCurrency = from.toUpperCase();
    const toCurrency = to.toUpperCase();

    if (
      (fromCurrency !== "USD" && fromCurrency !== "NGN") ||
      (toCurrency !== "USD" && toCurrency !== "NGN")
    ) {
      return NextResponse.json(
        { error: "Only USD and NGN conversions are supported" },
        { status: 400 }
      );
    }

    const usdToNgnRate = await getCachedExchangeRate();
    let convertedAmount: number;
    let conversionRate: number;

    if (fromCurrency === "USD" && toCurrency === "NGN") {
      convertedAmount = numericAmount * usdToNgnRate;
      conversionRate = usdToNgnRate;
    } else if (fromCurrency === "NGN" && toCurrency === "USD") {
      convertedAmount = numericAmount / usdToNgnRate;
      conversionRate = 1 / usdToNgnRate;
    } else {
      convertedAmount = numericAmount;
      conversionRate = 1;
    }

    const response = NextResponse.json({
      originalAmount: numericAmount,
      convertedAmount: Math.ceil(convertedAmount),
      from: fromCurrency,
      to: toCurrency,
      conversionRate: parseFloat(conversionRate.toFixed(6)),
      lastUpdated: new Date().toISOString(),
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=7200"
    );

    return response;
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rate" },
      { status: 500 }
    );
  }
}

async function getCachedExchangeRate(): Promise<number> {
  const cacheKey = "USD_NGN";
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.rate;
  }

  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (!apiKey) {
      throw new Error("Exchange rate API key not configured");
    }

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 }, // Next.js fetch caching - 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data: ExchangeRateApiResponse = await response.json();
    const rate = data.conversion_rates["NGN"];

    if (!rate) {
      throw new Error("NGN rate not found in response");
    }

    cache.set(cacheKey, { rate, timestamp: Date.now() });

    return rate;
  } catch (error) {
    if (cached) return cached.rate;

    return FALLBACK_NGN_RATE;
  }
}
