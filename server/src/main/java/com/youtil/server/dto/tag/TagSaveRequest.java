package com.youtil.server.dto.tag;

import com.youtil.server.domain.tag.Tag;
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
public class TagSaveRequest {
    @NotBlank(message = "제목이 없습니다.")
    private String tagNames;

    public Tag of(String tag) {
        return Tag.builder().name(tag).build();
    }

}
