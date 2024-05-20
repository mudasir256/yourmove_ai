import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import { useUIStore } from "../../stores/ui";
import { createSubscription } from "../../queries";
import { PlanType } from "../../constants/payments";
import { useAuthStore } from "../../stores/auth";
import { auth } from "../../firebase";

interface Props {
  redirectSuffix: string;
  redirectHandler?: () => void;
  returnUrl?: string | null;
  email: string
  planType: PlanType
}

export default function SubscriptionPaymentForm({
  redirectSuffix,
  redirectHandler,
  returnUrl,
  email,
  planType
}: Props) {
  const { abTestGroup } = useUIStore()
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const { paymentIsLoading, setPaymentIsLoading } = useUIStore();
  const {
    setSubscriptionEmail,
    setSubscriptionId
  } = useAuthStore();

  const validateEmail = () => {
    if (!email) return false
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const check = emailRegex.test(email);
    return check
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!validateEmail()) {
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

    const subscriptionResponse = await createSubscription({ email, term: planType, group: abTestGroup })
    const { data: { clientSecret = undefined, subscriptionId = undefined } = {} } = subscriptionResponse || {}

    if (!clientSecret) {
      setPaymentIsLoading(false);
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl
          ? returnUrl
          : `${import.meta.env.VITE_UI_BASE_URL}/${redirectSuffix}`,
      },
      redirect: redirectHandler ? "if_required" : "always",
    });

    // This point is reached if we have a payment intent
    if (paymentIntent && paymentIntent.status === "succeeded") {
      if (!auth.currentUser || !auth.currentUser?.email) {
        setSubscriptionEmail(email)
        setSubscriptionId(subscriptionId)
      }

      if (redirectHandler) {
        redirectHandler();
      }
      return
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
