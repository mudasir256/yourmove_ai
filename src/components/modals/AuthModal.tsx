import { useEffect } from "react";
import { AuthActionType } from "../../constants/auth";
import { useAuthStore } from "../../stores/auth";
import { ForgotPassword } from "../auth/ForgotPassword";
import { SignIn } from "../auth/SignIn";
import { SignUp } from "../auth/SignUp";
import { Modal } from "./Modal";
import { Migration } from "../auth/Migration";

export const AuthModal = () => {
  const {
    authModalIsOpen,
    setAuthModalIsOpen,
    authActionType,
    setShowOptions,
    setAuthActionType,
    emailToMigrate,
    setShowAuthSubscriptionDisclaimer
  } = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      setAuthActionType(AuthActionType.SignIn);
      setShowOptions(true);
    }, 400);
  }, [authModalIsOpen]);

  return (
    <>
      <Modal
        open={authModalIsOpen}
        setOpen={setAuthModalIsOpen}
        backgroundColor="white"
        onClose={() => setShowAuthSubscriptionDisclaimer(false)}
      >
        <div className="w-full">
          <div className="w-full flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.5"
              stroke="currentColor"
              onClick={() => {
                setAuthModalIsOpen(false);
                setShowAuthSubscriptionDisclaimer(false);
              }}
              className="w-6 h-6 text-zinc-400 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center -mt-6">
            <h1 className="text-2xl font-semibold">
              {emailToMigrate ? <>We've upgraded!</> : <>{authActionType}</>}
            </h1>
          </div>
          <div className="mt-6">
            {emailToMigrate ? (
              <Migration />
            ) : (
              <>
                {authActionType === AuthActionType.SignIn && <SignIn />}
                {authActionType === AuthActionType.SignUp && <SignUp />}
                {authActionType === AuthActionType.ForgotPassword && (
                  <ForgotPassword />
                )}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
