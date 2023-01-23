import http from "../httpService";
import config from "../config.json";

//  علت اضافه کار
export const getOverTimeReason = () => {
  return http.get(`${config.localapi}/officeOverTimeReason`);
};

// ارسال فرم اضافه کار به لیست
export const postOverTime = async (values) => {
  console.log(values);
  return http.post(`${config.localapi}/officeOverTime`, values);
};

// کاربران درخواست اضافه کار
export const officeOverTimeList = (values) => {
  return http.get(`${config.localapi}/officeOverTime/list`, {
    params: values,
  });
};
