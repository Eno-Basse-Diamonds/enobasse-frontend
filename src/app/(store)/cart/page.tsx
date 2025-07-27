"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SectionContainer, PageHeading, EmptyState } from "@/components";
import { CartLoader } from "@/components/loaders";
import { CartItemCard } from "./_components/cart-item-card";
import { OrderSummary } from "./_components/order-summary";
import { EmptyStateIcon } from "./_components/empty-state-icon";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { ringSizes } from "@/lib/utils/constants";
import "./styles.scss";

export default function CartPage() {
  const { items, hydrated, hydrate } = useCartStore();
  const { data: session } = useSession();

  useEffect(() => {
    hydrate(session?.user?.email ?? undefined);
  }, [session, hydrate]);

  return (
    <div className="cart-page">
      <PageHeading title="Shopping Cart" />
      {!hydrated ? (
        <CartLoader />
      ) : (
        <SectionContainer id="cart">
          <div className="cart-page__container">
            {items.length === 0 ? (
              <EmptyState
                icon={<EmptyStateIcon />}
                title="Your cart is empty"
                description="Start adding items to your cart"
                action={{ text: "Browse Products", href: "/products" }}
              />
            ) : (
              <>
                {!session && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-center">
                    To save your Shopping Cart,{" "}
                    <Link href="/sign-up" className="font-semibold">
                      Sign Up
                    </Link>{" "}
                    or{" "}
                    <Link href="/sign-in" className="font-semibold">
                      Sign In
                    </Link>
                  </div>
                )}
                <div className="cart-page__content">
                  <div className="cart-page__items-container">
                    <ul className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <CartItemCard
                          key={item.id}
                          item={item}
                          ringSizes={ringSizes}
                        />
                      ))}
                    </ul>
                  </div>
                  <OrderSummary items={items} />
                </div>
              </>
            )}
          </div>
        </SectionContainer>
      )}
    </div>
  );
}
