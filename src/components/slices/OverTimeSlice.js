import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOverTimeReason,
  officeOverTimeList,
  postOverTime,
} from "../../Services/r-ghanavatian/overTime";
import {
  actionAddPerson,
  postAction,
} from "../../Services/r-ghanavatian/mainApi";
import { errorMessage } from "../../utils/message";

const initialState = {
  des: "",
  formErrors: {},
  overTimeReason: [],
  overTimeReasonValue: [],
  showOverTimeApplyModal: false,
  showFields: false,
  modalSendManager: false,
  requestMembs: [],
  requestLists: [],
  acceptOverTime: false,
  cancelOverTime: false,
  editOverTime: false,
  viewOverTime: false,
  historyOverTime: false,
  userInfoModal: false,
  currentReqInfo: {},
  fromDate: null,
  toDate: null,
  status: [],
  dep: [],
  userRequestFilter: [],
  userManager: "",
};

export const handleReasonOvertime = createAsyncThunk(
  "overTime/handleReasonOvertime",
  async () => {
    try {
      const overTimeRes = await getOverTimeReason();
      console.log(overTimeRes.data.leangth !== 0);
      if (overTimeRes.data.leangth !== 0) {
        return overTimeRes.data;
      } else {
        errorMessage("اطلاعات یافت نشد. لطفا دوباره امتحان کنید.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleApplyUserOverTime = createAsyncThunk(
  "overTime/handleApplyUserOverTime",
  async (obj, { dispatch, getState }) => {
    try {
      const { overTimeReasonValue, fromDate, toDate, des } =
        getState().overTime;
      const values = {
        reason: overTimeReasonValue.value,
        fromDate: fromDate,
        toDate: toDate,
        description: des,
      };
      const applyRes = await postOverTime(values);
      dispatch(RsetUserManager(applyRes.data.id));
      console.log(applyRes);
      if (applyRes.data.code === 415) {
        const actions = {
          action_id: applyRes.data.id,
          action_code: 0,
          user_id: localStorage.getItem("id"),
          type: 14,
        };
        console.log(actions);
        const applyActionsRes = await postAction(actions);
        console.log(applyActionsRes);
        return applyActionsRes.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleUsersOvertime = createAsyncThunk(
  "overTime/handleUsersOvertime",
  async (obj, { dispatch, getState }) => {
    try {
      const { user } = getState().checkout;
      const { userManager } = getState().overTime;
      const reqId = userManager;
      const toPersons = { toPersons: [user.supervisor._id] };
      const type = 14;
      const postOverTimeActionRes = await actionAddPerson(
        reqId,
        type,
        toPersons
      );
      console.log(reqId, toPersons, type);
      console.log(postOverTimeActionRes);
      if (postOverTimeActionRes.data.code === 415) {
        dispatch(RsetFromDate(null));
        dispatch(RsetToDate(null));
        dispatch(RsetDescriptions(""));
        dispatch(RsetOverTimeReasonValue(""));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const OverTimeSlice = createSlice({
  name: "overTime",
  initialState,
  reducers: {
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    RsetFromDate: (state, { payload }) => {
      return { ...state, fromDate: payload };
    },
    RsetToDate: (state, { payload }) => {
      return { ...state, toDate: payload };
    },
    RsetDescriptions: (state, { payload }) => {
      return { ...state, des: payload };
    },
    RsetOverTimeReasonValue: (state, { payload }) => {
      return { ...state, overTimeReasonValue: payload };
    },
    RsetShowOverTimeApplyModal: (state, { payload }) => {
      return { ...state, showOverTimeApplyModal: payload };
    },
    RsetDisable: (state, { payload }) => {
      return { ...state, showFields: payload };
    },
    RsetShowSendManagerModal: (state, { payload }) => {
      return { ...state, modalSendManager: payload };
    },
    RsetAcceptOverTimeModal: (state, { payload }) => {
      return { ...state, acceptOverTime: payload };
    },
    RsetCancelOverTimeModal: (state, { payload }) => {
      return { ...state, cancelOverTime: payload };
    },
    RsetEditOverTimeModal: (state, { payload }) => {
      return { ...state, editOverTime: payload };
    },
    RsetHistoryOverTimeModal: (state, { payload }) => {
      return { ...state, historyOverTime: payload };
    },
    RsetViewOverTimeModal: (state, { payload }) => {
      return { ...state, viewOverTime: payload };
    },
    RsetUserInfoModals: (state, { payload }) => {
      return { ...state, userInfoModal: payload };
    },
    RsetStatus: (state, { payload }) => {
      return { ...state, status: payload };
    },
    RsetDepartemant: (state, { payload }) => {
      return { ...state, dep: payload };
    },
    RsetUserListValue: (state, { payload }) => {
      return { ...state, userRequestFilter: payload };
    },
    RsetUserManager: (state, { payload }) => {
      return { ...state, userManager: payload };
    },
    RsetHistoryOverTimeModal: (state, { payload }) => {
      return { ...state, historyOverTime: payload };
    },
  },
  extraReducers: {
    [handleReasonOvertime.fulfilled]: (state, { payload }) => {
      return { ...state, overTimeReason: payload };
    },
  },
});

export const {
  RsetFromDate,
  RsetToDate,
  RsetDescriptions,
  RsetOverTimeReasonValue,
  RsetFormErrors,
  RsetShowOverTimeApplyModal,
  RsetDisable,
  RsetShowSendManagerModal,
  RsetViewOverTimeModal,
  RsetHistoryOverTimeModal,
  RsetEditOverTimeModal,
  RsetCancelOverTimeModal,
  RsetAcceptOverTimeModal,
  RsetUserInfoModals,
  addUserRequest,
  RsetUserCheckoutTables,
  RsetStatus,
  RsetDepartemant,
  RsetUserListValue,
  RsetUserManager,
} = OverTimeSlice.actions;

export const selectDepartmant = (state) => state.overTime.dep;
export const selectOverTimeReason = (state) => state.overTime.overTimeReason;
export const selectStartDate = (state) => state.overTime.fromDate;
export const selectEndDate = (state) => state.overTime.toDate;
export const selectDescription = (state) => state.overTime.des;
export const selectFormErrors = (state) => state.overTime.formErrors;
export const selectShowOverTime = (state) =>
  state.overTime.showOverTimeApplyModal;
export const selectShowFields = (state) => state.overTime.showFields;
export const selectModalSendManager = (state) =>
  state.overTime.modalSendManager;
export const selectStatus = (state) => state.overTime.status;

export const selectUserRequestFilter = (state) =>
  state.overTime.userRequestFilter;
export const selectRequestMembs = (state) => state.overTime.requestMembs;
export const selectRequestLists = (state) => state.overTime.requestLists;
export const selectCurrentReqInfo = (state) => state.overTime.currentReqInfo;

export const selectUserInfoModal = (state) => state.overTime.userInfoModal;
export const selectAcceptOverTime = (state) => state.overTime.acceptOverTime;
export const selectCancelOverTime = (state) => state.overTime.cancelOverTime;
export const selectEditOverTime = (state) => state.overTime.editOverTime;
export const selectViewOverTime = (state) => state.overTime.viewOverTime;
export const selectHistoryOverTimeModal = (state) =>
  state.overTime.historyOverTime;

export const selectOverTimeReasonValue = (state) =>
  state.overTime.overTimeReasonValue;
export default OverTimeSlice.reducer;
