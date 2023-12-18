import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import { Route, Routes } from "react-router-dom";
import { ProfileWriter } from "./pages/ProfileWriter";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { ChatAssistant } from "./pages/ChatAssistant";
import { ProfileReviewer } from "./pages/ProfileReviewer";
import { SideNav } from "./components/nav/SideNav";
import { BottomNav } from "./components/nav/BottomNav";
import { AuthModal } from "./components/modals/AuthModal";
import { Premium } from "./pages/Premium";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { checkIfUserSubscribed } from "./queries";
import { useAuthStore } from "./stores/auth";
import firebase from "firebase/compat/app";
import { Loading } from "./components/Loading";

/* 

Todo:
- add backend API endpoint that takes images and uploads them?
- add backend API endpoint that takes image URL and chat and calls chat assistant API
- add backend API endpoint that takes chat text only and calls chat assistant API

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

export const history = createBrowserHistory({ window });

function App() {
  const {
    setIsSubscribed,
    hasCheckedForSubscription,
    setHasCheckedForSubscription,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

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
      <HistoryRouter history={history}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mx-auto max-w-7xl pt-4">
            <Toaster />
            <SideNav />

            {/* Auth Modals */}
            <AuthModal />

            <div className="flex flex-col h-screen">
              <div className="overflow-y-auto">
                <Routes>
                  <Route path="/" element={<>nothing</>} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/chat-assistant" element={<ChatAssistant />} />
                  <Route path="/profile-writer" element={<ProfileWriter />} />
                  <Route path="/profile-review" element={<ProfileReviewer />} />
                  <Route path="*">Not found</Route>
                </Routes>
              </div>

              {/* Bottom div with fixed size */}
              <div
                style={{ height: "4.5rem" }}
                className="flex items-center bg-white absolute w-full bottom-0 left-0 border-t border-gray-200 bg-white shadow-sm"
              >
                <BottomNav />
              </div>
            </div>
          </div>
        )}
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
