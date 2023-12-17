import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Field } from "../Field";
import { OAuthOptions } from "./OAuthOptions";

export const SignIn = () => {
  const [showOptions, setShowOptions] = useState(true);
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
              onClick={() => alert("nothing")}
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
          onSubmit={(values, actions) => {
            console.log("submit");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, errors }) => (
            <form>
              <Field name="email" type="email" />
              <Field name="password" type="password" />

              <button
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
                Sign in
              </button>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
