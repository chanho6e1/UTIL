import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getRecommendUser = (offset, size) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/tags/mytags/users?offset=${offset}&size=${size}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log("나의 태그 조회에 실패하였습니다.");
    });
};
