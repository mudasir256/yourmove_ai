import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthStore } from "../stores/auth";
import { PlanType } from "../constants/payments";
import { Loading } from "../components/Loading";
import { useUIStore } from "../stores/ui";
import { useNavigate } from "react-router-dom";
import { Success } from "../components/Success";
import { AuthState } from "../constants/auth";
import { Back } from "../components/Back";
import { Helmet } from "react-helmet-async";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SubscriptionForm } from "../components/premium/SubscriptionForm";
import FamewallEmbed from 'react-famewall'


export const Premium = () => {
  const [planBeingPurchased, setPlanBeingPurchased] = useState<PlanType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { authModalIsOpen, setAuthModalIsOpen, isSubscribed, setShowAuthSubscriptionDisclaimer, authState } = useAuthStore();
  const { subscriptionSuccess, setSubscriptionSuccess, setHideBottomNav, abTestGroup } = useUIStore();
  const navigate = useNavigate();
  const [showAuthModalAfterPayment, setShowAuthModalAfterPayment] = useState(false)

  useEffect(() => {
    setHideBottomNav(true);
    setIsLoading(false);
  }, []);

  // If we have subscribed, redirect after a few moments
  useEffect(() => {
    if (subscriptionSuccess) {
      setTimeout(() => {
        navigate("/")
      }, 2750);
    }
  }, [subscriptionSuccess]);

  useEffect(() => {
    if (showAuthModalAfterPayment && authState === AuthState.Authenticated) {
      setSubscriptionSuccess(true)
      setShowAuthModalAfterPayment(false)
    }
  }, [authState, showAuthModalAfterPayment])

  useEffect(() => {
    if (!authModalIsOpen && !auth.currentUser && showAuthModalAfterPayment) {
      // authModal closed without loggin / signup in
      setSubscriptionSuccess(true)
      setShowAuthModalAfterPayment(false)
    }
  }, [showAuthModalAfterPayment, authModalIsOpen])

  useEffect(() => {
    if ((window as any).gtag && abTestGroup !== undefined) {
      (window as any).gtag('event', abTestGroup ? 'experiment_premium_page_view_B' : 'experiment_premium_page_view_A', {
        event_category: 'funnel', product: 'chat_assistant',
      })
    }
  }, [abTestGroup])

  return subscriptionSuccess ? (
    <div className="text-center mt-8">
      <Success title="You have successfully subscribed to Premium." />
    </div>

  ) : (
    <div className="flex-col flex-1 max-w-lg mx-auto mt-0 overflow-hidden bg-white">
      <Helmet>
        <meta name="description" content="Unlimited access to YourMove AI suite of tools for online dating" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-col flex-1 max-w-lg mx-auto mt-0 px-2 bg-white">
          <Back containerClass="w-6 h-10" color="stroke-black" onClick={() => planBeingPurchased ? setPlanBeingPurchased(null) : navigate(-1)} />
          {isSubscribed ? (
            <div className="text-center mt-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircleIcon className="text-brand-primary h-16 w-16 stroke flex items-center justify-center" />
              </div>
              <h3>You are already subscribed to YourMove premium.</h3>
            </div>
          ) : (
            <div className="flex-1 px-2">
              <div className="mt-2 shadow-xl rounded-2xl">
                <div
                  className={`bg-white ${planBeingPurchased ? "rounded-2xl" : "rounded-t-2xl"} border-2 border-brand-primary py-4 flex flex-col`}
                >
                  <div className="flex gap-x-1 items-center px-4">
                    <div className="font-semibold">YourMove</div>
                    <div
                      className="text-brand-primary bg-brand-primary/10 px-2 py-1 font-bold font-source-sans-pro rounded"
                    >
                      Premium
                    </div>
                  </div>

                  <h1
                    className="font-source-sans-pro font-black text-3xl tracking-tighter px-4"
                  >
                    <span className="text-brand-primary">Refresh your dating profiles</span> and
                    send unlimited thoughtful chats
                  </h1>

                  <hr className="mt-4 text-[#999999]" />

                  {planBeingPurchased ? (
                    <div className="" style={{ marginBottom: "4rem" }}>
                      <SubscriptionForm
                        planType={planBeingPurchased}
                        email={auth.currentUser?.email ?? undefined}
                        redirectHandler={() => {
                          if (!auth.currentUser) {
                            setShowAuthSubscriptionDisclaimer(true)
                            setShowAuthModalAfterPayment(true)
                            setAuthModalIsOpen(true)
                          } else {
                            setTimeout(() => {
                              setSubscriptionSuccess(true);
                            }, 2000);
                          }
                        }}
                      />
                    </div>
                  ) : (

                    <div className="grid grid-cols-4 grid-rows-5 px-4 gap-x-1">
                      <div className="flex items-center col-span-2">
                        <div className="font-semibold">You&apos;ll get</div>
                      </div>

                      <div className="flex justify-center items-center">
                        <div className="font-semibold text-center">Regular</div>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div className="flex">
                          <div
                            className="text-brand-primary bg-brand-primary/10 px-1 py-1 font-bold font-source-sans-pro rounded"
                          >
                            Premium
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col col-span-2">
                        <span className="font-normal">AI Chat</span>
                        <span className="opacity-60 mb-4">
                          Message ideas to keep conversations interesting
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-normal text-center">7 Free</span>
                        <span className="opacity-60">Daily</span>
                      </div>

                      <div
                        className="flex justify-center font-semibold text-brand-primary break-all hyphens-manual"
                        lang="en"
                      >
                        Limitless
                      </div>

                      <div className="flex flex-col col-span-2">
                        <span className="font-semibold">Profile Review</span>
                        <span className="opacity-60">
                          Expert tips from our AI to boost your profile
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-normal">Limited</span>
                      </div>

                      <div className="flex justify-center font-semibold text-brand-primary">
                        <span>Limitless</span>
                      </div>

                      <div className="flex flex-col col-span-2">
                        <span className="font-semibold">Profile Writer</span>
                        <span className="opacity-60">
                          Create profile optimized for right swipes
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-normal">Limited</span>
                      </div>

                      <div className="flex justify-center font-semibold text-brand-primary">
                        <span>Limitless</span>
                      </div>

                      <div className="flex flex-col col-span-2">
                        <span className="font-semibold">AI Photos</span>
                        <span className="opacity-60"> Stand Out with AI-Enhanced Photos </span>
                        <div className="text-brand-primary font-medium cursor-pointer" onClick={() => navigate('/ai-photo')}>
                          {`Learn More ->`}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-normal">Full Price</span>
                      </div>

                      <div className="flex justify-center font-semibold text-brand-primary">
                        <span>50% Off</span>
                      </div>
                    </div>
                  )}
                </div>
                {!planBeingPurchased && <div className="bg-brand-primary rounded-b-2xl p-4 pb-6">
                  <div className="grid grid-rows-1 grid-cols-2 gap-2 mt-2">
                    <div
                      className="bg-white row-start-1 row-end-1 col-start-1 col-end-1 p-2 flex flex-col rounded-lg pt-4 shadow-xl"
                      onClick={() => {
                        setPlanBeingPurchased(PlanType.Monthly);
                        (window as any).gtag('event', 'subscribe_monthly_click', {
                          event_category: 'payment_click',
                          product: 'chat_assistant',
                        });
                      }}
                    >
                      <span className="font-semibold">Monthly</span>
                      <div className="font-bold">
                        <span className="text-3xl">{abTestGroup ? '$14' : '$12'}</span><span className="text-xl">/mo</span>
                      </div>
                    </div>
                    <div
                      className="bg-white row-start-1 row-end-1 col-start-2 col-end-2 p-2 flex flex-col rounded-lg pt-4 shadow-xl"
                      onClick={() => {
                        setPlanBeingPurchased(PlanType.Yearly);
                        (window as any).gtag('event', 'subscribe_annual_click', {
                          event_category: 'payment_click',
                          product: 'chat_assistant',
                        });
                      }}
                    >
                      <div className="flex">
                        <span className="font-semibold">Yearly</span>
                        <div className="flex flex-col items-center ml-2">
                          <div
                            className="text-brand-primary bg-brand-primary/10 px-2 py-1 font-bold font-source-sans-pro text-xxs rounded"
                          >
                            Most Popular
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-brand-primary">
                        <span className="text-3xl">{abTestGroup ? '$5.00' : '$4.00'}</span><span className="text-xl">/mo</span>
                      </div>
                      <span className="text-sm text-brand-primary mb-2">{`Save ${abTestGroup ? "65%" : "67%"}`}</span>
                    </div>
                  </div>
                  <div className="text-md text-white font-semibold mt-3 text-center">or</div>
                  <button className="w-full bg-brand-primary text-white py-4 rounded-xl mt-3 border border-white" onClick={() => navigate('/user-referrals')}>
                    Share for Free Access
                  </button>
                </div>
                }
              </div>
              {!planBeingPurchased &&
                <div className="bg-brand-primary py-6 px-4 mt-10">
                  <h2 className="text-2xl text-white font-bold">
                    Read what people are saying about their new profiles
                  </h2>
                  <div className="famewall-embed w-full" data-src="yourmove" data-format="grid" />
                  <script type="text/javascript" src="https://embed.famewall.io/frame.js" defer></script>

                  <FamewallEmbed
                    wallUrl="yourmove"
                  />
                </div>
              }
            </div>)}
        </div>
      )
      }
    </div >
  );
};
