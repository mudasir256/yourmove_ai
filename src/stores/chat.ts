import { create } from "zustand";
import {
  Gender,
  MessageStyle,
  MessageSubType,
  MessageType,
  MessageAuthorType,
  ChatRequestType,
  ChatType,
} from "../constants/chat";
import { ChatResponse, Message } from "../models/chat";

const tempMessages = [
  {
    content: "Hey, tell me 2 animals that match your vibe",
    author: MessageAuthorType.User,
  },
  {
    content:
      "I'm part dolphin for my love of deep chats, and part panther for my mysterious, graceful vibe. Your turn!",
    author: MessageAuthorType.Generated,
  },
  {
    content:
      "I'm a mix of a clever fox and a showy peacock. What about you, wild or tame?",
    author: MessageAuthorType.Generated,
  },
  {
    content:
      "I'm a bold lion and a chill koala. Fierce yet cuddly. How about you?",
    author: MessageAuthorType.Generated,
  },
];

interface ChatStore {
  selectedMessageType: MessageType;
  setSelectedMessageType: (messageType: MessageType) => void;
  selectedMessageSubType: MessageSubType;
  setSelectedMessageSubType: (messageSubType: MessageSubType) => void;
  selectedMessageStyle: MessageStyle;
  setSelectedMessageStyle: (messageStyle: MessageStyle) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (settingsModalOpen: boolean) => void;
  selectedGender: Gender;
  setSelectedGender: (gender: Gender) => void;
  curiosityModeEnabled: boolean;
  setCuriosityModeEnabled: (curiosityModeEnabled: boolean) => void;
  messages: Array<Message>;
  setMessages: (messages: Array<Message>) => void;
  sendingMessage: boolean;
  setSendingMessage: (sendingMessage: boolean) => void;

  // Represents the message the user sent
  message: string;
  setMessage: (message: string) => void;
  screenshotUploading: File | null;
  setScreenshotUploading: (screenshotUploading: File | null) => void;
  chatResponse: ChatResponse | null;
  setChatResponse: (chatResponse: ChatResponse | null) => void;

  // So we know what type of Chat request was sent
  chatRequestType: ChatRequestType | null;
  setChatRequestType: (chatRequestType: ChatRequestType | null) => void;

  // For sending chat type
  chatType: ChatType | null;
  setChatType: (chatType: ChatType | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedMessageType: MessageType.Reply,
  setSelectedMessageType: (messageType: MessageType) =>
    set({ selectedMessageType: messageType }),
  selectedMessageSubType: MessageSubType.Starter,
  setSelectedMessageSubType: (messageSubType: MessageSubType) =>
    set({ selectedMessageSubType: messageSubType }),
  selectedMessageStyle: MessageStyle.Flirty,
  setSelectedMessageStyle: (messageStyle: MessageStyle) =>
    set({ selectedMessageStyle: messageStyle }),
  settingsModalOpen: false,
  setSettingsModalOpen: (settingsModalOpen: boolean) =>
    set({ settingsModalOpen }),
  selectedGender: Gender.Male,
  setSelectedGender: (gender: Gender) => set({ selectedGender: gender }),
  curiosityModeEnabled: false,
  setCuriosityModeEnabled: (curiosityModeEnabled: boolean) =>
    set({ curiosityModeEnabled }),
  messages: tempMessages,
  setMessages: (messages: Array<Message>) => set({ messages }),
  sendingMessage: false,
  setSendingMessage: (sendingMessage: boolean) => set({ sendingMessage }),
  message: "",
  setMessage: (message: string) => set({ message }),
  screenshotUploading: null,
  setScreenshotUploading: (screenshotUploading: File | null) =>
    set({ screenshotUploading }),
  chatResponse: null,
  setChatResponse: (chatResponse: ChatResponse | null) => set({ chatResponse }),
  chatRequestType: null,
  setChatRequestType: (chatRequestType: ChatRequestType | null) =>
    set({ chatRequestType }),
  chatType: ChatType.Opener,
  setChatType: (chatType: ChatType | null) => set({ chatType }),
}));
