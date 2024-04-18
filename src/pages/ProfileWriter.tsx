import { useEffect } from 'react';
import { useWizardStore } from "../stores/wizard";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_WRITER_WIZARD_STEPS } from "../constants/wizard";
import { Profile } from "../components/profile/Profile";
import { Helmet } from 'react-helmet-async';

export const ProfileWriter = () => {
  const {
    profileWriterWizardComplete,
    setProfileWriterWizardComplete,
    profileWriterStep,
    setProfileWriterStep,
    profileWriterStepResults,
    setProfileWriterStepResult,
  } = useWizardStore();

  useEffect(() => {if ((window as any).gtag) {
      (window as any).gtag('event', 'writer_start', {event_category: 'funnel',product: 'profile_writer',
      });}}, []);
      
  return (
    
    <div className="px-4">
      <Helmet>
        <meta name="description" content="Bio and prompt writer for dating apps. Personalized to you. Tested and optimized for maximum matches." />
      </Helmet>
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
