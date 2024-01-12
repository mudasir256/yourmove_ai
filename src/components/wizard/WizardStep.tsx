import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  WizardStep as WizardStepModel,
  WizardStepInputType,
  WizardStepType,
} from "../../models/wizard";
import { useUIStore } from "../../stores/ui";
import { getStep } from "../../utils";
import { FileUploadStep } from "./FileUploadStep";

interface Props {
  name: string;
  wizardStep: WizardStepModel;
  goToNextStep: () => void;
  steps: Array<WizardStepModel>;
  step: WizardStepType;
  setStep: (step: WizardStepType) => void;
  stepResults: Record<string, string>;
  setStepResult: (stepType: string, result: string) => void;
}
export const WizardStep = ({
  name,
  wizardStep,
  goToNextStep,
  steps,
  step,
  setStep,
  stepResults,
  setStepResult,
}: Props) => {
  const getStepValue = () => {
    return stepResults[wizardStep.step];
  };
  const { stopScroll, setStopScroll } = useUIStore();

  const [isFirstStep, setIsFirstStep] = useState(
    !!!steps.findIndex(
      (wizardStep: WizardStepModel) => wizardStep.step === step
    )
  );

  useEffect(() => {
    setStopScroll(true);
  }, []);

  // If the step is and email and the user is logged in, set the email
  useEffect(() => {
    if (wizardStep.type === WizardStepInputType.EMAIL && auth.currentUser) {
      setStepResult(wizardStep.step, auth.currentUser.email);
    }
  }, []);

  return (
    <div className="mt-6 mb-20">
      {!isFirstStep && (
        <svg
          onClick={() => {
            const previousStep = getStep(step, -1, steps);
            setStep(previousStep.step);
            localStorage.setItem(`${name}:step`, previousStep.step);
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
      )}
      <div className={`px-2 ${isFirstStep ? "mt-10" : "mt-6"}`}>
        <h1 className="text-4xl font-bold">{wizardStep.label}</h1>

        <div className="">
          {wizardStep.type === WizardStepInputType.CONTENT && (
            <>{wizardStep.content}</>
          )}

          {wizardStep.type === WizardStepInputType.TEXT && (
            <div className="mt-4">
              <textarea
                value={getStepValue()}
                placeholder={wizardStep.placeholder}
                onChange={(e) => setStepResult(wizardStep.step, e.target.value)}
                className="bg-transparent text-2xl w-full outline-none text-zinc-500"
                rows={100}
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
                          ? "border-black border-2 pl-5 pr-3 hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out"
                          : "border-black px-10 hover:bg-black hover:text-white transition duration-300 ease-in-out"
                      } bg-white border py-2 mr-4 rounded-full mt-5 cursor-pointer flex stroke-brand-primary hover:stroke-white`}
                      onClick={() => {
                        setStepResult(wizardStep.step, choice);
                        goToNextStep();
                      }}
                    >
                      {choice}

                      {getStepValue() === choice && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          className={`w-6 h-6 ml-2`}
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
                          ? "bg-brand-primary text-white pl-5 pr-3"
                          : "border-black border-2 px-5 bg-white transition duration-300 ease-in-out"
                      } border py-2 mr-4 rounded-md mt-5 cursor-pointer flex hover:bg-black hover:text-white`}
                      onClick={() => {
                        setStepResult(wizardStep.step, choice);
                        goToNextStep();
                      }}
                    >
                      <div className="w-3/4">{choice}</div>

                      {getStepValue() === choice && (
                        <div className="flex flex-row-reverse w-1/4">
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

          {wizardStep.type === WizardStepInputType.FILE &&
            wizardStep.onFilesUploaded && (
              <FileUploadStep
                alreadySetFiles={
                  getStepValue() ? JSON.parse(getStepValue()) : []
                }
                onFilesUploaded={(files: Array<string>) => {
                  // Set the step result
                  setStepResult(wizardStep.step, JSON.stringify(files));

                  // Do the wizard step handler
                  wizardStep.onFilesUploaded(files);
                }}
              />
            )}
        </div>
      </div>
    </div>
  );
};
