import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListTable } from "../../common/tableListServices";

const initialState = {
  userMembers: [],
  memberId: "",
  status: "",
  leaver: "",
  userMemb: "",
  fromDate: null,
  toDate: null,
  leavingWorkCause: "",
  userCheckoutTableList: [],
  filterUsers: [],
  acceptCheckoutModal: false,
  editCheckoutModal: false,
  viewCheckoutModal: false,
  cancelCheckoutModal: false,
};

export const handleGetUsersTable = createAsyncThunk(
  "tableCheckoutList/handleGetUsersTable",

  async (obj, { dispatch, getState }) => {
    const { leaver, status, leavingWorkCause, fromDate, toDate } =
      getState().tableCheckoutList;
    try {
      console.log(fromDate, typeof toDate);
      const values = {
        leaver: leaver !== "" ? leaver.value : leaver,
        status: status !== "" ? status.value : status,
        fromDate: fromDate !== null ? fromDate : "null",
        toDate: toDate !== null ? toDate : "null",
        leavingWorkCause:
          leavingWorkCause !== "" ? leavingWorkCause.value : leavingWorkCause,
      };
      console.log(values);
      const checkoutListRes = await getUserListTable(values);
      console.log(checkoutListRes.data);
      return checkoutListRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

const CheckoutList = createSlice({
  name: "tableCheckoutList",
  initialState,
  reducers: {
    addLeavingWorkCause: (state, { payload }) => {
      return { ...state, leavingWorkCause: payload };
    },
    addUserMemb: (state, { payload }) => {
      return { ...state, leaver: payload };
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
    addMemberId: (state, { payload }) => {
      console.log({ ...state, memberId: payload });
      return { ...state, memberId: payload };
    },
    addStatus: (state, { payload }) => {
      return { ...state, status: payload };
    },
    addDate: (state, { payload }) => {
      console.log(state.fromDate, payload);
      return { ...state };
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
  addLeavingWorkCause,
  addDate,
  addUserMemb,
  addStatus,
  addMemberId,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setViewCheckoutModal,
  setEditCheckoutModal,
  middleware,
} = CheckoutList.actions;
export const selectUserTableList = (state) =>
  state.tableCheckoutList.userCheckoutTableList;
export const selectUserMembers = (state) => state.tableCheckoutList.userMembers;
export const selectUserMemb = (state) => state.tableCheckoutList.leaver;
export const selectStatus = (state) => state.tableCheckoutList.status;
export const selectFromDate = (state) => state.tableCheckoutList.fromDate;
export const selectToDate = (state) => state.tableCheckoutList.toDate;
export const selectLeavingWorkCause = (state) =>
  state.tableCheckoutList.leavingWorkCause;

export const selectAcceptCheckoutModal = (state) =>
  state.tableCheckoutList.acceptCheckoutModal;
export const selectEditCheckoutModal = (state) =>
  state.tableCheckoutList.editCheckoutModal;
export const selectCancelCheckoutModal = (state) =>
  state.tableCheckoutList.cancelCheckoutModal;
export const selectViewCheckoutModal = (state) =>
  state.tableCheckoutList.viewCheckoutModal;
export default CheckoutList.reducer;
