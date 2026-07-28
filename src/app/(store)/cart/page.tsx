"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAccountStore } from "@/modules/account/store";
import { useCartStore } from "@/modules/cart/store";
import { RING_SIZES } from "@/modules/services/constants";
import { trackViewCart } from "@/shared/analytics/gtag";
import { EmptyState } from "@/shared/components/EmptyState";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { CartLoader } from "@/shared/components/loaders/Cart";

import { CartItemCard } from "./_components/CartItemCard";
import { EmptyStateIcon } from "./_components/EmptyStateIcon";
import { OrderSummary } from "./_components/OrderSummary";

export default function CartPage() {
  const { items, hydrated, hydrate, loading, refreshWithCurrency } = useCartStore();
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
      const needsRefresh =
        preferredCurrency &&
        (preferredCurrency !== lastCurrency ||
          items.some((item) => (item.productVariant.currency || "USD") !== preferredCurrency));

      if (session?.user?.email && preferredCurrency) {
        await hydrate(session.user.email, preferredCurrency);
        setLastCurrency(preferredCurrency);
      } else if (needsRefresh) {
        await refreshWithCurrency(preferredCurrency);
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

  useEffect(() => {
    if (hydrated && items.length > 0 && preferredCurrency) {
      trackViewCart(items, preferredCurrency);
    }
  }, [hydrated, items.length]);

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
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-center rounded-sm">
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
              <div className="bg-white overflow-hidden mx-auto w-full flex-none lg:max-w-xl xl:max-w-2xl rounded-sm">
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <CartItemCard key={item.id} item={item} ringSizes={RING_SIZES} />
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
