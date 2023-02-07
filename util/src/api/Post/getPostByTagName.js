import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getPostByTagName = (criteria, offset, size, tagName) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/tags/names/${tagName}/posts?criteria=${criteria}&offset=${offset}&size=${size}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("게시물 목록 조회에 실패하였습니다.");
    });
};
