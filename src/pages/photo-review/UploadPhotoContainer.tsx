import React, { useState } from "react"
import toast from "react-hot-toast"
import LoadingSpinner from "../../components/LoadingSpinner"
import PlusIcon from "../../components/PlusIcon"
import ArrowIcon from "../../components/ArrowIcon"
import { useAuthStore } from "../../stores/auth"
import LockIcon from "../../components/LockIcon"
import { useFileUpload } from "../../components/wizard/useFileUpload"

type Props = {
  count?: number | undefined
  total?: number | undefined
  onUploadComplete?: (url?: string) => void
  onUnlockPress?: VoidFunction
  disabled?: boolean
}

export const UploadPhotoContainer = ({ count, total, onUploadComplete = undefined, onUnlockPress = undefined, disabled = false }: Props) => {
  const [filesUploading, setFilesUploading] = useState(false);

  const { isSubscribed } = useAuthStore()

  const onUploadFailed = (error: string) => {
    setFilesUploading(false)
    toast.error(error)
  }
  const onUploadStart = () => {
    setFilesUploading(true);
  }
  const onUploadSuccess = (urls: string[]) => {
    console.log("URL:: ", urls)
    // set that we are no longer uploading
    setFilesUploading(false);
    onUploadComplete?.(urls && urls.length > 0 ? urls[0] : undefined)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileUpload(event.target.files)
    }
  }

  const { onFileUpload } = useFileUpload({ onUploadFailed, onUploadStart, onUploadSuccess })

  const onAddPhotoClick = () => {
    if (!isSubscribed && total && count !== undefined && count >= total) {
      toast.error("Photo limit reached!")
      return
    }
    if (!filesUploading) {
      document.getElementById("fileInput")?.click();
    }
  }

  return (
    <div className='mt-6 border-2 border-black rounded-xl overflow-hidden'>
      {filesUploading ? (
        <div className="py-4"><LoadingSpinner /></div>
      ) : (
        <div className="py-4 px-4 flex justify-between bg-white cursor-pointer" onClick={onAddPhotoClick}>
          <div className="flex items-center">
            {!isSubscribed && total && count !== undefined && count >= total ? (
              <>
                <LockIcon className="text-brand-primary" />
                <p className="ml-2 opacity-50">Photo Limit Reached</p>
              </>
            ) : (
              <>
                <PlusIcon />
                <p className="ml-2">Add a Photo</p>
              </>
            )}
          </div>
          {!isSubscribed && count !== undefined && total && count < total ? (
            <p className={`text-[#999999] text-sm ${count >= total ? "opacity-50" : "opacity-100"}`}>{`(${total - count}/${total} Left)`}</p>
          ) : null}
        </div>
      )
      }
      {
        !isSubscribed &&
        <div className="flex bg-brand-primary px-4 py-2 items-center justify-between" onClick={onUnlockPress}>
          <p className="text-white mr-1 text-sm">Get <span className="font-bold">Premium</span> for unlimited photos, in-depth analysis, and more</p>
          <ArrowIcon color="#FFFFFF" />
        </div>
      }
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".png, .jpeg, .jpg, .webp, .gif"
        disabled={disabled}
      />
    </div>
  )
}