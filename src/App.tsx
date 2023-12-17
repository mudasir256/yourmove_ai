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
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";

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
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pt-10 pt-4">
          <Toaster />
          <SideNav />

          <div className="flex flex-col h-screen">
            <div className="overflow-y-auto">
              <div className="p-20">
                <SignUp />
                {/* <SignIn /> */}
              </div>
              <Routes>
                <Route path="/chat-assistant" element={<ChatAssistant />} />
                <Route path="/profile-writer" element={<ProfileWriter />} />
                <Route path="/profile-review" element={<ProfileReviewer />} />
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
