import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/carts";
import { ProductVariant } from "../types/products";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../api/cart";
import { convertCurrency, getExchangeRate } from "../api/exchange-rate";

interface CartState {
  items: CartItem[];
  originalUsdPrices: Record<string, number>;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: (accountEmail?: string, currency?: string) => Promise<void>;
  addItem: (
    productVariant: ProductVariant,
    productSlug: string,
    productCategory: string,
    quantity: number,
    accountEmail?: string,
    size?: number,
    engraving?: { text: string; fontStyle: string },
    currency?: string,
  ) => Promise<void>;
  removeItem: (
    productVariantId: string | number,
    accountEmail?: string,
  ) => Promise<void>;
  updateItem: (
    productVariantId: string | number,
    update: {
      quantity?: number;
      size?: number;
      engraving?: { text: string; fontStyle: string };
    },
    accountEmail?: string,
    currency?: string,
  ) => Promise<void>;
  clear: (accountEmail?: string) => Promise<void>;
  refreshWithCurrency: (
    currency: string,
    accountEmail?: string,
  ) => Promise<void>;
}

export const useCartStore = create<CartState>()(
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
                const addToCartPromises = guestItems.map((item) =>
                  addToCart(
                    accountEmail,
                    item.productVariant.id,
                    item.productSlug,
                    item.productCategory,
                    item.quantity,
                    item.size,
                    item.engraving,
                  ),
                );
                await Promise.all(addToCartPromises);
              } catch (e) {}
            }
            const response = await getCart(accountEmail, currency);

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
              error instanceof Error ? error.message : "Failed to load cart",
          });
        } finally {
          set({ loading: false });
        }
      },

      refreshWithCurrency: async (currency: string, accountEmail?: string) => {
        set({ loading: true });
        try {
          if (accountEmail) {
            const response = await getCart(accountEmail, currency);
            set({ items: response.items });
          } else {
            const state = get();
            const convertedItems = await convertCartItems(
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
                : "Failed to refresh cart with new currency",
          });
        } finally {
          set({ loading: false });
        }
      },

      addItem: async (
        productVariant: ProductVariant,
        productSlug: string,
        productCategory: string,
        quantity: number,
        accountEmail?: string,
        size?: number,
        engraving?: { text: string; fontStyle: string },
        currency: string = "USD",
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await addToCart(
              accountEmail,
              productVariant.id,
              productSlug,
              productCategory,
              quantity,
              size,
              engraving,
            );
            const response = await getCart(accountEmail, currency);

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
              const existing = state.items.find(
                (item) => item.productVariant.id === productVariant.id,
              );
              if (existing) {
                return {
                  items: state.items.map((item) =>
                    item.productVariant.id === productVariant.id
                      ? {
                          ...item,
                          quantity: item.quantity + quantity,
                          size: size ?? item.size,
                          engraving: engraving ?? item.engraving,
                        }
                      : item,
                  ),
                };
              }
              const newItem: CartItem = {
                id: `guest_${Date.now()}`,
                addedAt: new Date().toISOString(),
                productVariant,
                productSlug,
                productCategory,
                quantity,
                size,
                engraving,
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

      removeItem: async (productVariantId, accountEmail) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await removeFromCart(accountEmail, productVariantId);
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

      updateItem: async (
        productVariantId: string | number,
        update: {
          quantity?: number;
          size?: number;
          engraving?: { text: string; fontStyle: string };
        },
        accountEmail?: string,
        currency: string = "USD",
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await updateCartItem(accountEmail, productVariantId, update);
            const response = await getCart(accountEmail, currency);
            set({ items: response.items });
          } else {
            set((state) => ({
              items: state.items.map((item) =>
                item.productVariant.id === productVariantId
                  ? {
                      ...item,
                      ...update,
                      size: update.size !== undefined ? update.size : item.size,
                    }
                  : item,
              ),
            }));
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to update item",
          });
        } finally {
          set({ loading: false });
        }
      },

      clear: async (accountEmail) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await clearCart(accountEmail);
          }
          set({ items: [], originalUsdPrices: {} });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to clear cart",
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "cart-store",
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

async function convertCartItems(
  items: CartItem[],
  targetCurrency: string,
  originalUsdPrices: Record<string, number>,
): Promise<CartItem[]> {
  const convertedItems: CartItem[] = [];

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
