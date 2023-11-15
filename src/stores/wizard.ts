import { create } from "zustand";
import { WizardStepType } from "../models/wizard";

interface WizardStore {
  step: WizardStepType;
  setStep: (step: WizardStepType) => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  step: WizardStepType.WELCOME,
  setStep: (step: WizardStepType) => set({ step }),
}));
