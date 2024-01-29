import { toHeaderCase } from "js-convert-case";
import {
  ChatType,
  MessageSubType,
  MessageType,
  MessageTypeSubTypeMappings,
  subTypeToChatType,
} from "../../../constants/chat";
import { useChatStore } from "../../../stores/chat";

export const MessageTypeSelector = () => {
  const {
    setChatType,
    selectedMessageType,
    setSelectedMessageType,
    selectedMessageSubType,
    setSelectedMessageSubType,
  } = useChatStore();

  return (
    <div>
      <div className="w-full flex bg-gray-200 shadow-inner rounded-full px-0.5 py-0.5 mt-4">
        {Object.values(MessageType).map((messageType) => {
          return (
            <div
              key={messageType}
              onClick={() => {
                setSelectedMessageType(messageType as MessageType);
                if (messageType === MessageType.Reply) {
                  setChatType(ChatType.Reply);
                }
                if (messageType === MessageType.Close) {
                  setSelectedMessageSubType(MessageSubType.AskOut);
                  setChatType(ChatType.Closer);
                }
                if (messageType === MessageType.Open) {
                  setSelectedMessageSubType(MessageSubType.Starter);
                  setChatType(ChatType.Opener);
                }
              }}
              className={`flex-1 rounded-full cursor-pointer text-center py-1 font-semibold ${
                messageType == selectedMessageType
                  ? "bg-white shadow-sm"
                  : "text-gray-400"
              }`}
            >
              {messageType}
            </div>
          );
        })}
      </div>
      <div className="flex mt-4">
        {MessageTypeSubTypeMappings[selectedMessageType].map(
          (messageSubType) => (
            <div
              key={messageSubType}
              onClick={() => {
                setSelectedMessageSubType(messageSubType as MessageSubType);
                setChatType(subTypeToChatType[messageSubType]);
              }}
              className={`mr-2 py-1 px-2 rounded-full cursor-pointer ${
                messageSubType == selectedMessageSubType
                  ? "bg-white shadow-md font-semibold text-black"
                  : "text-gray-500"
              }`}
            >
              {toHeaderCase(messageSubType)}
            </div>
          )
        )}
      </div>
    </div>
  );
};
