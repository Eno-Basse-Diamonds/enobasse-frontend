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
    <div className="bg-gray-50 p-6 sm:p-8 mx-auto flex-1 space-y-6 lg:mt-0 lg:w-full mt-6 sm:mt-8">
      <h2 className="text-xl font-semibold text-[#502B3A] mb-4">
        Order Summary
      </h2>
      <div className="space-y-3 mb-3 divide-y divide-gray-200">
        <div className="flex justify-between pt-3">
          <span className="text-[#502B3A]/70">Subtotal</span>
          <span className="font-medium text-[#502B3A]">
            {getCurrencySymbol(preferredCurrency)}
            {subtotal.toLocaleString(undefined)}
          </span>
        </div>
        <div className="flex justify-between pt-3">
          <span className="text-[#502B3A]/70">Total</span>
          <span className="font-bold text-[#502B3A]">
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
        <Link
          href="/products"
          className="hover:text-[#502B3A] text-sm font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
