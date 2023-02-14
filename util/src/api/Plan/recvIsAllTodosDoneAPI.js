import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const recvIsAllTodosDoneAPI = (goalId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/todos/goals/${goalId}/state`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return res.data.data;
  });
};
