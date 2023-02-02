import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const putLikeToggle = (postId) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/posts/${postId}/likes`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      console.log(res);
      console.log("좋아요 성공");
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("좋아요 실패");
    });
};