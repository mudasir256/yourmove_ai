import { MessageAuthorType } from "../constants/chat";

export interface Message {
  content: string;
  author: MessageAuthorType;
  // If it's a screenshot then it'll just be a link to the screenshot so we can show that
  screenshot?: string;
}

export interface ChatResponse {
  promptRisk: number;
  queryDecoded: string;
  queryModified: string;
  responses: Array<string>;
  image?: string;
}
