import { create } from "zustand";

interface UIStore {
  stopScroll: boolean;
  setStopScroll: (stopScroll: boolean) => void;
  hideBottomNav: boolean;
  setHideBottomNav: (hideBottomNav: boolean) => void;

  // For displaying an error
  error: string | null;
  setError: (error: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  stopScroll: false,
  setStopScroll: (stopScroll) => set({ stopScroll }),
  hideBottomNav: false,
  setHideBottomNav: (hideBottomNav) => set({ hideBottomNav }),
  error: null,
  setError: (error) => set({ error }),
}));
