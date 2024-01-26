import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { BottomNav } from "./components/nav/BottomNav";
import { useUIStore } from "./stores/ui";
import { Error } from "./components/Error";
import Page from "./pages/Page";
import { Onboarding } from "./pages/Onboarding";
import { set } from "date-fns";

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
  const navigate = useNavigate();
  const {
    setIsSubscribed,
    hasCheckedForSubscription,
    setHasCheckedForSubscription,
  } = useAuthStore();
  const {
    stopScroll,
    error,
    setStopScroll,
    hideBottomNav,
    setHideBottomNav,
    hideTopBar,
    setHideTopBar,
    hasCheckedForOnboarding,
    setHasCheckedForOnboarding,
  } = useUIStore();
  const location = useLocation();

  // For hiding the bottom and side nav
  const hiddenBottomNavPages = ["/premium", "/start"];
  const hiddenTopNavPages = ["/start"];
  useEffect(() => {
    setHideBottomNav(hiddenBottomNavPages.includes(location.pathname));
    setHideTopBar(hiddenTopNavPages.includes(location.pathname));
  }, [location]);

  // When the URL changes, set the default stopScroll back to false
  useEffect(() => {
    setStopScroll(false);
  }, [location]);

  const checkForSubscription = () => {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        checkIfUserSubscribed(idTokenResult.token).then((response) => {
          // this is purely for UI/UX. When calling into the APIs we will check if the user is subscribed
          if (response.data.isSubscribed) {
            setIsSubscribed(true);
          } else {
            setIsSubscribed(false);
          }
        });
      });
    }
  };

  // When the auth state c\hanges, check if the user isSubscribed
  useEffect(() => {
    // Check for subscription once and then on auth state changed
    checkForSubscription();

    auth.onAuthStateChanged(function (user) {
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

  // For making the bottom nav responsive
  const [contentHeight, setContentHeight] = useState(window.innerHeight);

  const heightOfTopBar = 48; // Example height in pixels for the top bar
  const heightOfBottomBar = 16; // Example height in pixels for the bottom bar

  const updateContentHeight = () => {
    // Calculate available height for content
    const availableHeight =
      window.innerHeight - (heightOfTopBar + heightOfBottomBar);
    setContentHeight(availableHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateContentHeight);

    // Set the initial content height
    updateContentHeight();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateContentHeight);
  }, []);

  // Check if the user has onboarded, if they have then redirect to chat assistant by default
  useEffect(() => {
    const hasOnboarded = localStorage.getItem("hasOnboarded");
    if (hasOnboarded) {
      setHasCheckedForOnboarding(true);
      navigate("/chat-assistant");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {hasCheckedForOnboarding ? (
        <div className="flex flex-col h-screen">
          <Toaster />
          <AuthModal />
          {!hideTopBar && <SideNav />}
          <div
            style={{
              maxHeight: `${hideBottomNav ? "100%" : contentHeight + "px"}`,
            }}
            className={`${
              stopScroll ? "overflow-y-hidden" : "overflow-y-auto"
            }`}
          >
            <div className="pt-12">
              {error ? (
                <div className="mt-20">
                  <Error error={error} />
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<Navigate to="/chat-assistant" />} />
                  <Route
                    path="/premium"
                    element={
                      <Page title="Premium">
                        <Premium />
                      </Page>
                    }
                  />
                  <Route
                    path="/chat-assistant"
                    element={
                      <Page title="Chat Assistant">
                        <ChatAssistant />
                      </Page>
                    }
                  />
                  <Route
                    path="/profile-writer"
                    element={
                      <Page title="Profile Writer">
                        <ProfileWriter />
                      </Page>
                    }
                  />
                  <Route
                    path="/profile-review"
                    element={
                      <Page title="Profile Review">
                        <ProfileReviewer />
                      </Page>
                    }
                  />
                  <Route
                    path="/start"
                    element={
                      <Page title="Start">
                        <Onboarding />
                      </Page>
                    }
                  />
                  <Route path="*">Not found</Route>
                </Routes>
              )}
            </div>
          </div>
          {!hideBottomNav && <BottomNav />}
        </div>
      ) : (
        <Onboarding />
      )}
    </QueryClientProvider>
  );
}

export default App;
