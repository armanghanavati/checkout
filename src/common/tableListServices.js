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
