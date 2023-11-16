import { create } from "zustand";
import { WizardStepType } from "../models/wizard";

const checkLocalStorageForInitialStep = () => {
  const step = localStorage.getItem("step");
  return step ? step : WizardStepType.WELCOME;
};

const checkLocalStorageForInitialStepResults = () => {
  const stepResults = localStorage.getItem("stepResults");
  return stepResults ? JSON.parse(stepResults) : {};
};

interface WizardStore {
  step: WizardStepType;
  setStep: (step: WizardStepType) => void;
  stepResults: Record<string, string>;
  setStepResult: (stepType: string, result: string) => void;
  wizardComplete: boolean;
  setWizardComplete: (wizardComplete: boolean) => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  step: checkLocalStorageForInitialStep() as WizardStepType,
  setStep: (step: WizardStepType) => set({ step }),
  stepResults: checkLocalStorageForInitialStepResults(),
  setStepResult: (stepType, result) => {
    set((state) => ({
      stepResults: {
        ...state.stepResults,
        [stepType]: result,
      },
    }));
  },
  wizardComplete: false,
  setWizardComplete: (wizardComplete: boolean) => set({ wizardComplete }),
}));
