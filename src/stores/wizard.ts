import { create } from "zustand";
import { WizardStepType } from "../models/wizard";

// Checks local storage for initial step based on wizard name
const checkLocalStorageForInitialStep = (name: string) => {
  const step = localStorage.getItem(`${name}:step`);
  return step ? step : name === 'profileWriter' ? WizardStepType.WELCOME : name === 'photoReview' ? WizardStepType.EMAIL : WizardStepType.GENDER;
};

const getBooleanFromLocalStorage = (key: string): boolean => {
  const value = localStorage.getItem(key);
  return value === 'true';
};

// Checks local storage for initial step results based on wizard name
const checkLocalStorageForInitialStepResults = (name: string) => {
  const stepResults = localStorage.getItem(`${name}:stepResults`);
  return stepResults ? JSON.parse(stepResults) : {};
};

interface WizardStore {
  // For profile writer
  profileWriterStep: WizardStepType;
  setProfileWriterStep: (step: WizardStepType) => void;
  profileWriterStepResults: Record<string, string>;
  setProfileWriterStepResult: (stepType: string, result: string) => void;
  profileWriterWizardComplete: boolean;
  setProfileWriterWizardComplete: (wizardComplete: boolean) => void;

  // For profile reviewer
  profileReviewerStep: WizardStepType;
  setProfileReviewerStep: (step: WizardStepType) => void;
  profileReviewerStepResults: Record<string, string>;
  setProfileReviewerStepResult: (stepType: string, result: string) => void;
  profileReviewerWizardComplete: boolean;
  setProfileReviewerWizardComplete: (wizardComplete: boolean) => void;
  filesUploading: boolean;
  setFilesUploading: (filesUploading: boolean) => void;
  profileReviewerFiles: Array<string>;
  setProfileReviewerFiles: (files: Array<string>) => void;
  // Generic email field
  email: string;
  setEmail: (email: string) => void;

  // For ai photo review
  photoReviewStep: WizardStepType;
  setPhotoReviewStep: (step: WizardStepType) => void;
  photoReviewStepResults: Record<string, string>;
  setPhotoReviewStepResults: (stepType: string, result: string) => void;
  photoReviewWizardComplete: boolean;
  setPhotoReviewWizardComplete: (wizardComplete: boolean) => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  // For profile writer
  profileWriterStep: checkLocalStorageForInitialStep(
    "profileWriter"
  ) as WizardStepType,
  setProfileWriterStep: (step: WizardStepType) =>
    set({ profileWriterStep: step }),
  profileWriterStepResults:
    checkLocalStorageForInitialStepResults("profileWriter"),
  setProfileWriterStepResult: (stepType, result) => {
    set((state) => ({
      profileWriterStepResults: {
        ...state.profileWriterStepResults,
        [stepType]: result,
      },
    }));
  },
  profileWriterWizardComplete: false,
  setProfileWriterWizardComplete: (wizardComplete: boolean) =>
    set({ profileWriterWizardComplete: wizardComplete }),

  // Profile Reviewer
  profileReviewerStep: checkLocalStorageForInitialStep(
    "profileReviewer"
  ) as WizardStepType,
  setProfileReviewerStep: (step: WizardStepType) =>
    set({ profileReviewerStep: step }),
  profileReviewerStepResults:
    checkLocalStorageForInitialStepResults("profileReviewer"),
  setProfileReviewerStepResult: (stepType, result) => {
    set((state) => ({
      profileReviewerStepResults: {
        ...state.profileReviewerStepResults,
        [stepType]: result,
      },
    }));
  },
  profileReviewerWizardComplete: false,
  setProfileReviewerWizardComplete: (wizardComplete: boolean) =>
    set({ profileReviewerWizardComplete: wizardComplete }),
  profileReviewerFiles: checkLocalStorageForInitialStepResults(
    "profileReviewer"
  )
    ? JSON.parse(
      checkLocalStorageForInitialStepResults("profileReviewer").uploadPhoto
        ? checkLocalStorageForInitialStepResults("profileReviewer")
          .uploadPhoto
        : "[]"
    )
    : [],
  setProfileReviewerFiles: (files: Array<string>) =>
    set({ profileReviewerFiles: files }),
  email: "",
  setEmail: (email: string) => set({ email }),
  filesUploading: false,
  setFilesUploading: (filesUploading: boolean) =>
    set({ filesUploading: filesUploading }),

  // AI Photo review
  photoReviewStep: checkLocalStorageForInitialStep(
    "photoReview"
  ) as WizardStepType,
  setPhotoReviewStep: (step: WizardStepType) =>
    set({ photoReviewStep: step }),
  photoReviewStepResults:
    checkLocalStorageForInitialStepResults("photoReview"),
  setPhotoReviewStepResults: (stepType, result) => {
    set((state) => ({
      photoReviewStepResults: {
        ...state.photoReviewStepResults,
        [stepType]: result,
      },
    }));
  },
  photoReviewWizardComplete: false,
  setPhotoReviewWizardComplete: (wizardComplete: boolean) =>
    set({ photoReviewWizardComplete: wizardComplete }),
}));
