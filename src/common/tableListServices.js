import config from "./urlConfig.json";
import axios from "axios";

export const getUserListTable = (values) => {
  console.log(values)
  return axios.get(
    `${config.localapi}/settlement/list/${localStorage.getItem("id")}`,
    {
      params: values,
    }
  );
};

export const getAllStatuses = () => {
    return axios.get(`${config.localapi}/actionCode`);
}