import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";



export const uploadReview = (goalId, data) => {
  return axios({
  method: 'post',
  url: `${API_BASE_URL}/reviews/${goalId}`,
  data: data,
  headers: {
    Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      throw err
    });
}




