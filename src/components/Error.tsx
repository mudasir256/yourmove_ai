import { useState } from "react";
import { useProfileStore } from "../stores/profile";
import { useWizardStore } from "../stores/wizard";
import { FeedbackModal } from "./modals/FeedbackModal";

interface Props {
  error: string;
}

export const Error = ({error}: Props) => {
  const {setError} = useProfileStore();
  const {setWizardComplete} = useWizardStore();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <FeedbackModal open={feedbackModalOpen} setOpen={setFeedbackModalOpen} />
      <div>
        <div className="mt-6">
          <div className="mt-10">
            <h1 className="text-5xl font-bold">Sorry</h1>
            <div className="mt-8">
              <p className="text-2xl">{error}</p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setWizardComplete(false);
                }}
                className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1 border border-transparent"
              >
                create my profile
              </button>
              <button
                type="button"
                onClick={() => setFeedbackModalOpen(true)}
                className="mt-4 flex items-center justify-center w-full bg-white text-black py-3 rounded-full font-semibold -mb-1 border border-black"
              >
                leave feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
