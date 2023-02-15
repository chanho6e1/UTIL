import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const postUserProfilePicUpload = (formData) => {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/upload/users`,
    data: formData,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      console.log("이미지 업로드 실패하였습니다.");
      throw err
    });
};
