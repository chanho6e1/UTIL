import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { tilCommentAPI } from "./tilCommentAPI";


export const editTodoAPI = (commentId, postId, data) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/comments/${commentId}`,
    headers: {
        Authorization: TOKEN()
    },
    data: {
        content: data.content,
        isPrivate: data.isPrivate
    },
    })
    .then((res) => {
        return tilCommentAPI(postId)
    })
}