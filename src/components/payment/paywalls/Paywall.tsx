import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PaymentForm from "../PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../../Loading";
import { getClientSecret, hasUserPaid } from "../../../queries";
import { ClientSecretResponse } from "../../../models/payment";
import { ProductType } from "../../../constants/payments";

interface Props {
  children: any;
  // Which of any of the products they have already paid for which would allow them to skip the paywall
  requiredProductsToSkipPaywall: Array<ProductType>;
  // Which product they want to buy
  chosenProduct: ProductType | null;
  noThanksHandler: () => void;
}

// todo: change this to the email from the wizard
const email = "mark@mail.com";

export const Paywall = ({
  children,
  requiredProductsToSkipPaywall,
  chosenProduct,
  noThanksHandler,
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [showPlans, setShowPlans] = useState(false);

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
            <div className="bg-white mt-8 p-6 rounded-md shadow-md">
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm />
              </Elements>
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
