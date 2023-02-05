import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { recvTodosAPI } from "./recvTodosAPI";


export const newTodoAPI = (goalId, data) => {
    return axios({
    method: 'post',
    url: `${API_BASE_URL}/todos/${goalId}`,
    headers: {
        Authorization: TOKEN()
    },
    data: {
        title: data.title,
        description: data.description,
        state: false,
        dueDate: data.dueDate,
    },
    })
    .then((res) => {
        return recvTodosAPI(goalId)
    })
    .catch((err) => {
        throw err
    })
}

