package com.youtil.server.dto.tag;

import com.youtil.server.domain.tag.Tag;
import com.youtil.server.domain.user.User;
import lombok.*;
import net.minidev.json.JSONArray;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TagSaveRequest {
    @Size(max = 5, message = "테그 개수가 5개를 초과했습니다.")
    private List<String> skill;

    public Tag of(String tag) {
        return Tag.builder().name(tag).build();
    }

}
