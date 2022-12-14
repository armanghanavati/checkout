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



//ip/settlement/list/{user id}, params: {}

// findInCompany / personelCode / { company } / { location };

//ip/user/fill/searchFields {params: meliCode: "", personelCode: "", name: ""}

//ip/settlement , {user_id: "",leavingWorkCause: "", leavingWorkDate: "", description: ""} --> post

//ip:leavingWorkCause --> get

//6360ecd33ba4d4828c9cb40b,
// 6360ecd43ba4d4828c9cbf4f,
// 6360ecd33ba4d4828c9cb400
// 6360ecd43ba4d4828c9cb978
