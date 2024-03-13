import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthUser } from "@/lib/types/globalTypes";

type InitialState = {
  token: string | null;
  user: AuthUser | null;
  expirationDate: string | null;
};

type Action = {
  signIn: (token: string, user: AuthUser, expirationDate: string) => void;
  signOut: () => void;
  checkToken: () => void;
};

type AuthStore = InitialState & Action;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      expirationDate: null,
      signIn: (token, user, expirationDate) =>
        set({ token, user, expirationDate }),
      signOut: () => set({ token: null, user: null, expirationDate: null }),
      checkToken: () => {
        const { expirationDate } = get();
        if (expirationDate && new Date(expirationDate).getTime() < Date.now()) {
          set({ token: null, user: null, expirationDate: null });
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
