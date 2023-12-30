import { useState } from "react";
import { PlanFeature } from "./PlanFeature";
import { Paywall } from "./Paywall";
import { ProductType } from "../../../constants/payments";
import { useWizardStore } from "../../../stores/wizard";

export const ProfileReviewPaywall = () => {
  const { setProfileReviewerWizardComplete } = useWizardStore();
  const [chosenProduct, setChosenProduct] = useState<ProductType | null>(null);

  return (
    <>
      <div className="mt-8">
        <div className="-mt-14">
          <Paywall
            requiredProductsToSkipPaywall={[ProductType.ProfileReview]}
            noThanksHandler={() => setProfileReviewerWizardComplete(true)}
            chosenProduct={chosenProduct}
          >
            {" "}
            {/* Premium AI Profile Plan */}
            <div className="mt-4">
              <div className="bg-white p-3 border-2 border-black rounded-lg">
                <div className="border-b-2 border-black">
                  <h2 className="text-xl font-semibold">
                    Unlock your full review
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
                    {[
                      "Detailed review of your profile",
                      "Action plan to improve your profile",
                      "Unlimited access. Buy once, use forever.",
                      "30 day money back guarantee",
                    ].map((feature: string) => (
                      <PlanFeature
                        icon={
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
                        }
                        feature={feature}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setChosenProduct(ProductType.ProfileReview)}
                  className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                >
                  Activate
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center mb-6">
              <h3
                className="cursor-pointer text-lg text-zinc-500 hover:text-zinc-600 hover:underline"
                onClick={() => setProfileReviewerWizardComplete(true)}
              >
                no thanks
              </h3>
            </div>
          </Paywall>
        </div>
      </div>
    </>
  );
};
