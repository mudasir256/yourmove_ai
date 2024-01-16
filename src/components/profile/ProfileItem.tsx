import toast from "react-hot-toast";
import { ProfileRequest, ProfileResponse } from "../../models/profile";
import { PromptsListBox } from "../PromptListBox";
import { useProfileStore } from "../../stores/profile";
import { useState } from "react";
import { createCopy, generateSingleProfileResponse } from "../../queries";
import { UnlockProfileModal } from "../modals/UnlockProfileModal";
import { useWizardStore } from "../../stores/wizard";

interface Props {
  lockItem: boolean;
  profileResponse: ProfileResponse;
  index: number;
}

export const ProfileItem = ({ lockItem, profileResponse, index }: Props) => {
  // All prompts
  const { prompts, profile, setProfile } = useProfileStore();
  const { profileWriterStepResults } = useWizardStore();
  const [isProfileItemLoading, setIsProfileItemLoading] = useState(false);
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);

  const onPromptChange = (promptText: string) => {
    setIsProfileItemLoading(true);
    generateSingleProfileResponse(
      profileWriterStepResults as ProfileRequest,
      promptText
    ).then((response) => {
      // we have the new prompt, so we need to swap out the old one and put in the new one
      const copyProfile = [...profile];
      copyProfile[index] = response.data;
      setProfile(copyProfile);
      setIsProfileItemLoading(false);
    });
  };

  return (
    <div className="bg-white mb-4 shadow-md rounded-md p-4 relative">
      <UnlockProfileModal
        open={unlockModalIsOpen}
        setOpen={setUnlockModalIsOpen}
      />
      {isProfileItemLoading ? (
        <div className="flex items-center justify-center h-40">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {lockItem && (
            <div className="-m-4 absolute h-full w-full z-40 flex flex items-center justify-center backdrop-blur-md rounded-md">
              <button
                type="button"
                onClick={() => setUnlockModalIsOpen(true)}
                className="cursor-pointer border border-black bg-white mx-10 py-2 text-lg font-semibold w-full flex items-center justify-center shadow-lg rounded-md"
              >
                Unlock Full Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="mb-4">
            {<>{console.log(prompts)}</>}
            {/* If the profile.length > 1 then we are a premium user, so only show the first 3 prompts, else all of them */}
            {prompts && (
              <PromptsListBox
                prompts={profile.length === 1 ? prompts.slice(0, 3) : prompts}
                promptSelected={profileResponse.prompt}
                onChange={onPromptChange}
              />
            )}
          </div>
          <p className="text-xl font-medium">{profileResponse.response}</p>
          <div className="flex flex-row-reverse mt-4">
            <button
              type="button"
              className="bg-brand-primary p-2 rounded-full"
              onClick={() => {
                navigator.clipboard.writeText(profileResponse.response);
                createCopy(
                  profileWriterStepResults.email,
                  profileResponse.prompt,
                  profileResponse.response
                );
                toast.success("Answer copied to clipboard");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </button>
            <button
              type="button"
              className="bg-zinc-200 p-2 rounded-full mr-3"
              onClick={() => onPromptChange(profileResponse.prompt)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
