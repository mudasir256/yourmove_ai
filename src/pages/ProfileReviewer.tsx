import { useEffect, useState } from "react";
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
  const { setError } = useProfileStore();
  const { reviewedProfile, setReviewedProfile } = useProfileStore();
  const [hasPaid, setHasPaid] = useState(false);

  // On component load, send request
  useEffect(() => {
    if (profileReviewerWizardComplete) {
      if (profileReviewerFiles && profileReviewerFiles.length > 0) {
        generateProfileReview(
          profileReviewerStepResults.email,
          profileReviewerFiles
        )
          .then((response) => {
            setReviewedProfile(response.data as ReviewedProfile);
            setHasPaid(response.data.hasPaid);
          })
          .catch((error) => {
            setError(
              "There was an error reviewing your profile, please try again later."
            );
          });
      } else {
        // throw error
      }
    }
  }, [profileReviewerWizardComplete, profileReviewerFiles]);

  return (
    <div className="px-4">
      <Wizard
        name="profileReviewer"
        steps={PROFILE_REVIEWER_WIZARD_STEPS}
        wizardComplete={profileReviewerWizardComplete}
        setWizardComplete={setProfileReviewerWizardComplete}
        step={profileReviewerStep}
        setStep={setProfileReviewerStep}
        stepResults={profileReviewerStepResults}
        setStepResult={setProfileReviewerStepResult}
        storeStep={true}
      >
        {reviewedProfile ? (
          <ProfileReview hasPaid={hasPaid} setHasPaid={setHasPaid} />
        ) : (
          <Loading title="Reviewing your profile" />
        )}
      </Wizard>
    </div>
  );
};
