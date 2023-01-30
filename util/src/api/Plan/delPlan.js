import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const delPlan = (idx) => {
  return axios({
    method: 'delete',
    url: `${API_BASE_URL}/goals/${idx}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return res.data.data
    })
}




