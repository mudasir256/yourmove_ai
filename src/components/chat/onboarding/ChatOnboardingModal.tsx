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
        </div>
        <div className="mt-4">
          <ChatOnboarding onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
};