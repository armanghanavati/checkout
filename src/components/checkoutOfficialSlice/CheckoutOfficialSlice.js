import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../common/services";

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    localStorage.setItem("id", resUserInfo.data._id);
    return resUserInfo.data;
  }
);

const initialState = {
  user: {},
  userName: {},
  personalCode: "",
  meliCode: "",
  descreption: "",
  users: [],
  isSubmit: false,
};

const CheckoutOfficialSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // AddMeliCode: (state) => {
    //   return state;
    // },
    // clearCode: (state) => {
    //   state.meliCode = state.meliCode;
    // },
    // AddPersonalCode: (state, { payload }) => {
    //   console.log(state.personalCode.push(payload));
    //   return state.personalCode.push(payload);
    // },
    // addSubbmit: (state) => {
    //   return state.isSubmit == !state.isSubmit;
    // },
  },
  extraReducers: {
    [fetchAsyncMeliCode.fulfilled]: (state, { payload }) => {
      return { ...state, user: payload };
    },
  },
});

export const { AddPersonalCode, clearCode, addSubbmit } =
  CheckoutOfficialSlice.actions;
export const getUserTitle = (state) => state.checkout.userTitle;
export const getClearCode = (state) => state.checkout.meliCode;
export const selectSubmit = (state) => state.checkout.isSubmit;
export const loginInfo = (state) => state.checkout.user;
export const getAllUsersLeaving = (state) => state.checkout.users;
export const getPersonalCode = (state) => state.checkout.personalCode;
export default CheckoutOfficialSlice.reducer;
