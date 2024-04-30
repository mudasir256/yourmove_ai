import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import { useUIStore } from "../../stores/ui";
import { paymentIntentForAIPhotos } from "../../queries";
import { auth } from "../../firebase";

interface Props {
  redirectHandler?: () => void;
  returnUrl: string;
  email?: string
}

export default function AIPhotosPaymentForm({
  redirectHandler,
  returnUrl,
  email,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const { paymentIsLoading, setPaymentIsLoading } = useUIStore();
  const [userEmail, setUserEmail] = useState(email)

  const validateEmail = () => {
    if (!userEmail) return false
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const check = emailRegex.test(userEmail);
    return check
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!userEmail || !validateEmail()) {
      setMessage("Please enter a valid email.")
      return;
    }

    setMessage(null)
    setPaymentIsLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(`${submitError.message ? submitError.message : "An unknown error occurred!"}`)
      setPaymentIsLoading(false);
      return;
    }

    const intentResponse = await paymentIntentForAIPhotos(userEmail)
    const { data: { clientSecret = undefined } = {} } = intentResponse || {}

    if (!clientSecret) {
      setPaymentIsLoading(false);
      return
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl
      },
      redirect: "if_required",
    });

    if (paymentIntent && paymentIntent.status === "succeeded" && redirectHandler) {
      redirectHandler();
      return;
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error) {
      setMessage(`${error.message ? error.message : "An unknown error occurred!"}`)
      setPaymentIsLoading(false);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div id="payment-form" className="max-h-90">
      <div className="my-4">
        {!auth.currentUser && (
          <>
            <label className="block mb-2 text-zinc-700">Email</label>
            <input
              className="p-2 w-full border-solid border-[1px] border-neutral-200 rounded"
              type="text"
              value={email}
              placeholder="Enter email"
              onChange={e => setUserEmail(e.target.value)}
            />
          </>
        )}
      </div>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        type="button"
        onClick={(e) => handleSubmit(e)}
        // disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
      >
        <span id="button-text">
          {paymentIsLoading ? (
            <div className="flex items-center justify-center">
              Processing
              <svg
                className="animate-spin -ml-1 ml-3 h-5 w-5 text-white"
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
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div className="rounded-md bg-red-50 p-4 mt-5">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{message}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
