import { useEffect } from 'react';
import { useWizardStore } from "../stores/wizard";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_WRITER_WIZARD_STEPS } from "../constants/wizard";
import { Profile } from "../components/profile/Profile";
import { Helmet } from 'react-helmet-async';
import { checkUserSubscription, hasUserPaid } from '../queries';
import { ProductType } from '../constants/payments';
import { useProfileStore } from '../stores/profile';
import { useAuthStore } from '../stores/auth';
import { useLogEvent } from '../analytics';

export const ProfileWriter = () => {
  const {
    profileWriterWizardComplete,
    setProfileWriterWizardComplete,
    profileWriterStep,
    setProfileWriterStep,
    profileWriterStepResults,
    setProfileWriterStepResult,
  } = useWizardStore();

  useLogEvent('start', 'profile_writer')

  const { hasPurchasedProfileWriter, setHasPurchasedProfileWriter } = useProfileStore()
  const { isSubscribed, setIsSubscribed } = useAuthStore()

  const checkProfileWriterPurchaseStatus = async () => {
    if (profileWriterStepResults?.email) {
      const productResponse = await hasUserPaid(profileWriterStepResults.email, [ProductType.ProfileWriter])
      if (productResponse.data.purchasedProducts.includes(ProductType.ProfileWriter)) {
        setHasPurchasedProfileWriter(true)
      }

      const subscriptionResponse = await checkUserSubscription(profileWriterStepResults.email)
      setIsSubscribed(subscriptionResponse.data.isSubscribed)

      // not subscribed and hasn't purchased writer
      if (profileWriterStep === "writingStyle" && !productResponse.data.purchasedProducts.includes(ProductType.ProfileWriter) && !subscriptionResponse.data.isSubscribed) {
        const writerResults = localStorage.getItem(`profileWriter:stepResults`);
        const results = writerResults ? JSON.parse(writerResults) : {}
        if (results?.writingStyle !== "Flirty") {
          results.writingStyle = 'Flirty'
          // remove this once you debug the step results posting delay
          localStorage.setItem(
            `profileWriter:stepResults`,
            JSON.stringify(results)
          );
          setProfileWriterStepResult("writingStyle", "Flirty")
        }
      }
    }
  }

  useEffect(() => {
    if (profileWriterStep === "writingStyle") return
    checkProfileWriterPurchaseStatus()
  }, [])

  useEffect(() => {
    if (profileWriterStep !== "writingStyle") return
    checkProfileWriterPurchaseStatus()
  }, [profileWriterStep])

  // useEffect(() => {
  //   if ((window as any).gtag) {
  //     (window as any).gtag('event', 'writer_start', {
  //       event_category: 'funnel', product: 'profile_writer',
  //     });
  //   }
  // }, []);

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
        hasPaid={hasPurchasedProfileWriter || !!isSubscribed}
      >
        {profileWriterWizardComplete && <Profile />}
      </Wizard>
    </div>
  );
};
