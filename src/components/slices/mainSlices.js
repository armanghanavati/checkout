import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAcceptanceAccess } from "../../Services/r-ghanavatian/checkout";
import {
  checkPassCompleted,
  getAllDepartment,
  getMenu,
  getRequestsList,
  getUserInfo,
  getUserPhoto,
  permisionChanged,
  permisionPresent,
  postAction,
  userData,
  userInfo,
} from "../../Services/r-ghanavatian/mainApi";
import {
  checkDate,
  findToPerson,
  getCurrentReqHistory,
  getCurrentReqInfo,
} from "../../Services/r-ghanavatian/tableListServices";
import {
  errorMessage,
  successMessage,
  warningMessage,
} from "../../utils/message";
import {
  RsetCurrentReqCompany,
  RsetCurrentReqDepCheckout,
  RsetCurrentReqType,
  RsetLocationCheckout,
} from "./CheckoutOfficialSlice";

const initialState = {
  userInformation: {},
  userPic: "",
  userPicHistory: "",
  isLoading: false,
  histories: [],
  userLogin: {},
  descriptionModals: "",
  allDepartment: [],
  currentReqInfo: "",
  reqsList: [],
  requestMembs: [],
  userName: "",
  password: "",
  menu: [],
  userInfoChanged: {},
  loginPage: false,
  fullToPerson: false,
  ticket: false,
  messageTicket: "",
  allMessage: [],
  loginAllPage: {},
  realFilter: false,
};

// -> Department
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
    } catch (ex) {
      console.log(ex);
    }
  }
);

// -> User info as all pages
export const handleUserInfoAllPage = createAsyncThunk(
  "mainHome/handleUserInfoAllPage",
  async () => {
    const resUserInfo = await userData(localStorage.getItem("id"));
    console.log(resUserInfo.data);
    return resUserInfo.data;
  }
);

export const handleLogin = createAsyncThunk(
  "mainHome/handleLogin",
  async () => {
    const resUserInfo = await userInfo();
    localStorage.setItem("id", resUserInfo.data._id);
    localStorage.setItem("personalCode", resUserInfo.data.personelCode);
    console.log(resUserInfo.data);
    return resUserInfo.data;
  }
);

// ->  Handle menu
export const handleMenu = createAsyncThunk(
  "mainHome/handleMenu",
  async (obj, { dispatch }) => {
    try {
      const { data } = await getMenu("62aad59dbe423590c073977c");
      dispatch(RsetMenu(data));
    } catch (ex) {
      console.log(ex);
    }
  }
);

// ->  Login info
// export const handleLogin = createAsyncThunk(
//   "mainHome/handleLogin",
//   async (history, { getState, dispatch }) => {
//     // event.preventDefault();
//     console.log(history);
//     const { userName, password } = getState().mainHome;
//     const user = { username: userName.replace(/ /g, ""), password };
//     dispatch(RsetLocationCheckout(true));
//     try {
//       const { data, status } = await userInfo(user);
//       console.log(data);
//       if (status === 200) {
//         if (data.approved === true) {
//           const checkUserInfoCompletedRes = await checkPassCompleted(
//             data._id,
//             "all"
//           );

//           console.log(checkUserInfoCompletedRes);
//           const loginProcess = async () => {
//             localStorage.setItem("id", data._id);
//             localStorage.setItem("dep", data.dep.dep_code);
//             localStorage.setItem("role", data.role);
//             localStorage.setItem("personalCode", data.personelCode);
//             const ActionValues = {
//               action_code: 18,
//               user_id: localStorage.getItem("id"),
//               type: 7,
//             };
//             const postActionRes = await postAction(ActionValues);
//             dispatch(RsetLocationCheckout(false));
//             console.log(postActionRes);
//             handleMenu();
//             //handleLastNewReqs();
//             if (data.changedPer === true) {
//               //console.log(getCookie(localStorage.getItem('personalCode')))
//               if (getCookie(localStorage.getItem("personalCode")) !== null) {
//                 //console.log('in')
//                 setCookie(localStorage.getItem("personalCode"), "expired", 0);
//               }
//             }
//             successMessage("ورود موفقیت آمیز بود.");
//             dispatch(RsetLoginPage(true));
//             history("/checkout");
//             return data;
//           };
//           dispatch(RsetUserInfoChanged(checkUserInfoCompletedRes.data));

