import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvTodosAPI } from "./recvTodosAPI";

export const editTodoAPI = (todoId, goalId, data) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/todos/${todoId}`,
    headers: {
      Authorization: TOKEN(),
    },
    data: {
      title: data.title,
      description: data.description,
      state: data.state,
      dueDate: data.dueDate,
    },
  })
    .then((res) => {
      return recvTodosAPI(goalId);
    })
    .catch((err) => {
      throw err;
    });
};
