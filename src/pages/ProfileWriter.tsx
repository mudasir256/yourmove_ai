import { useWizardStore } from "../stores/wizard";
import { useProfileStore } from "../stores/profile";
import { useEffect, useState } from "react";
import { ProfileStep } from "../constants/profile";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_WRITER_WIZARD_STEPS } from "../constants/wizard";

export const ProfileWriter = () => {
  const {
    profileWriterWizardComplete,
    setProfileWriterWizardComplete,
    profileWriterStep,
    setProfileWriterStep,
    profileWriterStepResults,
    setProfileWriterStepResult,
  } = useWizardStore();
  const { step, setStep, error } = useProfileStore();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    // We got a payment and a redirect
    if (window.location.search) {
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
        setStep(ProfileStep.PROFILE);
        setProfileWriterWizardComplete(true);
        setPaymentProcessing(false);
      }, 2000);
    }
  }, [window.location]);

  return (
    <>
      <Wizard
        name="profileWriter"
        steps={PROFILE_WRITER_WIZARD_STEPS}
        wizardComplete={profileWriterWizardComplete}
        setWizardComplete={setProfileWriterWizardComplete}
        step={profileWriterStep}
        setStep={setProfileWriterStep}
        stepResults={profileWriterStepResults}
        setStepResult={setProfileWriterStepResult}
        storeStep={true}
      >
        <>Profile Writer Wizard is Completed</>
      </Wizard>
      {/* {error ? (
        <Error error={error} />
      ) : (
        <>
          {paymentProcessing ? (
            <Loading title="Payment Processing" />
          ) : (
            <>
              {profileWriterWizardComplete ? (
                <>
                  {step === ProfileStep.PAYMENT_PLANS ? (
                    <div className="">
                      <WizardProgress steps={PROFILE_WRITER_WIZARD_STEPS} />
                      <div className="px-2">
                        <div className="-ml-2">
                          <svg
                            onClick={() => {
                              const setStep = useWizardStore.getState().setStep;
                              setProfileWriterWizardComplete(false);
                              setStep(WizardStepType.EMAIL);
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
                        <PaymentPlans
                          noThanksHandler={() => setStep(ProfileStep.PROFILE)}
                        />
                      </div>
                    </div>
                  ) : (
                    <Profile />
                  )}
                </>
              ) : (
                <Wizard
                  name="profileWriter"
                  steps={PROFILE_WRITER_WIZARD_STEPS}
                  wizardComplete={profileWriterWizardComplete}
                  setWizardComplete={setProfileWriterWizardComplete}
                />
              )}
            </>
          )}
        </>
      )} */}
    </>
  );
};
