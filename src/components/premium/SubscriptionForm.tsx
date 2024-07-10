import { PlanType } from "../../constants/payments";
import { useEffect } from "react";
import SubscriptionPaymentForm from "../payment/SubscriptionPaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, StripeElementsOptionsMode, loadStripe } from "@stripe/stripe-js";
import { useUIStore } from "../../stores/ui";

interface Props {
  planType: PlanType;
  redirectHandler?: () => void;
  email?: string
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const SubscriptionForm = ({ planType, redirectHandler, email = undefined }: Props) => {
  const { setSubscriptionSuccess, setStopScroll, abTestGroup } = useUIStore();

  // When the subscription form is showing, we want to re-enable scrolling
  useEffect(() => {
    setStopScroll(false);
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptionsMode = {
    mode: 'subscription',
    amount: planType === PlanType.Monthly ? (abTestGroup ? 1400 : 1400) : (abTestGroup ? 6000 : 6000),
    currency: 'usd',
    appearance,
  };

  return (
    <div className="mx-4 bg-white rounded-lg border border-black p-4 mt-4">
      <Elements stripe={stripePromise} options={options}>
        <SubscriptionPaymentForm
          email={email}
          planType={planType}
          redirectSuffix="/"
          redirectHandler={() => {
            if (redirectHandler) {
              redirectHandler();
            } else {
              setTimeout(() => {
                setSubscriptionSuccess(true);
              }, 2000);
            }
          }}
        />
      </Elements>
    </div >
  )
};
