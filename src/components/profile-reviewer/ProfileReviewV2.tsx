import { useState } from "react";
import { useProfileStore } from "../../stores/profile";
import { UnlockProfileReviewModal } from "../modals/UnlockProfileReviewModal";
import { useWizardStore } from "../../stores/wizard";
import { WizardStepType } from "../../models/wizard";
import { AIPhotosModal } from "../ai-photos/AIPhotosModal";
import { Back } from "../Back";
import { FullProfileReview } from './FullProfileReview'
import { PartialProfileReview } from './PartialProfileReview'
import { FamewallReviews } from "../../pages/FamewallReviews";
import { logEvent, useLogEvent } from "../../analytics";

interface Props {
  hasPaid: boolean;
  setHasPaid: (hasPaid: boolean) => void;
  onBackPress?: VoidFunction
}

export const ProfileReview = ({ hasPaid, onBackPress = undefined }: Props) => {
  const { reviewedProfile } = useProfileStore();
  const [unlockFullReviewModalOpen, setUnlockFullReviewModalOpen] =
    useState(false);
  const { setProfileReviewerWizardComplete, setProfileReviewerStep } =
    useWizardStore();

  useLogEvent('results', 'profile_review')

  const onUnlockFullReviewClick = () => {
    logEvent('purchase_unlock', 'profile_review')
    setUnlockFullReviewModalOpen(true)
  }

  const goBack = () => {
    onBackPress?.()
    setProfileReviewerWizardComplete(false);
    setProfileReviewerStep(WizardStepType.UPLOAD_PHOTO);
  }

  return (
    <>
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col flex-1">
          <div className="mt-8">
            <Back onClick={goBack} />
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
              <div className="px-4 py-4 bg-white rounded-b-2xl">
                {hasPaid ?
                  <FullProfileReview review={reviewedProfile} /> :
                  <PartialProfileReview summary={reviewedProfile?.summary ?? ""} onUnlockFullReviewClick={onUnlockFullReviewClick} />
                }
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
        </div>
      </div>
      <FamewallReviews
        containerStyle='-mx-4'
        title='150,000+ profiles reviewed'
      />
    </>
  );
};
