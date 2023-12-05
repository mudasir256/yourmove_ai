import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query"; 
import { useWizardStore } from "../stores/wizard";
import { useProfileStore } from "../stores/profile";
import { useEffect, useState } from "react";
import { ProfileStep } from "../constants/profile";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { ProfileWizardProgress } from "../components/wizard/WizardProgress";
import { WizardStepType } from "../models/wizard";
import { Wizard } from "../components/wizard/Wizard";
import { Profile } from "../components/profile/Profile";
import { PaymentPlans } from "../components/payment/PaymentPlans";


export const ProfileWriter = () => {
    const { wizardComplete, setWizardComplete } = useWizardStore();
    const { step, setStep, error, setError } = useProfileStore();
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    useEffect(() => {
      // We got a payment and a redirect
      if (window.location.search) {
        // Set that we are processing the payment
        setPaymentProcessing(true);

        // Get the search params
        const searchParams = new URLSearchParams(window.location.search);

        // Delete the params
        searchParams.delete("payment_intent");
        searchParams.delete("payment_intent_client_secret");
        searchParams.delete("redirect_status");

        // Create a new URL with the updated search parameters
        const newURL = `${window.location.pathname}?${searchParams.toString()}`;

        // Replace the current URL with the updated one
        window.history.replaceState({}, document.title, newURL);

        // Set a timeout (maybe a query to the API layer, to check if the payment is complete)
        setTimeout(() => {
          setStep(ProfileStep.PROFILE);
          setWizardComplete(true);
          setPaymentProcessing(false);
        }, 2000);
      }
    }, [window.location]);

    return (
    <div className="mx-auto max-w-xl">
    <>
        {error ? (
        <Error error={error} />
        ) : (
        <>
            {paymentProcessing ? (
            <Loading title="Payment Processing" />
            ) : (
            <>
                {wizardComplete ? (
                <>
                    {step === ProfileStep.PAYMENT_PLANS ? (
                    <div className="">
                        <ProfileWizardProgress />
                        <div className="px-2">
                        <div className="-ml-2">
                            <svg
                            onClick={() => {
                                const setStep =
                                useWizardStore.getState().setStep;
                                setWizardComplete(false);
                                setStep(WizardStepType.EMAIL);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            className="w-12 h-12 stroke-zinc-400"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                            </svg>
                        </div>
                        <div className="h-8 w-full"></div>
                        <PaymentPlans
                            noThanksHandler={() =>
                            setStep(ProfileStep.PROFILE)
                            }
                        />
                        </div>
                    </div>
                    ) : (
                    <Profile />
                    )}
                </>
                ) : (
                <Wizard />
                )}
            </>
            )}
        </>
        )}
    </>
    </div>
    );
}