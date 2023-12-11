import { MessageStyleSelector } from "../components/chat/selectors/MessageStyleSelector";
import { MessageSubTypeSelector } from "../components/chat/selectors/MessageSubTypeSelector";
import { MessageTypeSelector } from "../components/chat/selectors/MessageTypeSelector";
import { SettingsModal } from "../components/chat/modals/SettingsModal";
import { useChatStore } from "../stores/chat";
import { MessageInput } from "../components/chat/MessageInput";
import { Message } from "../models/chat";
import { Message as MessageComponent } from "../components/chat/Message";
import { PremiumUpsellPrompt } from "../components/chat/PremiumUpsellPrompt";

export const ChatAssistant = () => {
  const { settingsModalOpen, setSettingsModalOpen, messages } = useChatStore();

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="max-w-xl">
        <SettingsModal
          open={settingsModalOpen}
          setOpen={setSettingsModalOpen}
        />
        <MessageTypeSelector />
        <MessageSubTypeSelector />
        <div className="mt-4">
          {messages ? (
            <>
              {/* If we have messages, then show them */}
              {messages.map((message: Message, index: number) => {
                return (
                  <div key={index}>
                    <MessageComponent message={message} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {/* If we want to show the Message Input */}
              <MessageInput />
            </>
          )}
        </div>
        <div className="mt-4">
          <div className="mb-2 mt-6">
            <MessageStyleSelector />
          </div>
          <div>
            <div
              onClick={() => alert("do nothing")}
              className="bg-brand-primary w-full py-2 font-bold text-white text-lg flex items-center justify-center rounded-lg"
            >
              Get ideas
            </div>
          </div>
        </div>

        <div>
          <PremiumUpsellPrompt />
        </div>
      </div>
    </div>
  );
};
