import { create } from "zustand";

interface UserData {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserData>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  username: "",
  setUsername: (username: string) => set({ username }),
}));
