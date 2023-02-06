import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const tilCommentAPI = (postId) => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/comments/${postId}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}