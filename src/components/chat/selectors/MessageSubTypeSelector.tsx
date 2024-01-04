import { useEffect, useState } from "react";
import {
  MessageSubType,
  MessageTypeSubTypeMappings,
} from "../../../constants/chat";
import { useChatStore } from "../../../stores/chat";
import { toHeaderCase } from "js-convert-case";

export const MessageSubTypeSelector = () => {
  const {
    selectedMessageType,
    selectedMessageSubType,
    setSelectedMessageSubType,
  } = useChatStore();

  useEffect(() => {
    setSelectedMessageSubType(
      MessageTypeSubTypeMappings[selectedMessageType][0]
    );
  }, [selectedMessageType]);

  return (
    <div className="flex mt-4">
      {MessageTypeSubTypeMappings[selectedMessageType].map((messageSubType) => (
        <div
          onClick={() =>
            setSelectedMessageSubType(messageSubType as MessageSubType)
          }
          className={`mr-2 py-1 px-2 rounded-full cursor-pointer ${
            messageSubType == selectedMessageSubType
              ? "bg-white shadow-md font-semibold text-black"
              : "text-gray-500"
          }`}
        >
          {toHeaderCase(messageSubType)}
        </div>
      ))}
    </div>
  );
};
