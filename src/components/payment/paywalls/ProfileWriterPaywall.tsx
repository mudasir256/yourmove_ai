import { useState, useEffect } from "react";
import { LearnMoreModal } from "../../modals/LearnMoreModal";
import { PlanFeature } from "./PlanFeature";
import { Paywall } from "./Paywall";
import { ProductType } from "../../../constants/payments";
import { useWizardStore } from "../../../stores/wizard";
import { PlanType } from "../../../constants/payments";
import { useUIStore } from "../../../stores/ui";
import { useNavigate } from "react-router-dom";

interface Props {
  hideNoThanks?: boolean;
  onComplete?: VoidFunction
}

export const ProfileWriterPaywall = ({ hideNoThanks, onComplete }: Props) => {
  const navigate = useNavigate();
  const { profileWriterStepResults, setProfileWriterWizardComplete } =
    useWizardStore();
  const { abTestGroup } = useUIStore()
  const [chosenProduct, setChosenProduct] = useState<ProductType | null>(null);
  const [planBeingPurchased, setPlanBeingPurchased] = useState<PlanType | null>(
    null
  );
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'writer_paywall', {
        event_category: 'funnel', product: 'profile_writer',
      });
    }
  }, []);

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', abTestGroup === 0 ? 'experiment_writer_paywall_A' : 'experiment_writer_paywall_B', {
        event_category: 'funnel', product: 'profile_writer',
      })
    }
  }, [abTestGroup])

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
            planBeingPurchased={planBeingPurchased}
            onComplete={onComplete}
          >
            <div className="pb-20">
              {" "}
              {/* Premium AI Profile Plan */}
              <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <div className="flex">
                      <h2 className="text-xl font-semibold mr-2">All Access</h2>
                      <span className="text-sm font-semibold text-red-400 bg-red-100 py-1 px-2 rounded">
                        popular
                      </span>
                    </div>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">{abTestGroup ? '$14' : '$12'}</h1>
                      </div>
                      <div className="pl-3">
                        <h1 className="text-zinc-500 leading-4">
                          per <br /> month
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">
                      <b>Unlimited </b>access to:
                    </h4>
                    <div className="mt-1">
                      {[
                        "Write bios that show catch attention and highlight your best self",
                        "Review of you profile and photos + action plan",
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
                    onClick={() => {
                      setPlanBeingPurchased(PlanType.Monthly);
                      if ((window as any).gtag) {
                        (window as any).gtag('event', 'writer_purchase_monthly', {
                          event_category: 'funnel', product: 'profile_writer',
                        })
                          (window as any).gtag('event', abTestGroup === 0 ? 'experiment_writer_activate_subscription_A' : 'experiment_writer_activate_subscription_B', {
                            event_category: 'funnel', product: 'profile_writer',
                          })
                      }
                      // If the user isn't signed in, we need to sign them in or sign up
                      // if (!auth.currentUser) {
                      //   setAuthModalIsOpen(true);
                      // }
                    }}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                  <p className="my-2 text-center font-medium">OR</p>
                  <button
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                    onClick={() => navigate('/user-referrals')}>
                    Share for free access
                  </button>
                </div>
              </div>
              {/* AI profile */}
              <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      Premium AI Profile
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">{abTestGroup ? '$19' : '$15'}</h1>
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
                        "Complete your whole profile",
                        "120+ top prompts from Hinge, Bumble, CmB, and more",
                        "Access to our best AI models for best results",
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
                    onClick={() => {
                      setChosenProduct(ProductType.ProfileWriter)
                      if ((window as any).gtag) {
                        (window as any).gtag('event', 'writer_purchase_oneoff', { event_category: 'funnel', product: 'profile_writer', })
                          (window as any).gtag('event', abTestGroup === 0 ? 'experiment_writer_activate_onetime_A' : 'experiment_writer_activate_onetime_B', { event_category: 'funnel', product: 'profile_writer', })
                      }
                    }
                    }
                    className="mt-4 flex items-center justify-center w-full bg-black text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                </div>
              </div>
              {!hideNoThanks && (
                <div className="mt-4 flex items-center justify-center mb-6">
                  <h3
                    className="cursor-pointer text-lg text-zinc-500 hover:text-zinc-600 hover:underline"
                    onClick={() => {
                      if ((window as any).gtag) { (window as any).gtag('event', 'no_thanks', { event_category: 'funnel', product: 'profile_writer', }) }
                      window.scrollTo(0, 0);
                      setProfileWriterWizardComplete(true);
                    }}
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
