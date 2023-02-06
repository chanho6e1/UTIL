import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const postFollow = (toUserId) => {
  console.log("follow", toUserId);
  return axios({
    method: "post",
    url: `${API_BASE_URL}/follows/${toUserId}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("팔로우 실패");
    });
};
