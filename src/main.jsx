import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./App.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>
);
