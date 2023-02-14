import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const detailTilAPI = (goalId, offset) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/goals/${goalId}/posts-detail?offset=${offset}&size=10`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}