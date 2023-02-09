import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CheckoutOfficialSlice from "../components/slices/CheckoutOfficialSlice";
import OverTimeSlice from "../components/slices/OverTimeSlice";
import TableCheckoutListReducer from "../components/slices/CheckoutOfficialSlice";
import mainSlices from "../components/slices/mainSlices";
import expencesAccountSlice from "../components/slices/expencesAccountSlice";
import filesCloudSlice from "../components/slices/filesCloudSlice";

const rootReducer = {
  checkout: CheckoutOfficialSlice,
  tableCheckoutList: TableCheckoutListReducer,
  overTime: OverTimeSlice,
  mainHome: mainSlices,
  expenseAccount: expencesAccountSlice,
  filesCloud: filesCloudSlice
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
