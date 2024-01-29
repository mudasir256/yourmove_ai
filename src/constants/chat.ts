export enum MessageType {
  Open = "Open",
  Reply = "Reply",
  Close = "Close",
}

export enum MessageSubType {
  Starter = "Starter",
  ReEngage = "Re-Engage",
  AskOut = "AskOut",
  Reject = "Reject",
}

export enum ChatType {
  Reply = "reply",
  Opener = "opener",
  ReEngage = "reengage",
  Closer = "closer",
  Reject = "reject",
}

export const subTypeToChatType = {
  [MessageSubType.Starter]: ChatType.Opener,
  [MessageSubType.ReEngage]: ChatType.ReEngage,
  [MessageSubType.AskOut]: ChatType.Closer,
  [MessageSubType.Reject]: ChatType.Reject,
};

export const MessageTypeSubTypeMappings = {
  Open: [MessageSubType.Starter, MessageSubType.ReEngage],
  Reply: [],
  Close: [MessageSubType.AskOut, MessageSubType.Reject],
};

export enum MessageStyle {
  Flirty = "😉 Flirty",
  Feisty = "😝 Feisty",
  Friendly = "😊 Friendly",
  Funny = "🤭 Funny",
  Formal = "👔 Formal",
}

export enum Gender {
  Male = "🧔 Male",
  Female = "👩 Female",
  Other = "Other",
}

export const MessageInputConfigurations = {
  Open: {
    Starter: {
      headline: "Start better conversations",
      placeholder: "Enter topic or upload a profile from gallery",
      screenshot: "Upload profile screenshot",
    },
    "Re-Engage": {
      headline: "Re-ignite a ghosted conversation",
      placeholder: null,
      screenshot: null,
    },
  },
  Reply: {
    headline: "Enter a message you received:",
    placeholder: "Type message or upload chat from gallery",
    screenshot: "Upload chat screenshot",
  },
  Close: {
    AskOut: {
      headline: "Enter a message you received:",
      placeholder: "Type message or upload chat from gallery",
      screenshot: "Upload chat screenshot",
    },
    Reject: {
      headline: "End conversations without ghosting",
      placeholder: null,
      screenshot: null,
    },
  },
};

export enum MessageAuthorType {
  // Generated by the Appl
  Generated = "Generated",
  // Message was written by the user
  User = "User",
}

// whether it was an image or text
export enum ChatRequestType {
  Text = "Text",
  Image = "Image",
}
