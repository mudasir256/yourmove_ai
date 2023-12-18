import { create } from "zustand";
import { AuthActionType } from "../constants/auth";

interface AuthStore {
  authModalIsOpen: boolean;
  setAuthModalIsOpen: (authModalIsOpen: boolean) => void;
  authActionType: AuthActionType;
  setAuthActionType: (authActionType: AuthActionType) => void;
  signInError: string | null;
  setSignInError: (signInError: string | null) => void;
  isSubscribed: boolean;
  setIsSubscribed: (isSubscribed: boolean) => void;
  hasCheckedForSubscription: boolean;
  setHasCheckedForSubscription: (hasCheckedForSubscription: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authModalIsOpen: false,
  setAuthModalIsOpen: (authModalIsOpen) => set({ authModalIsOpen }),
  authActionType: AuthActionType.SignIn,
  setAuthActionType: (authActionType) => set({ authActionType }),
  signInError: null,
  setSignInError: (signInError) => set({ signInError }),
  isSubscribed: false,
  setIsSubscribed: (isSubscribed) => set({ isSubscribed }),
  hasCheckedForSubscription: false,
  setHasCheckedForSubscription: (hasCheckedForSubscription) =>
    set({ hasCheckedForSubscription }),
}));
