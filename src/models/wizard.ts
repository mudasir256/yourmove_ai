import { ReactNode } from "react";
import * as yup from "yup";

// Define the different step types (might not need this. we will)
export enum WizardStepType {
  WELCOME = "welcome",
  GENDER = "gender",
  LOOKING_FOR = "lookingFor",
  CHARACTERISTICS = "characteristics",
  ACTIVITIES = "activities",
  UNUSUAL_SKILL = "unusualSkill",
  BUCKET_LIST = "bucketList",
  TALKING_ABOUT = "talkingAbout",
  WORK_AS = "workAs",
  PROFILE_TYPE = "profileType",
  WRITING_STYLE = "writingStyle",
  EMAIL = "email",
  UPLOAD_PHOTO = "uploadPhoto",
  PAYWALL = "paywall",
}

// Wizard steps can either be text fields or selects
export enum WizardStepInputType {
  // For steps that just show content
  CONTENT,
  // For simple Input fields
  TEXT,
  // For wrapped selectable options
  RADIO,
  // Email input
  EMAIL,
  // For a full width select option
  SELECT,
  // For file uploads
  FILE,
}

// The actual step type to define what is in it
export interface WizardStep {
  step: WizardStepType;
  type: WizardStepInputType;
  content?: ReactNode;
  label?: string;
  placeholder?: string;
  choices?: string[];
  validator?: yup.AnySchema;
  // For when files are uploaded, we upload to server, then store the URLs to those files
  onFilesUploaded?: (files: Array<string>) => void;
}
