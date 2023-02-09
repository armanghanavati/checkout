import http from "../httpService";
import config from "../config.json";

export const expansesAcc = (values) => {
  return http.post(`${config.localapi}/finance/expenseAcc`, values);
};

export const expansesAccItem = (values) => {
  return http.post(`${config.localapi}/finance/expenseAcc/item`, values);
};

//ip/finance/expenseAcc  {applicantname: "", applicantlname: ""} --> post

//ip/finance/expenseAccItem, {params: {cost: "", date: "", description: ""}} --> post
