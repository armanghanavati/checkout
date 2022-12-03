import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserListTable } from "../../common/tableListServices";

export const handleGetUsersTable = createAsyncThunk(
  "tableCheckoutList/handleGetUsersTable",
  async () => {
    try {
      const checkoutListRes = await getUserListTable();
      console.log(checkoutListRes.data);
      localStorage.getItem("id");
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
};

const CheckoutList = createSlice({
  name: "tableCheckoutList",
  initialState,
  reducers: {
    addUserMemb: (state, { payload }) => {
      console.log(payload);
      return { ...state, userMemb: payload };
    },
    setAcceptCheckoutModal: (state, { payload }) => {
      console.log({ acceptCheckoutModal: payload });
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

export const { addUserMemb, setAcceptCheckoutModal } = CheckoutList.actions;
export const selectUserTableList = (state) =>
  state.tableCheckoutList.userCheckoutTableList;
export const selectUserMembers = (state) => state.tableCheckoutList.userMembers;
export const selectUserMemb = (state) => state.tableCheckoutList.userMemb;
export const selectAcceptCheckoutModal = (state) =>
  state.tableCheckoutList.acceptCheckoutModal;
export default CheckoutList.reducer;
