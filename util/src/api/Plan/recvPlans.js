import { API_BASE_URL, Token } from "../../constants";
import axios from "axios";

const token = <Token />
export const recvPlans = () => {
    axios({
        method: 'get',
        url: `${API_BASE_URL}/goals`,
        headers: {
            token: Token
        },
      })
      .then((res) => {
        console.log(res)
        console.log('목표 조회에 성공하였습니다.')
      })
      .catch((err) => {
        console.log(err);
        console.log(token)
        console.log("목표 조회에 실패하였습니다.");
      });
}