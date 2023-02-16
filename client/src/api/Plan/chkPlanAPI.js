import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvIngPlanAPI } from "./recvIngPlanAPI";

export const chkPlanAPI = (goalId, refresh = false) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/goals/${goalId}/state`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      if (refresh === true) {
        return recvIngPlanAPI();
      } else {
        return res.data.data;
      }
    })
    .catch((err) => {
      throw err;
    });
};
