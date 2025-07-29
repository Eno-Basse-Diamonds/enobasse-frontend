import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccountState {
  id: string | null;
  email: string | null;
  billingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    region: string;
    postalCode: string;
    phone: string;
  };
  setAccount: (account: { id: string; email: string }) => void;
  clearAccount: () => void;
  updateBillingAddress?: (address: any) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      billingAddress: undefined,
      setAccount: (account) =>
        set({
          id: account.id,
          email: account.email,
        }),
      clearAccount: () =>
        set({
          id: null,
          email: null,
          billingAddress: undefined,
        }),
      updateBillingAddress: (address) => set({ billingAddress: address }),
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        id: state.id,
        email: state.email,
        billingAddress: state.billingAddress,
      }),
    }
  )
);
