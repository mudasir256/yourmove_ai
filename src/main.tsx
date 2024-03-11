import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ window });

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
  // </React.StrictMode>,
);
