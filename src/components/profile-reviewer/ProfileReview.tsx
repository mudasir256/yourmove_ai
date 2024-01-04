import { useState } from "react";
import { useProfileStore } from "../../stores/profile";
import Markdown from "react-markdown";
import { UnlockFullReviewModal } from "../modals/UnlockFullReviewModal";

const PLAN_FEATURES = [
  "Detailed review of your profile",
  "Action plan to improve your profile",
  "Unlimited access. Buy once, use forever.",
  "30 day money back guarantee",
];

interface Props {
  hasPaid: boolean;
  setHasPaid: (hasPaid: boolean) => void;
}

export const ProfileReview = ({ hasPaid, setHasPaid }: Props) => {
  const { reviewedProfile, setReviewedProfile } = useProfileStore();
  const [unlockFullReviewModalOpen, setUnlockFullReviewModalOpen] =
    useState(false);

  return (
    <div className="pb-40 mt-4">
      <UnlockFullReviewModal
        setHasPaid={setHasPaid}
        open={unlockFullReviewModalOpen}
        setOpen={setUnlockFullReviewModalOpen}
      />
      <div className="mb-5">
        <h1 className="text-4xl font-bold">Your Review</h1>
      </div>
      <div
        className="bg-white border-2 border-black rounded-md shadow-lg relative"
        style={{ height: "48rem" }}
      >
        {!hasPaid && (
          <div className="absolute w-full h-full bg-gradient-to-t from-black via-black">
            <div className="w-full h-full relative">
              {/* Unlock */}
              <div className="absolute w-full p-3 bottom-0">
                <div className="bg-white h-full border-2 border-black rounded-lg p-5">
                  <h1 className="text-2xl font-bold">
                    Unlock your full review
                  </h1>
                  <div className="flex mt-2 mb-3 items-center border-b-2 border-black pb-3">
                    <div>
                      <h1 className="text-4xl font-semibold">$12</h1>
                    </div>
                    <div className="pl-3">
                      <h1 className="text-zinc-500 leading-4">
                        one-time <br /> payment
                      </h1>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">What's included:</h4>
                    <div className="mt-1">
                      {PLAN_FEATURES.map((feature: string) => {
                        return (
                          <div
                            className="flex text-sm md:text-md"
                            key={feature}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            <div className="ml-1.5">{feature}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUnlockFullReviewModalOpen(true)}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="p-4 overflow-y-scroll" style={{ maxHeight: "47rem" }}>
          <Markdown>{reviewedProfile?.review}</Markdown>
        </div>
      </div>
    </div>
  );
};