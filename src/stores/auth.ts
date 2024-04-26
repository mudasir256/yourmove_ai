import { create } from "zustand";
import { AuthActionType } from "../constants/auth";
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

  // For Payment
  subscriptionEmail: string;
  setSubscriptionEmail: (subscriptionEmail: string) => void;

  // For Subscription
  subscriptionId: string;
  setSubscriptionId: (subscriptionId: string) => void;

  // Auth for payment
  shouldAuthenticateForSubscription: boolean;
  setShouldAuthenticateForSubscription: (shouldAuthenticateForSubscription: boolean) => void;

  showAuthSubscriptionDisclaimer: boolean;
  setShowAuthSubscriptionDisclaimer: (showAuthSubscriptionDisclaimer: boolean) => void;
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
  subscriptionEmail: "",
  setSubscriptionEmail: (subscriptionEmail: string) => set({ subscriptionEmail }),
  subscriptionId: "",
  setSubscriptionId: (subscriptionId: string) => set({ subscriptionId }),
  shouldAuthenticateForSubscription: false,
  setShouldAuthenticateForSubscription: (shouldAuthenticateForSubscription) => 
    set({ shouldAuthenticateForSubscription }),
  showAuthSubscriptionDisclaimer: false,
  setShowAuthSubscriptionDisclaimer: (showAuthSubscriptionDisclaimer) => set({showAuthSubscriptionDisclaimer})
}));
