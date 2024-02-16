import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/variables.css";
import "./styles/site.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginDataProvider } from "./contexts/LoginDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginDataProvider>
);
