import axios from "axios";
import config from "./urlConfig.json";

export const userInfo = () => {
  return axios.get(`${config.localapi}/user/login`, {
    params: { username: "1742026362", password: "Armangh26362" },
  });
};

export const getAllUsersByPersonalCode = (companyCode, location) => {
  return axios.get(
    `${config.localapi}/user/findInCompany/personelCode/${companyCode}/${location}`
  );
};
console.log(getAllUsersByPersonalCode());

export const getUser = (values) => {
  return axios.get(`${config.localapi}/user/fill/searchFields`, {
    params: values,
  });
};

export const postUserDataCheckout = (values) => {
  return axios.post(`${config.localapi}/settlement`, values);
};

export const getReasonLeavingWork = () => {
  return axios.get(`${config.localapi}/leavingWorkCause`);
};

export const postAction = (ActionValues) => {
  return axios.post(`${config.localapi}/action`, ActionValues);
};

// findInCompany / personelCode / { company } / { location };

//ip/user/fill/searchFields {params: meliCode: "", personelCode: "", name: ""}

//ip/settlement , {user_id: "",leavingWorkCause: "", leavingWorkDate: "", description: ""} --> post

//ip:leavingWorkCause --> get
