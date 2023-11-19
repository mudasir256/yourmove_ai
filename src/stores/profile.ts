import { create } from "zustand";
import { ProfileStep } from "../constants/profile";
import { ProfileResponse, Prompt } from "../models/profile";

interface ProfileStore {
  step: ProfileStep;
  setStep: (step: ProfileStep) => void;
  profile: Array<ProfileResponse>;
  setProfile: (profile: any) => void;
  prompts: Array<Prompt>;
  setPrompts: (prompts: Array<Prompt>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  step: ProfileStep.PAYMENT_PLANS,
  setStep: (step: ProfileStep) => set({ step }),
  profile: [],
  setProfile: (profile) => set({ profile }),
  prompts: [],
  setPrompts: (prompts) => set({ prompts }),
}));
