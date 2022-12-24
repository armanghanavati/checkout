import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { postAction } from "../../common/services";
import {
  checkDate,
  findToPerson,
  getAllCompany,
  getAllDepartment,
  getAllStatuses,
  getCurrentReqHistory,
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
  infoCheckoutModal: false,
  allStatus: [],
  allCompany: [],
  company: "",
  location: "",
  department: "",
  allDepartment: [],
  detailes: "",
  currentReqCompany: "",
  currentReqDep: "",
  currentReqCompanyCancel: "",
  currentReqDepCancel: "",
  currentReqCompanyView: "",
  currentReqDepView: "",
  currentReqCompanyEdit: "",
  currentReqDepEdit: "",
  complateDescription: "",
  series: "",
  type: "",
  historyData: [],
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
  async (
    { reqId, reqType, objCompany, objDepartment },
    { dispatch, getState }
  ) => {
    dispatch(setCurrentReqCompany(objCompany));
    dispatch(setCurrentReqDep(objDepartment));
    dispatch(setCurrentReqType(reqType));
    const detailsRes = await getCurrentReqInfo(reqId, reqType);
    console.log(detailsRes.data);
    return detailsRes.data;
  }
);

///////////////////// Accept Btn /////////////////
export const postHandlerBtnAccept = createAsyncThunk(
  "tableCheckoutList/postHandlerBtnAccept",
  async (obj, { dispatch, getState }) => {
    const { user } = getState().checkout;
    const { detailes, complateDescription } = getState().tableCheckoutList;
    const getLastActionId = detailes.process[detailes.process.length - 1]._id;
    const getReqId = detailes.reqInfo._id;
    const type = "10";

    try {
      const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
      console.log(postCheckDateRes);
      if (postCheckDateRes.data.type === "accepted") {
        const valuesAcceptBtn = {
          location: user.location,
          company: user.company.CompanyCode,
          role: [49, 50, 51, 52, 53],
          existRole: true,
        };
        const postHandlerRes = await findToPerson(valuesAcceptBtn);
        if (postHandlerRes.data.length !== 0) {
          let getId = [];
          postHandlerRes.data.map((item) => {
            return getId.push(item._id);
          });
          const actionValue = {
            action_id: detailes.reqInfo._id,
            action_code: "",
            user_id: localStorage.getItem("id"),
            toPersons: getId,
            type: 10,
            comment: complateDescription,
          };
          console.log(actionValue);
          const postActionRes = await postAction(actionValue);
          console.log(postActionRes.data);
          if (postActionRes.data.type === 415) {
          } else {
            toast.error("دریافت کننده مورد نظر یافت نشد!", {
              className: "bg-danger text-white",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

////////////// --> Cancel Btn
export const postBtnCancel = createAsyncThunk(
  "tableCheckoutList/postBtnCancel",
  async (obj, { getState }) => {
    const { user } = getState().checkout;
    const { detailes, complateDescription } = getState().tableCheckoutList;
    const getLastActionId = detailes.process[detailes.process.length - 1]._id;
    const getReqId = detailes.reqInfo._id;
    const type = "10";
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(user);
    if (postCheckDateRes.data.type === "accepted") {
      const actionValue = {
        action_id: detailes.reqInfo._id,
        action_code: 2,
        user_id: localStorage.getItem("id"),
        toPerson: user._id,
        type: 10,
        comment: complateDescription,
      };

      console.log(actionValue);
      const postActionRes = await postAction(actionValue);
      toast.success("درخاست شما با موفقیت کنسل شد.", {
        className: "bg-success text-white",
      });
      return postActionRes;
    }
  }
);

/////////////// -->  Edit Button <-- //

export const postEditBtn = createAsyncThunk(
  "tableCheckoutList/postEditBtn",
  async (obj, { dispatch, getState }) => {
    const { user } = getState().checkout;
    const { detailes, complateDescription } = getState().tableCheckoutList;
    const getLastActionId = detailes.process[detailes.process.length - 1]._id;
    const getReqId = detailes.reqInfo._id;
    const type = "10";
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(postCheckDateRes);
    if (postCheckDateRes.data.type === "accepted") {
      toast.success("درخواست شما با موفقیت ثبت شد.");
    }
  }
);

//  --> View Btn //
export const postViewBtn = createAsyncThunk(
  "tableCheckoutList/postEditBtn",
  async (obj, { dispatch, getState }) => {
    const { detailes, complateDescription } = getState().tableCheckoutList;
    console.log(complateDescription, detailes);
    const getLastActionId = detailes.process[detailes.process.length - 1]._id;
    const getReqId = detailes.reqInfo._id;
    const type = "10";
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(postCheckDateRes);
    if (postCheckDateRes.data.type === "accepted") {
      const actionValue = {
        action_id: detailes.reqInfo._id,
        action_code: 8,
        user_id: localStorage.getItem("id"),
        type: 10,
        comment: complateDescription,
      };
      console.log(actionValue);
      const postActionRes = await postAction(actionValue);
      console.log(postActionRes);
      if (postActionRes.data.code === 415) {
        dispatch(addComplateDescription(""));
        toast.success("نظر شما با موفقیت ارسال شد.", {
          className: "bg-success text-white",
        });
      } else {
        toast.else("خطا! لطفا دوباره امتحان کنید");
      }
    }
  }
);

//   -->  History Btn //
export const postHistoryBtn = createAsyncThunk(
  "tableCheckoutList/postHistoryBtn",
  async (serial, { dispatch, getState }) => {
    const { type } = getState().tableCheckoutList;
    console.log(serial);
    const historeRes = await getCurrentReqHistory(serial, type);
    console.log(historeRes);
    return historeRes.data;
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
    setInfoCheckoutModal: (state, { payload }) => {
      return { ...state, infoCheckoutModal: payload };
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
    addLocation: (state, { payload }) => {
      return { ...state, location: payload };
    },
    addComplateDescription: (state, { payload }) => {
      return { ...state, complateDescription: payload };
    },
    addSeries: (state, { payload }) => {
      return { ...state, series: payload };
    },
    setCurrentReqType: (state, action) => {
      return { ...state, type: action.payload };
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
    [postHandlerBtnAccept.fulfilled]: (state, { payload }) => {
      return { ...state, postAcceptHandler: payload };
    },
    [postHistoryBtn.fulfilled]: (state, { payload }) => {
      return { ...state, historyData: payload };
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
  addComplateDescription,
  addLocation,
  setInfoCheckoutModal,
  addSeries,
  setCurrentReqType,
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
export const selectInfoCheckoutModal = (state) =>
  state.tableCheckoutList.infoCheckoutModal;

export const selectComplateDescription = (state) =>
  state.tableCheckoutList.complateDescription;

export const selectHistoryData = (state) => state.tableCheckoutList.historyData;

export default CheckoutList.reducer;
