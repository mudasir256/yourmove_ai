import { MessageType } from "../../../constants/chat";
import { useChatStore } from "../../../stores/chat";

export const MessageTypeSelector = () => {
  const { selectedMessageType, setSelectedMessageType } = useChatStore();

  return (
    <div className="w-full flex bg-gray-200 shadow-inner rounded-full px-0.5 py-0.5 mt-4">
      {Object.values(MessageType).map((messageType) => {
        return (
          <div
            key={messageType}
            onClick={() => setSelectedMessageType(messageType as MessageType)}
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
  );
};
