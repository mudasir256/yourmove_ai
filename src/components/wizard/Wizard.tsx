import { WIZARD_STEPS } from "../../constants/wizard";
import {
  WizardStep as WizardStepModel,
  WizardStepType,
} from "../../models/wizard";
import { useWizardStore } from "../../stores/wizard";
import { ProfileWizardProgress } from "./WizardProgress";
import { WizardStep } from "./WizardStep";
import { getStep } from "../../utils";
import toast from "react-hot-toast";

export const Wizard = () => {
  const { step, setStep, stepResults, setWizardComplete } = useWizardStore(
    (state) => state
  );

  const goToNextStep = async () => {
    const nextStep = getStep(step, 1);
    if (step === WizardStepType.WELCOME) {
      setStep(nextStep);
    } else {
      const stepValue = stepResults[step];
      const wizardStep = WIZARD_STEPS.find((wizardStep: WizardStepModel) => {
        return wizardStep.step === step;
      });

      if (wizardStep) {
        try {
          await wizardStep.validator.validate(stepValue);
          console.log("Validation successful");
          console.log("here");
          console.log(nextStep);
          if (nextStep) {
            setStep(nextStep);
          }
          localStorage.setItem("step", step);
          localStorage.setItem("stepResults", JSON.stringify(stepResults));
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

  return (
    <div className="relative h-screen">
      <div>
        <ProfileWizardProgress />
        <div className="mt-6">
          {step === WizardStepType.WELCOME ? (
            <div className="mt-10">
              <h1 className="text-5xl font-bold">Welcome to Profile Writer</h1>
              <div className="mt-8">
                <p className="text-2xl">
                  Time for you to glow up! Don't sell yourself short
                </p>
              </div>
              <div className="mt-6">
                <p className="text-2xl">
                  Let’s get to know you so people see you how your dog sees you
                  ✨
                </p>
              </div>
            </div>
          ) : (
            <>
              {WIZARD_STEPS.map((wizardStep: WizardStepModel) => {
                return wizardStep.step === step ? (
                  <WizardStep
                    key={wizardStep.label}
                    wizardStep={wizardStep}
                    goToNextStep={goToNextStep}
                  />
                ) : null;
              })}
            </>
          )}
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
    </div>
  );
};
