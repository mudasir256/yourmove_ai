import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";
import { OAuthOptions } from "./OAuthOptions";
import { useAuthStore } from "../../stores/auth";
import { AuthActionType } from "../../constants/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ErrorAlert } from "../ErrorAlert";
import { successfulSignIn } from "../../utils";
import { checkIfUserRequiresMigration } from "../../queries";

export const SignIn = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    showOptions,
    setShowOptions,
    setAuthActionType,
    signInError,
    setSignInError,
    setHasCheckedForSubscription,
    setEmailToMigrate,
  } = useAuthStore();

  return (
    <div className="relative">
      {!showOptions && (
        <div className="absolute -mt-14 cursor-pointer">
          <svg
            onClick={() => setShowOptions(true)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            className="w-10 h-10 stroke-zinc-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      )}
      {showOptions ? (
        <>
          <OAuthOptions />

          <button
            type="button"
            onClick={() => setShowOptions(false)}
            className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-2 rounded-md font-semibold -mb-1"
          >
            Sign in with Email
          </button>
          <div className="mt-10">
            <div className="justify-center w-full flex">
              Don't have an account?
            </div>
            <button
              onClick={() => setAuthActionType(AuthActionType.SignUp)}
              className="mt-3 mb-2 border-2 border-black p-2 rounded-md bg-white w-full flex items-center justify-center font-semibold"
            >
              Sign up
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{}}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Please enter a valid email")
              .required("Required"),
            password: yup.string().required("Required"),
          })}
          onSubmit={async (values: any) => {
            setSignInError(null);
            setSubmitting(true);
            // Check if the user requires a migration
            checkIfUserRequiresMigration(values.email).then(
              async (response) => {
                // if it does require a migration, ask them to reset their password
                if (response.data.requiresMigration) {
                  setEmailToMigrate(values.email);
                } else {
                  try {
                    // It doesn't require a migration, so let them login
                    await signInWithEmailAndPassword(
                      auth,
                      values.email,
                      values.password
                    );
                    // Set hasCheckedForSubscription to false so we will check for subscription again
                    setHasCheckedForSubscription(false);
                    successfulSignIn(values.email);
                  } catch (error) {
                    console.log("the error is");
                    console.log(error);
                    if (
                      error.code === "auth/wrong-password" ||
                      error.code === "auth/user-not-found"
                    ) {
                      setSignInError("Incorrect email or password");
                    }
                  }
                }
              }
            );

            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, errors }) => (
            <form>
              {signInError && (
                <div className="mb-4 -mt-2">
                  <ErrorAlert error={signInError} />
                </div>
              )}
              <Field name="email" type="email" />
              <Field name="password" type="password" />

              <button
                onClick={() => setAuthActionType(AuthActionType.ForgotPassword)}
                type="button"
                className="font-semibold text-brand-primary mb-2"
              >
                Forgot password?
              </button>

              <button
                type="button"
                onClick={() => handleSubmit()}
                className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-2 rounded-md font-semibold -mb-1"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};
