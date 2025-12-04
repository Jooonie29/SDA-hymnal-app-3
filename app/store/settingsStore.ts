import { create } from "zustand";

export const useSettingsStore = create<{
  darkMode: boolean;
  fontSize: number;
  autoScrollSpeed: number;
  setDarkMode: (v: boolean) => void;
  setFontSize: (v: number) => void;
  setAutoScrollSpeed: (v: number) => void;
}>((set) => ({
  darkMode: true,
  fontSize: 16,
  autoScrollSpeed: 1,
  setDarkMode: (v) => set({ darkMode: v }),
  setFontSize: (v) => set({ fontSize: v }),
  setAutoScrollSpeed: (v) => set({ autoScrollSpeed: v }),
}));

