import { create } from "zustand";

export const useCacheStore = create<{ favorites: number[]; setFavorites: (ids: number[]) => void }>((set) => ({
  favorites: [],
  setFavorites: (ids) => set({ favorites: ids }),
}));

