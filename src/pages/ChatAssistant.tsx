import { MessageStyleSelector } from "../components/chat/selectors/MessageStyleSelector";
import { MessageSubTypeSelector } from "../components/chat/selectors/MessageSubTypeSelector";
import { MessageTypeSelector } from "../components/chat/selectors/MessageTypeSelector";
import { SettingsModal } from "../components/chat/modals/SettingsModal";
import { useChatStore } from "../stores/chat";
import { MessageInput, submitMessage } from "../components/chat/MessageInput";
import { Message as MessageComponent } from "../components/chat/Message";
import { PremiumUpsellPrompt } from "../components/chat/PremiumUpsellPrompt";
import { MessageAuthorType } from "../constants/chat";
import { Screenshot } from "../components/chat/Screenshot";
import { GeneratingRepliesLoader } from "../components/chat/GeneratingRepliesLoader";

export const ChatAssistant = () => {
  const {
    message,
    sendingMessage,
    screenshotUploading,
    chatResponse,
    setChatResponse,
    setScreenshotUploading,
    settingsModalOpen,
    setSettingsModalOpen,
  } = useChatStore();

  // Start over, clear everything
  const startOver = () => {
    setChatResponse(null);
    setScreenshotUploading(null);
  };

  return (
    <div className="h-screen px-3 sm:mx-0 sm:flex sm:justify-center sm:w-full">
      <div className="">
        <SettingsModal
          open={settingsModalOpen}
          setOpen={setSettingsModalOpen}
        />
        <MessageTypeSelector />
        <MessageSubTypeSelector />
        <div className="mt-4">
          {chatResponse ? (
            <>
              {chatResponse.image ? (
                <div className="mb-6 flex justify-end">
                  <div>
                    <Screenshot
                      url={chatResponse.image}
                      isLoading={false}
                      subtitle="Screenshot uploaded ✅"
                    />
                  </div>
                </div>
              ) : (
                <MessageComponent
                  message={{
                    content: message,
                    author: MessageAuthorType.User,
                  }}
                />
              )}
              {sendingMessage ? (
                <GeneratingRepliesLoader />
              ) : (
                <>
                  {chatResponse.responses.map((response: string) => (
                    <MessageComponent
                      message={{
                        content: response,
                        author: MessageAuthorType.Generated,
                      }}
                    />
                  ))}
                  <div className="flex mt-6 font-semibold text-brand-primary cursor-pointer">
                    <div
                      className="mr-4"
                      onClick={() => {
                        // re-run with no file object. it will check if there is a recentQuery and use that instead
                        submitMessage(message, null);
                      }}
                    >
                      More Ideas
                    </div>
                    <div onClick={() => startOver()}>Start Over</div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {sendingMessage ? (
                <>
                  {screenshotUploading ? (
                    <Screenshot
                      url={URL.createObjectURL(screenshotUploading)}
                      isLoading={true}
                      subtitle="Uploading screenshot..."
                    />
                  ) : (
                    <MessageComponent
                      message={{
                        content: message,
                        author: MessageAuthorType.User,
                      }}
                    />
                  )}
                  <GeneratingRepliesLoader />
                </>
              ) : (
                <>
                  {/* If we want to show the Message Input */}
                  <MessageInput />
                </>
              )}
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
