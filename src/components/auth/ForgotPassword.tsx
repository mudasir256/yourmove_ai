import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { CheckIcon } from "@heroicons/react/24/outline";

export const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      {emailSent ? (
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Password recovery email sent
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                If there is an account matching the email you provided, a
                password recovery email has been sent with instructions on how
                to reset your password.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{}}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Please enter a valid email")
              .required("Required"),
          })}
          onSubmit={async (values: any, actions) => {
            setSubmitting(true);
            try {
              await sendPasswordResetEmail(auth, values.email);
            } catch (error) {
              // don't do anything because we don't want to tell the user there was an error
            }
            setEmailSent(true);
            setSubmitting(true);
          }}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form>
              <p className="mb-3">
                Enter your email address and we’ll send password recovery link
              </p>
              <Field name="email" type="email" />
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
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
