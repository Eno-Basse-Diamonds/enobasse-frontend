"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { WishlistHeader } from "./_components/wishlist-header";
import { WishlistItem } from "./_components/wishlist-item";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useAccountStore } from "@/lib/store/account";
import { EmptyState } from "@/components/empty-state";
import { SectionContainer } from "@/components/section-container";
import { HeartIcon } from "@/components/icons/heart";
import { WishlistLoader } from "@/components/loaders/wishlist";

export default function WishlistPage() {
  const { data: session } = useSession();
  const { preferredCurrency, isHydrated } = useAccountStore();
  const { clear, items, hydrated, hydrate, loading, refreshWithCurrency } =
    useWishlistStore();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    const handleCurrencyChange = async () => {
      if (preferredCurrency && preferredCurrency !== lastCurrency) {
        if (session?.user?.email) {
          await hydrate(session.user.email, preferredCurrency);
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
    return <WishlistLoader />;
  }

  return (
    <SectionContainer id="wishlist">
      <div className="my-8 max-w-4xl mx-auto">
        {items.length === 0 ? (
          <EmptyState
            icon={<HeartIcon className="h-16 w-16 text-[#502B3A]" />}
            title="Your wishlist is empty"
            description="Start adding items you love to your wishlist"
            action={{ text: "Browse Products", href: "/products" }}
          />
        ) : (
          <>
            {!session && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-center">
                To save your Wishlist,{" "}
                <Link href="/sign-up" className="font-semibold">
                  Sign Up
                </Link>{" "}
                or{" "}
                <Link href="/sign-in" className="font-semibold">
                  Sign In
                </Link>
              </div>
            )}
            <WishlistHeader
              itemCount={items.length}
              onClear={() => {
                clear(session?.user?.email ?? undefined);
              }}
            />
            <div className="bg-white overflow-hidden">
              <ul role="list" className="divide-y divide-gray-100">
                {items.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    currentCurrency={preferredCurrency}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