//           if (checkUserInfoCompletedRes.data === true) {
//             loginProcess();
//             //handleGetNSeenCounters();
//           } else if (checkUserInfoCompletedRes.data === false) {
//             loginProcess();
//             errorMessage("اطلاعات کاربری خود را تغییر دهید!");
//           }
//         } else if (data.approved === false) {
//           dispatch(RsetLocationCheckout(false));
//           errorMessage("حساب کاربری شما تایید نشده است!");
//         } else if (data.code === 408) {
//           dispatch(RsetLocationCheckout(false));
//           errorMessage("شرکت یا واحد کاربر یافت نشد!");
//         } else if (data.code === 409) {
//           dispatch(RsetLocationCheckout(false));
//           errorMessage("رمز عبور نادرست است!");
//         } else if (data.code === 410) {
//           dispatch(RsetLocationCheckout(false));
//           errorMessage("کدملی مورد نظر یافت نشد!");
//         } else {
//           dispatch(RsetLocationCheckout(false));
//           errorMessage("خطایی رخ داده است!");
//         }
//       } else {
//         dispatch(RsetLocationCheckout(false));
//         errorMessage("نام کاربری یا رمزعبور صحیح نمی باشد!");
//       }
//     } catch (ex) {
//       console.log(ex);
//       dispatch(RsetLocationCheckout(false));
//       errorMessage("ورود به حساب کاربری با خطا مواجه شد!");
//     }
//   }
// );

// -> Patch permision
export const patchPermisionChanged = createAsyncThunk(
  "mainHome/patchPermisionChanged",
  async () => {
    try {
      const permisionChangedRes = await permisionChanged();
      console.log(permisionChangedRes);
      return permisionChangedRes.data;
    } catch (ex) {
      console.log(ex);
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

// -> Permision present
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
    } catch (ex) {
      console.log(ex);
    }
  }
);

