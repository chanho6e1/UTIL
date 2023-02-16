import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const recvIngPlanAPI = () => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/goals/ing`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return res.data.data;
  });
};
