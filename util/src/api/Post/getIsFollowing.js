import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getIsFollowing = (toUserId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/follows/${toUserId}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      console.log(res.data.data);
      console.log("팔로우 여부 조회에 성공하였습니다.");
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("팔로우 여부 조회에 실패하였습니다.");
    });
};
