import http from "../httpService";
import config from "../config.json";

// checkout registration users select
export const getAllUsersByPersonalCode = (companyCode, location) => {
  return http.get(
    `${config.localapi}/user/findInCompany/personelCode/${companyCode}/${location}`
  );
};

// ارسال اطلاعات پرسنل مستعفی
export const postUserDataCheckout = (values) => {
  return http.post(`${config.localapi}/settlement`, values);
};

//  دریافت علت ترک خدمت
export const getReasonLeavingWork = () => {
  return http.get(`${config.localapi}/leavingWorkCause`);
};

//  دریافت کاربران مستعفی
export const getUser = (values) => {
  return http.get(`${config.localapi}/user/fill/searchFields`, {
    params: values,
  });
};

export const patchEditCheckout = (reqId, values) => {
  return http.patch(`${config.localapi}/settlement/${reqId}`, values);
};

//  دریافت کاربران مستعفی
export const getAcceptanceAccess = (requestId, userId) => {
  return http.get(`${config.localapi}/settlement/acceptanceAccess/${requestId}/${userId}`);
}

//ip/settlement/acceptanceAccess/{request id}/{user id} --> get