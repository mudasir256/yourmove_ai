import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51MlBoME7ZMI8bNeHk4StWcYgnYZuzEEGKT6eEy26qvZ7JuKQsD5piXBAVFOgi5j3u10fUWuuGFI8jLEm5Iic40Ky00umAHNi43"
);

export const PaymentForm = () => {
  const clientSecret = "";
  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};
