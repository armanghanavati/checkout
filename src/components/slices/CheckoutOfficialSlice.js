import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersByPersonalCode,
  getReasonLeavingWork,
} from "../../common/checkout";

const initialState = {
  reasonLeavingData: [],
  reasonLeavingOffice: [],
  reasonLeavingModal: {},
  reasonLeavingTable: {},
  userName: {},
  personalCode: "",
  meliCode: "",
  descreption: "",
  allUserNames: [],
  isSubmit: false,
  applyModal: false,
};

export const handleReasonLeavingWork = createAsyncThunk(
  "checkout/handleReasonLeavingWork",
  async () => {
    try {
      const reasonLeavingRes = await getReasonLeavingWork();
      return reasonLeavingRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleUsersCheckout = createAsyncThunk(
  "checkout/handleUsersCheckout",
  async (obj, { getState }) => {
    const { userLogin } = getState().mainHome;
    try {
      const resAllUsers = await getAllUsersByPersonalCode(
        userLogin.company.companyCode,
        userLogin.location
      );
      console.log(resAllUsers.data);
      return resAllUsers.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const CheckoutOfficialSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    RsetUsernames: (state, { payload }) => {
      return { ...state, userName: payload };
    },
    RsetReasonLeavingWork: (state, { payload }) => {
      console.log(payload);
      return { ...state, reasonLeavingOffice: payload };
    },
    RsetMeliCode: (state, { payload }) => {
      return { ...state, meliCode: payload };
    },
    RsetPersonalCode: (state, { payload }) => {
      return { ...state, personalCode: payload };
    },
    RsetDescriptions: (state, { payload }) => {
      return { ...state, descreption: payload };
    },
    RsetApplyModal: (state, { payload }) => {
      return { ...state, applyModal: payload };
    },
    RsetReasonLeavingModal: (state, { payload }) => {
      return { ...state, reasonLeavingModal: payload };
    },
  },
  extraReducers: {
    [handleReasonLeavingWork.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        reasonLeavingData: payload,
      };
    },
    [handleUsersCheckout.fulfilled]: (state, { payload }) => {
      return { ...state, allUserNames: payload };
    },
  },
});

export const {
  RsetPersonalCode,
  RsetMeliCode,
  clearCode,
  addSubbmit,
  RsetUsernames,
  RsetDescriptions,
  RsetReasonLeavingWork,
  RsetApplyModal,
  RsetReasonLeavingModal,
} = CheckoutOfficialSlice.actions;
export const selectSubmit = (state) => state.checkout.isSubmit;
export const loginInfo = (state) => state.checkout.user;
export const selectAllUserNames = (state) => state.checkout.allUserNames;
export const selectApplyModal = (state) => state.checkout.applyModal;
export const selectAllUsers = (state) => state.checkout.allUser;
export const selectUserValue = (state) => state.checkout.userName;
export const selectReasonLeavingModal = (state) =>
  state.checkout.reasonLeavingModal;

export const selectPersonalCode = (state) => state.checkout.personalCode;

export const selectReasonLeavingData = (state) =>
  state.checkout.reasonLeavingData;

export const selectReasonLeaving = (state) =>
  state.checkout.reasonLeavingOffice;

export const selectReasonLeavingTable = (state) =>
  state.checkout.reasonLeavingDataTable;

export const selectDescreption = (state) => state.checkout.descreption;
export const selectMeliCode = (state) => state.checkout.meliCode;
export default CheckoutOfficialSlice.reducer;
