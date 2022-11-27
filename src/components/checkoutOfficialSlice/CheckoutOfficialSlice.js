import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../common/services";
import { getAllUsersByPersonalCode } from "../../common/services";
import { useDispatch, useSelector } from "react-redux";

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    console.log(resUserInfo.data);
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
    AddMeliCode:()=>{
      
    }
  },
  extraReducers: {
    [fetchAsyncMeliCode.fulfilled]: (state, { payload }) => {
      return { ...state, user: payload };
    },
    [fetchAsyncMeliCode.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [fetchAsyncMeliCode.rejected]: (state, { payload }) => {
      console.log("rejected");
    },
  },
});

export const { addUserTitle } = CheckoutOfficialSlice.actions;
export const getUserTitle = (state) => state.checkout.userTitle;
export const loginInfo = (state) => state.checkout.user;
export const getMeliCode = (state) => state.checkout.meliCode;
export const getPersonalCode = (state) => state.checkout.personnelCode;
export default CheckoutOfficialSlice.reducer;
