import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const detailGoalCompleteAPI = (idx) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/goals/${idx}/state`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data
    })
};
