package com.youtil.server.dto.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostSaveRequest {

    @NotBlank(message = "제목이 없습니다.")
    @Length(max = 45, message = "45자 이하여야 합니다.")
    private String title;

    @NotBlank(message = "내용이 없습니다.")
    private String content;

    public Post of(User user) {
        return Post.builder().user(user).title(title).content(content).build();
    }
//    public Post of() {
//        return Post.builder().user(user).title(title).content(content).build();
//    }

}
