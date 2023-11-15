import { WizardStepType } from "./models/wizard";
const steps = Object.values(WizardStepType);

export const getStep = (step: WizardStepType, stepIndex: number) => {
  const steps = Object.values(WizardStepType);
  const currentIndex = steps.indexOf(step);

  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return steps[steps.length - 1]; // Already at the last step
  }
  return steps[currentIndex + stepIndex];
};
