import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListTable } from "../../common/tableListServices";

const initialState = {
  userMembers: [],
  memberId: "",
  status: "",
  leaver: "",
  userMemb: "",
  fromDate: "null",
  toDate: "null",
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
  async () => {
    try {
      const values = {
        leaver: initialState.leaver,
        // initialState.userCheckoutTableList.value !== undefined
        //   ? initialState.userCheckoutTableList.value
        //   : "",
        status: initialState.status,
        fromDate: initialState.fromDate,
        toDate: initialState.toDate,
        leavingWorkCause: initialState.leavingWorkCause,
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
  addStatus,
  addMemberId,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setViewCheckoutModal,
  setEditCheckoutModal,
} = CheckoutList.actions;
export const selectUserTableList = (state) =>
  state.tableCheckoutList.userCheckoutTableList;
export const selectUserMembers = (state) => state.tableCheckoutList.userMembers;

export const selectUserMemb = (state) => state.tableCheckoutList.leaver;
export const selectAcceptCheckoutModal = (state) =>
  state.tableCheckoutList.acceptCheckoutModal;
export const selectEditCheckoutModal = (state) =>
  state.tableCheckoutList.editCheckoutModal;
export const selectCancelCheckoutModal = (state) =>
  state.tableCheckoutList.cancelCheckoutModal;
export const selectViewCheckoutModal = (state) =>
  state.tableCheckoutList.viewCheckoutModal;
export default CheckoutList.reducer;
