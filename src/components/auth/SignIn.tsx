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
import toast from "react-hot-toast";
import { successfulSignIn } from "../../utils";

export const SignIn = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { setAuthActionType, signInError, setSignInError } = useAuthStore();

  return (
    <>
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
            try {
              await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              successfulSignIn(values.email);
            } catch (error) {
              if (
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
              ) {
                setSignInError("Incorrect email or password");
              }
            }
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
    </>
  );
};
