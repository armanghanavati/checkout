import axios from "axios";
import config from "./urlConfig.json";

//  علت اضافه کار
export const getOverTimeReason = () => {
  return axios.get(`${config.localapi}/officeOverTimeReason`);
};

// ارسال فرم اضافه کار به لیست
export const postOverTime = async (values) => {
  console.log(values);
  return axios.post(`${config.localapi}/officeOverTime`, values);
};

// کاربران درخواست اضافه کار
export const officeOverTimeList = (values) => {
  return axios.get(`${config.localapi}/officeOverTime/list`, {
    params: values,
  });
};
