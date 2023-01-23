package com.youtil.server.dto.post;


import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.user.User;
import lombok.*;

import javax.validation.constraints.NotBlank;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentSaveRequest {

    private String userId;

    private String postId;

    private Long parentId; //대댓글이 달릴 댓글

    private User writer; //대댓글이 달글 댓글의 글쓴이 정보

    private String parentWriterNickName;

    private Post post;
    @NotBlank(message = "내용이 없습니다.")
    private String content;

    public PostComment of(User user, Post post) {
        return PostComment.builder().user(user).content(content).parentId(parentId).post(post).parentWriterNickName(parentWriterNickName).build();
    }
}
