import { create } from "zustand";
import {
  Gender,
  MessageStyle,
  MessageSubType,
  MessageType,
  MessageAuthorType,
} from "../constants/chat";
import { Message } from "../models/chat";

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
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedMessageType: MessageType.Open,
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
}));
