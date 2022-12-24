import axios from "axios";
import config from "./urlConfig.json";

//ip/officeOverTimeReason --> get
export const getOverTimeReason = () => {
  return axios.get(`${config.localapi}/officeOverTimeReason`);
};

//ip/officeOverTime , {reason: "", fromDate: date1, toDate: date2}  --> post
//type:14
export const postOverTime = async (values) => {
  console.log(values);
  return axios.post(`${config.localapi}/officeOverTime`, values);
};
