import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { tilCommentAPI } from "./tilCommentAPI";


export const delTodoAPI = (commentId, postId) => {
  return axios({
    method: 'delete',
    url: `${API_BASE_URL}/comments/${commentId}`,
    headers: {
        Authorization: TOKEN()
    },
    })
    .then((res) => {
        return tilCommentAPI(postId)
    })
}