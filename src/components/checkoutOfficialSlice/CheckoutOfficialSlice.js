import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../common/services";
import { getAllUsersByPersonalCode } from "../../common/services";
import { useDispatch, useSelector } from "react-redux";

const userData = useSelector(userInfo);

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    return resUserInfo.data;
  }
);

export const fetchGetAllUsers = createAsyncThunk(
  "checkout/fetchGetAllUsers",
  async () => {
    const resAllUser = await getAllUsersByPersonalCode(
      userData.company.CompanyCode,
      userData.location
    );
    useDispatch(setUsers(resAllUser.data));
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

// onChange={()=> setTitle(e.target.value)}
// onChange={()=> dispatch(addUserTitle())}

const CheckoutOfficialSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUserName: (state, { payload }) => {
      return {
        value: userRes.data[0]._id,
        label: userRes.data[0].first_name + " " + userRes.data[0].last_name,
      };
    },
  },
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
