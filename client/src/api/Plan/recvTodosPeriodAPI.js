import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const recvTodosPeriodAPI = () => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/todos/period`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return res.data.data;
  });
};
