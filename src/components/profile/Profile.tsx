// profile.tsx
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
import { DropDownOption, supportedApps, writingStyles } from "./data";
import { DropdownSelect } from "./DropdownSelect"
import { UnlockProfileModal } from "../modals/UnlockProfileModal";
import { useAuthStore } from "../../stores/auth";
import { logEvent } from "../../analytics";


export const Profile = () => {
  const { profile, setProfile, setPrompts } = useProfileStore();
  const {
    setProfileWriterWizardComplete,
    setProfileWriterStep,
  } = useWizardStore();
  const { hasPurchasedProfileWriter } = useProfileStore()
  const { isSubscribed } = useAuthStore()

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [textingAssistantModalOpen, setTextingAssistantModalOpen] =
    useState(false);
  const profileHeadingRef = useRef(null);


  const getSelectedApp = () => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    return supportedApps.find(app => app.title === stepResults.profileType) ?? supportedApps[0]
  }

  const getSelectedWritingStyle = () => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    return writingStyles.find(style => style.title === stepResults.writingStyle) ?? writingStyles[0]
  }

  const [selectedApp, setSelectedApp] = useState<DropDownOption>(getSelectedApp);
  const [selectedWritingStyle, setSelectedWritingStyle] = useState<DropDownOption>(getSelectedWritingStyle);

  const [openUnlockProfileModal, setOpenUnlockProfileModal] = useState(false)

  // Updated list of titles for the loading component
  const loadingTitles = [
    "Analyzing your responses…",
    "Choosing the best prompts for you…",
    "Optimizing for response rates…",
    "Personalizing results…",
    "Highlighting the best version of you…",
    "Evaluating successful profiles for proven strategies…",
    "Polishing your profile for maximum appeal…",
    "Innovating with the latest trends in dating…",
    "Preparing your profile for the spotlight…"
  ];


  // Scroll to the "Your profile" heading after the component mounts or updates
  useEffect(() => {
    if (profileHeadingRef.current) {
      profileHeadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [profile]); // Depend on profile state if you only want to scroll when profile updates

  // Get Prompts
  useEffect(() => {
    // Get profileType if its there if not default to bumble
    const profileType = selectedApp.title.toLowerCase()
    getPrompts(profileType).then((response) => {
      setPrompts(response.data);
    });
  }, [selectedApp]);

  // Generate Profile
  useEffect(() => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    generateProfile(stepResults).then((response) => {
      setProfile(response.data);
    });
  }, [selectedApp, selectedWritingStyle]);

  useEffect(() => {
    if (profile.length > 0) logEvent('results', 'profile_writer')
  }, [profile])

  // useEffect(() => {
  //   if ((window as any).gtag) {
  //     (window as any).gtag('event', 'writer_results', {
  //       event_category: 'funnel', product: 'profile_writer',
  //     });
  //   }
  // }, []);

  const saveSelectedApp = (app: string) => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    stepResults.profileType = app
    localStorage.setItem(
      "profileWriter:stepResults",
      JSON.stringify(stepResults)
    );
  }

  const saveWritingStyle = (style: string) => {
    const stepResults = JSON.parse(
      localStorage.getItem("profileWriter:stepResults") || "{}"
    );
    stepResults.writingStyle = style
    localStorage.setItem(
      "profileWriter:stepResults",
      JSON.stringify(stepResults)
    );
  }

  const onSelectApp = (app: DropDownOption) => {
    if (!app.paid || (hasPurchasedProfileWriter || !!isSubscribed)) {
      setProfile([])
      setSelectedApp(app)
      saveSelectedApp(app.value)
    }
  }

  const onSelectWritingStyle = (style: DropDownOption) => {
    if (style.paid && !(hasPurchasedProfileWriter || !!isSubscribed)) {
      setOpenUnlockProfileModal(true)
    } else {
      setProfile([])
      setSelectedWritingStyle(style)
      saveWritingStyle(style.value)
    }
  }

  return (
    <>
      {profile.length > 0 ? (
        <div className="mx-auto max-w-xl">
          <>
            <div className="flex flex-col flex-1 mt-4 pb-4">
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
                      setProfileWriterStep(WizardStepType.WRITING_STYLE);
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
                <div className="mb-5 flex flex-1">
                  <DropdownSelect
                    options={supportedApps}
                    selected={selectedApp}
                    onDropdownSelected={onSelectApp}
                    hasPaid={hasPurchasedProfileWriter || !!isSubscribed}
                  />
                  <DropdownSelect
                    className="ml-3"
                    options={writingStyles}
                    selected={selectedWritingStyle}
                    onDropdownSelected={onSelectWritingStyle}
                    hasPaid={hasPurchasedProfileWriter || !!isSubscribed}
                  />
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
              </div>
              <div className="mt-2 mb-10">
                <AIPhotosModal />
              </div>
            </div>
            <UnlockProfileModal
              open={openUnlockProfileModal}
              setOpen={setOpenUnlockProfileModal}
            />
          </>
        </div>
      ) : (
        <Loading titles={loadingTitles} updateInterval={1500} />
      )}
    </>
  );
};
