import { AIPhotosPaywall } from "../payment/paywalls/AIPhotosPaywall";
import { Modal } from "./Modal";
import { auth } from "../../firebase";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  redirectHandler?: VoidFunction
}

const AI_PHOTOS_URL = import.meta.env.VITE_AI_PHOTOS_URL

export const UnlockAIPhotosModal = ({ open, setOpen, redirectHandler }: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3.5"
            stroke="currentColor"
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-zinc-400 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Unlock AI Photos</h1>
        </div>
        <div className="overflow-y-scroll">
          <AIPhotosPaywall
            email={auth.currentUser?.email ?? undefined}
            returnUrl={AI_PHOTOS_URL}
            redirectHandler={redirectHandler}
          />
        </div>
      </div>
    </Modal>
  );
};
