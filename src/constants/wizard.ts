import {
  WizardStep,
  WizardStepInputType,
  WizardStepType,
} from "../models/wizard";

// Define a list of all of the Wizard Steps to be rendered
export const WIZARD_STEPS: Array<WizardStep> = [
  {
    step: WizardStepType.GENDER,
    type: WizardStepInputType.SELECT,
    label: "You are a ",
    choices: ["Man", "Woman", "Other"],
  },
  {
    step: WizardStepType.LOOKING_FOR,
    type: WizardStepInputType.SELECT,
    label: "What are you looking for? ",
    choices: ["something casual", "long term partner", "not sure yet"],
  },
  {
    step: WizardStepType.CHARACTERISTICS,
    type: WizardStepInputType.TEXT,
    label: "What characteristics are you looking for in your partner?",
    placeholder: "Adventurous, witty, spontaneous",
  },
  {
    step: WizardStepType.UNUSUAL_SKILL,
    type: WizardStepInputType.TEXT,
    label: "What unusual skill do you have?",
    placeholder: "Knowing the best spot for brunch",
  },
  {
    step: WizardStepType.BUCKET_LIST,
    type: WizardStepInputType.TEXT,
    label: "What's one thing on your bucket list?",
    placeholder: "Climnb Mt. Everest",
  },
  {
    step: WizardStepType.TALKING_ABOUT,
    type: WizardStepInputType.TEXT,
    label: "What do you enjoy talking about?",
    placeholder: "90s sitcoms and craft beer",
  },
  {
    step: WizardStepType.WORK_AS,
    type: WizardStepInputType.TEXT,
    label: "What do you do for work?",
    placeholder: "Build awesome React Apps",
  },
];
