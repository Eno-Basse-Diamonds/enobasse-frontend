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

interface WishlistState {
  items: WishlistItem[];
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  hydrate: (accountEmail?: string) => Promise<void>;
  addItem: (
    productVariant: ProductVariant,
    productSlug: string,
    accountEmail?: string
  ) => Promise<void>;
  removeItem: (
    productVariantId: string | number,
    accountEmail?: string
  ) => Promise<void>;
  clear: (accountEmail?: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
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
                const addToWishlistPromises = guestItems.map((item) =>
                  addToWishlist(accountEmail, item.productVariant.id, item.productSlug)
                );
                await Promise.all(addToWishlistPromises);
              } catch (e) {}
            }
            const response = await getWishlist(accountEmail);
            set({ items: response.items, hydrated: true });
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
      addItem: async (
        productVariant: ProductVariant,
        productSlug: string,
        accountEmail?: string
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await addToWishlist(accountEmail, productVariant.id, productSlug);
            const response = await getWishlist(accountEmail);
            set({ items: response.items });
          } else {
            set((state) => {
              if (
                state.items.some(
                  (item) => item.productVariant.id === productVariant.id
                )
              ) {
                return state;
              }
              const newItem: WishlistItem = {
                id: `guest_${Date.now()}`,
                addedAt: new Date().toISOString(),
                productVariant,
                productSlug,
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
      removeItem: async (
        productVariantId: string | number,
        accountEmail?: string
      ) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            await removeFromWishlist(accountEmail, productVariantId);
            set({
              items: get().items.filter(
                (item) => item.productVariant.id !== productVariantId
              ),
            });
          } else {
            set({
              items: get().items.filter(
                (item) => item.productVariant.id !== productVariantId
              ),
            });
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
          set({ items: [] });
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
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.hydrate();
      },
    }
  )
);
