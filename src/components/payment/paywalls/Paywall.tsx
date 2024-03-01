import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../../Loading";
import { getClientSecret, hasUserPaid } from "../../../queries";
import { ClientSecretResponse } from "../../../models/payment";
import { PlanType, ProductType } from "../../../constants/payments";
import { toHeaderCase, toKebabCase } from "js-convert-case";
import PaymentForm from "../PaymentForm";
import { useAuthStore } from "../../../stores/auth";
import { SubscriptionForm } from "../../premium/SubscriptionForm";
import { auth } from "../../../firebase";


interface Props {
  children: any;
  // Which of any of the products they have already paid for which would allow them to skip the paywall
  requiredProductsToSkipPaywall: Array<ProductType>;
  // Which product they want to buy
  chosenProduct: ProductType | null;
  planBeingPurchased: PlanType | null;
  noThanksHandler: () => void;
  email: string;
  redirectHandler?: () => void;
}

export const Paywall = ({
  children,
  requiredProductsToSkipPaywall,
  chosenProduct,
  planBeingPurchased,
  noThanksHandler,
  email,
  redirectHandler,
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [showPlans, setShowPlans] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const {isSubscribed } = useAuthStore();
  // If the user is subscribed, then we can skip the paywall
  useEffect(() => {
    if (isSubscribed) {
      noThanksHandler();
    } else {
    }
  }, [isSubscribed]);

  // Check to see if the user has paid already
  useEffect(() => {
    // get email from the account, if it's not there, then get it somewhere else, stored in the state

    // check that the user has bought this product by calling the API.
    // we send a list of products that if one is bought, we can skip the paywall
    // it returns a list of products bought by that user

    // Only check if the user has paid if they aren't subscribed
    if (isSubscribed === false) {
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
    }
  }, [isSubscribed]);

  // Get the client secret from the server when the component loads
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

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


// {planBeingPurchased ? (
//   <div className="">
//     <div className="mb-3 w-3/4">
//       <h1 className="text-3xl font-bold ml-2">
//         Placeholder placeholder placeholder
//       </h1>
//     </div>
//   </div>
// ) : (
//   <Loading />
// )}

  return (
    <>
      {chosenProduct ? (
        <>
          {clientSecret ? (
            <div className="bg-white rounded-lg border border-black p-4 overflow-y-scroll mt-10">
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
                      returnUrl={
                        chosenProduct === ProductType.AIPhotos
                          ? "https://ai-photo.streamlit.app"
                          : null
                      }
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
          { auth.currentUser && planBeingPurchased ? (
              <div className="" style={{ marginBottom: "4rem" }}>
                <SubscriptionForm planType={planBeingPurchased} />
              </div>
          // planBeingPurchased ? (
          //   <div className="">
          //     <div className="mb-3 w-3/4">
          //       <h1 className="text-3xl font-bold ml-2">
          //         Placeholder placeholder placeholder
          //       </h1>
          //     </div>
          //   </div>
          ) : (
            <>
              {showPlans ? (
                <div className="">
                  <div className="mb-3 w-3/4">
                    <h1 className="text-3xl font-bold ml-2">
                      Get more matches with premium
                    </h1>
                  </div>
                  {children}
                </div>
              ) : (
                <Loading />
              )}
            </>
          )}
         </>
      )}
    </>
  )
};


