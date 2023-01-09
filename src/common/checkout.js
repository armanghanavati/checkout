import axios from "axios";
import config from "./urlConfig.json";

// checkout registration users select
export const getAllUsersByPersonalCode = (companyCode, location) => {
  return axios.get(
    `${config.localapi}/user/findInCompany/personelCode/${companyCode}/${location}`
  );
};

// ارسال اطلاعات پرسنل مستعفی
export const postUserDataCheckout = (values) => {
  return axios.post(`${config.localapi}/settlement`, values);
};

//  دریافت علت ترک خدمت
export const getReasonLeavingWork = () => {
  return axios.get(`${config.localapi}/leavingWorkCause`);
};

//  دریافت کاربران مستعفی
export const getUser = (values) => {
  return axios.get(`${config.localapi}/user/fill/searchFields`, {
    params: values,
  });
};
