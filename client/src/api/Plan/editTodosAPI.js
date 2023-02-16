import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvTodosAPI } from "./recvTodosAPI";

export const editTodosAPI = (goalId, data) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/todos/dates/${goalId}`,
    headers: {
      Authorization: TOKEN(),
    },
    data: data,
  })
    .then((res) => {
      return recvTodosAPI(goalId);
    })
    .catch((err) => {
      throw err;
    });
};
