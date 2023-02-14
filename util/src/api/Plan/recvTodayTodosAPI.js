import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";

export const recvTodayTodosAPI = () => {
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source, delimiter = "-") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
  }

//   const today = new Date();
  const todayString = toStringByFormatting(new Date());
  return axios({
    method: "get",
    url: `${API_BASE_URL}/todos/today/${todayString}`,
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
