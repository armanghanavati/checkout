import config from "./urlConfig.json";
import axios from "axios";

//  دریافت کاربران لیست تسویه
export const getUserListTable = (values) => {
  return axios.get(
    `${config.localapi}/settlement/list/${localStorage.getItem("id")}`,
    {
      params: values,
    }
  );
};

//  دریافت وضعیت لیست تسویه
export const getAllStatuses = () => {
  return axios.get(`${config.localapi}/actionCode/10`);
};

// ردیف درخواست کاربران
export const getCurrentReqInfo = (reqId, type) => {
  return axios.get(`${config.localapi}/action/reqDetail/${reqId}/${type}`);
};

// check_Date
export const checkDate = (getLastActionId, getReqId, type) => {
  return axios.get(
    `${config.localapi}/action/checkDate/${getReqId}/${getLastActionId}/${type}`
  );
};

// تایید درخواست لیست
export const findToPerson = (actionValues) => {
  return axios.get(`${config.localapi}/user/findPerson/inGroup`, {
    params: actionValues,
  });
};

// تاریخچه دریافت کامنت های کاربران لیست
export const getCurrentReqHistory = (serial, reqType) => {
  return axios.get(`${config.localapi}/action/findComments/${serial}`, {
    params: { id: localStorage.getItem("id"), type: reqType },
  });
};
