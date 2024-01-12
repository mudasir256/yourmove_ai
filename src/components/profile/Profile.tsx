import { ProfileResponse } from "../../models/profile";
import { FeedbackModal } from "../modals/FeedbackModal";
import { ProfileItem } from "./ProfileItem";
import { useEffect, useState } from "react";
import { generateProfile, getPrompts } from "../../queries";
import { useProfileStore } from "../../stores/profile";
import { Loading } from "../Loading";
import { useWizardStore } from "../../stores/wizard";
import { TextingAssistantModal } from "../modals/TextingAssistantModal";
import { WizardStepType } from "../../models/wizard";

export const Profile = () => {
  const { profile, setProfile, setPrompts } = useProfileStore();
  const {
    setProfileWriterWizardComplete,
    profileWriterStepResults,
    setProfileWriterStep,
  } = useWizardStore();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [textingAssistantModalOpen, setTextingAssistantModalOpen] =
    useState(false);

  // Get Prompts
  useEffect(() => {
    // Get profileType if its there if not default to bumble
    const profileType = profileWriterStepResults.profileType
      ? profileWriterStepResults.profileType.toLowerCase()
      : "bumble";
    getPrompts(profileType).then((response) => {
      setPrompts(response.data);
    });
  }, []);

  // Generate Profile
  useEffect(() => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    generateProfile(stepResults).then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <>
      {profile.length > 0 ? (
        <div className="mt-4 pb-4">
          <FeedbackModal
            open={feedbackModalOpen}
            setOpen={setFeedbackModalOpen}
            autoOpen={true}
          />
          <TextingAssistantModal
            open={textingAssistantModalOpen}
            setOpen={setTextingAssistantModalOpen}
          />
          <div className="mt-4 px-2">
            <div className="mb-5">
              <h1 className="text-4xl font-bold">Your profile</h1>
            </div>
            {profile.map((profileResponse: ProfileResponse, index: number) => {
              return (
                <ProfileItem
                  lockItem={false}
                  key={profileResponse.prompt}
                  profileResponse={profileResponse}
                  index={index}
                />
              );
            })}
            {profile.length == 1 && (
              <ProfileItem
                lockItem={true}
                key="dummy"
                profileResponse={{
                  prompt: "im known for",
                  response:
                    "This is dummy text, it's here to show you what your profile will look like if you purchase the premium version. If you are reading this you probably removed the CSS that hides this text.",
                }}
                index={profile.length + 1}
              />
            )}
          </div>
          <div className="px-2 pt-1">
            <button
              onClick={() => {
                setProfile({});
                setProfileWriterStep(WizardStepType.PROFILE_TYPE);
                setProfileWriterWizardComplete(false);
              }}
              type="button"
              className="mt-4 flex items-center justify-center w-full bg-white text-black py-3 rounded-full font-semibold -mb-1 border border-black hover:text-stone-600 hover:border-stone-500"
            >
              choose another app or style
            </button>
            <button
              type="button"
              onClick={() => setFeedbackModalOpen(true)}
              className="mt-4 flex items-center justify-center w-full bg-white text-black py-3 rounded-full font-semibold -mb-1 border border-black hover:text-stone-600 hover:border-stone-500"
            >
              leave feedback
            </button>
            <button
              type="button"
              onClick={() => setTextingAssistantModalOpen(true)}
              className="mt-4 flex items-center justify-center w-full bg-white text-brand-primary py-3 rounded-full font-semibold -mb-1 border border-brand-primary hover:text-stone-600 hover:border-stone-500"
            >
              Tired of texting? <br />
              Try our AI texting assistant
            </button>
          </div>
        </div>
      ) : (
        <Loading title="writing your profile" />
      )}
    </>
  );
};
