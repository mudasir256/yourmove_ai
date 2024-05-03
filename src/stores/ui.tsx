import { create } from "zustand";

interface UIStore {
  stopScroll: boolean;
  setStopScroll: (stopScroll: boolean) => void;
  hideBottomNav: boolean;
  setHideBottomNav: (hideBottomNav: boolean) => void;
  hideTopBar: boolean;
  setHideTopBar: (hideTopBar: boolean) => void;

  // For displaying an error
  error: string | null;
  setError: (error: string | null) => void;

  // For hiding the Upsell briefly after they have signed in
  hideUpsell: boolean;
  setHideUpsell: (hideUpsell: boolean) => void;

  // For showing successful subscription
  subscriptionSuccess: boolean;
  setSubscriptionSuccess: (subscriptionSuccess: boolean) => void;

  hasCheckedForOnboarding: boolean;
  setHasCheckedForOnboarding: (hasCheckedForOnboarding: boolean) => void;

  paymentIsLoading: boolean;
  setPaymentIsLoading: (paymentIsLoading: boolean) => void;

  //for A/B Testing
  abTestGroup: number | undefined
  setABTestGroup: (abTestGroup: number) => void
}

export const useUIStore = create<UIStore>((set) => ({
  stopScroll: false,
  setStopScroll: (stopScroll) => set({ stopScroll }),
  hideBottomNav: false,
  setHideBottomNav: (hideBottomNav) => set({ hideBottomNav }),
  hideTopBar: false,
  setHideTopBar: (hideTopBar) => set({ hideTopBar }),
  error: null,
  setError: (error) => set({ error }),
  hideUpsell: false,
  setHideUpsell: (hideUpsell) => set({ hideUpsell }),
  subscriptionSuccess: false,
  setSubscriptionSuccess: (subscriptionSuccess) => set({ subscriptionSuccess }),
  hasCheckedForOnboarding: false,
  setHasCheckedForOnboarding: (hasCheckedForOnboarding) =>
    set({ hasCheckedForOnboarding }),
  paymentIsLoading: false,
  setPaymentIsLoading: (paymentIsLoading) => set({ paymentIsLoading }),
  abTestGroup: undefined,
  setABTestGroup: (abTestGroup: number) => set({ abTestGroup })
}));
