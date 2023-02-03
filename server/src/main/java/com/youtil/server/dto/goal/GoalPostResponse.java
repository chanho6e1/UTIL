package com.youtil.server.dto.goal;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostCommentResponse;
import com.youtil.server.dto.post.WriterInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class GoalPostResponse {

    private Long postId;

    private String title;

    private String clickAction;

    public GoalPostResponse(Post post, User user) { //간단 글 정보만...

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.clickAction = "http://i8d210.p.ssafy.io:8081/api/posts/"+post.getPostId();
    }
}
