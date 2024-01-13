import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadFiles } from "../../queries";

interface Props {
  // An optional array of strings to defines the already set files
  alreadySetFiles: Array<string>;
  onFilesUploaded: (files: Array<string>) => void;
}

// This is the file upload component. when the files are uploaded, we call the backend to upload the files

export const FileUploadStep = ({ alreadySetFiles, onFilesUploaded }: Props) => {
  // const fileUploadRef = useRef(null);
  // const [files, setFiles] = useState<FileList | null>();
  const [filesUploading, setFilesUploading] = useState(false);
  // // When files change, call the callback to set state
  // useEffect(() => {
  //   console.log("files changed");
  //   // Upload files and then set filesuploaded
  //   if (files) {
  //     setFilesUploading(true);
  //     uploadFiles(files).then((response) => {
  //       // we have the URLs for the files, call onFilesUploaded
  //       onFilesUploaded(response.data.urls);
  //       // set that we are no longer uploading
  //       setFilesUploading(false);
  //     });
  //   }
  // }, [files]);
  // return (
  //   <div className="mt-6">
  //     <div
  //       className="flex justify-center px-6 pt-5 pb-6 border-2 border-black rounded-md bg-white shadow-md cursor-pointer"
  //       onClick={() => {
  //         console.log("open files");
  //         setFiles(null);
  //         console.log("files is null, clicking ref");
  //         if (fileUploadRef.current) {
  //           fileUploadRef.current.value = "";
  //           fileUploadRef.current.click();
  //         }
  //         console.log("clicked ref");
  //       }}
  //     >
  //       <div className="flex h-full w-full items-center justify-center">
  //         <div className="space-y-1 text-center">
  //           <PhotoIcon className="mx-auto h-12 w-12 text-black mb-2" />
  //           <div className="flex text-sm text-gray-600">
  //             <label
  //               htmlFor="file-upload"
  //               className="relative cursor-pointer rounded-md text-black text-xl"
  //             >
  //               {filesUploading ? (
  //                 <>Files Uploading...</>
  //               ) : (
  //                 <>
  //                   {(files && files.length > 0) ||
  //                   (alreadySetFiles && alreadySetFiles.length > 0) ? (
  //                     <div>
  //                       <div>
  //                         {files && !alreadySetFiles ? files.length : ""}
  //                         {alreadySetFiles ? alreadySetFiles.length : ""} files
  //                         selected
  //                       </div>
  //                       <div className="mt-1 text-sm underline">
  //                         Tap to change
  //                       </div>
  //                     </div>
  //                   ) : (
  //                     <>
  //                       <span>
  //                         Select up to 8 screenshots of your dating profile
  //                       </span>
  //                     </>
  //                   )}
  //                 </>
  //               )}
  //             </label>
  //             <input
  //               id="file-upload"
  //               name="file-upload"
  //               type="file"
  //               className="sr-only"
  //               multiple={true}
  //               ref={fileUploadRef}
  //               onChange={(event: ChangeEvent<HTMLInputElement>) => {
  //                 console.log("yooo");
  //                 setFiles(event.target.files);
  //               }}
  //               accept="image/png, image/gif, image/jpeg"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
      // Call additional handler functions here if needed
      // e.g., uploadFiles(filesArray);
      setFilesUploading(true);
      uploadFiles(event.target.files).then((response) => {
        // we have the URLs for the files, call onFilesUploaded
        onFilesUploaded(response.data.urls);
        // set that we are no longer uploading
        setFilesUploading(false);
      });
    }
  };

  return (
    <div>
      <>{console.log("alread set")}</>
      <>{console.log(alreadySetFiles)}</>
      <div
        className="flex items-center justify-center p-4 mt-4 border border-2 border-black rounded-md bg-white shadow-md cursor-pointer"
        onClick={() => {
          // Only allow click when files aren't being uploaded
          if (!filesUploading) {
            document.getElementById("fileInput")?.click();
          }
        }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>

          <div className="mt-2 text-lg">
            {filesUploading ? (
              <>Files uploading, please wait...</>
            ) : (
              <>
                {alreadySetFiles ? (
                  <div>
                    {alreadySetFiles.length} files uploaded
                    <div className="text-sm underline">Tap to change</div>
                  </div>
                ) : (
                  <>Click to upload images</>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
      {/* {selectedFiles && selectedFiles.length > 0 && (
        <div>
          <p>Files selected:</p>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
