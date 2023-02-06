import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getPosts = (criteria, offset, size) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/posts/lists?criteria=${criteria}&offset=${offset}&size=${size}`,
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

// "http://i8d210.p.ssafy.io:8081/api/posts/lists?criteria=date&offset=1&size=10"
