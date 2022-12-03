import config from "./urlConfig.json";
import axios from "axios";

export const getUserListTable = () => {
  return axios.get(
    `${config.localapi}/settlement/list/${localStorage.getItem("id")}`,
    {
      params: {},
    }
  );
};
