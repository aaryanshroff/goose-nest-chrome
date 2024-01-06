import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

const app = document.getElementById("app");
if (app) {
  const root = createRoot(app);
  root.render(<Popup />);
} else {
  console.error(
    'Could not find an HTML element with ID "app" to set as the root of React DOM.'
  );
}