// -> Info user
export const handleUserInformation = createAsyncThunk(
  "mainHome/handleUserInformation",
  async (userId) => {
    try {
      const getUserInfoRes = await getUserInfo(userId);
      console.log(getUserInfoRes.data);
      return getUserInfoRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

// -> Picture user
export const handleUserPicture = createAsyncThunk(
  "mainHome/handleUserPicture",
  async (userId) => {
    try {
      const getUserPhotoRes = await getUserPhoto(userId);
      console.log(getUserPhotoRes);
      return getUserPhotoRes.data;
    } catch (ex) {
      console.log(ex);
    }
  }
);

// -> Request details
export const handleCurrentReqInfo = createAsyncThunk(
  "mainHome/handleCurrentReqInfo",
  async ({ reqId, reqType, objCompany, objDepartment }, { dispatch }) => {
    dispatch(RsetCurrentReqCompany(objCompany));
    dispatch(RsetCurrentReqDepCheckout(objDepartment));
    dispatch(RsetCurrentReqType(reqType));
    const detailsRes = await getCurrentReqInfo(reqId, reqType);
    return detailsRes.data;
  }
);

// -> View post //
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

// -> All history info
export const handleHistories = createAsyncThunk(
  "mainHome/handleHistories",
  async ({ serial, type }) => {
    console.log({ serial, type });
    const historeRes = await getCurrentReqHistory(serial, type);
    console.log(historeRes.data);
    return historeRes.data;
  }
);

// -> Accept post
export const handlePostAccept = createAsyncThunk(
  "mainHome/handlePostAccept",
  async (type, { getState, dispatch }) => {
    const { userLogin, descriptionModals, currentReqInfo } =
      getState().mainHome;
    const userId = localStorage.getItem("id")
    const getLastActionId =
      currentReqInfo.process[currentReqInfo.process.length - 1]._id;
    console.log(currentReqInfo);
    const getReqId = currentReqInfo.reqInfo._id;
    console.log(currentReqInfo)
    try {
      const postCheckDateRes = await getAcceptanceAccess(getReqId, userId);
      console.log(postCheckDateRes);

      if (postCheckDateRes.data.message === "accepted") {
        var actionValue = {};
        var toPerson = {};
        let getId = [];
        console.log(currentReqInfo.process, currentReqInfo.process[currentReqInfo.process.length - 1].action_code === 43 || (currentReqInfo.process[currentReqInfo.process.length - 1].action_code === 44) && currentReqInfo.process.length < 7)
        if (currentReqInfo.process[0].toPersons.some((itme) => itme === localStorage.getItem("id"))) {
          toPerson = {
            location: userLogin.location,
            company: userLogin.company.CompanyCode,
            role: [49, 50, 51, 52, 53],
            existRole: true,
          };
          const resInGroup = await findToPerson(toPerson);
          console.log(resInGroup);
          resInGroup.data.map((item) => {
            return getId.push(item.value);
          });
          actionValue = {
            action_id: currentReqInfo.reqInfo._id,
            action_code: 43,
            user_id: localStorage.getItem("id"),
            toPersons: getId,
            type: type,
            comment: descriptionModals,
          };

        } else if ((currentReqInfo.process[currentReqInfo.process.length - 1].action_code === 43 || (currentReqInfo.process[currentReqInfo.process.length - 1].action_code === 44) && currentReqInfo.process.length < 7)) {
          console.log(currentReqInfo.process);
          actionValue = {
            action_id: currentReqInfo.reqInfo._id,
            action_code: 44,
            user_id: localStorage.getItem("id"),
            type: type,
            comment: descriptionModals,
          };
        } else if (currentReqInfo.process.length === 7) {
          console.log("end formatting");
          toPerson = {
            location: userLogin.location,
            company: userLogin.company.CompanyCode,
            role: [66],
            existRole: true,
          };
          console.log(toPerson);
          const resInGroup = await findToPerson(toPerson);
          console.log(resInGroup);
          resInGroup.data.map((item) => {
            return getId.push(item.value);
          });
          actionValue = {
            action_id: currentReqInfo.reqInfo._id,
            action_code: 44,
            user_id: localStorage.getItem("id"),
            type: type,
            toPersons: getId,
            comment: descriptionModals,
          };
        } else if (currentReqInfo.process[currentReqInfo.process.length - 1].action_code === 44 && currentReqInfo.process[currentReqInfo.process.length - 1].toPersons.some((item) => item === localStorage.getItem("id")) && currentReqInfo.process[currentReqInfo.process.length - 1].toPersons !== undefined) {
          actionValue = {
            action_id: currentReqInfo.reqInfo._id,
            action_code: 30,
            user_id: localStorage.getItem("id"),
            type: type,
            comment: descriptionModals,
          };
        }
        // console.log(actionValue.action_id, actionValue.comment);
        console.log(actionValue);
        const postActionRes = await postAction(actionValue);
        console.log(postActionRes);
        if (postActionRes.data.code === 415) {
          successMessage("درخواست با موفقیت تایید شد.");
          const filterValues = {
            applicant_id: localStorage.getItem("id"),
            leaver: "",
            status: "",
            fromDate: "null",
            toDate: "null",
            leavingWorkCause: "",
            company: "",
            department: "",
            role: "",
            type: 10,
          };

          dispatch(handleReqsList(filterValues));
          dispatch(RsetDescriptionModals(""));
        }
      } else {
        errorMessage('این درخواست توسط شما تایید شده است.')
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

// -> Cancel post
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
      successMessage("درخواست با موفقیت کنسل شد.");
      console.log(postActionRes);
      return postActionRes;
    }
  }
);

//  -> UUid
export const generateRanHex = createAsyncThunk(
  "mainHome/generateRanHex",
  async (size) => {
    let result = [];
    let hexRef = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join("");
  }
);

// -> Requests List
export const handleReqsList = createAsyncThunk(
  "mainHome/handleReqsList",
  async (filterValues, { dispatch }) => {
    dispatch(RsetIsLoadingCheckout(true));
    try {
      const reqsListRes = await getRequestsList(filterValues);
      if (
        reqsListRes.data.members !== undefined &&
        reqsListRes.data.list !== undefined
      ) {
        dispatch(RsetIsLoadingCheckout(false));
        return reqsListRes.data;
      } else {
        errorMessage("اطلاعات یافت نشد!");
        dispatch(RsetIsLoadingCheckout(false));
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetIsLoadingCheckout(false));
    }
  }
);

// -> Main slice
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
    RsetDescriptionModals: (state, action) => {
      return { ...state, descriptionModals: action.payload };
    },
    RsetCurrentReqInfo: (state, { payload }) => {
      console.log(payload);
      return { ...state, currentReqInfo: payload };
    },
    RsetRequestsList: (state, { payload }) => {
      return { ...state, reqsList: payload };
    },
    RsetUsername: (state, { payload }) => {
      return { ...state, userName: payload };
    },
    RsetPassword: (state, { payload }) => {
      return { ...state, password: payload };
    },
    RsetMenu: (state, { payload }) => {
      return { ...state, menu: payload };
    },
    RsetUserInfoChanged: (state, { payload }) => {
      return { ...state, userInfoChanged: payload };
    },
    RsetLoginPage: (state, { payload }) => {
      return { ...state, loginPage: payload };
    },
    RsetFullToPerson: (state, { payload }) => {
      return { ...state, fullToPerson: payload };
    },
    RsetTicket: (state, { payload }) => {
      return { ...state, ticket: payload };
    },
    RsetMessageTicket: (state, { payload }) => {
      return { ...state, messageTicket: payload };
    },
    RsetAllMessage: (state, { payload }) => {
      return { ...state, allMessage: payload };
    },
    RsetRealFilter: (state, { payload }) => {
      return { ...state, realFilter: payload };
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
    [handleLogin.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, userLogin: payload };
    },
    [handleDepartments.fulfilled]: (state, { payload }) => {
      return { ...state, allDepartment: payload };
    },
    [handleCurrentReqInfo.fulfilled]: (state, { payload }) => {
      return { ...state, currentReqInfo: payload };
    },
    [handleReqsList.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        requestMembs: payload.members,
        reqsList: payload.list,
      };
    },
    [handleUserInfoAllPage.fulfilled]: (state, { payload }) => {
      return { ...state, loginAllPage: payload };
    },

  },
});

