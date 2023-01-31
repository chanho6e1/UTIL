package com.youtil.server.dto.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.user.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentUpdateRequest {

    @NotBlank(message = "내용이 없습니다.")
    private String content;

    @NotNull(message = "내용이 없습니다.")
    private Boolean isPrivate;

}
