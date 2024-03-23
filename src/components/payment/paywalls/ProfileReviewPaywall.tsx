import { useState } from "react";
import { PlanFeature } from "./PlanFeature";
import { Paywall } from "./Paywall";
import { LearnMoreModal } from "../../modals/LearnMoreModal";
import { ProductType } from "../../../constants/payments";
import { PlanType } from "../../../constants/payments";
import { useWizardStore } from "../../../stores/wizard";
import { auth } from "../../../firebase";
import { useAuthStore } from "../../../stores/auth";


export const ProfileReviewPaywall = () => {
  const { profileReviewerStepResults, setProfileReviewerWizardComplete } =
    useWizardStore();
  const [chosenProduct, setChosenProduct] = useState<ProductType | null>(null);
  const [planBeingPurchased, setPlanBeingPurchased] = useState<PlanType | null>(null);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const { setAuthModalIsOpen } = useAuthStore();


  return (
    <>
      <LearnMoreModal
        open={learnMoreModalOpen}
        setOpen={setLearnMoreModalOpen}
        setChosenProduct={setChosenProduct}
      />

      <div className="mt-8">
        <div className="-mt-14">
          <Paywall
            email={profileReviewerStepResults.email}
            requiredProductsToSkipPaywall={[
              ProductType.ProfileReview,
              ProductType.AIPhotos,
            ]}
            noThanksHandler={() => setProfileReviewerWizardComplete(true)}
            chosenProduct={chosenProduct}
            planBeingPurchased={planBeingPurchased}
          >
            {" "}
            {/* Premium AI Profile Plan */}
            <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <div className="flex">
                      <h2 className="text-xl font-semibold mr-2">
                        All Access
                      </h2>
                      <span className="text-sm font-semibold text-red-400 bg-red-100 py-1 px-2 rounded">
                        popular
                      </span>
                    </div>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$9</h1>
                      </div>
                      <div className="pl-3">
                        <h1 className="text-zinc-500 leading-4">
                          per <br /> month
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold"><b>Unlimited </b>access to:</h4>
                    <div className="mt-1">
                      {[
                          "Review of you profile and photos + action plan",
                          "Write bios that show catch attention and highlight your best self",
                          "Personalized conversation starters for 2.4x more conversion",
                          "AI texting assistant",
                          "Works with Hinge, Tinder, Bumble, and more",
                          "50% off AI-enhanced photos",
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
                    // onClick={() => { setPlanBeingPurchased(PlanType.Monthly);}}
                    onClick={() => {
                      setPlanBeingPurchased(PlanType.Monthly);
                      // If the user isn't signed in, we need to sign them in or sign up
                      if (!auth.currentUser) {
                        setAuthModalIsOpen(true);
                      }
                    }}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                </div>
              </div>
            {/* <div className="mt-4">
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
            </div> */}
            
            {/* AI enhanced photos */}

            <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      Premium Profile Review
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$12</h1>
                      </div>
                      <div className=" pl-3">
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
                    className="mt-4 flex items-center justify-center w-full bg-black text-white py-3 rounded-full font-semibold -mb-1"
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
            {/* <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      AI Review + Photos
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$37</h1>
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
                      {[
                        "Touch up your photos to show your best self",
                        "Declutter your background",
                        "44% more matches on average",
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

                  <div className="mt-2">
                    <h4 className="font-semibold text-sm md:text-md">
                      What we won't do
                    </h4>
                    <div className="mt-1">
                      {[
                        "Create fake-looking photos",
                        "Make you taller or give you a dog",
                      ].map((feature: string) => (
                        <PlanFeature icon={<>✗</>} feature={feature} />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setChosenProduct(ProductType.AIPhotos)}
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
                onClick={() => setProfileReviewerWizardComplete(true)}
              >
                no thanks
              </h3>
            </div> */}
          </Paywall>
        </div>
      </div>
    </>
  );
};
