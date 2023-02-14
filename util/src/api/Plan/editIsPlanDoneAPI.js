import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

import { recvIngPlanAPI } from "./recvIngPlanAPI";


export const editIsPlanDoneAPI = (goalId, data) => {
    return axios({
      method: 'put',
      url: `${API_BASE_URL}/goals/${goalId}/state`,
      headers: {
          Authorization: TOKEN(),
      },
    })
    .then((res) => {
        // return recvIngPlanAPI()
        return res.data.data
    })
    .catch((err) => {
        throw err
    })
}



