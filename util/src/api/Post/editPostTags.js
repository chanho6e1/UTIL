import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const editPostTags = (postId, data) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/tags/posts/${postId}`,
    data: data,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
