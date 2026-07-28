"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAccountStore } from "@/modules/account/store";
import { useWishlistStore } from "@/modules/wishlist/store";
import { EmptyState } from "@/shared/components/EmptyState";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { WishlistLoader } from "@/shared/components/loaders/Wishlist";

import { WishlistHeader } from "./_components/WishlistHeader";
import { WishlistItem } from "./_components/WishlistItem";

export default function WishlistPage() {
  const { data: session } = useSession();
  const { preferredCurrency, isHydrated } = useAccountStore();
  const { clear, items, hydrated, hydrate, loading, refreshWithCurrency } = useWishlistStore();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    const handleCurrencyChange = async () => {
      if (session?.user?.email && preferredCurrency) {
        await hydrate(session.user.email, preferredCurrency);
        setLastCurrency(preferredCurrency);
      } else if (preferredCurrency && preferredCurrency !== lastCurrency) {
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
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-center rounded-sm">
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
                  <WishlistItem key={item.id} item={item} currentCurrency={preferredCurrency} />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
