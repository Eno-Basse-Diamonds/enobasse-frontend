"use client";

import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number | "Free";
  onCheckout?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping = "Free",
}) => {
  return (
    <div className="cart-page__summary">
      <h2 className="cart-page__summary-title">Order Summary</h2>

      <div className="space-y-3 mb-3 divide-y divide-gray-200">
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Subtotal</span>
          <span className="cart-page__summary-value">
            $
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Shipping</span>
          <span className="cart-page__summary-value">
            {shipping === "Free" ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="cart-page__summary-row">
          <span className="cart-page__summary-label">Total</span>
          <span className="cart-page__total">
            $
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <button className="cart-page__checkout-btn" onClick={() => {}}>
        Checkout
      </button>

      <div className="mt-4 text-center text-[#502B3A]/70">
        or{" "}
        <Link href="/products" className="cart-page__continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
