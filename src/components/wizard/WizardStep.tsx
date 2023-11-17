import {
  WizardStep as WizardStepModel,
  WizardStepInputType,
} from "../../models/wizard";
import { useWizardStore } from "../../stores/wizard";
import { getStep } from "../../utils";

interface Props {
  wizardStep: WizardStepModel;
}
export const WizardStep = ({ wizardStep }: Props) => {
  const { step, setStep, stepResults, setStepResult } = useWizardStore(
    (state) => state
  );

  const getStepValue = () => {
    return stepResults[wizardStep.step];
  };

  return (
    <div className="mt-10">
      <svg
        onClick={() => {
          const previousStep = getStep(step, -1);
          setStep(previousStep);
          localStorage.setItem("step", previousStep);
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        className="w-12 h-12 stroke-zinc-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <div className="mt-6 px-2">
        <h1 className="text-4xl font-bold">{wizardStep.label}</h1>

        <div className="">
          {wizardStep.type === WizardStepInputType.TEXT && (
            <div className="mt-4">
              <textarea
                value={getStepValue()}
                placeholder={wizardStep.placeholder}
                onChange={(e) => setStepResult(wizardStep.step, e.target.value)}
                className="bg-transparent text-2xl w-full outline-none text-zinc-500"
              />
            </div>
          )}
          {wizardStep.type === WizardStepInputType.EMAIL && (
            <div className="mt-4">
              <input
                type="email"
                value={getStepValue()}
                placeholder={wizardStep.placeholder}
                onChange={(e) => setStepResult(wizardStep.step, e.target.value)}
                className="bg-transparent text-2xl w-full outline-none text-zinc-500"
              />
            </div>
          )}
          {wizardStep.type === WizardStepInputType.RADIO &&
            wizardStep.choices && (
              <div className="flex flex-wrap">
                {wizardStep.choices.map((choice: string) => {
                  return (
                    <div
                      key={choice}
                      className={`${
                        getStepValue() === choice
                          ? "border-brand-primary border-2 pl-5 pr-3"
                          : "border-zinc-600 px-10"
                      } bg-white border py-2 mr-4 rounded-full mt-5 cursor-pointer flex hover:border-2`}
                      onClick={() => setStepResult(wizardStep.step, choice)}
                    >
                      {choice}

                      {getStepValue() === choice && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-6 h-6 ml-2 stroke-brand-primary"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          {wizardStep.type === WizardStepInputType.SELECT &&
            wizardStep.choices && (
              <div className="">
                {wizardStep.choices.map((choice: string) => {
                  return (
                    <div
                      key={choice}
                      className={`${
                        getStepValue() === choice
                          ? "bg-black text-white border-2 pl-5 pr-3 border-black"
                          : "border-zinc-600 px-5 bg-white"
                      } border py-2 mr-4 rounded-md mt-5 cursor-pointer flex hover:border-2`}
                      onClick={() => setStepResult(wizardStep.step, choice)}
                    >
                      {choice}

                      {getStepValue() === choice && (
                        <div className="w-full flex flex-row-reverse">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 ml-2 stroke-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      )}
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
