"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartItemCard } from "./_components/cart-item-card";
import { OrderSummary } from "./_components/order-summary";
import { EmptyStateIcon } from "./_components/empty-state-icon";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { ringSizes } from "@/lib/utils/constants";
import { EmptyState } from "@/components/empty-state";
import { CartLoader } from "@/components/loaders/cart";
import { SectionContainer } from "@/components/section-container";

export default function CartPage() {
  const { items, hydrated, hydrate, loading, refreshWithCurrency } =
    useCartStore();
  const { data: session } = useSession();
  const { preferredCurrency, isHydrated } = useAccountStore();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    if (!isHydrated) return;

    const handleCurrencyChange = async () => {
      if (preferredCurrency && preferredCurrency !== lastCurrency) {
        if (session?.user?.email) {
          await refreshWithCurrency(session.user.email, preferredCurrency);
        } else {
          await refreshWithCurrency(preferredCurrency);
        }
        setLastCurrency(preferredCurrency);
      } else if (session?.user?.email && preferredCurrency && !hydrated) {
        await hydrate(session.user.email, preferredCurrency);
        setLastCurrency(preferredCurrency);
      } else if (!session && !hydrated) {
        await hydrate();
        setLastCurrency(preferredCurrency);
      }

      setIsInitialLoad(false);
    };

    handleCurrencyChange();
  }, [
    session,
    hydrate,
    refreshWithCurrency,
    preferredCurrency,
    hydrated,
    isHydrated,
    lastCurrency,
  ]);

  if (isInitialLoad || loading) {
    return <CartLoader />;
  }

  return (
    <SectionContainer id="cart">
      <div className="max-w-6xl mx-auto">
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
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-12">
              <div className="bg-white overflow-hidden mx-auto w-full flex-none lg:max-w-xl xl:max-w-2xl">
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
              <OrderSummary items={items} onCheckout={handleCheckout} />
            </div>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
