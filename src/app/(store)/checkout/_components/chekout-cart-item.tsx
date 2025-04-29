import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/lib/data/cart-items";

type CheckoutCartItemProps = {
  item: CartItem;
};

export function CheckoutCartItem({ item }: CheckoutCartItemProps) {
  return (
    <li className="checkout-cart-item">
      <div className="checkout-cart-item__image-container">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          height={500}
          width={500}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="checkout-cart-item__content">
        <div className="checkout-cart-item__header">
          <Link
            href={`/products/${item.slug}`}
            className="checkout-cart-item__name-link"
          >
            <h3>{item.name}</h3>
          </Link>
          <p className="checkout-cart-item__price">
            {item.currency}
            {item.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="checkout-cart-item__details-row">
          <p className="checkout-cart-item__detail">
            {item.metal.purity} {item.metal.name}
          </p>
          <p className="checkout-cart-item__detail">Qty: {item.quantity}</p>
        </div>
        <p className="checkout-cart-item__gemstone">
          {item.gemstone.weight}ct {item.gemstone.name}
        </p>
      </div>
    </li>
  );
}
