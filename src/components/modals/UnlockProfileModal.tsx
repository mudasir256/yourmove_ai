import { ProfileWriterPaywall } from "../payment/paywalls/ProfileWriterPaywall";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UnlockProfileModal = ({ open, setOpen }: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full overflow-y-scroll" style={{ height: "35rem" }}>
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
        <div className="-mt-10">
          <ProfileWriterPaywall hideNoThanks={true} />
        </div>
      </div>
    </Modal>
  );
};
