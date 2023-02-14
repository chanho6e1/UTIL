import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const detailReviewsAPI = (goalId) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/reviews/${goalId}/goals`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}