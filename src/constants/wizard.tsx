import {
  WizardStep,
  WizardStepInputType,
  WizardStepType,
} from "../models/wizard";
import * as yup from "yup";
import { useWizardStore } from "../stores/wizard";
import { ProfileWriterPaywall } from "../components/payment/paywalls/ProfileWriterPaywall";
import { ProfileReviewPaywall } from "../components/payment/paywalls/ProfileReviewPaywall";

// Define a list of all of the Wizard Steps to be rendered dynamic
export const PROFILE_WRITER_WIZARD_STEPS: Array<WizardStep> = [
  {
    step: WizardStepType.WELCOME,
    type: WizardStepInputType.CONTENT,
    content: (
      <>
        <h1 className="text-5xl font-bold">Welcome to Profile Writer</h1>
        <div className="mt-8">
          <p className="text-2xl">
            Answer a few questions. Get a free, ai-generated dating app profile.
          </p>
        </div>
        <div className="mt-6">
          <p className="text-2xl">
            Tested and optimized for maximum success ✨
          </p>
        </div>
      </>
    ),
  },
  {
    step: WizardStepType.GENDER,
    type: WizardStepInputType.RADIO,
    label: "You are a ",
    choices: ["Man", "Woman", "Other"],
    validator: yup.string(),
  },
  {
    step: WizardStepType.LOOKING_FOR,
    type: WizardStepInputType.RADIO,
    label: "What are you looking for? ",
    choices: ["something casual", "long term partner", "not sure yet"],
    validator: yup.string(),
  },
  {
    step: WizardStepType.CHARACTERISTICS,
    type: WizardStepInputType.TEXT,
    label: "What characteristics are you looking for in your partner?",
    placeholder: "Adventurous, witty, spontaneous",
    validator: yup.string(),
  },
  {
    step: WizardStepType.UNUSUAL_SKILL,
    type: WizardStepInputType.TEXT,
    label: "What unusual skill do you have?",
    placeholder: "Knowing the best spot for brunch",
    validator: yup.string(),
  },
  {
    step: WizardStepType.BUCKET_LIST,
    type: WizardStepInputType.TEXT,
    label: "What's one thing on your bucket list?",
    placeholder: "Climb Mt. Everest",
    validator: yup.string(),
  },
  {
    step: WizardStepType.TALKING_ABOUT,
    type: WizardStepInputType.TEXT,
    label: "What do you enjoy talking about?",
    placeholder: "90s sitcoms and craft beer",
    validator: yup.string(),
  },
  {
    step: WizardStepType.WORK_AS,
    type: WizardStepInputType.TEXT,
    label: "What do you do for work?",
    placeholder: "Build awesome React Apps",
    validator: yup.string(),
  },
  {
    step: WizardStepType.PROFILE_TYPE,
    type: WizardStepInputType.SELECT,
    label: "Which app profile should we create for you?",
    choices: ["Bumble", "Hinge", "Tinder", "Coffee Meets Bagel"],
    validator: yup.string(),
  },
  {
    step: WizardStepType.WRITING_STYLE,
    type: WizardStepInputType.SELECT,
    label: "Pick your writing style",
    choices: ["Flirty", "Thoughtful"],
    validator: yup.string(),
  },
  {
    step: WizardStepType.EMAIL,
    type: WizardStepInputType.EMAIL,
    label: "What's your email?",
    placeholder: "your.email@gmail.com",
    validator: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  },
  {
    step: WizardStepType.PAYWALL,
    type: WizardStepInputType.CONTENT,
    content: <ProfileWriterPaywall />,
  },
];

export const PROFILE_REVIEWER_WIZARD_STEPS: Array<WizardStep> = [
  {
    step: WizardStepType.WELCOME,
    type: WizardStepInputType.CONTENT,
    content: (
      <>
        <h1 className="text-5xl font-bold">AI Profile Reviews</h1>
        <div className="mt-8">
          <p className="text-2xl">
            Upload your profile. Get an instant review of your photos and bio,
            along with suggestions on how to improve.
          </p>
        </div>
      </>
    ),
  },
  {
    step: WizardStepType.UPLOAD_PHOTO,
    type: WizardStepInputType.FILE,
    label: "Upload your profile ",
    validator: yup.string(),
    onFilesUploaded: (files: FileList | null) => {
      useWizardStore.getState().setProfileReviewerFiles(files);
    },
  },
  {
    step: WizardStepType.EMAIL,
    type: WizardStepInputType.EMAIL,
    label: "What's your email?",
    placeholder: "your.email@gmail.com",
    validator: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  },
  {
    step: WizardStepType.PAYWALL,
    type: WizardStepInputType.CONTENT,
    content: <ProfileReviewPaywall />,
  },
];
