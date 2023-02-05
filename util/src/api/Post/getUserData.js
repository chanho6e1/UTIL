import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getUserData = (userId) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/user/${userId}`,
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
      console.log("유저 정보 조회에 실패하였습니다.");
    });
};
