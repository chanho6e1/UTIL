import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const postUserTags = (userTagList) => {
  return axios({
    method: "post",
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

// /api/user
// 유저 정보 업데이트

// {
//   "department": "string",
//   "discription": "string",
//   "imageUrl": "string",
//   "nickName": "string"
// }

// tags/likes
