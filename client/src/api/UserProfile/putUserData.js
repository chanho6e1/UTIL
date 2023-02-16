import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const putUserData = (userData) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/user`,
    headers: {
      Authorization: TOKEN(),
    },
    data: userData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      console.log("유저 정보 업데이트 실패");
    });
};
