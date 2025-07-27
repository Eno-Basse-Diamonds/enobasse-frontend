"use client";

import Link from "next/link";
import { Button } from "@/components";
import { getCurrencySymbol } from "@/lib/utils/money";

interface OrderSummaryProps {
  items: Array<{
    productVariant: { price: number; currency?: string };
    quantity: number;
  }>;
  onCheckout?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0
  );
  const currency = items[0]?.productVariant.currency || "$";

  return (
    <div className="cart-page__summary">
      <h2 className="cart-page__summary-title">Order Summary</h2>
      <div className="space-y-3 mb-3 divide-y divide-gray-200">
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Subtotal</span>
          <span className="cart-page__summary-value">
            {getCurrencySymbol(currency)}
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Total</span>
          <span className="cart-page__total">
            {getCurrencySymbol(currency)}
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <Button size="lg" className="w-full" onClick={() => {}}>
        Checkout
      </Button>
      <div className="mt-4 text-center text-[#502B3A]/70">
        or{" "}
        <Link href="/products" className="cart-page__continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
