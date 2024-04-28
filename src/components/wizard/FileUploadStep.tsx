import { useEffect, useState } from "react";
import { uploadFiles } from "../../queries";
import { useWizardStore } from "../../stores/wizard";
import toast from "react-hot-toast";


interface Props {
  // An optional array of strings to defines the already set files
  alreadySetFiles: Array<string>;
  onFilesUploaded: (files: Array<string>) => void;
}

export const FileUploadStep = ({ alreadySetFiles, onFilesUploaded }: Props) => {
  const { filesUploading, setFilesUploading } = useWizardStore();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [inputKey, setInputKey] = useState(Date.now()); // Used to reset the file input

  useEffect(() => {
    // Check if the gtag function is available in the window object
    if ((window as any).gtag) {
      (window as any).gtag("event", "review_upload", {
        event_category: "funnel",
        product: "review",
      });
    }
  }, []); // Empty dependency array to ensure this runs only once when the component mounts


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // setSelectedFiles(event.target.files);
      const filesArray = Array.from(event.target.files);

      if (filesArray.length > 8) {
        // Inform the user they can only upload up to 8 images
        toast.error("Please upload up to 8 screenshots");
        return; // Prevent further execution
      }

      const isValidFileType = (file: File) => {
        const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
        // alert('valid file type');
        return validExtensions.includes(file.type);
      };

      const isValidFileSize = (file: File) => {
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        return file.size <= maxSize;
      };


      if (!filesArray.every(isValidFileType)) {
        toast.error("Unsupported file type. Screenshots must be png, jpg, webp or gif");
        setInputKey(Date.now()); // Reset the input
        return; // Stop further execution
      }
      if (!filesArray.every(isValidFileSize)) {
        toast.error("Screenshots must be 10mb or smaller");
        setInputKey(Date.now()); // Reset the input
        return; // Stop further execution
      }
      // Call additional handler functions here if needed
      // e.g., uploadFiles(filesArray);
      setSelectedFiles(event.target.files);
      setFilesUploading(true);
      uploadFiles(event.target.files).then((response) => {
        // we have the URLs for the files, call onFilesUploaded
        onFilesUploaded(response.data.urls);
        // set that we are no longer uploading
        setFilesUploading(false);
        // After upload check the number of files uploaded and show toast if needed
        if (response.data.urls.length === 1) {
          toast.error("Upload more screenshots showing your entire profile for best results");
          // toast("Consider uploading more photos to better showcase your profile.");
        }
      });
    }
  };

  return (
    <div>
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
        accept=".png, .jpeg, .jpg, .webp, .gif" // Specify accepted file types in the accept attribute
      />
    </div>
  );
};
