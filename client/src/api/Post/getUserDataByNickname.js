import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getUserDataByNickname = (nickname) => {
  return axios({
    method: "get",
    // url: `${API_BASE_URL}/user/search/${nickname}`,
    url: `https://i8d210.p.ssafy.io/api/user/search/${nickname}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log("유저 정보 조회에 실패하였습니다.");
    });
};
