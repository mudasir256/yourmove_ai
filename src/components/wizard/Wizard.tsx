import {
  WizardStep as WizardStepModel,
  WizardStepType,
} from "../../models/wizard";
import { useWizardStore } from "../../stores/wizard";
import { WizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { getStep } from "../../utils";
import toast from "react-hot-toast";
import { PaymentPlans } from "../payment/PaymentPlans";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth";
import { auth } from "../../firebase";

/* Each Wizard has the following step:
1. Welcome
2. Wizard Steps
3. Paywall
4. Complete */

interface Props {
  // Take name for localStorage key
  name: string;
  steps: Array<WizardStepModel>;
  wizardComplete: boolean;
  setWizardComplete: (wizardComplete: boolean) => void;
  children: any;
  step: WizardStepType;
  setStep: (step: WizardStepType) => void;
  stepResults: Record<string, string>;
  setStepResult: (stepType: string, result: string) => void;
  storeStep?: boolean;
}

export const Wizard = ({
  name,
  steps,
  wizardComplete,
  setWizardComplete,
  children,
  step,
  setStep,
  stepResults,
  setStepResult,
  storeStep,
}: Props) => {
  const { isSubscribed } = useAuthStore();

  const goToNextStep = async () => {
    console.log("here go to");
    const nextStep = getStep(step, 1, steps);
    console.log("did we get here????");
    console.log(step);
    if (step === WizardStepType.WELCOME) {
      setStep(nextStep.step);
    } else {
      console.log("heteeee");
      console.log(stepResults);
      const stepValue = stepResults[step];
      const wizardStep = steps.find((wizardStep: WizardStepModel) => {
        return wizardStep.step === step;
      });

      if (wizardStep) {
        try {
          // If it has a validator
          if (wizardStep.validator) {
            await wizardStep.validator.validate(stepValue);
          }
          if (nextStep) {
            setStep(nextStep.step);
          }
          if (storeStep) {
            localStorage.setItem(`${name}:step`, step);
            localStorage.setItem(
              `${name}:stepResults`,
              JSON.stringify(stepResults)
            );
          }
          // If there is no more next step, we are at the end
          if (!nextStep) {
            setWizardComplete(true);
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    }
  };

  // Check if it's Paywall and if it is, skip it if the user is subscribed
  useEffect(() => {
    if (auth.currentUser && isSubscribed && step == WizardStepType.PAYWALL) {
      goToNextStep();
    }
  }, [step]);

  return (
    <div className="relative h-screen">
      <div className="mx-auto max-w-xl">
        {wizardComplete ? (
          <>{children}</>
        ) : (
          <>
            {step !== WizardStepType.PAYWALL ? (
              <>
                <div className="mt-6">
                  <WizardProgress step={step} steps={steps} />
                  <div className="mt-6">
                    <>
                      {steps.map((wizardStep: WizardStepModel) => {
                        return wizardStep.step === step ? (
                          <WizardStep
                            name={name}
                            key={wizardStep.label}
                            wizardStep={wizardStep}
                            goToNextStep={goToNextStep}
                            steps={steps}
                            step={step}
                            setStep={setStep}
                            stepResults={stepResults}
                            setStepResult={setStepResult}
                          />
                        ) : null;
                      })}
                    </>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 mb-40 right-0"
                  onClick={() => goToNextStep()}
                >
                  <div className="mt-auto bg-brand-primary w-12 h-12 flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      className="w-8 h-8 stroke-white -mr-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-10">
                <WizardProgress step={step} steps={steps} />
                <div className="px-2">
                  <div className="-ml-2 mt-6">
                    <svg
                      onClick={() => {
                        // previous step
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
                  </div>
                  <div className="h-8 w-full"></div>
                  <>
                    {
                      steps.find((wizardStep: WizardStepModel) => {
                        return wizardStep.step === step;
                      }).content
                    }
                  </>
                  {/* <PaymentPlans
                    stepResults={stepResults}
                    noThanksHandler={() => {
                      // wizard is complete and next step
                      setWizardComplete(true);
                    }}
                  /> */}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
