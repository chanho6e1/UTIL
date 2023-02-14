import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const editDetailReviewAPI = (reviewId, data) => {
    return axios({
    method: 'put',
    url: `${API_BASE_URL}/reviews/${reviewId}`,
    data: data,
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