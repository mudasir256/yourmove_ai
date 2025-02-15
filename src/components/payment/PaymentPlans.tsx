import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { getClientSecret, hasUserPaid } from "../../queries";
import { ClientSecretResponse } from "../../models/payment";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { Loading } from "../Loading";
import { useProfileStore } from "../../stores/profile";
import { LearnMoreModal } from "../modals/LearnMoreModal";

const PLAN_FEATURES = [
  "Profiles for Hinge, Tinder and more",
  "Unlimited profiles. Pay once, use forever.",
  "7 day money back guarantee",
];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface Props {
  noThanksHandler: () => void;
  stepResults: Record<string, string>;
}

export const PaymentPlans = ({ noThanksHandler, stepResults }: Props) => {
  const { setStep } = useProfileStore();
  const [chosenPlan, setChosenPlan] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showPlans, setShowPlans] = useState(false);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

  // Check to see if the user has paid already
  useEffect(() => {
    hasUserPaid(stepResults.email).then((response) => {
      if (response.data.hasPaid) {
        // Already paid, go to profile step
        skipPlans();
      } else {
        setShowPlans(true);
      }
    });
  }, []);

  // Get the client secret from the server when the component lodas
  useEffect(() => {
    if (chosenPlan) {
      getClientSecret(stepResults.email, "premium_profile").then((response) => {
        const clientSecretResponse = response.data as ClientSecretResponse;
        setClientSecret(clientSecretResponse.clientSecret);
      });
    }
  }, [chosenPlan]);

  const skipPlans = () => {
    noThanksHandler();
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return showPlans ? (
    <>
      <LearnMoreModal
        open={learnMoreModalOpen}
        setOpen={setLearnMoreModalOpen}
      />
      <div className="mt-8">
        <div className="-mt-14">
          <div className="mb-3 w-3/4">
            <h1 className="text-3xl font-bold ml-2">
              3x Your Matches with Premium
            </h1>
          </div>

          {chosenPlan ? (
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
              {" "}
              {/* Premium AI Profile Plan */}
              <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      Premium AI Profile
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$12</h1>
                      </div>
                      <div className="pl-3">
                        <h1 className="text-zinc-500 leading-4">
                          one-time <br /> payment
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h4 className="font-semibold">What's included:</h4>
                    <div className="mt-1">
                      {PLAN_FEATURES.map((feature: string) => {
                        return (
                          <div
                            className="flex text-sm md:text-md"
                            key={feature}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            <div className="ml-1.5">{feature}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setChosenPlan("premium_profile")}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                </div>
              </div>
              {/* Professional Profile Redesign */}
              <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      Professional Profile Redesign
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$60</h1>
                      </div>
                      <div className=" pl-3">
                        <h1 className="text-zinc-500 leading-4">
                          one-time <br /> payment
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h4 className="font-semibold text-sm md:text-md">
                      Everything in AI Profile +
                    </h4>
                    <div className="mt-1">
                      <p className="leading-5 text-sm md:text-md">
                        Work side by side with a dating coach to{" "}
                        <span className="font-bold">rebuild your profile</span>{" "}
                        from the ground up,{" "}
                        <span className="font-bold">
                          choose your best photos
                        </span>
                        , and collaboratively{" "}
                        <span className="font-bold">write your bio</span>.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center justify-center w-full bg-black text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>

                  <div className="flex items-center justify-center mt-4 -mb-1">
                    <h3
                      className="text-lg underline cursor-pointer"
                      onClick={() => setLearnMoreModalOpen(true)}
                    >
                      learn more
                    </h3>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center mb-6">
                <h3
                  className="cursor-pointer text-lg text-zinc-500 hover:text-zinc-600 hover:underline"
                  onClick={() => {
                    noThanksHandler()
                  }
                  }
                >
                  no thanks
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};
