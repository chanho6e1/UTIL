import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvIngPlanAPI } from "./recvIngPlanAPI";

export const delPlanAPI = (idx) => {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/goals/${idx}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return recvIngPlanAPI();
    })
    .catch((err) => {
      throw err;
    });
};
