
import { PaymentPlans } from "../payment/PaymentPlans";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UnlockModal = ({ open, setOpen }: Props) => {
  return (
    <>
      {open ? (
        <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
          <div
            style={{ backgroundColor: "#f7fafc" }}
            className="max-h-fit relative transform overflow-hidden rounded-lg px-2 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 border-2 border-black w-full z-50 mx-1"
          >
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
                <PaymentPlans noThanksHandler={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
