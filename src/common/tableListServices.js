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

//check_Date -->
export const checkDate = (getLastActionId, getReqId) => {
  return axios.get(
    `${config.localapi}/action/checkDate/${getReqId}/${getLastActionId}/10`
  );
};

export const findToPerson = (actionValues) => {
  return axios.get(`${config.localapi}/user/findPerson/inGroup`, {
    params: actionValues,
  });
};

//ip/checkDate/{last action id}/{request id}/10  -->   type: accepted | type: rejected

//ip/findPerson/inGroup , {params: {location: "", company: "", role : [49,50,51,52,53]}}

// Edition   --> action_code: 10000, toPerson: undefined
// Reject   --> toPerson: leaver._id, action_code: 2

export const getCurrentReqHistory = (serial) => {
  return axios.get(`${config.localapi}/action/findComments/${serial}`, {
    params: { id: "", type: "" },
  });
};
