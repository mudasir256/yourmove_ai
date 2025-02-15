import { Elements } from "@stripe/react-stripe-js";
import { ReactNode, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../../Loading";
import {
  checkIfUserSubscribed,
  getClientSecret,
  hasUserPaid,
} from "../../../queries";
import { ClientSecretResponse } from "../../../models/payment";
import { PlanType, ProductType } from "../../../constants/payments";
import { toHeaderCase, toKebabCase } from "js-convert-case";
import PaymentForm from "../PaymentForm";
import { useAuthStore } from "../../../stores/auth";
import { SubscriptionForm } from "../../premium/SubscriptionForm";
import { auth } from "../../../firebase";
import { sleep } from "../../../utils";
import { useUIStore } from "../../../stores/ui";
import toast from "react-hot-toast";
import { EventParams, logEvent } from "../../../analytics";


interface Props {
  product: ProductType
  children?: ReactNode;
  // Which of any of the products they have already paid for which would allow them to skip the paywall
  requiredProductsToSkipPaywall: Array<ProductType>;
  // Which product they want to buy
  chosenProduct?: ProductType;
  planBeingPurchased?: PlanType | null;
  noThanksHandler: () => void;
  email: string;
  redirectHandler?: () => void;
  onComplete?: VoidFunction
}

export const Paywall = ({
  product = ProductType.ProfileWriter,
  children,
  requiredProductsToSkipPaywall,
  chosenProduct = undefined,
  planBeingPurchased = undefined,
  noThanksHandler,
  email,
  redirectHandler,
  onComplete
}: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [showPlans, setShowPlans] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const { isSubscribed, setIsSubscribed } = useAuthStore();
  const { setPaymentIsLoading, abTestGroup } = useUIStore();
  const { setAuthModalIsOpen, authModalIsOpen, setShowAuthSubscriptionDisclaimer } = useAuthStore();
  const [showAuthModalAfterPayment, setShowAuthModalAfterPayment] = useState(false)

  useEffect(() => {
    if (!authModalIsOpen && !auth.currentUser && showAuthModalAfterPayment) {
      // authModal closed without login / signup in
      noThanksHandler();
      setPaymentIsLoading(false);
      setShowAuthModalAfterPayment(false)
    }
  }, [showAuthModalAfterPayment, authModalIsOpen])

  useEffect(() => {
    // If the user is subscribed, then we can skip the paywall
    if (isSubscribed) {
      noThanksHandler();
    } else if (isSubscribed === false) {
      // check that the user has bought this product by calling the API.
      // we send a list of products that if one is bought, we can skip the paywall
      // it returns a list of products bought by that user

      // Only check if the user has paid if they aren't subscribed
      if (email) {
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
      } else {
        setShowPlans(true)
      }
    }
  }, [isSubscribed]);

  // Get the client secret from the server when the component loads
  useEffect(() => {
    if (chosenProduct) {
      const referral = window.tolt_referral
      getClientSecret(email, chosenProduct, abTestGroup, referral).then((response) => {
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

  const logPurchaseEvent = () => {
    const params: EventParams = {
      amount: planBeingPurchased === PlanType.Monthly ? '14' : '60',
      payment_type: planBeingPurchased === PlanType.Monthly ? 'monthly' : 'annual'
    }
    logEvent('purchase_activate', product, params, 'payment')
  }

  const logProductPurchaseEvent = () => {
    const params: EventParams = {
      amount: product === ProductType.ProfileWriter && abTestGroup ? '19' : '19',
      payment_type: 'oneoff'
    }
    logEvent('purchase_activate', product, params, 'payment')
  }

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
                    {/* TODO:: Check redirect handler for one time */}
                    <PaymentForm
                      redirectSuffix={toKebabCase(chosenProduct)}
                      redirectHandler={async () => {
                        logProductPurchaseEvent()
                        redirectHandler?.()
                        noThanksHandler();
                        setPaymentIsLoading(false);
                        onComplete?.()
                      }}
                      returnUrl={
                        chosenProduct === ProductType.AIPhotos
                          ? "https://ai-photo.streamlit.app/"
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
          {/*auth.currentUser &&*/ planBeingPurchased ? (
            <div className="" style={{ marginBottom: "4rem" }}>
              <SubscriptionForm
                planType={planBeingPurchased}
                email={auth.currentUser?.email ?? email}
                redirectHandler={async () => {
                  if (auth.currentUser) {
                    let iterations = 0;
                    const idTokenResult =
                      await auth.currentUser.getIdTokenResult();
                    let isSubscribed = false;
                    while (isSubscribed === false && iterations < 10) {
                      const isSubscribedResponse = await checkIfUserSubscribed(
                        idTokenResult.token
                      );
                      sleep(1000);
                      iterations++;
                      if (isSubscribedResponse.data.isSubscribed) {
                        isSubscribed = true;
                        setIsSubscribed(true);
                        noThanksHandler();
                        setPaymentIsLoading(false);
                      }
                    }

                    if (!isSubscribed) {
                      toast.error(
                        "You Subscribed but there was an error getting your subscription. Automatically refreshing page"
                      );
                      setTimeout(() => {
                        window.location.reload();
                      }, 3000);
                      setPaymentIsLoading(false);
                    }
                    onComplete?.()
                  } else {
                    // open login
                    onComplete?.()
                    setShowAuthModalAfterPayment(true)
                    noThanksHandler();
                    setPaymentIsLoading(false);
                    // open auth modal
                    setShowAuthSubscriptionDisclaimer(true)
                    setAuthModalIsOpen(true)
                  }
                  logPurchaseEvent()
                }}
              />
            </div>
          ) : (
            <>
              {showPlans ? (
                <div className="">
                  <div className="mb-3 w-3/4">
                    <h1 className="text-3xl font-bold ml-2">
                      3x your success in online dating in 30 minutes or less
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
  );
};
