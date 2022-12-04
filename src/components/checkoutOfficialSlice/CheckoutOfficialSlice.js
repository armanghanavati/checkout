import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersByPersonalCode,
  userInfo,
  getReasonLeavingWork,
} from "../../common/services";

const initialState = {
  reasonLeavingData: [],
  reasonLeavingUsers: [],
  user: {},
  userName: [],
  personalCode: "",
  meliCode: "",
  descreption: "",
  allUserNames: [],
  isSubmit: false,
};

export const fetchAsyncMeliCode = createAsyncThunk(
  "checkout/fetchAsyncMeliCode",
  async () => {
    const resUserInfo = await userInfo();
    localStorage.setItem("id", resUserInfo.data._id);
    return resUserInfo.data;
  }
);

export const fetchHandleGetReasonLeavingWork = createAsyncThunk(
  "checkout/fetchHandleGetReasonLeavingWork",
  async () => {
    try {
      const reasonLeavingRes = await getReasonLeavingWork();
      return reasonLeavingRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const fetchGetAllUsers = createAsyncThunk(
  "checkout/fetchGetAllUsers",
  async () => {
    try {
      const resAllUsers = await getAllUsersByPersonalCode(
        initialState.user.company.companyCode,
        initialState.user.location
      );
      return resAllUsers.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// const handleGetAllUsers = async () => {
//   try {
//     const usersRes = await getAllUsersByPersonalCode(
//       userData.company.CompanyCode,
//       userData.location
//     );
//     setUsers(usersRes.data);
//   } catch (ex) {
//     console.log(ex);
//   }
// };

const CheckoutOfficialSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addUserName: (state, { payload }) => {
      return { ...state, userName: payload };
    },
    setReasonLeavingHandler: (state, { payload }) => {
      console.log(payload);
      return { ...state, reasonLeaving: payload };
    },
    addMeliCode: (state, { payload }) => {
      return { ...state, meliCode: payload };
    },
    addPersonalCode: (state, { payload }) => {
      return { ...state, personalCode: payload };
    },
    addDescreption: (state, { payload }) => {
      return { ...state, descreption: payload };
    },
    // clearCode: (state) => {
    //   state.meliCode = state.meliCode;
    // },
    // addSubbmit: (state) => {
    //   return state.isSubmit == !state.isSubmit;
    // },
  },
  extraReducers: {
    [fetchAsyncMeliCode.fulfilled]: (state, { payload }) => {
      return { ...state, user: payload };
    },
    [fetchHandleGetReasonLeavingWork.fulfilled]: (state, { payload }) => {
      return { ...state, reasonLeavingData: payload };
    },
    [fetchGetAllUsers.fulfilled]: (state, { payload }) => {
      return { ...state, users: payload };
    },
  },
});

export const {
  addPersonalCode,
  addMeliCode,
  clearCode,
  addSubbmit,
  addUserName,
  addDescreption,
  setReasonLeavingHandler,
} = CheckoutOfficialSlice.actions;
export const selectUserName = (state) => state.checkout.userName;
export const selectSubmit = (state) => state.checkout.isSubmit;
export const loginInfo = (state) => state.checkout.user;
export const selectAllUserNames = (state) => state.checkout.allUserNames;
export const getAllUsersLeaving = (state) => state.checkout.reasonLeavingUsers;
export const selectPersonalCode = (state) => state.checkout.personalCode;
export const selectReasonLeavingData = (state) =>
  state.checkout.reasonLeavingData;
export const selectReasonLeaving = (state) => state.checkout.reasonLeaving;
export const selectDescreption = (state) => state.checkout.descreption;
export const selectMeliCode = (state) => state.checkout.meliCode;
export default CheckoutOfficialSlice.reducer;
