import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./feauters/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      <ToastContainer />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
