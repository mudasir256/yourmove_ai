import { WizardStepType } from "./models/wizard";
const steps = Object.values(WizardStepType);

export const getStepIndex = (step: WizardStepType) => {
  const currentIndex = steps.indexOf(step);

  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return steps.length - 1;
  }
  return currentIndex;
};

export const getStep = (step: WizardStepType, stepIndex: number) => {
  return steps[getStepIndex(step) + stepIndex];
};
