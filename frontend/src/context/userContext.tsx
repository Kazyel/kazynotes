import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserData = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  userId: number;
  setUserId: (userId: number) => void;
};

export const useUserStore = create<UserData, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      username: "",
      setUsername: (username: string) => set({ username }),
      userId: 0,
      setUserId: (userId: number) => set({ userId }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
