import { CartItem } from "@/modules/cart/types";
import { RING_SIZES } from "@/modules/services/constants";

import { CheckoutCartItem } from "./CheckoutCartItem";

interface CartItemListProps {
  items: CartItem[];
  currency: string;
}

export function CartItemList({ items, currency }: CartItemListProps) {
  return (
    <div className="mb-6">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <CheckoutCartItem key={item.id} item={item} ringSizes={RING_SIZES} currency={currency} />
        ))}
      </ul>
    </div>
  );
}
