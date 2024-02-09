import { useState } from "react";
import { LearnMoreModal } from "../../modals/LearnMoreModal";
import { PlanFeature } from "./PlanFeature";
import { Paywall } from "./Paywall";
import { ProductType } from "../../../constants/payments";
import { useWizardStore } from "../../../stores/wizard";

interface Props {
  hideNoThanks?: boolean;
}

export const ProfileWriterPaywall = ({ hideNoThanks }: Props) => {
  const { profileWriterStepResults, setProfileWriterWizardComplete } =
    useWizardStore();
  const [chosenProduct, setChosenProduct] = useState<ProductType | null>(null);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

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
            email={profileWriterStepResults.email}
            requiredProductsToSkipPaywall={[
              ProductType.ProfileWriter,
              ProductType.AIPhotos,
            ]}
            noThanksHandler={() => setProfileWriterWizardComplete(true)}
            chosenProduct={chosenProduct}
          >
            <div className="pb-20">
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
                        <h1 className="text-4xl font-semibold">$10</h1>
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
                        "Profiles for Hinge, Tinder and more",
                        "Unlimited profiles. Pay once, use forever.",
                        "7 day money back guarantee",
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
                    onClick={() => setChosenProduct(ProductType.ProfileWriter)}
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
                      AI Profile + Photos
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$34</h1>
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
              {!hideNoThanks && (
                <div className="mt-4 flex items-center justify-center mb-6">
                  <h3
                    className="cursor-pointer text-lg text-zinc-500 hover:text-zinc-600 hover:underline"
                    onClick={() => {
                      console.log('test - 123');
                      window.scrollTo(0, 0);
                      setProfileWriterWizardComplete(true);
                    }
                    }
                  >
                    no thanks
                  </h3>
                </div>
              )}
            </div>
          </Paywall>
        </div>
      </div>
    </>
  );
};
