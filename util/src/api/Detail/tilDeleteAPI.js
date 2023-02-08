import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const tilDeleteAPI = (postId) => {
    return axios({
    method: 'delete',
    url: `${API_BASE_URL}/posts/${postId}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}