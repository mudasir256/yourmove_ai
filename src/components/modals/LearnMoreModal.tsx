import { Field, Formik } from "formik";
import * as yup from "yup";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LearnMoreModal = ({ open, setOpen }: Props) => {
  return (
    <>
      {open ? (
        <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border-2 border-black w-full z-50 mx-8">
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
                <h1 className="text-2xl font-semibold">
                  Professional Profile Redesign
                </h1>
              </div>
              <div className="flex items-center justify-center mt-2">
                <p>Content here</p>
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
