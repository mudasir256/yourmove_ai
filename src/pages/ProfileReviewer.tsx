import { useCallback, useEffect, useState } from "react";
import { ProfileReview } from "../components/profile-reviewer/ProfileReviewV2";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_REVIEWER_WIZARD_STEPS } from "../constants/wizard";
import { useWizardStore } from "../stores/wizard";
import { useProfileStore } from "../stores/profile";
import { ProgressBar } from "../components/ProgressBar";
import { Helmet } from 'react-helmet-async';
import { ProfileReviewLanding } from './ProfileReviewLanding'
import { useUIStore } from "../stores/ui";
import { WizardStepType } from "../models/wizard";
import { ReviewedProfile } from "../models/profile";
import { useProfileReviewData } from './useProfileReviewData'
import { logEvent, useLogEvent } from "../analytics";

const loadingTitles = [
  "Analyzing your profile's first impressions...",
  "Diving deep into your photos...",
  "Evaluating photo quality and lighting...",
  "Scouting for social proof in pictures...",
  "Rearranging your photo lineup for maximum impact...",
  "Reviewing your bio",
  "Generating custom style suggestions…",
  "Summarizing our findings…",
  "Crafting your profile upgrade plan…",
  "Preparing to unveil the potential of your profile…"
];

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

  const { setError } = useUIStore();

  const {
    reviewedProfile,
    setReviewedProfile,
    hasPaidForProfileReview,
    setHasPaidForProfileReview,
  } = useProfileStore();

  const { fetchReview } = useProfileReviewData()

  const [showReview, setShowReview] = useState(false)
  const [reviewStarted, setReviewStarted] = useState(false)

  useLogEvent('start', 'profile_review')

  const fetchProfileReview = useCallback(async () => {
    if (profileReviewerFiles && profileReviewerFiles.length > 0) {
      try {
        logEvent('review-start', 'profile_review')

        const data = await fetchReview()
        setReviewedProfile(data as ReviewedProfile);
        setHasPaidForProfileReview(data.hasPaid);
      }
      catch (error) {
        setError(
          "There was an error reviewing your profile, please try again later."
        );
        const params = (error as Error)?.message ? {
          reason: (error as Error)?.message
        } : undefined

        logEvent('review-fail', 'profile_review', params, 'error')
      };
    } else {
      setError(
        "There was an error retrieving your screenshots. Please go back and try again"
      );
      const params = {
        reason: 'no_screenshots'
      }
      logEvent('review-fail', 'profile_review', params, 'error')

      localStorage.setItem(`profileReviewer:step`, WizardStepType.UPLOAD_PHOTO);
      setProfileReviewerStep(WizardStepType.UPLOAD_PHOTO);
      setProfileReviewerWizardComplete(false);
    }
  }, [profileReviewerFiles, fetchReview, profileReviewerStepResults])

  // On component load, send request
  useEffect(() => {
    if (profileReviewerWizardComplete) fetchProfileReview();
  }, [profileReviewerWizardComplete]);

  const resetReview = () => {
    setReviewedProfile(null)
    setShowReview(false)
  }

  return (
    <div className="px-4">
      <Helmet>
        <meta name="description" content="Get an instant feedback for your dating profile. Trained by top matchmakers, powered by AI" />
      </Helmet>
      {reviewStarted ? (
        <Wizard
          name="profileReviewer"
          steps={PROFILE_REVIEWER_WIZARD_STEPS}
          wizardComplete={profileReviewerWizardComplete}
          setWizardComplete={setProfileReviewerWizardComplete}
          step={profileReviewerStep}
          setStep={setProfileReviewerStep}
          stepResults={profileReviewerStepResults}
          setStepResult={setProfileReviewerStepResult}
          onBackPress={() => setReviewStarted(false)}
          storeStep={true}
        >
          {showReview ? (
            <ProfileReview
              hasPaid={hasPaidForProfileReview}
              setHasPaid={setHasPaidForProfileReview}
              onBackPress={resetReview}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-screen px-4">
              <div className="w-full max-w-lg text-center space-y-4 -mt-20 h-32">
                <ProgressBar totalTime={150} complete={reviewedProfile != null} titles={loadingTitles} onCompleted={() => setShowReview(true)} />
              </div>
            </div>
          )}
        </Wizard>
      ) : (
        <ProfileReviewLanding onGetStartedPress={() => setReviewStarted(true)} />
      )}
    </div>
  );
};
