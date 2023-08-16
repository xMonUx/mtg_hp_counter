import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import App from "./App";
import { UsernameProvider } from "./utils/UsernameContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </BrowserRouter>
);

reportWebVitals();
