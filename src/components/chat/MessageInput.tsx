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
import { history } from "../../main";
import toast from "react-hot-toast";

const handleNoChats = () => {
  toast.error("You have ran out of Chats for today, upgrade for more.");
  history.push("/premium");
  useChatStore.getState().setSendingMessage(false);
};

// exported so other components can use it
export const submitMessage = (message: string, file: File | null) => {
  console.log("here");
  console.log(auth.currentUser);
  console.log("chat request type is: ");
  console.log(useChatStore.getState().chatRequestType);
  const state = useChatStore.getState();
  const chatResponse = state.chatResponse;
  console.log("chat response is");
  console.log(chatResponse);
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
      })
      .catch((error) => {
        handleNoChats();
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
      })
      .catch((error) => {
        handleNoChats();
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
                  <>
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
                        <div className="flex">
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
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="inline-flex items-center rounded-full bg-brand-primary p-2 text-sm font-semibold text-white shadow-sm cursor-pointer"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.33962 10.8312L13.6479 10.8312L9.58128 14.8979C9.25628 15.2229 9.25628 15.7562 9.58128 16.0812C9.90628 16.4062 10.4313 16.4062 10.7563 16.0812L16.2479 10.5895C16.5729 10.2645 16.5729 9.73953 16.2479 9.41454L10.7563 3.92287C10.4313 3.59787 9.90628 3.59787 9.58128 3.92287C9.25628 4.24787 9.25628 4.77287 9.58128 5.09787L13.6479 9.16454L4.33962 9.16454C3.88128 9.16454 3.50628 9.53954 3.50628 9.99787C3.50628 10.4562 3.88128 10.8312 4.33962 10.8312Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
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
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
