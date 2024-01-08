import { Fragment, useRef } from "react";
import { useOutsideAlerter } from "../../utils";
import { Transition } from "@headlessui/react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  backgroundColor?: string;
}

export const Modal = ({ children, open, setOpen, backgroundColor }: Props) => {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    setOpen(false);
  });
  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0gt scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
          <div
            ref={modalRef}
            style={{
              backgroundColor: backgroundColor ? backgroundColor : "#f7fafc",
            }}
            className="max-h-fit relative transform overflow-hidden rounded-lg px-2 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 border-2 border-black w-full z-50 mx-1"
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};
