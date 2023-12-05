import { Toaster } from "react-hot-toast";
import { Wizard } from "./components/wizard/Wizard";
import { useWizardStore } from "./stores/wizard";
import { PaymentPlans } from "./components/payment/PaymentPlans";
import { Profile } from "./components/profile/Profile";
import { QueryClient, QueryClientProvider } from "react-query";
import { useProfileStore } from "./stores/profile";
import { ProfileStep } from "./constants/profile";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import * as Sentry from "@sentry/react";
import { Error } from "./components/Error";
import { WizardStepType } from "./models/wizard";
import { ProfileWizardProgress } from "./components/wizard/WizardProgress";
import { Route, Routes } from "react-router-dom";
import { ProfileWriter } from "./pages/ProfileWriter";
import { createBrowserHistory } from "history";
import {
  BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { ChatAssistant } from "./pages/ChatAssistant";
import { ProfileReview } from "./pages/ProfileReview";
import { BottomNav } from "./components/nav/BottomNav";
import { TopNav } from "./components/nav/TopNav";
import { SideNav } from "./components/nav/SideNav";

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
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pt-10 pt-4">
          <Toaster />
          <SideNav />

          <div className="flex flex-col h-screen">
            <div className="overflow-y-auto flex items-center justify-center">
              <Routes>
                <Route path="/chat-assistant" element={<ChatAssistant />} />
                <Route path="/profile-writer" element={<ProfileWriter />} />
                <Route path="/profile-review" element={<ProfileReview />} />
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
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
