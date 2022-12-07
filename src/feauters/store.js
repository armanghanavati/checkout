import { configureStore } from "@reduxjs/toolkit";
import CheckoutOfficialSlice from "../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import TableCheckoutListReducer from "../components/checkoutOfficialSlice/TableCheckoutSlice";

export const store = configureStore({
  reducer: {
    checkout: CheckoutOfficialSlice,
    tableCheckoutList: TableCheckoutListReducer,
  },
});
