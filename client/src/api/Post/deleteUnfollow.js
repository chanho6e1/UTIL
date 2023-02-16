import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const deleteFollow = (toUserId) => {
  return axios({
    method: "delete",
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
      console.log("언팔로우 실패");
    });
};

// /api/follows/{toUserId}
