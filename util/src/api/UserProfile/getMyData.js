import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getMyData = () => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/user/me`,
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
      console.log("로그인 유저 조회에 실패하였습니다.");
    });
};
