// Define the different step types (might not need this. we will)
export enum WizardStepType {
  WELCOME = "welcome",
  GENDER = "gender",
  LOOKING_FOR = "lookingFor",
  CHARACTERISTICS = "characteristics",
  UNUSUAL_SKILL = "unusualSkill",
  BUCKET_LIST = "bucketList",
  TALKING_ABOUT = "talkingAbout",
  WORK_AS = "workAs",
  EMAIL = "email",
}

// Wizard steps can either be text fields or selects
export enum WizardStepInputType {
  TEXT = 0,
  SELECT = 1,
}

// The actual step type to define what is in it
export interface WizardStep {
  step: WizardStepType;
  type: WizardStepInputType;
  label: string;
  placeholder?: string;
  choices?: string[];
}
