import config from "../config.json";
import http from "../httpService";

//  دریافت کاربران لیست تسویه
export const getUserListTable = (values) => {
  return http.get(
    `${config.localapi}/settlement/list/${localStorage.getItem("id")}`,
    {
      params: values,
    }
  );
};

//  دریافت وضعیت لیست تسویه
export const getAllStatuses = () => {
  return http.get(`${config.localapi}/actionCode/10`);
};

// ردیف درخواست کاربران
export const getCurrentReqInfo = (reqId, type) => {
  return http.get(`${config.localapi}/action/reqDetail/${reqId}/${type}`);
};

// check_Date
export const checkDate = (getLastActionId, getReqId, type) => {
  console.log(getLastActionId, getReqId, type);
  return http.get(
    `${config.localapi}/action/checkDate/${getReqId}/${getLastActionId}/${type}`
  );
};

// تایید درخواست لیست
export const findToPerson = (actionValues) => {
  return http.get(`${config.localapi}/user/findPerson/inGroup`, {
    params: actionValues,
  });
};

// تاریخچه دریافت کامنت های کاربران لیست
export const getCurrentReqHistory = (serial, reqType) => {
  return http.get(`${config.localapi}/action/findComments/${serial}`, {
    params: { id: localStorage.getItem("id"), type: reqType },
  });
};
