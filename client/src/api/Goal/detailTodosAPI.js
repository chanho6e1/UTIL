import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const detailTodosAPI = (goalId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/todos/goals/${goalId}`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return res.data.data;
  });
};
