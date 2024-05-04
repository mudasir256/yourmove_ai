import { Elements } from "@stripe/react-stripe-js";
import { Appearance, StripeElementsOptionsMode, loadStripe } from "@stripe/stripe-js";
import { ProductType } from "../../../constants/payments";
import { toHeaderCase } from "js-convert-case";
import { useAuthStore } from "../../../stores/auth";
import AIPhotosPaymentForm from "../AIPhotosPaymentForm";


interface Props {
  email?: string;
  returnUrl: string
  redirectHandler?: () => void;
}

export const AIPhotosPaywall = ({
  email,
  returnUrl,
  redirectHandler,
}: Props) => {
  const { isSubscribed } = useAuthStore();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptionsMode = {
    mode: 'payment',
    amount: isSubscribed ? 1700 : 3400,
    currency: 'usd',
    appearance,
  };

  return (
    <div className="bg-white rounded-lg border border-black p-4 overflow-y-scroll mt-10">
      <div className="flex mb-4">
        <div className="w-1/3 font-semibold">
          {toHeaderCase(ProductType.AIPhotos)}
        </div>
        <div className="w-2/3 flex justify-end items-center">
          ${isSubscribed ? '17' : '34'} once off
        </div>
      </div>
      <div className="mt-1">
        <Elements options={options} stripe={stripePromise}>
          <AIPhotosPaymentForm
            email={email}
            returnUrl={returnUrl}
            redirectHandler={redirectHandler} />
        </Elements>
      </div>

    </div>
  );
};