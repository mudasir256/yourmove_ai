import { MessageTypeSelector } from "../components/chat/selectors/MessageTypeSelector";
import { SettingsModal } from "../components/chat/modals/SettingsModal";
import { useChatStore } from "../stores/chat";
import { MessageInput, submitMessage } from "../components/chat/MessageInput";
import { Message as MessageComponent } from "../components/chat/Message";
import { PremiumUpsellPrompt } from "../components/chat/PremiumUpsellPrompt";
import { MessageAuthorType } from "../constants/chat";
import { Screenshot } from "../components/chat/Screenshot";
import { GeneratingRepliesLoader } from "../components/chat/GeneratingRepliesLoader";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useLogEvent, logEvent } from '../analytics'
import { ChatOnboardingModal } from '../components/chat/onboarding/ChatOnboardingModal'


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
    needReset,
  } = useChatStore();
  const [file, setFile] = useState<File | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Start over, clear everything
  const startOver = () => {
    setFile(null);
    setChatResponse(null);
    setScreenshotUploading(null);
    setChatRequestType(null);
  };

  useLogEvent('start', 'chat_assistant')

  // Apply a soft reset whenever a user who has a screenshot switches
  useEffect(() => {
    if (needReset) {
      startOver();
      useChatStore.getState().setNeedReset(false); // Reset the flag
    }
  }, [needReset]);

  useEffect(() => {
    const hasOnboardedChat = Boolean(parseInt(localStorage.getItem('hasOnboardedChat') ?? "0"))
    if (!hasOnboardedChat) {
      setShowOnboarding(true)
      localStorage.setItem("hasOnboardedChat", "1")
    }
  }, [])

  const onGetIdeasPress = () => {
    logEvent('generate', 'chat_assistant')
  }

  return (
    <div className=" max-w-xl mx-auto px-4">
      <Helmet>
        <meta name="description" content="AI flirting assistant. Create personalized openers for any profile. Generate flirty (or thoughtful) replies to any conversations." />
      </Helmet>
      <div className="">
        <SettingsModal
          open={settingsModalOpen}
          setOpen={setSettingsModalOpen}
        />
        <MessageTypeSelector />
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
                        onGetIdeasPress()
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
            file={file}
            setFile={setFile}
            hideTextInput={!!chatResponse || sendingMessage}
            hideInputSettings={!sendingMessage}
            onGetIdeasPress={onGetIdeasPress}
          />
        </div>
        <PremiumUpsellPrompt />
      </div>
      <ChatOnboardingModal open={showOnboarding} setOpen={setShowOnboarding} />
    </div>
  );
};
