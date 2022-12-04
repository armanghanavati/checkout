import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListTable } from "../../common/tableListServices";

export const handleGetUsersTable = createAsyncThunk(
  "tableCheckoutList/handleGetUsersTable",
  async () => {
    try {
      const values = {
        memberId: "",
        status: "",
        fromDate: "null",
        toDate: "null",
        leavingWorkCause: "",
      };
      console.log(values);
      const checkoutListRes = await getUserListTable(values);
      console.log(checkoutListRes);
      return checkoutListRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

const initialState = {
  userMembers: [],
  userMemb: {},
  userCheckoutTableList: [],
  filterUsers: [],
  acceptCheckoutModal: false,
  editCheckoutModal: false,
  viewCheckoutModal: false,
  cancelCheckoutModal: false,
};

const CheckoutList = createSlice({
  name: "tableCheckoutList",
  initialState,
  reducers: {
    addUserMemb: (state, { payload }) => {
      return { ...state, userMemb: payload };
    },
    setEditCheckoutModal: (state, { payload }) => {
      return { ...state, editCheckoutModal: payload };
    },
    setViewCheckoutModal: (state, { payload }) => {
      return { ...state, viewCheckoutModal: payload };
    },
    setCancelCheckoutModal: (state, { payload }) => {
      return { ...state, cancelCheckoutModal: payload };
    },
    setAcceptCheckoutModal: (state, { payload }) => {
      return { ...state, acceptCheckoutModal: payload };
    },
  },
  extraReducers: {
    [handleGetUsersTable.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userCheckoutTableList: payload.list,
        userMembers: payload.members,
      };
    },
  },
});

export const {
  addUserMemb,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setViewCheckoutModal,
  setEditCheckoutModal,
} = CheckoutList.actions;
export const selectUserTableList = (state) =>
  state.tableCheckoutList.userCheckoutTableList;
export const selectUserMembers = (state) => state.tableCheckoutList.userMembers;
export const selectUserMemb = (state) => state.tableCheckoutList.userMemb;
export const selectAcceptCheckoutModal = (state) =>
  state.tableCheckoutList.acceptCheckoutModal;
export const selectEditCheckoutModal = (state) =>
  state.tableCheckoutList.editCheckoutModal;
export const selectCancelCheckoutModal = (state) =>
  state.tableCheckoutList.cancelCheckoutModal;
export const selectViewCheckoutModal = (state) =>
  state.tableCheckoutList.viewCheckoutModal;
export default CheckoutList.reducer;
