import { configureStore } from "@reduxjs/toolkit";
import CheckoutOfficialSlice from "../components/checkoutOfficialSlice/CheckoutOfficialSlice";

export const store = configureStore({
  reducer: {
    checkout: CheckoutOfficialSlice,
  },
});
