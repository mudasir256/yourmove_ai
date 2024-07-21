import { useState } from "react";
import { LearnMoreModal } from "../../modals/LearnMoreModal";
import { PlanFeature } from "./PlanFeature";
import { Paywall } from "./Paywall";
import { ProductType } from "../../../constants/payments";
import { useWizardStore } from "../../../stores/wizard";
import { PlanType } from "../../../constants/payments";
import { EventParams, logEvent, useLogEvent } from "../../../analytics";

interface Props {
  hideNoThanks?: boolean;
  onComplete?: VoidFunction
}

export const ProfileWriterPaywall = ({ hideNoThanks, onComplete }: Props) => {
  const { profileWriterStepResults, setProfileWriterWizardComplete } =
    useWizardStore();
  const [planBeingPurchased, setPlanBeingPurchased] = useState<PlanType | null>(
    null
  );
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

  useLogEvent('paywall', 'profile_writer')

  const onMonthlyPress = () => {
    setPlanBeingPurchased(PlanType.Monthly);
    const params: EventParams = {
      amount: '14',
      payment_type: 'monthly'
    }
    logEvent('purchase_click', 'profile_writer', params, 'payment')
  }

  const onAnnualPress = () => {
    setPlanBeingPurchased(PlanType.Yearly);
    const params: EventParams = {
      amount: '60',
      payment_type: 'annual'
    }
    logEvent('purchase_click', 'profile_writer', params, 'payment')
  }

  // const onProductPress = () => {
  //   setChosenProduct(ProductType.ProfileWriter)
  //   const params: EventParams = {
  //     amount: '19',
  //     payment_type: 'oneoff'
  //   }
  //   logEvent('purchase_click', 'profile_writer', params, 'payment')
  // }

  return (
    <>
      <LearnMoreModal
        open={learnMoreModalOpen}
        setOpen={setLearnMoreModalOpen}
      />
      <div className="mt-8">
        <div className="-mt-14">
          <Paywall
            product={ProductType.ProfileWriter}
            email={profileWriterStepResults.email}
            requiredProductsToSkipPaywall={[
              ProductType.ProfileWriter,
            ]}
            noThanksHandler={() => setProfileWriterWizardComplete(true)}
            planBeingPurchased={planBeingPurchased}
            onComplete={onComplete}
          >
            <div className="pb-20">

              {/* Premium AI Profile - Monthly Plan */}

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
                        <h1 className="text-4xl font-semibold">$14</h1>
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
                        "Write bios that catch attention and highlight your best self",
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
                    onClick={onMonthlyPress}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                  {/* <p className="my-2 text-center font-medium">OR</p>
                  <button
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                    onClick={() => navigate('/user-referrals')}>
                    Share for free access
                  </button> */}
                </div>
              </div>

              {/* Premium AI Profile - Annual Plan */}

              <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <div className="flex">
                      <h2 className="text-xl font-semibold mr-2">All Access - Annual</h2>
                      <span className="text-sm font-semibold text-red-400 bg-red-100 py-1 px-2 rounded">
                        Save 65%
                      </span>
                    </div>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$5</h1>
                      </div>
                      <div className="pl-3">
                        <h1 className="text-zinc-500 leading-4">
                          per <br /> month
                        </h1>
                        <small>{`Billed at $60 per year`}</small>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">
                      <b>Unlimited </b>access to:
                    </h4>
                    <div className="mt-1">
                      {[
                        "Write bios that catch attention and highlight your best self",
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
                    onClick={onAnnualPress}
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                  {/* <p className="my-2 text-center font-medium">OR</p>
                  <button
                    className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
                    onClick={() => navigate('/user-referrals')}>
                    Share for free access
                  </button> */}
                </div>
              </div>

              {/* Premium AI Profile - Product Plan */}


              {/* <div className="mt-4">
                <div className="bg-white p-3 border-2 border-black rounded-lg">
                  <div className="border-b-2 border-black">
                    <h2 className="text-xl font-semibold">
                      Premium AI Profile
                    </h2>
                    <div className="flex mt-2 mb-3 items-center">
                      <div>
                        <h1 className="text-4xl font-semibold">$19</h1>
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
                    onClick={onProductPress}
                    className="mt-4 flex items-center justify-center w-full bg-black text-white py-3 rounded-full font-semibold -mb-1"
                  >
                    Activate
                  </button>
                </div >
              </div > */}

              {!hideNoThanks && (
                <div className="mt-4 flex items-center justify-center mb-6">
                  <h3
                    className="cursor-pointer text-lg text-zinc-500 hover:text-zinc-600 hover:underline"
                    onClick={() => {
                      logEvent('no_thanks', 'profile_writer')
                      window.scrollTo(0, 0);
                      setProfileWriterWizardComplete(true);
                    }}
                  >
                    no thanks
                  </h3>
                </div>
              )}
            </div >
          </Paywall >
        </div >
      </div >
    </>
  );
};
