import { useRef } from "react";
import { useOutsideAlerter } from "../../utils";

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Modal = ({children, open, setOpen}: Props) => {
const modalRef = useRef(null);
useOutsideAlerter(modalRef, () => {
  setOpen(false);
});
return (
  <>
    {open ? (
      <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
        <div
          ref={modalRef}
          style={{ backgroundColor: "#f7fafc" }}
          className="max-h-fit relative transform overflow-hidden rounded-lg px-2 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 border-2 border-black w-full z-50 mx-1"
        >
          {children}
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
);
}