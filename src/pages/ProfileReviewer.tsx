import { useEffect } from "react";
import { ProfileReview } from "../components/profile-reviewer/ProfileReview";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_REVIEWER_WIZARD_STEPS } from "../constants/wizard";
import { useWizardStore } from "../stores/wizard";
import { generateProfileReview } from "../queries";
import { useProfileStore } from "../stores/profile";
import { Loading } from "../components/Loading";
import { ReviewedProfile } from "../models/profile";

export const ProfileReviewer = () => {
  const {
    profileReviewerFiles,
    profileReviewerStep,
    setProfileReviewerStep,
    profileReviewerStepResults,
    setProfileReviewerStepResult,
    profileReviewerWizardComplete,
    setProfileReviewerWizardComplete,
  } = useWizardStore();
  const { reviewedProfile, setReviewedProfile } = useProfileStore();

  // On component load, send request
  useEffect(() => {
    console.log("in the use effect");
    console.log(profileReviewerWizardComplete);
    if (profileReviewerWizardComplete) {
      console.log("we here mang");
      if (profileReviewerFiles && profileReviewerFiles.length > 0) {
        console.log("herrrr");
        generateProfileReview(profileReviewerFiles).then((response) => {
          console.log(response);
          setReviewedProfile(response.data as ReviewedProfile);
        });
      } else {
        // throw error
      }
    }
  }, [profileReviewerWizardComplete]);

  return (
    <>
      <Wizard
        name="profileReviewer"
        steps={PROFILE_REVIEWER_WIZARD_STEPS}
        wizardComplete={profileReviewerWizardComplete}
        setWizardComplete={setProfileReviewerWizardComplete}
        step={profileReviewerStep}
        setStep={setProfileReviewerStep}
        stepResults={profileReviewerStepResults}
        setStepResult={setProfileReviewerStepResult}
        storeStep={false}
      >
        <>{console.log("reviewed profile is")}</>
        <>{console.log(reviewedProfile)}</>
        {reviewedProfile ? <ProfileReview /> : <Loading />}
      </Wizard>
    </>
  );
};
