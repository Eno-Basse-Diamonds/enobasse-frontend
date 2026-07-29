import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ProductVariant } from "@/modules/products/types";
import { WishlistItem } from "@/modules/wishlist/types";
import { convertCurrency, getExchangeRate } from "@/shared/utils/exchange";

import { addToWishlist, clearWishlist, getWishlist, removeFromWishlist } from "./api";

interface WishlistState {
  items: WishlistItem[];
  originalUsdPrices: Record<string, number>;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: (accountEmail?: string, currency?: string) => Promise<void>;
  addItem: (
    productVariant: ProductVariant,
    productSlug: string,
    productCategory: string,
    accountEmail?: string,
    currency?: string,
    isCustomDesign?: boolean,
  ) => Promise<void>;
  removeItem: (productVariantId: string | number, accountEmail?: string) => Promise<void>;
  clear: (accountEmail?: string) => Promise<void>;
  refreshWithCurrency: (currency: string, accountEmail?: string) => Promise<void>;
}

/**
 * Wishlist state store.
 *
 * @description Zustand store that manages the wishlist with optimistic
 * updates and persistence.
 * @returns The wishlist store hook
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      originalUsdPrices: {},
      hydrated: false,
      loading: false,
      error: null,

      hydrate: async (accountEmail?: string, currency: string = "USD") => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            const guestItems = get().items.filter((item) => item.id.startsWith("guest_"));
            if (guestItems.length > 0) {
              try {
                const addToWishlistPromises = guestItems.map((item) =>
                  addToWishlist(
                    accountEmail,
                    item.productVariant.id,
                    item.productSlug,
                    item.productCategory,
                  ),
                );
                await Promise.all(addToWishlistPromises);
              } catch (e) {}
            }
            const response = await getWishlist(accountEmail, currency);

            const newOriginalUsdPrices = { ...get().originalUsdPrices };
            const exchangeRate = await getExchangeRate();

            response.items.forEach((item) => {
              if (item.productVariant.currency === "USD") {
                newOriginalUsdPrices[item.productVariant.id] = item.productVariant.price;
              } else if (item.productVariant.currency === "NGN") {
                convertCurrency(item.productVariant.price, "NGN", "USD")
                  .then((usdPrice) => {
                    set((state) => ({
                      originalUsdPrices: {
                        ...state.originalUsdPrices,
                        [item.productVariant.id]: usdPrice,
                      },
                    }));
                  })
                  .catch(() => {
                    const fallbackUsdPrice = Math.ceil(item.productVariant.price / exchangeRate);
                    set((state) => ({
                      originalUsdPrices: {
                        ...state.originalUsdPrices,
                        [item.productVariant.id]: fallbackUsdPrice,
                      },
                    }));
                  });
              }
            });

            set({
              items: response.items,
              originalUsdPrices: newOriginalUsdPrices,
              hydrated: true,
            });
          } else {
            set({ hydrated: true });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to load wishlist",
          });
        } finally {
          set({ loading: false });
        }
      },

      refreshWithCurrency: async (currency: string, accountEmail?: string) => {
        set({ loading: true });
        try {
          if (accountEmail) {
            const response = await getWishlist(accountEmail, currency);
            set({ items: response.items });
          } else {
            const state = get();
            const convertedItems = await convertWishlistItems(
              state.items,
              currency,
              state.originalUsdPrices,
            );
            set({ items: convertedItems });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to refresh wishlist with new currency",
          });
        } finally {
          set({ loading: false });
        }
      },

      addItem: async (
        productVariant: ProductVariant,
        productSlug: string,
        productCategory: string,
        accountEmail?: string,
        currency: string = "USD",
        isCustomDesign?: boolean,
      ) => {
        // Check if already in wishlist
        if (
          get().items.some(
            (item) => String(item.productVariant?.id) === String(productVariant.id),
          )
        ) {
          return;
        }

        // Optimistic update - add item immediately
        const newItem: WishlistItem = {
          id: accountEmail ? `temp_${Date.now()}` : `guest_${Date.now()}`,
          addedAt: new Date().toISOString(),
          productVariant,
          productSlug,
          productCategory: productCategory || "",
          isCustomDesign,
        };

        const previousItems = get().items;
        const previousPrices = { ...get().originalUsdPrices };

        const newOriginalUsdPrices = { ...previousPrices };
        if (productVariant.currency === "USD") {
          newOriginalUsdPrices[productVariant.id] = productVariant.price;
        }

        set({
          items: [...get().items, newItem],
          originalUsdPrices: newOriginalUsdPrices,
          error: null,
        });

        // If authenticated, sync with server in background
        if (accountEmail) {
          try {
            await addToWishlist(accountEmail, productVariant.id, productSlug, productCategory);
          } catch (error) {
            // Rollback on error
            set({
              items: previousItems,
              originalUsdPrices: previousPrices,
              error: error instanceof Error ? error.message : "Failed to add item",
            });
          }
        } else {
          // Guest user - handle currency conversion in background
          if (productVariant.currency === "NGN") {
            convertCurrency(productVariant.price, "NGN", "USD")
              .then((usdPrice) => {
                set((currentState) => ({
                  originalUsdPrices: {
                    ...currentState.originalUsdPrices,
                    [productVariant.id]: usdPrice,
                  },
                }));
              })
              .catch(() => {
                getExchangeRate().then((exchangeRate) => {
                  const fallbackUsdPrice = Math.ceil(productVariant.price / exchangeRate);
                  set((currentState) => ({
                    originalUsdPrices: {
                      ...currentState.originalUsdPrices,
                      [productVariant.id]: fallbackUsdPrice,
                    },
                  }));
                });
              });
          }
        }
      },

      removeItem: async (productVariantId: string | number, accountEmail?: string) => {
        const previousItems = get().items;
        const previousPrices = { ...get().originalUsdPrices };

        // Optimistic update - remove item immediately
        set((state) => ({
          items: state.items.filter(
            (item) => String(item.productVariant?.id) !== String(productVariantId),
          ),
          originalUsdPrices: Object.fromEntries(
            Object.entries(state.originalUsdPrices).filter(
              ([id]) => id !== productVariantId.toString(),
            ),
          ),
          error: null,
        }));

        // If authenticated, sync with server in background
        if (accountEmail) {
          try {
            await removeFromWishlist(accountEmail, productVariantId);
          } catch (error) {
            // Rollback on error
            set({
              items: previousItems,
              originalUsdPrices: previousPrices,
              error: error instanceof Error ? error.message : "Failed to remove item",
            });
          }
        }
      },

      clear: async (accountEmail?: string) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await clearWishlist(accountEmail);
          }
          set({ items: [], originalUsdPrices: {} });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to clear wishlist",
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        items: state.items,
        originalUsdPrices: state.originalUsdPrices,
      }),
      onRehydrateStorage: () => (state) => {
        state?.hydrate();
      },
    },
  ),
);

async function convertWishlistItems(
  items: WishlistItem[],
  targetCurrency: string,
  originalUsdPrices: Record<string, number>,
): Promise<WishlistItem[]> {
  const convertedItems: WishlistItem[] = [];

  // Fetch exchange rate once for the entire batch if needed
  let exchangeRate = 1540;
  if (
    targetCurrency !== "USD" ||
    items.some((item) => (item.productVariant.currency || "USD") !== targetCurrency)
  ) {
    exchangeRate = await getExchangeRate();
  }

  for (const item of items) {
    const currentCurrency = item.productVariant.currency || "USD";

    if (currentCurrency === targetCurrency) {
      convertedItems.push(item);
      continue;
    }

    let convertedPrice: number;
    let originalPrice: number | undefined;

    if (targetCurrency === "NGN") {
      if (originalUsdPrices[item.productVariant.id] !== undefined) {
        convertedPrice = Math.ceil(originalUsdPrices[item.productVariant.id] * exchangeRate);
        originalPrice = originalUsdPrices[item.productVariant.id];
      } else if (currentCurrency === "USD") {
        convertedPrice = Math.ceil(item.productVariant.price * exchangeRate);
        originalPrice = item.productVariant.price;
      } else {
        convertedPrice = item.productVariant.price;
      }
    } else {
      // targetCurrency === 'USD'
      if (originalUsdPrices[item.productVariant.id] !== undefined) {
        convertedPrice = originalUsdPrices[item.productVariant.id];
      } else if (currentCurrency === "NGN") {
        convertedPrice = Math.ceil(item.productVariant.price / exchangeRate);
      } else {
        convertedPrice = item.productVariant.price;
      }
    }

    convertedItems.push({
      ...item,
      productVariant: {
        ...item.productVariant,
        price: convertedPrice,
        originalPrice: targetCurrency === "NGN" ? originalPrice : undefined,
        currency: targetCurrency,
      },
    });
  }

  return convertedItems;
}
