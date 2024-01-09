import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProfileWriter } from "./pages/ProfileWriter";
import { ChatAssistant } from "./pages/ChatAssistant";
import { ProfileReviewer } from "./pages/ProfileReviewer";
import { SideNav } from "./components/nav/SideNav";
import { AuthModal } from "./components/modals/AuthModal";
import { Premium } from "./pages/Premium";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { checkIfUserSubscribed } from "./queries";
import { useAuthStore } from "./stores/auth";
import { Loading } from "./components/Loading";
import { PaymentLoading } from "./pages/PaymentLoading";
import { BottomNav } from "./components/nav/BottomNav";
import { useUIStore } from "./stores/ui";

/* 

Everything is pretty much ready to rock and roll. The only outstanding pieces are:

1. Recording Profile Writers. We used to increment `generatedProfiles` by one on the user model, but I think it should be done better than that because we can keep adding attributes to the user model. Can you get this from the profiles collection? i.e. do a length
2. Ditto with the Reviews. I think it'd be better to just store generated reviews in a `reviews` collection and get the total number by a user there.

The last thing stopping me from deploying is removing the upsell on the final review screen if they have paid whether it's through a sub or a purchased product.
*/

const queryClient = new QueryClient();

// Init Sentry if we have an environment var for it
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          "localhost",
          /^https:\/\/yourmove-api-production\.up\.railway\.app/,
        ],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

function App() {
  const {
    setIsSubscribed,
    hasCheckedForSubscription,
    setHasCheckedForSubscription,
  } = useAuthStore();
  const { stopScroll, setStopScroll, hideBottomNav, setHideBottomNav } =
    useUIStore();
  const location = useLocation();

  // On App Load, reset bottom nav
  useEffect(() => {
    setHideBottomNav(location.pathname === "/premium");
  }, [location]);

  // When the URL changes, set the default stopScroll back to false
  useEffect(() => {
    console.log("we here");
    setStopScroll(false);
  }, [location]);

  const checkForSubscription = () => {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        checkIfUserSubscribed(idTokenResult.token).then((response) => {
          // this is purely for UI/UX. When calling into the APIs we will check if the user is subscribed
          if (response.data.isSubscribed) {
            setIsSubscribed(true);
          }
        });
      });
    }
  };

  // When the auth state changes, check if the user isSubscribed
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      console.log("hey");
      // only check for the subscription if there is a user and we haven't checked before
      // when we sign out, we can set the hasCheckedForSubscription to false so we will check on signIn again
      // we can also set hasCheckedForSubscription to false when we buy a subscription
      if (user && !hasCheckedForSubscription) {
        checkForSubscription();
        setHasCheckedForSubscription(true);
      } else {
        // User is not signed in. We default to this anyway, but good to be explicit/when the sign out
        setIsSubscribed(false);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col overflow-y-hidden">
        {/* Top Section */}
        <div className="flex-shrink-0 mt-4">
          <SideNav />
          <Toaster />
          <AuthModal />
        </div>

        {/* Middle Scrollable Section */}
        <div className={`flex-grow overflow-y-auto`}>
          <Routes>
            <Route path="/" element={<Navigate to="/chat-assistant" />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat-assistant" element={<ChatAssistant />} />
            <Route path="/profile-writer" element={<ProfileWriter />} />
            <Route path="/profile-review" element={<ProfileReviewer />} />
            <Route path="*">Not found</Route>
          </Routes>
        </div>

        {!hideBottomNav && (
          <>
            {/* Bottom NavBar Section */}
            <div className="flex-shrink-0 mt-20 z-50 relative">
              <BottomNav />
            </div>
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
