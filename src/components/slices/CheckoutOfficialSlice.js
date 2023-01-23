import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersByPersonalCode,
  getReasonLeavingWork,
  patchEditCheckout,
} from "../../Services/r-ghanavatian/checkout";
import { getAllCompany } from "../../Services/r-ghanavatian/mainApi";
import {
  checkDate,
  getAllStatuses,
} from "../../Services/r-ghanavatian/tableListServices";
import { errorMessage, successMessage } from "../../utils/message";

const initialState = {
  reasonLeavingData: [],
  reasonLeavingOffice: [],
  reasonLeavingModal: "",
  reasonLeavingTable: {},
  userName: {},
  personalCode: "",
  meliCode: "",
  descreption: "",
  allUserNames: [],
  isSubmit: false,
  applyModal: false,
  leavingWorkDate: null,
  userMembers: [],
  memberId: "",
  status: "",
  leaver: "",
  userMemb: "",
  fromDate: null,
  toDate: null,
  userCheckoutTableList: [],
  filterUsers: [],
  acceptCheckoutModal: false,
  editCheckoutModal: false,
  viewCheckoutModal: false,
  cancelCheckoutModal: false,
  historiesCheckoutModal: false,
  allStatus: [],
  allCompany: [],
  company: "",
  location: "",
  department: "",
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
  leavingWorkCause: "",
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

export const handlePostEdit = createAsyncThunk(
  "checkout/handlePostEdit",
  async (type, { getState, dispatch }) => {
    const { currentReqInfo, descriptionModals } = getState().mainHome;
    const { leavingWorkDate, reasonLeavingModal } = getState().checkout;
    console.log(descriptionModals, leavingWorkDate, reasonLeavingModal);
    const getLastActionId =
      currentReqInfo.process[currentReqInfo.process.length - 1]._id;
    const getReqId = currentReqInfo.reqInfo._id;
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(postCheckDateRes.data);

    if (postCheckDateRes.data.type === "accepted") {
      const reqId = currentReqInfo.reqInfo._id;
      const values = {
        description: descriptionModals,
        leavingWorkDate:
          leavingWorkDate !== null ? leavingWorkDate.format("YYYY/MM/DD") : "",
        leavingWorkCause:
          reasonLeavingModal !== "" ? reasonLeavingModal.value : "",
      };
      console.log(values);
      const editCheckoutRes = await patchEditCheckout(reqId, values);
      console.log(editCheckoutRes);
      // dispatch(RsetDescriptionModals(""));
      successMessage("درخواست شما با موفقیت ثبت شد.");
      return editCheckoutRes.data;
    } else {
      errorMessage("خطا متاسفانه عملیات انجام نشد، لطفا دوباره امتحان کنید!");
    }
  }
);

// Companies
export const handleCompaniesCheckout = createAsyncThunk(
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

//  Statuses
export const handlStatusesCheckout = createAsyncThunk(
  "tableCheckoutList/handlStatusesCheckout",
  async () => {
    const statusRes = await getAllStatuses();
    console.log(statusRes.data);
    return statusRes.data;
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
    RsetLeavingWorkDate: (state, { payload }) => {
      return { ...state, leavingWorkDate: payload };
    },
    RsetUserCheckoutTable: (state, { payload }) => {
      return { ...state, leaver: payload };
    },
    RsetEditCheckoutModal: (state, { payload }) => {
      return { ...state, editCheckoutModal: payload };
    },
    RsetViewCheckoutModal: (state, { payload }) => {
      return { ...state, viewCheckoutModal: payload };
    },
    RsetCancelCheckoutModal: (state, { payload }) => {
      return { ...state, cancelCheckoutModal: payload };
    },
    RsetAcceptCheckoutModal: (state, { payload }) => {
      return { ...state, acceptCheckoutModal: payload };
    },
    RsetHistoresCheckoutModal: (state, { payload }) => {
      return { ...state, historiesCheckoutModal: payload };
    },
    RsetStatusTable: (state, { payload }) => {
      return { ...state, status: payload };
    },
    RsetFromDateTable: (state, { payload }) => {
      return { ...state, fromDate: payload };
    },
    RsetToDateTable: (state, { payload }) => {
      return { ...state, toDate: payload };
    },
    RsetDepartmantCheckoutTable: (state, { payload }) => {
      return { ...state, department: payload };
    },
    RsetCompanyCheckout: (state, { payload }) => {
      return { ...state, company: payload };
    },
    RsetCurrentReqCompany: (state, { payload }) => {
      return { ...state, currentReqCompany: payload };
    },
    RsetCurrentReqDepCheckout: (state, { payload }) => {
      return { ...state, currentReqDep: payload };
    },
    RsetLocationCheckout: (state, { payload }) => {
      return { ...state, location: payload };
    },
    RsetSeries: (state, { payload }) => {
      return { ...state, series: payload };
    },
    RsetCurrentReqType: (state, action) => {
      return { ...state, type: action.payload };
    },
    RsetLeavingWork: (state, { payload }) => {
      return { ...state, leavingWorkCause: payload };
    },
  },
  extraReducers: {
    [handlStatusesCheckout.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, allStatus: payload };
    },
    [handleCompaniesCheckout.fulfilled]: (state, { payload }) => {
      return { ...state, allCompany: payload };
    },
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
  RsetLeavingWorkDate,
  RsetLeavingWork,
  RsetFromDateTable,
  RsetUserCheckoutTable,
  RsetStatusTable,
  RsetAcceptCheckoutModal,
  RsetCancelCheckoutModal,
  RsetViewCheckoutModal,
  RsetEditCheckoutModal,
  RsetToDateTable,
  RsetDepartmantCheckoutTable,
  RsetCompanyCheckout,
  RsetCurrentReqCompany,
  RsetCurrentReqDepCheckout,
  addComplateDescription,
  RsetLocationCheckout,
  RsetHistoresCheckoutModal,
  RsetSeries,
  RsetCurrentReqType,
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
export const selectLeavingWorkDate = (state) => state.checkout.leavingWorkDate;

export const selectReasonLeavingData = (state) =>
  state.checkout.reasonLeavingData;

export const selectReasonLeaving = (state) =>
  state.checkout.reasonLeavingOffice;

export const selectReasonLeavingTable = (state) =>
  state.checkout.reasonLeavingDataTable;

export const selectDescription = (state) => state.checkout.descreption;

export const selectMeliCode = (state) => state.checkout.meliCode;

export const selectUserMemb = (state) => state.checkout.leaver;
export const selectStatus = (state) => state.checkout.status;
export const selectFromDate = (state) => state.checkout.fromDate;
export const selectToDate = (state) => state.checkout.toDate;

export const selectAllStatus = (state) => state.checkout.allStatus;
export const selectValueStatus = (state) => state.checkout.status;
export const selectAllCompany = (state) => state.checkout.allCompany;
export const selectCompany = (state) => state.checkout.company;
export const selectDep = (state) => state.checkout.department;
export const selectCurrentComp = (state) => state.checkout.currentReqCompany;
export const selectCurrentDep = (state) => state.checkout.currentReqDep;
export const selectAcceptCheckoutModal = (state) =>
  state.checkout.acceptCheckoutModal;
export const selectEditCheckoutModal = (state) =>
  state.checkout.editCheckoutModal;
export const selectCancelCheckoutModal = (state) =>
  state.checkout.cancelCheckoutModal;
export const selectViewCheckoutModal = (state) =>
  state.checkout.viewCheckoutModal;
export const selectHistoriesCheckoutModal = (state) =>
  state.checkout.historiesCheckoutModal;

export const selectHistoryData = (state) => state.checkout.historyData;
export const selectLeavingWorkCause = (state) =>
  state.checkout.leavingWorkCause;

export default CheckoutOfficialSlice.reducer;
