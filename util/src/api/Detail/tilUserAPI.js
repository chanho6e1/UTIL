import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const tilUserAPI = () => {
  return axios({
    method: 'get',
    url: `${API_BASE_URL}/user/me`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}