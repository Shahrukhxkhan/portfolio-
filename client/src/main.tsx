import ReactGA from 'react-ga4';
ReactGA.initialize('G-EXYJBXJGP0');

import { HelmetProvider } from 'react-helmet-async';
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

