package com.youtil.server.dto.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PostResponse {

    private Long postId;

    private WriterInfo writerInfo;

    private String title;

    private String content;

    private String thumbnail;

    private Integer isPrivate;

    private Integer views;

    private List<PostCommentResponse> comments = new ArrayList<>();

    private Integer totalCommentSize;

    private Integer likeStatusSize;

    private Boolean likeStatus;

    private String createdDate;

    private String modifiedDate;

    public PostResponse(Post post) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.writerInfo = WriterInfo.from(post.getUser());
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.createdDate = post.getCreatedDate().format(myFormatObj);
        if(post.getModifiedDate()!=null) {
            this.modifiedDate = post.getModifiedDate().format(myFormatObj);
        }
        this.likeStatus = post.getPostLikeList().getPostLikeList().parallelStream()
                .anyMatch(l -> l.ownedBy(post.getUser().getUserId()));
//        this.likeStatus = post.getLikeStatus();
        this.likeStatus = likeStatus;
        this.likeStatusSize = post.getTotalLikes();

    }

    public PostResponse(Post post, Boolean likeStatus) { //단건 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.writerInfo = WriterInfo.from(post.getUser());
//            this.comments = post.getPostCommentList().getPostCommentList().stream()
//                    .map(PostCommentResponse::from).collect(Collectors.toList());

        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.createdDate = post.getCreatedDate().format(myFormatObj);
        if(post.getModifiedDate()!=null) {
            this.modifiedDate = post.getModifiedDate().format(myFormatObj);
        }
        this.isPrivate = post.getIsPrivate();
        this.thumbnail = post.getThumbnail();
        this.likeStatus = likeStatus;
        this.totalCommentSize = post.getTotalComments(); //댓글 수
        this.likeStatusSize = post.getTotalLikes(); //좋아요 수
    }

}
