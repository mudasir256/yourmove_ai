import { MessageAuthorType } from "../constants/chat";

export interface Message {
  content: string;
  author: MessageAuthorType;
}
