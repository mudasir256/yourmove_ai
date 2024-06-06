import { useState, useEffect } from "react";
import { useProfileStore } from "../../stores/profile";
import { UnlockProfileReviewModal } from "../modals/UnlockProfileReviewModal";
import { useWizardStore } from "../../stores/wizard";
import { WizardStepType } from "../../models/wizard";
import { AIPhotosModal } from "../ai-photos/AIPhotosModal";
import { useUIStore } from "../../stores/ui";
import { Back } from "../Back";
import { FullProfileReview } from './FullProfileReview'
import { PartialProfileReview } from './PartialProfileReview'

interface Props {
  hasPaid: boolean;
  setHasPaid: (hasPaid: boolean) => void;
}

export const ProfileReview = ({ hasPaid, setHasPaid }: Props) => {
  const { reviewedProfile, setReviewedProfile } = useProfileStore();
  const [unlockFullReviewModalOpen, setUnlockFullReviewModalOpen] =
    useState(false);
  const { setProfileReviewerWizardComplete, setProfileReviewerStep } =
    useWizardStore();
  const { abTestGroup } = useUIStore()

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'review_results', {
        event_category: 'funnel', product: 'profile_review',
      });
    }
  }, []);

  return (
    <>
      {/* <div className="pb-40 mt-[56px]"> */}
      <div className="mt-8">
        <Back onClick={() => {
          setProfileReviewerWizardComplete(false);
          setProfileReviewerStep(WizardStepType.UPLOAD_PHOTO);
        }} />
        <h1 className="text-4xl font-bold mt-4 mb-6">Your Profile Review</h1>
        <div
          className="border-2 border-black rounded-2xl shadow-lg"
        >
          <div className="flex flex-1 rounded-t-2xl bg-brand-alt bg-opacity-10">
            <div
              className="py-3 px-2 items-center flex-1"
            >
              <p className="font-semibold ml-2 text-sm">Current Rating</p>
              <p className="font-bold ml-2 text-2xl">{`${reviewedProfile?.currentRating ?? 0}/10`}</p>
            </div>
            <div
              className="py-3 px-2 mr-2 items-center"
            >
              <p className="font-semibold ml-2 text-sm">Rating after improvement</p>
              <p className="font-bold ml-2 text-2xl text-brand-primary">{`${reviewedProfile?.possibleRating ?? 0}/10`}</p>
            </div>
          </div>
          <div className="px-4 my-4">
            {hasPaid ?
              <FullProfileReview review={reviewedProfile?.reviewSummary ?? ""} /> :
              <PartialProfileReview summary={reviewedProfile?.summary ?? ""} onUnlockFullReviewClick={() => setUnlockFullReviewModalOpen(true)} />}
          </div>
        </div>
        <div className="mt-8 mb-10">
          <AIPhotosModal />
        </div>
      </div>
      <UnlockProfileReviewModal
        open={unlockFullReviewModalOpen}
        setOpen={setUnlockFullReviewModalOpen}
      />
    </>
  );
};
