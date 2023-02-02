import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getPosts = () => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/posts/lists`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      console.log(res.data.status);
      console.log("게시물 목록 조회에 성공하였습니다.");
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("게시물 목록 조회에 실패하였습니다.");
    });
};
