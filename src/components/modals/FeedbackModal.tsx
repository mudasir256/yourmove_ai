import { useEffect } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { submitFeedback } from "../../queries";
import toast from "react-hot-toast";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FeedbackModal = ({ open, setOpen }: Props) => {

  // Make modal show after X time
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 15000);
  }, []);

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex items-center justify-center">
          <div className="max-w-lg">
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
              <h1 className="text-2xl font-semibold">Tell us what you think</h1>
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
                submitFeedback(values).then((res) => {
                  toast.success("Feedback submitted! Thank you!");
                });
                setOpen(false);
              }}
              enableReinitialize
            >
              {({ handleSubmit, setFieldValue, errors }) => (
                <form>
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
                      onChange={(e) => setFieldValue("details", e.target.value)}
                      className={`border w-full rounded-lg py-2 px-4 mb-4 ${
                        errors.details ? "border-red-500" : "border-black"
                      } `}
                    />
                    {errors.details && (
                      <div className="-mt-3 mb-8 text-xs text-red-500">
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
      </Modal>
    </>
  );
};
