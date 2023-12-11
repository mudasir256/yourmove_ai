import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface Props {
  onFilesUploaded: (files: FileList | null) => void;
}

export const FileUploadStep = ({ onFilesUploaded }: Props) => {
  const fileUploadRef = useRef(null);
  const [files, setFiles] = useState<FileList | null>(null);

  // When files change, call the callback to set state
  useEffect(() => {
    onFilesUploaded(files);
  }, [files]);

  return (
    <div className="mt-6">
      <div
        className="flex justify-center px-6 pt-5 pb-6 border-2 border-black rounded-md bg-white shadow-md cursor-pointer"
        onClick={() => {
          setFiles(null);
          fileUploadRef.current.click();
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="space-y-1 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-black mb-2" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md text-black text-xl"
              >
                {files && files.length > 0 ? (
                  <div>
                    <div>{files.length} files selected</div>
                    <div className="mt-1 text-sm underline">Tap to change</div>
                  </div>
                ) : (
                  <>
                    <span>
                      Select up to 8 screenshots of your dating profile
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple={true}
                      ref={fileUploadRef}
                      style={{ display: "none" }}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFiles(event.target.files);
                      }}
                    />
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
