import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useUIStore } from "../../stores/ui";

interface Props {
  redirectSuffix: string;
  redirectHandler?: () => void;
  // Optional return URL to override. Good for when we need to redirect to https://tally.so/r/nPz9DP
  returnUrl?: string | null;
}

export default function PaymentForm({
  redirectSuffix,
  redirectHandler,
  returnUrl,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const { paymentIsLoading, setPaymentIsLoading } = useUIStore();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    setPaymentIsLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl
          ? returnUrl
          : `${import.meta.env.VITE_UI_BASE_URL}/${redirectSuffix}`,
      },
      redirect: redirectHandler ? "if_required" : "always",
    });

    // This point is reached if we have a payment intent
    if (paymentIntent && paymentIntent.status === "succeeded") {
      if (redirectHandler) {
        redirectHandler();
      }
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    console.log(error);

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
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
