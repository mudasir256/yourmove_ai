import { create } from "zustand";
import { WizardStepType } from "../models/wizard";

interface WizardStore {
  step: WizardStepType;
  setStep: (step: WizardStepType) => void;
  stepResults: Record<string, string>;
  setStepResult: (stepType: string, result: string) => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  step: WizardStepType.WELCOME,
  setStep: (step: WizardStepType) => set({ step }),
  stepResults: {},
  setStepResult: (stepType, result) => {
    set((state) => ({
      stepResults: {
        ...state.stepResults,
        [stepType]: result,
      },
    }));
  },
}));
