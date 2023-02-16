import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvTodosAPI } from "./recvTodosAPI";

export const delTodoAPI = (todoId, goalId) => {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/todos/${todoId}`,
    headers: {
      Authorization: TOKEN(),
    },
  }).then((res) => {
    return recvTodosAPI(goalId);
  });
};
