import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../common/services";

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    return resUserInfo.data;
  }
);

const initialState = {
  user: {},
  userTitle: "",
  meliCode: 0,
  personnelCode: 0,
};

// onChange={()=> setTitle(e.target.value)}
// onChange={()=> dispatch(addUserTitle())}

const CheckoutOfficialSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncMeliCode.fulfilled]: (state, { payload }) => {
      return { ...state, user: payload };
    },
  },
});

export const { addUserTitle } = CheckoutOfficialSlice.actions;
export const getUserTitle = (state) => state.checkout.userTitle;
export const loginInfo = (state) => state.checkout.user;
export const getMeliCode = (state) => state.checkout.meliCode;
export const getPersonalCode = (state) => state.checkout.personnelCode;
export default CheckoutOfficialSlice.reducer;
