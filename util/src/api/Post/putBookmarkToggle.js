import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const putBookmarkToggle = (postId) => {
  console.log("bookmarkToggle", postId);
  return axios({
    method: "put",
    url: `${API_BASE_URL}/posts/${postId}/bookmarks`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      console.log(res)
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("북마크 실패");
    });
};
