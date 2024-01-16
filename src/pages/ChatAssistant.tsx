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
    setChatRequestType,
  } = useChatStore();

  // Start over, clear everything
  const startOver = () => {
    setChatResponse(null);
    setScreenshotUploading(null);
    setChatRequestType(null);
  };

  return (
    <div className=" max-w-xl mx-auto px-4">
      <div className="">
        <SettingsModal
          open={settingsModalOpen}
          setOpen={setSettingsModalOpen}
        />
        <MessageTypeSelector />
        <MessageSubTypeSelector />
        <div className="mt-4 relative overflow-y-scroll">
          {chatResponse ? (
            <div className="h-full">
              {chatResponse.image ? (
                <div className="mb-6 flex justify-start">
                  <div>
                    <Screenshot url={chatResponse.image} isLoading={false} />
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
                    <div key={response}>
                      <MessageComponent
                        message={{
                          content: response,
                          author: MessageAuthorType.Generated,
                        }}
                      />
                    </div>
                  ))}
                  <div className="flex mt-4 font-semibold text-brand-primary cursor-pointer">
                    <div
                      className="mr-4"
                      onClick={() => {
                        // todo: the problem here is that when we click more ideas and the response is text
                        // we have queryDecoded saved, so it thinks it's an image.
                        // we need to save what kind of request, whether it has a screenshot or not
                        // and use that as the flag to determine if we should call image or text.

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
            </div>
          ) : (
            <>
              {sendingMessage ? (
                <>
                  {screenshotUploading ? (
                    <Screenshot
                      url={URL.createObjectURL(screenshotUploading)}
                      isLoading={true}
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
                <></>
              )}
            </>
          )}
          <MessageInput
            hideTextInput={!!chatResponse || sendingMessage}
            hideInputSettings={!sendingMessage}
          />
        </div>
        <div>
          <PremiumUpsellPrompt />
        </div>
      </div>
    </div>
  );
};
