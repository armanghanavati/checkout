import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

render(
  <Provider store={store}>
    <App />
    <ToastContainer rtl />
  </Provider>,
  document.getElementById("root")
);
