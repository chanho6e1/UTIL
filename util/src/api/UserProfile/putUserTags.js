import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const putUserTags = (userTagList) => {
  return axios({
    method: "put",
    url: `${API_BASE_URL}/tags/likes`,
    headers: {
      Authorization: TOKEN(),
    },
    data: {
      skill: userTagList,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      console.log("유저 태그 정보 업데이트 실패");
    });
};
