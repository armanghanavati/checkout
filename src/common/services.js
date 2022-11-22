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

export const postAllUsersByPersonalCode = (companyCode, location) => {
  return axios.post(
    `${config.localapi}/user/findInCompany/personelCode/${companyCode}/${location}`
  );
};

// findInCompany / personelCode / { company } / { location };

//ip/user/fill/searchFields {params: meliCode: "", personelCode: "", name: ""}
