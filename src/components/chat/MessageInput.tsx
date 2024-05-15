import { PhotoIcon } from "@heroicons/react/24/outline";
import { useChatStore } from "../../stores/chat";
import {
  ChatRequestType,
  ChatType,
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
import { toast } from 'react-toastify'; 


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
      state.chatType ? state.chatType : ChatType.Reply,
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
      state.chatType ? state.chatType : ChatType.Reply,
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

interface Props {
  hideTextInput?: boolean;
  hideInputSettings?: boolean;
  file: File | null;
  setFile: (file: File | null) => void;
}

export const MessageInput = ({
  hideTextInput,
  hideInputSettings,
  file,
  setFile,
}: Props) => {
  const { selectedMessageType, selectedMessageSubType } = useChatStore();
  const [inputConfiguration, setInputConfiguration] = useState({} as any);

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

  const checkImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 7500 || img.height > 7500) {
          reject('Screenshot too large. Please upload a smaller screenshot.'); // Image exceeds the dimensions
        } else {
          resolve(true); // Image is within the dimensions
        }
      };
      img.onerror = () => reject('error loading image');
    });
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    // Handle the selected file as needed
    if (selectedFile) {
      try {
        await checkImageSize(selectedFile);
        setFile(selectedFile); // Set file if image is within size limits
      } catch (error) {
        toast.error(error); // Display a toast notification if the image is too large or fails to load
      }
    }
  };

  return (
    <div className="">
      {inputConfiguration && (
        <div className="mt-4">
          {!hideTextInput && (
            <h1 className="text-3xl font-bold  mb-4">
              {inputConfiguration.headline}
            </h1>
          )}
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
                <>
                  {!hideTextInput && (
                    <>
                      {inputConfiguration.screenshot ? (
                        <div className="relative">
                          <div className="overflow-hidden rounded-tl-lg rounded-tr-lg border-t border-l border-r border-gray-300 shadow-sm">
                            <Field
                              as="textarea"
                              rows={5}
                              name="message"
                              id="message"
                              className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-4 py-3"
                              placeholder={inputConfiguration.placeholder}
                              defaultValue={""}
                            />
                          </div>

                          <div className="bg-white border-b border-l border-r rounded-bl-lg rounded-br-lg border-gray-300 inset-x-px bottom-0">
                            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                              <div className="flex p-2">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={handleFileChange}
                                  accept=".jpeg, .jpg, .png, .pdf, .tiff, .tif"
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
                                    {file
                                      ? file.name
                                      : inputConfiguration.screenshot}
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
                    </>
                  )}
                </>
                {hideInputSettings && (
                  <>
                    <div className="mt-3">
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
                  </>
                )}
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
