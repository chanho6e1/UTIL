import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const detailPlansAPI = (idx) => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/goals/${idx}`,
    headers: {
      Authorization: TOKEN(),
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
};
