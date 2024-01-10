import { PhotoIcon } from "@heroicons/react/24/outline";
import { useChatStore } from "../../stores/chat";
import {
  ChatRequestType,
  MessageInputConfigurations,
} from "../../constants/chat";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { sendChatImage, sendChatText } from "../../queries";
import { removeEmoji } from "../../utils";
import { ChatResponse } from "../../models/chat";
import { auth } from "../../firebase";

import { MessageStyleSelector } from "./selectors/MessageStyleSelector";
import { useUIStore } from "../../stores/ui";

// exported so other components can use it
export const submitMessage = (message: string, file: File | null) => {
  const state = useChatStore.getState();
  const chatResponse = state.chatResponse;
  state.setMessage(message);
  state.setSendingMessage(true);

  // If there is a file or we have the file already decoded
  if (
    (file || chatResponse?.queryDecoded) &&
    useChatStore.getState().chatRequestType != ChatRequestType.Text
  ) {
    // Set that we are uploading an image
    state.setChatRequestType(ChatRequestType.Image);
    state.setScreenshotUploading(file);
    sendChatImage(
      state.selectedMessageType.toLowerCase(),
      removeEmoji(state.selectedMessageStyle),
      state.curiosityModeEnabled,
      chatResponse?.image ? chatResponse?.image : null,
      file ? file : null,
      chatResponse?.queryDecoded ? chatResponse.queryDecoded : null,
      auth.currentUser ? auth.currentUser.accessToken : null
    )
      .then((response) => {
        state.setChatResponse(response.data as ChatResponse);
        state.setSendingMessage(false);

        // Unhide the upsell
        useUIStore.getState().setHideUpsell(false);
      })
      .catch((error) => {
        // handleNoChats();
      });
  } else {
    state.setChatRequestType(ChatRequestType.Text);
    sendChatText(
      state.selectedMessageType.toLowerCase(),
      removeEmoji(state.selectedMessageStyle),
      message,
      state.curiosityModeEnabled,
      auth.currentUser ? auth.currentUser.accessToken : null
    )
      .then((response) => {
        state.setChatResponse(response.data as ChatResponse);
        state.setSendingMessage(false);

        // Unhide the upsell
        useUIStore.getState().setHideUpsell(false);
      })
      .catch((error) => {
        // handleNoChats();
      });
  }
};

export const MessageInput = () => {
  const {
    selectedMessageType,
    selectedMessageSubType,
    chatRequestType,
    setChatRequestType,
  } = useChatStore();
  const [inputConfiguration, setInputConfiguration] = useState({} as any);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const typeInputConfiguration =
      MessageInputConfigurations[selectedMessageType];

    // If there are no subtypes, e.g. like "Reply"
    if (typeInputConfiguration.headline) {
      setInputConfiguration(typeInputConfiguration);
    } else {
      setInputConfiguration(typeInputConfiguration[selectedMessageSubType]);
    }
  }, [selectedMessageType, selectedMessageSubType]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    // Handle the selected file as needed
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="">
      {inputConfiguration && (
        <div className="mt-4">
          <h1 className="text-3xl font-bold  mb-4">
            {inputConfiguration.headline}
          </h1>
          <Formik
            initialValues={{}}
            validationSchema={yup.object({
              message: yup.string(),
              screenshot: yup.object(),
            })}
            onSubmit={(values, actions) => {
              submitMessage(values.message, file);
            }}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <form className="relative">
                {inputConfiguration.screenshot ? (
                  <div className="relative">
                    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary">
                      <Field
                        as="textarea"
                        rows={8}
                        name="message"
                        id="message"
                        className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-4 py-3"
                        placeholder={inputConfiguration.placeholder}
                        defaultValue={""}
                      />
                    </div>

                    <div className="absolute inset-x-px bottom-0">
                      <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                        <div className="flex p-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <button
                            type="button"
                            onClick={handleFileUpload}
                            className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                          >
                            <PhotoIcon
                              className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500 text-brand-primary"
                              aria-hidden="true"
                            />
                            <span className="text-sm group-hover:text-gray-600 text-brand-primary font-bold">
                              {file ? file.name : inputConfiguration.screenshot}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Field
                    as="textarea"
                    rows={8}
                    name="message"
                    id="message"
                    className="block bg-transparent w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 py-3 -mt-4"
                    placeholder={"Need inspiration? Just hit 'Get ideas'"}
                    defaultValue={""}
                  />
                )}
                <div className="mt-4">
                  <div className="mb-2 mt-6">
                    <MessageStyleSelector />
                  </div>
                  <div>
                    <div
                      onClick={() => handleSubmit()}
                      className="cursor-pointer bg-brand-primary w-full py-2 font-bold text-white text-lg flex items-center justify-center rounded-lg"
                    >
                      Get ideas
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
