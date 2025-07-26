import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  id: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setUser: (user: { id: string; email: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      isAuthenticated: false,
      setUser: (user) => set({
        id: user.id,
        email: user.email,
        isAuthenticated: true
      }),
      clearUser: () => set({
        id: null,
        email: null,
        isAuthenticated: false
      }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        id: state.id,
        email: state.email,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
