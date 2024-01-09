import { useWizardStore } from "../stores/wizard";
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

  return (
    <div className="px-4 mt-16">
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
