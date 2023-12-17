import { create } from "zustand";
import { ProfileStep } from "../constants/profile";
import { ProfileResponse, Prompt, ReviewedProfile } from "../models/profile";

interface ProfileStore {
  step: ProfileStep;
  setStep: (step: ProfileStep) => void;
  profile: Array<ProfileResponse>;
  setProfile: (profile: any) => void;
  prompts: Array<Prompt>;
  setPrompts: (prompts: Array<Prompt>) => void;
  error: string | null;
  setError: (error: any) => void;
  reviewedProfile: ReviewedProfile | null;
  setReviewedProfile: (reviewedProfile: ReviewedProfile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  step: ProfileStep.PAYMENT_PLANS,
  setStep: (step: ProfileStep) => set({ step }),
  profile: [],
  setProfile: (profile) => set({ profile }),
  prompts: [],
  setPrompts: (prompts) => set({ prompts }),
  error: null,
  setError: (error) => set({ error }),
  reviewedProfile: null,
  setReviewedProfile: (reviewedProfile) => set({ reviewedProfile }),
}));
