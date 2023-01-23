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

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentResponse {

    private Long commentId;

    private String content;

    private WriterInfo writerInfo;

    private String parentWriterNickName;

    private String createdDate;

    private String modifiedDate;

//    public static PostCommentResponse from(PostComment comment){
//        return PostCommentResponse.builder().commentId(comment.getCommentId()).content(comment.getContent())
//                .writerInfo(WriterInfo.from(comment.getUser()))
//                .nestedTo(WriterInfo.from(comment.getNestedTo()))
//                .createdDate(comment.getCreatedDate())
//                .modifiedDate(comment.getModifiedDate()).build();
//    }

    public PostCommentResponse(PostComment comment) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.writerInfo = WriterInfo.from(comment.getUser());
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.createdDate = comment.getCreatedDate().format(myFormatObj);
        if(comment.getModifiedDate()!=null) {
            this.modifiedDate = comment.getModifiedDate().format(myFormatObj);
        }
        this.parentWriterNickName = comment.getParentWriterNickName();
    }
}
