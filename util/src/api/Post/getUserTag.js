import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getUserTag = (userId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/tags/likes/${userId}`,
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
      console.log("태그 목록 조회에 실패하였습니다.");
    });
};

// tags/likes/{userId}
