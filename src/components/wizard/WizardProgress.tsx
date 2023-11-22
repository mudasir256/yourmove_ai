import { useEffect, useState } from "react";
import { useWizardStore } from "../../stores/wizard";
import { WIZARD_STEPS } from "../../constants/wizard";
import { getStepIndex } from "../../utils";

export const ProfileWizardProgress = () => {
  const step = useWizardStore((state) => state.step);
  const [perecentageCompleted, setPercentageCompleted] = useState(0);

  // Everytime the step changes, calculate the percentage completed
  useEffect(() => {
    setPercentageCompleted((getStepIndex(step) / WIZARD_STEPS.length) * 100);
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
