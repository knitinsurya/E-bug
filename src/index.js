import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BugProvider } from "./context/BugContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BugProvider>
      <App />
    </BugProvider>
  </React.StrictMode>
);
