package com.youtil.server.dto.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.post.Post;
import com.youtil.server.dto.user.UserResponse;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PostResponse {

    private Long postId;

    private UserResponse writerInfo;

    private String title;

    private String content;

    private Integer views;

    private List<PostCommentResponse> comments = new ArrayList<>();

    private Integer totalComment;

    private Integer totalLike;

    private Boolean likeStatus;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    public PostResponse(Post post) { //전체 조회

        this.writerInfo = UserResponse.from(post.getUser());
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.totalComment = post.getTotalComments();
        this.totalLike = post.getTotalLikes();
        this.createdDate = post.getCreatedDate();
        this.modifiedDate = post.getModifiedDate();
        this.likeStatus = post.getLikeStatus();

    }

    public PostResponse(Post post, Boolean likeStatus) { //단건 조회

            this.writerInfo = UserResponse.from(post.getUser());
            this.comments = post.getPostCommentList().getPostCommentList().stream()
                    .map(PostCommentResponse::from).collect(Collectors.toList());

        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.totalComment = post.getTotalComments();
        this.totalLike = post.getTotalLikes();
        this.createdDate = post.getCreatedDate();
        this.modifiedDate = post.getModifiedDate();
        this.likeStatus = likeStatus;
    }
}
