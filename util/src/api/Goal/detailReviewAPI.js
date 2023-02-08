import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const detailReviewAPI = (reviewId) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/reviews/${reviewId}`,
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