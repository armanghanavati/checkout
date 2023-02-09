import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layout/Home";
// import ErrorPage from "./routes/ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
// ]);

render(
  <Provider store={store}>
    <App />
    {/* <RouterProvider router={router} /> */}
    <ToastContainer rtl />
  </Provider>,
  document.getElementById("root")
);
