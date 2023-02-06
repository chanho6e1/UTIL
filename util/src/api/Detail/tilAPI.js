import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const tilAPI = (postId) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/posts/${postId}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}