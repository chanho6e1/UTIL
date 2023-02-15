import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { postPostTags } from "./postPostTags";

export const uploadPost = (data, tags) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/posts`,
    data: data,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((post) => {
      return postPostTags(post.data.data, tags).then((res) => {return post.data.data});
    })
    .catch((err) => {
      throw err;
    });
};