export const {
  RsetIsLoadingCheckout,
  RsetDescriptionModals,
  RsetCurrentReqInfo,
  RsetRequestsList,
  RsetUsername,
  RsetPassword,
  RsetMenu,
  RsetUserInfoChanged,
  RsetLoginPage,
  RsetFullToPerson, RsetTicket, RsetMessageTicket, RsetAllMessage, RsetRealFilter,
} = mainSlices.actions;

export const selectUserAllPage = (state) => state.mainHome.loginAllPage;

export const selectUserName = (state) => state.mainHome.userName;
export const selectPassword = (state) => state.mainHome.password;
export const selectLoginPage = (state) => state.mainHome.loginPage;

export const selectUserInformations = (state) => state.mainHome.userInformation;
export const selectMenu = (state) => state.mainHome.menu;
export const selectUserPic = (state) => state.mainHome.userPic;
export const selectIsLoadingCheckout = (state) => state.mainHome.isLoading;
export const selectUserLogin = (state) => state.mainHome.userLogin;
export const selectHistories = (state) => state.mainHome.histories;
export const selectAllDeps = (state) => state.mainHome.allDepartment;
export const selectCurrentReqInfo = (state) => state.mainHome.currentReqInfo;
export const selectReqsList = (state) => state.mainHome.reqsList;
export const selectRequestMemb = (state) => state.mainHome.requestMembs;
export const selectFullToPerson = (state) => state.mainHome.fullToPerson;
export const selectTicket = (state) => state.mainHome.ticket;
export const selectMessageTicket = (state) => state.mainHome.messageTicket;
export const selectAllMessage = (state) => state.mainHome.allMessage;

export const selectRealFilter = (state) => state.mainHome.realFilter;

export const selectDescriptionModals = (state) =>
  state.mainHome.descriptionModals;
export default mainSlices.reducer;
