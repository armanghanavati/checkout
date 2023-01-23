import http from "../httpService";
import config from "../config.json";

//  اطلاعات کاربر
export const userInfo = (user) => {
  return http.get(`${config.localapi}/user/login`, {
    params: user,
    // params: { username: "0058666737", password: "hada30c" },
    params: { username: "1742026362", password: "Armangh26362" },
  });
};

// ارسال اکشن
export const postAction = (ActionValues) => {
  return http.post(`${config.localapi}/action`, ActionValues);
};

// Permision changed
export const permisionChanged = () => {
  return http.patch(
    `${config.localapi}/access/changedPer/` + localStorage.getItem("id")
  );
};

// Permision present
export const permisionPresent = () => {
  return http.get(
    `${config.localapi}/access/present/pers/` + localStorage.getItem("id")
  );
};

// دریافت اطلاعات کاربر
export const getUserInfo = (userId) => {
  return http.get(`${config.localapi}/user/info/` + userId);
};

// دریافت عکس کاربر
export const getUserPhoto = (userId) => {
  return http.get(`${config.localapi}/user/photo/` + userId);
};

// اکشن ارسال به سرپرست
export const actionAddPerson = (reqId, type, toPersons) => {
  return http.get(
    `${config.localapi}/action/addToPerson/` + reqId + "/" + type,
    {
      params: toPersons,
    }
  );
};

//  دریافت شرکت
export const getAllCompany = () => {
  return http.get(`${config.localapi}/cmp`);
};

//  دریافت واحد
export const getAllDepartment = (companyCode, location) => {
  return http.get(`${config.localapi}/dep/findDeps/${companyCode}/${location}`);
};

//  درخواست لیست
export const getRequestsList = (filterValues) => {
  console.log(filterValues);
  return http.get(`${config.localapi}/action/reqList`, {
    params: filterValues,
  });
};

// دریافت منو تسکبار
export const getMenu = (pMenuId) => {
  return http.get(`${config.localapi}/menuTitles/` + pMenuId);
};

//
export const checkPassCompleted = (userId, allOrPass) => {
  return http.get(`${config.localapi}/user/need/edit-pass`, {
    params: { id: userId, need: allOrPass },
  });
};
