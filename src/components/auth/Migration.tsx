import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";
import { useAuthStore } from "../../stores/auth";
import { ErrorAlert } from "../ErrorAlert";
import { migrateUser } from "../../queries";
import { useUIStore } from "../../stores/ui";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { successfulSignIn } from "../../utils";

export const Migration = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    signInError,
    emailToMigrate,
    setEmailToMigrate,
    setHasCheckedForSubscription,
    setAuthModalIsOpen,
    setShowAuthSubscriptionDisclaimer
  } = useAuthStore();
  const { setError } = useUIStore();

  return (
    <div className="relative">
      <div className="absolute -mt-12 cursor-pointer">
        <svg
          onClick={() => setEmailToMigrate("")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          className="w-8 h-8 stroke-zinc-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="text-center mb-4 -mt-2">
        <h3 className="text-lg">
          We've upgraded our system! For security, please reset your password.
          (Don't worry, it can be the same as your old one!)
        </h3>
      </div>
      <Formik
        initialValues={{}}
        validationSchema={yup.object({
          password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
          confirmPassword: yup
            .string()
            .required("Required")
            .test("passwords-match", "Passwords must match", function (value) {
              return this.parent.password === value;
            }),
        })}
        onSubmit={async (values: any) => {
          setSubmitting(true);
          migrateUser(emailToMigrate, values.password)
            .then(async () => {
              toast.success("Successfully migrated your account, thanks!");
              // It doesn't require a migration, so let them login
              await signInWithEmailAndPassword(
                auth,
                emailToMigrate,
                values.password
              );
              setAuthModalIsOpen(false);
              setShowAuthSubscriptionDisclaimer(false);
              // Set hasCheckedForSubscription to false so we will check for subscription again
              setHasCheckedForSubscription(false);
              setSubmitting(false);
              setEmailToMigrate("");
            })
            .catch((error) => {
              setSubmitting(false);
              setError(error);
              setSubmitting(false);
              setEmailToMigrate("");
            });
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
            <Field name="password" type="password" />
            <Field name="confirmPassword" type="password" />

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
                "Continue"
              )}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
