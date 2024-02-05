import { ProductType } from "../constants/payments";

export interface ProfileResponse {
  prompt: string;
  response: string;
}

export interface ProfileRequest {
  gender: string;
  lookingFor: string;
  characteristics: string;
  activities: string;
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
  // question: string;
}

export interface HasUserPaidResponse {
  email: string;
  hasPaid: boolean;
  products: Array<ProductType>;
  purchasedProducts: Array<ProductType>;
}

export interface FeedbackRequest {
  topic?: string;
  email?: string;
  details?: string;
}

export interface ReviewedProfile {
  review: string;
  screenshots: Array<string>;
  hasPaid: boolean;
}
