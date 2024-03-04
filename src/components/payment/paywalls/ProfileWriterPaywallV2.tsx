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
              ProductType.AIPhotosWriter,
            ]}
            noThanksHandler={() => setProfileWriterWizardComplete(true)}
            chosenProduct={chosenProduct}
          >
            <div className="pb-20">
              {" "}
              {/* Profile Writer Plan */}
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                    <h2 className="text-xl font-semibold text-center">
                        Unlock profile optimized for right swipes
                    </h2>
                    <div className="flex justify-between mt-2 mb-3 items-center">
                        <div>
                            <h1 className="text-4xl font-semibold">$10</h1>
                            <p className="text-zinc-500">/month</p>
                        </div>
                    </div>
                    <h4 className="font-semibold">What's included:</h4>
                    <div className="mt-1">
                            {[
                                "Profile Writer",
                                "Unlimited Replies and Openers for more matches",
                                "AI Profile Review",
                                "50% Discount on AI Profile Photos",
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
                    <button
                        type="button"
                        onClick={() => setChosenProduct(ProductType.ProfileWriter)}
                        className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-lg font-semibold"
                    >
                        Choose This Plan
                    </button>
                {/* Profile Writer Plan */}
                    <h2 className="text-xl font-semibold text-center">
                        Unlock profile optimized for right swipes
                    </h2>
                    <div className="flex justify-between mt-2 mb-3 items-center">
                        <div>
                            <h1 className="text-4xl font-semibold">$10</h1>
                            <p className="text-zinc-500">/month</p>
                        </div>
                    </div>
                    <h4 className="font-semibold">What's included:</h4>
                    <div className="mt-1">
                            {[
                                "Profiles for Hinge, Tinder, and more",
                                "AI generated, matchmaker approved",
                                "A/B tested for maximum success",
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
                    <button
                        type="button"
                        onClick={() => setChosenProduct(ProductType.AIPhotos)}
                        className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-lg font-semibold"
                        >
                        Choose This Plan Instead
                    </button>
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
            </div>
          </Paywall>
        </div>
      </div>
    </>
  );
};
