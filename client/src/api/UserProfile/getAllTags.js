import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const getAllTags = () => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/tags`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      console.log("모든 태그 조회에 실패하였습니다.");
    });
};
