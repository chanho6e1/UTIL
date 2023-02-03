import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

import { recvPlansAPI } from "./recvPlansAPI";


export const editPlanAPI = (goalId, data) => {
    return axios({
    method: 'put',
    url: `${API_BASE_URL}/goals/${goalId}`,
    headers: {
        Authorization: TOKEN(),
    },
    data: {

        startDate: data.startDate,
        endDate: data.endDate,
        title: data.title,
    },
    })
    .then((res) => {
        return recvPlansAPI()
    })
    .catch((err) => {
        throw err
    })
}

