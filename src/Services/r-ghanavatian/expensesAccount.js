import http from "../httpService";
import config from "../config.json";

export const expansesAcc = (values) => {
  return http.post(`${config.localApi}/finance/expenseAcc`, values);
};

export const expansesAccItem = (values) => {
  return http.post(`${config.localApi}/finance/expenseAccItem`, values);
};

//ip/finance/expenseAcc  {applicantname: "", applicantlname: ""} --> post

//ip/finance/expenseAccItem, {params: {cost: "", date: "", description: ""}} --> post
