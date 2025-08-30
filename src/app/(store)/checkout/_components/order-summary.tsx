"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components";
import { CheckoutCartItem } from "./chekout-cart-item";
import { CartItem } from "@/lib/types/carts";
import { getCurrencySymbol } from "@/lib/utils/money";
import { ringSizes } from "@/lib/utils/constants";
import { useAccountStore } from "@/lib/store/account";

type OrderSummaryProps = {
  items: CartItem[];
  onPayNow: () => void;
  disabled?: boolean;
  currency?: string;
};

export function OrderSummary({
  items,
  onPayNow,
  disabled = false,
  currency = "USD",
}: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { preferredCurrency } = useAccountStore();
  const displayCurrency = currency || preferredCurrency;

  const subtotal = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const formattedPrice = (amount: number) => {
    return amount.toLocaleString();
  };

  useEffect(() => {
    if (isProcessing) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isProcessing]);

  return (
    <div className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>

      <div className="order-summary__items-list">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <CheckoutCartItem
              key={item.id}
              item={item}
              ringSizes={ringSizes}
              currency={displayCurrency}
            />
          ))}
        </ul>
      </div>

      <div className="order-summary__divider">
        <div className="order-summary__row">
          <span className="order-summary__label">
            Subtotal ({totalItems} items)
          </span>
          <span className="order-summary__value">
            {getCurrencySymbol(displayCurrency)}
            {formattedPrice(subtotal)}
          </span>
        </div>
        <div className="order-summary__row">
          <span className="order-summary__label">Shipping</span>
          <span className="order-summary__value">N/A</span>
        </div>
        <div className="order-summary__total-row">
          <span className="order-summary__total-label">Total</span>
          <span className="order-summary__total-value">
            {getCurrencySymbol(displayCurrency)}
            {formattedPrice(subtotal)}
          </span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full mt-5"
        onClick={onPayNow}
        disabled={disabled || isProcessing}
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${getCurrencySymbol(displayCurrency)}${formattedPrice(
              subtotal
            )}`}
      </Button>

      <div className="order-summary__return-link">
        or <Link href="/cart">Return to Cart</Link>
      </div>
    </div>
  );
}
