import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getPostByNickname = (criteria, offset, size, nickName) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/posts/search/nickName?criteria=${criteria}&nickName=${nickName}&offset=${offset}&size=${size}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log("게시물 목록 조회에 실패하였습니다.");
    });
};
