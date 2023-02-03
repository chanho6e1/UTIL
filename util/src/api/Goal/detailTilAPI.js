import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const detailTilAPI = (goalId) => {
    return axios({
    method: 'get',
    url: `${API_BASE_URL}/goals/${goalId}/posts`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}