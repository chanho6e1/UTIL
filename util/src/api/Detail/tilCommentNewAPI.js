import { API_BASE_URL, TOKEN } from "../../constants";
import axios from "axios";
import { tilCommentAPI } from "./tilCommentAPI";


export const tilCommentNewAPI = (postId, data) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/comments/${postId}`,
    headers: {
        Authorization: TOKEN()
    },
    data: {
        content : data.content,
        isPrivate : data.isPrivate,
        parentId : data.parentId,
    },
    })
    .then((res) => {
        return tilCommentAPI(postId)
    })
}