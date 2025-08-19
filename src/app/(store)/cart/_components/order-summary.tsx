"use client";

import Link from "next/link";
import { Button } from "@/components";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useAccountStore } from "@/lib/store/account";

interface OrderSummaryProps {
  items: Array<{
    productVariant: {
      price: number;
      prices?: Record<string, number>;
      currency?: string;
    };
    quantity: number;
  }>;
  onCheckout?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  onCheckout,
}) => {
  const { preferredCurrency } = useAccountStore();

  const subtotal = items.reduce((sum, item) => {
    const price = item.productVariant.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="cart-page__summary">
      <h2 className="cart-page__summary-title">Order Summary</h2>
      <div className="space-y-3 mb-3 divide-y divide-gray-200">
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Subtotal</span>
          <span className="cart-page__summary-value">
            {getCurrencySymbol(preferredCurrency)}
            {subtotal.toLocaleString(undefined)}
          </span>
        </div>
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Total</span>
          <span className="cart-page__total">
            {getCurrencySymbol(preferredCurrency)}
            {subtotal.toLocaleString(undefined)}
          </span>
        </div>
      </div>
      <Button size="lg" className="w-full" onClick={onCheckout}>
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
