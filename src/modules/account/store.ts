import { create } from "zustand";
import { persist } from "zustand/middleware";

import { updateAccount } from "./api";

interface BillingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  region: string;
  postalCode: string;
  phone: string;
  email?: string;
}

interface AccountState {
  email: string | null;
  resetEmail: string | null;
  preferredCurrency: string;
  billingAddress?: BillingAddress;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAccount: (account: { email: string }) => void;
  clearAccount: () => void;
  updateBillingAddress: (address: BillingAddress) => Promise<void>;
  updateLocalBillingAddress: (address: BillingAddress) => void;
  setPreferredCurrency: (currency: string) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsHydrated: (isHydated: boolean) => void;
  setResetEmail: (email: string) => void;
  clearResetEmail: () => void;
}

/**
 * Account state store.
 *
 * @description Zustand store that manages account state including email,
 * preferred currency, billing address, and authentication status.
 * @returns The account store hook
 */
export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      email: null,
      resetEmail: null,
      preferredCurrency: "USD",
      billingAddress: undefined,
      isAuthenticated: false,
      isHydrated: false,

      setAccount: (account) => set({ email: account.email }),

      clearAccount: () =>
        set({
          email: null,
          resetEmail: null,
          preferredCurrency: "USD",
          billingAddress: undefined,
          isAuthenticated: false,
        }),

      updateBillingAddress: async (address) => {
        set({ billingAddress: address });

        if (get().isAuthenticated) {
          try {
            await updateAccount(get().email || "", {
              billingAddress: {
                street: address.address + (address.apartment ? `, ${address.apartment}` : ""),
                city: address.city,
                state: address.region,
                postalCode: address.postalCode,
                country: address.country,
              },
              phone: address.phone,
              name: `${address.firstName} ${address.lastName}`.trim(),
            });
          } catch (error) {
            // Keep local changes anyway
          }
        }
      },

      updateLocalBillingAddress: (address) => set({ billingAddress: address }),

      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      setPreferredCurrency: async (currency: string) => {
        set({ preferredCurrency: currency });

        if (get().isAuthenticated) {
          try {
            await updateAccount(get().email || "", {
              preferredCurrency: currency,
            });
          } catch (error) {
            set({ preferredCurrency: get().preferredCurrency });
          }
        }
      },

      setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),

      setResetEmail: (email: string) => set({ resetEmail: email }),

      clearResetEmail: () => set({ resetEmail: null }),
    }),
    {
      name: "account-storage",
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AccountState> | undefined;

        return {
          email: typeof state?.email === "string" ? state.email : null,
          billingAddress:
            state?.billingAddress && typeof state.billingAddress === "object"
              ? state.billingAddress
              : undefined,
          preferredCurrency:
            typeof state?.preferredCurrency === "string" ? state.preferredCurrency : "USD",
          isAuthenticated:
            typeof state?.isAuthenticated === "boolean" ? state.isAuthenticated : false,
        };
      },
      partialize: (state) => ({
        email: state.email,
        billingAddress: state.billingAddress,
        preferredCurrency: state.preferredCurrency,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
