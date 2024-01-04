import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ErrorAlert } from "../ErrorAlert";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/auth";
import { successfulSignUp } from "../../utils";

export const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { setAuthModalIsOpen } = useAuthStore();

  return (
    <>
      <Formik
        initialValues={{}}
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Please enter a valid email")
            .required("Required"),
          password: yup.string().required("Required"),
          confirmPassword: yup
            .string()
            .required("Required")
            .test("passwords-match", "Passwords must match", function (value) {
              return this.parent.password === value;
            }),
        })}
        onSubmit={async (values: any) => {
          setError("");
          setSubmitting(true);
          try {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            successfulSignUp();
          } catch (error) {
            console.log("error");
            if (error.code === "auth/email-already-in-use") {
              console.log("email already in use");
              setError("Email already in use");
            }
          }
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue, errors }) => (
          <form>
            {error && (
              <div className="mb-4 -mt-2">
                <ErrorAlert error={error} />
              </div>
            )}
            <Field name="email" type="email" />
            <Field name="password" type="password" />
            <Field name="confirmPassword" type="password" />

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit()}
              className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-2 rounded-md font-semibold -mb-1 disabled:opacity-70 disabled:cursor-not-allowed"
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
                "Sign up"
              )}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};