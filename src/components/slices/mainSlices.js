import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDepartment,
  getUserInfo,
  getUserPhoto,
  permisionChanged,
  permisionPresent,
  postAction,
  userInfo,
} from "../../common/mainApi";
import {
  checkDate,
  findToPerson,
  getCurrentReqHistory,
  getCurrentReqInfo,
} from "../../common/tableListServices";
import { errorMessage, successMessage, warningMessage } from "../utils/message";
import {
  RsetCurrentReqCompany,
  RsetCurrentReqDepCheckout,
  RsetCurrentReqType,
} from "./TableCheckoutSlice";

const initialState = {
  userInformation: {},
  userPic: "",
  userPicHistory: "",
  isLoading: false,
  isLoadingOver: false,
  histories: [],
  userLogin: {},
  descriptionModals: "",
  allDepartment: [],
  currentReqInfo: "",
};

//  Department

export const handleDepartments = createAsyncThunk(
  "mainHome/handleDepartments",
  async (obj, { getState }) => {
    const { userLogin } = getState().mainHome;
    try {
      console.log(userLogin);
      const allDep = await getAllDepartment(
        userLogin.company.CompanyCode,
        userLogin.location
      );
      console.log(allDep);
      return allDep.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Login info
export const handleUserLogin = createAsyncThunk(
  "mainHome/handleUserLogin",
  async () => {
    const resUserInfo = await userInfo();
    localStorage.setItem("id", resUserInfo.data._id);
    localStorage.setItem("personalCode", resUserInfo.data.personelCode);
    console.log(resUserInfo.data);
    return resUserInfo.data;
  }
);

// Patch permission

export const patchPermisionChanged = createAsyncThunk(
  "mainHome/patchPermisionChanged",
  async () => {
    try {
      const permisionChangedRes = await permisionChanged();
      console.log(permisionChangedRes);
      return permisionChangedRes.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Permision present

export const handlePermisionPresent = createAsyncThunk(
  "mainHome/handlePermisionPresent",
  async () => {
    try {
      const perUser = getCookie(localStorage.getItem("personalCode"));

      if (perUser === null || perUser === "expired") {
        const handlePermisionPresentRes = await permisionPresent();
        let permissions = [];
        console.log(handlePermisionPresentRes);
        handlePermisionPresentRes.data.map((item) => {
          permissions.push(item.perId);
        });
        console.log(permissions);
        setCookie(localStorage.getItem("personalCode"), permissions, 365);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// Info user

export const handleUserInformation = createAsyncThunk(
  "mainHome/handleUserInformation",
  async (userId) => {
    try {
      const getUserInfoRes = await getUserInfo(userId);
      console.log(getUserInfoRes.data);
      return getUserInfoRes.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Picture user

export const handleUserPicture = createAsyncThunk(
  "mainHome/handleUserPicture",
  async (userId) => {
    try {
      const getUserPhotoRes = await getUserPhoto(userId);
      console.log(getUserPhotoRes);
      return getUserPhotoRes.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//  User details

export const handleCurrentReqInfo = createAsyncThunk(
  "mainHome/handleCurrentReqInfo",
  async ({ reqId, reqType, objCompany, objDepartment }, { dispatch }) => {
    console.log(reqId, reqType, objCompany, objDepartment);
    dispatch(RsetCurrentReqCompany(objCompany));
    dispatch(RsetCurrentReqDepCheckout(objDepartment));
    dispatch(RsetCurrentReqType(reqType));
    const detailsRes = await getCurrentReqInfo(reqId, reqType);
    console.log(detailsRes.data);
    return detailsRes.data;
  }
);

//  --> View post //
export const handlePostComment = createAsyncThunk(
  "mainHome/handlePostComment",
  async (type, { dispatch, getState }) => {
    const { currentReqInfo } = getState().mainHome;

    const { descriptionModals } = getState().mainHome;

    const actionValue = {
      action_id: currentReqInfo.reqInfo._id,
      action_code: 8,
      user_id: localStorage.getItem("id"),
      type: type,
      comment: descriptionModals,
    };
    const postActionRes = await postAction(actionValue);
    console.log(postActionRes);
    if (postActionRes.data.code === 415) {
      dispatch(RsetDescriptionModals(""));
      successMessage("نظر شما با موفقیت ارسال شد.");
    } else {
      warningMessage("خطا! لطفا دوباره امتحان کنید");
    }
  }
);

//  All history info
export const handleHistories = createAsyncThunk(
  "mainHome/handleHistories",
  async ({ serial, type }) => {
    console.log({ serial, type });
    const historeRes = await getCurrentReqHistory(serial, type);
    console.log(historeRes.data);
    return historeRes.data;
  }
);

//  Edit post
export const handlePostEdit = createAsyncThunk(
  "mainHome/handlePostEdit",
  async (type, { getState }) => {
    const { currentReqInfo } = getState().mainHome;
    const getLastActionId =
      currentReqInfo.process[currentReqInfo.process.length - 1]._id;
    const getReqId = currentReqInfo.reqInfo._id;
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(postCheckDateRes);
    if (postCheckDateRes.data.type === "accepted") {
      successMessage("درخواست شما با موفقیت ثبت شد.");
    }
  }
);

// --> Accept post
export const handlePostAccept = createAsyncThunk(
  "mainHome/handlePostAccept",
  async (type, { dispatch, getState }) => {
    const { userLogin, descriptionModals } = getState().mainHome;
    const { currentReqInfo } = getState().tableCheckoutList;
    const getLastActionId =
      currentReqInfo.process[currentReqInfo.process.length - 1]._id;
    const getReqId = currentReqInfo.reqInfo._id;
    try {
      const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
      console.log(postCheckDateRes);
      if (postCheckDateRes.data.type === "accepted") {
        const valuesAcceptBtn = {
          location: userLogin.location,
          company: userLogin.company.CompanyCode,
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
            action_id: currentReqInfo.reqInfo._id,
            action_code: 0,
            user_id: localStorage.getItem("id"),
            toPersons: getId,
            type: type,
            comment: descriptionModals,
          };
          console.log(actionValue);
          const postActionRes = await postAction(actionValue);
          console.log(postActionRes.data);
          if (postActionRes.data.type === 415) {
          } else {
            errorMessage("دریافت کننده مورد نظر یافت نشد!");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//  Cancel post
export const handlePostCancelModal = createAsyncThunk(
  "mainHome/handlePostCancelModal",
  async (type, { getState }) => {
    const { userLogin, currentReqInfo } = getState().mainHome;
    const { descriptionModals } = getState().mainHome;
    const getLastActionId =
      currentReqInfo.process[currentReqInfo.process.length - 1]._id;
    const getReqId = currentReqInfo.reqInfo._id;
    const postCheckDateRes = await checkDate(getLastActionId, getReqId, type);
    console.log(userLogin);
    if (postCheckDateRes.data.type === "accepted") {
      const actionValue = {
        action_id: currentReqInfo.reqInfo._id,
        action_code: 2,
        user_id: localStorage.getItem("id"),
        toPerson: userLogin._id,
        type: type,
        comment: descriptionModals,
      };
      console.log(actionValue);
      const postActionRes = await postAction(actionValue);
      successMessage("درخاست شما با موفقیت کنسل شد.");
      return postActionRes;
    }
  }
);

// Slice
const mainSlices = createSlice({
  name: "mainHome",
  initialState,
  reducers: {
    RsetIsLoadingCheckout: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    RsetIsLoadingOverTime: (state, action) => {
      return { ...state, isLoadingOver: action.payload };
    },
    RsetDescriptionModals: (state, action) => {
      return { ...state, descriptionModals: action.payload };
    },
    RsetCurrentReqInfo: (state, { payload }) => {
      console.log(payload);
      return { ...state, currentReqInfo: payload };
    },
  },
  extraReducers: {
    [handleUserInformation.fulfilled]: (state, { payload }) => {
      return { ...state, userInformation: payload };
    },
    [handleUserInformation.pending]: () => {
      console.log("pending from main slice");
    },
    [handleUserInformation.rejected]: () => {
      console.log("its rejected.from main slice");
    },
    [handleUserPicture.fulfilled]: (state, { payload }) => {
      return { ...state, userPic: payload };
    },
    [handleHistories.fulfilled]: (state, { payload }) => {
      return { ...state, histories: payload };
    },
    [handleUserLogin.fulfilled]: (state, { payload }) => {
      return { ...state, userLogin: payload };
    },
    [handleDepartments.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, allDepartment: payload };
    },
    [handleCurrentReqInfo.fulfilled]: (state, { payload }) => {
      return { ...state, currentReqInfo: payload };
    },
  },
});

export const {
  RsetIsLoadingCheckout,
  RsetIsLoadingOverTime,
  RsetDescriptionModals,
  RsetCurrentReqInfo,
} = mainSlices.actions;
export const selectUserInformations = (state) => state.mainHome.userInformation;
export const selectUserPic = (state) => state.mainHome.userPic;
export const selectIsLoadingCheckout = (state) => state.mainHome.isLoading;
export const selectIsLoadingOver = (state) => state.mainHome.isLoadingOver;
export const selectUserLogin = (state) => state.mainHome.userLogin;
export const selectHistories = (state) => state.mainHome.histories;
export const selectAllDeps = (state) => state.mainHome.allDepartment;
export const selectCurrentReqInfo = (state) => state.mainHome.currentReqInfo;

export const selectDescriptionModals = (state) =>
  state.mainHome.descriptionModals;
export default mainSlices.reducer;
