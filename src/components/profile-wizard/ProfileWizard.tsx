import { Formik } from "formik";
import { WIZARD_STEPS } from "../../constants/wizard";
import { WizardStep, WizardStepType } from "../../models/wizard";
import { useWizardStore } from "../../stores/wizard";
import { ProfileWizardProgress } from "./ProfileWizardProgress";
import { ProfileWizardStep } from "./ProfileWizardStep";
import { getStep } from "../../utils";

export const ProfileWizard = () => {
  const step = useWizardStore((state) => state.step);
  const setStep = useWizardStore((state) => state.setStep);

  return (
    <div className="relative h-screen">
      <div>
        <ProfileWizardProgress />
        <Formik
          initialValues={{}}
          validationSchema={{}}
          onSubmit={(values, actions) => {
            console.log("submit");
          }}
          enableReinitialize
        >
          {() => (
            <form>
              <div className="mt-6">
                {step === WizardStepType.WELCOME ? (
                  <div className="mt-10">
                    <h1 className="text-5xl font-bold">
                      Welcome to Profile Writer
                    </h1>
                    <div className="mt-8">
                      <p className="text-2xl">
                        Time for you to glow up! Don't sell yourself short
                      </p>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl">
                        Let’s get to know you so people see you how your dog
                        sees you ✨
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {WIZARD_STEPS.map((wizardStep: WizardStep) => {
                      return wizardStep.step === step ? (
                        <ProfileWizardStep wizardStep={wizardStep} />
                      ) : null;
                    })}
                  </>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div
        className="absolute bottom-0 mb-40 right-0"
        onClick={() => {
          setStep(getStep(step, 1));
        }}
      >
        <div className="mt-auto bg-brand-primary w-12 h-12 flex items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            className="w-8 h-8 stroke-white -mr-0.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
