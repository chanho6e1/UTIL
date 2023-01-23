package com.youtil.server.dto.post.category;

import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CategorySaveRequest {
    @NotBlank(message = "제목이 없습니다.")
    private String name;

    public Category of() {
        return Category.builder().name(name).build();
    }
}
