import { useEffect, useState } from "react";
import { getStepIndex } from "../../utils";
import { WizardStep, WizardStepType } from "../../models/wizard";

interface Props {
  step: WizardStepType;
  steps: Array<WizardStep>;
}

export const WizardProgress = ({ step, steps }: Props) => {
  const [perecentageCompleted, setPercentageCompleted] = useState(0);

  // Everytime the step changes, calculate the percentage completed
  useEffect(() => {
    setPercentageCompleted((getStepIndex(step, steps) / steps.length) * 100);
  }, [step]);

  return (
    <div className="w-full bg-zinc-300 h-2 rounded-md my-4 relative">
      <div
        className="bg-red-400 absolute h-full rounded-md transition-width duration-500 ease-in-out"
        style={{ width: `${perecentageCompleted}%` }}
      ></div>
    </div>
  );
};
