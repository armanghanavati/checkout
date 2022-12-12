import config from "./urlConfig.json";
import axios from "axios";

export const getUserListTable = (values) => {
  return axios.get(
    `${config.localapi}/settlement/list/${localStorage.getItem("id")}`,
    {
      params: values,
    }
  );
};

export const getAllStatuses = () => {
  return axios.get(`${config.localapi}/actionCode/10`);
};

export const getAllCompany = () => {
  return axios.get(`${config.localapi}/cmp`);
};

export const getAllDepartment = (companyCode, location) => {
  return axios.get(
    `${config.localapi}/dep/findDeps/${companyCode}/${location}`
  );
};

// Get Current Req Details
export const getCurrentReqInfo = (reqId, type) => {
  return axios.get(`${config.localapi}/action/reqDetail/${reqId}/${type}`);
};
