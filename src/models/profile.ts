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
