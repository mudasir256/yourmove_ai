import { Modal } from "./Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LearnMoreModal = ({ open, setOpen }: Props) => {
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
        <div className="flex items-center justify-center -mt-3">
          <h1 className="text-2xl font-semibold">AI Enhanced Photos</h1>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="text-lg">
            Professional-looking photos at a fraction of the cost.
          </p>
        </div>
      </div>
    </Modal>
  );
};
