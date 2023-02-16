import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const recvPlanAPI = (goalId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/goals/${goalId}`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return res.data.data;
  });
};
