import { uploadFiles } from '../../queries'

const isValidFileType = (file: File) => {
  const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
  // alert('valid file type');
  return validExtensions.includes(file.type);
};

const isValidFileSize = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  return file.size <= maxSize;
};

type Props = {
  onUploadFailed?: (error: string) => void
  onUploadStart?: (files: FileList | null) => void
  onUploadSuccess?: (urls: string[]) => void
}

export const useFileUpload = ({ onUploadFailed = undefined, onUploadStart = undefined, onUploadSuccess = undefined }: Props) => {
  const onFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    // setSelectedFiles(files);
    const filesArray = Array.from(files);

    if (filesArray.length > 8) {
      // Inform the user they can only upload up to 8 images
      // toast.error("Please upload up to 8 screenshots");
      onUploadFailed?.("Please upload up to 8 screenshots")
      return; // Prevent further execution
    }


    if (!filesArray.every(isValidFileType)) {
      // toast.error("Unsupported file type. Screenshots must be png, jpg, webp or gif");
      onUploadFailed?.("Unsupported file type. Screenshots must be png, jpg, webp or gif")
      // setInputKey(Date.now()); // Reset the input
      return; // Stop further execution
    }
    if (!filesArray.every(isValidFileSize)) {
      // toast.error("Screenshots must be 10mb or smaller");
      onUploadFailed?.("Screenshots must be 10mb or smaller")
      // setInputKey(Date.now()); // Reset the input
      return; // Stop further execution
    }
    // Call additional handler functions here if needed
    // e.g., uploadFiles(filesArray);

    // setSelectedFiles(files);
    // setFilesUploading(true);
    onUploadStart?.(files)

    uploadFiles(files).then((response) => {
      // we have the URLs for the files, call onFilesUploaded
      // onFilesUploaded(response.data.urls);
      // // set that we are no longer uploading
      // setFilesUploading(false);
      onUploadSuccess?.(response.data.urls)
    });
  }

  return {
    onFileUpload
  }
}