import Link from "next/link";
import { CheckoutCartItem } from "./chekout-cart-item";
import { CartItem } from "@/lib/data/cart-items";

type OrderSummaryProps = {
  items: Array<{
    productVariant: { price: number; currency?: string };
    quantity: number;
  }>;
};

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const currency = items[0]?.productVariant.currency || "$";

  const formattedPrice = (amount: number) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>

      <div className="order-summary__items-list">
        <ul className="divide-y divide-gray-200">
          {/* {items.map((item) => (
            <CheckoutCartItem key={item.id} item={item} />
          ))} */}
        </ul>
      </div>

      <div className="order-summary__divider">
        <div className="order-summary__row">
          <span className="order-summary__label">
            Subtotal ({totalItems} items)
          </span>
          <span className="order-summary__value">
            {currency}
            {formattedPrice(subtotal)}
          </span>
        </div>
        <div className="order-summary__row">
          <span className="order-summary__label">Shipping</span>
          <span className="order-summary__value">Free</span>
        </div>
        <div className="order-summary__total-row">
          <span className="order-summary__total-label">Total</span>
          <span className="order-summary__total-value">
            {currency}
            {formattedPrice(subtotal)}
          </span>
        </div>
      </div>

      <button className="order-summary__checkout-btn">
        Pay {currency}
        {formattedPrice(subtotal)}
      </button>

      <div className="order-summary__return-link">
        or <Link href="/cart">Return to Cart</Link>
      </div>
    </div>
  );
}
