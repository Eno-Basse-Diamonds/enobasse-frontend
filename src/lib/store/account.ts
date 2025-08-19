import { create } from "zustand";
import { persist } from "zustand/middleware";
import { updateAccount } from "../api/account";

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
}

interface AccountState {
  email: string | null;
  preferredCurrency: string;
  billingAddress?: BillingAddress;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAccount: (account: { email: string }) => void;
  clearAccount: () => void;
  updateBillingAddress?: (address: BillingAddress) => void;
  setPreferredCurrency: (currency: string) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsHydrated: (isHydated: boolean) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      email: null,
      preferredCurrency: "USD",
      billingAddress: undefined,
      isAuthenticated: false,
      isHydrated: false,

      setAccount: (account) => set({ email: account.email }),

      clearAccount: () =>
        set({
          email: null,
          preferredCurrency: "USD",
          billingAddress: undefined,
          isAuthenticated: false,
        }),

      updateBillingAddress: (address) => set({ billingAddress: address }),

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
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        email: state.email,
        billingAddress: state.billingAddress,
        preferredCurrency: state.preferredCurrency,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    }
  )
);
