import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem } from "../types/wishlists";
import { ProductVariant } from "../types/products";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../api/wishlist";
import { convertCurrency, getExchangeRate } from "../api/exchange-rate";

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
  ) => Promise<void>;
  removeItem: (
    productVariantId: string | number,
    accountEmail?: string,
  ) => Promise<void>;
  clear: (accountEmail?: string) => Promise<void>;
  refreshWithCurrency: (
    currency: string,
    accountEmail?: string,
  ) => Promise<void>;
}

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
            const guestItems = get().items.filter((item) =>
              item.id.startsWith("guest_"),
            );
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
                newOriginalUsdPrices[item.productVariant.id] =
                  item.productVariant.price;
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
                    const fallbackUsdPrice = Math.ceil(
                      item.productVariant.price / exchangeRate,
                    );
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
            error:
              error instanceof Error
                ? error.message
                : "Failed to load wishlist",
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
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await addToWishlist(
              accountEmail,
              productVariant.id,
              productSlug,
              productCategory,
            );
            const response = await getWishlist(accountEmail, currency);

            const newOriginalUsdPrices = { ...get().originalUsdPrices };
            const exchangeRate = await getExchangeRate();

            response.items.forEach((item) => {
              if (item.productVariant.currency === "USD") {
                newOriginalUsdPrices[item.productVariant.id] =
                  item.productVariant.price;
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
                    const fallbackUsdPrice = Math.ceil(
                      item.productVariant.price / exchangeRate,
                    );
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
            });
          } else {
            set((state) => {
              if (
                state.items.some(
                  (item) => item.productVariant.id === productVariant.id,
                )
              ) {
                return state;
              }

              const newItem: WishlistItem = {
                id: `guest_${Date.now()}`,
                addedAt: new Date().toISOString(),
                productVariant,
                productSlug,
                productCategory: productCategory || "",
              };

              const newOriginalUsdPrices = { ...state.originalUsdPrices };

              if (productVariant.currency === "USD") {
                newOriginalUsdPrices[productVariant.id] = productVariant.price;
              } else if (productVariant.currency === "NGN") {
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
                      const fallbackUsdPrice = Math.ceil(
                        productVariant.price / exchangeRate,
                      );
                      set((currentState) => ({
                        originalUsdPrices: {
                          ...currentState.originalUsdPrices,
                          [productVariant.id]: fallbackUsdPrice,
                        },
                      }));
                    });
                  });
              }

              return {
                items: [...state.items, newItem],
                originalUsdPrices: newOriginalUsdPrices,
              };
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to add item",
          });
        } finally {
          set({ loading: false });
        }
      },

      removeItem: async (
        productVariantId: string | number,
        accountEmail?: string,
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await removeFromWishlist(accountEmail, productVariantId);
            set((state) => ({
              items: state.items.filter(
                (item) => item.productVariant.id !== productVariantId,
              ),
              originalUsdPrices: Object.fromEntries(
                Object.entries(state.originalUsdPrices).filter(
                  ([id]) => id !== productVariantId.toString(),
                ),
              ),
            }));
          } else {
            set((state) => ({
              items: state.items.filter(
                (item) => item.productVariant.id !== productVariantId,
              ),
              originalUsdPrices: Object.fromEntries(
                Object.entries(state.originalUsdPrices).filter(
                  ([id]) => id !== productVariantId.toString(),
                ),
              ),
            }));
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to remove item",
          });
        } finally {
          set({ loading: false });
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
            error:
              error instanceof Error
                ? error.message
                : "Failed to clear wishlist",
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
        convertedPrice = await convertCurrency(
          originalUsdPrices[item.productVariant.id],
          "USD",
          "NGN",
        );
        originalPrice = originalUsdPrices[item.productVariant.id];
      } else if (currentCurrency === "USD") {
        convertedPrice = await convertCurrency(
          item.productVariant.price,
          "USD",
          "NGN",
        );
        originalPrice = item.productVariant.price;
      } else {
        convertedPrice = item.productVariant.price;
      }
    } else {
      if (originalUsdPrices[item.productVariant.id] !== undefined) {
        convertedPrice = originalUsdPrices[item.productVariant.id];
      } else if (currentCurrency === "NGN") {
        convertedPrice = await convertCurrency(
          item.productVariant.price,
          "NGN",
          "USD",
        );
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
