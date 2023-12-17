import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";

export const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  return (
    <>
      {emailSent ? (
        <p>Password recovery link is sent!</p>
      ) : (
        <Formik
          initialValues={{}}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Please enter a valid email")
              .required("Required"),
          })}
          onSubmit={(values, actions) => {
            console.log("submit");
            setEmailSent(true);
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, errors }) => (
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
                Reset Password
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
