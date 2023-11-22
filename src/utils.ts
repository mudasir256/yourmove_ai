import { useEffect } from "react";
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
