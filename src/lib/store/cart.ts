import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Cart } from "../types/carts";
import { ProductVariant } from "../types/products";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../api/cart";

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: (accountEmail?: string) => Promise<void>;
  addItem: (
    productVariant: ProductVariant,
    productSlug: string,
    productCategory: string,
    quantity: number,
    accountEmail?: string,
    size?: number,
    engraving?: { text: string; fontStyle: string }
  ) => Promise<void>;
  removeItem: (
    productVariantId: string | number,
    accountEmail?: string
  ) => Promise<void>;
  updateItem: (
    productVariantId: string | number,
    update: {
      quantity?: number;
      size?: number;
      engraving?: { text: string; fontStyle: string };
    },
    accountEmail?: string
  ) => Promise<void>;
  clear: (accountEmail?: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      loading: false,
      error: null,
      hydrate: async (accountEmail?: string) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            const guestItems = get().items.filter((item) =>
              item.id.startsWith("guest_")
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
                    item.engraving
                  )
                );
                await Promise.all(addToCartPromises);
              } catch (e) {}
            }
            const response = await getCart(accountEmail);
            set({ items: response.items, hydrated: true });
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
      addItem: async (
        productVariant: ProductVariant,
        productSlug: string,
        productCategory: string,
        quantity: number,
        accountEmail?: string,
        size?: number,
        engraving?: { text: string; fontStyle: string }
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
              engraving
            );
            const response = await getCart(accountEmail);
            set({ items: response.items });
          } else {
            set((state) => {
              const existing = state.items.find(
                (item) => item.productVariant.id === productVariant.id
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
                      : item
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
              return { items: [...state.items, newItem] };
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
            const response = await getCart(accountEmail);
            set({ items: response.items });
          } else {
            set((state) => ({
              items: state.items.filter(
                (item) => item.productVariant.id !== productVariantId
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
        accountEmail?: string
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await updateCartItem(accountEmail, productVariantId, update);
            const response = await getCart(accountEmail);
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
                  : item
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
            set({ items: [] });
          } else {
            set({ items: [] });
          }
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
    { name: "cart-store" }
  )
);
