import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { editPostTags } from "./editPostTags";


export const editPostAPI = (postData, tags, postId) => {
  return axios({
  method: 'put',
  url: `${API_BASE_URL}/posts/${postId}`,
  data: postData,
  headers: {
    Authorization: TOKEN(),
    },
  })
    .then((res) => {
        return editPostTags(postId, tags)
    })
    .catch((err) => {
      throw err
    });
}


