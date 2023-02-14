import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

import { recvIngPlanAPI } from "./recvIngPlanAPI";

export const newPlanAPI = (startDate, endDate, title) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/goals`,
    headers: {
      Authorization: TOKEN(),
    },
    data: {
      startDate: startDate,
      endDate: endDate,
      title: title,
    },
  })
    .then((res) => {
      return recvIngPlanAPI();
    })
    .catch((err) => {
      throw err;
    });
};
