import { ProfileResponse } from "../../models/profile";
import { FeedbackModal } from "../modals/FeedbackModal";
import { ProfileItem } from "./ProfileItem";
import { useEffect, useState, useRef } from "react";
import { generateProfile, getPrompts } from "../../queries";
import { useProfileStore } from "../../stores/profile";
import { Loading } from "../Loading";
import { useWizardStore } from "../../stores/wizard";
import { TextingAssistantModal } from "../modals/TextingAssistantModal";
import { WizardStepType } from "../../models/wizard";
import { AIPhotosModal } from "../ai-photos/AIPhotosModal";

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
  const profileHeadingRef = useRef(null);

  // Scroll to the "Your profile" heading after the component mounts or updates
  useEffect(() => {
    if (profileHeadingRef.current) {
      profileHeadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [profile]); // Depend on profile state if you only want to scroll when profile updates


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

  useEffect(() => {if ((window as any).gtag) {
    (window as any).gtag('event', 'writer_results', {event_category: 'funnel',product: 'profile_writer',
    });}}, []);

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
          <div ref={profileHeadingRef} className="mt-4 px-2">
            <div className="mb-2 -ml-2">
              <svg
                onClick={() => {
                  setProfile({});
                  setProfileWriterStep(WizardStepType.PROFILE_TYPE);
                  setProfileWriterWizardComplete(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                className="w-10 h-10 stroke-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
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
          </div>
          <div className="mt-8 mb-10">
            <AIPhotosModal />
          </div>
        </div>
      ) : (
        <Loading title="writing your profile" />
      )}
    </>
  );
};
