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
    <div className="bg-white shadow p-6">
      <h2 className="text-xl font-semibold text-[#502B3A] mb-6">
        Order Summary
      </h2>

      <div className="mb-6">
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

      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-sm text-[#502B3A]">
            Subtotal ({totalItems} items)
          </span>
          <span className="text-sm font-medium text-[#502B3A]">
            {getCurrencySymbol(displayCurrency)}
            {formattedPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-[#502B3A]">Shipping</span>
          <span className="text-sm font-medium text-[#502B3A]">N/A</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-medium text-[#502B3A]">Total</span>
          <span className="text-base font-bold text-[#502B3A]">
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

      <div className="mt-4 text-center text-sm text-[#502B3A]/70">
        or{" "}
        <Link
          href="/cart"
          className="font-medium text-[#502B3A] hover:text-[#D1A559]"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
}
