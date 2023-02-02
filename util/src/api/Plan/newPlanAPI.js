import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

import { recvPlansAPI } from "./recvPlansAPI";


export const newPlanAPI = (startDate, endDate, title) => {
    return axios({
    method: 'post',
    url: `${API_BASE_URL}/goals`,
    headers: {
        Authorization: TOKEN(),
    },
    data: {

        startDate: startDate,
        endDate: endDate,
        title: title,
    },
    })
    .then((res) => {
        return recvPlansAPI()
    })
}

