import { Modal } from "./Modal";
import { ProfileReviewPaywall } from "../payment/paywalls/ProfileReviewPaywall";
import { useProfileStore } from "../../stores/profile";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UnlockProfileReviewModal = ({ open, setOpen }: Props) => {
  const { setHasPaidForProfileReview } = useProfileStore()
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full overflow-y-scroll" style={{ height: "40rem" }}>
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
          <ProfileReviewPaywall hideNoThanks={true} onComplete={() => {
            setOpen(false)
            setHasPaidForProfileReview(true)
            toast.success("You have successfully unlocked your full review!");
          }} />
        </div >
      </div >
    </Modal >
  );
};
