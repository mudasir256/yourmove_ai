import { useEffect } from "react";
import { WizardStep, WizardStepType } from "./models/wizard";
import { useAuthStore } from "./stores/auth";
import toast from "react-hot-toast";

export const getStepIndex = (
  step: WizardStepType,
  steps: Array<WizardStep>
) => {
  const currentIndex = steps.findIndex(
    (step_: WizardStep) => step_.step == step
  );
  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return steps.length - 1;
  }
  return currentIndex;
};

export const getStep = (
  step: WizardStepType,
  stepIndex: number,
  steps: Array<WizardStep>
) => {
  return steps[getStepIndex(step, steps) + stepIndex];
};

export function useOutsideAlerter(ref: any, callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const removeEmoji = (text: string): string => {
  // Regular expression to match Unicode emojis
  const emojiRegex = /\p{Emoji_Presentation}/gu;

  // Remove emojis from the start of the string
  return text.replace(emojiRegex, "").trim().toLowerCase();
};

export const successfulSignIn = (email: string) => {
  useAuthStore.getState().setAuthModalIsOpen(false);
  useAuthStore.getState().setShowAuthSubscriptionDisclaimer(false);
  toast.success(`Hey there ${email} 👋, welcome!`);
};

export const successfulSignUp = () => {
  toast.success("Successfully signed up, welcome!");
  useAuthStore.getState().setAuthModalIsOpen(false);
  useAuthStore.getState().setShowAuthSubscriptionDisclaimer(false);
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const getEndpoint = (url: string): string => {
  const lastSlashIndex = url.lastIndexOf('/');

  // If the URL ends with a slash, return an empty string
  if (lastSlashIndex === url.length - 1) {
    return '';
  }
  // If there's no slash or the last slash is part of the protocol (e.g., http://), return an empty string
  if (lastSlashIndex === -1 || url.indexOf('/', url.indexOf('//') + 2) === -1) {
    return '';
  }

  return url.substring(lastSlashIndex + 1);
}