import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCompany,
  getAllDepartment,
  getAllStatuses,
  getCurrentReqInfo,
  getUserListTable,
} from "../../common/tableListServices";

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
  allStatus: [],
  allCompany: [],
  company: "",
  department: "",
  allDepartment: [],
  detailes: {},
  currentReqCompany: "",
  currentReqDep: "",
};

export const fetchAllCompany = createAsyncThunk(
  "tableCheckoutList/fetchGetAllCompany",
  async () => {
    try {
      const resCompanyName = await getAllCompany();
      return resCompanyName.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchGetAllStatuses = createAsyncThunk(
  "tableCheckoutList/fetchGetAllStatuses",
  async () => {
    const statusRes = await getAllStatuses();
    console.log(statusRes.data);
    return statusRes.data;
  }
);

export const handleGetUsersTable = createAsyncThunk(
  "tableCheckoutList/handleGetUsersTable",
  async (obj, { dispatch, getState }) => {
    const {
      department,
      company,
      leaver,
      status,
      leavingWorkCause,
      fromDate,
      toDate,
    } = getState().tableCheckoutList;
    try {
      const values = {
        leaver: leaver !== "" ? leaver.value : leaver,
        status: status !== "" ? status.value : status,
        fromDate: fromDate !== null ? fromDate.format("YYYY/MM/DD") : "null",
        toDate: toDate !== null ? toDate.format("YYYY/MM/DD") : "null",
        leavingWorkCause:
          leavingWorkCause !== "" ? leavingWorkCause.value : leavingWorkCause,
        company: company !== "" ? company.value : "",
        department: department !== "" ? department.value : "",
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

export const fetchAllDepartment = createAsyncThunk(
  "tableCheckoutList/fetchAllDepartment",
  async (obj, { dispatch, getState }) => {
    const { user } = getState().checkout;
    try {
      console.log(user);
      const allDep = await getAllDepartment(
        user.company.CompanyCode,
        user.location
      );
      console.log(allDep);
      return allDep.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCurrentReqInfo = createAsyncThunk(
  "tableCheckoutList/fetchCurrentReqInfo",
  async ({ reqId, reqType, company, department }, { dispatch, getState }) => {
    // console.log({ reqId, reqType, company, department });
    dispatch(setCurrentReqCompany(company));
    dispatch(setCurrentReqDep(department));
    const detailsRes = await getCurrentReqInfo(reqId, reqType);
    console.log(detailsRes.data);
    return detailsRes.data;
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
    addFromDate: (state, { payload }) => {
      return { ...state, fromDate: payload };
    },
    addToDate: (state, { payload }) => {
      return { ...state, toDate: payload };
    },
    addDep: (state, { payload }) => {
      return { ...state, department: payload };
    },
    addCompany: (state, { payload }) => {
      return { ...state, company: payload };
    },
    setCurrentReqCompany: (state, { payload }) => {
      return { ...state, currentReqCompany: payload };
    },
    setCurrentReqDep: (state, { payload }) => {
      return { ...state, currentReqDep: payload };
    },
  },
  extraReducers: {
    [handleGetUsersTable.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        userCheckoutTableList: payload.list,
        userMembers: payload.members,
      };
    },
    [fetchGetAllStatuses.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, allStatus: payload };
    },
    [fetchAllCompany.fulfilled]: (state, { payload }) => {
      return { ...state, allCompany: payload };
    },
    [fetchAllDepartment.fulfilled]: (state, { payload }) => {
      return { ...state, allDepartment: payload };
    },
    [fetchCurrentReqInfo.fulfilled]: (state, { payload }) => {
      return { ...state, detailes: payload };
    },
  },
});

export const {
  addLeavingWorkCause,
  addFromDate,
  addUserMemb,
  addStatus,
  addMemberId,
  setAcceptCheckoutModal,
  setCancelCheckoutModal,
  setViewCheckoutModal,
  setEditCheckoutModal,
  middleware,
  addToDate,
  addDep,
  addCompany,
  setCurrentReqCompany,
  setCurrentReqDep,
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
export const selectCompany = (state) => state.tableCheckoutList.company;

export const selectAllStatus = (state) => state.tableCheckoutList.allStatus;
export const selectValueStatus = (state) => state.tableCheckoutList.status;
export const selectAllCompany = (state) => state.tableCheckoutList.allCompany;
export const selectAllDeps = (state) => state.tableCheckoutList.allDepartment;
export const selectDep = (state) => state.tableCheckoutList.department;
export const selectDetailes = (state) => state.tableCheckoutList.detailes;
export const selectCurrentComp = (state) =>
  state.tableCheckoutList.currentReqCompany;
export const selectCurrentDep = (state) =>
  state.tableCheckoutList.currentReqDep;
export const selectAcceptCheckoutModal = (state) =>
  state.tableCheckoutList.acceptCheckoutModal;
export const selectEditCheckoutModal = (state) =>
  state.tableCheckoutList.editCheckoutModal;
export const selectCancelCheckoutModal = (state) =>
  state.tableCheckoutList.cancelCheckoutModal;
export const selectViewCheckoutModal = (state) =>
  state.tableCheckoutList.viewCheckoutModal;
export default CheckoutList.reducer;
