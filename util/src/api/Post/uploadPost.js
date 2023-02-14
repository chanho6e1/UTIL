import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { postPostTags } from "./postPostTags";


export const uploadPost = (data, tags) => {
  return axios({
  method: 'post',
  url: `${API_BASE_URL}/posts`,
  data: data,
  headers: {
    Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return postPostTags(res.data.data, tags)
    })
    .catch((err) => {
      throw err
    });
}




