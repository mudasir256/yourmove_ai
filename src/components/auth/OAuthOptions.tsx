import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase";
import { successfulSignIn } from "../../utils";
import { useAuthStore } from "../../stores/auth";
import toast from "react-hot-toast";
import { addUserReferral, migrateUser } from "../../queries";

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export const OAuthOptions = () => {
  const { setSignInError } = useAuthStore();

  const handleOAuthError = (errorCode: string) => {
    if (errorCode == "auth/cancelled-popup-request") {
      toast.error("You closed the Sign In Pop Up. Try again");
    }
  };

  const handleReferralSignUp = async (userId: string) => {
    const referral = localStorage.getItem('referredCode')
    if (referral) {
      await addUserReferral(userId, referral)
      localStorage.removeItem('referredCode')
    }
  }

  const launchGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const addInfo = getAdditionalUserInfo(result)
        if (result.user.email) {
          successfulSignIn(result.user.email);
          // Migrate just the user
          migrateUser(result.user.email);
        }
        const userId = result.user.uid
        if (addInfo?.isNewUser) {
          handleReferralSignUp(userId)
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignInError(errorMessage);
        handleOAuthError(error.code);
      });
  };

  const launchAppleAuth = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        const addInfo = getAdditionalUserInfo(result)
        if (result.user.email) {
          successfulSignIn(result.user.email);
          // Migrate just the user
          migrateUser(result.user.email);
        }
        const userId = result.user.uid
        if (addInfo?.isNewUser) {
          handleReferralSignUp(userId)
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignInError(errorMessage);
        handleOAuthError(error.code);
      });
  };
  return (
    <>
      <button
        onClick={launchGoogleAuth}
        className="mb-2 border-2 border-black p-2 rounded-md bg-white w-full flex items-center justify-center"
      >
        <div className="w-1/5 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8055 8.0415H19V8H10V12H15.6515C14.827 14.3285 12.6115 16 10 16C6.6865 16 4 13.3135 4 10C4 6.6865 6.6865 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
              fill="#FFC107"
            />
            <path
              d="M1.15332 5.3455L4.43882 7.755C5.32782 5.554 7.48082 4 10.0003 4C11.5298 4 12.9213 4.577 13.9808 5.5195L16.8093 2.691C15.0233 1.0265 12.6343 0 10.0003 0C6.15932 0 2.82832 2.1685 1.15332 5.3455Z"
              fill="#FF3D00"
            />
            <path
              d="M10.0002 19.9999C12.5832 19.9999 14.9302 19.0114 16.7047 17.4039L13.6097 14.7849C12.5719 15.574 11.3039 16.0009 10.0002 15.9999C7.39916 15.9999 5.19066 14.3414 4.35866 12.0269L1.09766 14.5394C2.75266 17.7779 6.11366 19.9999 10.0002 19.9999Z"
              fill="#4CAF50"
            />
            <path
              d="M19.8055 8H19H10V12H15.6515C15.2571 13.1082 14.5467 14.0766 13.608 14.7855L13.6095 14.7845L16.7045 17.4035C16.4855 17.6025 20 15 20 10C20 9.3295 19.931 8.6335 19.8055 8Z"
              fill="#1976D2"
            />
          </svg>
        </div>
        <div className="w-3/5 font-semibold">Continue with Google</div>
        <div className="w-1/5"></div>
      </button>
      <button
        onClick={launchAppleAuth}
        className="mb-2 border-2 border-black p-2 rounded-md bg-white w-full flex items-center justify-center"
      >
        <div className="w-1/5 flex items-center justify-center">
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6476 10.5693C14.638 8.92994 15.3808 7.69441 16.8807 6.78339C16.0418 5.58151 14.7726 4.92048 13.0996 4.79308C11.5155 4.66809 9.78243 5.71612 9.14784 5.71612C8.47719 5.71612 6.9436 4.83635 5.73692 4.83635C3.24663 4.87481 0.600098 6.82185 0.600098 10.7832C0.600098 11.9539 0.814032 13.163 1.2419 14.4081C1.81399 16.0475 3.87641 20.0641 6.02777 19.9992C7.15273 19.9728 7.94837 19.2012 9.41225 19.2012C10.8329 19.2012 11.5684 19.9992 12.8232 19.9992C14.9938 19.968 16.8591 16.3167 17.4023 14.6725C14.4914 13.3 14.6476 10.6534 14.6476 10.5693ZM12.1213 3.23785C13.34 1.7908 13.2294 0.473539 13.1934 0C12.1165 0.0624976 10.8713 0.733145 10.1622 1.55763C9.38101 2.44221 8.92189 3.53592 9.02044 4.76905C10.1839 4.85798 11.2463 4.25945 12.1213 3.23785Z"
              fill="#0B0A0A"
            />
          </svg>
        </div>
        <div className="w-3/5 font-semibold">Continue with Apple ID</div>
        <div className="w-1/5"></div>
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white px-6 text-gray-900">or</span>
        </div>
      </div>
    </>
  );
};
