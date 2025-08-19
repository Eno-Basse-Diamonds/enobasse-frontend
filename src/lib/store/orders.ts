import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./cart";
import { Order, BillingAddress, OrderItem } from "../types/orders";
import {
  getOrders,
  getOrder,
  createOrder as createOrderApi,
} from "../api/orders";

export interface OrdersStore {
  orders: Order[];
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  createOrder: (orderData: {
    accountEmail?: string;
    items: any;
    total: number;
    billingAddress: BillingAddress;
    customerInfo?: {
      email: string;
      phone: string;
    };
    currency?: string;
  }) => Promise<Order>;
  getOrdersByAccountEmail: (email: string) => Promise<Order[]>;
  getOrderById: (id: string) => Promise<Order>;
  clearCartAfterOrder: (accountEmail?: string) => void;
  hydrateOrders: (accountEmail?: string) => Promise<void>;
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,
      hydrated: false,

      hydrateOrders: async (accountEmail?: string) => {
        set({ loading: true, error: null });
        try {
          if (accountEmail) {
            const orders = await getOrders(accountEmail);
            set({ orders, hydrated: true });
          } else {
            set({ hydrated: true });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load orders",
          });
        } finally {
          set({ loading: false });
        }
      },

      createOrder: async (orderData) => {
        set({ loading: true, error: null });
        try {
          const order = await createOrderApi({
            accountEmail: orderData.accountEmail,
            items: orderData.items.map((item: any) => ({
              productVariant: item.productVariant,
              productSlug: item.productSlug,
              productCategory: item.productCategory,
              quantity: item.quantity,
              size: item.size,
              engraving: item.engraving,
              price: item.price,
              currency: item.currency,
            })),
            total: orderData.total,
            customerInfo: orderData.customerInfo,
            billingAddress: orderData.billingAddress,
            currency: orderData.currency,
          });

          set((state) => ({
            orders: [order, ...state.orders],
          }));

          return order;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to create order";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      getOrdersByAccountEmail: async (email: string) => {
        set({ loading: true, error: null });
        try {
          if (email) {
            const orders = await getOrders(email);

            const sortedOrders = orders.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            set((state) => ({
              orders: state.orders
                .filter((order) => order.accountEmail !== email)
                .concat(sortedOrders),
            }));
            return sortedOrders;
          } else {
            const guestOrders = get()
              .orders.filter(
                (order) => !order.accountEmail || order.id.startsWith("GO")
              )
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
            return guestOrders;
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to get orders";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      getOrderById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          if (id.startsWith("GO")) {
            const order = get().orders.find((o) => o.id === id);
            if (!order) {
              throw new Error("Order not found");
            }
            return order;
          } else {
            const order = await getOrder(id);
            set((state) => ({
              orders: state.orders.filter((o) => o.id !== id).concat(order),
            }));
            return order;
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to get order";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      clearCartAfterOrder: (accountEmail) => {
        const cartStore = useCartStore.getState();
        if (cartStore.items.length > 0) {
          cartStore.clear(accountEmail);
        }
      },
    }),
    {
      name: "orders-storage",
      partialize: (state) => ({
        orders: state.orders,
      }),
      onRehydrateStorage: () => (state) => {
        state?.hydrateOrders();
      },
    }
  )
);

export const useCheckout = (accountEmail?: string) => {
  const { items, clear } = useCartStore();
  const { createOrder } = useOrdersStore();

  const checkout = async (
    billingAddress: BillingAddress,
    customerInfo?: { email: string; phone: string }
  ) => {
    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      productVariantId: String(item.productVariant.id),
      productVariant: item.productVariant,
      quantity: item.quantity,
      price: item.productVariant.price,
      currency: item.productVariant.currency,
      productSlug: item.productSlug,
      productCategory: item.productCategory,
      size: item.size,
      engraving: item.engraving,
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await createOrder({
      accountEmail,
      items: orderItems,
      total,
      billingAddress,
      customerInfo,
      currency: items[0]?.productVariant.currency,
    });

    clear(accountEmail);

    return order;
  };

  return { checkout };
};
