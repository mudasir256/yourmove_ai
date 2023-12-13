import { useEffect } from "react";
import { WizardStep, WizardStepType } from "./models/wizard";

export const getStepIndex = (
  step: WizardStepType,
  steps: Array<WizardStep>
) => {
  console.log("yo");
  console.log(step);
  console.log(steps);
  const currentIndex = steps.findIndex(
    (step_: WizardStep) => step_.step == step
  );
  console.log(currentIndex);

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
  console.log("in getSteps");
  console.log(steps);
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
