import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const recvTodoPeriodAPI = (goalId) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/todos/period/${goalId}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
    .catch((err) => {
        throw err
    })
}
