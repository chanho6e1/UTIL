import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";


export const uploadPhoto = (image) => {
  const frm = new FormData();
  frm.append("file", image);

  return axios({
  method: 'post',
  url: `${API_BASE_URL}/upload/posts`,
  data: frm,
  headers: {
    Authorization: TOKEN(),
    "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarylTMBUUyXqgLqmAdj",
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    });
}




