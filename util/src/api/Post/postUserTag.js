import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const postUserTag = (postId, data) => {
  return axios({
  method: 'post',
  url: `${API_BASE_URL}/tags/posts/${postId}`,
  data: data,
  headers: {
    Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    });
}
