import axios from "axios";
import config from "./urlConfig.json";

//  اطلاعات کاربر
export const userInfo = () => {
  return axios.get(`${config.localapi}/user/login`, {
    params: { username: "1742026362", password: "Armangh26362" },
  });
};

// ارسال اکشن
export const postAction = (ActionValues) => {
  return axios.post(`${config.localapi}/action`, ActionValues);
};

// Permision changed
export const permisionChanged = () => {
  return axios.patch(
    `${config.localapi}/access/changedPer/` + localStorage.getItem("id")
  );
};

// Permision present
export const permisionPresent = () => {
  return axios.get(
    `${config.localapi}/access/present/pers/` + localStorage.getItem("id")
  );
};

// دریافت اطلاعات کاربر
export const getUserInfo = (userId) => {
  return axios.get(`${config.localapi}/user/info/` + userId);
};

// دریافت عکس کاربر
export const getUserPhoto = (userId) => {
  return axios.get(`${config.localapi}/user/photo/` + userId);
};

// اکشن ارسال به سرپرست
export const actionAddPerson = (reqId, type, toPersons) => {
  return axios.get(
    `${config.localapi}/action/addToPerson/` + reqId + "/" + type,
    {
      params: toPersons,
    }
  );
};

//  دریافت شرکت
export const getAllCompany = () => {
  return axios.get(`${config.localapi}/cmp`);
};

//  دریافت واحد
export const getAllDepartment = (companyCode, location) => {
  return axios.get(
    `${config.localapi}/dep/findDeps/${companyCode}/${location}`
  );
};
