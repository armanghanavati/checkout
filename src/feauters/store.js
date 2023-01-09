import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CheckoutOfficialSlice from "../components/slices/CheckoutOfficialSlice";
import OverTimeSlice from "../components/slices/OverTimeSlice";
import TableCheckoutListReducer from "../components/slices/TableCheckoutSlice";
import mainSlices from "../components/slices/mainSlices";

const rootReducer = {
  checkout: CheckoutOfficialSlice,
  tableCheckoutList: TableCheckoutListReducer,
  overTime: OverTimeSlice,
  mainHome: mainSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
