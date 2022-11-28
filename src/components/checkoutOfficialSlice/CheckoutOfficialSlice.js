import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../../common/services";

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    console.log(resUserInfo.data);
    localStorage.setItem("id", resUserInfo.data._id);
    return resUserInfo.data;
  }
);

// export const handleGetAllUsers = createAsyncThunk(
//   "checkout/handleGetAllUsers",
//   async () => {
//     try {
//       const usersRes = await getAllUsersByPersonalCode(
//         loginInfo.company.CompanyCode,
//         loginInfo.location
//       );
//       users(usersRes.data);
//     } catch (ex) {
//       console.log(ex);
//     }
//   }
// );

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
    AddMeliCode: (state, { payload }) => {
      console.log(state.userName);
      return state;
    },
  },
  extraReducers: {
    [fetchAsyncMeliCode.fulfilled]: (state, { payload }) => {
      //console.log(payload);
      return { ...state, user: payload };
    },
    // [handleGetAllUsers.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   return { ...state, users: payload };
    // },
    // [handleGetAllUsers.pending]: (state, { payload }) => {
    //   console.log("pending");
    // },
    // [handleGetAllUsers.rejected]: (state, { payload }) => {
    //   console.log("rejected");
    // },
  },
});

export const { addUserTitle } = CheckoutOfficialSlice.actions;
export const getUserTitle = (state) => state.checkout.userTitle;
export const loginInfo = (state) => state.checkout.user;
export const getAllUsersLeaving = (state) => state.checkout.users;
export default CheckoutOfficialSlice.reducer;
