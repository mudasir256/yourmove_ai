import { ProfileResponse } from "../../models/profile";
import { FeedbackModal } from "../FeedbackModal";
import { ProfileItem } from "./ProfileItem";
import { useEffect } from "react";
import { generateProfile, getPrompts } from "../../queries";
import { useProfileStore } from "../../stores/profile";
import { Loading } from "../Loading";
import { ProfileStep } from "../../constants/profile";
import { useWizardStore } from "../../stores/wizard";

export const Profile = () => {
  const { profile, setProfile, setStep, setPrompts } = useProfileStore();
  const { stepResults } = useWizardStore();

  // Get Prompts
  useEffect(() => {
    getPrompts(stepResults.profileType.toLowerCase()).then((response) => {
      setPrompts(response.data);
    });
  }, []);

  // Generate Profile
  useEffect(() => {
    const stepResults = JSON.parse(localStorage.getItem("stepResults") || "{}");
    generateProfile(stepResults).then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <>
      {profile.length > 0 ? (
        <div className="mt-4">
          <FeedbackModal />
          {/* <svg
            onClick={() => {
              setProfile([]);
              setStep(ProfileStep.PAYMENT_PLANS);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            className="w-12 h-12 stroke-zinc-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg> */}
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
        </div>
      ) : (
        <Loading title="writing your profile" />
      )}
    </>
  );
};
