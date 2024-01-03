import { create } from "zustand";

interface UIStore {
  stopScroll: boolean;
  setStopScroll: (stopScroll: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  stopScroll: false,
  setStopScroll: (stopScroll) => set({ stopScroll }),
}));
