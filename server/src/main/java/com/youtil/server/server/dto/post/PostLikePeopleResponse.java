package com.youtil.server.server.dto.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.dto.post.WriterInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PostLikePeopleResponse {

    private Long postId;

    private com.youtil.server.dto.post.WriterInfo writerInfo;


    public PostLikePeopleResponse(PostLike postLike) { //전체 조회
        this.writerInfo = WriterInfo.from(postLike.getUser());
        this.postId = postLike.getPost().getPostId();
    }
}