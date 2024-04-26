import { useEffect, useState } from "react";
import { ProfileReview } from "../components/profile-reviewer/ProfileReview";
import { Wizard } from "../components/wizard/Wizard";
import { PROFILE_REVIEWER_WIZARD_STEPS } from "../constants/wizard";
import { useWizardStore } from "../stores/wizard";
import { generateProfileReview } from "../queries";
import { useProfileStore } from "../stores/profile";
import { Loading } from "../components/Loading";
import { ReviewedProfile } from "../models/profile";
<<<<<<< HEAD
import { auth } from "../firebase";
=======
import { Helmet } from 'react-helmet-async';

>>>>>>> 0583ee04ecdae2d9120733b986f158e622f80995

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

  // On component load, send request
  useEffect(() => {
    if (profileReviewerWizardComplete) {
      if (profileReviewerFiles && profileReviewerFiles.length > 0) {
        generateProfileReview(
          auth.currentUser && auth.currentUser.email ? auth.currentUser.email : profileReviewerStepResults.email,
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
      <Helmet>
        <meta name="description" content="Get an instant feedback for your dating profile. Trained by top matchmakers, powered by AI" />
      </Helmet>
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
        ) : (<>
            <Loading titles={loadingTitles} updateInterval={3750}/>
          </>          
          )}
      </Wizard>
    </div>
  );
};
