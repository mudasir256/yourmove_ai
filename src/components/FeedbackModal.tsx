import { useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";

export const FeedbackModal = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  // Make modal show after X time
  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpen(true);
  //   }, 1000);
  // }, []);

  return (
    <>
      {open ? (
        <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 border-2 border-black w-full z-50 mx-8">
            <div className="w-full">
              <div className="w-full flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 text-zinc-400 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-center -mt-3">
                <h1 className="text-2xl font-semibold">
                  Tell us what you think
                </h1>
              </div>
              <div className="flex items-center justify-center mt-2">
                <p>Thoughts, feedback, suggestions or bugs</p>
              </div>
              <Formik
                initialValues={{}}
                validationSchema={yup.object({
                  topic: yup.string().required("Required"),
                  email: yup.string().email("Enter a valid email"),
                  details: yup.string().required("Required"),
                })}
                onSubmit={(values, actions) => {
                  console.log("here");
                  console.log(values);
                  setOpen(false);
                }}
                enableReinitialize
              >
                {({ handleSubmit, setFieldValue, errors }) => (
                  <form>
                    <>{console.log(errors)}</>
                    <div className="mt-5 sm:mt-6">
                      <Field
                        name="topic"
                        placeholder="Topic"
                        className={`border w-full rounded-lg py-2 px-4 mb-4 ${
                          errors.topic ? "border-red-500" : "border-black"
                        } `}
                      />
                      {errors.topic && (
                        <div className="-mt-3 mb-3 text-xs text-red-500">
                          {errors.topic}
                        </div>
                      )}
                      <Field
                        name="email"
                        placeholder="Email (optional)"
                        className={`border w-full rounded-lg py-2 px-4 mb-4 ${
                          errors.email ? "border-red-500" : "border-black"
                        } `}
                      />
                      {errors.email && (
                        <div className="-mt-3 mb-3 text-xs text-red-500">
                          {errors.email}
                        </div>
                      )}
                      <textarea
                        name="details"
                        placeholder="Details"
                        onChange={(e) =>
                          setFieldValue("details", e.target.value)
                        }
                        className={`border w-full rounded-lg py-2 px-4 mb-4 ${
                          errors.details ? "border-red-500" : "border-black"
                        } `}
                      />
                      {errors.details && (
                        <div className="-mt-3 mb-3 text-xs text-red-500">
                          {errors.details}
                        </div>
                      )}
                      <div className="-mt-6">
                        <button
                          type="button"
                          onClick={() => handleSubmit()}
                          className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1 border border-transparent"
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
