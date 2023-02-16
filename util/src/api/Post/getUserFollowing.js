import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getUserFollowing = (userId) => {
  return axios({
    method: "get",

    url: `${API_BASE_URL}/follows/following/${userId}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);

      console.log("팔로잉 목록 조회에 실패하였습니다.");
    });
};
