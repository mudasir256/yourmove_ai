import { PhotoIcon } from "@heroicons/react/24/outline";
import { useChatStore } from "../../stores/chat";
import { MessageInputConfigurations } from "../../constants/chat";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const MessageInput = () => {
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

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    // Handle the selected file as needed
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <div className="">
      {inputConfiguration && (
        <div className="mt-4">
          <h1 className="text-3xl font-bold  mb-4">
            {inputConfiguration.headline}
          </h1>
          <form action="#" className="relative">
            {inputConfiguration.screenshot ? (
              <>
                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary">
                  <textarea
                    rows={8}
                    name="description"
                    id="description"
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
                          className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                          {inputConfiguration.screenshot}
                        </span>
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="submit"
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
              <textarea
                rows={8}
                name="description"
                id="description"
                className="block bg-transparent w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 py-3 -mt-4"
                placeholder={"Need inspiration? Just hit 'Get ideas'"}
                defaultValue={""}
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
};
