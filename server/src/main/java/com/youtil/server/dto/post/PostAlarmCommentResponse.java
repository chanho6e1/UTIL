package com.youtil.server.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PostAlarmCommentResponse {
    private String userName;
    private String replyContent;
    private String myContent;

    private String createDate;
}
