import { SectionContainer, PageHeading, EmptyState } from "@/components";
import { getCartItems } from "@/lib/api/cart";
import { CartItemCard } from "./_components/cart-item-card";
import { OrderSummary } from "./_components/order-summary";
import { EmptyStateIcon } from "./_components/empty-state-icon";
import "./styles.scss";

export default async function CartPage() {
  const cartItems = await getCartItems();
  const ringSizes = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <PageHeading title="Shopping Cart" />
      <SectionContainer id="cart">
        <div className="cart-page__container">
          {cartItems.length === 0 ? (
            <EmptyState
              icon={<EmptyStateIcon />}
              title="Your cart is empty"
              description="Start adding items to your cart"
              action={{ text: "Browse Products", href: "/products" }}
            />
          ) : (
            <div className="cart-page__content">
              <div className="cart-page__items-container">
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      ringSizes={ringSizes}
                    />
                  ))}
                </ul>
              </div>
              <OrderSummary subtotal={subtotal} />
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
