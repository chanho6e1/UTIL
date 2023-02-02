package com.youtil.server.dto.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateRequest {
    @NotBlank(message = "제목이 없습니다.")
    @Length(max = 45, message = "45자 이하여야 합니다.")
    private String title;

    @NotBlank(message = "내용이 없습니다.")
    private String content;

    private String thumbnail;

    private Long categoryId;

    @NotNull(message = "공개여부를 입력하세요(//공개2, 팔로워1, 비공개0)")
    @Min(0)
    @Max(2)
    private Integer isPrivate;

    private Long goalId;

    private List<String> postFileList;

//    private String tag;

    public Post of(User user) {
        return Post.builder().user(user).title(title).content(content).thumbnail(thumbnail).isPrivate(isPrivate).build();
    }

}
