import { useWizardStore } from "../stores/wizard";
import { useProfileStore } from "../stores/profile";
import { useEffect, useState } from "react";
import { ProfileStep } from "../constants/profile";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_WRITER_WIZARD_STEPS } from "../constants/wizard";
import { Profile } from "../components/profile/Profile";

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

  // // This needs to be in the wizard
  // useEffect(() => {
  //   // We got a payment and a redirect
  //   if (window.location.search) {
  //     // Set that we are processing the payment
  //     setPaymentProcessing(true);

  //     // Get the search params
  //     const searchParams = new URLSearchParams(window.location.search);

  //     // Delete the params
  //     searchParams.delete("payment_intent");
  //     searchParams.delete("payment_intent_client_secret");
  //     searchParams.delete("redirect_status");

  //     // Create a new URL with the updated search parameters
  //     const newURL = `${window.location.pathname}?${searchParams.toString()}`;

  //     // Replace the current URL with the updated one
  //     window.history.replaceState({}, document.title, newURL);

  //     // Set a timeout (maybe a query to the API layer, to check if the payment is complete)
  //     setTimeout(() => {
  //       setStep(ProfileStep.PROFILE);
  //       setProfileWriterWizardComplete(true);
  //       setPaymentProcessing(false);
  //     }, 2000);
  //   }
  // }, [window.location]);

  return (
    <div className="px-4">
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
        {profileWriterWizardComplete && <Profile />}
      </Wizard>
    </div>
  );
};
