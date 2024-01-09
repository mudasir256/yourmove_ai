import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../../Loading";
import { getClientSecret, hasUserPaid } from "../../../queries";
import { ClientSecretResponse } from "../../../models/payment";
import { ProductType } from "../../../constants/payments";
import { toHeaderCase, toKebabCase } from "js-convert-case";
import PaymentForm from "../PaymentForm";
import { useUIStore } from "../../../stores/ui";

interface Props {
  children: any;
  // Which of any of the products they have already paid for which would allow them to skip the paywall
  requiredProductsToSkipPaywall: Array<ProductType>;
  // Which product they want to buy
  chosenProduct: ProductType | null;
  noThanksHandler: () => void;
  email: string;
  redirectHandler?: () => void;
}

export const Paywall = ({
  children,
  requiredProductsToSkipPaywall,
  chosenProduct,
  noThanksHandler,
  email,
  redirectHandler,
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [showPlans, setShowPlans] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const { setStopScroll } = useUIStore();

  // Stop the scroll when the paywall is open
  // useEffect(() => {
  //   setStopScroll(true);
  // }, []);

  // Check to see if the user has paid already
  useEffect(() => {
    // get email from the account, if it's not there, then get it somewhere else, stored in the state

    // check that the user has bought this product by calling the API.
    // we send a list of products that if one is bought, we can skip the paywall
    // it returns a list of products bought by that user
    hasUserPaid(email, requiredProductsToSkipPaywall).then((response) => {
      // if any products bought by the user are in the requiredProductsToSkipPaywall
      if (
        response.data.purchasedProducts.some((product: ProductType) =>
          requiredProductsToSkipPaywall.includes(product)
        )
      ) {
        // then we can skip the paywall
        noThanksHandler();
      } else {
        // else, show plans as they haven't paid
        setShowPlans(true);
      }
    });
  }, []);

  // Get the client secret from the server when the component lodas
  useEffect(() => {
    if (chosenProduct) {
      getClientSecret(email, chosenProduct).then((response) => {
        const clientSecretResponse = response.data as ClientSecretResponse;
        setClientSecret(clientSecretResponse.clientSecret);
        // Divide by 100 as the price is in cents (because of Stripe)
        setPrice((clientSecretResponse.price / 100).toFixed(2));
      });
    }
  }, [chosenProduct]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  const stripePromise = loadStripe(
    "pk_test_51Lm3WZDEUIiuNNmxpeslz6iwYRn1XcrQ4qahHfuAzZ7Iffeso3dlKKBGRsqclvzSF1Vgj1q1aX0RuIWdiqJy6W4l00lnH5rauz"
  );

  return (
    <>
      {chosenProduct ? (
        <>
          {clientSecret ? (
            <div className="mx-4 bg-white rounded-lg border border-black p-4 mt-2 overflow-y-scroll">
              <div className="flex mb-4">
                <div className="w-1/3 font-semibold">
                  {toHeaderCase(chosenProduct)}
                </div>
                <div className="w-2/3 flex justify-end items-center">
                  ${price} once off
                </div>
              </div>
              {clientSecret && (
                <div className="mt-1">
                  <Elements options={options} stripe={stripePromise}>
                    <PaymentForm
                      redirectSuffix={toKebabCase(chosenProduct)}
                      redirectHandler={redirectHandler}
                    />
                  </Elements>
                </div>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <>
          {showPlans ? (
            <>
              <div className="mb-3 w-3/4">
                <h1 className="text-3xl font-bold ml-2">
                  Get more matches with premium
                </h1>
              </div>
              {children}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};
