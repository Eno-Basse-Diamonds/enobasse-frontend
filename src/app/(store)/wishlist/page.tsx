"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SectionContainer, PageHeading } from "@/components";
import { EmptyState } from "@/components";
import { HeartIcon } from "@/components/icons";
import { WishlistHeader } from "./_components/wishlist-header";
import { WishlistItem } from "./_components/wishlist-item";
import { WishlistLoader } from "@/components/loaders";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useAccountStore } from "@/lib/store/account";
import "./styles.scss";

export default function WishlistPage() {
  const { data: session } = useSession();
  const { preferredCurrency, isHydrated } = useAccountStore();
  const { clear, items, hydrated, hydrate, loading, refreshWithCurrency } = useWishlistStore();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);

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
    };

    handleCurrencyChange();
  }, [session, hydrate, refreshWithCurrency, preferredCurrency, hydrated, isHydrated, lastCurrency]);

  return (
    <div className="wishlist-page">
      <PageHeading title="Wishlist" />
      {!hydrated || loading ? (
        <WishlistLoader />
      ) : (
        <SectionContainer id="wishlist">
          <div className="wishlist-page__container">
            {items.length === 0 ? (
              <EmptyState
                icon={<HeartIcon className="h-16 w-16" />}
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
                <div className="wishlist-page__list-container">
                  <ul role="list" className="wishlist-page__list">
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
      )}
    </div>
  );
}
