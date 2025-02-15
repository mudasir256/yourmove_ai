import {
  WizardStepInputType,
  WizardStep as WizardStepModel,
  WizardStepType,
} from "../../models/wizard";
import { WizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { getStep, getStepIndex } from "../../utils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth";
import { auth } from "../../firebase";
import { Loading } from "../Loading";
import { useWizardStore } from "../../stores/wizard";

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
  onBackPress?: VoidFunction
  hasPaid?: boolean
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
  hasPaid = false,
  onBackPress = undefined
}: Props) => {
  const { isSubscribed } = useAuthStore();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const { filesUploading, profileReviewerFiles } = useWizardStore();
  const [nextButtonTranslateY, setNextButtonTranslateY] = useState("32rem");

  useEffect(() => {
    // Calculate translateY based on the viewport height
    // You might need to adjust the calculation to fit your design
    const viewportHeight = window.innerHeight;
    const dynamicTranslateY = `${viewportHeight * 0.63}px`; // for example, 80% of the viewport height

    setNextButtonTranslateY(dynamicTranslateY);
  }, []); // Empty dependency array ensures this runs on mount

  // Checking if a payment has been made, if so we need to show some processing
  useEffect(() => {
    // We got a payment and a redirect
    if (window.location.search && step === WizardStepType.PAYWALL) {
      // Set that we are processing the payment
      setPaymentProcessing(true);

      // Get the search params
      const searchParams = new URLSearchParams(window.location.search);

      // Delete the params
      searchParams.delete("payment_intent");
      searchParams.delete("payment_intent_client_secret");
      searchParams.delete("redirect_status");

      // Create a new URL with the updated search parameters
      const newURL = `${window.location.pathname}?${searchParams.toString()}`;

      // Replace the current URL with the updated one
      window.history.replaceState({}, document.title, newURL);

      // Set a timeout (maybe a query to the API layer, to check if the payment is complete)
      setTimeout(() => {
        // setStep(ProfileStep.PROFILE);
        setWizardComplete(true);
        setPaymentProcessing(false);
      }, 3000);
    }
  }, [window.location]);

  useEffect(() => {
    if (storeStep) {
      localStorage.setItem(`${name}:step`, step);
      localStorage.setItem(
        `${name}:stepResults`,
        JSON.stringify(stepResults)
      );
    }
  }, [stepResults, step])

  const goToNextStep = async () => {
    const nextStep = getStep(step, 1, steps);
    if (step === WizardStepType.WELCOME) {
      setStep(nextStep.step);
    } else {
      const stepValue = stepResults[step];
      const currentStep = steps.find((wizardStep: WizardStepModel) => wizardStep.step === step);

      if (currentStep) {
        try {
          // If it has a validator
          if (currentStep.validator) {
            await currentStep.validator.validate(stepValue);
          }
          if (
            currentStep.step === WizardStepType.UPLOAD_PHOTO &&
            currentStep.type === WizardStepInputType.FILE &&
            (!profileReviewerFiles || profileReviewerFiles.length === 0)
          ) {
            toast.error('Please upload a screenshot of your profile!')
            return
          }
          if (nextStep) {
            setStep(nextStep.step);
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
    <div>
      {step !== WizardStepType.PAYWALL &&
        !paymentProcessing &&
        !wizardComplete &&
        !filesUploading && (
          <div
            className="absolute right-0 mr-4"
            style={{ transform: `translateY(${nextButtonTranslateY})` }}
            onClick={() => goToNextStep()}
          >
            <div className="mt-auto bg-brand-primary w-12 h-12 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                className="w-8 h-8 stroke-white -mr-0.5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        )}
      {paymentProcessing ? (
        <>
          <Loading title="Payment Processing..." />
        </>
      ) : (
        <>
          {wizardComplete ? (
            <>{children}</>
          ) : (
            <div className="mx-auto max-w-xl">
              {step !== WizardStepType.PAYWALL ? (
                <>
                  <div className="mt-6">
                    <WizardProgress step={step} steps={steps} />
                    <div className="mt-6">
                      <>
                        {steps.map((wizardStep: WizardStepModel) => {
                          return (
                            <div key={wizardStep.step}>
                              {wizardStep.step === step ? (
                                <WizardStep
                                  name={name}
                                  key={wizardStep.label}
                                  wizardStep={wizardStep}
                                  goToNextStep={goToNextStep}
                                  steps={steps}
                                  step={step}
                                  hasPaid={hasPaid}
                                  setStep={setStep}
                                  stepResults={stepResults}
                                  setStepResult={setStepResult}
                                  onBackPress={onBackPress}
                                />
                              ) : null}
                            </div>
                          );
                        })}
                      </>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6">
                  <WizardProgress step={step} steps={steps} />
                  <div className="px-2">
                    <div className="-ml-2 mt-6">
                      <svg
                        onClick={() => {
                          // previous step
                          const currentStep = getStepIndex(step, steps)
                          if (currentStep === 0) {
                            localStorage.removeItem(
                              `${name}:step`
                            );
                            onBackPress?.()
                            return
                          }
                          const previousStep = getStep(step, -1, steps);
                          setStep(previousStep.step);
                          localStorage.setItem(
                            `${name}:step`,
                            previousStep.step
                          );
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        className="w-12 h-12 stroke-zinc-400 cursor-pointer"
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
            </div>
          )}
        </>
      )}
    </div>
  );
};
