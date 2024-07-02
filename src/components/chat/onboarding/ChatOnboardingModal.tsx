import { Modal } from "../../modals/Modal"
import { ChatOnboarding } from "./ChatOnboarding";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ChatOnboardingModal = ({ open, setOpen }: Props) => {
  const onClose = () => setOpen(false)
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full">
        <div className="flex flex-1 items-center justify-center">
          <h1 className="font-bold text-sm">How It Works</h1>
          <div className="fixed right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="black"
              onClick={() => setOpen(false)}
              className="w-4 h-4 text-zinc-400 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <ChatOnboarding onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
};