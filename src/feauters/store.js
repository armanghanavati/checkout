import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CheckoutOfficialSlice from "../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import TableCheckoutListReducer from "../components/checkoutOfficialSlice/TableCheckoutSlice";

const rootReducer = {
  checkout: CheckoutOfficialSlice,
  tableCheckoutList: TableCheckoutListReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
