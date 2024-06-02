import toast from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "@sentry/react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ProfileWriter } from "./pages/ProfileWriter";
import { AIPhotos } from "./pages/AIPhotos";
import { ChatAssistant } from "./pages/ChatAssistant";
import { ProfileReviewer } from "./pages/ProfileReviewer";
import { Premium } from "./pages/Premium";
import { useEffect } from "react";
import { auth } from "./firebase";
import { checkIfUserSubscribed, createOrGetAuthUser, setUserSubscription } from "./queries";
import { useAuthStore } from "./stores/auth";
import { useUIStore } from "./stores/ui";
import Page from "./pages/Page";
import { Onboarding } from "./pages/Onboarding";
import { User, signOut } from "firebase/auth";
import { AuthState } from "./constants/auth";
import { useABTest } from './components/ab-testing/useABTest'
import { UserSettings } from "./pages/UserSettings";
import { UserReferrals } from "./pages/referral/Referral"
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
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/yourmove-api-production\.up\.railway\.app/,
      /^https:\/\/web\.yourmove\.ai\/api/,
      /^https:\/\/yourmove-production-jg7rg\.ondigitalocean\.app\/api/,
    ],
  });
}

const useSearchReferralCode = () => {
  const queryParams = new URLSearchParams(useLocation().search)
  return queryParams.get('referralCode')
}

function App() {
  const {
    setIsSubscribed,
    hasCheckedForSubscription,
    setHasCheckedForSubscription,
    setAuthState
  } = useAuthStore();
  const {
    setStopScroll,
    setHideBottomNav,
    setHideTopBar,
  } = useUIStore();

  const location = useLocation();
  const referralCode = useSearchReferralCode()

  useABTest()

  // For hiding the bottom and side nav
  const hiddenBottomNavPages = ["/premium", "/start"];
  const hiddenTopNavPages = ["/start"];
  useEffect(() => {
    setHideBottomNav(hiddenBottomNavPages.includes(location.pathname));
    setHideTopBar(hiddenTopNavPages.includes(location.pathname));

    // When the URL changes, set the default stopScroll back to false
    setStopScroll(false);
  }, [location]);

  useEffect(() => {
    if (referralCode) {
      const currentCode = localStorage.getItem('referredCode')
      if (!currentCode || currentCode !== referralCode) {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'referral_user_arrive', {
            event_category: 'funnel', product: 'referrals',
          })
        }
      }
      localStorage.setItem('referredCode', referralCode);
    }
  }, [referralCode])


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

    const createUserAndCheckSubscription = async (user: User) => {
      const { uid, email = "" } = user || {};
      try {
        // create an account here using the id returned from the auth so we can map email to id.
        // fix for apple id issue
        await createOrGetAuthUser(uid, email as string);

        if (!hasCheckedForSubscription) {
          checkForSubscription();
          setHasCheckedForSubscription(true);
        }
      } catch (error) {
        console.error("Error creating or retrieving user:", error);
        // Handle the error as needed, e.g., show a notification or log the error
        const errorMessage =
          "An error occured while try to fetch the user. Please try signing in again. If the problem persists, please contact support@yourmove.ai for assistance.";
        toast.error(errorMessage);
        signOut(auth);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(function (user) {
      // only check for the subscription if there is a user and we haven't checked before
      // when we sign out, we can set the hasCheckedForSubscription to false so we will check on signIn again
      // we can also set hasCheckedForSubscription to false when we buy a subscription
      if (user) {
        createUserAndCheckSubscription(user);
        setAuthState(AuthState.Authenticated)
      } else {
        setIsSubscribed(false);
        setAuthState(AuthState.NotAuthenticated)
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("hasOnboarded") ? (
              <Navigate to="/chat-assistant" />
            ) : (
              <Navigate to="/start" />
            )
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
          path="/ai-photo"
          element={
            <Page title="AI Enhanced Photos">
              <AIPhotos />
            </Page>
          }
        />
        <Route
          path="/user-settings"
          element={
            <Page title="User Settings">
              <UserSettings />
            </Page>
          }
        />
        <Route
          path="/user-referrals"
          element={
            <Page title="YourMove - Referrals">
              <UserReferrals />
            </Page>
          }
        />
        <Route path="*">Not found</Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
