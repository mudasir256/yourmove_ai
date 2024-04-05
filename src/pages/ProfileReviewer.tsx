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
  const {
    reviewedProfile,
    setReviewedProfile,
    hasPaidForProfileReview,
    setHasPaidForProfileReview,
  } = useProfileStore();

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
            setHasPaidForProfileReview(response.data.hasPaid);
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

  useEffect(() => {if ((window as any).gtag) {
    (window as any).gtag('event', 'review_start', {event_category: 'funnel',product: 'profile_review',
    });}}, []);

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
          <ProfileReview
            hasPaid={hasPaidForProfileReview}
            setHasPaid={setHasPaidForProfileReview}
          />
        ) : (
          <Loading title="Reviewing your profile. Hold tight - reviews can take up to 2 minutes" />
        )}
      </Wizard>
    </div>
  );
};
