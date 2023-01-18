package com.youtil.server.dto.post;

import com.youtil.server.domain.post.PostComment;
import com.youtil.server.dto.user.UserResponse;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class PostCommentResponse {

    private Long commentId;

    private String content;

    private UserResponse writerInfo;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    public static PostCommentResponse from(PostComment comment){
        return PostCommentResponse.builder().commentId(comment.getId()).content(comment.getContent())
                .writerInfo(UserResponse.from(comment.getUser())).createdDate(comment.getCreatedDate())
                .modifiedDate(comment.getModifiedDate()).build();
    }



}
