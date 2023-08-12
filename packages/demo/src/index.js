import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const container = createRoot(document.getElementById("root"));
container.render(<App />);
registerServiceWorker();
