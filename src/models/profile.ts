export interface ProfileResponse {
  prompt: string;
  response: string;
}

export interface ProfileRequest {
  gender: string;
  lookingFor: string;
  characteristics: string;
  unusualSkill: string;
  bucketList: string;
  talkingAbout: string;
  workAs: string;
  profileType: string;
  writingStyle: string;
  email: string;
}

export interface Prompt {
  app: string;
  number: number;
  text: string;
}

export interface HasUserPaidResponse {
  email: string;
  hasPaid: boolean;
}

export interface FeedbackRequest {
  topic?: string;
  email?: string;
  details?: string;
}
