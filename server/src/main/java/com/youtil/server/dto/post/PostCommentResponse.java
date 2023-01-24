package com.youtil.server.dto.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PostCommentResponse {

    private Long commentId;

    private String content;

    private WriterInfo writerInfo;

    private String parentWriterNickName;

    private Integer depth;

    private String createdDate;

    private String modifiedDate;

    private List<PostCommentResponse> children = new ArrayList<>();


    public PostCommentResponse(PostComment comment) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.writerInfo = WriterInfo.from(comment.getUser());
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.depth = comment.getDepth();
        this.createdDate = comment.getCreatedDate().format(myFormatObj);
        if(comment.getModifiedDate()!=null) {
            this.modifiedDate = comment.getModifiedDate().format(myFormatObj);
        }
        if( comment.getParent()!= null) {
            this.parentWriterNickName = comment.getParent().getUser().getUserName();
        }
    }

    public PostCommentResponse(PostComment comment, String content) {
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
        this.writerInfo = WriterInfo.from(comment.getUser());
        this.commentId = comment.getCommentId();
        this.content = content;
        this.depth = comment.getDepth();
        this.createdDate = comment.getCreatedDate().format(myFormatObj);
        if(comment.getModifiedDate()!=null) {
            this.modifiedDate = comment.getModifiedDate().format(myFormatObj);
        }
        if( comment.getParent()!= null) {
            this.parentWriterNickName = comment.getParent().getUser().getUserName();
        }
    }

    public static PostCommentResponse from(PostComment comment) {
        return comment.getIsDelete() ?
                new PostCommentResponse(comment, "삭제된 댓글입니다") : new PostCommentResponse(comment);
    }
}
