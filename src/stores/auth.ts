import { create } from "zustand";
import { AuthActionType, AuthState } from "../constants/auth";
import { PaymentIntent } from "@stripe/stripe-js";

interface AuthStore {
  authModalIsOpen: boolean;
  setAuthModalIsOpen: (authModalIsOpen: boolean) => void;
  authActionType: AuthActionType;
  setAuthActionType: (authActionType: AuthActionType) => void;
  signInError: string | null;
  setSignInError: (signInError: string | null) => void;
  isSubscribed: boolean | null;
  setIsSubscribed: (isSubscribed: boolean) => void;
  hasCheckedForSubscription: boolean;
  setHasCheckedForSubscription: (hasCheckedForSubscription: boolean) => void;

  // For OAuth
  showOptions: boolean;
  setShowOptions: (showOptions: boolean) => void;

  // For Migration
  emailToMigrate: string;
  setEmailToMigrate: (emailToMigrate: string) => void;

  showAuthSubscriptionDisclaimer: boolean;
  setShowAuthSubscriptionDisclaimer: (showAuthSubscriptionDisclaimer: boolean) => void;

  authState: AuthState;
  setAuthState: (authState: AuthState) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  authModalIsOpen: false,
  setAuthModalIsOpen: (authModalIsOpen) => set({ authModalIsOpen }),
  authActionType: AuthActionType.SignIn,
  setAuthActionType: (authActionType) => set({ authActionType }),
  signInError: null,
  setSignInError: (signInError) => set({ signInError }),
  isSubscribed: null,
  setIsSubscribed: (isSubscribed) => set({ isSubscribed }),
  hasCheckedForSubscription: false,
  setHasCheckedForSubscription: (hasCheckedForSubscription) =>
    set({ hasCheckedForSubscription }),
  showOptions: false,
  setShowOptions: (showOptions) => set({ showOptions }),
  emailToMigrate: "",
  setEmailToMigrate: (emailToMigrate) => set({ emailToMigrate }),
  showAuthSubscriptionDisclaimer: false,
  setShowAuthSubscriptionDisclaimer: (showAuthSubscriptionDisclaimer) => set({ showAuthSubscriptionDisclaimer }),
  authState: AuthState.Authenticating,
  setAuthState: (authState: AuthState) => set({ authState })
}));
