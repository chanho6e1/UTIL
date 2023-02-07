import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getPostSearch = (criteria, offset, size, title) => {
  console.log("SSAFY", criteria, offset, size, title);
  return axios({
    method: "get",
    url: `${API_BASE_URL}/posts/search?criteria=${criteria}&offset=${offset}&size=${size}&title=${title}`,
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
