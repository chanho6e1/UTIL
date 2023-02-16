import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvTodosAPI } from "./recvTodosAPI";

export const chkTodoAPI = (todoId, goalId) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/todos/${todoId}/state`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return recvTodosAPI(goalId);
  });
};
