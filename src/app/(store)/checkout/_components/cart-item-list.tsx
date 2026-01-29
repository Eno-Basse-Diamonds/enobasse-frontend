import { CartItem } from "@/lib/types/carts";
import { CheckoutCartItem } from "./checkout-cart-item";
import { ringSizes } from "@/lib/utils/constants/ring-sizes";

interface CartItemListProps {
  items: CartItem[];
  currency: string;
}

export function CartItemList({ items, currency }: CartItemListProps) {
  return (
    <div className="mb-6">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <CheckoutCartItem
            key={item.id}
            item={item}
            ringSizes={ringSizes}
            currency={currency}
          />
        ))}
      </ul>
    </div>
  );
}
