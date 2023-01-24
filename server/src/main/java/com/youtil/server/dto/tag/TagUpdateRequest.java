package com.youtil.server.dto.tag;

import com.youtil.server.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TagUpdateRequest {
    @NotBlank(message = "제목이 없습니다.")
    private String tagName;

//    public Tag of() {
//        return Tag.builder().name(tagName).build();
//    }

}
