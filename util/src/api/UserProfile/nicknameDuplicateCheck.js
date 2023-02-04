import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const nicknameDuplicateCheck = (nickname) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/user/nickname/${nickname}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      // 중복이면 true, 아니면 false
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log(TOKEN());
      console.log("닉네임 중복 조회에 실패하였습니다.");
    });
};
