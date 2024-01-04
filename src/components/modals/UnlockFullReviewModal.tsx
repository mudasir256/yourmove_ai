import toast from "react-hot-toast";
import { ProductType } from "../../constants/payments";
import { useWizardStore } from "../../stores/wizard";
import { Paywall } from "../payment/paywalls/Paywall";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setHasPaid: (hasPaid: boolean) => void;
}

export const UnlockFullReviewModal = ({ open, setOpen, setHasPaid }: Props) => {
  const { profileReviewerStepResults } = useWizardStore();
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-full">
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
        <div className="flex items-center justify-center -mt-3 mb-8">
          <h1 className="text-2xl font-semibold">Unlock Full Review</h1>
        </div>
        <div>
          <Paywall
            email={profileReviewerStepResults.email}
            requiredProductsToSkipPaywall={[]}
            noThanksHandler={() => setOpen(false)}
            chosenProduct={ProductType.ProfileReview}
            redirectHandler={() => {
              setOpen(false);
              setHasPaid(true);
              toast.success("You have successfully unlocked your full review!");
            }}
          >
            <></>
          </Paywall>
        </div>
      </div>
    </Modal>
  );
};
