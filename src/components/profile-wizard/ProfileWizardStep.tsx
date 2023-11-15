import { WizardStep, WizardStepInputType } from "../../models/wizard";
import { useWizardStore } from "../../stores/wizard";
import { getStep } from "../../utils";

interface Props {
  wizardStep: WizardStep;
}
export const ProfileWizardStep = ({ wizardStep }: Props) => {
  const step = useWizardStore((state) => state.step);
  const setStep = useWizardStore((state) => state.setStep);

  return (
    <div className="mt-10">
      <svg
        onClick={() => setStep(getStep(step, -1))}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        className="w-12 h-12 stroke-zinc-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <div className="mt-6 px-2">
        <h1 className="text-4xl font-bold">{wizardStep.label}</h1>

        <div className="">
          {wizardStep.type === WizardStepInputType.TEXT && (
            <div className="mt-4">
              <textarea
                placeholder={wizardStep.placeholder}
                className="bg-transparent text-2xl w-full outline-none text-zinc-500"
              />
            </div>
          )}
          {wizardStep.type === WizardStepInputType.SELECT &&
            wizardStep.choices && (
              <div className="flex flex-wrap">
                {wizardStep.choices.map((choice: string) => {
                  return (
                    <div className="bg-white border border-zinc-600 px-10 py-2 mr-4 rounded-full mt-5">
                      {choice}
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
